"use client";

import { motion } from "framer-motion";
import type { Icon } from "@phosphor-icons/react";

export interface ChipOption<T extends string> {
  id: T;
  label: string;
  icon: Icon;
  suffix?: string; // e.g. " (8)"
}

interface ChipGroupProps<T extends string> {
  label: string;    // accessible name for the group
  layoutId: string; // must be unique per group (see notes)
  options: ChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function ChipGroup<T extends string>({
  label, layoutId, options, value, onChange,
}: ChipGroupProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.id === value;
        const ChipIcon = o.icon;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className={`relative rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              active
                ? "border-amber text-amber-deep"
                : "border-transparent bg-white/70 text-ink-muted hover:bg-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-amber-soft"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              <ChipIcon aria-hidden size={15} weight={active ? "fill" : "duotone"} />
              {o.label}
              {o.suffix}
            </span>
          </button>
        );
      })}
    </div>
  );
}