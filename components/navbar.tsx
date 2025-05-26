"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Clover, PenSquare } from "lucide-react";
import ProfileCard from "./profile-card";
import LogIn from "./login-btn";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const brand = "MSOS";
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link
            prefetch={true}
            href="/"
            className="flex items-center space-x-2"
          >
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text">
              {brand}
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            {session && (
              <Link
                href="/nostalgia"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/nostalgia"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Nostalgia
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {session ? (
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                size="icon"
                className="md:hidden"
              >
                <Link href="/nostalgia">
                  <Clover className="h-5 w-5" />
                  <span className="sr-only">Nostalgic Vibes</span>
                </Link>
              </Button>
              <ProfileCard />
            </div>
          ) : (
            <div>
              <LogIn />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
