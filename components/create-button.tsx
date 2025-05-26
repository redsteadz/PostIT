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
import { FilePlus2, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export default function CreateBlogButton() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("write")
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
        setIsOpen(false)
        router.push("/blog/" + resp.post._id)
      }
    } catch (error) {
      toast.error("Failed to create blog post")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-4 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(168, 85, 247, 0.4)",
                "0 0 0 10px rgba(168, 85, 247, 0)",
                "0 0 0 0 rgba(168, 85, 247, 0)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          >
            <Button
              size="icon"
              className="rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 w-12 h-12 shadow-lg"
            >
              <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                <FilePlus2 className="h-6 w-6 text-white" />
              </motion.div>
            </Button>
          </motion.div>
        </DialogTrigger>

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
                      Share your thoughts with the world. Use markdown to format your content.
                    </DialogDescription>
                  </motion.div>
                </DialogHeader>

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
                    <Label htmlFor="title" className="text-sm font-medium">
                      Title
                    </Label>
                    <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <Input
                        id="title"
                        placeholder="Enter your blog title"
                        value={title}
                        onChange={(e) => {
                          localStorage.setItem("title", e.target.value)
                          setTitle(e.target.value)
                        }}
                        className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                        required
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <Label htmlFor="content" className="text-sm font-medium">
                      Content
                    </Label>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                          value="write"
                          className="transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500"
                        >
                          Write
                        </TabsTrigger>
                        <TabsTrigger
                          value="preview"
                          className="transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500"
                        >
                          Preview
                        </TabsTrigger>
                      </TabsList>

                      <AnimatePresence mode="wait">
                        <TabsContent value="write" key="write" className="mt-2">
                          {activeTab === "write" && (
                            <motion.div
                              key="write-tab"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Textarea
                                id="content"
                                placeholder="Write your blog content using markdown..."
                                className="min-h-[300px] transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 resize-none"
                                value={content}
                                onChange={(e) => {
                                  localStorage.setItem("content", e.target.value)
                                  setContent(e.target.value)
                                }}
                                required
                              />
                            </motion.div>
                          )}
                        </TabsContent>

                        <TabsContent value="preview" key="preview" className="mt-2">
                          {activeTab === "preview" && (
                            <motion.div
                              key="preview-tab"
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
                                  <p className="text-muted-foreground italic">Start writing to see the preview...</p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </TabsContent>
                      </AnimatePresence>
                    </Tabs>
                  </motion.div>

                  <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      <DialogClose asChild>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="outline"
                            type="button"
                            className="w-full sm:w-auto transition-all duration-200"
                          >
                            Cancel
                          </Button>
                        </motion.div>
                      </DialogClose>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 disabled:opacity-70"
                      >
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Publishing...
                            </motion.div>
                          ) : (
                            <motion.span
                              key="publish"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              Publish Post
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </DialogFooter>
                </motion.form>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  )
}
