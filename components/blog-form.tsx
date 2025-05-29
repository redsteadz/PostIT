"use client";

import {
  startTransition,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import BlogTabs from "./blog-tabs";
import { createBlogPost } from "@/lib/actions";
import { Loader2 } from "lucide-react";

export default function BlogForm({
  setIsOpenAction,
}: {
  setIsOpenAction: (b: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textAreaRef = useRef(0);
  const router = useRouter();

  useEffect(() => {
    setTitle(localStorage.getItem("title") ?? "");
    setContent(localStorage.getItem("content") ?? "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim())
      return toast.error("Please fill in all fields");

    const loadingToast = toast.loading("Posting your post !");
    setIsSubmitting(true);
    try {
      const resp = await createBlogPost({
        title,
        content,
        date: new Date().toISOString(),
      });
      localStorage.clear();
      toast.success("Your blog post has been created");
      toast.dismiss(loadingToast);
      if (resp.status === 200 && resp.post) {
        startTransition(() => {
          setIsOpenAction(false);
          router.push("/blog/" + resp.post._id);
        });
      }
    } catch {
      toast.error("Failed to create blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <Label htmlFor="title">Title</Label>
        <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Input
            id="title"
            placeholder="Enter your blog title"
            value={title}
            onChange={(e) => {
              localStorage.setItem("title", e.target.value);
              setTitle(e.target.value);
            }}
            className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
            required
          />
        </motion.div>
      </motion.div>

      <BlogTabs
        content={content}
        setContentAction={(val: string) => {
          setContent(val);
          localStorage.setItem("content", val);
        }}
        textAreaRef={textAreaRef as any}
      />

      <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 disabled:opacity-70"
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div className="flex items-center gap-2" key="loading">
                <Loader2 className="h-4 w-4 animate-spin" />
                Publishing...
              </motion.div>
            ) : (
              <motion.span key="publish">Publish Post</motion.span>
            )}
          </AnimatePresence>
        </Button>
      </DialogFooter>
    </motion.form>
  );
}
