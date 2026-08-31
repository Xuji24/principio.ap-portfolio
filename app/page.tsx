import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import TechStack from "@/components/TechStack";
import Certifications from "@/components/Certifications";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="w-full relative">
      <Hero />
      <Expertise />
      <TechStack />
      <Certifications />
      <Journey />
      <Projects />
      <Contact />
    </main>
  );
}
