import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 py-20 px-6 lg:px-16 relative z-0">
      <div className="shrink-0 animate-slide-in-left relative z-10">
        <div className="w-64 h-64 rounded-full bg-linear-to-br from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 flex items-center justify-center overflow-hidden border-4 border-teal-200 dark:border-teal-700 shadow-lg animate-float">
          <Image src="/profile-image.jpg" alt="Profile Image" width={256} height={256} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex-1 animate-slide-in-right relative z-10">
        <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-black dark:text-white leading-tight">
          Hi, It&apos;s <span className="text-teal-600 dark:text-teal-400 animate-pulse">Angelo,</span>
        </h1>
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-black dark:text-teal-400">
          A WebApp Developer
        </h2>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl">
          Full-Stack Web Developer specializing in building high-performance applications with
          Next.js and Supabase. With a solid foundation in backend architecture, I focus on
          creating scalable, data-driven solutions that provide seamless user experiences front to back.
        </p>

        <Link href="/contact">
          <Button size="lg" className="w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95">
            LET&apos;S TALK
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
