import { NextRequest, NextResponse } from "next/server";
import transporter from "@/utils/email/nodemailer";
import EmailTemplate from "@/utils/email/EmailTemplate";
import AdminNotificationTemplate from "@/utils/email/AdminNotificationTemplate";
import { parseContactPayload, escapeHtml } from "./validate";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = parseContactPayload(await request.json().catch(() => null));
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const { name, email, subject, message } = parsed.data;
  const websiteName = process.env.NEXT_PUBLIC_WEBSITE_NAME || "Portfolio";
  const from = process.env.EMAIL_USER;
  const to = process.env.CONTACT_TO || process.env.EMAIL_USER;

  try {
    // name/email/subject/message are visitor-supplied. escapeHtml() is applied
    // ONLY to the props below, which the templates interpolate into HTML body
    // markup — never to the plain-text `subject:` header or the `to:`/`replyTo:`
    // addressing above/below, where escaping would corrupt the value instead of
    // protecting anything (see validate.ts's escapeHtml comment).
    await transporter.sendMail({
      from,
      to: email,
      subject: `Re: ${subject}`,
      html: EmailTemplate({
        name: escapeHtml(name),
        subject: escapeHtml(subject),
        message: escapeHtml(message),
        websiteName,
      }),
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email, // without this, replying to the notification replies to yourself
      subject: `New Contact Form Submission: ${subject}`,
      html: AdminNotificationTemplate({
        senderEmail: escapeHtml(email),
        subject: escapeHtml(subject),
        message: escapeHtml(message),
        websiteName,
      }),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
