"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Doc } from "../../../convex/_generated/dataModel";
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
    reactions: doc.reactions,
    createdAt: new Date(doc._creationTime),
  };
}

/** Live list of notes, always current. `undefined` only until the first load resolves. */
export function useNotes(): Note[] | undefined {
  const docs = useQuery(api.notes.list);
  return docs?.map(toNote);
}

export function useCreateNote() {
  const create = useMutation(api.notes.create);
  return (input: NewNote) => create(input);
}