"use client";
import { motion } from "framer-motion";
import { IconDoc, IconArrowUpRight } from "@/components/ui/Icon";
import { site } from "@/lib/content/site";
import { liftPress } from "@/lib/motion/liftPress";

export function TopBar() {
  return (
    <div className="absolute top-5 right-5 md:top-7 md:right-9 flex items-center gap-3 z-20">
      <motion.a
        href={site.links.resume}
        download
        {...liftPress}
        className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-full bg-surface border border-line transition-colors text-ink text-[13px] font-medium hover:border-amber/40"
      >
        <IconDoc className="w-3.5 h-3.5" /> Résumé
      </motion.a>
      <motion.a
        href="/contact"
        {...liftPress}
        className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-ink text-paper text-[13px] font-semibold"
      >
        Get in touch <IconArrowUpRight className="w-3.5 h-3.5" />
      </motion.a>
    </div>
  );
}
