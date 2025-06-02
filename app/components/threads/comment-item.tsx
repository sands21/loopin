import React from 'react'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'

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

interface CommentItemProps {
  post: PostWithAuthor
  index: number
}

export default function CommentItem({ post, index }: CommentItemProps) {
  const displayName = post.is_anonymous ? 'Anonymous' : post.authorName

  return (
    <motion.div
      className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 mb-4 border border-gray-100 hover:shadow-md transition-all duration-300"
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start space-x-4">
        {/* Reply Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-medium text-sm">
              {displayName[0]?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Reply Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-900">{displayName}</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            {post.content}
          </div>
          
          {/* Image Display */}
          {post.image_url && (
            <div className="mt-4">
              <img
                src={post.image_url}
                alt="Attached image"
                className="max-w-full h-auto rounded-lg border border-gray-200 shadow-sm"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 