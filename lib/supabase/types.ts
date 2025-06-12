import { Database } from './database.types'

// Thread type representing a forum thread
export interface Thread {
  id: string
  title: string
  content: string
  user_id: string
  image_url?: string | null
  is_anonymous: boolean
  created_at: string
  updated_at: string
  category?: string
  tags?: string[]
  is_pinned: boolean
  is_locked: boolean
  view_count: number
  post_count: number
  upvotes: number
  downvotes: number
  vote_score: number
  follow_count: number
  user_email?: string
  user_display_name?: string | null
  display_name?: string | null
  last_post_at: string | null
}

// Post type representing a reply in a thread
export interface Post {
  id: string
  thread_id: string
  content: string
  user_id: string
  parent_id?: string | null
  is_anonymous: boolean
  image_url?: string | null
  created_at: string
  updated_at: string
  is_solution: boolean
  upvotes: number
  downvotes: number
  vote_score: number
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

// Vote type representing upvotes/downvotes
export interface Vote {
  id: string
  user_id: string
  thread_id?: string | null
  post_id?: string | null
  vote_type: -1 | 1 // -1 for downvote, 1 for upvote
  created_at: string
  updated_at: string
}

// Thread follow type
export interface ThreadFollow {
  id: string
  user_id: string
  thread_id: string
  created_at: string
}

// Category type for thread categorization
export interface Category {
  id: string
  name: string
  description: string
  color: string
  icon?: string
  created_at: string
}

// Tag type for thread tagging
export interface Tag {
  id: string
  name: string
  color: string
  created_at: string
  usage_count: number
}

export type Tables = Database['public']['Tables'] 