import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BioNatural | Healthy, Local, Quality Wellness in PDC & Tulum",
  description: "Playa del Carmen's premium health store and restaurant. High-protein superfoods, vegan tacos, and curated organic supplements. Visit us in PDC, Tulum & Cancún.",
  keywords: ["organic food Playa del Carmen", "vegan restaurant Tulum", "keto supplements Mexico", "BioNatural PDC", "healthy grocery delivery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        {/* TinyTalk Global Widget */}
        <script 
          src="https://widget.tinytalk.ai/v1/widget.js" 
          data-token={process.env.TINYTALK_API_KEY} 
          defer
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Suspense fallback={null}>
          <Navigation />
        </Suspense>
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
