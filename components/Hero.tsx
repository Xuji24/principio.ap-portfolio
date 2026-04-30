"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

export default function Hero() {

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 lg:px-16 pt-20"
    >
      <div className="z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8">
        {/* Left Side: Typography */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4"
          >
            <span className="font-mono text-primary text-sm md:text-base tracking-widest uppercase">
              Hello World, I am
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-tighter mb-6 text-transparent bg-clip-text bg-linear-to-br from-foreground to-foreground/40"
          >
            ANGELO
            <br />
            PRINCIPIO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="font-mono text-muted-foreground text-sm md:text-lg max-w-lg leading-relaxed"
          >
            {"// FULL-STACK WEB DEVELOPER"}
            <br />
            {"// SPECIALIZING IN BUILDING EXCEPTIONAL DIGITAL EXPERIENCES"}
          </motion.p>
        </div>

        {/* Right Side: 3D Messenger Flip Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-[320px] lg:max-w-95 group perspective-1000">
            <a
              href="http://m.me/angeloprincipio24"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-full aspect-4/5 rounded-3xl transition-all duration-700 transform-style-3d group-hover:rotate-y-180 shadow-2xl cursor-pointer"
            >
              {/* Front Face */}
              <div className="absolute inset-0 w-full h-full rounded-3xl bg-card/20 backdrop-blur-xl border border-border overflow-hidden backface-hidden flex flex-col items-center justify-center p-8 text-center group-hover:border-cyan-500/50 transition-colors shadow-inner">
                {/* 3D Cloud Background Image with Deep Cyan Overlay */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src="/cloud-bg.png" 
                    alt="3D Cloud Background" 
                    fill 
                    className="object-cover opacity-60 mix-blend-luminosity" 
                    priority 
                  />
                  {/* Deep Cyan Depth Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.2)_0%,rgba(0,10,30,0.85)_80%)] mix-blend-hard-light" />
                  <div className="absolute inset-0 bg-cyan-950/30 backdrop-blur-[1px]" />
                </div>

                <div className="w-28 h-28 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,255,255,0.2)] relative z-10 backdrop-blur-md border border-cyan-400/20">
                  <MessageCircle size={56} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]" />
                </div>
                <h3 className="font-heading font-bold text-3xl mb-2 text-white relative z-10 drop-shadow-md">
                  Got an Idea?
                </h3>
                <p className="font-mono text-cyan-300 text-sm uppercase tracking-widest relative z-10 font-semibold drop-shadow-sm">
                  Hover to connect
                </p>
              </div>

              {/* Back Face */}
              <div className="absolute inset-0 w-full h-full rounded-3xl bg-card/60 backdrop-blur-2xl border border-border overflow-hidden backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 text-center shadow-2xl">
                {/* Subtle Cyan Accents for Depth */}
                <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[linear-gradient(45deg,transparent_45%,rgba(0,255,255,0.02)_50%,transparent_55%)] bg-length:[12px_12px] opacity-40 z-0" />
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-[50px] z-0" />
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl z-0" />

                <div className="w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative z-10 group-hover:border-cyan-500/50 transition-colors duration-500">
                  <MessageCircle size={36} className="text-cyan-400" fill="currentColor" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-2 text-foreground relative z-10">
                  Let&apos;s Chat!
                </h3>
                <p className="font-sans text-muted-foreground text-sm relative z-10 mb-8 max-w-[250px]">
                  Available for freelance opportunities and full-time roles. Drop me a message!
                </p>
                <div className="px-6 py-3 rounded-full border border-cyan-500/50 text-cyan-400 font-mono text-xs uppercase tracking-widest hover:bg-cyan-500 hover:text-cyan-950 transition-all relative z-10 bg-background/50 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                  Send Message
                </div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-border relative overflow-hidden">
          <motion.div
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
            className="absolute inset-0 bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
