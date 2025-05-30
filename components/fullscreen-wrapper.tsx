"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FullscreenWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function FullscreenWrapper({
  children,
  className = "",
}: FullscreenWrapperProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isFullscreen]);

  return (
    <>
      <div
        className={`cursor-zoom-in ${className}`}
        onClick={() => setIsFullscreen(true)}
      >
        {children}
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              className="max-h-full max-w-full overflow-auto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // prevent closing on inner click
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
