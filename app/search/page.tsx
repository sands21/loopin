'use client'

import { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { PageTransition, FadeIn } from '@/app/components/ui/transitions'
import SearchBar from '@/app/components/ui/SearchBar'
import SearchResults from '@/app/components/ui/SearchResults'
import { searchThreadsAndPosts } from '@/lib/utils'
import { Thread } from '@/lib/supabase/types'

interface SearchPost {
  id: string
  thread_id: string
  content: string
  user_display_name: string
  created_at: string
  thread_title: string
  upvotes: number
  downvotes: number
  vote_score: number
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [threads, setThreads] = useState<Thread[]>([])
  const [posts, setPosts] = useState<SearchPost[]>([])
  const [loading, setLoading] = useState(false)
  const [currentQuery, setCurrentQuery] = useState('')

  // Handle URL query parameter
  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setCurrentQuery(query)
      handleSearch(query)
    }
  }, [searchParams])

  const handleSearch = useCallback(async (query: string) => {
    setCurrentQuery(query)
    
    if (!query.trim()) {
      setThreads([])
      setPosts([])
      return
    }

    setLoading(true)
    try {
      const results = await searchThreadsAndPosts(query)
      setThreads(results.threads)
      setPosts(results.posts as SearchPost[])
    } catch (error) {
      console.error('Search error:', error)
      setThreads([])
      setPosts([])
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <PageTransition>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header */}
          <FadeIn>
            <div className="text-center mb-8 sm:mb-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-xl"
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                Search Discussions
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Find threads and posts across the entire forum using keywords, phrases, or topics.
              </p>
            </div>
          </FadeIn>

          {/* Search Bar */}
          <FadeIn delay={0.2}>
            <div className="mb-8">
              <SearchBar 
                onSearch={handleSearch}
                loading={loading}
                className="max-w-2xl mx-auto"
              />
            </div>
          </FadeIn>

          {/* Search Results */}
          <FadeIn delay={0.3}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <SearchResults
                threads={threads}
                posts={posts}
                query={currentQuery}
                loading={loading}
              />
            </div>
          </FadeIn>
        </div>
      </PageTransition>
    </div>
  )
} 