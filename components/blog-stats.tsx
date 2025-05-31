"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateWordCount,
  calculateCharCount,
  calculateReadingTime,
} from "@/lib/utils";
import { useBlogPosts } from "./blog-context";
import { AnimatedNumber } from "./animted-number";

export const PostStats = () => {
  const { filteredPosts } = useBlogPosts();
  const totalPosts = filteredPosts.length;
  const totalWords = filteredPosts.reduce(
    (sum, post) => sum + calculateWordCount(post.content.toString()),
    0,
  );
  const totalChars = filteredPosts.reduce(
    (sum, post) => sum + calculateCharCount(post.content.toString()),
    0,
  );
  const totalReadingTime = calculateReadingTime(totalWords);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">
            <AnimatedNumber value={totalPosts} />
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Words</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">
            <AnimatedNumber value={totalWords} />
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Characters</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">
            <AnimatedNumber value={totalChars} />
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estimated Read Time</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">
            {" "}
            <AnimatedNumber value={totalReadingTime} />
            min
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

// Usage example in a parent component:
//
// import { PostStats, PostType } from "./PostStats";
//
// const Dashboard = async () => {
//   const { posts } = await getPosts({ id: "", all: true });
//   return <PostStats posts={posts as PostType[]} />;
// };
