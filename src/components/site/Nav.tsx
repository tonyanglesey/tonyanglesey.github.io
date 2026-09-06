"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import SmoothLink, { scrollToTop } from "./SmoothLink";

// On-page sections (smooth-scroll, no hash) vs. real routes.
const sectionLinks = [
  { label: "Work", targetId: "work" },
  { label: "Solutions", targetId: "solutions" },
  { label: "lla.ma", targetId: "llama" },
];

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [activeId, setActiveId] = useState<string | null>(null);

  // Scroll-spy: mark the section currently crossing a line ~30% down the
  // viewport. The rootMargin collapses the observer root to a thin band there,
  // so at most one section is "intersecting" at a time.
  useEffect(() => {
    // Only spy on the home page. When elsewhere, the render already guards
    // active state with `onHome`, so no reset is needed here.
    if (!onHome) return;
    const els = sectionLinks
      .map((l) => document.getElementById(l.targetId))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -70% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  const writingActive = pathname.startsWith("/blog");

  return (
    <nav className="nav">
      <div className="wrap">
        <Link
          href="/"
          className="mark"
          onClick={(e) => {
            // On the home page, smooth-scroll to top without adding a hash.
            // Elsewhere, let the link navigate home (which lands at the top).
            if (
              onHome &&
              !e.metaKey &&
              !e.ctrlKey &&
              !e.shiftKey &&
              !e.altKey &&
              e.button === 0
            ) {
              e.preventDefault();
              scrollToTop();
            }
          }}
        >
          {profile.name}
          <span className="dot" />
        </Link>
        <div className="nav-links">
          {sectionLinks.map((l) => (
            <SmoothLink
              key={l.targetId}
              targetId={l.targetId}
              active={onHome && activeId === l.targetId}
            >
              {l.label}
            </SmoothLink>
          ))}
          <Link href="/blog/" aria-current={writingActive ? "true" : undefined}>
            Writing
          </Link>
        </div>
        <SmoothLink targetId="contact" className="nav-cta">
          Get in touch
        </SmoothLink>
      </div>
    </nav>
  );
}
