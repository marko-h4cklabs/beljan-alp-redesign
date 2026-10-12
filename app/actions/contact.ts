"use server";

import { Resend } from "resend";
import { headers } from "next/headers";
import { contactSchema } from "@/lib/contactSchema";
import { isRateLimited } from "@/lib/rateLimit";
import { contactForm } from "@/content/home";
import { business } from "@/content/business";

export type ContactFieldErrors = Partial<Record<"name" | "email" | "message" | "file", string>>;

/** Echoed back on invalid/error so the form can restore what was typed —
 * without this, any failed submission (including a transient send error)
 * would silently wipe a customer's typed inquiry. */
export type ContactFormValues = { name: string; email: string; phone: string; message: string };

export type ContactActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; errors: ContactFieldErrors; values: ContactFormValues }
  | { status: "error"; message: string; values: ContactFormValues };

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Vrtna oaza Beljan <upiti@beljan-alp.com>";
const MIN_FILL_TIME_MS = 2000;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmailHtml({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): string {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 560px; margin: 0 auto;">
      <div style="background:#1B3A2B; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color:#F6F3EC; font-size:18px; margin:0;">Novi upit s web stranice</h1>
      </div>
      <div style="padding: 24px; border: 1px solid #e5e1d8; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="margin:0 0 8px;"><strong>Ime:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p style="margin:0 0 8px;"><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p style="margin:16px 0 4px;"><strong>Poruka:</strong></p>
        <p style="white-space: pre-wrap; margin:0;">${escapeHtml(message)}</p>
      </div>
    </div>
  `;
}

/**
 * Server Action backing the homepage contact form (used via
 * `useActionState` + `<form action={...}>`, so it still works with JS
 * disabled). Spam protection: a honeypot field and a minimum-fill-time
 * check both fail silently (report success, send nothing) so bots don't
 * learn they were caught; a real rate limit (see lib/rateLimit.ts) returns
 * a visible error since a genuine human hitting it deserves to know why.
 */
function readValues(formData: FormData): ContactFormValues {
  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
}

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success" };
  }

  const startedAtRaw = formData.get("startedAt");
  const startedAt = typeof startedAtRaw === "string" ? Number(startedAtRaw) : NaN;
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return { status: "success" };
  }

  const values = readValues(formData);

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip") ?? "unknown";
  if (isRateLimited(ip)) {
    return { status: "error", message: contactForm.rateLimitedMessage, values };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "name" || field === "email" || field === "message") {
        errors[field] = issue.message;
      }
    }
    return { status: "invalid", errors, values };
  }

  const file = formData.get("file");
  let attachments: { filename: string; content: Buffer }[] | undefined;
  if (file instanceof File && file.size > 0) {
    if (file.size > contactForm.maxFileSizeBytes) {
      return { status: "invalid", errors: { file: contactForm.errors.fileTooLarge }, values };
    }
    attachments = [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()) }];
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send email.");
    return { status: "error", message: contactForm.notConfiguredMessage, values };
  }

  const { name, email, phone, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: business.email,
      replyTo: email,
      subject: `Novi upit s web stranice – ${name}`,
      text: [`Ime: ${name}`, `Email: ${email}`, phone ? `Telefon: ${phone}` : null, "", "Poruka:", message]
        .filter(Boolean)
        .join("\n"),
      html: renderEmailHtml({ name, email, phone, message }),
      attachments,
    });

    if (error) {
      console.error("Resend error:", error);
      return { status: "error", message: contactForm.genericErrorMessage, values };
    }
  } catch (err) {
    console.error("Contact form send failed:", err);
    return { status: "error", message: contactForm.genericErrorMessage, values };
  }

  return { status: "success" };
}
