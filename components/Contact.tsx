"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-[60vh] md:min-h-[80vh] py-16 md:py-24 px-6 lg:px-16 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start"
        >
          <span className="font-mono text-primary tracking-widest uppercase mb-6 flex items-center gap-4">
            <div className="w-12 h-px bg-primary" />
            What&apos;s Next?
          </span>
          
          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] text-foreground mb-12 tracking-tighter hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-primary hover:to-secondary transition-all duration-500 cursor-default">
            LET&apos;S WORK
            <br />
            TOGETHER.
          </h2>

          <div className="flex flex-col md:flex-row gap-12 md:items-center">
            <a
              href="mailto:principio.ap@gmail.com"
              className="group relative inline-flex items-center gap-2 md:gap-4 text-lg sm:text-2xl md:text-4xl font-bold font-heading text-foreground break-all md:break-normal"
            >
              <span>principio.ap@gmail.com</span>
              <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300 group-hover:text-primary" size={40} />
              <div className="absolute -bottom-2 left-0 w-full h-0.75 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </a>

            <div className="flex gap-6 mt-4 md:mt-0">
              {[
                { name: "LinkedIn", url: "https://www.linkedin.com/in/angelo-principio-6b8380296/" },
                { name: "GitHub", url: "https://github.com/Xuji24" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-muted-foreground hover:text-foreground text-sm uppercase tracking-wider relative group"
                >
                  {social.name}
                  <div className="absolute -bottom-1 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative large ampersand in background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/2 left-[60%] -translate-y-1/2 text-[40vw] font-black font-heading text-foreground pointer-events-none select-none z-0"
      >
        &
      </motion.div>
    </section>
  );
}
