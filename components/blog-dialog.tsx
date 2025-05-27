"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import BlogForm from "./blog-form";

export default function BlogDialog({
  isOpen,
  setIsOpenAction,
}: {
  isOpen: boolean;
  setIsOpenAction: (b: boolean) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="p-6 overflow-y-auto max-h-[90vh]"
          >
            <DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Create New Blog Post
                </DialogTitle>
                <DialogDescription className="mt-2">
                  Share your thoughts with the world. Use markdown to format
                  your content.
                </DialogDescription>
              </motion.div>
            </DialogHeader>
            <BlogForm setIsOpenAction={setIsOpenAction} />
          </motion.div>
        </DialogContent>
      )}
    </AnimatePresence>
  );
}
