import type { Metadata } from "next";
import { Montserrat, Inter, Fira_Code } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "@/components/ThemeProvider";
import BackgroundEffects from "@/components/BackgroundEffects";
import {ChatbotHeader} from "@/components/ui/ChatbotHeader";
import "./globals.css";
import PortfolioChatbot from "@/components/PortfolioChatbot";
import VisitorTracker from "@/components/VisitorTracker";
import VisitCounterBadge from "@/components/VisitCounterBadge";
import { createClient } from "@/lib/supabase/server";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Angelo Principio - Portfolio",
  description:
    "Full-Stack Web Developer Portfolio showcasing projects and skills.",
  icons: {
    icon: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.rpc("page_view_count");
  const viewCount = typeof data === "number" ? data : 0;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${inter.variable} ${firaCode.variable} font-sans bg-background text-foreground antialiased transition-colors duration-300 overflow-x-hidden selection:bg-primary/30 selection:text-primary`}
        suppressHydrationWarning
      >
        <Providers>
          <BackgroundEffects />
          <Navbar />
          <VisitCounterBadge viewCount={viewCount} />
          {children}
          <PortfolioChatbot />
          <VisitorTracker />
        </Providers>
      </body>
    </html>
  );
}
