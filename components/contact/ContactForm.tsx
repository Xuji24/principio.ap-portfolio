"use client";
import { useState } from "react";

const PRESETS = ["Job opportunity", "Freelance", "Collaboration"];
const FIELD = "h-[31px] w-full bg-paper border border-line rounded-lg px-2.5 text-[11px] text-ink outline-none focus:border-amber focus:ring-[3px] focus:ring-amber/20";
const LABEL = "font-mono text-[7.5px] uppercase tracking-[.11em] text-muted mb-1.5 block";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
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
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={submit} className="bg-surface border border-line rounded-xl p-4 elev-sm rim">
      <div className="flex items-start justify-between mb-3 min-h-[44px]">
        <div>
          <p className="font-display font-bold text-[13px] text-ink">Send a message</p>
          <p className="text-[9.5px] text-muted mt-0.5">I usually reply within a day.</p>
        </div>
        <span className="font-mono text-[7px] uppercase tracking-[.14em] text-muted">Option A</span>
      </div>

      {/* honeypot — hidden from people, filled by bots */}
      <input
        type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website}
        onChange={set("website")} aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />

      <div className="grid grid-cols-2 gap-2.5">
        <div className="mb-2.5">
          <label className={LABEL} htmlFor="c-name">Name *</label>
          <input id="c-name" className={FIELD} required value={form.name} onChange={set("name")} placeholder="Jane Dela Cruz" />
        </div>
        <div className="mb-2.5">
          <label className={LABEL} htmlFor="c-email">Email *</label>
          <input id="c-email" type="email" className={FIELD} required value={form.email} onChange={set("email")} placeholder="jane@company.com" />
        </div>
      </div>

      <div className="mb-2.5">
        <label className={LABEL} htmlFor="c-subject">Subject *</label>
        <div className="flex flex-wrap gap-1 mb-1.5">
          {PRESETS.map((p) => (
            <button key={p} type="button" onClick={() => setForm((f) => ({ ...f, subject: p }))}
              className={`font-mono text-[7px] px-2 py-1 rounded-full border transition-colors ${
                form.subject === p ? "bg-ink border-ink text-paper" : "bg-paper border-line text-muted hover:text-ink"}`}>
              {p}
            </button>
          ))}
        </div>
        <input id="c-subject" className={FIELD} required maxLength={80} value={form.subject}
               onChange={set("subject")} placeholder="Pick one, or write your own" />
      </div>

      <div className="mb-3">
        <label className={LABEL} htmlFor="c-message">Message *</label>
        <textarea id="c-message" required maxLength={2000} value={form.message} onChange={set("message")}
                  placeholder="A couple of lines about what you have in mind."
                  className={`${FIELD} h-[74px] py-2 resize-none leading-relaxed`} />
      </div>

      <button type="submit" disabled={!valid || state === "sending"}
        className="w-full h-10 rounded-lg bg-ink text-paper font-display font-semibold text-[11px] elev-sm disabled:opacity-40">
        {state === "sending" ? "Sending…" : state === "sent" ? "Sent — thanks" : "Send message →"}
      </button>
      {state === "error" && <p role="alert" className="text-[10px] text-muted mt-2">Something went wrong. Email me directly instead.</p>}
    </form>
  );
}
