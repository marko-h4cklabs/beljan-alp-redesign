import type { ComponentType } from "react";
import { Reveal } from "./Reveal";

type LinkCardProps = {
  icon: ComponentType<{ size?: number }>;
  title: string;
  subtitle: string;
  href: string;
  external?: boolean;
  /** Tailwind classes for the icon circle's background + text color. */
  tint: string;
  delay?: number;
};

/** Wide, fully-clickable rounded card: icon circle left, title + subtitle
 * right. Used for the /izbornik link hub (and reusable anywhere else a
 * "contact/link" card list is needed). */
export function LinkCard({ icon: Icon, title, subtitle, href, external, tint, delay = 0 }: LinkCardProps) {
  return (
    <Reveal delay={delay}>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="flex min-h-[72px] items-center gap-4 rounded-card bg-cream-dark p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
      >
        <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-full ${tint}`}>
          <Icon size={22} />
        </span>
        <span>
          <span className="block font-sans text-lg font-semibold text-forest">{title}</span>
          <span className="block font-sans text-sm text-ink-soft">{subtitle}</span>
        </span>
      </a>
    </Reveal>
  );
}
