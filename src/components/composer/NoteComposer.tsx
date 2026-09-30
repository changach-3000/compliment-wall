"use client";

import { useState } from "react";
import { PushPin } from "@phosphor-icons/react";
import type { IconId, NewNote, Note, NoteFormat, PaletteId, Person } from "@/types";
import { CURRENT_COHORT } from "@/lib/config";
import { RecipientCombobox } from "./RecipientCombobox";
import {
  EmblemPicker,
  FormatPicker,
  LABEL_CLASS,
  PalettePicker,
} from "./Pickers";
import { NoteCard } from "../wall/noteCard";

const MAX = 240;
const MIN = 10;

const FIELD =
  "w-full rounded-xl border border-line bg-paper-input p-3 text-sm text-ink shadow-[inset_0_1px_3px_rgba(41,37,36,0.08)] placeholder:text-ink-subtle focus:border-amber";

interface Props {
  people: Person[];
  onSubmit: (note: NewNote) => Promise<void>;
}

export function NoteComposer({ people, onSubmit }: Props) {
  const [recipient, setRecipient] = useState<Person | null>(null);
  const [message, setMessage] = useState("");
  const [palette, setPalette] = useState<PaletteId>("plum");
  const [format, setFormat] = useState<NoteFormat>("swatch");
  const [icon, setIcon] = useState<IconId>("flower");
  const [anonymous, setAnonymous] = useState(true);
  const [signer, setSigner] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const trimmed = message.trim();

  // Derived state: computed every render, never stored
  const problem = !recipient
    ? "Choose who this note is for."
    : trimmed.length < MIN
      ? `Write at least ${MIN} characters (${MIN - trimmed.length} to go).`
      : !anonymous && !signer.trim()
        ? "Add a name or cohort to sign with."
        : null;
  const canSubmit = problem === null;

  // The preview is the same Note shape the database will hold
  const draft: Note = {
    id: "preview",
    recipientId: recipient?.id ?? "",
    recipientName: recipient?.name ?? "someone special",
    recipientRole: recipient?.role ?? "mentee",
    recipientTrack: recipient?.track,
    message: trimmed || "Your kind words will appear here…",
    palette,
    format,
    icon,
    authorName: anonymous ? null : signer.trim() || "You",
    reactions: 0,
    createdAt: new Date(),
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!recipient || !canSubmit || submitting) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit({
        recipientId: recipient.id,
        recipientName: recipient.name,
        recipientRole: recipient.role,
        recipientTrack: recipient.track,
        message: trimmed,
        palette,
        format,
        icon,
        authorName: anonymous ? null : signer.trim(),
      });
      setMessage("");
      setRecipient(null);
    } catch {
      setSubmitError("Couldn't pin your note. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-5xl rounded-dialog border border-line bg-white/80 p-5 shadow-modal md:p-8"
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-bold text-amber-deep">
            Write a Note
          </h2>
          <p className="text-sm text-ink-muted">
            Pick a person, choose a card, and say something kind.
          </p>
        </div>
        <span className="rounded-full bg-note-mint px-3 py-1 text-xs font-semibold text-ink">
          Cohort {CURRENT_COHORT}
        </span>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
        {/* LEFT: the steps */}
        <div className="space-y-6">
          <div>
            <label htmlFor="recipient" className={LABEL_CLASS}>
              1. Who are you giving flowers to?
            </label>
            <RecipientCombobox
              id="recipient"
              people={people}
              value={recipient}
              onChange={setRecipient}
            />
          </div>

          <FormatPicker value={format} onChange={setFormat} palette={palette} />

          <div>
            <label htmlFor="message" className={LABEL_CLASS}>
              3. Your heartfelt message
            </label>
            <textarea
              id="message"
              value={message}
              maxLength={MAX}
              onChange={(e) => setMessage(e.target.value)}
              aria-describedby="message-help"
              placeholder="Write something kind… What made you appreciate them recently?"
              className={`${FIELD} h-32 resize-none`}
            />
            <div
              id="message-help"
              className="mt-1 flex justify-between text-xs text-ink-muted"
            >
              <span>Kind words build lifelong confidence.</span>
              <span>
                {message.length} / {MAX}
              </span>
            </div>
          </div>

          <fieldset>
            <legend className={LABEL_CLASS}>4. Signature</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <SignOption
                checked={anonymous}
                onSelect={() => setAnonymous(true)}
                title="Stay anonymous"
                hint="“From someone who thinks you're amazing”"
              />
              <SignOption
                checked={!anonymous}
                onSelect={() => setAnonymous(false)}
                title="Show my name"
                hint="Sign with cohort or role"
              />
            </div>
            {!anonymous && (
              <>
                <label htmlFor="signer" className="sr-only">
                  Your name and cohort or role
                </label>
                <input
                  id="signer"
                  value={signer}
                  maxLength={40}
                  onChange={(e) => setSigner(e.target.value)}
                  placeholder="e.g. Kevin (Peer Mentor)"
                  className={`${FIELD} mt-3`}
                />
              </>
            )}
          </fieldset>
        </div>

        {/* RIGHT: styling, preview, submit */}
        <div className="space-y-6">
          <PalettePicker value={palette} onChange={setPalette} />
          <EmblemPicker value={icon} onChange={setIcon} />

          <div>
            <p className={LABEL_CLASS}>Live preview</p>
            <div className="rounded-2xl bg-wall p-4 pt-6">
              {/* key = format, so switching styles replays the entrance animation */}
              <NoteCard key={format} note={draft} preview />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!canSubmit || submitting}
              aria-describedby={problem ? "submit-hint" : undefined}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-deep px-6 py-3.5 font-bold text-white shadow-rest transition hover:brightness-110 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PushPin size={20} weight="fill" />
              {submitting ? "Pinning…" : "Pin to the wall"}
            </button>
            {problem && (
              <p
                id="submit-hint"
                className="mt-2 text-center text-xs text-ink-muted"
              >
                {problem}
              </p>
            )}
            {submitError && (
              <p
                role="alert"
                className="mt-2 text-center text-xs font-semibold text-rose"
              >
                {submitError}
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

function SignOption({
  checked,
  onSelect,
  title,
  hint,
}: {
  checked: boolean;
  onSelect: () => void;
  title: string;
  hint: string;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name="signature"
        checked={checked}
        onChange={onSelect}
        className="peer sr-only"
      />
      <span className="block rounded-xl border-2 border-line bg-white/70 p-3 transition peer-checked:border-amber peer-checked:bg-amber-soft peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber">
        <span className="block text-sm font-bold text-ink">{title}</span>
        <span className="block text-xs text-ink-muted">{hint}</span>
      </span>
    </label>
  );
}
