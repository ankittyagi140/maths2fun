import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/Toastcontext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maths2fun.com'),
  title: "Maths2Fun - Interactive Math Learning Platform",
  description: "Boost your math skills with interactive games and fun challenges! Learn algebra, calculus, and geometry in an engaging and exciting way at Maths2Fun.",
  keywords: [
    "math learning",
    "interactive mathematics",
    "math games for kids",
    "online algebra practice",
    "calculus lessons",
    "geometry puzzles",
    "math challenges for students",
    "fun math quizzes",
    "online games for kids",
    "maths is fun",
    "maths learning platform",
    "interactive math learning",
    "math riddles",
    "math puzzles",
    "math games",
    "math fun riddles"
  ],
  authors: [{ name: "Your Name", url: "https://www.maths2fun.com" }],
  openGraph: {
    title: "Maths2Fun - Interactive Math Learning Platform",
    description: "Boost your math skills with interactive games and fun challenges!",
    url: "https://www.maths2fun.com",
    siteName: "Maths2Fun",
    images: [
      {
        url: "/maths2fun.png",
        width: 1200,
        height: 630,
        alt: "Maths2Fun - Interactive Math Learning Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@maths2fun",
    title: "Maths2Fun - Interactive Math Learning Platform",
    description: "Boost your math skills with interactive games and fun challenges!",
    images: ["/maths2fun.png"],
  },
  alternates: {
    canonical: "https://www.maths2fun.com",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "zLtGgfAeZHTInXu9ONOVqwRsiz_AdOy1yZPcMNcKDqc",
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/maths2fun.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/maths2fun.png" sizes="180x180" />
        <meta name="google-site-verification" content="zLtGgfAeZHTInXu9ONOVqwRsiz_AdOy1yZPcMNcKDqc" />
        <link rel="manifest" href="/manifest.json" />
        <Script 
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6406747327641731"
          crossOrigin="anonymous"/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Google Analytics */}
          <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-2W0LMES3Y7"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2W0LMES3Y7');
            `,
          }}
        />
        <ToastProvider>
          <AuthProvider>
            <Header />
            <main className="w-full min-h-screen">{children}</main>
            <Footer />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
