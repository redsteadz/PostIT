"use client";

import FullscreenWrapper from "@/components/fullscreen-wrapper";
import { Card } from "@/components/ui/card";
import Masonry from "@mui/lab/Masonry";
import { motion } from "motion/react";
import { NoteType } from "@/db/models/Note";
import CreateNoteButton from "@/components/create-note-button";
import NoteRenderer from "@/components/note/note-render";
import { useOptimistic, useState } from "react";

interface NotesPageProps {
  notesInfo: NoteType[];
}

export default function NotesPage({ notesInfo }: NotesPageProps) {
  const [notes, setNotes] = useState<NoteType[]>(notesInfo);
  const [optimisticNotes, setOptimisticNotes] = useOptimistic(
    notes,
    (state: NoteType[], newNote: NoteType) => [newNote, ...state],
  );
  return (
    <div className="px-2 sm:px-14">
      <Masonry columns={{ xs: 2, sm: 3 }} spacing={2}>
        {optimisticNotes.map((note, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <FullscreenWrapper>
              <Card
                className="overflow-auto"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <NoteRenderer note={note} />
              </Card>
            </FullscreenWrapper>
          </motion.div>
        ))}
      </Masonry>
      <CreateNoteButton
        setOptimisticNotesAction={setOptimisticNotes}
        setNotesAction={setNotes}
      />
    </div>
  );
}
