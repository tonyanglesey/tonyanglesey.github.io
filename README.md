# tonyanglesey.github.io

Personal portfolio and blog for Tony Anglesey. Built with **Next.js (App Router)**
and **Tailwind CSS v4**, exported as a fully static site and deployed to GitHub
Pages.

## Stack

- Next.js 16 with `output: "export"` (static HTML/JS, no server at runtime)
- Tailwind v4 + a small design-token layer in `src/app/globals.css`
- Fonts: Instrument Sans + JetBrains Mono via `next/font`

## Blog

Posts are pulled **live in the browser** from the WordPress.com public REST API:

```
https://public-api.wordpress.com/wp/v2/sites/tonyanglesey5.wordpress.com/posts?_embed
```

- `/blog` fetches the post list on the client, so it always reflects the current
  WordPress content with no rebuild.
- Each post URL (`/blog/<slug>/`) is pre-rendered at build time from the slugs
  known then (`generateStaticParams`), and hydrates to fetch the post body live.
  A brand-new post appears on `/blog` immediately, but gets its own URL after the
  next deploy — the daily scheduled build in `.github/workflows/deploy.yml`
  handles that automatically.

All WordPress access lives in `src/lib/wordpress.ts`. Site copy lives in
`src/lib/content.ts`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the export
and publishes `./out` to GitHub Pages.

> **One-time setup:** in the repo's **Settings → Pages**, set **Source** to
> **GitHub Actions** (previously this repo served committed static files from a
> branch).

## Legacy

The previous compiled site (a Vite + React build) is archived under `legacy/`
for reference and can be deleted once the new site is confirmed live.
