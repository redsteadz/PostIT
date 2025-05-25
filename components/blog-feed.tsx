import { getPosts } from "@/lib/actions";
import BlogBlock from "./blog-block";
import { PostType } from "@/db/models/Post";
import { Key } from "react";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { BlogFeedPaginate } from "./blog-paginate";
import { PostStats } from "./blog-stats";

export async function BlogFeed() {
  const { status = 0, posts } = await getPosts({ id: "", all: true });

  const session = await auth();

  if (!session) {
    return (
      <div>
        {" "}
        <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
          <span className="italic underline-offset-1">
            You must login to get the posts !{" "}
          </span>
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
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
    <>
      <PostStats posts={posts} />
      <BlogFeedPaginate posts={posts} />;
    </>
  );
}
