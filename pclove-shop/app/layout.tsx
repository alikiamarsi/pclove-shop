import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/store/Provider";
import Haeder from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProviders from "./ThemeProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PCLove | PC Components & Accessories",
    template: "%s | PCLove"
  },
  description: "Shop PC components, accessories, and hardware at PCLove",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProviders>
          <Providers>
          <Haeder />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          </Providers>
        </ThemeProviders>
        </body>
    </html>
  );
}
