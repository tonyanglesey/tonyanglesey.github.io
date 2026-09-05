import Link from "next/link";
import { profile } from "@/lib/content";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Solutions", href: "/#solutions" },
  { label: "lla.ma", href: "/#llama" },
  { label: "Writing", href: "/blog/" },
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
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link href="/#contact" className="nav-cta">
          Get in touch
        </Link>
      </div>
    </nav>
  );
}
