import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getBlogPosts } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export async function BlogFeed() {
  const posts = await getBlogPosts()

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No blog posts yet</h2>
        <p className="text-muted-foreground">Be the first to create a blog post!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.id}`} className="group">
          <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{post.title}</CardTitle>
              <CardDescription className="flex items-center text-xs">
                <span>{post.author}</span>
                <span className="mx-1">•</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {post.content.substring(0, 150)}
                {post.content.length > 150 ? "..." : ""}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                Read more
              </Badge>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
