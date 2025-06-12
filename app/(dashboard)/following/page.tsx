'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageTransition, FadeIn } from '@/app/components/ui/transitions'
import { getFollowedThreads } from '@/lib/utils'
import { Thread } from '@/lib/supabase/types'
import ThreadList from '@/app/components/threads/thread-list'
import { useUser } from '@/app/hooks/useUser'
import { useRouter } from 'next/navigation'

export default function FollowingPage() {
  const { user } = useUser()
  const router = useRouter()
  const [followedThreads, setFollowedThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    async function fetchFollowedThreads() {
      try {
        setLoading(true)
        const threads = await getFollowedThreads()
        setFollowedThreads(threads as unknown as Thread[])
      } catch (err) {
        setError('Failed to load followed threads')
        console.error('Error fetching followed threads:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFollowedThreads()
  }, [user, router])

  if (!user) {
    return null // Redirecting to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <PageTransition>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-xl"
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                </svg>
              </motion.div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                Followed Threads
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Keep track of discussions you&apos;re interested in and never miss important updates.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Your Followed Threads ({followedThreads.length})
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Threads are sorted by latest activity</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-700">{error}</span>
                  </div>
                </div>
              )}

              <ThreadList threads={followedThreads} loading={loading} />

              {!loading && followedThreads.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No followed threads yet</h3>
                  <p className="text-gray-500 mb-4">Start following threads to keep track of discussions you&apos;re interested in.</p>
                  <motion.button
                    onClick={() => router.push('/threads')}
                    className="btn btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Browse Threads
                  </motion.button>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </PageTransition>
    </div>
  )
} 