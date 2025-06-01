export interface Database {
  public: {
    Tables: {
      threads: {
        Row: {
          id: string
          title: string
          content: string
          user_id: string
          created_at: string
          updated_at: string
          category: string | null
          is_pinned: boolean
          is_locked: boolean
          view_count: number
          post_count: number
          last_post_at: string | null
        }
        Insert: {
          id?: string
          title: string
          content: string
          user_id: string
          created_at?: string
          updated_at?: string
          category?: string | null
          is_pinned?: boolean
          is_locked?: boolean
          view_count?: number
          post_count?: number
          last_post_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          user_id?: string
          created_at?: string
          updated_at?: string
          category?: string | null
          is_pinned?: boolean
          is_locked?: boolean
          view_count?: number
          post_count?: number
          last_post_at?: string | null
        }
      }
      posts: {
        Row: {
          id: string
          thread_id: string
          content: string
          user_id: string
          created_at: string
          updated_at: string
          is_solution: boolean
        }
        Insert: {
          id?: string
          thread_id: string
          content: string
          user_id: string
          created_at?: string
          updated_at?: string
          is_solution?: boolean
        }
        Update: {
          id?: string
          thread_id?: string
          content?: string
          user_id?: string
          created_at?: string
          updated_at?: string
          is_solution?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          post_count: number
          thread_count: number
          role: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          post_count?: number
          thread_count?: number
          role?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          post_count?: number
          thread_count?: number
          role?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
} 