import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { MotionProvider } from "@/components/MotionProvider";
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
    template: "%s - Evolence",
  },
  description: SITE.description,
  applicationName: "Evolence",
  icons: {
    icon: "/assets/favicon.png",
  },
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
        <MotionProvider>
          <div className="relative min-h-dvh overflow-x-hidden bg-[#f8fafc] text-[#0f172a]">
            <div className="relative page-shell">
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}

