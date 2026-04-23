"use client";

import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useTheme } from "@/components/ThemeContext";

export default function HeroSection() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <section className="w-full min-h-[90vh] flex flex-col lg:flex-row items-center justify-between gap-12 py-20 px-6 lg:px-16 relative z-0 overflow-hidden">
      {/* Background Decorative Element based on theme */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] pointer-events-none transition-all duration-1000 -z-10 ${
          theme === "light" ? "bg-amber-200/20" : "bg-indigo-500/10"
        }`}
      ></div>

      {/* Content Section */}
      <div className="flex-1 animate-slide-in-right relative z-10 flex flex-col items-start max-w-2xl">
        {/* Tagline */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm transition-all hover:bg-primary/20">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]"></span>
          <span className="text-sm font-semibold tracking-wide text-primary">
            Welcome to my portfolio
          </span>
        </div>

        {/* Main Heading with Better Typography */}
        <h1 className="text-6xl lg:text-8xl font-black mb-6 text-foreground leading-tight tracking-tight">
          Hi, I&apos;m <br className="hidden md:block" />
          <span className="bg-linear-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
            Angelo
          </span>
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl lg:text-3xl font-medium mb-8 text-foreground/70 tracking-wide">
          Full-Stack Web Developer
        </h2>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a href="#contact" className="inline-block">
            <Button
              size="lg"
              className="w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-wide"
            >
              Let&apos;s Work Together
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform ml-1"
              />
            </Button>
          </a>
          <a
            href="#projects"
            className="inline-block px-8 py-3 rounded-lg font-bold tracking-wide transition-all duration-300 text-foreground border-2 border-foreground/10 hover:border-primary/50 hover:bg-primary/5 hover:scale-105 active:scale-95 text-center flex items-center justify-center"
          >
            View Projects
          </a>
        </div>
      </div>

      {/* Hero Visual: Huge Floating Sun/Moon (Unconstrained) */}
      <div
        className="flex-1 lg:flex-none w-full lg:w-[500px] h-[500px] animate-float relative z-10 cursor-pointer flex items-center justify-center -right-10"
        onClick={toggleTheme}
      >
        {/* --- SUN IMAGE (Light Mode) --- */}
        <div
          className="absolute w-full h-full transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom"
          style={{
            opacity: theme === "light" ? 1 : 0,
            transform:
              theme === "light"
                ? "translateY(0) scale(1)"
                : "translateY(40%) scale(0.8) rotate(-45deg)",
          }}
        >
          <Image
            src="/sun.png"
            alt="Sun"
            width={1000}
            height={1000}
            className="w-full h-full object-contain filter drop-shadow-[0_0_60px_rgba(250,204,21,0.4)]"
            priority
          />
        </div>

        {/* --- MOON IMAGE (Dark Mode) --- */}
        <div
          className="absolute w-full h-full transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top"
          style={{
            opacity: theme === "dark" ? 1 : 0,
            transform:
              theme === "dark"
                ? "translateY(0) scale(1)"
                : "translateY(-40%) scale(0.8) rotate(45deg)",
          }}
        >
          <Image
            src="/Moon.png"
            alt="Moon"
            width={1000}
            height={1000}
            className="w-full h-full object-contain mix-blend-normal"
            priority
          />
        </div>
      </div>
    </section>
  );
}
