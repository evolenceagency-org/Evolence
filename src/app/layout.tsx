import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SITE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: SITE.title,
    template: "%s — Evolence",
  },
  description: SITE.description,
  applicationName: "Evolence",
  openGraph: {
    type: "website",
    title: SITE.title,
    description: SITE.description,
    siteName: "Evolence",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 overflow-hidden"
          >
            <div className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-zinc-200/70 via-white to-zinc-100/40 blur-3xl dark:from-zinc-900/40 dark:via-zinc-900/10 dark:to-zinc-800/30" />
            <div className="absolute top-32 -left-40 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-sky-200/50 via-indigo-200/30 to-fuchsia-200/40 blur-3xl dark:from-sky-500/10 dark:via-indigo-500/10 dark:to-fuchsia-500/10" />
            <div className="absolute bottom-0 -right-40 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-emerald-200/40 via-cyan-200/30 to-zinc-100/40 blur-3xl dark:from-emerald-500/10 dark:via-cyan-500/10 dark:to-zinc-800/20" />
          </div>

          <div className="relative">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
