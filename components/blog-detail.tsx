"use client";
import Markdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";
import { PostType } from "@/db/models/Post";

export default function BlogDetail({ posts }: { posts: PostType }) {
  return (
    <>
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold tracking-tight">{posts.title}</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{posts.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={posts.date.toString()}>
            {new Date(posts.date.toString()).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </motion.div>

      <motion.div
        className="mt-8 prose dark:prose-invert max-w-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <Markdown>{posts.content.toString()}</Markdown>
      </motion.div>
    </>
  );
}
