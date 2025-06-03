'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Thread } from '@/lib/supabase/types'
import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { StaggerContainer, StaggerItem } from '@/app/components/ui/transitions'

interface ThreadListProps {
  threads: Thread[]
  loading: boolean
}

export default function ThreadList({ threads, loading }: ThreadListProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest')
  
  // Apply sorting
  const sortedThreads = [...threads].sort((a, b) => {
    // Always prioritize pinned threads first
    if (a.is_pinned && !b.is_pinned) return -1
    if (!a.is_pinned && b.is_pinned) return 1
    
    // If both have same pinned status, apply secondary sorting
    if (sortBy === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    } else {
      // Sort by view count for 'popular'
      return b.view_count - a.view_count
    }
  })

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-blue-200 rounded-xl"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="flex space-x-4 mt-4">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (sortedThreads.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No discussions yet</h3>
        <p className="text-gray-500">Be the first to start a conversation!</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Discussions</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setSortBy('newest')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              sortBy === 'newest' 
                ? 'bg-white text-purple-700 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              sortBy === 'popular' 
                ? 'bg-white text-purple-700 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Popular
          </button>
        </div>
      </div>

      {/* Thread List */}
      <StaggerContainer>
        {sortedThreads.map((thread) => (
          <StaggerItem key={thread.id}>
            <Link href={`/threads/${thread.id}`} className="block group">
              <motion.div
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4 hover:shadow-lg hover:border-purple-200 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-50/30"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start space-x-4">
                  {/* Thread Avatar/Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <span className="text-white font-bold text-lg">
                        {thread.title[0]?.toUpperCase() || 'T'}
                      </span>
                    </div>
                  </div>

                  {/* Thread Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-200 line-clamp-2">
                        {thread.title}
                      </h3>
                      <div className="flex items-center space-x-2 ml-4">
                        {thread.is_pinned && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            📌 Pinned
                          </span>
                        )}
                        {thread.is_locked && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            🔒 Locked
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {thread.content}
                    </p>

                    {/* Thread Metadata */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="font-medium">
                            {thread.post_count} {thread.post_count === 1 ? 'reply' : 'replies'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="font-medium">{thread.view_count} views</span>
                        </div>
                        {thread.user_email && (
                          <div className="flex items-center space-x-1">
                            <div className="w-4 h-4 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                {(thread.user_display_name || thread.user_email)[0]?.toUpperCase()}
                              </span>
                            </div>
                            <span>{thread.user_display_name || thread.user_email}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
} 