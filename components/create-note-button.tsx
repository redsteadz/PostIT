"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger, Dialog } from "@/components/ui/dialog";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { NotebookPen } from "lucide-react";
import { motion } from "motion/react";
import NoteForm from "./note-form";
export default function CreateNoteButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 z-50">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(168, 85, 247, 0.4)",
                "0 0 0 20px rgba(168, 85, 247, 0)",
                "0 0 0 0 rgba(168, 85, 247, 0)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Button
              size="icon"
              className="rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 w-12 h-12 shadow-lg"
            >
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <NotebookPen className="h-6 w-6 text-white" />
              </motion.div>
            </Button>
          </motion.div>
        </DrawerTrigger>
        <NoteForm setIsOpenAction={setIsOpen} />
      </Drawer>
    </div>
  );
}
