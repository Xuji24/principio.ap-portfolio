import HeroSection from "@/components/sections/HeroSection";
import WhatIDo from "@/components/sections/WhatIDo";
import TechStack from "@/components/sections/TechStack";
import AboutPage from "@/components/pages/about/AboutPage";
import ProjectPage from "@/components/pages/projects/ProjectPage";
import ContactPage from "@/components/pages/contact/ContactPage";

function SectionDivider() {
  return (
    <div className="w-full px-6 lg:px-16">
      <div className="h-px bg-border" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="w-full bg-background text-foreground transition-colors duration-300">
      {/* Hero */}
      <section id="home" className="w-full max-w-7xl mx-auto">
        <HeroSection />
      </section>

      <SectionDivider />

      {/* What I Do */}
      <section id="services" className="w-full max-w-7xl mx-auto">
        <WhatIDo />
      </section>

      <SectionDivider />

      {/* Tech Stack */}
      <section id="techstack" className="w-full max-w-7xl mx-auto">
        <TechStack />
      </section>

      <SectionDivider />

      {/* About */}
      <section id="about" className="w-full max-w-7xl mx-auto">
        <AboutPage />
      </section>

      <SectionDivider />

      {/* Projects */}
      <section id="projects" className="w-full max-w-7xl mx-auto">
        <ProjectPage />
      </section>

      <SectionDivider />

      {/* Contact */}
      <section id="contact" className="w-full max-w-7xl mx-auto">
        <ContactPage />
      </section>
    </main>
  );
}

