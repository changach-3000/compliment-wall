// "use client";

// import { useMutation, useQuery } from "convex/react";
// import { api } from "../../../convex/_generated/api";
// import type { Doc, Id } from "../../../convex/_generated/dataModel";
// import type { NewNote, Note } from "@/types";
// import { mutation } from "../../../convex/_generated/server";

// function toNote(doc: Doc<"notes">): Note {
//   return {
//     id: doc._id,
//     recipientId: doc.recipientId,
//     recipientName: doc.recipientName,
//     recipientRole: doc.recipientRole,
//     recipientTrack: doc.recipientTrack,
//     message: doc.message,
//     palette: doc.palette,
//     format: doc.format,
//     icon: doc.icon,
//     authorName: doc.authorName,
//     reactions: doc.reactorIds?.length ?? 0, 
//     createdAt: new Date(doc._creationTime),
//   };
// }

// export function useNotes(): Note[] | undefined {
//   const docs = useQuery(api.notes.list);
//   return docs?.map(toNote);
// }

// /** Which notes has this browser already reacted to? Reuses the same live query as useNotes —
//  *  Convex caches identical queries, so this doesn't cost a second network round trip. */
// export function useMyReactedNoteIds(reactorId: string | null): Set<string> {
//   const docs = useQuery(api.notes.list);
//   if (!docs || !reactorId) return new Set();
//   return new Set(docs.filter((d) => d.reactorIds.includes(reactorId)).map((d) => d._id));
// }

// export function useCreateNote() {
//   const create = useMutation(api.notes.create);
//   return (input: NewNote) =>
//     create({
//       recipientId: input.recipientId,
//       recipientName: input.recipientName,
//       recipientRole: input.recipientRole,
//       ...(input.recipientTrack ? { recipientTrack: input.recipientTrack } : {}),
//       message: input.message,
//       palette: input.palette,
//       format: input.format,
//       icon: input.icon,
//       authorName: input.authorName,
//     });
// }

// export function useToggleReaction() {
//   const toggle = useMutation(api.notes.toggleReaction);
//   return (noteId: string, reactorId: string) =>
//     toggle({ noteId: noteId as Id<"notes">, reactorId });
// }

// export const migrateReactions = mutation({
//   args: {},
//   handler: async (ctx) => {
//     const notes = await ctx.db.query("notes").collect();
//     let migrated = 0;

//     for (const note of notes) {
//       if (note.reactorIds === undefined) {
//         await ctx.db.patch(note._id, { reactorIds: [] });
//         migrated++;
//       }
//     }

//     console.log(`Migrated ${migrated} of ${notes.length} notes.`);
//   },
// });

"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import type { NewNote, Note } from "@/types";

function toNote(doc: Doc<"notes">): Note {
  return {
    id: doc._id,
    recipientId: doc.recipientId,
    recipientName: doc.recipientName,
    recipientRole: doc.recipientRole,
    recipientTrack: doc.recipientTrack,
    message: doc.message,
    palette: doc.palette,
    format: doc.format,
    icon: doc.icon,
    authorName: doc.authorName,
    reactions: doc.reactorIds?.length ?? 0, // some notes haven't been migrated yet
    createdAt: new Date(doc._creationTime),
  };
}

export function useNotes(): Note[] | undefined {
  const docs = useQuery(api.notes.list);
  return docs?.map(toNote);
}

/** Which notes has this browser already reacted to? Reuses the same live query as useNotes —
 *  Convex caches identical queries, so this doesn't cost a second network round trip. */
export function useMyReactedNoteIds(reactorId: string | null): Set<string> {
  const docs = useQuery(api.notes.list);
  if (!docs || !reactorId) return new Set();
  return new Set(
    docs.filter((d) => (d.reactorIds ?? []).includes(reactorId)).map((d) => d._id)
  );
}

export function useCreateNote() {
  const create = useMutation(api.notes.create);
  return (input: NewNote) =>
    create({
      recipientId: input.recipientId,
      recipientName: input.recipientName,
      recipientRole: input.recipientRole,
      ...(input.recipientTrack ? { recipientTrack: input.recipientTrack } : {}),
      message: input.message,
      palette: input.palette,
      format: input.format,
      icon: input.icon,
      authorName: input.authorName,
    });
}

export function useToggleReaction() {
  const toggle = useMutation(api.notes.toggleReaction);
  return (noteId: string, reactorId: string) =>
    toggle({ noteId: noteId as Id<"notes">, reactorId });
}