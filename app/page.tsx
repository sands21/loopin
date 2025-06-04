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
  ScrollStaggerContainer
} from "@/app/components/ui/transitions";

export default function Home() {
  const { user, isLoading } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <StaggerContainer>
        {/* Hero Section */}
        <StaggerItem>
          <div className="relative overflow-hidden">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 bg-grid-gray-100 opacity-30" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/5 to-blue-600/5" />
            
            {/* Floating Elements with enhanced animations */}
            <FadeIn delay={0.8}>
              <div className="absolute top-20 left-10 w-16 h-16 bg-purple-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
            </FadeIn>
            <FadeIn delay={1.0}>
              <div className="absolute top-32 right-20 w-12 h-12 bg-blue-200 rounded-full blur-lg opacity-40 animate-bounce"></div>
            </FadeIn>
            <FadeIn delay={1.2}>
              <div className="absolute bottom-40 left-20 w-8 h-8 bg-green-200 rounded-full blur-md opacity-50 animate-pulse"></div>
            </FadeIn>
            <FadeIn delay={1.4}>
              <div className="absolute top-40 right-40 w-6 h-6 bg-orange-200 rounded-full blur-sm opacity-60"></div>
            </FadeIn>
            
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 pb-28 sm:pb-32 md:pb-36 lg:pb-32">
              <div className="text-center max-w-5xl mx-auto">
                
                {/* Main Heading with enhanced staggered animation */}
                <StaggerItem>
                  <div className="relative mb-8">
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight">
                      Welcome to{" "}
                      <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent relative">
                        Loopin
                        {/* Decorative dot with enhanced animation */}
                        <FadeIn delay={0.8}>
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-ping opacity-75"></div>
                        </FadeIn>
                      </span>
                    </h1>
                    
                    {/* Tagline with staggered appearance */}
                    <StaggerItem>
                      <p className="mt-6 text-xl sm:text-2xl text-gray-600 font-medium">
                      A safe space for your hot takes and bad ideas
                      </p>
                    </StaggerItem>
                    
                    {/* Subtitle badge with enhanced animation */}
                    <StaggerItem>
                      <div className="mt-6 inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/30">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-lg font-semibold text-gray-800">Discussion Forum</span>
                          <div className="w-px h-4 bg-gray-300"></div>
                          <span className="text-sm text-gray-600">Live & Secure</span>
                        </div>
                      </div>
                    </StaggerItem>
                  </div>
                </StaggerItem>

                {/* Platform Values Grid with enhanced staggered animation */}
                <StaggerItem>
                  <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-12">
                    <FadeIn delay={0.4}>
                      <div className="text-center group cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl mx-auto mb-2 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">Free</div>
                        <div className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Forever</div>
                      </div>
                    </FadeIn>
                    
                    <FadeIn delay={0.5}>
                      <div className="text-center group cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl mx-auto mb-2 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
                          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4H4a1 1 0 00-1 1v10a1 1 0 001 1h3M7 4v10M17 4h3a1 1 0 011 1v10a1 1 0 01-1 1h-3M17 4v10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0H7" />
                          </svg>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">Open</div>
                        <div className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors duration-300">No Censorship</div>
                      </div>
                    </FadeIn>
                    
                    <FadeIn delay={0.6}>
                      <div className="text-center group cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl mx-auto mb-2 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
                          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Fresh</div>
                        <div className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Experience</div>
                      </div>
                    </FadeIn>
                  </div>
                </StaggerItem>

                {/* Action Buttons with enhanced animation */}
                <StaggerItem>
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
                </StaggerItem>
              </div>
            </div>

            {/* Scroll Cue with enhanced animation */}
            <FadeIn delay={0.8}>
              <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-16 left-1/2 transform -translate-x-1/2">
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
                    <div className="relative bg-white/80 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-white/90 group-hover:scale-105">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
                          Scroll to explore
                        </span>
                        <div className="relative">
                          {/* Arrow with enhanced animation */}
                          <div className="animate-bounce group-hover:animate-pulse">
                            <svg 
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-purple-600 transition-colors transform group-hover:translate-y-0.5" 
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
        </StaggerItem>

        {/* Features Section with scroll animations */}
        <ScrollFadeIn>
          <div id="features-section" className="py-24 bg-white/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollSlideIn>
                <div className="text-center mb-16">
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                    Why Choose Loopin?
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Built for modern communities with powerful features and beautiful design.
                  </p>
                </div>
              </ScrollSlideIn>

              <ScrollStaggerContainer>
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
                  <StaggerItem>
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
                  </StaggerItem>

                  <StaggerItem>
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
                  </StaggerItem>

                  <StaggerItem>
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
                  </StaggerItem>
                </div>
              </ScrollStaggerContainer>
            </div>
          </div>
        </ScrollFadeIn>

        {/* Call to Action with scroll animation */}
        {!user && (
          <ScrollScaleIn>
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
                    We&apos;re not your typical forum. Here&apos;s what you can expect from the Loopin experience.
                  </p>
                </div>
              </ScrollSlideIn>

              <ScrollStaggerContainer>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                  <StaggerItem>
                    <div className="group relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity" />
                      <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 h-full flex flex-col">
                        <div className="flex items-start space-x-4 flex-grow">
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">No Algorithm Drama</h3>
                            <p className="text-gray-600 leading-relaxed">
                              Your posts aren&apos;t fighting for attention in a rigged feed. Every thread gets seen, every voice gets heard. It&apos;s refreshingly... human.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="group relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity" />
                      <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 h-full flex flex-col">
                        <div className="flex items-start space-x-4 flex-grow">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Perfectly Imperfect</h3>
                            <p className="text-gray-600 leading-relaxed">
                              We embrace the messy, unpolished thoughts. Those 3am shower thoughts? That controversial opinion? Bring it on. Growth happens in the grey areas.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="group relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity" />
                      <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 h-full flex flex-col">
                        <div className="flex items-start space-x-4 flex-grow">
                          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Built by Humans</h3>
                            <p className="text-gray-600 leading-relaxed">
                              No corporate overlords, no data harvesting, no dark patterns. Just a simple place to connect, built by someone who missed the early internet vibes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="group relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity" />
                      <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 h-full flex flex-col">
                        <div className="flex items-start space-x-4 flex-grow">
                          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Chaos Welcome</h3>
                            <p className="text-gray-600 leading-relaxed">
                              Sometimes the best conversations start with &ldquo;This might be stupid, but...&rdquo; We&apos;re here for it. The weird, the wonderful, the wildly off-topic.
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
                          <div className="text-2xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">🎭</div>
                          <div className="text-sm font-medium text-gray-900">Anonymous Mode</div>
                          <div className="text-xs text-gray-500">For when you need to be real</div>
                        </div>
                        <div className="group">
                          <div className="text-2xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">🚫</div>
                          <div className="text-sm font-medium text-gray-900">Zero Tracking</div>
                          <div className="text-xs text-gray-500">Your data stays yours</div>
                        </div>
                        <div className="group">
                          <div className="text-2xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">💡</div>
                          <div className="text-sm font-medium text-gray-900">Open Source Spirit</div>
                          <div className="text-xs text-gray-500">Transparency first</div>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 italic">
                          &ldquo;Finally, a place where I can share my half-baked theories without judgment.&rdquo;
                        </p>
                        <p className="text-xs text-gray-400 mt-2">- Literally every user (probably)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollSlideIn>
            </div>
          </div>
        </ScrollFadeIn>
      </StaggerContainer>
    </div>
  );
}
