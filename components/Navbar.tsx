"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import { useEffect, useState } from "react";

const navItems = [
  { name: "HOME", href: "home" },
  { name: "SERVICES", href: "services" },
  { name: "ABOUT", href: "about" },
  { name: "PROJECTS", href: "projects" },
  { name: "CONTACT", href: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      <ul className="flex items-center gap-6 lg:gap-10">
        <ThemeSwitch />
        {navItems.map((item) => {
          const isActive = activeSection === item.href;
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                data-text={item.name}
                className={`nav-link text-xs font-bold tracking-widest ${
                  isActive
                    ? "active-link text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

