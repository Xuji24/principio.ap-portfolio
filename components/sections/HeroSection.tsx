import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 py-20 px-6 lg:px-16 relative z-0">
      {/* Profile Image with Enhanced Styling */}
      <div className="shrink-0 animate-slide-in-left relative z-10">
        {/* Gradient Background Circle */}
        <div className="absolute inset-0 w-64 h-64 rounded-full bg--to-br from-teal-500/30 to-blue-500/30 blur-3xl animate-pulse"></div>

        {/* Profile Container */}
        <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-teal-400/50 dark:border-teal-500/50 shadow-2xl dark:shadow-teal-500/20 ring-2 ring-offset-4 ring-teal-400/20 dark:ring-offset-black">
          <div className="absolute inset-0 bg--to-br from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 z-0"></div>
          <Image
            src="/profile-image.jpg"
            alt="Profile Image"
            width={256}
            height={256}
            className="w-full h-full object-cover relative z-10"
            priority
          />
        </div>

        {/* Floating Badge */}
        <div className="absolute -bottom-4 -right-4 bg-teal-600 dark:bg-teal-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <Sparkles size={16} />
          <span className="text-sm font-semibold">Available</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 animate-slide-in-right relative z-10">
        {/* Tagline */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/50 border border-teal-200 dark:border-teal-700/50">
          <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse"></span>
          <span className="text-sm font-semibold text-teal-700 dark:text-teal-300">
            Welcome to my portfolio
          </span>
        </div>

        {/* Main Heading with Better Typography */}
        <h1 className="text-5xl lg:text-7xl font-black mb-6 text-black dark:text-white leading-tight">
          Hi, I&apos;m{" "}
          <span className="bg-linear-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent animate-pulse">
            Angelo
          </span>
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-700 dark:text-gray-300">
          Full-Stack Web Developer | Team Player | Tech Enthusiast
        </h2>

        {/* Description with Better Spacing */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl font-medium">
          I craft modern, scalable web applications with Next.js, React, and
          Supabase. Specializing in building intuitive user experiences backed
          by robust architecture.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contact" className="inline-block">
            <Button
              size="lg"
              className="w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Let&apos;s Work Together
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </a>
          <a
            href="#projects"
            className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-black dark:text-white border-2 border-teal-600 dark:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:scale-105 active:scale-95"
          >
            View My Work
          </a>
        </div>

        {/* Stats Row */}
        <div className="mt-12 flex flex-wrap gap-8">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              2+
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Projects Completed
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              0
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Years Experience
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              100%
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Dedicated
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
