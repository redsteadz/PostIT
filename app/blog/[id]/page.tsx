import { getPosts } from "@/lib/actions";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } =  await params;
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

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{posts.title}</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{posts.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={posts.date}>
            {new Date(posts.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </div>

      <div className="mt-8 prose dark:prose-invert max-w-none">
        <Markdown>{posts.content}</Markdown>
      </div>
    </article>
  );
}
