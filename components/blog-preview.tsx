"use client";

import { motion } from "motion/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function BlogPreview({ content }: { content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="prose max-w-none dark:prose-invert"
    >
      <Markdown children={content} remarkPlugins={[remarkGfm]} />
    </motion.div>
  );
}
