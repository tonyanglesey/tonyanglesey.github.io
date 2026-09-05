import type { Metadata } from "next";
import BlogPost from "@/components/blog/BlogPost";
import { fetchAllSlugs, fetchPostBySlug } from "@/lib/wordpress";

/**
 * Enumerate every known post slug at build time so static export can emit a
 * page shell for each one. The shell then hydrates and fetches live content in
 * the browser, so edits to existing posts show up without a rebuild. A brand
 * new post only gets its own URL after the next deploy (the /blog index, which
 * fetches live, always lists it immediately).
 */
export async function generateStaticParams() {
  const slugs = await fetchAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await fetchPostBySlug(slug);
    if (post) {
      return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
          title: post.title,
          description: post.excerpt,
          type: "article",
          images: post.featuredImage ? [post.featuredImage] : undefined,
        },
      };
    }
  } catch {
    // fall through to default below
  }
  return { title: "Writing" };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  return <BlogPost slug={slug} />;
}
