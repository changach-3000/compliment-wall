"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flower as FlowerIcon } from "@phosphor-icons/react";
import type { Note } from "@/types";
import { paletteVars, tiltForId } from "@/lib/noteStyle";
import { timeAgo } from "@/lib/time";
import { PrintFace, SwatchFace, TinFace } from "./noteFormats";

const FACES = {
  swatch: SwatchFace,
  tin: TinFace,
  print: PrintFace,
} as const;

const SHADOW_REST = "0 2px 4px rgba(41,37,36,0.04), 0 6px 16px rgba(41,37,36,0.07)";
const SHADOW_LIFTED = "0 12px 28px rgba(41,37,36,0.10), 0 4px 10px rgba(41,37,36,0.06)";

interface NoteCardProps {
  note: Note;
  index?: number;    // only used to stagger the entrance
  preview?: boolean; // composer preview: no hover, no reactions
  hideFooter?: boolean; 
}

export function NoteCard({ note, index = 0, preview = false, hideFooter = false }: NoteCardProps) {
  const [reacted, setReacted] = useState(false);
  const tilt = tiltForId(note.id);
  const count = note.reactions + (reacted ? 1 : 0);
  const Face = FACES[note.format];
  const hasTape = note.format === "swatch" || note.format === "print";
  const lifted = { rotate: 0, y: -4, scale: 1.02, boxShadow: SHADOW_LIFTED };
  const delay = preview ? 0 : Math.min(index, 8) * 0.06;

  const signature = <>— {note.authorName ?? "From someone who thinks you're amazing"}</>;

  const footer = (
    <div className="flex items-center justify-between text-xs">
      <span suppressHydrationWarning className="opacity-70">
        {preview ? "Just now" : timeAgo(note.createdAt)}
      </span>
      <motion.button
        type="button"
        disabled={preview}
        aria-pressed={reacted}
        aria-label={`Send a flower to ${note.recipientName}. ${count} so far`}
        whileTap={{ scale: 1.25 }}
        transition={{ type: "spring", stiffness: 500, damping: 12 }}
        onClick={() => setReacted((r) => !r)}
        className={`flex items-center gap-1 rounded-full bg-white px-2.5 py-1 font-semibold text-ink shadow-sm ${
          reacted ? "ring-2 ring-rose" : ""
        }`}
      >
        <FlowerIcon size={15} weight={reacted ? "fill" : "duotone"} className="text-rose" />
        {count}
      </motion.button>
    </div>
  );

  return (
    <div style={paletteVars(note.palette)}>
      <motion.article
        tabIndex={preview ? -1 : 0}
        aria-label={`Note for ${note.recipientName}`}
        initial={{ opacity: 0, y: 24, rotate: tilt }}
        animate={{
          opacity: 1,
          y: 0,
          rotate: tilt,
          boxShadow: SHADOW_REST,
          transition: { delay, type: "spring", stiffness: 260, damping: 22 },
        }}
        whileHover={preview ? undefined : lifted}
        whileFocus={preview ? undefined : lifted}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative rounded-note"
      >
        {hasTape && (
          <span
            aria-hidden
            className="absolute -top-2 left-1/2 z-10 h-4 w-14 -translate-x-1/2 rounded-[2px] bg-white/70 shadow-sm backdrop-blur-[2px]"
          />
        )}
       <Face note={note} signature={signature} footer={hideFooter ? null : footer} />
      </motion.article>
    </div>
  );
}