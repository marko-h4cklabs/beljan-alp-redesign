import type { Metadata } from "next";
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
        <ScrollToAnchor />
        <Header />
        <main style={{ paddingTop: "var(--header-height)" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
