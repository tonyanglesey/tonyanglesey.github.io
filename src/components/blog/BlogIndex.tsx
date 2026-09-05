"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPosts, formatDate, type Post } from "@/lib/wordpress";

export default function BlogIndex() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    fetchPosts()
      .then((p) => alive && setPosts(p))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <main className="blog-main">
      <div className="wrap">
        <div className="blog-hero">
          <h1>Writing</h1>
          <p>Notes on the lla.ma open-source apps, builds, and experiments.</p>
        </div>

        {error && (
          <p className="blog-status error">
            Couldn&rsquo;t load posts right now. Please try again later.
          </p>
        )}

        {!error && posts === null && (
          <p className="blog-status">Loading posts…</p>
        )}

        {!error && posts !== null && posts.length === 0 && (
          <p className="blog-status">No posts yet — check back soon.</p>
        )}

        {posts && posts.length > 0 && (
          <div className="post-grid">
            {posts.map((post) => (
              <Link className="post-card" href={`/blog/${post.slug}/`} key={post.id}>
                {post.featuredImage && (
                  <div className="cover">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.featuredImage} alt={post.featuredImageAlt} />
                  </div>
                )}
                <div className="body">
                  <div className="post-meta">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.categories[0] && (
                      <span className="tag">{post.categories[0]}</span>
                    )}
                  </div>
                  <h2>{post.title}</h2>
                  <p className="excerpt">{post.excerpt}</p>
                  <span className="more">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
