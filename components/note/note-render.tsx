"use client";

import { NoteType } from "@/db/models/Note";
import ImageNote from "./note-types/image-note";
import VideoNote from "./note-types/video-note";
import AudioNote from "./note-types/audio-note";
import TextNote from "./note-types/text-note";
import { useMemo } from "react";

export default function NoteRenderer({ note }: { note: NoteType }) {
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

  return renderedNote;
}
