import { NextRequest, NextResponse } from "next/server";
import transporter from "@/utils/email/nodemailer";
import EmailTemplate from "@/utils/email/EmailTemplate";
import AdminNotificationTemplate from "@/utils/email/AdminNotificationTemplate";

export async function POST(request: NextRequest) {
  try {
    const { email, subject, message } = await request.json();

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Generate HTML from your template
    const userName = email.split("@")[0].replace(/[._]/g, " ").toUpperCase();
    const htmlContent = EmailTemplate({
      name: userName,
      subject: subject,
      message: message,
      websiteName: process.env.NEXT_PUBLIC_WEBSITE_NAME || "Portfolio",
    });

    // Send email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Re: ${subject}`,
      html: htmlContent,
    });

    // Send notification email to yourself
    const adminHtmlContent = AdminNotificationTemplate({
      senderEmail: email,
      subject: subject,
      message: message,
      websiteName: process.env.NEXT_PUBLIC_WEBSITE_NAME || "Portfolio",
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: adminHtmlContent,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message received and confirmation email sent",
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}