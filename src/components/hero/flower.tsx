"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FlowerProps {
  size?: number;
  className?: string;
  delay?: number;
}

const OUTER = Array.from({ length: 8 }, (_, i) => i * 45);
const INNER = Array.from({ length: 8 }, (_, i) => i * 45 + 22.5);

export function Flower({ size = 240, className, delay = 0 }: FlowerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label="A happy dancing flower"
      className={className}
      // the "dance": sway, bob, and pulse. Bob distance scales with size.
      animate={
        reduce
          ? undefined
          : {
              rotate: [-8, 8, -8],
              y: [0, -size * 0.06, 0],
              scale: [1, 1.06, 1],
            }
      }
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {/* petals spin slowly; the face below stays upright */}
      <motion.g
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {OUTER.map((a, i) => (
          <ellipse
            key={a}
            cx="100"
            cy="50"
            rx="20"
            ry="40"
            fill={i % 2 === 0 ? "#fb7185" : "#f9a8d4"}
            transform={`rotate(${a} 100 100)`}
          />
        ))}
        {INNER.map((a) => (
          <ellipse
            key={a}
            cx="100"
            cy="60"
            rx="14"
            ry="28"
            fill="#e11d48"
            transform={`rotate(${a} 100 100)`}
          />
        ))}
      </motion.g>

      {/* face */}
      <circle cx="100" cy="100" r="32" fill="#fbbf24" />
      <circle cx="89" cy="95" r="4" fill="#1c1917" />
      <circle cx="111" cy="95" r="4" fill="#1c1917" />
      <circle cx="82" cy="108" r="5" fill="#fb7185" opacity="0.6" />
      <circle cx="118" cy="108" r="5" fill="#fb7185" opacity="0.6" />
      <path
        d="M 88 107 Q 100 121 112 107"
        stroke="#1c1917"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </motion.svg>
  );
}