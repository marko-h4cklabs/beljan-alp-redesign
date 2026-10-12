"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, ImagePlus, Phone } from "lucide-react";
import { WhatsAppIcon, MessengerIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/content/business";
import { contactForm, contactMethods } from "@/content/home";
import { submitContactForm, type ContactActionState } from "@/app/actions/contact";

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

const initialState: ContactActionState = { status: "idle" };

export function Contact() {
  const formId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  // Hidden until mounted (not computed during SSR) so the form can't be
  // submitted faster than a real person could possibly fill it in — see
  // app/actions/contact.ts's MIN_FILL_TIME_MS check.
  const [startedAt, setStartedAt] = useState<number | "">("");
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  // Inputs below are uncontrolled (defaultValue only), so a new submission
  // result needs to force-remount the form for its echoed-back `values` to
  // actually appear — otherwise a failed/errored submission would silently
  // wipe out whatever the customer typed. Comparing the state reference
  // during render (not in an effect) is the documented-safe way to derive
  // this without an extra render pass.
  const [formKey, setFormKey] = useState(0);
  const [lastState, setLastState] = useState(state);
  if (state !== lastState) {
    setLastState(state);
    setFormKey((k) => k + 1);
    // The remounted file input can't be given a value back (browsers don't
    // allow it), so the displayed filename must reset along with it —
    // otherwise it would keep showing a filename for a file that's no
    // longer actually attached.
    setFileName(null);
    setFileError(null);
  }

  useEffect(() => {
    function sync() {
      setStartedAt(Date.now());
    }
    sync();
  }, []);

  const fieldErrors = state.status === "invalid" ? state.errors : {};
  const displayedFileError = fileError ?? fieldErrors.file;
  const values = state.status === "invalid" || state.status === "error" ? state.values : undefined;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName(null);
      setFileError(null);
      return;
    }
    if (file.size > contactForm.maxFileSizeBytes) {
      setFileError(contactForm.errors.fileTooLarge);
      e.target.value = "";
      setFileName(null);
      return;
    }
    setFileError(null);
    setFileName(file.name);
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

          {state.status === "success" ? (
            <div className="mt-6 flex items-start gap-3 rounded-card bg-forest/10 p-5 text-forest">
              <CheckCircle2 className="mt-0.5 flex-none" size={20} aria-hidden="true" />
              <p className="font-sans text-sm">{contactForm.successMessage}</p>
            </div>
          ) : (
            <form key={formKey} action={formAction} noValidate className="mt-6 space-y-4">
              <div>
                <label htmlFor={`${formId}-name`} className="font-sans text-sm font-medium text-forest">
                  {contactForm.nameLabel}
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  defaultValue={values?.name}
                  placeholder={contactForm.namePlaceholder}
                  className="mt-1.5 w-full rounded-lg border border-sage/30 bg-cream px-4 py-2.5 font-sans text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? `${formId}-name-error` : undefined}
                />
                {fieldErrors.name && (
                  <p id={`${formId}-name-error`} className="mt-1 font-sans text-xs text-red-700">
                    {fieldErrors.name}
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
                  defaultValue={values?.email}
                  placeholder={contactForm.emailPlaceholder}
                  className="mt-1.5 w-full rounded-lg border border-sage/30 bg-cream px-4 py-2.5 font-sans text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? `${formId}-email-error` : undefined}
                />
                {fieldErrors.email && (
                  <p id={`${formId}-email-error`} className="mt-1 font-sans text-xs text-red-700">
                    {fieldErrors.email}
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
                  defaultValue={values?.phone}
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
                  defaultValue={values?.message}
                  placeholder={contactForm.messagePlaceholder}
                  className="mt-1.5 w-full resize-none rounded-lg border border-sage/30 bg-cream px-4 py-2.5 font-sans text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? `${formId}-message-error` : undefined}
                />
                {fieldErrors.message && (
                  <p id={`${formId}-message-error`} className="mt-1 font-sans text-xs text-red-700">
                    {fieldErrors.message}
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
                  name="file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {displayedFileError && (
                  <p className="mt-1 font-sans text-xs text-red-700">{displayedFileError}</p>
                )}
              </div>

              {/* Honeypot (real visitors never fill this, it's hidden via
                  CSS) + a mount timestamp so the server can reject
                  impossibly-fast submissions — see app/actions/contact.ts. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor={`${formId}-website`}>Website</label>
                <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <input type="hidden" name="startedAt" value={startedAt} />

              {state.status === "error" && (
                <div className="flex items-start gap-2 rounded-card bg-red-50 p-4 text-red-700">
                  <AlertCircle size={18} className="mt-0.5 flex-none" aria-hidden="true" />
                  <p className="font-sans text-sm">{state.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-pill bg-forest px-6 py-3 font-sans text-sm font-semibold text-cream shadow-soft transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                {isPending ? contactForm.submitPendingLabel : contactForm.submitLabel}
              </button>

              <p className="text-center font-sans text-xs text-ink-soft">
                {contactForm.consentNotePrefix}
                <Link href="/politika-privatnosti" className="underline hover:text-forest">
                  {contactForm.consentNoteLinkLabel}
                </Link>
                .
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
