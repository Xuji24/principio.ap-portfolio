"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";

const navItems = [
  { name: "HOME", href: "/" },
  { name: "PROJECTS", href: "/projects" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center justify-between py-8 px-6 lg:px-16 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-black/95 transition-all duration-300">
      <Link href="/">
        <h1 className="text-sm lg:text-lg font-bold text-black dark:text-white cursor-pointer hover:opacity-80 transition-opacity duration-200">
          ANGELO MATURINGAN PRINCIPIO /{" "}
          <span className="text-teal-600">Portfolio</span>
        </h1>
      </Link>
      <ul className="flex space-x-4 lg:space-x-8">
        <ThemeSwitch />
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`text-xs lg:text-sm font-semibold transition-colors duration-200 relative group ${
                  isActive
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-black dark:text-white hover:text-teal-600 dark:hover:text-teal-400"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 dark:bg-teal-400 transform origin-left transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
