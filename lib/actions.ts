"use server";

interface BlogPostData {
  title: string;
  content: string;
  author?: string;
  date: string;
}

import dbConnect from "@/lib/mongoose";
import Post, { PostType } from "@/db/models/Post";
import User from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../app/api/auth/[...nextauth]/route";
import { Types } from "mongoose";

export async function createBlogPost(data: BlogPostData) {
  // In a real app, this would save to a database
  // For now, we're just simulating success
  console.log("Creating blog post:", data);

  await dbConnect();
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const post = await Post.create({
      title: data.title,
      content: data.content,
      author: user._id,
      date: data.date,
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getPosts(body: {
  id?: string;
  all?: boolean;
}): Promise<PostType[] | PostType | Object> {
  await dbConnect();
  const session = await auth();

  if (!session || !session.user?.email) {
    return { error: "Unauthorized", status: 401 };
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return { error: "User not found", status: 404 };
  }

  try {
    if (body.all == true) {
      const allPosts = await Post.find()
        .sort({ date: -1 })
        .populate("author")
        .lean();
      const serializedPosts = allPosts.map((post) => ({
        title: post.title,
        content: post.content,
        id: post._id!.toString(),
        date: post.date?.toString(),
        author: post.author!.name,
      }));
      return { status: 200, posts: serializedPosts };
    } else if (body.id) {
      const post = await Post.findById(body.id).populate("author");
      if (!post) return { error: "Post not found", status: 404 };
      const serializedPost = {
        title: post.title,
        content: post.content,
        id: post._id.toString(),
        date: post.date?.toString(),
        author: post.author!.name,
      };
      return { status: 200, posts: serializedPost };
    } else {
      return { error: "Invalid request", status: 400 };
    }
  } catch (error) {
    return { error: "Error: " + (error as Error).message, status: 500 };
  }
}
