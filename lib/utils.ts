import { supabase } from './supabase/client'
import { Thread, Category } from './supabase/types'

// Predefined categories
export const CATEGORIES: Category[] = [
  {
    id: 'general',
    name: 'General',
    description: 'General discussions and topics',
    color: 'bg-gray-500',
    icon: '💬',
    created_at: new Date().toISOString()
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Tech discussions, programming, and innovation',
    color: 'bg-blue-500',
    icon: '💻',
    created_at: new Date().toISOString()
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    description: 'Life, hobbies, and personal interests',
    color: 'bg-green-500',
    icon: '🌱',
    created_at: new Date().toISOString()
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Movies, games, music, and fun',
    color: 'bg-purple-500',
    icon: '🎮',
    created_at: new Date().toISOString()
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Learning, courses, and knowledge sharing',
    color: 'bg-yellow-500',
    icon: '📚',
    created_at: new Date().toISOString()
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Entrepreneurship, careers, and professional topics',
    color: 'bg-indigo-500',
    icon: '💼',
    created_at: new Date().toISOString()
  }
]

// Popular/suggested tags
export const SUGGESTED_TAGS = [
  'discussion', 'question', 'help', 'advice', 'opinion', 'announcement',
  'tutorial', 'review', 'news', 'tips', 'beginner', 'advanced'
]

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
    let postProfiles: { id: string; email: string; display_name: string | null; avatar_url: string | null }[] = []
    
    if (postUserIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, email, display_name, avatar_url')
        .in('id', postUserIds)
      postProfiles = profiles || []
    }

    // Create profile lookup map
    const profileMap = new Map(postProfiles.map(p => [p.id, { email: p.email, display_name: p.display_name, avatar_url: p.avatar_url }]))

    // Format posts with author names and organize into nested structure
    const formattedPosts = (postsData || []).map(post => {
      const profile = profileMap.get(post.user_id)
      const actualAuthorName = profile?.display_name || profile?.email || 'Unknown'
      
      // Use "Anonymous" if the post is marked as anonymous, otherwise use actual name
      const authorName = post.is_anonymous ? 'Anonymous' : actualAuthorName
      const authorAvatarUrl = post.is_anonymous ? null : profile?.avatar_url || null
      
      return {
        ...post,
        authorName,
        authorAvatarUrl,
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

export async function getThreads(category?: string, tags?: string[]) {
  try {
    // Build query with optional filters
    let query = supabase
      .from('threads')
      .select('*, upvotes, downvotes, vote_score, follow_count')

    // Apply category filter if provided
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    // Apply tags filter if provided
    if (tags && tags.length > 0) {
      query = query.overlaps('tags', tags)
    }

    const { data: threadsData, error } = await query
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
      .select('id, email, display_name, avatar_url')
      .in('id', userIds)
    
    if (profilesError) {
      // Still show threads even if we can't get emails
      return threadsData.map(thread => ({ ...thread, user_email: null }))
    }

    // Create a map for quick lookup
    const profileMap = new Map(profiles?.map(p => [p.id, { email: p.email, display_name: p.display_name, avatar_url: p.avatar_url }]) || [])

    // Combine threads with usernames/emails (respecting anonymous flag)
    return threadsData.map(thread => {
      const profile = profileMap.get(thread.user_id)
      const actualDisplayName = profile?.display_name || profile?.email || null
      
      // Use "Anonymous" if the thread is marked as anonymous, otherwise use actual name
      const user_display_name = thread.is_anonymous ? 'Anonymous' : actualDisplayName
      const user_email = thread.is_anonymous ? null : profile?.email || null
      const user_avatar_url = thread.is_anonymous ? null : profile?.avatar_url || null
      
      return {
      ...thread,
        user_email,
        user_display_name,
        user_avatar_url
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
      .select('id, email, display_name, avatar_url')
      .in('id', userIds)

    const profileMap = new Map(profiles?.map(p => [p.id, { email: p.email, display_name: p.display_name, avatar_url: p.avatar_url }]) || [])

    return threads.map(thread => {
      const profile = profileMap.get(thread.user_id)
      const actualDisplayName = profile?.display_name || profile?.email || null
      
      return {
        ...thread,
        user_display_name: thread.is_anonymous ? 'Anonymous' : actualDisplayName,
        user_email: thread.is_anonymous ? null : profile?.email || null,
        user_avatar_url: thread.is_anonymous ? null : profile?.avatar_url || null
      }
    })
  } catch (error) {
    throw error
  }
}

// Search utility functions
export async function searchThreadsAndPosts(query: string) {
  try {
    if (!query.trim()) {
      return { threads: [], posts: [] }
    }

    // Search threads by title and content
    const { data: threadsData, error: threadsError } = await supabase
      .from('threads')
      .select('*, upvotes, downvotes, vote_score, follow_count')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (threadsError) throw threadsError

    // Search posts by content
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('*, threads!inner(title)')
      .ilike('content', `%${query}%`)
      .order('created_at', { ascending: false })

    if (postsError) throw postsError

    // Get profiles for thread authors
    const threadUserIds = [...new Set((threadsData || []).map(thread => thread.user_id))]
    const postUserIds = [...new Set((postsData || []).map(post => post.user_id))]
    const allUserIds = [...new Set([...threadUserIds, ...postUserIds])]

    let profiles: { id: string; email: string; display_name: string | null; avatar_url: string | null }[] = []
    if (allUserIds.length > 0) {
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, email, display_name, avatar_url')
        .in('id', allUserIds)
      profiles = profilesData || []
    }

    const profileMap = new Map(profiles.map(p => [p.id, { email: p.email, display_name: p.display_name, avatar_url: p.avatar_url }]))

    // Format threads with author information
    const formattedThreads = (threadsData || []).map(thread => {
      const profile = profileMap.get(thread.user_id)
      const actualDisplayName = profile?.display_name || profile?.email || null
      
      return {
        ...thread,
        user_display_name: thread.is_anonymous ? 'Anonymous' : actualDisplayName,
        user_email: thread.is_anonymous ? null : profile?.email || null,
        user_avatar_url: thread.is_anonymous ? null : profile?.avatar_url || null
      }
    })

    // Format posts with author information and thread title
    const formattedPosts = (postsData || []).map(post => {
      const profile = profileMap.get(post.user_id)
      const actualDisplayName = profile?.display_name || profile?.email || null
      
      return {
        ...post,
        user_display_name: post.is_anonymous ? 'Anonymous' : actualDisplayName,
        user_email: post.is_anonymous ? null : profile?.email || null,
        thread_title: (post as { threads?: { title: string } }).threads?.title || 'Unknown Thread'
      }
    })

    return {
      threads: formattedThreads,
      posts: formattedPosts
    }
  } catch (error) {
    throw error
  }
}

// Get category by ID
export function getCategoryById(categoryId: string): Category | undefined {
  return CATEGORIES.find(cat => cat.id === categoryId)
}

// Get category color class
export function getCategoryColor(categoryId: string): string {
  const category = getCategoryById(categoryId)
  return category?.color || 'bg-gray-500'
} 