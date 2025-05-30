"use client";

import FullscreenWrapper from "@/components/fullscreen-wrapper";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import { NoteType } from "@/db/models/Note";
import { Masonry } from "@mui/lab";
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
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        <AnimatePresence>
          {optimisticNotes.map((note, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              layout
            >
              <FullscreenWrapper>
                <Card className="break-inside-avoid overflow-auto">
                  <NoteRenderer note={note} />
                </Card>
              </FullscreenWrapper>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <CreateNoteButton
        setOptimisticNotesAction={setOptimisticNotes}
        setNotesAction={setNotes}
      />
    </div>
  );
}
