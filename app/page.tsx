import { BlogFeed, BlogSkeleton } from "@/components/blog-feed";
import LogIn from "@/components/login-btn";
import { Suspense } from "react";


export default async function Home() {
  return (
    <div className="space-y-8">
      <section className="py-12 space-y-4">
        <h1 className="py-3 text-4xl font-bold tracking-tight text-center sm:text-5xl md:text-6xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text">
          My thoughts in Silence
        </h1>
        <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
          This website encompasses my thoughts, ideas, and what i wanted to tell
          you over time. I am not a diary person. But missing{" "}
          <span className="italic">you</span> was so great that my mind used to
          race. Login with{" "}
          <span className="font-bold italic">k____@___.pk</span>
        </p>
        <div className="flex justify-center mt-8">
          <LogIn />
        </div>
      </section>
      <Suspense fallback={<BlogSkeleton />}>
        <BlogFeed />
      </Suspense>
    </div>
  );
}
