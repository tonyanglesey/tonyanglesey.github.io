"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPostBySlug, formatDate, type Post } from "@/lib/wordpress";

type Status = "loading" | "ready" | "notfound" | "error";

export default function BlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let alive = true;
    fetchPostBySlug(slug)
      .then((p) => {
        if (!alive) return;
        if (p) {
          setPost(p);
          setStatus("ready");
        } else {
          setStatus("notfound");
        }
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, [slug]);

  return (
    <main className="article-main">
      <div className="wrap">
        <div className="article-wrap">
          <Link href="/blog/" className="back-link">
            ← All writing
          </Link>

          {status === "loading" && <p className="blog-status">Loading…</p>}
          {status === "error" && (
            <p className="blog-status error">
              Couldn&rsquo;t load this post right now. Please try again later.
            </p>
          )}
          {status === "notfound" && (
            <p className="blog-status">
              This post couldn&rsquo;t be found. It may have moved —{" "}
              <Link href="/blog/" style={{ color: "var(--steel)" }}>
                browse all writing
              </Link>
              .
            </p>
          )}

          {status === "ready" && post && (
            <article>
              <header className="article-head">
                <h1>{post.title}</h1>
                <div className="post-meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {post.author && <span>· {post.author}</span>}
                  {post.categories[0] && (
                    <span className="tag">{post.categories[0]}</span>
                  )}
                </div>
              </header>

              {post.featuredImage && (
                <div className="article-cover">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.featuredImage} alt={post.featuredImageAlt} />
                </div>
              )}

              <div
                className="prose-wp article-body"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </article>
          )}
        </div>
      </div>
    </main>
  );
}
