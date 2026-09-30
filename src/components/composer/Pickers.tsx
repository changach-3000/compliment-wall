"use client";

import type { ReactNode } from "react";
import type { IconId, NoteFormat, PaletteId } from "@/types";
import { ICONS, ICON_IDS, ICON_LABELS } from "@/lib/icons";
import {
  FORMATS, GRADIENT_CLASS, PALETTES, PALETTE_IDS, TINT_CLASS, paletteVars,
} from "@/lib/noteStyle";

export const LABEL_CLASS = "mb-2 block text-sm font-bold text-ink";

const FOCUS_RING =
  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber";

/* tiny thumbnails: they read the palette variables, so they recolour live */
const THUMBS: Record<NoteFormat, ReactNode> = {
  swatch: (
    <div className="h-12 overflow-hidden rounded bg-white ring-1 ring-ink/10">
      <div className={`${GRADIENT_CLASS} h-8`} />
    </div>
  ),
  tin: (
    <div className="h-12 rounded-md border-2 border-ink bg-[#fbf6ea] p-1">
      <div className={`${GRADIENT_CLASS} h-2.5 rounded-sm`} />
    </div>
  ),
  print: (
    <div className="h-12 rounded bg-[#fdfaf1] p-1.5 ring-1 ring-ink/15">
      <div className={`${TINT_CLASS} h-full border-l-2 border-[color:var(--n-deep)]`} />
    </div>
  ),
};

export function FormatPicker({
  value, onChange, palette,
}: {
  value: NoteFormat;
  onChange: (f: NoteFormat) => void;
  palette: PaletteId;
}) {
  return (
    <fieldset style={paletteVars(palette)}>
      <legend className={LABEL_CLASS}>2. Choose a card style</legend>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FORMATS.map((f) => (
          <label key={f.id} className="cursor-pointer">
            <input
              type="radio"
              name="format"
              value={f.id}
              checked={value === f.id}
              onChange={() => onChange(f.id)}
              className="peer sr-only"
            />
            <span
              className={`block rounded-xl border-2 border-transparent bg-white/70 p-2 transition peer-checked:border-amber peer-checked:bg-amber-soft ${FOCUS_RING}`}
            >
              {THUMBS[f.id]}
              <span className="mt-2 block text-xs font-bold text-ink">{f.label}</span>
              <span className="block text-[10px] text-ink-muted">{f.blurb}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function PalettePicker({
  value, onChange,
}: {
  value: PaletteId;
  onChange: (p: PaletteId) => void;
}) {
  return (
    <fieldset>
      <legend className={LABEL_CLASS}>
        Palette
        <span className="ml-1 font-normal text-ink-muted">· {PALETTES[value].name}</span>
      </legend>
      <div className="flex flex-wrap gap-3">
        {PALETTE_IDS.map((id) => {
          const p = PALETTES[id];
          return (
            <label key={id} className="cursor-pointer" title={p.name}>
              <input
                type="radio"
                name="palette"
                value={id}
                aria-label={p.name}
                checked={value === id}
                onChange={() => onChange(id)}
                className="peer sr-only"
              />
              <span
                className="block size-9 rounded-full ring-1 ring-ink/10 transition hover:scale-110 peer-checked:ring-2 peer-checked:ring-ink peer-checked:ring-offset-2 peer-focus-visible:ring-2 peer-focus-visible:ring-amber peer-focus-visible:ring-offset-2"
                style={{ background: `linear-gradient(145deg, ${p.from}, ${p.to})` }}
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function EmblemPicker({
  value, onChange,
}: {
  value: IconId;
  onChange: (i: IconId) => void;
}) {
  return (
    <fieldset>
      <legend className={LABEL_CLASS}>Emblem</legend>
      <div className="flex flex-wrap gap-2">
        {ICON_IDS.map((id) => {
          const Icon = ICONS[id];
          return (
            <label key={id} className="cursor-pointer" title={ICON_LABELS[id]}>
              <input
                type="radio"
                name="emblem"
                value={id}
                aria-label={ICON_LABELS[id]}
                checked={value === id}
                onChange={() => onChange(id)}
                className="peer sr-only"
              />
              <span
                className={`grid size-10 place-items-center rounded-xl bg-white/70 text-ink transition hover:scale-110 peer-checked:bg-ink peer-checked:text-white ${FOCUS_RING}`}
              >
                <Icon size={22} weight="duotone" />
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}