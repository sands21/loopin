"use client";

import Link from "next/link";
import { useUser } from "@/app/hooks/useUser";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScrollFadeIn,
  ScrollSlideIn,
  ScrollScaleIn,
  ScrollStaggerContainer,
} from "@/app/components/ui/transitions";

export default function Home() {
  const { user, isLoading } = useUser();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Organic Blob Shapes */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/3 right-20 w-48 h-48 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-br from-green-400/15 to-teal-400/15 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "2s" }}
        />

        {/* Geometric Shapes */}
        <div
          className="absolute top-1/4 left-1/3 w-12 h-12 bg-purple-500/30 rounded-lg rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-8 h-8 bg-orange-500/40 rounded-full animate-ping"
          style={{ animationDelay: "3s" }}
        />
        <div className="absolute bottom-1/3 left-1/2 w-16 h-16 bg-blue-500/25 rounded-xl rotate-12 animate-pulse" />

        {/* Decorative Dots */}
        <div className="absolute top-20 right-1/4 flex space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          <div
            className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <div className="absolute bottom-32 left-10 flex flex-col space-y-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" />
          <div
            className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          />
          <div
            className="w-3 h-3 bg-red-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.6s" }}
          />
        </div>
      </div>

      <StaggerContainer>
        {/* Hero Section */}
        <StaggerItem>
          <div className="relative overflow-hidden">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 bg-grid-gray-100 opacity-30" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/10 to-blue-600/10" />

            {/* Enhanced Floating Elements with more vibrant colors */}
            <FadeIn delay={0.8}>
              <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-70 animate-float"></div>
            </FadeIn>
            <FadeIn delay={1.0}>
              <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-lg opacity-60 animate-float-delayed"></div>
            </FadeIn>
            <FadeIn delay={1.2}>
              <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-full blur-md opacity-70 animate-float"></div>
            </FadeIn>
            <FadeIn delay={1.4}>
              <div className="absolute top-40 right-40 w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-sm opacity-80 animate-float-delayed"></div>
            </FadeIn>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 mt-20 py-12 lg:py-20 pb-8 sm:pb-10 md:pb-12 lg:pb-14">
              <div className="text-center max-w-5xl mx-auto">
                {/* Main Heading with enhanced staggered animation and colored highlights */}
                <StaggerItem>
                  <div className="relative mb-8">
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight">
                      <span className="inline-block">Welcome to</span>{" "}
                      <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent relative inline-block">
                        <span className="italic font-black">Loopin</span>
                        {/* Enhanced decorative elements */}
                        <FadeIn delay={1.2}>
                          <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-ping opacity-75"></div>
                        </FadeIn>
                        <FadeIn delay={1.5}>
                          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                        </FadeIn>
                      </span>
                    </h1>

                    {/* Enhanced tagline with colored highlights */}
                    <StaggerItem>
                      <p className="mt-6 text-xl sm:text-2xl text-gray-600 font-medium">
                        A{" "}
                        <span className="text-purple-600 font-bold">
                          safe space
                        </span>{" "}
                        for your{" "}
                        <span className="text-orange-500 font-bold italic">
                          hot takes
                        </span>{" "}
                        and{" "}
                        <span className="text-blue-600 font-bold">
                          bad ideas
                        </span>
                      </p>
                    </StaggerItem>

                    {/* Enhanced subtitle badge */}
                    <StaggerItem>
                      <div className="mt-6 inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-white/40">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-teal-400 rounded-full animate-pulse"></div>
                          <span className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Discussion Forum
                          </span>
                          <div className="w-px h-4 bg-gray-300"></div>
                          <span className="text-sm text-purple-600 font-semibold">
                            Live & Secure
                          </span>
                        </div>
                      </div>
                    </StaggerItem>
                  </div>
                </StaggerItem>

                {/* Enhanced Platform Values Grid with vibrant colored backgrounds */}
                <StaggerItem>
                  <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-12">
                    <FadeIn delay={0.4}>
                      <div className="text-center group cursor-pointer">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-purple-500/30 transition-all duration-300 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <svg
                            className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300 relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                          Free
                        </div>
                        <div className="text-xs text-gray-600 group-hover:text-purple-500 transition-colors duration-300 font-medium">
                          Forever
                        </div>
                      </div>
                    </FadeIn>

                    <FadeIn delay={0.5}>
                      <div className="text-center group cursor-pointer">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-green-500/30 transition-all duration-300 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <svg
                            className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300 relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4H4a1 1 0 00-1 1v10a1 1 0 001 1h3M7 4v10M17 4h3a1 1 0 011 1v10a1 1 0 01-1 1h-3M17 4v10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0H7"
                            />
                          </svg>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                          Open
                        </div>
                        <div className="text-xs text-gray-600 group-hover:text-green-500 transition-colors duration-300 font-medium">
                          No Censorship
                        </div>
                      </div>
                    </FadeIn>

                    <FadeIn delay={0.6}>
                      <div className="text-center group cursor-pointer">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-orange-500/30 transition-all duration-300 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <svg
                            className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300 relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                          </svg>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                          Fresh
                        </div>
                        <div className="text-xs text-gray-600 group-hover:text-orange-500 transition-colors duration-300 font-medium">
                          Experience
                        </div>
                      </div>
                    </FadeIn>
                  </div>
                </StaggerItem>

                {/* Enhanced Action Buttons */}
                <StaggerItem>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 sm:mb-20 md:mb-12">
                    {isLoading ? (
                      <div className="flex gap-6 justify-center">
                        <div className="h-14 w-40 bg-gray-200 rounded-xl animate-pulse" />
                        <div className="h-14 w-40 bg-gray-200 rounded-xl animate-pulse" />
                      </div>
                    ) : user ? (
                      <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                          href="/threads"
                          className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-bold"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative flex items-center justify-center">
                            Browse Threads
                            <svg
                              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </span>
                        </Link>
                        <Link
                          href="/dashboard"
                          className="group bg-white text-purple-700 hover:text-purple-800 border-2 border-purple-200 hover:border-purple-300 text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-bold hover:bg-purple-50"
                        >
                          Dashboard
                        </Link>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                          href="/register"
                          className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-bold"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative flex items-center justify-center">
                            Get Started Free
                            <svg
                              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </span>
                        </Link>
                        <Link
                          href="/login"
                          className="group bg-white text-gray-700 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-400 text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-bold hover:bg-gray-50"
                        >
                          Sign In
                        </Link>
                      </div>
                    )}
                  </div>
                </StaggerItem>

                {/* Scroll Cue Button - moved inside flow */}
                <FadeIn delay={1.0}>
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => {
                        document
                          .getElementById("features-section")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="group cursor-pointer"
                    >
                      <div className="relative bg-white/90 backdrop-blur-md border border-white/40 rounded-full px-6 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:bg-white group-hover:scale-105">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-bold text-gray-700 group-hover:text-purple-600 transition-colors">
                            Scroll to explore
                          </span>
                          <div className="relative">
                            <div className="animate-bounce group-hover:animate-pulse">
                              <svg
                                className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors transform group-hover:translate-y-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                              </svg>
                            </div>
                            <div className="absolute inset-0 rounded-full bg-purple-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Enhanced Features Section with floating elements */}
            <ScrollFadeIn>
              <div
                id="features-section"
                className="py-24 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 relative overflow-hidden"
              >
                {/* Floating shapes around features */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse" />
                <div
                  className="absolute bottom-20 right-20 w-24 h-24 bg-orange-400/20 rounded-full blur-xl animate-bounce"
                  style={{ animationDuration: "3s" }}
                />
                <div
                  className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-400/20 rounded-full blur-lg animate-pulse"
                  style={{ animationDelay: "1s" }}
                />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                  <ScrollSlideIn>
                    <div className="text-center mb-16">
                      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                        Why Choose{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          Loopin
                        </span>
                        ?
                      </h2>
                      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Built for modern communities with{" "}
                        <span className="text-purple-600 font-semibold">
                          powerful features
                        </span>{" "}
                        and{" "}
                        <span className="text-orange-500 font-semibold">
                          beautiful design
                        </span>
                        .
                      </p>
                    </div>
                  </ScrollSlideIn>

                  <ScrollStaggerContainer>
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
                      <StaggerItem>
                        <div className="group relative h-full">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                          <div className="relative bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100 h-full flex flex-col group-hover:-translate-y-2">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                              <svg
                                className="w-10 h-10 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-purple-700 transition-colors">
                              Rich Discussions
                            </h3>
                            <p className="text-gray-600 text-center leading-relaxed flex-grow">
                              Create engaging threads, share ideas, and
                              participate in meaningful conversations with a
                              vibrant community.
                            </p>
                            <div className="mt-4 text-center">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                Interactive
                              </span>
                            </div>
                          </div>
                        </div>
                      </StaggerItem>

                      <StaggerItem>
                        <div className="group relative h-full">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                          <div className="relative bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-green-100 h-full flex flex-col group-hover:-translate-y-2">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                              <svg
                                className="w-10 h-10 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-green-700 transition-colors">
                              Anonymous Posts
                            </h3>
                            <p className="text-gray-600 text-center leading-relaxed flex-grow">
                              Share sensitive thoughts safely with anonymous
                              posting. Your privacy and security are our
                              priority.
                            </p>
                            <div className="mt-4 text-center">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                Private & Secure
                              </span>
                            </div>
                          </div>
                        </div>
                      </StaggerItem>

                      <StaggerItem>
                        <div className="group relative h-full">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                          <div className="relative bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100 h-full flex flex-col group-hover:-translate-y-2">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                              <svg
                                className="w-10 h-10 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-orange-700 transition-colors">
                              Media Sharing
                            </h3>
                            <p className="text-gray-600 text-center leading-relaxed flex-grow">
                              Enhance discussions with images and media. Make
                              your posts more engaging and visually appealing.
                            </p>
                            <div className="mt-4 text-center">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                                Visual & Rich
                              </span>
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                    </div>
                  </ScrollStaggerContainer>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Enhanced Call to Action with floating elements */}
            {!user && (
              <ScrollScaleIn>
                <div className="py-24 relative overflow-hidden">
                  {/* Floating elements around CTA */}
                  <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-400/30 rounded-full blur-lg animate-float" />
                  <div className="absolute bottom-20 right-20 w-20 h-20 bg-pink-400/30 rounded-full blur-xl animate-float-delayed" />
                  <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-blue-400/30 rounded-full blur-md animate-pulse" />
                  <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-green-400/40 rounded-full animate-bounce" />

                  <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 rounded-3xl blur-2xl opacity-25" />
                      <div className="relative bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-3xl p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
                        {/* Decorative elements inside CTA */}
                        <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                        <div className="absolute bottom-10 left-10 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg" />

                        <div className="relative">
                          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            Ready to join the{" "}
                            <span className="italic text-yellow-300">
                              conversation
                            </span>
                            ?
                          </h2>
                          <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Create your account today and become part of our
                            growing community of{" "}
                            <span className="text-yellow-300 font-semibold">
                              thinkers
                            </span>
                            ,
                            <span className="text-pink-300 font-semibold">
                              {" "}
                              creators
                            </span>
                            , and{" "}
                            <span className="text-blue-300 font-semibold">
                              conversation starters
                            </span>
                            . It&apos;s completely free!
                          </p>
                          <Link
                            href="/register"
                            className="group inline-flex items-center bg-white text-purple-600 hover:bg-yellow-50 font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                            <span className="relative">Sign Up Free</span>
                            <svg
                              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollScaleIn>
            )}

            {/* Platform Personality Section with scroll animation */}
            <ScrollFadeIn>
              <div className="py-16 bg-gradient-to-br from-gray-50 via-white to-purple-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <ScrollSlideIn>
                    <div className="text-center mb-12">
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        What Makes Us Different
                      </h2>
                      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We&apos;re not your typical forum. Here&apos;s what you
                        can expect from the Loopin experience.
                      </p>
                    </div>
                  </ScrollSlideIn>

                  <ScrollStaggerContainer>
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                      <StaggerItem>
                        <div className="group relative h-full">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity" />
                          <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500 h-full flex flex-col group-hover:-translate-y-1">
                            <div className="flex items-start space-x-4 flex-grow">
                              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                <svg
                                  className="w-8 h-8 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                  />
                                </svg>
                              </div>
                              <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                                  No Algorithm Drama
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                  Your posts aren&apos;t fighting for attention
                                  in a rigged feed. Every thread gets seen,
                                  every voice gets heard. It&apos;s
                                  refreshingly...{" "}
                                  <span className="text-purple-600 font-semibold">
                                    human
                                  </span>
                                  .
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </StaggerItem>

                      <StaggerItem>
                        <div className="group relative h-full">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity" />
                          <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 h-full flex flex-col group-hover:-translate-y-1">
                            <div className="flex items-start space-x-4 flex-grow">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                <svg
                                  className="w-8 h-8 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                                  Perfectly Imperfect
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                  We embrace the messy, unpolished thoughts.
                                  Those
                                  <span className="text-blue-600 font-semibold">
                                    {" "}
                                    3am shower thoughts
                                  </span>
                                  ? That{" "}
                                  <span className="text-cyan-600 font-semibold">
                                    controversial opinion
                                  </span>
                                  ? Bring it on. Growth happens in the grey
                                  areas.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </StaggerItem>

                      <StaggerItem>
                        <div className="group relative h-full">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity" />
                          <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 h-full flex flex-col group-hover:-translate-y-1">
                            <div className="flex items-start space-x-4 flex-grow">
                              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                <svg
                                  className="w-8 h-8 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                  />
                                </svg>
                              </div>
                              <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                                  Built by Humans
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                  No{" "}
                                  <span className="text-red-600 font-semibold">
                                    corporate overlords
                                  </span>
                                  , no{" "}
                                  <span className="text-red-600 font-semibold">
                                    data harvesting
                                  </span>
                                  , no dark patterns. Just a simple place to
                                  connect, built by someone who missed the{" "}
                                  <span className="text-green-600 font-semibold">
                                    early internet vibes
                                  </span>
                                  .
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </StaggerItem>

                      <StaggerItem>
                        <div className="group relative h-full">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity" />
                          <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 h-full flex flex-col group-hover:-translate-y-1">
                            <div className="flex items-start space-x-4 flex-grow">
                              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                <svg
                                  className="w-8 h-8 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                              </div>
                              <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-700 transition-colors">
                                  Chaos Welcome
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                  Sometimes the best conversations start with
                                  <span className="text-orange-600 font-semibold">
                                    {" "}
                                    &ldquo;This might be stupid, but...&rdquo;
                                  </span>
                                  We&apos;re here for it. The{" "}
                                  <span className="text-red-600 font-semibold">
                                    weird
                                  </span>
                                  , the{" "}
                                  <span className="text-yellow-600 font-semibold">
                                    wonderful
                                  </span>
                                  , the{" "}
                                  <span className="text-orange-600 font-semibold">
                                    wildly off-topic
                                  </span>
                                  .
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                    </div>
                  </ScrollStaggerContainer>

                  {/* Fun Community Stats */}
                  <ScrollSlideIn>
                    <div className="mt-16 text-center">
                      <div className="relative max-w-4xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-3xl blur-xl" />
                        <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-lg">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                            <div className="group">
                              <div className="text-2xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                                🎭
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                Anonymous Mode
                              </div>
                              <div className="text-xs text-gray-500">
                                For when you need to be real
                              </div>
                            </div>
                            <div className="group">
                              <div className="text-2xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                                🚫
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                Zero Tracking
                              </div>
                              <div className="text-xs text-gray-500">
                                Your data stays yours
                              </div>
                            </div>
                            <div className="group">
                              <div className="text-2xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">
                                💡
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                Open Source Spirit
                              </div>
                              <div className="text-xs text-gray-500">
                                Transparency first
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-600 italic">
                              &ldquo;Finally, a place where I can share my
                              half-baked theories without judgment.&rdquo;
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              - Literally every user (probably)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollSlideIn>
                </div>
              </div>
            </ScrollFadeIn>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
