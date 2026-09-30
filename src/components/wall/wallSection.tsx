"use client";

import { useMemo, useState } from "react";
import { Plant } from "@phosphor-icons/react";
import type { Note } from "@/types";
import { filterNotes, type FilterId, type FormatFilter } from "@/lib/filterNotes";
import { FilterBar } from "./FilterBar";
import { WallGrid } from "./wallGrid";

export function WallSection({ notes }: { notes: Note[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [format, setFormat] = useState<FormatFilter>("any");
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () => filterNotes(notes, { filter, format, query }),
    [notes, filter, format, query]
  );

  const isFiltered = filter !== "all" || format !== "any" || query.trim() !== "";

  function clearAll() {
    setFilter("all");
    setFormat("any");
    setQuery("");
  }

  return (
    <section id="wall" className="scroll-mt-6">
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        format={format}
        onFormatChange={setFormat}
        query={query}
        onQueryChange={setQuery}
        totalCount={notes.length}
      />

      <p role="status" className="sr-only">
        {visible.length} notes shown
      </p>

      <div className="mt-8">
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line py-16 text-center">
            <Plant aria-hidden size={40} weight="duotone" className="mx-auto text-sage" />
            <p className="mt-2 font-semibold text-ink">No notes found</p>
            <p className="text-sm text-ink-muted">
              Try another search, or be the first to write one.
            </p>
            {isFiltered && (
              <button
                type="button"
                onClick={clearAll}
                className="mt-4 rounded-full bg-amber-deep px-5 py-2 text-sm font-bold text-white transition hover:brightness-110 active:translate-y-px"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          // changing the key remounts the grid, replaying the entrance animation
          <WallGrid key={`${filter}-${format}`} notes={visible} />
        )}
      </div>
    </section>
  );
}