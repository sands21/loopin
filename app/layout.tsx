import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AuthProvider } from "./components/providers/AuthProvider";
import { MotionProvider } from "./components/providers/MotionProvider";
import { IdentityProvider } from "./components/providers/identity-provider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
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
  title: "Loopin - Modern Discussion Forum",
  description: "A beautiful discussion forum built with Next.js and Supabase",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabaseClient();

  // Validate user on server for security
  await supabase.auth.getUser();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-gradient-to-br from-gray-50 via-white to-purple-50`}
      >
        <AuthProvider initialSession={null}>
          <MotionProvider>
            <IdentityProvider>
              <div className="min-h-screen">
                <Header />
                <main>{children}</main>
                <Footer />
              </div>
            </IdentityProvider>
          </MotionProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
