"use client";

import { MotionConfig } from "framer-motion";
import  ThemeContextProvider  from "@/components/ThemeContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </MotionConfig>
  );
}
