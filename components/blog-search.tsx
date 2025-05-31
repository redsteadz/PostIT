"use client";
import SearchBar from "./search-bar";
import { useBlogPosts } from "./blog-context";

export default function BlogSearch() {
  const { setSearchQuery } = useBlogPosts();

  return <SearchBar setQueryAction={setSearchQuery} />;
}
