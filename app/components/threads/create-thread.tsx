'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import { Modal } from '@/app/components/ui/modal'
import FileUpload from '@/app/components/ui/file-upload'
import CategorySelector from '@/app/components/ui/CategorySelector'
import TagInput from '@/app/components/ui/TagInput'
import { useIdentity } from '@/app/components/providers/identity-provider'
import { supabase } from '@/lib/supabase/client'

interface CreateThreadProps {
  userId: string
  userEmail: string | undefined
}

export default function CreateThread({ userId, userEmail }: CreateThreadProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [category, setCategory] = useState('general')
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isAnonymousMode } = useIdentity()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      setError('Please provide both a title and content for your thread.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Insert the thread into the database with anonymous flag
      const { data, error: threadError } = await supabase
        .from('threads')
        .insert([
          {
            title,
            content,
            user_id: userId,
            image_url: imageUrl,
            category,
            tags,
            is_anonymous: isAnonymousMode,
          }
        ])
        .select('id')
        .single()

      if (threadError) throw threadError

      // Reset the form and close modal
      setTitle('')
      setContent('')
      setImageUrl(null)
      setCategory('general')
      setTags([])
      setError(null)
      setIsModalOpen(false)
      
      // Redirect to the new thread
      if (data?.id) {
        router.push(`/threads/${data.id}`)
      } else {
        // If no error but also no data, refresh the current page
        router.refresh()
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create thread. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTitle('')
    setContent('')
    setImageUrl(null)
    setCategory('general')
    setTags([])
    setError(null)
  }

  const handleFileUpload = (url: string) => {
    setImageUrl(url)
  }

  const handleFileRemove = () => {
    setImageUrl(null)
  }

  return (
    <>
      {/* Create Thread Button */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-4 -translate-x-4"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Start a new discussion</h2>
              <p className="text-purple-100 mb-4">Share your thoughts with the community</p>
              {userEmail && (
                <p className="text-sm text-purple-200">
                  Posting as {isAnonymousMode ? (
                    <span className="font-medium">Anonymous</span>
                  ) : (
                    <span className="font-medium">{userEmail}</span>
                  )}
                </p>
              )}
            </div>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Thread</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Create Thread Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create New Thread"
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-3"
              >
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </motion.div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Thread Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What would you like to discuss?"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts, ask questions, or start a conversation..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                disabled={loading}
              />
            </div>

            {/* Category Selection */}
            <CategorySelector
              selectedCategory={category}
              onCategoryChange={setCategory}
            />

            {/* Tags Input */}
            <TagInput
              tags={tags}
              onTagsChange={setTags}
            />

            {/* Image Upload Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Attach Image (Optional)
              </label>
              <FileUpload
                onFileUpload={handleFileUpload}
                onFileRemove={handleFileRemove}
                currentFile={imageUrl}
              />
            </div>

            {userEmail && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {isAnonymousMode ? '?' : userEmail[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Posting as</p>
                    <p className="text-sm text-gray-600">{isAnonymousMode ? 'Anonymous' : userEmail}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCloseModal}
              disabled={loading}
            >
              Cancel
            </Button>
            <motion.button
              type="submit"
              disabled={loading || !title.trim() || !content.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                'Create Thread'
              )}
            </motion.button>
          </div>
        </form>
      </Modal>
    </>
  )
} 