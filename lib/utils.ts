import { supabase } from './supabase/client'

export async function getPosts(threadId: string) {
  try {
    // Fetch posts for this thread
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('*')
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

    // Return posts with author names (username or email fallback)
    return (postsData || []).map(post => {
      const profile = profileMap.get(post.user_id)
      const authorName = profile?.display_name || profile?.email || 'Unknown'
      return {
        ...post,
        authorName,
      }
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export async function getThreads() {
  try {
    // Get threads first - no joins needed
    const { data: threadsData, error } = await supabase
      .from('threads')
      .select('*')
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
      console.error('Error fetching profiles:', profilesError)
      // Still show threads even if we can't get emails
      return threadsData.map(thread => ({ ...thread, user_email: null }))
    }

    // Create a map for quick lookup
    const profileMap = new Map(profiles?.map(p => [p.id, { email: p.email, display_name: p.display_name }]) || [])

    // Combine threads with usernames/emails
    return threadsData.map(thread => {
      const profile = profileMap.get(thread.user_id)
      const user_display_name = profile?.display_name || profile?.email || null
      return {
        ...thread,
        user_email: profile?.email || null,
        user_display_name
      }
    })
  } catch (error) {
    console.error('Error fetching threads:', error)
    throw error
  }
} 