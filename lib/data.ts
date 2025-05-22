// This is a mock data service that would be replaced with a real database

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

// In-memory storage for blog posts
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Markdown",
    content:
      "# Introduction to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. Created by John Gruber in 2004, Markdown is now one of the world's most popular markup languages.\n\n## Why Use Markdown?\n- **Easy to learn and use**\n- **Fast to write**\n- **Platform independent**\n\nYou can use Markdown in *many places*, including:\n\n1. Documentation\n2. READMEs\n3. Forum posts\n4. Blog posts like this one!\n\n```\nThis is a code block\n```\n\n[Learn more about Markdown](https://www.markdownguide.org/)",
    author: "Jane Doe",
    date: "2023-05-01T12:00:00Z",
  },
  {
    id: "2",
    title: "The Future of Web Development",
    content:
      "Web development is constantly evolving. New frameworks, libraries, and tools are being released every day. It's an exciting time to be a web developer!\n\n## Current Trends\n\n- **JAMstack Architecture**\n- **Serverless Functions**\n- **AI-assisted Development**\n\nStay curious and keep learning!",
    author: "John Smith",
    date: "2023-05-15T14:30:00Z",
  },
  {
    id: "3",
    title: "Designing User-Friendly Interfaces",
    content:
      "Good design is invisible. When a user interface is well-designed, users don't notice it. They can accomplish their tasks without frustration or confusion.\n\n## Key Principles\n\n1. **Consistency**\n2. **Clarity**\n3. **Feedback**\n4. **Efficiency**\n\nRemember, the goal is to solve user problems, not to show off your design skills.",
    author: "Alex Johnson",
    date: "2023-06-02T09:15:00Z",
  },
];

// Get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

// Get a single blog post by ID
export async function getBlogPost(id: string): Promise<BlogPost | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return blogPosts.find((post) => post.id === id) || null;
}
