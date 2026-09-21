import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import Providers from "@/components/ThemeProvider";
import {ChatbotHeader} from "@/components/ui/ChatbotHeader";
import "./globals.css";
import PortfolioChatbot from "@/components/PortfolioChatbot";
import VisitorTracker from "@/components/VisitorTracker";
import VisitCounterBadge from "@/components/VisitCounterBadge";
import { createClient } from "@/lib/supabase/server";

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
        className={`${outfit.variable} ${inter.variable} ${jetbrains.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <VisitCounterBadge viewCount={viewCount} />
          {children}
          <PortfolioChatbot />
          <VisitorTracker />
        </Providers>
      </body>
    </html>
  );
}
