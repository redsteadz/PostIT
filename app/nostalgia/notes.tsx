"use client";

import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import { NoteType } from "@/db/models/Note";
import CreateNoteButton from "@/components/create-note-button";
import NoteRenderer from "@/components/note/note-render";
import { useOptimistic, useState } from "react";

interface NotesPageProps {
  notesInfo: NoteType[];
}
export type NoteAction =
  | { type: "add"; note: NoteType }
  | { type: "remove"; noteId: string };

export default function NotesPage({ notesInfo }: NotesPageProps) {
  const [notes, setNotes] = useState<NoteType[]>(notesInfo);
  const [optimisticNotes, setOptimisticNotes] = useOptimistic(
    notes,
    (state: NoteType[], action: NoteAction) => {
      switch (action.type) {
        case "add":
          return [action.note, ...state];
        case "remove":
          return state.filter((note) => note.id !== action.noteId);
        default:
          return state;
      }
    },
  );

  if (optimisticNotes.length == 0) {
    return (
      <div className="h-auto text-muted-foreground italic">
        <div className="text-center">
          Wow! Such empty... maybe add something?
        </div>
        <CreateNoteButton
          setOptimisticNotesAction={setOptimisticNotes}
          setNotesAction={setNotes}
        />
      </div>
    );
  }

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
              <Card className="break-inside-avoid overflow-auto">
                <NoteRenderer
                  setNotesAction={setNotes}
                  note={note}
                  setOptimisticNotesAction={setOptimisticNotes}
                />
              </Card>
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
