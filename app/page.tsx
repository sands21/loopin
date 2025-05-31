"use client";

import Link from "next/link";
import { useUser } from "@/app/hooks/useUser";
import { FadeIn, StaggerContainer } from "@/app/components/ui/transitions";

export default function Home() {
  const { user, isLoading } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <StaggerContainer>
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-gray-100 opacity-30" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/5 to-blue-600/5" />
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center max-w-5xl mx-auto">
              <FadeIn>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
                  Welcome to{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                    Loopin
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                  A modern discussion forum where ideas meet, conversations flow, 
                  and communities thrive. Join the conversation today.
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  {isLoading ? (
                    <div className="flex gap-6 justify-center">
                      <div className="h-14 w-40 bg-gray-200 rounded-xl animate-pulse" />
                      <div className="h-14 w-40 bg-gray-200 rounded-xl animate-pulse" />
                    </div>
                  ) : user ? (
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                      <Link href="/threads" className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                        Browse Threads
                      </Link>
                      <Link href="/dashboard" className="bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold">
                        Dashboard
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                      <Link href="/register" className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                        Get Started Free
                      </Link>
                      <Link href="/login" className="btn btn-primary-outline text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                        Sign In
                      </Link>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Loopin?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built for modern communities with powerful features and beautiful design.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <FadeIn delay={0.3}>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Rich Discussions</h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Create engaging threads, share ideas, and participate in meaningful conversations with a vibrant community.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Anonymous Posts</h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Share sensitive thoughts safely with anonymous posting. Your privacy and security are our priority.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Media Sharing</h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Enhance discussions with images and media. Make your posts more engaging and visually appealing.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {!user && (
          <FadeIn delay={0.6}>
            <div className="py-24">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-xl opacity-20" />
                  <div className="relative bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-3xl p-12 lg:p-16 text-white shadow-2xl">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to join the conversation?</h2>
                    <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                      Create your account today and become part of our growing community of thinkers, 
                      creators, and conversation starters. It&apos;s completely free!
                    </p>
                    <Link 
                      href="/register" 
                      className="inline-flex items-center bg-white text-purple-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-lg"
                    >
                      Sign Up Free
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Stats Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">1K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">5K+</div>
                <div className="text-gray-600">Discussions</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
                <div className="text-gray-600">Messages</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">99%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </StaggerContainer>
    </div>
  );
}
