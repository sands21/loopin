import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AuthProvider } from "./components/providers/AuthProvider";
import { MotionProvider } from "./components/providers/MotionProvider";
import { IdentityProvider } from './components/providers/identity-provider'
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider initialSession={session}>
          <MotionProvider>
            <IdentityProvider>
              <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </IdentityProvider>
          </MotionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
