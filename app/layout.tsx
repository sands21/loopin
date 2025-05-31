import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthProvider } from "./components/providers/AuthProvider";
import { MotionProvider } from "./components/providers/MotionProvider";
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
  title: "Loopin - Discussion Forum",
  description: "A modern discussion forum built with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient({ cookies });
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
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
