import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import VoteButtons from '@/app/components/ui/VoteButtons'
import Avatar from '@/app/components/ui/avatar'

interface PostWithAuthor {
  id: string
  thread_id: string
  content: string
  user_id: string
  parent_id?: string | null
  is_anonymous: boolean
  image_url?: string | null
  created_at: string
  authorName: string
  authorAvatarUrl?: string | null
  upvotes?: number
  downvotes?: number
  vote_score?: number
  replies?: PostWithAuthor[]
}

interface CommentItemProps {
  post: PostWithAuthor
  index: number
  onReply?: (postId: string, authorName: string) => void
  isReply?: boolean
}

export default function CommentItem({ post, index, onReply, isReply = false }: CommentItemProps) {
  // The authorName from getPosts already respects the is_anonymous flag
  const displayName = post.authorName
  const [copySuccess, setCopySuccess] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleExportMicroblog = async () => {
    try {
      // Format comment into microblog snippet
      const microblogText = `"${post.content.replace(/\n/g, ' ')}" - ${displayName}`
      
      // Copy to clipboard
      await navigator.clipboard.writeText(microblogText)
      
      // Show success feedback
      setCopySuccess(true)
      setShowToast(true)
      
      // Hide feedback after delay
      setTimeout(() => {
        setCopySuccess(false)
        setShowToast(false)
      }, 2000)
    } catch {
      // Copy failed silently for better UX
    }
  }

  const handleReply = () => {
    if (onReply) {
      onReply(post.id, displayName)
    }
  }

  return (
    <div className={`${isReply ? 'ml-8 sm:ml-12' : ''}`}>
    <motion.div
        className={`bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 mb-4 border border-gray-100 hover:shadow-md transition-all duration-300 relative ${
          isReply ? 'bg-gradient-to-r from-blue-50 to-purple-50' : ''
        }`}
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Toast Notification */}
      {showToast && (
        <motion.div
          className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-20"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">Copied to clipboard!</span>
        </motion.div>
      )}
      <div className="flex items-start space-x-4">
          {/* Vote Buttons */}
          <div className="flex-shrink-0">
            <VoteButtons
              postId={post.id}
              upvotes={post.upvotes || 0}
              downvotes={post.downvotes || 0}
              vote_score={post.vote_score || 0}
              className="mr-2"
            />
          </div>

        {/* Reply Avatar */}
        <div className="flex-shrink-0">
          <Avatar
            src={post.authorAvatarUrl}
            name={displayName}
            size="md"
            className={`${
              isReply 
                ? 'from-green-500 to-blue-500' 
                : 'from-blue-500 to-purple-500'
            } shadow-md`}
          />
        </div>

        {/* Reply Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-900">{displayName}</span>
            <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
                
                {/* Reply Button */}
                {!isReply && onReply && (
                  <motion.button
                    onClick={handleReply}
                    className="w-8 h-8 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-full flex items-center justify-center transition-all duration-200 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </motion.button>
                )}
              
              {/* Export as Microblog Button */}
              <div className="relative group">
                <motion.button
                  onClick={handleExportMicroblog}
                  className="w-8 h-8 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-full flex items-center justify-center transition-all duration-200 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {copySuccess ? (
                    <motion.svg 
                      className="w-4 h-4 text-green-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.button>
                
                {/* Tooltip */}
                <motion.div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {copySuccess ? 'Copied to clipboard!' : 'Export as microblog'}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            {post.content}
          </div>
          
          {/* Image Display */}
          {post.image_url && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-200 shadow-sm">
                <motion.div 
                  className="relative w-fit max-w-sm rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-lg transition-shadow duration-300"
                  onClick={() => window.open(post.image_url!, '_blank')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                src={post.image_url}
                alt="Attached image"
                    width={320}
                    height={240}
                    className="w-full h-auto max-h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 320px"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
                  {/* Zoom Icon */}
                  <motion.div 
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </motion.div>
                </motion.div>
                {/* Image Caption */}
                <div className="mt-2 flex items-center justify-center text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Click to enlarge</span>
                  </span>
                </div>
            </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>

      {/* Render nested replies */}
      {post.replies && post.replies.length > 0 && (
        <div className="space-y-2">
          {post.replies.map((reply, replyIndex) => (
            <CommentItem
              key={reply.id}
              post={reply}
              index={replyIndex}
              onReply={onReply}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  )
} 