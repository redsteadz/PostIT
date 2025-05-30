"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "./ui/button";

interface MenuWrapperProps {
  children: React.ReactNode;
  className?: string;
  contextItems: { name: string; fn: () => Promise<void>; className?: string }[];
}

export default function MenuWrapper({
  children,
  contextItems,
  className = "",
}: MenuWrapperProps) {
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className={className}>
          {contextItems.map((item, index) => (
            <ContextMenuItem
              key={index}
              onClick={item.fn}
              className={item.className}
            >
              {item.name}
            </ContextMenuItem>
          ))}
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
