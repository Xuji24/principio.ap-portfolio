"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import { useEffect, useState, useCallback } from "react";

const navItems = [
  { name: "01 // home", href: "home" },
  { name: "02 // expertise", href: "expertise" },
  { name: "03 // work", href: "projects" },
  { name: "04 // contact", href: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "home";
      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (window.scrollY >= el.offsetTop - 200) {
          currentSection = section.getAttribute("id") || "home";
        }
      });
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (pathname === "/") {
        e.preventDefault();
        setMobileMenuOpen(false);
        document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [pathname],
  );

  return (
    <nav
      className={`w-full flex items-center justify-between py-4 px-6 lg:px-16 sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-2xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* Logo — <AP/> terminal style */}
      <Link href="/" aria-label="Home">
        <span className="text-sm lg:text-base font-black tracking-wider font-mono text-foreground cursor-pointer">
          <span className="text-primary">&lt;</span>
          <span className="text-foreground">AP</span>
          <span className="text-primary">/&gt;</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-6 lg:gap-10">
        <ThemeSwitch />
        {navItems.map((item) => {
          const isActive = activeSection === item.href;
          return (
            <li key={item.name}>
              <Link
                href={`#${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-mono tracking-wide transition-colors ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-muted-foreground pb-1"
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile Controls */}
      <div className="flex items-center gap-3 md:hidden">
        <ThemeSwitch />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-60"
        >
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 origin-center ${
              mobileMenuOpen ? "rotate-45 translate-y-1" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 origin-center ${
              mobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-0 left-0 w-full h-dvh bg-background/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navItems.map((item, index) => {
          const isActive = activeSection === item.href;
          return (
            <Link
              key={item.name}
              href={`#${item.href}`}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-2xl font-mono tracking-wide transition-all duration-500 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              style={{
                transitionDelay: mobileMenuOpen ? `${index * 75}ms` : "0ms",
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileMenuOpen ? 1 : 0,
              }}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

