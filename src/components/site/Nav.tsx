import Link from "next/link";
import { profile } from "@/lib/content";
import SmoothLink from "./SmoothLink";

// On-page sections (smooth-scroll, no hash) vs. real routes.
const sectionLinks = [
  { label: "Work", targetId: "work" },
  { label: "Solutions", targetId: "solutions" },
  { label: "lla.ma", targetId: "llama" },
];

export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap">
        <Link href="/" className="mark">
          {profile.name}
          <span className="dot" />
        </Link>
        <div className="nav-links">
          {sectionLinks.map((l) => (
            <SmoothLink key={l.targetId} targetId={l.targetId}>
              {l.label}
            </SmoothLink>
          ))}
          <Link href="/blog/">Writing</Link>
        </div>
        <SmoothLink targetId="contact" className="nav-cta">
          Get in touch
        </SmoothLink>
      </div>
    </nav>
  );
}
