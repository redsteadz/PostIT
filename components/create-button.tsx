"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import remarkGfm from "remark-gfm"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { createBlogPost } from "@/lib/actions"
import Markdown from "react-markdown"
import { useRouter } from "next/navigation"
import { FilePlus2 } from "lucide-react"

export default function CreateBlogButton() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setContent(localStorage.getItem("content") ?? "")
    setTitle(localStorage.getItem("title") ?? "")
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    const loadingToast = toast.loading("Posting your post !")
    setIsSubmitting(true)
    try {
      const resp = await createBlogPost({
        title,
        content,
        date: new Date().toISOString(),
      })
      localStorage.clear()
      toast.success("Your blog post has been created")
      toast.dismiss(loadingToast)
      if (resp.status === 200 && resp.post) {
        // console.log(resp.post);
        router.push("/blog/" + resp.post._id)
      }
    } catch (error) {
      toast.error("Failed to create blog post")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" className="rounded-full bg-secondary hover:bg-secondary/80 w-12 h-12">
            <FilePlus2 className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
            <DialogDescription>
              Share your thoughts with the world. Use markdown to format your content.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your blog title"
                  value={title}
                  onChange={(e) => {
                    localStorage.setItem("title", e.target.value)
                    setTitle(e.target.value)
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
                        localStorage.setItem("content", e.target.value)
                        setContent(e.target.value)
                      }}
                      required
                    />
                  </TabsContent>
                  <TabsContent value="preview" className="mt-2">
                    <div className="prose dark:prose-invert max-w-none">
                      <div className="border rounded-md min-h-[300px] p-4 bg-background overflow-y-auto">
                        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
              >
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
