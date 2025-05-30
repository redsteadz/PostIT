"use client";

import { NoteType } from "@/db/models/Note";
import ImageNote from "./note-types/image-note";
import VideoNote from "./note-types/video-note";
import AudioNote from "./note-types/audio-note";
MenuWrapper;
import TextNote from "./note-types/text-note";
import { startTransition, useMemo } from "react";
import MenuWrapper from "../menu-wrapper";
import { deleteNote } from "@/lib/actions";
import FullscreenWrapper from "../fullscreen-wrapper";
import { toast } from "sonner";

export default function NoteRenderer({
  note,
  setOptimisticNotesAction,
  setNotesAction,
}: {
  note: NoteType;
  setOptimisticNotesAction: (
    action:
      | { type: "add"; note: NoteType & { opt?: boolean } }
      | { type: "remove"; noteId: string },
  ) => void;
  setNotesAction: React.Dispatch<React.SetStateAction<NoteType[]>>;
}) {
  const renderedNote = useMemo(() => {
    switch (note.type) {
      case "img":
        return (
          <ImageNote
            src={note.src}
            description={note.description}
            date={note.date}
          />
        );
      case "vid":
        return (
          <VideoNote
            src={note.src}
            description={note.description}
            date={note.date}
          />
        );
      case "audio":
        return (
          <AudioNote
            src={note.src}
            description={note.description}
            date={note.date}
          />
        );
      case "txt":
      default:
        return <TextNote text={note.description} date={note.date} />;
    }
  }, [note]);
  const handleDelete = async () => {
    const loadingToast = toast.loading("Posting your note...");
    startTransition(() => {
      setOptimisticNotesAction({ type: "remove", noteId: note.id! });
    });
    try {
      const id = note.id!;
      const resp = await deleteNote(note);
      if (resp.status !== 200) {
        throw "Error while deleting request";
      }
      startTransition(() => {
        setNotesAction((prev) => prev.filter((note) => note.id !== id));
        toast.success("Your note has been deleted");
        toast.dismiss(loadingToast);
      });
    } catch (error) {
      toast.error("Error deleting your note");
    }
  };

  const ctxItems = [
    {
      name: "Delete",
      fn: handleDelete,
      className:
        "bg-red-100 hover:bg-red-200 text-red-700 transition-colors duration-300 ease-in-out rounded-md px-4 py-2",
    },
  ];
  return (
    <MenuWrapper
      contextItems={ctxItems}
      className="bg-transparent border-transparent"
    >
      <FullscreenWrapper>{renderedNote}</FullscreenWrapper>
    </MenuWrapper>
  );
}
