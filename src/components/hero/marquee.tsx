"use client";

import { motion, useReducedMotion } from "framer-motion";

const WORDS = [
  "Gratitude", "Encouragement", "Kindness", "Growth",
  "Mentorship", "Celebrate", "Thank you", "Proud of you", "Keep shining",
];

function Strip() {
  return (
    <div className="flex shrink-0 items-center whitespace-nowrap">
      {[...WORDS, ...WORDS].map((w, i) => (
        <span key={i} className="flex items-center italic text-xs">
          <span className="px-4">{w}</span>
          <span className="text-rose">—</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`overflow-hidden bg-[#4a2a3d] py-3 text-sm tracking-wider text-wall ${className}`}
    >
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <Strip />
        <Strip />
      </motion.div>
    </div>
  );
}