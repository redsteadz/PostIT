"use client";

import { motion } from "motion/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function BlogPreview({ content }: { content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="prose dark:prose-invert max-w-none"
    >
      <div className="border rounded-md min-h-[300px] p-4 bg-background overflow-y-auto">
        {content ? (
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        ) : (
          <p className="text-muted-foreground italic">
            Start writing to see the preview...
          </p>
        )}
      </div>
    </motion.div>
  );
}
