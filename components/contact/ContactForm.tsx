"use client";
import { useState } from "react";

const PRESETS = ["Job opportunity", "Freelance", "Collaboration"];
const FIELD = "h-11 w-full bg-paper border border-line rounded-lg px-3 text-sm text-ink outline-none focus:border-amber focus:ring-[3px] focus:ring-amber/20";
const LABEL = "font-mono text-[10px] uppercase tracking-[.1em] text-muted mb-2 block";
const EMPTY_FORM = { name: "", email: "", subject: "", message: "", website: "" };

export function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const valid =
    form.name.trim() !== "" &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.subject.trim() !== "" &&
    form.message.trim().length > 4;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        // Clear the fields so a stray extra click can't resubmit the same
        // message — this also re-disables the submit button via `valid`
        // below — and leaves a clean form ready for a follow-up message.
        setForm(EMPTY_FORM);
        setState("sent");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={submit} className="bg-surface border border-line rounded-xl p-5 elev-sm rim">
      <div className="flex items-start justify-between mb-4 min-h-[44px]">
        <div>
          <p className="font-display font-bold text-base text-ink">Send a message</p>
          <p className="text-xs text-muted mt-1">I usually reply within a day.</p>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[.12em] text-muted">Option A</span>
      </div>

      {/* honeypot — hidden from people, filled by bots */}
      <input
        type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website}
        onChange={set("website")} aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="mb-3">
          <label className={LABEL} htmlFor="c-name">Name *</label>
          <input id="c-name" className={FIELD} required value={form.name} onChange={set("name")} placeholder="Jane Dela Cruz" />
        </div>
        <div className="mb-3">
          <label className={LABEL} htmlFor="c-email">Email *</label>
          <input id="c-email" type="email" className={FIELD} required value={form.email} onChange={set("email")} placeholder="jane@company.com" />
        </div>
      </div>

      <div className="mb-3">
        <label className={LABEL} htmlFor="c-subject">Subject *</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {PRESETS.map((p) => (
            <button key={p} type="button" onClick={() => setForm((f) => ({ ...f, subject: p }))}
              className={`font-mono text-[10px] px-2.5 py-1.5 rounded-full border transition-colors ${
                form.subject === p ? "bg-ink border-ink text-paper" : "bg-paper border-line text-muted hover:text-ink"}`}>
              {p}
            </button>
          ))}
        </div>
        <input id="c-subject" className={FIELD} required maxLength={80} value={form.subject}
               onChange={set("subject")} placeholder="Pick one, or write your own" />
      </div>

      <div className="mb-4">
        <label className={LABEL} htmlFor="c-message">Message *</label>
        <textarea id="c-message" required maxLength={2000} value={form.message} onChange={set("message")}
                  placeholder="A couple of lines about what you have in mind."
                  className={`${FIELD} h-28 py-2.5 resize-none leading-relaxed`} />
      </div>

      <button type="submit" disabled={!valid || state === "sending"}
        className="w-full h-12 rounded-lg bg-ink text-paper font-display font-semibold text-sm elev-sm disabled:opacity-40">
        {state === "sending" ? "Sending…" : state === "sent" ? "Sent — thanks" : "Send message →"}
      </button>
      {state === "sent" && <p role="status" className="text-xs text-muted mt-2.5">Message sent — thanks! I&apos;ll get back to you soon.</p>}
      {state === "error" && <p role="alert" className="text-xs text-muted mt-2.5">Something went wrong. Email me directly instead.</p>}
    </form>
  );
}
