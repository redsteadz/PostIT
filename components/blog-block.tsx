"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  calculateReadingTime,
  calculateWordCount,
  formatDate,
} from "@/lib/utils";
import { PostType } from "@/db/models/Post";
import { Key } from "react";

export default function BlogBlock({ post }: { post: PostType }) {
  const totalWords = calculateWordCount(post.content.toString());
  const readingTime = calculateReadingTime(totalWords);
  return (
    <Link
      key={post.id as Key}
      href={`/blog/${post.id}`}
      prefetch={true}
      className="group"
    >
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription className="flex items-center text-xs">
            <span>{post.author}</span>
            <span className="mx-1">•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {post.content.substring(0, 150)}
            {post.content.length > 150 ? "..." : ""}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Badge
            variant="outline"
            className="bg-primary/10 hover:bg-primary/20"
          >
            Read more
          </Badge>
          <div>
            <Badge variant={"outline"}>{readingTime} min</Badge>
            <Badge variant={"outline"}>{totalWords} words</Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
