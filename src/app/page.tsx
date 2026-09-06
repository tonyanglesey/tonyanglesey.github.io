import { profile, rail, projects, solutions, llama, socials } from "@/lib/content";
import SmoothLink from "@/components/site/SmoothLink";
import ScrollOnLoad from "@/components/site/ScrollOnLoad";

const ArrowGlyph = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 13L13 3M6 3h7v7" />
  </svg>
);

export default function Home() {
  return (
    <>
      <ScrollOnLoad />
      {/* ---------- hero ---------- */}
      <header className="hero">
        <div className="wrap">
          <div>
            <p className="avail">
              <i /> {profile.availability}
            </p>
            <h1 className="headline">
              {profile.name}
              <span className="role">{profile.role}</span>
            </h1>
            <p className="lede">{profile.lede}</p>
            <div className="actions">
              <SmoothLink targetId="work" className="btn">
                See selected work
              </SmoothLink>
              <a href={profile.resumeHref} className="btn ghost" download>
                Download résumé
              </a>
            </div>
          </div>

          <aside className="rail">
            <dl>
              <div>
                <dt>{rail.currently.label}</dt>
                <dd>
                  {rail.currently.title}
                  <span>{rail.currently.sub}</span>
                </dd>
              </div>
              <div>
                <dt>{rail.focus.label}</dt>
                <dd>
                  {rail.focus.title}
                  <span>{rail.focus.sub}</span>
                </dd>
              </div>
              <div>
                <dt>Working with</dt>
                <dd>
                  <div className="stack">
                    {rail.stack.map((t) => (
                      <span key={t} className={t === rail.stackHighlight ? "hi" : undefined}>
                        {t}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </header>

      {/* ---------- selected work ---------- */}
      <section className="band" id="work">
        <div className="wrap">
          <div className="head">
            <h2 className="section-title">Selected work</h2>
            <p>
              Recent projects across consumer product, Web3 data, and enterprise
              commerce.
            </p>
          </div>

          <div className="index">
            {projects.map((p) => (
              <a
                className="row"
                href={p.href}
                key={p.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>
                  {p.name}
                  <small>{p.blurb}</small>
                </h3>
                <p className="tech">{p.tech}</p>
                <p className="year">{p.year}</p>
                <span className="open" aria-hidden="true">
                  <ArrowGlyph />
                </span>
                <div className="thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" style={{ background: p.tint }} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- solutions ---------- */}
      <section className="band" id="solutions">
        <div className="wrap">
          <div className="head">
            <h2 className="section-title">How I can help</h2>
            <p>Most engagements start as one of these and grow from there.</p>
          </div>

          <div className="svc">
            {solutions.map((s) => (
              <article key={s.num}>
                <span className="num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
                <ul>
                  {s.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- lla.ma ---------- */}
      <section className="band" id="llama">
        <div className="wrap">
          <div className="llama">
            <div className="top">
              <div>
                <span className="pill">{llama.pill}</span>
                <h2>{llama.title}</h2>
                <p>{llama.blurb}</p>
              </div>
              <a
                className="btn ghost"
                href={llama.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
            <div className="repos">
              {llama.repos.map((r) => (
                <article key={r.name}>
                  <h3>{r.name}</h3>
                  <p>{r.blurb}</p>
                  <a href={r.href} target="_blank" rel="noopener noreferrer">
                    Read the docs
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section className="band" id="contact">
        <div className="wrap contact">
          <div>
            <h2>Let&rsquo;s talk about what you&rsquo;re building</h2>
            <p>
              Send a short note about the project and timeline. I reply within a
              day or two.
            </p>
            <div className="actions">
              <a className="btn" href={`mailto:${profile.email}`}>
                Start a conversation
              </a>
            </div>
          </div>
          <div className="links">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {s.label}
                <span>{s.value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
