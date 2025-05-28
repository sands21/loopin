'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Thread, Post } from '@/lib/supabase/types'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from '@/app/components/ui/transitions'
import type { User } from '@supabase/supabase-js'

interface ThreadWithAuthor extends Thread {
  authorName: string
}

interface PostWithAuthor extends Post {
  authorName: string
}

export default function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: threadId } = React.use(params)
  const [thread, setThread] = useState<ThreadWithAuthor | null>(null)
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [newPostContent, setNewPostContent] = useState('')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [postLoading, setPostLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        setCurrentUser(user)

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

        // Fetch posts for this thread
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .eq('thread_id', threadId)
          .order('created_at', { ascending: true })

        if (postsError) throw postsError

        // Get profiles for all post authors
        const postUserIds = postsData ? [...new Set(postsData.map(post => post.user_id))] : []
        let postProfiles: { id: string; email: string }[] = []
        
        if (postUserIds.length > 0) {
          const { data: profiles } = await supabase
            .from('profiles')
            .select('id, email')
            .in('id', postUserIds)
          postProfiles = profiles || []
        }

        // Create profile lookup map
        const profileMap = new Map(postProfiles.map(p => [p.id, p.email]))

        // Format the thread data
        setThread({
          ...threadData,
          authorName: threadProfile?.email || 'Unknown',
        })

        // Format the posts data
        setPosts((postsData || []).map(post => ({
          ...post,
          authorName: profileMap.get(post.user_id) || 'Unknown',
        })))
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
      
      // Refetch the thread and posts
      const { data: postsData, error: postsRefetchError } = await supabase
        .from('posts')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true })

      if (postsRefetchError) {
        console.error('Error refetching posts:', postsRefetchError)
        // Optionally set an error state here
        return;
      }

      // Update the posts
      if (postsData && postsData.length > 0) {
        // Get profiles for all post authors
        const postUserIds = [...new Set(postsData.map(post => post.user_id))]
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, email')
          .in('id', postUserIds)
        
        // Create profile lookup map
        const profileMap = new Map((profiles || []).map(p => [p.id, p.email]))
        
        setPosts(postsData.map(post => ({
          ...post,
          authorName: profileMap.get(post.user_id) || 'Unknown',
        })))
      } else {
        setPosts([]) // Set to empty array if postsData is null or empty
      }

    } catch (error) {
      console.error('Error posting reply:', error)
      setError('Failed to post your reply. Please try again.')
    } finally {
      setPostLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading thread...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    )
  }

  if (!thread) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Thread not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <PageTransition>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
            >
              ← Back to discussions
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{thread.title}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Posted by {thread.authorName} • {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-500">
                    {thread.view_count} {thread.view_count === 1 ? 'view' : 'views'}
                  </div>
                  {thread.is_locked && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      Locked
                    </span>
                  )}
                  {thread.is_pinned && (
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">
                      Pinned
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {thread.content}
              </div>
            </CardContent>
          </Card>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Replies ({posts.length})</h2>
            
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <p className="text-gray-500">No replies yet. Be the first to reply!</p>
              </div>
            ) : (
              <StaggerContainer>
                {posts.map((post) => (
                  <StaggerItem key={post.id}>
                    <Card className="mb-4">
                      <CardContent className="py-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{post.authorName}</span>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <div className="prose max-w-none">
                          {post.content}
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>

          {currentUser && !thread.is_locked && (
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>Post a reply</CardTitle>
                </CardHeader>
                <form onSubmit={handlePostSubmit}>
                  <CardContent>
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="What are your thoughts?"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      disabled={postLoading}
                    />
                    {error && (
                      <div className="mt-2 text-red-600 text-sm">{error}</div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button type="submit" disabled={postLoading || !newPostContent.trim()}>
                      {postLoading ? 'Posting...' : 'Post Reply'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </FadeIn>
          )}
          
          {thread.is_locked && (
            <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-lg text-center">
              This thread is locked and does not accept new replies.
            </div>
          )}
          
          {!currentUser && !thread.is_locked && (
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
              Please <a href="/login" className="text-primary-600 font-medium">sign in</a> to post a reply.
            </div>
          )}
        </div>
      </PageTransition>
    </div>
  )
} 