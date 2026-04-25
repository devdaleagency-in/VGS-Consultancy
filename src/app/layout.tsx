import type { Metadata } from "next";
import { Montserrat, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vgs.ind.in'),
  title: {
    default: "VGS Global - Study Abroad Experts | Beyond Boundaries Beyond Limits",
    template: "%s | VGS Global",
  },
  description:
    "VGS Global is India's trusted study abroad partner. Expert guidance for studying in UK, USA, Canada, Ireland, Germany, France & New Zealand. 98% visa success rate.",
  keywords: [
    "study abroad",
    "international education",
    "visa expertise",
    "overseas education",
    "university admissions",
    "vgs global",
  ],
  authors: [{ name: "VGS Global" }],
  creator: "VGS Global",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vgs.ind.in",
    siteName: "VGS Global",
    title: "VGS Global - Study Abroad Experts",
    description:
      "Transform your future with India's most trusted study abroad experts. Expert guidance for UK, USA, Canada & more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VGS Global - Study Abroad Experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VGS Global - Study Abroad Experts",
    description:
      "Transform your future with India's most trusted study abroad experts.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import SmoothScroll from "@/components/providers/SmoothScroll";
import { Toaster } from "sonner";
import Preloader from "@/components/layout/Preloader";
import { SpeedInsights } from "@vercel/speed-insights/next";

import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-primary-200 selection:text-primary-900" suppressHydrationWarning>
        <Toaster position="bottom-center" />
        <Preloader />
        <SmoothScroll>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </SmoothScroll>
        <SpeedInsights />
      </body>
    </html>
  );
}

