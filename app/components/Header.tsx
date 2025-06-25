"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/app/hooks/useUser";
import { supabase } from "@/lib/supabase/client";
import AnonymousToggle from "./ui/anonymous-toggle";
import Avatar from "./ui/avatar";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user, isLoading, profile } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
    setIsMobileMenuOpen(false);
  };

  const getUserDisplayName = () => {
    return profile?.display_name || user?.email || "User";
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl mx-auto px-4">
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.23, 1, 0.32, 1],
          delay: 0.1,
        }}
        className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-full shadow-2xl shadow-black/10 hover:shadow-black/20 hover:bg-white/50 transition-all duration-300"
        suppressHydrationWarning
      >
        <div className="px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden"
              >
                <Image
                  src="/logo.png"
                  alt="Loopin Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                  priority
                />
              </motion.div>
              <motion.span
                whileHover={{ x: 2 }}
                className="hidden sm:block text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              >
                Loopin
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div
              className="hidden md:flex items-center space-x-1"
              suppressHydrationWarning
            >
              <Link
                href="/search"
                className="relative text-gray-700 hover:text-gray-900 transition-colors text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/50 group"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="relative flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span>Search</span>
                </motion.span>
              </Link>

              {isMounted && user && (
                <div className="px-2">
                  <AnonymousToggle />
                </div>
              )}

              {!isMounted ? (
                <div className="w-10 h-10 bg-gray-200/80 rounded-full animate-pulse" />
              ) : isLoading ? (
                <div className="w-10 h-10 bg-gray-200/80 rounded-full animate-pulse" />
              ) : user ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/dashboard"
                    className="relative text-gray-700 hover:text-gray-900 transition-colors text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/50 group"
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      Dashboard
                    </motion.span>
                  </Link>
                  <div className="flex items-center space-x-2 pl-2">
                    <Link href="/profile">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Avatar
                          src={profile?.avatar_url}
                          name={getUserDisplayName()}
                          size="md"
                          className="shadow-lg hover:shadow-xl transition-all duration-300 ring-2 ring-white/50"
                        />
                      </motion.div>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-red-600 text-sm font-medium transition-colors px-3 py-1.5 rounded-full hover:bg-red-50/80"
                    >
                      Logout
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-gray-900 text-sm font-medium px-4 py-2 rounded-full hover:bg-white/50 transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                  className="w-5 h-0.5 bg-gray-700 block"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 2 },
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-gray-700 block mt-1"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-gray-700 block mt-1"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -2 },
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && isMounted && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-white/30 bg-white/50 backdrop-blur-2xl rounded-b-3xl mt-2"
            >
              <div className="px-6 py-6 space-y-4">
                {/* Search Link for Mobile */}
                <Link
                  href="/search"
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium px-4 py-3 bg-white/50 rounded-2xl hover:bg-white/70"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span>Search</span>
                </Link>

                {/* Anonymous Toggle for Mobile - Only show if user is logged in */}
                {user && (
                  <div className="flex items-center justify-between px-4 py-3 bg-white/50 rounded-2xl">
                    <span className="text-sm font-medium text-gray-700">
                      Posting Mode
                    </span>
                    <AnonymousToggle />
                  </div>
                )}

                {/* Mobile User Menu */}
                {isLoading ? (
                  <div className="flex items-center space-x-3 px-4 py-3">
                    <div className="w-8 h-8 bg-gray-200/80 rounded-full animate-pulse" />
                    <div className="h-4 bg-gray-200/80 rounded w-20 animate-pulse" />
                  </div>
                ) : user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-white/50 rounded-2xl">
                      <Avatar
                        src={profile?.avatar_url}
                        name={getUserDisplayName()}
                        size="md"
                        className="ring-2 ring-white/50"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-xs text-gray-500">Signed in</p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/dashboard"
                        className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium px-4 py-3 bg-white/50 rounded-2xl hover:bg-white/70 text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium px-4 py-3 bg-white/50 rounded-2xl hover:bg-white/70 text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-4 py-3 bg-red-50/80 rounded-2xl hover:bg-red-100/80 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link
                      href="/login"
                      className="text-gray-700 hover:text-gray-900 text-sm font-medium px-4 py-3 bg-white/50 rounded-2xl hover:bg-white/70 transition-colors text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium px-4 py-3 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
