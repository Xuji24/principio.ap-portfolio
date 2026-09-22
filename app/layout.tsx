import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import Providers from "@/components/ThemeProvider";
import "./globals.css";
import PortfolioChatbot from "@/components/PortfolioChatbot";
import VisitorTracker from "@/components/VisitorTracker";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Angelo Principio - Portfolio",
  description: "Full Stack Developer building automation-driven web applications.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} ${jetbrains.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <PortfolioChatbot />
          <VisitorTracker />
        </Providers>
      </body>
    </html>
  );
}
