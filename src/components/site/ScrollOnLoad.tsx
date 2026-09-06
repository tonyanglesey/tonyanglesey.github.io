"use client";

import { useEffect } from "react";
import { scrollToId } from "./SmoothLink";

const SCROLL_KEY = "scrollTarget";

/**
 * When the home page mounts, consume any section target stashed by a SmoothLink
 * clicked from another page and scroll to it — keeping the URL hash-free.
 */
export default function ScrollOnLoad() {
  useEffect(() => {
    let target: string | null = null;
    try {
      target = sessionStorage.getItem(SCROLL_KEY);
      if (target) sessionStorage.removeItem(SCROLL_KEY);
    } catch {}
    if (!target) return;

    // Wait a frame so the section is laid out before scrolling.
    const id = target;
    requestAnimationFrame(() => scrollToId(id));
  }, []);

  return null;
}
