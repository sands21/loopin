export interface Thread {
  id: string
  title: string
  body: string
  user_id: string
  created_at: string
}

export interface Post {
  id: string
  thread_id: string
  body: string
  user_id: string
  is_anonymous: boolean
  image_url?: string
  created_at: string
} 