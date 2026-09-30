export type NoteColor =            // still used by the hero's mini notes
  | "buttercup" | "peach" | "blossom"
  | "lavender" | "mint" | "sky" | "coral";

export type PaletteId =
  | "plum" | "olive" | "cream" | "ocean" | "rose" | "marigold" | "noir";

export type NoteFormat = "swatch" | "tin" | "print";

export type IconId =
  | "flower" | "tulip" | "lotus" | "leaf" | "plant"
  | "heart" | "star" | "sparkle" | "butterfly" | "sun";

export type Role =
  | "mentee" | "mentor" | "alumni" | "founder"
  | "intern" | "fellow" | "committee";

export interface Person {
  id: string;
  name: string;
  role: Role;
  track?: string;
  cohort?: number;
}

export interface Note {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientRole: Role;
  recipientTrack?: string;
  message: string;
  palette: PaletteId;
  format: NoteFormat;
  icon: IconId;
  authorName: string | null; // null = anonymous
  reactions: number;
  createdAt: Date;
}

export type NewNote = Omit<Note, "id" | "createdAt" | "reactions">;