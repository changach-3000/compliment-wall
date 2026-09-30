// "use client";

// import { useState } from "react";
// import type { Note, Person } from "@/types";
// import { NoteComposer } from "@/components/composer/NoteComposer";
// import { WallSection } from "./wallSection";

// export function Board({
//   initialNotes,
//   people,
// }: {
//   initialNotes: Note[];
//   people: Person[];
// }) {
//   const [notes, setNotes] = useState(initialNotes);

//   function addNote(note: Note) {
//     setNotes((prev) => [note, ...prev]);
//     requestAnimationFrame(() =>
//       document.getElementById("wall")?.scrollIntoView({ behavior: "smooth", block: "start" })
//     );
//   }

//   return (
//     <>
//       <section id="composer" className="scroll-mt-6 py-12">
//         <NoteComposer people={people} onSubmit={addNote} />
//       </section>
//       <WallSection notes={notes} />
//     </>
//   );
// }

"use client";

import { useState } from "react";
import type { NewNote } from "@/types";
import { NoteComposer } from "@/components/composer/NoteComposer";
import { useCreateNote, useNotes } from "@/lib/data/notes";
import { usePeople } from "@/lib/data/people";
import { WallSection } from "./wallSection";

function WallSkeleton() {
  return (
    <section
      id="wall"
      aria-busy="true"
      aria-label="Loading notes"
      className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4"
    >
      {[150, 210, 180, 230, 160, 200, 170, 220].map((h, i) => (
        <div
          key={i}
          style={{ height: h }}
          className="mb-6 animate-pulse break-inside-avoid rounded-note bg-white/60"
        />
      ))}
    </section>
  );
}

export function Board() {
  const notes = useNotes();
  const people = usePeople();
  const createNote = useCreateNote();
  const [resetKey, setResetKey] = useState(0);

  async function addNote(input: NewNote) {
    await createNote(input); // rejects into NoteComposer's own try/catch on failure
    setResetKey((k) => k + 1); // remounts WallSection, clearing any filter that could hide the new note
    requestAnimationFrame(() =>
      document.getElementById("wall")?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  }

  return (
    <>
      <section id="composer" className="scroll-mt-6 py-12">
        <NoteComposer people={people} onSubmit={addNote} />
      </section>

      {notes === undefined ? <WallSkeleton /> : <WallSection key={resetKey} notes={notes} />}
    </>
  );
}