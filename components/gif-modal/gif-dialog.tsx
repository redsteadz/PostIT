"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import GifGrid from "./gif-grid";
import { useState } from "react";

export default function GIFDialog({
  setSrcAction,
}: {
  setSrcAction: (src: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="icon"
            type="button"
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 w-16 h-12 shadow-lg text-xl font-bold transition-transform duration-200"
          >
            GIF
          </Button>
        </motion.div>
      </DialogTrigger>

      <AnimatePresence>
        <DialogContent forceMount className="max-h-[90vh] overflow-hidden p-0">
          <motion.div
            key="gif-dialog"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="p-6 overflow-y-auto max-h-[90vh]"
          >
            <DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Pick a GIF
                </DialogTitle>
              </motion.div>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <GifGrid setSrcAction={setSrcAction} setOpenAction={setIsOpen} />
            </motion.div>

            <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </AnimatePresence>
    </Dialog>
  );
}
