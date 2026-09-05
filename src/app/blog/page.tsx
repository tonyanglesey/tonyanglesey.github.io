import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on the lla.ma open-source apps, builds, and experiments.",
};

export default function BlogPage() {
  return <BlogIndex />;
}
