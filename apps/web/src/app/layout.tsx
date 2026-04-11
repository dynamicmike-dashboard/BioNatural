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

import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BioNatural | Healthy, Local, Quality Wellness in PDC & Tulum",
  description: "Playa del Carmen's premium health store and restaurant. High-protein superfoods, vegan tacos, and curated organic supplements.",
  icons: {
    icon: "/favicon.svg",
  },
};

import { CartProvider } from "@/context/CartContext";

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
        <script 
          src="https://widget.tinytalk.ai/v1/widget.js" 
          data-token={process.env.TINYTALK_API_KEY} 
          defer
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>
          <Suspense fallback={null}>
            <Navigation />
          </Suspense>
          <main className="flex-1">
            {children}
          </main>
          <Suspense fallback={null}>
            <FooterWrapper />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}

function FooterWrapper() {
  // We'll use a client component or a wrapper to handle lang safely if needed
  // For now, let's just use the Footer. 
  return <Footer lang="en" />;
}
