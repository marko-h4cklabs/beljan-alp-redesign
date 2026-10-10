import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import { fraunces, inter } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToAnchor } from "@/components/layout/ScrollToAnchor";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vrtna oaza Beljan | Rušenje i njega stabala – Međimurje",
    template: "%s | Vrtna oaza Beljan",
  },
  description:
    "Stručno rušenje stabala, obrezivanje i mljevenje panjeva. Certificirani arboristi pružaju sigurnu, profesionalnu njegu stabala za stambene i komercijalne objekte.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        {/* Makes every `motion` animation in the tree respect the user's OS
            reduced-motion preference automatically (animations jump to
            their end state instead of playing) — this is the hydration-safe
            way to do it: components render identical markup on the server
            and the client's first paint either way, so we don't manually
            branch on useReducedMotion() to change *what* renders. */}
        <MotionConfig reducedMotion="user">
          <ScrollToAnchor />
          <Header />
          <main style={{ paddingTop: "var(--header-height)" }}>{children}</main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
