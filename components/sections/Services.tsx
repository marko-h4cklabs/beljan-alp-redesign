import { Scissors, Shovel, Sprout, Trash2, TreeDeciduous, TreePine } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/home";

const icons = [TreePine, Scissors, TreeDeciduous, Trash2, Shovel, Sprout];

export function Services() {
  return (
    <section id="services" data-scroll-section className="bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading eyebrow={services.eyebrow} heading={services.heading} intro={services.intro} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <Reveal as="li" key={service.title} delay={i * 0.08}>
                <div className="group h-full rounded-card bg-cream-dark p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest/10 text-forest transition-colors group-hover:bg-forest group-hover:text-cream">
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-forest">
                    {service.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-ink-soft">{service.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
