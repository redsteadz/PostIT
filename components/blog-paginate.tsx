"use client";

import BlogBlock from "./blog-block";
import type { PostType } from "@/db/models/Post";
import { useSession } from "next-auth/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import Fuse from "fuse.js";
import { useEffect, useState, useMemo } from "react";
import type { Key } from "react";
import { motion, AnimatePresence } from "motion/react";
import SearchBar from "./search-bar";

const POSTS_PER_PAGE = 6;

export function BlogFeedPaginate({ posts }: { posts: PostType[] }) {
  const { data: session } = useSession();
  const [page, setPage] = useState(0);
  const [current, setCurrent] = useState<PostType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Memoized Fuse instance
  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: ["title", "content", "author.name"],
      threshold: 0.3,
    });
  }, [posts]);

  // Filtered posts depending on query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, fuse, posts]);

  const totalPages = Math.floor((filteredPosts.length - 1) / POSTS_PER_PAGE);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      const start = page * POSTS_PER_PAGE;
      const end = Math.min((page + 1) * POSTS_PER_PAGE, filteredPosts.length);
      setCurrent(filteredPosts.slice(start, end));
      setIsTransitioning(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [page, filteredPosts]);

  const handlePrevious = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(0); // Reset page on new search
  };

  if (!session) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
          <span className="italic underline-offset-1">
            You must login to get the posts!
          </span>
        </p>
      </motion.div>
    );
  }

  if (!filteredPosts || filteredPosts.length === 0) {
    return (
      <>
        <SearchBar onSearchAction={handleSearchChange} />
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-2">No matching posts</h2>
          <p className="text-muted-foreground">Try a different keyword.</p>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <SearchBar onSearchAction={handleSearchChange} />

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {current.map((post: PostType, index) => (
                <motion.div
                  key={post.id! as Key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <BlogBlock post={post} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {isTransitioning && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex space-x-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Pagination className="mt-10 justify-center">
          <PaginationContent>
            <PaginationItem>
              <motion.div
                whileHover={{ scale: page === 0 ? 1 : 1.05 }}
                whileTap={{ scale: page === 0 ? 1 : 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <PaginationPrevious
                  onClick={handlePrevious}
                  className={`transition-all duration-200 ${
                    page === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-accent"
                  }`}
                />
              </motion.div>
            </PaginationItem>

            <PaginationItem>
              <motion.div
                className="px-4 py-2 text-sm font-medium"
                key={page}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {page + 1} / {totalPages + 1}
              </motion.div>
            </PaginationItem>

            <PaginationItem>
              <motion.div
                whileHover={{ scale: page === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: page === totalPages ? 1 : 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <PaginationNext
                  onClick={handleNext}
                  className={`transition-all duration-200 ${
                    page === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-accent"
                  }`}
                />
              </motion.div>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </motion.div>
    </>
  );
}
