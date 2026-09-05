#!/usr/bin/env bash
#
# One-command deploy for tonyanglesey.github.io.
#
# GitHub Actions is billing-locked on this account, so the site is deployed
# manually: build the Next.js static export and publish ./out to the `gh-pages`
# branch, which GitHub Pages (legacy build) serves.
#
# This publishes using an *isolated* git repo inside ./out, so it NEVER creates
# a local gh-pages branch in your working repo (that tangle is what caused the
# "cannot push" mess). Your source branches are never touched.
#
# Usage:  npm run deploy
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

REMOTE_URL="$(git remote get-url origin)"
SRC_SHA="$(git rev-parse --short HEAD)"
SRC_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
NAME="$(git config user.name || echo 'Tony Anglesey')"
EMAIL="$(git config user.email || echo 'tanglesey@gmail.com')"

echo "▸ Building (source: $SRC_BRANCH @ $SRC_SHA)…"
rm -rf out
npm run build

if [[ ! -f out/index.html ]]; then
  echo "✗ Build produced no out/index.html — aborting." >&2
  exit 1
fi
# .nojekyll must ship so GitHub Pages serves the _next/ directory.
touch out/.nojekyll

echo "▸ Publishing ./out to gh-pages…"
(
  cd out
  rm -rf .git
  git init -q
  git config user.name "$NAME"
  git config user.email "$EMAIL"
  git checkout -q -b gh-pages
  git add -A
  git commit -q -m "Deploy from $SRC_BRANCH @ $SRC_SHA"
  git push -f "$REMOTE_URL" gh-pages
  rm -rf .git
)

# Ask GitHub Pages to rebuild from the new gh-pages tip (a source push alone
# does not always trigger it).
if command -v gh >/dev/null 2>&1; then
  SLUG="$(echo "$REMOTE_URL" | sed -E 's#(git@github.com:|https://github.com/)##; s#\.git$##')"
  echo "▸ Triggering GitHub Pages build for $SLUG…"
  gh api -X POST "repos/$SLUG/pages/builds" >/dev/null || true

  TARGET="$(git ls-remote "$REMOTE_URL" gh-pages | cut -c1-8)"
  printf "▸ Waiting for Pages build %s" "$TARGET"
  for _ in $(seq 1 24); do
    STATUS="$(gh api "repos/$SLUG/pages/builds/latest" 2>/dev/null \
      | python3 -c "import sys,json;d=json.load(sys.stdin);print(d.get('status',''),(d.get('commit') or '')[:8])" 2>/dev/null || echo '')"
    if [[ "$STATUS" == built*"$TARGET"* ]]; then echo " ✓ built"; break; fi
    printf "."
    sleep 5
  done
  echo "✓ Deployed. https://tonyanglesey.github.io/"
else
  echo "⚠ gh CLI not found — pushed gh-pages, but couldn't trigger the Pages build."
  echo "  Trigger it once in Settings → Pages, or install gh. Site: https://tonyanglesey.github.io/"
fi
