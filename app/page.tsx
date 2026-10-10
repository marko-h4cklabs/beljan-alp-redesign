import { Hero } from "@/components/sections/Hero";
import { IntroStrip } from "@/components/sections/IntroStrip";
import { Services } from "@/components/sections/Services";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStrip />
      <Services />
      <WorkGallery />
      <About />
      <Testimonials />
      <WhyUs />
      <Contact />
    </>
  );
}
