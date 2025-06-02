import React from 'react'
import { motion } from 'framer-motion'
import { StaggerContainer, StaggerItem } from '@/app/components/ui/transitions'
import CommentItem from './comment-item'

interface PostWithAuthor {
  id: string
  thread_id: string
  content: string
  user_id: string
  is_anonymous: boolean
  image_url?: string | null
  created_at: string
  authorName: string
}

interface CommentListProps {
  posts: PostWithAuthor[]
}

export default function CommentList({ posts }: CommentListProps) {
  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No replies yet</h3>
        <p className="text-gray-500">Be the first to share your thoughts!</p>
      </motion.div>
    )
  }

  return (
    <StaggerContainer>
      {posts.map((post, index) => (
        <StaggerItem key={post.id}>
          <CommentItem post={post} index={index} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
} 