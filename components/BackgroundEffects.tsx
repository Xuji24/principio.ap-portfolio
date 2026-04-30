"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-background">
      {/* Mobile Fallback: Static radial glow */}
      <div className="absolute inset-0 md:hidden bg-[radial-gradient(ellipse_at_top,rgba(0,188,212,0.1)_0%,transparent_80%)]" />

      {/* Central Cyan Glow Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="hidden md:block absolute top-[20%] left-[30%] w-[40vw] h-[40vw] max-w-150 max-h-150 bg-primary/20 rounded-full blur-[120px] mix-blend-screen"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Secondary Purple Glow Orb */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="hidden md:block absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] max-w-175 max-h-175 bg-secondary/20 rounded-full blur-[140px] mix-blend-screen"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Floating Geometric Shape 1 */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="hidden md:block absolute top-[30%] right-[15%] w-32 h-32 border border-primary/20 rounded-3xl"
        style={{ transformOrigin: "center center", willChange: "transform" }}
      />

      {/* Floating Geometric Shape 2 */}
      <motion.div
        animate={{
          y: [30, -30, 30],
          rotate: [360, 180, 0],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="hidden md:block absolute bottom-[30%] left-[10%] w-24 h-24 border border-secondary/20 rounded-full"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
