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
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 bg-grid-gray-100 opacity-30" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/5 to-blue-600/5" />
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-purple-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-blue-200 rounded-full blur-lg opacity-40 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-8 h-8 bg-green-200 rounded-full blur-md opacity-50 animate-pulse"></div>
          <div className="absolute top-40 right-40 w-6 h-6 bg-orange-200 rounded-full blur-sm opacity-60"></div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 pb-32 sm:pb-40 md:pb-32">
            <div className="text-center max-w-5xl mx-auto">
              
              {/* Main Heading with Visual Enhancement */}
              <FadeIn>
                <div className="relative mb-8">
                  <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight">
                    Welcome to{" "}
                    <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent relative">
                      Loopin
                      {/* Decorative dot */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-ping opacity-75"></div>
                    </span>
                  </h1>
                  
                  {/* Subtitle badge instead of long text */}
                  <div className="mt-6 inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-lg font-semibold text-gray-800">Discussion Forum</span>
                      <div className="w-px h-4 bg-gray-300"></div>
                      <span className="text-sm text-gray-600">Live & Secure</span>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Quick Stats Grid - Visual instead of text */}
              <FadeIn delay={0.1}>
                <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-12">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl mx-auto mb-2 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-2-2V10a2 2 0 012-2h8z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">1K+</div>
                    <div className="text-xs text-gray-600">Discussions</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl mx-auto mb-2 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">5K+</div>
                    <div className="text-xs text-gray-600">Members</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl mx-auto mb-2 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-xs text-gray-600">Active</div>
                  </div>
                </div>
              </FadeIn>

              {/* Action Buttons */}
              <FadeIn delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 sm:mb-20 md:mb-12">
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
                      <Link href="/login" className="bg-white text-gray-700 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-400 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all font-semibold">
                        Sign In
                      </Link>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Scroll Cue */}
          <FadeIn delay={0.3}>
            <div className="absolute bottom-6 sm:bottom-8 md:bottom-8 left-1/2 transform -translate-x-1/2">
              <button 
                onClick={() => {
                  document.getElementById('features-section')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
                className="group cursor-pointer"
              >
                {/* Glass morphism button */}
                <div className="relative">
                  {/* Main button */}
                  <div className="relative bg-white/80 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-white/90 group-hover:scale-105">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
                        Scroll to explore
                      </span>
                      <div className="relative">
                        {/* Arrow with enhanced animation */}
                        <div className="animate-bounce group-hover:animate-pulse">
                          <svg 
                            className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors transform group-hover:translate-y-0.5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                        
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Features Section */}
        <div id="features-section" className="py-24 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Loopin?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built for modern communities with powerful features and beautiful design.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
              <FadeIn delay={0.3}>
                <div className="group relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 h-full flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Rich Discussions</h3>
                    <p className="text-gray-600 text-center leading-relaxed flex-grow">
                      Create engaging threads, share ideas, and participate in meaningful conversations with a vibrant community.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="group relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 h-full flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Anonymous Posts</h3>
                    <p className="text-gray-600 text-center leading-relaxed flex-grow">
                      Share sensitive thoughts safely with anonymous posting. Your privacy and security are our priority.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="group relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 h-full flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Media Sharing</h3>
                    <p className="text-gray-600 text-center leading-relaxed flex-grow">
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
