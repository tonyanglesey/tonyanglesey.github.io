/**
 * WordPress.com public REST API client.
 *
 * The blog reads posts live from the same source the old build used:
 *   https://public-api.wordpress.com/wp/v2/sites/tonyanglesey5.wordpress.com
 * The `?_embed` flag pulls author + featured media in one request. This runs in
 * the browser (the API is CORS-enabled), so posts stay current without a rebuild.
 */

const SITE = "tonyanglesey5.wordpress.com";
const BASE = `https://public-api.wordpress.com/wp/v2/sites/${SITE}`;

export type Post = {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  author: string | null;
  featuredImage: string | null;
  featuredImageAlt: string;
  categories: string[];
  tags: string[];
};

/** Strip HTML tags and decode a few common entities for plain-text excerpts. */
function toText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&#039;|&#39;/g, "’")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&hellip;/g, "…")
    .replace(/\[&hellip;\]|\[…\]/g, "")
    .replace(/&#8211;/g, "–")
    .trim();
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function normalize(raw: any): Post {
  const embedded = raw?._embedded ?? {};
  const author = embedded.author?.[0]?.name ?? null;
  const media = embedded["wp:featuredmedia"]?.[0];
  const sizes = media?.media_details?.sizes;
  const featuredImage =
    sizes?.large?.source_url ??
    sizes?.medium_large?.source_url ??
    media?.source_url ??
    null;

  return {
    id: raw.id,
    slug: raw.slug,
    date: raw.date,
    link: raw.link,
    title: toText(raw.title?.rendered ?? ""),
    excerpt: toText(raw.excerpt?.rendered ?? ""),
    contentHtml: raw.content?.rendered ?? "",
    author,
    featuredImage,
    featuredImageAlt: media?.alt_text || toText(raw.title?.rendered ?? ""),
    categories: (embedded["wp:term"]?.[0] ?? []).map((t: any) => t.name),
    tags: (embedded["wp:term"]?.[1] ?? []).map((t: any) => t.name),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function fetchPosts(perPage = 30): Promise<Post[]> {
  const res = await fetch(
    `${BASE}/posts?_embed&per_page=${perPage}&orderby=date&order=desc`,
    { headers: { Accept: "application/json" } },
  );
  if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalize) : [];
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(`${BASE}/posts?_embed&slug=${encodeURIComponent(slug)}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) && data.length ? normalize(data[0]) : null;
}

/** Slugs known at build time — used to pre-render post shells for static export. */
export async function fetchAllSlugs(): Promise<string[]> {
  try {
    const posts = await fetchPosts(100);
    return posts.map((p) => p.slug);
  } catch {
    return [];
  }
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
