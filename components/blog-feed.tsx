import { getBlogPosts } from "@/lib/data";
import BlogBlock from "./blog-block";

export async function BlogFeed() {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No blog posts yet</h2>
        <p className="text-muted-foreground">
          Be the first to create a blog post!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogBlock key={post.id} post={post} />
      ))}
    </div>
  );
}
