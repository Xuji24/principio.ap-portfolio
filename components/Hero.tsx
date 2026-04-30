"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

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
            className="font-heading font-black text-6xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/40"
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
          <div className="w-full max-w-[320px] lg:max-w-[380px] group [perspective:1000px]">
            <a
              href="http://m.me/angeloprincipio24"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-full aspect-[4/5] rounded-3xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl cursor-pointer"
            >
              {/* Front Face */}
              <div className="absolute inset-0 w-full h-full rounded-3xl bg-card/20 backdrop-blur-xl border border-border overflow-hidden [backface-visibility:hidden] flex flex-col items-center justify-center p-8 text-center group-hover:border-primary/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
                <div className="w-28 h-28 rounded-full bg-[#0084FF]/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,132,255,0.3)]">
                  <MessageCircle size={56} className="text-[#0084FF]" fill="#0084FF" />
                </div>
                <h3 className="font-heading font-bold text-3xl mb-2 text-foreground relative z-10">
                  Got an Idea?
                </h3>
                <p className="font-mono text-primary text-sm uppercase tracking-widest relative z-10">
                  Hover to reveal
                </p>

                <motion.div 
                  className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl z-0"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>

              {/* Back Face */}
              <div className="absolute inset-0 w-full h-full rounded-3xl bg-primary/10 backdrop-blur-xl border border-primary/50 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center p-8 text-center">
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 to-transparent opacity-80" />
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 shadow-[0_0_30px_var(--primary)]">
                  <MessageCircle size={40} className="text-primary" fill="currentColor" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-2 text-foreground relative z-10">
                  Let&apos;s Chat!
                </h3>
                <p className="font-sans text-muted-foreground text-sm relative z-10">
                  Available for freelance opportunities and full-time roles. Drop me a direct message on Messenger!
                </p>
                <div className="mt-8 px-6 py-3 rounded-full border border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all relative z-10 bg-background/50">
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-border relative overflow-hidden">
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
