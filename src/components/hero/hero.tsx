"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Flower as FlowerGlyph,
  FlowerTulip,
} from "@phosphor-icons/react";
import type { Note } from "@/types";
import { NoteCard } from "@/components/wall/noteCard";
import { Flower } from "./flower";
import Image from "next/image";

const NAV = [
  { label: "Wall", href: "#wall" },
  { label: "Find My Flowers", href: "#composer" },
];

interface HeroNote {
  note: Note;
  rotate: number;
  floatDuration: number;
  position: string;
}

// fields every decorative note shares
const base = { recipientId: "", reactions: 0, createdAt: new Date(0) };

const HERO_NOTES: HeroNote[] = [
  {
    note: {
      ...base,
      id: "hero-1",
      recipientName: "Sharon",
      recipientRole: "mentee",
      recipientTrack: "Software",
      message: "You debug everyone's React at 11 PM. We notice.",
      palette: "ocean",
      format: "swatch",
      icon: "flower",
      authorName: "A friend",
    },
    rotate: 5,
    floatDuration: 4.2,
    position: "lg:top-[14%] lg:right-[3%]",
  },
  {
    note: {
      ...base,
      id: "hero-3",
      recipientName: "Brian",
      recipientRole: "mentee",
      recipientTrack: "Data Science",
      message: "That mock interview? Crystal clear. So proud of you!",
      palette: "olive",
      format: "print",
      icon: "sparkle",
      authorName: "Kevin",
    },
    rotate: -3,
    floatDuration: 5,
    position: "lg:top-[40%] lg:right-[30%]",
  },
  {
    note: {
      ...base,
      id: "hero-4",
      recipientName: "Dr. Chao",
      recipientRole: "founder",
      recipientTrack: "Lead Mentor",
      message: "You taught me my voice belongs in every room.",
      palette: "rose",
      format: "swatch",
      icon: "star",
      authorName: "Lynn, Cohort 7",
    },
    rotate: 4,
    floatDuration: 4.6,
    position: "lg:bottom-[0%] lg:right-[4%]",
  },
];

function FloatingNote({ item, index }: { item: HeroNote; index: number }) {
  const reduce = useReducedMotion();

  return (
    // OUTER: position, tilt, entrance
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 18,
        delay: 0.3 + index * 0.12,
      }}
      style={{ rotate: item.rotate }}
      // on phones only the first two show; from sm up all four
      className={`z-10 lg:absolute lg:w-60 ${item.position} ${
        index > 1 ? "hidden sm:block" : ""
      }`}
    >
      {/* INNER: endless float + hover */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{
          y: {
            duration: item.floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          },
        }}
        whileHover={{ scale: 1.05 }}
      >
        <NoteCard note={item.note} preview hideFooter />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden rounded-[2rem] bg-linear-to-br from-note-peach via-wall to-note-blossom shadow-rest lg:h-[720px]"
    >
      {/* soft colour blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-note-lavender opacity-70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/2 size-80 rounded-full bg-note-mint opacity-70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 size-72 rounded-full bg-note-sky opacity-60 blur-3xl"
      />

      <div className="flex flex-col p-5 md:p-8">
        {/* header */}
        <header className="relative z-20 flex w-full items-center justify-between gap-3">
          {/* Mobile: icon only / Desktop: icon + brand text */}
          <a
            href="#"
            aria-label="Compliment Wall home"
            className="flex shrink-0 items-center gap-2"
          >
            <span className="grid size-10 place-items-center rounded-full bg-blue-100 shadow-rest">
              <Image
                src="/post-it.png"
                alt=""
                width={20}
                height={30}
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(212,175,55,0.2))",
                }}
                priority
              />
            </span>

            {/* Visible only on desktop */}
            <span className="hidden leading-tight md:block">
              <span className="block font-heading text-base font-bold text-ink">
                Compliment Wall
              </span>

              <span className="block text-[10px] font-semibold uppercase tracking-widest text-ink-muted">
                A mentorship tradition
              </span>
            </span>
          </a>

          {/* Desktop navigation */}
          <nav
            aria-label="Main"
            className="hidden rounded-full bg-white p-1.5 shadow-rest md:flex"
          >
            {NAV.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-full px-4 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-wall-recessed"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Give Flowers CTA */}
          <a
            href="#composer"
            className="shrink-0 rounded-full bg-amber-deep px-4 py-2.5 text-sm font-bold text-white shadow-rest transition hover:brightness-110 active:translate-y-px sm:px-5"
          >
            Give Flowers 🌸
          </a>
        </header>

        {/* headline */}
        <h1
          id="hero-title"
          className="relative z-10 mt-10 text-[clamp(3.5rem,9.5vw,8.5rem)] font-bold leading-[0.85] tracking-tighter text-ink lg:mt-12"
        >
          <span className="block">give—them</span>
          <span className="-mt-[0.1em] block bg-linear-to-r from-amber to-rose bg-clip-text leading-[1.05] text-transparent">
            flowers
          </span>
        </h1>

        {/* tagline + CTA */}
        <div className="relative z-10 mt-8 max-w-[15rem] lg:absolute lg:bottom-[24%] lg:left-8 lg:mt-0">
          <p className="text-[13px] font-italics leading-[1.15] text-ink">
            An initiative by the 2026 KamiLimu towards consistent recognition of
            mentees &amp; progress, achievements and good deeds
          </p>
          <a
            href="#composer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-ink-body active:translate-y-px"
          >
            Write a note
            <ArrowDown aria-hidden size={16} weight="bold" />
          </a>
        </div>

        {/* the big dancing flower */}
        <Flower
          size={240}
          className="z-10 mx-auto mt-6 w-44 sm:w-52 lg:absolute lg:bottom-[16%] lg:left-[24%] lg:mx-0 lg:mt-0 lg:w-60"
        />

        {/* floating sample notes (decorative, so hidden from screen readers) */}
        <div
          aria-hidden
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-0 lg:block"
        >
          {HERO_NOTES.map((item, i) => (
            <FloatingNote key={item.note.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
