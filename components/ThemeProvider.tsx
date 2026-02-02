"use client";

import  ThemeContextProvider  from "@/components/ThemeContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
