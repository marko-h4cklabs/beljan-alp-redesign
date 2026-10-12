import { z } from "zod";
import { contactForm } from "@/content/home";

/** Single source of truth for contact-form validation, used by the server
 * action (the only place that actually enforces it — never trust a client
 * check alone). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, contactForm.errors.name),
  email: z.string().trim().email(contactForm.errors.email),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, contactForm.errors.message),
});
