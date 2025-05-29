"use client";

import { useEffect, useState } from "react";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { createNote } from "@/lib/actions";
import { CloudUpload, Loader2 } from "lucide-react";
import GIFDialog from "./gif-modal/gif-dialog";
enum ContentType {
  Text = "txt",
  Video = "vid",
  Image = "img",
  Audio = "audio",
}

const determineType = (src: string): ContentType => {
  if (!src) return ContentType.Text;
  if (/\.(mp4|mov|avi|mkv)$/i.test(src)) return ContentType.Video;
  if (/\.(png|jpeg|jpg|gif|webp)$/i.test(src)) return ContentType.Image;
  if (/\.(mp3|wav|ogg)$/i.test(src)) return ContentType.Text;
  if (/youtube\.com|youtu\.be|instagram\.com|reddit\.com/i.test(src))
    return ContentType.Video;
  if (/spotify\.com/i.test(src)) return ContentType.Audio;
  return ContentType.Text;
};

export default function NoteForm({
  setIsOpenAction,
}: {
  setIsOpenAction: (b: boolean) => void;
}) {
  const [src, setSrc] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSrc(localStorage.getItem("src") ?? "");
    setDescription(localStorage.getItem("description") ?? "");
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file); // Replace with real upload URL later
      setSrc(fakeUrl);
      localStorage.setItem("src", fakeUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!src.trim() || !description.trim()) {
      return toast.error("Please fill in all fields");
    }

    const loadingToast = toast.loading("Posting your note...");
    setIsSubmitting(true);
    try {
      // txt -> src is empty
      // video -> mp4, youtube, instagram, reddit
      // image -> png, jpeg, jpg ... eg
      // audio -> mp3, spotifya
      const type = determineType(src);
      const resp = await createNote({
        src,
        description,
        type,
        date: new Date().toISOString(),
      });
      localStorage.clear();
      toast.success("Your note has been created");
      toast.dismiss(loadingToast);
      if (resp.status === 200 && resp.post) {
        setIsOpenAction(false);
      }
    } catch {
      toast.error("Failed to create note");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <DrawerContent className="flex justify-center items-center">
      <DrawerHeader>
        <DrawerTitle>Create a New Note</DrawerTitle>
      </DrawerHeader>

      <form onSubmit={handleSubmit} className="space-y-6 px-4 mt-2 ">
        <div className="flex justify-evenly items-center">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="icon"
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 w-16 h-12 shadow-lg text-xl font-bold"
            >
              <CloudUpload className="!w-6 !h-6" />
            </Button>
          </motion.div>
          <GIFDialog setSrcAction={setSrc} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="src-url">Source URL</Label>
          <Input
            id="src-url"
            placeholder="Or paste a direct URL here"
            value={src}
            onChange={(e) => {
              setSrc(e.target.value);
              localStorage.setItem("src", e.target.value);
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="What is this note about?"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              localStorage.setItem("description", e.target.value);
            }}
            required
          />
        </div>

        <DrawerFooter className="flex flex-col sm:flex-row gap-3 pt-4">
          <DrawerClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DrawerClose>
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
                <motion.span key="publish">Publish Note</motion.span>
              )}
            </AnimatePresence>
          </Button>
        </DrawerFooter>
      </form>
    </DrawerContent>
  );
}
