"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogIn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
        >
          <button onClick={() => signOut()}>Sign Out</button>
        </Button>
      </>
    );
  }
  return (
    <>
      <Button
        asChild
        size="lg"
        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
      >
        <button onClick={() => signIn("google")}>Sign in</button>
      </Button>
    </>
  );
}
