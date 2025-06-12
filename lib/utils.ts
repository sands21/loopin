import { supabase } from './supabase/client'
import { Thread } from './supabase/types'

export async function getPosts(threadId: string) {
  try {
    // Fetch posts for this thread
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('*, upvotes, downvotes, vote_score')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true })

    if (postsError) throw postsError

    // Get profiles for all post authors
    const postUserIds = postsData ? [...new Set(postsData.map(post => post.user_id))] : []
    let postProfiles: { id: string; email: string; display_name: string | null }[] = []
    
    if (postUserIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, email, display_name')
        .in('id', postUserIds)
      postProfiles = profiles || []
    }

    // Create profile lookup map
    const profileMap = new Map(postProfiles.map(p => [p.id, { email: p.email, display_name: p.display_name }]))

    // Format posts with author names and organize into nested structure
    const formattedPosts = (postsData || []).map(post => {
      const profile = profileMap.get(post.user_id)
      const actualAuthorName = profile?.display_name || profile?.email || 'Unknown'
      
      // Use "Anonymous" if the post is marked as anonymous, otherwise use actual name
      const authorName = post.is_anonymous ? 'Anonymous' : actualAuthorName
      
      return {
        ...post,
        authorName,
      }
    })

    // Organize into nested structure: top-level posts with their replies
    const topLevelPosts = formattedPosts.filter(post => !post.parent_id)
    const replies = formattedPosts.filter(post => post.parent_id)

    // Add replies to their parent posts
    const postsWithReplies = topLevelPosts.map(post => ({
      ...post,
      replies: replies.filter(reply => reply.parent_id === post.id)
    }))

    return postsWithReplies
  } catch (error) {
    throw error
  }
}

export async function getThreads() {
  try {
    // Get threads first - no joins needed
    const { data: threadsData, error } = await supabase
      .from('threads')
      .select('*, upvotes, downvotes, vote_score, follow_count')
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }

    if (!threadsData) {
      return []
    }

    // Get unique user IDs
    const userIds = [...new Set(threadsData.map(thread => thread.user_id))]
    
    // Fetch profiles for these user IDs
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, display_name')
      .in('id', userIds)
    
    if (profilesError) {
      // Still show threads even if we can't get emails
      return threadsData.map(thread => ({ ...thread, user_email: null }))
    }

    // Create a map for quick lookup
    const profileMap = new Map(profiles?.map(p => [p.id, { email: p.email, display_name: p.display_name }]) || [])

    // Combine threads with usernames/emails (respecting anonymous flag)
    return threadsData.map(thread => {
      const profile = profileMap.get(thread.user_id)
      const actualDisplayName = profile?.display_name || profile?.email || null
      
      // Use "Anonymous" if the thread is marked as anonymous, otherwise use actual name
      const user_display_name = thread.is_anonymous ? 'Anonymous' : actualDisplayName
      const user_email = thread.is_anonymous ? null : profile?.email || null
      
      return {
      ...thread,
        user_email,
        user_display_name
      }
    })
  } catch (error) {
    throw error
  }
}

export function getSiteUrl(): string {
  // For server-side rendering, use the environment variable
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  }
  
  // For client-side, use environment variable or fallback to current origin
  return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
}

// Voting utility functions
export async function voteOnThread(threadId: string, voteType: -1 | 1) {
  try {
    // First try to update existing vote
    const { data: existingVote } = await supabase
      .from('votes')
      .select('*')
      .eq('thread_id', threadId)
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
      .single()

    if (existingVote) {
      if (existingVote.vote_type === voteType) {
        // Same vote type - remove vote
        const { error } = await supabase
          .from('votes')
          .delete()
          .eq('id', existingVote.id)
        if (error) throw error
      } else {
        // Different vote type - update vote
        const { error } = await supabase
          .from('votes')
          .update({ vote_type: voteType, updated_at: new Date().toISOString() })
          .eq('id', existingVote.id)
        if (error) throw error
      }
    } else {
      // No existing vote - create new vote
      const { error } = await supabase
        .from('votes')
        .insert({
          thread_id: threadId,
          vote_type: voteType,
          user_id: (await supabase.auth.getUser()).data.user?.id
        })
      if (error) throw error
    }
  } catch (error) {
    throw error
  }
}

export async function voteOnPost(postId: string, voteType: -1 | 1) {
  try {
    // First try to update existing vote
    const { data: existingVote } = await supabase
      .from('votes')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
      .single()

    if (existingVote) {
      if (existingVote.vote_type === voteType) {
        // Same vote type - remove vote
        const { error } = await supabase
          .from('votes')
          .delete()
          .eq('id', existingVote.id)
        if (error) throw error
      } else {
        // Different vote type - update vote
        const { error } = await supabase
          .from('votes')
          .update({ vote_type: voteType, updated_at: new Date().toISOString() })
          .eq('id', existingVote.id)
        if (error) throw error
      }
    } else {
      // No existing vote - create new vote
      const { error } = await supabase
        .from('votes')
        .insert({
          post_id: postId,
          vote_type: voteType,
          user_id: (await supabase.auth.getUser()).data.user?.id
        })
      if (error) throw error
    }
  } catch (error) {
    throw error
  }
}

export async function getUserVote(threadId?: string, postId?: string) {
  try {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return null

    let query = supabase
      .from('votes')
      .select('vote_type')
      .eq('user_id', user.id)

    if (threadId) {
      query = query.eq('thread_id', threadId)
    } else if (postId) {
      query = query.eq('post_id', postId)
    } else {
      return null
    }

    const { data } = await query.single()
    return data?.vote_type || null
  } catch {
    return null
  }
}

// Thread following utility functions
export async function followThread(threadId: string) {
  try {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) throw new Error('User not authenticated')

    const { error } = await supabase
      .from('thread_follows')
      .insert({
        thread_id: threadId,
        user_id: user.id
      })
    
    if (error) throw error
  } catch (error) {
    throw error
  }
}

export async function unfollowThread(threadId: string) {
  try {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) throw new Error('User not authenticated')

    const { error } = await supabase
      .from('thread_follows')
      .delete()
      .eq('thread_id', threadId)
      .eq('user_id', user.id)
    
    if (error) throw error
  } catch (error) {
    throw error
  }
}

export async function isFollowingThread(threadId: string) {
  try {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return false

    const { data } = await supabase
      .from('thread_follows')
      .select('id')
      .eq('thread_id', threadId)
      .eq('user_id', user.id)
      .single()
    
    return !!data
  } catch {
    return false
  }
}

export async function getFollowedThreads() {
  try {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return []

    const { data: follows, error } = await supabase
      .from('thread_follows')
      .select(`
        thread_id,
        threads!inner(*, upvotes, downvotes, vote_score, follow_count)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Extract and format the threads - use unknown conversion for complex nested queries
    const threads = (follows as unknown as { threads: Thread }[])?.map(follow => follow.threads).filter(Boolean) || []
    
    // Get profiles for thread authors
    const userIds = [...new Set(threads.map(thread => thread.user_id))]
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email, display_name')
      .in('id', userIds)

    const profileMap = new Map(profiles?.map(p => [p.id, { email: p.email, display_name: p.display_name }]) || [])

    return threads.map(thread => {
      const profile = profileMap.get(thread.user_id)
      const actualDisplayName = profile?.display_name || profile?.email || null
      
      return {
        ...thread,
        user_display_name: thread.is_anonymous ? 'Anonymous' : actualDisplayName,
        user_email: thread.is_anonymous ? null : profile?.email || null
      }
    })
  } catch (error) {
    throw error
  }
} 