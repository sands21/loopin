'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Thread } from '@/lib/supabase/types'
import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { StaggerContainer, StaggerItem } from '@/app/components/ui/transitions'
import { useRouter } from 'next/navigation'
import VoteButtons from '@/app/components/ui/VoteButtons'

interface ThreadListProps {
  threads: Thread[]
  loading: boolean
}

export default function ThreadList({ threads, loading }: ThreadListProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest')
  const router = useRouter()
  
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
      <div className="space-y-3 sm:space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-pulse">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-200 to-blue-200 rounded-xl"></div>
              <div className="flex-1 space-y-2 sm:space-y-3">
                <div className="h-5 sm:h-6 bg-gray-200 rounded-lg w-3/4"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="flex space-x-3 sm:space-x-4 mt-3 sm:mt-4">
                  <div className="h-3 bg-gray-200 rounded w-12 sm:w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-8 sm:w-12"></div>
                  <div className="h-3 bg-gray-200 rounded w-16 sm:w-20"></div>
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
        className="text-center p-8 sm:p-12 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No discussions yet</h3>
        <p className="text-sm sm:text-base text-gray-500">Be the first to start a conversation!</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">Discussions</h2>
        <div className="flex bg-gray-100 rounded-lg p-1 mx-auto sm:mx-0 w-fit">
          <button
            onClick={() => setSortBy('newest')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
              sortBy === 'newest' 
                ? 'bg-white text-purple-700 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
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
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-3 sm:mb-4 hover:shadow-lg hover:border-purple-200 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-50/30"
                whileHover={{ y: -1, scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  {/* Vote Buttons */}
                  <div className="flex-shrink-0">
                    <VoteButtons
                      threadId={thread.id}
                      upvotes={thread.upvotes || 0}
                      downvotes={thread.downvotes || 0}
                      vote_score={thread.vote_score || 0}
                      className="mr-2"
                    />
                  </div>

                  {/* Thread Avatar/Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <span className="text-white font-bold text-sm sm:text-lg">
                        {thread.title[0]?.toUpperCase() || 'T'}
                      </span>
                    </div>
                  </div>

                  {/* Thread Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-200 line-clamp-2 pr-2">
                        {thread.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 ml-2 flex-shrink-0">
                        {thread.is_pinned && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            📌
                            <span className="hidden sm:inline ml-1">Pinned</span>
                          </span>
                        )}
                        {thread.is_locked && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            🔒
                            <span className="hidden sm:inline ml-1">Locked</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                      {thread.content}
                    </p>

                    {/* Image preview */}
                    {thread.image_url && (
                      <motion.div 
                        className="mt-3 sm:mt-4 relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-2 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <motion.div 
                            className="relative w-full h-32 sm:h-48 rounded-lg overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-shadow duration-300"
                            onClick={(e) => {
                              e.preventDefault()
                              router.push(`/threads/${thread.id}`)
                            }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Image
                              src={thread.image_url}
                              alt="Thread preview"
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            {/* Preview Badge */}
                            <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="flex items-center space-x-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="hidden sm:inline">View post</span>
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Thread Metadata */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 sm:space-x-6 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="font-medium">
                            {thread.post_count}
                            <span className="hidden sm:inline"> {thread.post_count === 1 ? 'reply' : 'replies'}</span>
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="font-medium">
                            {thread.view_count}
                            <span className="hidden sm:inline"> {thread.view_count === 1 ? 'view' : 'views'}</span>
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5v-5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          </svg>
                          <span className="font-medium">
                            {thread.follow_count || 0}
                            <span className="hidden sm:inline"> {(thread.follow_count || 0) === 1 ? 'follower' : 'followers'}</span>
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="font-medium text-purple-600">
                            {thread.user_display_name || 'Anonymous'}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-400 flex-shrink-0">
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