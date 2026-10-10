"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, ImagePlus, Phone } from "lucide-react";
import { z } from "zod";
import { WhatsAppIcon, MessengerIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/content/business";
import { contactForm, contactMethods } from "@/content/home";

const methodConfig = [
  {
    icon: WhatsAppIcon,
    href: business.whatsappUrl,
    tint: "bg-[#25D366]/10 text-[#1DA851]",
  },
  {
    icon: Phone,
    href: `tel:${business.phoneE164}`,
    tint: "bg-forest/10 text-forest",
  },
  {
    icon: MessengerIcon,
    href: business.messengerUrl,
    tint: "bg-[#0084FF]/10 text-[#0084FF]",
  },
];

const schema = z.object({
  name: z.string().trim().min(2, contactForm.errors.name),
  email: z.string().trim().email(contactForm.errors.email),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, contactForm.errors.message),
});

type FormErrors = Partial<Record<"name" | "email" | "message" | "file", string>>;

export function Contact() {
  const formId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "pending" | "success">("idle");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName(null);
      return;
    }
    if (file.size > contactForm.maxFileSizeBytes) {
      setErrors((prev) => ({ ...prev, file: contactForm.errors.fileTooLarge }));
      e.target.value = "";
      setFileName(null);
      return;
    }
    setErrors((prev) => ({ ...prev, file: undefined }));
    setFileName(file.name);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = schema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
    });

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormErrors;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("pending");
    // Actual sending is wired up in step 5 (server action + Resend).
    // For now, simulate submission so the UI/validation can be reviewed.
    window.setTimeout(() => {
      setStatus("success");
      e.currentTarget.reset();
      setFileName(null);
    }, 600);
  }

  return (
    <section id="contact-methods" data-scroll-section className="bg-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <h3 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
            {contactMethods.heading}
          </h3>
          <p className="mt-2 font-sans text-ink-soft">{contactMethods.intro}</p>

          <ul className="mt-8 space-y-4">
            {contactMethods.items.map((method, i) => {
              const config = methodConfig[i]!;
              const Icon = config.icon;
              return (
                <li key={method.label}>
                  <a
                    href={config.href}
                    target={config.href.startsWith("tel:") ? undefined : "_blank"}
                    rel={config.href.startsWith("tel:") ? undefined : "noreferrer"}
                    className="flex items-center gap-4 rounded-card bg-cream-dark p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-full ${config.tint}`}>
                      <Icon size={20} />
                    </span>
                    <span>
                      <span className="block font-sans font-semibold text-forest">{method.label}</span>
                      <span className="block font-sans text-sm text-ink-soft">{method.description}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal>
          <h3 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
            {contactForm.heading}
          </h3>
          <p className="mt-2 font-sans text-ink-soft">{contactForm.intro}</p>

          {status === "success" ? (
            <div className="mt-6 flex items-start gap-3 rounded-card bg-forest/10 p-5 text-forest">
              <CheckCircle2 className="mt-0.5 flex-none" size={20} aria-hidden="true" />
              <p className="font-sans text-sm">{contactForm.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div>
                <label htmlFor={`${formId}-name`} className="font-sans text-sm font-medium text-forest">
                  {contactForm.nameLabel}
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  placeholder={contactForm.namePlaceholder}
                  className="mt-1.5 w-full rounded-lg border border-sage/30 bg-cream px-4 py-2.5 font-sans text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                />
                {errors.name && (
                  <p id={`${formId}-name-error`} className="mt-1 font-sans text-xs text-red-700">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={`${formId}-email`} className="font-sans text-sm font-medium text-forest">
                  {contactForm.emailLabel}
                </label>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  placeholder={contactForm.emailPlaceholder}
                  className="mt-1.5 w-full rounded-lg border border-sage/30 bg-cream px-4 py-2.5 font-sans text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                />
                {errors.email && (
                  <p id={`${formId}-email-error`} className="mt-1 font-sans text-xs text-red-700">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={`${formId}-phone`} className="font-sans text-sm font-medium text-forest">
                  {contactForm.phoneLabel}
                </label>
                <input
                  id={`${formId}-phone`}
                  name="phone"
                  type="tel"
                  placeholder={contactForm.phonePlaceholder}
                  className="mt-1.5 w-full rounded-lg border border-sage/30 bg-cream px-4 py-2.5 font-sans text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-message`} className="font-sans text-sm font-medium text-forest">
                  {contactForm.messageLabel}
                </label>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={4}
                  placeholder={contactForm.messagePlaceholder}
                  className="mt-1.5 w-full resize-none rounded-lg border border-sage/30 bg-cream px-4 py-2.5 font-sans text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? `${formId}-message-error` : undefined}
                />
                {errors.message && (
                  <p id={`${formId}-message-error`} className="mt-1 font-sans text-xs text-red-700">
                    {errors.message}
                  </p>
                )}
              </div>

              <div>
                <span className="font-sans text-sm font-medium text-forest">
                  {contactForm.fileLabel}{" "}
                  <span className="font-normal text-ink-soft">{contactForm.fileOptionalNote}</span>
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-1.5 flex w-full items-center gap-2 rounded-lg border border-dashed border-sage/40 bg-cream-dark px-4 py-3 text-left font-sans text-sm text-ink-soft transition-colors hover:border-forest/40"
                >
                  <ImagePlus size={18} className="flex-none text-forest" aria-hidden="true" />
                  {fileName ?? contactForm.fileHint}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {errors.file && <p className="mt-1 font-sans text-xs text-red-700">{errors.file}</p>}
              </div>

              {/* Honeypot + timing fields for step 5's spam protection — not
                  enforced yet since sending isn't wired up. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor={`${formId}-website`}>Website</label>
                <input
                  id={`${formId}-website`}
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={status === "pending"}
                className="w-full rounded-pill bg-forest px-6 py-3 font-sans text-sm font-semibold text-cream shadow-soft transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                {status === "pending" ? contactForm.submitPendingLabel : contactForm.submitLabel}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
