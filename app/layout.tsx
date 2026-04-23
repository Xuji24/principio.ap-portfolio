import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "@/components/ThemeProvider";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Angelo Principio - Portfolio",
  description:
    "Full-Stack Web Developer Portfolio showcasing projects and skills.",
  icons: {
    icon: "/public/angelo_principio_portfolio.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
        suppressHydrationWarning
      >
        <Providers>
          <BackgroundCanvas />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
