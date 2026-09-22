import { describe, it, expect } from "vitest";
import { parseContactPayload } from "./validate";

const good = { name: "Jane", email: "jane@example.com", subject: "Hi", message: "Hello there" };

describe("parseContactPayload", () => {
  it("accepts a complete payload", () => {
    const r = parseContactPayload(good);
    expect(r.ok).toBe(true);
  });

  it("rejects a missing subject", () => {
    expect(parseContactPayload({ ...good, subject: "" }).ok).toBe(false);
  });

  it("rejects a malformed email", () => {
    expect(parseContactPayload({ ...good, email: "nope" }).ok).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    expect(parseContactPayload({ ...good, website: "http://spam" }).ok).toBe(false);
  });

  it("rejects an over-long message", () => {
    expect(parseContactPayload({ ...good, message: "x".repeat(2001) }).ok).toBe(false);
  });

  it("falls back to an email-derived name when none is given", () => {
    const r = parseContactPayload({ ...good, name: "" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.name).toBe("jane");
  });
});
