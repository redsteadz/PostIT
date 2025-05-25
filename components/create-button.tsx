"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import remarkGfm from "remark-gfm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createBlogPost } from "@/lib/actions";
import Markdown from "react-markdown";
import { useRouter } from "next/navigation";
import { FilePlus2 } from "lucide-react";

export default function CreateBlogButton() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setContent(localStorage.getItem("content") ?? "");
    setTitle(localStorage.getItem("title") ?? "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

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
        // console.log(resp.post);
        router.push("/blog/" + resp.post._id);
      }
    } catch (error) {
      toast.error("Failed to create blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-4">
      <Drawer>
        <DrawerTrigger>
          <div className="flex justify-center items-center rounded-full bg-secondary w-12 h-12 cursor-pointer">
            <FilePlus2 scale={1.5} />
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Blog Post</DrawerTitle>
            <DrawerDescription>
              Share your thoughts with the world. Use markdown to format your
              content.
            </DrawerDescription>
          </DrawerHeader>
          <div>
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter your blog title"
                      value={title}
                      onChange={(e) => {
                        localStorage.setItem("title", e.target.value);
                        setTitle(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Tabs defaultValue="write">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="write">Write</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="write" className="mt-2">
                        <Textarea
                          id="content"
                          placeholder="Write your blog content using markdown..."
                          className="min-h-[300px]"
                          value={content}
                          onChange={(e) => {
                            localStorage.setItem("content", e.target.value);
                            setContent(e.target.value);
                          }}
                          required
                        />
                      </TabsContent>
                      <TabsContent value="preview" className="mt-2">
                        <div className="mt-8 prose dark:prose-invert max-w-none">
                          <div className="border rounded-md min-h-[300px] p-4 bg-background">
                            <Markdown remarkPlugins={[remarkGfm]}>
                              {content}
                            </Markdown>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
                <DrawerFooter className="flex flex-col items-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 max-w-48"
                  >
                    {isSubmitting ? "Publishing..." : "Publish Post"}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline" className="max-w-48">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
