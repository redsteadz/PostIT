"use client";
import BlogBlock from "./blog-block";
import { PostType } from "@/db/models/Post";
import { useSession } from "next-auth/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

import { useEffect, useState } from "react";
import { Key } from "react";

const POSTS_PER_PAGE = 6;

export function BlogFeedPaginate({ posts }: { posts: PostType[] }) {
  const { data: session } = useSession();
  const [page, setPage] = useState(0);
  const [current, setCurrent] = useState<PostType[]>([]);
  const totalPages = Math.floor(posts.length / POSTS_PER_PAGE);
  useEffect(() => {
    let newPosts: PostType[] = [];
    const start = page * POSTS_PER_PAGE;
    const end = Math.min((page + 1) * POSTS_PER_PAGE, posts.length);

    for (let i = start; i < end; i++) {
      newPosts.push(posts[i]);
    }
    setCurrent(newPosts);
  }, [page]);

  const handlePrevious = () => setPage((prev) => Math.max(0, prev - 1));
  const handleNext = () => setPage((prev) => Math.min(totalPages, prev + 1));

  if (!session) {
    return (
      <div>
        {" "}
        <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
          <span className="italic underline-offset-1">
            You must login to get the posts !{" "}
          </span>
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No blog posts yet</h2>
        <p className="text-muted-foreground">
          Be the first to create a blog post!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {current.map((post: PostType) => {
          return <BlogBlock key={post.id! as Key} post={post} />;
        })}
      </div>
      <Pagination className="mt-10 justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={page === 0 ? "opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          <PaginationItem className="px-4 py-2 text-sm">
            {page + 1} / {totalPages + 1}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={page === totalPages ? "opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
