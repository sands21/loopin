import { Database } from './database.types'

// Thread type representing a forum thread
export interface Thread {
  id: string
  title: string
  content: string
  user_id: string
  created_at: string
  updated_at: string
  category?: string
  is_pinned: boolean
  is_locked: boolean
  view_count: number
  post_count: number
  user_email?: string
  last_post_at: string | null
}

// Post type representing a reply in a thread
export interface Post {
  id: string
  thread_id: string
  content: string
  user_id: string
  created_at: string
  updated_at: string
  is_solution: boolean
  user_email?: string
}

// User profile type
export interface Profile {
  id: string
  email: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  created_at: string
  post_count: number
  thread_count: number
  role: 'user' | 'moderator' | 'admin'
}

export type Tables = Database['public']['Tables'] 