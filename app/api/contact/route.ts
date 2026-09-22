import { NextRequest, NextResponse } from "next/server";
import transporter from "@/utils/email/nodemailer";
import EmailTemplate from "@/utils/email/EmailTemplate";
import AdminNotificationTemplate from "@/utils/email/AdminNotificationTemplate";
import { parseContactPayload } from "./validate";

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
    await transporter.sendMail({
      from,
      to: email,
      subject: `Re: ${subject}`,
      html: EmailTemplate({ name, subject, message, websiteName }),
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email, // without this, replying to the notification replies to yourself
      subject: `New Contact Form Submission: ${subject}`,
      html: AdminNotificationTemplate({ senderEmail: email, subject, message, websiteName }),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
