import { Globe, Mail, Phone } from "lucide-react";
import { LinkCard } from "@/components/ui/LinkCard";
import { business } from "@/content/business";
import { izbornik } from "@/content/izbornik";
import { FacebookIcon, MessengerIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

const GREEN_DARK = "bg-forest/10 text-forest";
const BLUE = "bg-[#1877F2]/10 text-[#1877F2]";
const GREEN_WHATSAPP = "bg-[#25D366]/10 text-[#1DA851]";
const RED = "bg-[#EA4335]/10 text-[#EA4335]";

export function IzbornikLinks() {
  const [webCard, facebookCard] = izbornik.primaryCards;
  const [whatsappCard, messengerCard, emailCard, phoneCard] = izbornik.contactCards;

  return (
    <div className="space-y-3">
      <LinkCard icon={Globe} title={webCard!.title} subtitle={webCard!.subtitle} href="/" tint={GREEN_DARK} />
      <LinkCard
        icon={FacebookIcon}
        title={facebookCard!.title}
        subtitle={facebookCard!.subtitle}
        href={business.facebookUrl}
        external
        tint={BLUE}
        delay={0.06}
      />

      <p className="pt-5 pb-1 text-center font-sans text-xs font-semibold tracking-[0.2em] text-amber uppercase">
        {izbornik.contactSectionLabel}
      </p>

      <LinkCard
        icon={WhatsAppIcon}
        title={whatsappCard!.title}
        subtitle={whatsappCard!.subtitle!}
        href={business.whatsappUrl}
        external
        tint={GREEN_WHATSAPP}
      />
      <LinkCard
        icon={MessengerIcon}
        title={messengerCard!.title}
        subtitle={messengerCard!.subtitle!}
        href={business.messengerUrl}
        external
        tint={BLUE}
        delay={0.06}
      />
      <LinkCard
        icon={Mail}
        title={emailCard!.title}
        subtitle={business.email}
        href={`mailto:${business.email}`}
        tint={RED}
        delay={0.12}
      />
      <LinkCard
        icon={Phone}
        title={phoneCard!.title}
        subtitle={business.phoneDisplay}
        href={`tel:${business.phoneE164}`}
        tint={GREEN_DARK}
        delay={0.18}
      />
    </div>
  );
}
