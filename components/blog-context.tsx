"use client";

import React, {
  createContext,
  useContext,
  useState,
  useOptimistic,
  useMemo,
} from "react";
import type { PostType } from "@/db/models/Post";
import Fuse from "fuse.js";

type BlogPostsContextType = {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  optimisticPosts: PostType[];
  addOptimisticPost: (post: PostType) => void;
  filteredPosts: PostType[];
};

const BlogPostsContext = createContext<BlogPostsContextType | undefined>(
  undefined,
);

export const useBlogPosts = () => {
  const context = useContext(BlogPostsContext);
  if (!context)
    throw new Error("useBlogPosts must be used within BlogPostsProvider");
  return context;
};

export const BlogPostsProvider = ({
  children,
  initialPosts,
}: {
  children: React.ReactNode;
  initialPosts: PostType[];
}) => {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);

  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state: PostType[], newPost: PostType) => [newPost, ...state],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const fuse = useMemo(() => {
    return new Fuse(optimisticPosts, {
      keys: ["title", "content"],
    });
  }, [optimisticPosts]);

  // Filtered posts depending on query
  const filteredPosts = useMemo(() => {
    // console.log("Query: ", searchQuery.trim());
    if (searchQuery.trim() == "") return optimisticPosts;
    return fuse.search(searchQuery.trim()).map((result) => result.item);
  }, [searchQuery, fuse, optimisticPosts]);

  return (
    <BlogPostsContext.Provider
      value={{
        posts,
        setPosts,
        optimisticPosts,
        addOptimisticPost,
        filteredPosts,
        setSearchQuery,
      }}
    >
      {children}
    </BlogPostsContext.Provider>
  );
};
