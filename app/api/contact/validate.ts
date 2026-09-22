export type ContactPayload = { name: string; email: string; subject: string; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, subject: 80, message: 2000 };

export function parseContactPayload(
  body: unknown,
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Invalid body" };
  const b = body as Record<string, unknown>;

  // Honeypot: hidden from people, filled by bots.
  if (typeof b.website === "string" && b.website.trim() !== "") {
    return { ok: false, error: "Rejected" };
  }

  const email = typeof b.email === "string" ? b.email.trim() : "";
  const subject = typeof b.subject === "string" ? b.subject.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const rawName = typeof b.name === "string" ? b.name.trim() : "";

  if (!EMAIL.test(email)) return { ok: false, error: "Invalid email" };
  if (!subject) return { ok: false, error: "Missing subject" };
  if (!message) return { ok: false, error: "Missing message" };
  if (subject.length > MAX.subject || message.length > MAX.message || rawName.length > MAX.name) {
    return { ok: false, error: "Too long" };
  }

  // The old route derived a shouty name from the address
  // ("principioangelo24" -> "PRINCIPIOANGELO24"). Use the real name when given.
  const name = rawName || email.split("@")[0];
  return { ok: true, data: { name, email, subject, message } };
}
