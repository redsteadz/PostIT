"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import BlogPreview from "./blog-preview";
import { RefObject, useState } from "react";

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
          console.log(file);
          // const link = await uploadImage(file); // <-- Define this
          // insertAtCursor(`![](${link})`);
        }
      }
    }
  };
  return (
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

      <TabsContent value="write">
        <Textarea
          ref={textAreaRef}
          value={content}
          onChange={(e) => setContentAction(e.target.value)}
          onPaste={handlePaste}
          placeholder="Write your blog content in markdown..."
          rows={12}
          className="resize-none text-sm min-h-[300px] font-mono"
          required
        />
      </TabsContent>

      <TabsContent value="preview">
        <div className="rounded-md border p-4 min-h-[300px] bg-background">
          <BlogPreview content={content} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
