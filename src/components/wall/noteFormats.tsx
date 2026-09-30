import type { ReactNode } from "react";
import type { Note } from "@/types";
import { ICONS } from "@/lib/icons";
import { CURRENT_COHORT } from "@/lib/config";
import { GRADIENT_CLASS, PALETTES, TINT_CLASS, noteCode } from "@/lib/noteStyle";
import { ROLE_LABELS } from "@/lib/roles";

export interface FaceProps {
  note: Note;
  signature: ReactNode;
  footer: ReactNode;
}

const INK = "text-[color:var(--n-ink)]";
const ACCENT = "text-[color:var(--n-accent)]";
const DEEP = "text-[color:var(--n-deep)]";

const metaLine = (n: Note) =>
  [ROLE_LABELS[n.recipientRole], n.recipientTrack].filter(Boolean).join(" · ");

/* 1. Colour swatch: gradient block on top, white label strip below */
export function SwatchFace({ note, signature, footer }: FaceProps) {
  const Icon = ICONS[note.icon];
  return (
    <div className="overflow-hidden rounded-note bg-white">
      <div className={`${GRADIENT_CLASS} ${INK} p-5`}>
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-widest opacity-80">
            For {note.recipientName}
          </p>
          <Icon size={28} weight="duotone" className={ACCENT} />
        </div>
        <p className="mt-4 text-base leading-relaxed">“{note.message}”</p>
        <p className="mt-4 text-right font-script text-lg">{signature}</p>
      </div>
      <div className="p-4 text-ink">
        <div className="mt-3">{footer}</div>
      </div>
    </div>
  );
}

/* 2. Matchbox tin: thick dark border, coloured header strip, dashed inner panel */
export function TinFace({ note, signature, footer }: FaceProps) {
  const Icon = ICONS[note.icon];
  return (
    <div className="relative rounded-2xl border-[3px] border-ink bg-[#fbf6ea] p-1.5 text-ink">
      <span aria-hidden className="absolute -top-2.5 left-1/2 h-3 w-9 -translate-x-1/2 rounded-sm bg-ink" />
      <div
        className={`${GRADIENT_CLASS} ${INK} flex items-center justify-between rounded-xl px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]`}
      >
        <span>Special Reserve</span>
        <span>Cohort {CURRENT_COHORT}</span>
      </div>
      <div className="px-3 pb-3 pt-4">
        <div className="flex items-center gap-2">
          <Icon size={26} weight="duotone" className={DEEP} />
          <h3 className="font-heading text-2xl font-bold uppercase leading-none tracking-tight">
            {note.recipientName}
          </h3>
        </div>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
          {metaLine(note)}
        </p>
        <p
          className={`${TINT_CLASS} mt-3 rounded-lg border-2 border-dashed border-[color:var(--n-deep)] p-3 text-sm leading-relaxed`}
        >
          “{note.message}”
        </p>
        <p className="mt-3 text-right font-script text-lg">{signature}</p>
        <div className="mt-2">{footer}</div>
      </div>
    </div>
  );
}

/* 3. Botanical print: cream paper, italic title, faded watermark emblem */
export function PrintFace({ note, signature, footer }: FaceProps) {
  const Icon = ICONS[note.icon];
  return (
    <div className="relative overflow-hidden rounded-note border border-ink/15 bg-[#fdfaf1] p-4 text-ink">
      <Icon
        aria-hidden
        size={110}
        weight="duotone"
        className={`${DEEP} pointer-events-none absolute -bottom-4 -right-4 opacity-15`}
      />
      <div className="relative">
        <div className="flex justify-between gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted">
          <span>KamiLimu</span>
          <span>{note.recipientTrack ?? ROLE_LABELS[note.recipientRole]}</span>
        </div>
        <h3 className={`${DEEP} mt-3 font-heading text-2xl font-bold italic leading-tight`}>
          {note.recipientName}
        </h3>
        <p className="text-[11px] italic text-ink-muted">{metaLine(note)}</p>
        <p
          className={`${TINT_CLASS} mt-3 border-l-4 border-[color:var(--n-deep)] p-3 text-sm leading-relaxed`}
        >
          “{note.message}”
        </p>
        <p className="mt-3 text-right font-script text-lg">{signature}</p>
        <div className="mt-2">{footer}</div>
      </div>
    </div>
  );
}
