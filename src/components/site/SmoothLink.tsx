"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

const SCROLL_KEY = "scrollTarget";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  return true;
}

/**
 * A link to an on-page section that smooth-scrolls WITHOUT leaving a #hash in
 * the URL. The `href` (/#id) is kept purely as a no-JS fallback — with JS we
 * always preventDefault. If the target isn't on the current page (e.g. a
 * section link clicked from /blog), we stash it and navigate home, where
 * <ScrollOnLoad> picks it up.
 */
export default function SmoothLink({
  targetId,
  className,
  active,
  children,
}: {
  targetId: string;
  className?: string;
  active?: boolean;
  children: ReactNode;
}) {
  const router = useRouter();

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Let modified clicks (open in new tab, etc.) behave normally.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();

    if (scrollToId(targetId)) return; // same page — clean URL, no hash

    try {
      sessionStorage.setItem(SCROLL_KEY, targetId);
    } catch {}
    router.push("/");
  }

  return (
    <a
      href={`/#${targetId}`}
      onClick={onClick}
      className={className}
      aria-current={active ? "true" : undefined}
    >
      {children}
    </a>
  );
}
