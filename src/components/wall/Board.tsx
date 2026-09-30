"use client";

import { useState } from "react";
import type { NewNote } from "@/types";
import { NoteComposer } from "@/components/composer/NoteComposer";
import { useCreateNote, useMyReactedNoteIds, useNotes, useToggleReaction } from "@/lib/data/notes";
import { usePeople } from "@/lib/data/people";
import { useReactorId } from "@/lib/useReactorId";
import { WallSection } from "./wallSection";

function WallSkeleton() {
  return (
    <section id="wall" aria-busy="true" aria-label="Loading notes" className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
      {[150, 210, 180, 230, 160, 200, 170, 220].map((h, i) => (
        <div key={i} style={{ height: h }} className="mb-6 animate-pulse break-inside-avoid rounded-note bg-white/60" />
      ))}
    </section>
  );
}

export function Board() {
  const notes = useNotes();
  const people = usePeople();
  const createNote = useCreateNote();
  const reactorId = useReactorId();
  const reactedIds = useMyReactedNoteIds(reactorId);
  const toggleReaction = useToggleReaction();
  const [resetKey, setResetKey] = useState(0);

  async function addNote(input: NewNote) {
    await createNote(input);
    setResetKey((k) => k + 1);
    requestAnimationFrame(() =>
      document.getElementById("wall")?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  }

  function handleToggleReaction(noteId: string) {
    if (!reactorId) return; // id hasn't loaded from localStorage yet
    toggleReaction(noteId, reactorId).catch(() => {
      console.error("Couldn't update that reaction — please try again.");
    });
  }

  return (
    <>
      <section id="composer" className="scroll-mt-6 py-12">
        <NoteComposer people={people} onSubmit={addNote} />
      </section>

      {notes === undefined ? (
        <WallSkeleton />
      ) : (
        <WallSection
          key={resetKey}
          notes={notes}
          reactedIds={reactedIds}
          onToggleReaction={handleToggleReaction}
        />
      )}
    </>
  );
}