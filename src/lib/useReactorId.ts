"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "flowers-reactor-id";

function getReactorId(): string {
  let stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    stored = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, stored);
  }
  return stored;
}

// This value is only ever set once and never changes afterward,
// so there's nothing to subscribe to — an empty subscription is correct here.
const subscribe = () => () => {};

/** A stable, anonymous ID for this browser, created once and reused on every visit. */
export function useReactorId(): string | null {
  return useSyncExternalStore(
    subscribe,
    getReactorId,  // what to read on the client
    () => null     // what to use during server rendering, where localStorage doesn't exist
  );
}