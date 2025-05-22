"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function ProfileCard() {
  const { data: session } = useSession();
  if (session) {
    const [first = "", second = ""] = session.user!.name!.split(" ");
    const shortHand = first[0] + (second[0] ?? first[1] ?? "");

    return (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={session.user!.image!} />
          <AvatarFallback>{shortHand}</AvatarFallback>
        </Avatar>
        <span className="text-sm hidden md:inline-block">
          {second ?? first}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            signOut();
          }}
          aria-label="Logout"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    );
  }
  return (
    <div>
      <Button asChild variant="default" size="sm">
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}
