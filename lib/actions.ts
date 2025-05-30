"use server";
import dbConnect from "@/lib/mongoose";
import Post, { PostType } from "@/db/models/Post";
import Note, { NoteType } from "@/db/models/Note";
import User from "@/db/models/User";
import { auth } from "../app/api/auth/[...nextauth]/route";

export async function createNote(data: NoteType) {
  await dbConnect();
  const body = data;
  const session = await auth();

  if (!session || !session.user?.email) {
    return { status: 401, error: "Unauthorized" };
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { status: 401, error: "User not found" };
    }
    await new Promise((res) => setTimeout(res, 3000));
    const note = await Note.create({
      src: body.src,
      type: body.type,
      description: body.description,
      date: body.date ?? new Date().toISOString(),
      author: user._id,
    });
    return {
      status: 200,
      post: {
        id: note._id.toString(),
        src: body.src,
        type: body.type,
        description: body.description,
        date: body.date ?? new Date().toISOString(),
        author: body.author,
      },
    };
  } catch (error) {
    // console.log(error);
    return { status: 400 };
  }
}

export async function createBlogPost(data: PostType) {
  await dbConnect();
  const body = data;
  const session = await auth();
  if (!session || !session.user?.email) {
    return { status: 401, error: "Unauthorized" };
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { status: 401, error: "User not found" };
    }

    const post = await Post.create({
      title: body.title,
      content: body.content,
      author: user._id,
      date: body.date,
    });
    return {
      status: 200,
      post: {
        _id: post._id.toString(),
        title: body.title,
        content: body.content,
        author: body.author,
        date: body.date,
      },
    };
  } catch (error) {
    return { status: 400 };
  }
}

type GetNotesResponse =
  | { status: 200; notes: NoteType[] }
  | { status: 400 | 401 | 404 | 500; error: string };

export async function getNotes(body: {
  id?: string;
  all?: boolean;
}): Promise<GetNotesResponse> {
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
    if (body.all === true) {
      const allNotes = await Note.find()
        .sort({ date: -1 })
        .populate("author")
        .lean();

      const serializedNotes: NoteType[] = allNotes.map((note: any) => ({
        id: note._id.toString(),
        src: note.src,
        type: note.type,
        description: note.description,
        date: note.date?.toString(),
        author: note.author?.name || "Unknown",
      }));

      return { status: 200, notes: serializedNotes };
    } else if (body.id) {
      const note = await Note.findById(body.id).populate("author");
      if (!note) return { error: "Note not found", status: 404 };

      const serializedNote: NoteType = {
        id: note._id.toString(),
        src: note.src,
        type: note.type,
        description: note.description,
        date: note.date?.toString(),
        author: note.author?.name || "Unknown",
      };

      return { status: 200, notes: [serializedNote] };
    } else {
      return { error: "Invalid request", status: 400 };
    }
  } catch (error) {
    return { error: "Error: " + (error as Error).message, status: 500 };
  }
}

export async function getPosts(body: {
  id?: string;
  all?: boolean;
}): Promise<{ status: number; posts?: PostType[] | PostType; error?: string }> {
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
