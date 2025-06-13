"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/app/hooks/useUser";
import { supabase } from "@/lib/supabase/client";
import AnonymousToggle from "./ui/anonymous-toggle";
import Avatar from "./ui/avatar";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoading, profile } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
    setIsMobileMenuOpen(false);
  };

  const getUserDisplayName = () => {
    return profile?.display_name || user?.email || 'User';
  };



  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden">
              <Image
                src="/logo.png"
                alt="Loopin Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/search"
              className="relative text-gray-700 hover:text-gray-900 transition-colors text-sm font-semibold px-4 py-2 group"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="relative py-2 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </motion.span>
            </Link>
            {user && <AnonymousToggle />}
            
            {isLoading ? (
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="relative text-gray-700 hover:text-gray-900 transition-colors text-sm font-semibold px-4 py-2 group"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="relative py-2"
                  >
                    Dashboard
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  </motion.span>
                </Link>
                <div className="flex items-center space-x-3">
                  <Link href="/profile">
                    <Avatar
                      src={profile?.avatar_url}
                      name={getUserDisplayName()}
                      size="md"
                      className="shadow-lg hover:shadow-xl transition-shadow"
                    />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-gray-700 hover:text-gray-900 text-sm font-medium px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                  Login
                </Link>
                <Link href="/register" className="btn btn-primary text-sm font-medium px-4 py-2 shadow-lg hover:shadow-xl transition-shadow">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                className="w-5 h-0.5 bg-gray-600 block"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 2 }
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-gray-600 block mt-1"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-gray-600 block mt-1"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -2 }
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Anonymous Toggle for Mobile - Only show if user is logged in */}
              {user && (
                <div className="py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Posting Mode
                    </span>
                    <AnonymousToggle />
                  </div>
                </div>
              )}

              {/* Mobile User Menu */}
              <div className="pt-4 border-t border-gray-200">
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                  </div>
                ) : user ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar
                        src={profile?.avatar_url}
                        name={getUserDisplayName()}
                        size="md"
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
                        href="/search"
                        className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-center flex items-center justify-center space-x-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>Search</span>
                      </Link>
                      <Link
                        href="/dashboard"
                        className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-4 py-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link
                      href="/login"
                      className="text-gray-700 hover:text-gray-900 text-sm font-medium px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="btn btn-primary text-sm font-medium px-4 py-3 text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 