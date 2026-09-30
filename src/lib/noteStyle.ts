import type { CSSProperties } from "react";
import type { NoteFormat, PaletteId } from "@/types";
import { CURRENT_COHORT } from "./config";

export interface Palette {
  name: string;
  from: string;   // gradient start
  to: string;     // gradient end
  ink: string;    // text colour ON the gradient
  accent: string; // icon / highlight ON the gradient
  deep: string;   // a dark colour readable on light paper
}

export const PALETTES: Record<PaletteId, Palette> = {
  plum:     { name: "Plum Wine",    from: "#6b3f56", to: "#4a2a3d", ink: "#fdf4ee", accent: "#f3c1a0", deep: "#4a2a3d" },
  olive:    { name: "Olive Grove",  from: "#5f6e30", to: "#45521f", ink: "#fbf7e8", accent: "#e8dfa0", deep: "#45521f" },
  cream:    { name: "Cream Linen",  from: "#fdf6e3", to: "#f0dfb8", ink: "#2b2118", accent: "#b45309", deep: "#7c4a03" },
  ocean:    { name: "Harbour Blue", from: "#46739f", to: "#2c5079", ink: "#f5faff", accent: "#ffe4a8", deep: "#2c5079" },
  rose:     { name: "Rose Petal",   from: "#f7b2bd", to: "#ea7d93", ink: "#3a0d1a", accent: "#8a1030", deep: "#9f1239" },
  marigold: { name: "Marigold",     from: "#fcd34d", to: "#f59e0b", ink: "#2a1a05", accent: "#7c2d12", deep: "#92400e" },
  noir:     { name: "Midnight Ink", from: "#3a3330", to: "#181413", ink: "#f8efe6", accent: "#fbbf24", deep: "#1c1917" },
};

export const PALETTE_IDS = Object.keys(PALETTES) as PaletteId[];

export const FORMATS: { id: NoteFormat; label: string; blurb: string }[] = [
  { id: "swatch", label: "Colour Swatch",   blurb: "Bold colour block" },
  { id: "tin",    label: "Matchbox Tin",    blurb: "Vintage label" },
  { id: "print",  label: "Botanical Print", blurb: "Framed archive page" },
];

/** Turns a palette into CSS custom properties. Put this on a wrapper and every child can use them. */
export function paletteVars(id: PaletteId): CSSProperties {
  const p = PALETTES[id];
  return {
    "--n-from": p.from,
    "--n-to": p.to,
    "--n-ink": p.ink,
    "--n-accent": p.accent,
    "--n-deep": p.deep,
  } as CSSProperties;
}

// Full class strings so Tailwind can find them
export const GRADIENT_CLASS = "bg-[linear-gradient(145deg,var(--n-from),var(--n-to))]";
export const TINT_CLASS = "bg-[color-mix(in_srgb,var(--n-from)_18%,white)]";

// Tilt and ticket number come from the note's id, so they never change when the list changes
function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}
const TILTS = [-1.2, 0.8, -0.5];
export const tiltForId = (id: string) => TILTS[hash(id) % 3];
export const noteCode = (id: string) => `CH${CURRENT_COHORT}-${(hash(id) % 9000) + 1000}`;