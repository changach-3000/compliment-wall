import type { Note, NoteFormat } from "@/types";

export type FilterId = "all" | "mentors" | "mentees" | "cheered" | "recent";
export type FormatFilter = NoteFormat | "any";

export const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All Notes" },
  { id: "mentors", label: "Mentors" },
  { id: "mentees", label: "Mentees" },
  // { id: "cheered", label: "Most Cheered" },
  { id: "recent", label: "Recent" },
];

interface FilterOptions {
  filter: FilterId;
  format: FormatFilter;
  query: string;
}

export function filterNotes(
  notes: Note[],
  { filter, format, query }: FilterOptions,
): Note[] {
  const q = query.trim().toLowerCase();

  const result = notes.filter((n) => {
    if (format !== "any" && n.format !== format) return false;
    if (
      filter === "mentors" &&
      !["mentor", "founder", "fellow", "committee"].includes(n.recipientRole)
    )
      return false;
    if (filter === "mentees" && n.recipientRole !== "mentee") return false;
    if (!q) return true;

    const haystack = [
      n.recipientName,
      n.message,
      n.recipientTrack,
      n.authorName,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  if (filter === "cheered") result.sort((a, b) => b.reactions - a.reactions);
  if (filter === "recent")
    result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return result;
}
