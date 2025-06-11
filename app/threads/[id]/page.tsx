'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client'
import { Thread } from '@/lib/supabase/types'
import { getPosts } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { PageTransition, FadeIn } from '@/app/components/ui/transitions'
import { useUser } from '@/app/hooks/useUser'
import { useIdentity } from '@/app/components/providers/identity-provider'
import ThreadModeration from '@/app/components/threads/thread-moderation'
import CommentList from '@/app/components/threads/comment-list'
import FileUpload from '@/app/components/ui/file-upload'
import VoteButtons from '@/app/components/ui/VoteButtons'

interface ThreadWithAuthor extends Thread {
  authorName: string
  image_url?: string | null
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
  const [newPostImageUrl, setNewPostImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [postLoading, setPostLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { user: currentUser, canModerate, profile } = useUser()
  const { isAnonymousMode } = useIdentity()
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
          .select('email, display_name')
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
          authorName: threadData.is_anonymous ? 'Anonymous' : (threadProfile?.display_name || threadProfile?.email || 'Unknown'),
          image_url: threadData.image_url,
        })

        // Fetch posts using the utility function
        const postsData = await getPosts(threadId)
        setPosts(postsData)
      } catch {
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
      // Insert the post with global anonymous setting
      const { error: postError } = await supabase
        .from('posts')
        .insert([
          {
            thread_id: threadId,
            content: newPostContent,
            user_id: currentUser.id,
            image_url: newPostImageUrl,
            is_anonymous: isAnonymousMode,
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
      setNewPostImageUrl(null)
      
      // Refetch the posts using the utility function
      const postsData = await getPosts(threadId)
      setPosts(postsData)

    } catch {
      setError('Failed to post your reply. Please try again.')
    } finally {
      setPostLoading(false)
    }
  }

  const handlePostFileUpload = (url: string) => {
    setNewPostImageUrl(url)
  }

  const handlePostFileRemove = () => {
    setNewPostImageUrl(null)
  }

  const handleThreadUpdate = (updatedThread: Thread) => {
    setThread(prev => prev ? { ...prev, ...updatedThread } : null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center px-4">
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-red-200 max-w-md w-full"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Error</h3>
          <p className="text-red-600 text-sm sm:text-base">{error}</p>
        </motion.div>
      </div>
    )
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-md w-full"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Thread Not Found</h3>
          <p className="text-gray-500 text-sm sm:text-base mb-4">The thread you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/threads')}
            className="btn btn-primary w-full text-sm sm:text-base"
          >
            Back to Threads
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <PageTransition>
        {/* Back Navigation */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
              <motion.button
                onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
              whileHover={{ x: -2 }}
                whileTap={{ scale: 0.98 }}
              >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              <span>Back to discussions</span>
              </motion.button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Thread Header */}
              <FadeIn>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 sm:p-6 lg:p-8">
                    {/* Thread Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                      {thread.is_pinned && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          📌 <span className="ml-1 hidden sm:inline">Pinned</span>
                        </span>
                      )}
                      {thread.is_locked && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          🔒 <span className="ml-1 hidden sm:inline">Locked</span>
                    </span>
                      )}
                </div>

                    {/* Thread Title */}
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                        {thread.title}
                      </h1>

                    {/* Thread Content */}
                    <div className="prose prose-sm sm:prose max-w-none mb-4 sm:mb-6">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                        {thread.content}
                      </p>
                    </div>

                    {/* Thread Image - Now inline with content */}
                    {thread.image_url && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 sm:mb-6"
                      >
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-200 shadow-sm">
                          <motion.div 
                            className="relative w-fit max-w-2xl mx-auto rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-lg transition-shadow duration-300"
                            onClick={() => window.open(thread.image_url!, '_blank')}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Image
                              src={thread.image_url}
                              alt="Thread image"
                              width={640}
                              height={480}
                              className="max-w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 640px"
                              priority
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                            {/* Zoom Icon */}
                            <motion.div 
                              className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              whileHover={{ scale: 1.1 }}
                            >
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </motion.div>
                          </motion.div>
                          {/* Image Caption */}
                          <div className="mt-3 flex items-center justify-center text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              <span>Click to view full size</span>
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Thread Metadata */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <VoteButtons
                          threadId={thread.id}
                          upvotes={thread.upvotes || 0}
                          downvotes={thread.downvotes || 0}
                          vote_score={thread.vote_score || 0}
                          className="mr-2"
                        />
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm sm:text-base">
                            {thread.authorName[0]?.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">
                            {thread.authorName}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="font-medium">
                            {posts.length} {posts.length === 1 ? 'reply' : 'replies'}
                          </span>
                    </div>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="font-medium">{thread.view_count} views</span>
                        </div>
                      </div>
                </div>
              </div>
            </div>
          </FadeIn>

              {/* Comments Section */}
          <FadeIn delay={0.2}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <CommentList posts={posts} />
            </div>
          </FadeIn>

          {/* Reply Form */}
              {currentUser && !thread.is_locked ? (
            <FadeIn delay={0.3}>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm sm:text-base font-medium">
                          {(profile?.display_name || currentUser.email)?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                        <p className="text-sm sm:text-base font-semibold text-gray-900">Post a reply</p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Replying as {isAnonymousMode ? 'Anonymous' : (profile?.display_name || currentUser.email)}
                        </p>
                  </div>
                </div>
                
                    <form onSubmit={handlePostSubmit} className="space-y-4">
                  <div>
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="Share your thoughts on this discussion..."
                          className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
                          rows={4}
                          required
                        />
                      </div>

                      {/* File Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Attach Image (Optional)
                        </label>
                        <FileUpload
                          onFileUpload={handlePostFileUpload}
                          onFileRemove={handlePostFileRemove}
                          currentFile={newPostImageUrl}
                    />
                  </div>
                  
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="text-xs sm:text-sm text-gray-500">
                          {isAnonymousMode ? (
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                              Posting anonymously
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                              Posting as {profile?.display_name || currentUser.email}
                            </span>
                          )}
                        </div>
                        
                    <motion.button
                      type="submit"
                      disabled={postLoading || !newPostContent.trim()}
                          className="btn btn-primary w-full sm:w-auto text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                    >
                      {postLoading ? (
                            <span className="flex items-center justify-center space-x-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Posting...</span>
                            </span>
                      ) : (
                            <span>Post Reply</span>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </FadeIn>
              ) : !currentUser ? (
            <FadeIn delay={0.3}>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Join the conversation</h3>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">Sign in to reply to this thread</p>
                    <motion.button
                      onClick={() => router.push('/login')}
                      className="btn btn-primary w-full sm:w-auto text-sm sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign In
                    </motion.button>
                  </div>
                </FadeIn>
              ) : thread.is_locked ? (
                <FadeIn delay={0.3}>
                  <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-6 sm:p-8 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Thread Locked</h3>
                    <p className="text-gray-500 text-sm sm:text-base">This thread has been locked and no longer accepts new replies.</p>
                  </div>
                </FadeIn>
              ) : null}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* Thread Moderation */}
              {canModerate && (
                <FadeIn delay={0.4}>
                  <ThreadModeration thread={thread} onUpdate={handleThreadUpdate} />
            </FadeIn>
          )}
          
              {/* Thread Stats */}
              <FadeIn delay={0.5}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Thread Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Created</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Replies</span>
                      <span className="text-sm font-medium text-gray-900">{posts.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Views</span>
                      <span className="text-sm font-medium text-gray-900">{thread.view_count}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Author</span>
                      <span className="text-sm font-medium text-purple-600">{thread.authorName}</span>
                    </div>
                    {thread.last_post_at && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last reply</span>
                        <span className="text-sm font-medium text-gray-900">
                          {formatDistanceToNow(new Date(thread.last_post_at), { addSuffix: true })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
            </FadeIn>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  )
} 