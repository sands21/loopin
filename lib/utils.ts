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

    // Return posts with author names
    return (postsData || []).map(post => ({
      ...post,
      authorName: profileMap.get(post.user_id) || 'Unknown',
    }))
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
      .select('id, email')
      .in('id', userIds)
    
    if (profilesError) {
      console.error('Error fetching profiles:', profilesError)
      // Still show threads even if we can't get emails
      return threadsData.map(thread => ({ ...thread, user_email: null }))
    }

    // Create a map for quick lookup
    const profileMap = new Map(profiles?.map(p => [p.id, p.email]) || [])

    // Combine threads with emails
    return threadsData.map(thread => ({
      ...thread,
      user_email: profileMap.get(thread.user_id) || null
    }))
  } catch (error) {
    console.error('Error fetching threads:', error)
    throw error
  }
} 