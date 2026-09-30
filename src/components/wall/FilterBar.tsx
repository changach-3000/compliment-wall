"use client";

import {
  Clock, Heart, Leaf, MagnifyingGlass, Package, Plant,
  SquaresFour, Stack, Star, Swatches, Ticket, type Icon,
} from "@phosphor-icons/react";
import { ChipGroup, type ChipOption } from "@/components/ui/ChipGroup";
import { FILTERS, type FilterId, type FormatFilter } from "@/lib/filterNotes";

const FILTER_ICONS: Record<FilterId, Icon> = {
  all: SquaresFour,
  mentors: Star,
  mentees: Plant,
  cheered: Heart,
  recent: Clock,
};

const FORMAT_OPTIONS: ChipOption<FormatFilter>[] = [
  { id: "any", label: "All styles", icon: Stack },
  { id: "swatch", label: "Swatches", icon: Swatches },
  { id: "tin", label: "Tins", icon: Package },
  { id: "print", label: "Prints", icon: Leaf },
];

interface FilterBarProps {
  filter: FilterId;
  onFilterChange: (f: FilterId) => void;
  format: FormatFilter;
  onFormatChange: (f: FormatFilter) => void;
  query: string;
  onQueryChange: (q: string) => void;
  totalCount: number;
}

export function FilterBar({
  filter, onFilterChange, format, onFormatChange, query, onQueryChange, totalCount,
}: FilterBarProps) {
  const filterOptions: ChipOption<FilterId>[] = FILTERS.map((f) => ({
    id: f.id,
    label: f.label,
    icon: FILTER_ICONS[f.id],
    suffix: f.id === "all" ? ` (${totalCount})` : undefined,
  }));

  return (
    <div className="space-y-3 rounded-2xl border border-line bg-white/60 p-3 backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ChipGroup
          label="Filter notes"
          layoutId="filter-pill"
          options={filterOptions}
          value={filter}
          onChange={onFilterChange}
        />

        <label className="relative block sm:w-72">
          <span className="sr-only">Search notes by recipient or keyword</span>
          <MagnifyingGlass
            aria-hidden
            size={16}
            weight="bold"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by recipient or keyword…"
            className="w-full rounded-full border border-line bg-paper-input py-2 pl-9 pr-4 text-sm text-ink placeholder:text-ink-subtle focus:border-amber"
          />
        </label>
      </div>
    </div>
  );
}