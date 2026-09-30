"use client";

import { useId, useMemo, useState } from "react";
import { FlowerTulip, MagnifyingGlass, X } from "@phosphor-icons/react";
import type { Person } from "@/types";
import { ROLE_LABELS } from "@/lib/roles";

interface Props {
  id: string;
  people: Person[];
  value: Person | null;
  onChange: (p: Person | null) => void;
}

const describe = (p: Person) =>
  [ROLE_LABELS[p.role], p.track, p.cohort ? `Cohort ${p.cohort}` : null]
    .filter(Boolean)
    .join(" · ");

export function RecipientCombobox({ id, people, value, onChange }: Props) {
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q
      ? people.filter((p) => `${p.name} ${p.track ?? ""} ${ROLE_LABELS[p.role]}`.toLowerCase().includes(q))
      : people;
    return pool.slice(0, 6);
  }, [people, query]);

  function choose(p: Person) {
    onChange(p);
    setQuery("");
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && open && results[active]) {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  // Selected state: show a chip instead of the input
  if (value) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-xl border border-amber bg-amber-soft px-3 py-2.5">
        <div className="flex flex-wrap items-center gap-x-2 text-sm text-ink">
          <FlowerTulip size={22} weight="duotone" className="text-rose" />
          <span className="font-bold">{value.name}</span>
          <span className="text-ink-muted">{describe(value)}</span>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label={`Remove ${value.name}`}
          className="grid size-7 shrink-0 place-items-center rounded-full hover:bg-white/70"
        >
          <X size={16} weight="bold" />
        </button>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <MagnifyingGlass
        aria-hidden
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle"
      />
      <input
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
        autoComplete="off"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Type a name (e.g. Bridgette, Dr. Chao, Brian, Albert)…"
        className="w-full rounded-xl border border-line bg-paper-input py-3 pl-10 pr-3 text-sm text-ink shadow-[inset_0_1px_3px_rgba(41,37,36,0.08)] placeholder:text-ink-subtle focus:border-amber"
      />

      {open &&
        (results.length > 0 ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-line bg-white p-1 shadow-modal"
          >
            {results.map((p, i) => (
              <li
                key={p.id}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()} // keep focus in the input
                onClick={() => choose(p)}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm ${
                  i === active ? "bg-amber-soft" : ""
                }`}
              >
                <span className="font-bold text-ink">{p.name}</span>
                <span className="ml-2 text-xs text-ink-muted">{describe(p)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="absolute z-20 mt-2 w-full rounded-xl border border-line bg-white p-3 text-sm text-ink-muted shadow-modal">
            No one found for “{query}”
          </div>
        ))}
    </div>
  );
}