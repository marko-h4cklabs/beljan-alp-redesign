import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { IzbornikLinks } from "@/components/sections/IzbornikLinks";
import { izbornik } from "@/content/izbornik";

export const metadata: Metadata = {
  title: izbornik.heading,
  description:
    "Brzi kontakt s Vrtnom oazom Beljan – WhatsApp, Messenger, e-mail, telefon, web i Facebook stranica na jednom mjestu.",
};

export default function IzbornikPage() {
  return (
    <div className="mx-auto max-w-[520px] px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="flex flex-col items-center text-center">
        <Image
          src="/images/shared/logo-badge.png"
          alt="Vrtna oaza Beljan logo"
          width={160}
          height={157}
          className="h-32 w-32 sm:h-40 sm:w-40"
          priority
        />
        <h1 className="mt-6 font-display text-4xl font-semibold text-forest">{izbornik.heading}</h1>
        <p className="mt-3 max-w-sm font-sans text-ink-soft">{izbornik.subheading}</p>
      </Reveal>

      <div className="mt-10">
        <IzbornikLinks />
      </div>
    </div>
  );
}
