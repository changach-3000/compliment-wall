"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Doc } from "../../../convex/_generated/dataModel";
import type { Person } from "@/types";

function toPerson(doc: Doc<"people">): Person {
  return { id: doc._id, name: doc.name, role: doc.role, track: doc.track, cohort: doc.cohort };
}

export function usePeople(): Person[] {
  const docs = useQuery(api.people.list);
  return docs?.map(toPerson) ?? [];
}