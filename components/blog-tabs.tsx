"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import BlogPreview from "./blog-preview";
import { RefObject, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BlogTabsProps {
  content: string;
  setContentAction: (content: string) => void;
  textAreaRef: RefObject<HTMLTextAreaElement>;
}

export default function BlogTabs({
  content,
  setContentAction,
  textAreaRef,
}: BlogTabsProps) {
  const [tab, setTab] = useState("write");
  const handlePaste = async (event) => {
    const items = event.clipboardData.items;

    for (const item of items) {
      if (item.type.indexOf("image") === 0) {
        event.preventDefault();

        const file = item.getAsFile();
        if (file) {
          // console.log(file);
          // const link = await uploadImage(file); // <-- Define this
          // insertAtCursor(`![](${link})`);
        }
      }
    }
  };
  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    >
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-2">
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
            {tab === "write" && (
              <motion.div
                key="write-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Textarea
                  ref={textAreaRef as any}
                  id="content"
                  placeholder="Write your blog content using markdown..."
                  className="min-h-[300px] transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 resize-none"
                  value={content}
                  onChange={(e) => {
                    localStorage.setItem("content", e.target.value);
                    setContentAction(e.target.value);
                  }}
                  required
                />
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="preview" key="preview" className="mt-2">
            {tab === "preview" && <BlogPreview content={content} />}
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
}
