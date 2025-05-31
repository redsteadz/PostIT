import { getPosts } from "@/lib/actions";
import { BlogFeedPaginate } from "./blog-paginate";
import { PostStats } from "./blog-stats";
import CreateBlogButton from "./create-button";
import { Skeleton } from "./ui/skeleton";
import { BlogPostsProvider } from "./blog-context";
import BlogSearch from "./blog-search";

export function BlogSkeleton() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full mb-4" />
      ))}
    </div>
  );
}

export async function BlogFeed() {
  const [postsData] = await Promise.all([getPosts({ id: "", all: true })]);

  if (postsData.status == 401) {
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
  if (postsData.status != 200 || !Array.isArray(postsData.posts)) {
    return <div>{postsData.error}</div>;
  }
  const posts = postsData.posts!;
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
      <BlogPostsProvider initialPosts={posts}>
        <BlogSearch />
        <PostStats />
        <BlogFeedPaginate />
        <CreateBlogButton />
      </BlogPostsProvider>
    </>
  );
}
