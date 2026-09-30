import type { Note } from "@/types";
import { NoteCard } from "./noteCard";

export function WallGrid({ notes }: { notes: Note[] }) {
  return (
    <section
      aria-label="Compliment wall"
      className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4"
    >
      {notes.map((note, i) => (
        <div key={note.id} className="mb-6 break-inside-avoid px-1 pt-3">
          <NoteCard note={note} index={i} />
        </div>
      ))}
    </section>
  );
}