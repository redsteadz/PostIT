import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  calculateWordCount,
  calculateCharCount,
  calculateReadingTime,
} from "@/lib/utils";
import { PostType } from "@/db/models/Post";

interface PostStatsProps {
  posts: PostType[];
}

export const PostStats: React.FC<PostStatsProps> = ({ posts }) => {
  const totalPosts = posts.length;
  const totalWords = posts.reduce(
    (sum, post) => sum + calculateWordCount(post.content.toString()),
    0,
  );
  const totalChars = posts.reduce(
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
          <span className="text-3xl font-bold">{totalPosts}</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Words</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">
            {totalWords.toLocaleString()}
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Characters</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">
            {totalChars.toLocaleString()}
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estimated Read Time</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">{totalReadingTime} min</span>
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
