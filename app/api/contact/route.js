import { Resend } from "resend";
import { NextResponse } from "next/server";
import { buildContactEmail } from "@/lib/buildContactEmail";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all required fields.",
        },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address.",
        },
        { status: 400 }
      );
    }

    const { to, subject: fullSubject, text } = buildContactEmail({ name, email, subject, message });

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // change later
      to: [to],
      replyTo: email,
      subject: fullSubject,
      text,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}