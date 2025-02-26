import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/Toastcontext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maths2Fun - Interactive Math Learning Platform",
  description: "Master mathematics through interactive games and challenges. Learn algebra, calculus, and geometry in a fun, engaging way for all skill levels.",
  keywords: ["math learning", "interactive mathematics", "math games", "algebra practice", "calculus tutorial"],
  authors: [{ name: "Your Name", url: "https://www.maths2fun.com" }],
  openGraph: {
    title: "Maths2Fun - Interactive Math Learning Platform",
    description: "Master mathematics through interactive games and challenges.",
    url: "https://www.maths2fun.com",
    siteName: "Maths2Fun",
    images: [
      {
        url: "/og-image.png", // Replace with your actual OG image path
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: 'zLtGgfAeZHTInXu9ONOVqwRsiz_AdOy1yZPcMNcKDqc',
  }
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link
            rel="icon"
            href="/maths2fun.png"
            type="image/png"
            sizes="512x512"
          />
          <meta name="google-site-verification" content="zLtGgfAeZHTInXu9ONOVqwRsiz_AdOy1yZPcMNcKDqc" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AuthProvider>
          <ToastProvider>
          <Header/>
          <main className="w-full h-full">{children}</main>
          <Footer/>
          </ToastProvider>
          </AuthProvider>
        </body>
      </html>
    
  );
}
