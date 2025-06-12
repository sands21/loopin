'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Thread } from '@/lib/supabase/types'
import { ChatBubbleLeftIcon, ArrowUpIcon, ArrowDownIcon, UserIcon } from '@heroicons/react/24/outline'

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

interface SearchResultsProps {
  threads: Thread[]
  posts: SearchPost[]
  query: string
  loading: boolean
}

export default function SearchResults({ threads, posts, query, loading }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Start searching</h3>
        <p className="text-gray-500">Enter keywords to search through threads and posts</p>
      </div>
    )
  }

  const totalResults = threads.length + posts.length

  if (totalResults === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-500">
          No threads or posts match <span className="font-medium">&ldquo;{query}&rdquo;</span>
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Search Results for &ldquo;{query}&rdquo;
        </h2>
        <span className="text-sm text-gray-500">
          {totalResults} result{totalResults !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Thread Results */}
      {threads.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-700 flex items-center">
            <ChatBubbleLeftIcon className="w-4 h-4 mr-2" />
            Threads ({threads.length})
          </h3>
          <div className="space-y-3">
            {threads.map((thread, index) => (
              <motion.div
                key={thread.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/threads/${thread.id}`}>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all duration-200 group">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {thread.title}
                      </h4>
                      <div className="flex items-center space-x-3 text-sm text-gray-500 ml-4">
                        <div className="flex items-center space-x-1">
                          <ArrowUpIcon className="w-4 h-4 text-green-500" />
                          <span>{thread.upvotes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ArrowDownIcon className="w-4 h-4 text-red-500" />
                          <span>{thread.downvotes}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {thread.content}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <UserIcon className="w-4 h-4" />
                        <span>{thread.user_display_name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>{thread.post_count} replies</span>
                        <span>{thread.view_count} views</span>
                        <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Post Results */}
      {posts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-700 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Posts ({posts.length})
          </h3>
          <div className="space-y-3">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (threads.length + index) * 0.1 }}
              >
                <Link href={`/threads/${post.thread_id}#post-${post.id}`}>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-sm text-blue-600 font-medium mb-1">
                          From: {post.thread_title}
                        </div>
                        <p className="text-gray-900 line-clamp-3">
                          {post.content}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-500 ml-4">
                        <div className="flex items-center space-x-1">
                          <ArrowUpIcon className="w-4 h-4 text-green-500" />
                          <span>{post.upvotes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ArrowDownIcon className="w-4 h-4 text-red-500" />
                          <span>{post.downvotes}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <UserIcon className="w-4 h-4" />
                        <span>{post.user_display_name}</span>
                      </div>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 