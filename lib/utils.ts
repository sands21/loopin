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

    // Return posts with author names (respecting anonymous flag)
    return (postsData || []).map(post => {
      const profile = profileMap.get(post.user_id)
      const actualAuthorName = profile?.display_name || profile?.email || 'Unknown'
      
      // Use "Anonymous" if the post is marked as anonymous, otherwise use actual name
      const authorName = post.is_anonymous ? 'Anonymous' : actualAuthorName
      
      return {
      ...post,
        authorName,
      }
    })
  } catch (error) {
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