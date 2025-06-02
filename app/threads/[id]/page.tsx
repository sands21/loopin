'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Thread } from '@/lib/supabase/types'
import { getPosts } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { PageTransition, FadeIn } from '@/app/components/ui/transitions'
import { useUser } from '@/app/hooks/useUser'
import ThreadModeration from '@/app/components/threads/thread-moderation'
import CommentList from '@/app/components/threads/comment-list'

interface ThreadWithAuthor extends Thread {
  authorName: string
}

interface PostWithAuthor {
  id: string
  thread_id: string
  content: string
  user_id: string
  is_anonymous: boolean
  image_url?: string | null
  created_at: string
  authorName: string
}

export default function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: threadId } = React.use(params)
  const [thread, setThread] = useState<ThreadWithAuthor | null>(null)
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [newPostContent, setNewPostContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [postLoading, setPostLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { user: currentUser, canModerate } = useUser()
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        // Get thread with author info
        const { data: threadData, error: threadError } = await supabase
          .from('threads')
          .select('*')
          .eq('id', threadId)
          .single()

        if (threadError) throw threadError

        if (!threadData) {
          setError('Thread not found')
          setLoading(false)
          return
        }

        // Get thread author's profile
        const { data: threadProfile } = await supabase
          .from('profiles')
          .select('email')
          .eq('id', threadData.user_id)
          .single()

        // Update view count
        await supabase
          .from('threads')
          .update({ view_count: threadData.view_count + 1 })
          .eq('id', threadId)

        // Format the thread data
        setThread({
          ...threadData,
          authorName: threadProfile?.email || 'Unknown',
        })

        // Fetch posts using the utility function
        const postsData = await getPosts(threadId)
        setPosts(postsData)
      } catch (error) {
        console.error('Error fetching thread:', error)
        setError('Failed to load thread data.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [threadId])

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPostContent.trim() || !currentUser) return

    setPostLoading(true)
    setError(null)

    try {
      // Insert the post
      const { error: postError } = await supabase
        .from('posts')
        .insert([
          {
            thread_id: threadId,
            content: newPostContent,
            user_id: currentUser.id,
            is_solution: false
          }
        ])

      if (postError) throw postError

      // Update the thread's post count and last_post_at
      const { error: threadUpdateError } = await supabase
        .from('threads')
        .update({
          post_count: thread ? thread.post_count + 1 : 1,
          last_post_at: new Date().toISOString()
        })
        .eq('id', threadId)

      if (threadUpdateError) throw threadUpdateError

      // Clear the input and refresh the posts
      setNewPostContent('')
      
      // Refetch the posts using the utility function
      const postsData = await getPosts(threadId)
      setPosts(postsData)

    } catch (error) {
      console.error('Error posting reply:', error)
      setError('Failed to post your reply. Please try again.')
    } finally {
      setPostLoading(false)
    }
  }

  const handleThreadUpdate = (updatedThread: Thread) => {
    setThread(prev => prev ? { ...prev, ...updatedThread } : null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading thread...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-200"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </motion.div>
      </div>
    )
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-lg"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Thread Not Found</h3>
          <p className="text-gray-600">The thread you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <PageTransition>
        {/* Header with Back Button */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <FadeIn>
              <motion.button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors group"
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back to discussions</span>
              </motion.button>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Thread Header */}
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <div className="flex items-start space-x-6">
                {/* Thread Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">
                      {thread.title[0]?.toUpperCase() || 'T'}
                    </span>
                  </div>
                </div>

                {/* Thread Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                        {thread.title}
                      </h1>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {thread.authorName[0]?.toUpperCase()}
                            </span>
                          </div>
                          <span>Posted by <span className="font-medium">{thread.authorName}</span></span>
                        </div>
                        <span>•</span>
                        <span>{formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                    
                    {/* Thread Stats and Badges */}
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-50 rounded-xl px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">
                            {thread.view_count} {thread.view_count === 1 ? 'view' : 'views'}
                          </span>
                        </div>
                      </div>
                      
                      {thread.is_pinned && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          📌 Pinned
                        </span>
                      )}
                      
                      {thread.is_locked && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          🔒 Locked
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Thread Content */}
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    {thread.content}
                  </div>

                  {/* Moderation Controls */}
                  {canModerate && thread && (
                    <ThreadModeration thread={thread} onUpdate={handleThreadUpdate} />
                  )}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Replies Section */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Replies ({posts.length})</span>
                </h2>
              </div>
              
              <CommentList posts={posts} />
            </div>
          </FadeIn>

          {/* Reply Form */}
          {currentUser && !thread.is_locked && (
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">
                      {currentUser.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Post a reply</h3>
                    <p className="text-sm text-gray-600">Replying as {currentUser.email}</p>
                  </div>
                </div>
                
                <form onSubmit={handlePostSubmit} className="space-y-6">
                  <div>
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="Share your thoughts on this discussion..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none text-gray-700"
                      disabled={postLoading}
                    />
                  </div>
                  
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-3"
                    >
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{error}</span>
                    </motion.div>
                  )}
                  
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      disabled={postLoading || !newPostContent.trim()}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                      whileHover={{ scale: postLoading ? 1 : 1.02 }}
                      whileTap={{ scale: postLoading ? 1 : 0.98 }}
                    >
                      {postLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Posting...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span>Post Reply</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </FadeIn>
          )}
          
          {/* Locked Thread Message */}
          {thread.is_locked && (
            <FadeIn delay={0.3}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Thread Locked</h3>
                <p className="text-red-700">This discussion has been locked and no longer accepts new replies.</p>
              </motion.div>
            </FadeIn>
          )}
          
          {/* Sign In Prompt */}
          {!currentUser && !thread.is_locked && (
            <FadeIn delay={0.3}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Join the Conversation</h3>
                <p className="text-gray-600 mb-6">Sign in to share your thoughts and participate in this discussion.</p>
                <motion.a
                  href="/login"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign In</span>
                </motion.a>
              </motion.div>
            </FadeIn>
          )}
        </div>
      </PageTransition>
    </div>
  )
} 