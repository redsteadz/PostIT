import { getPosts } from "@/lib/actions";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogDetail from "@/components/blog-detail";

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { status, posts } = await getPosts({ id: id, all: false });

  // console.log(post);
  if (!posts) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>
      </Button>
      <BlogDetail posts={posts} />
    </article>
  );
}
