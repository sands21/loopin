'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'
import { Thread } from '@/lib/supabase/types'

interface ThreadModerationProps {
  thread: Thread
  onUpdate: (updatedThread: Thread) => void
}

export default function ThreadModeration({ thread, onUpdate }: ThreadModerationProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePinToggle = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: updateError } = await supabase
        .from('threads')
        .update({ is_pinned: !thread.is_pinned })
        .eq('id', thread.id)
        .select()
        .single()

      if (updateError) throw updateError

      if (data) {
        onUpdate(data as Thread)
      }
    } catch (error) {
      console.error('Error toggling pin status:', error)
      setError('Failed to update pin status. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLockToggle = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: updateError } = await supabase
        .from('threads')
        .update({ is_locked: !thread.is_locked })
        .eq('id', thread.id)
        .select()
        .single()

      if (updateError) throw updateError

      if (data) {
        onUpdate(data as Thread)
      }
    } catch (error) {
      console.error('Error toggling lock status:', error)
      setError('Failed to update lock status. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700 flex items-center space-x-2">
          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Moderation Controls</span>
        </h4>
        
        <div className="flex items-center space-x-3">
          {/* Pin/Unpin Button */}
          <motion.button
            onClick={handlePinToggle}
            disabled={loading}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              thread.is_pinned
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>{thread.is_pinned ? 'Unpin' : 'Pin'}</span>
          </motion.button>

          {/* Lock/Unlock Button */}
          <motion.button
            onClick={handleLockToggle}
            disabled={loading}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              thread.is_locked
                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {thread.is_locked ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              )}
            </svg>
            <span>{thread.is_locked ? 'Unlock' : 'Lock'}</span>
          </motion.button>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg flex items-center space-x-2 mt-3"
        >
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-2 mt-3 text-sm text-gray-600"
        >
          <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Updating...</span>
        </motion.div>
      )}
    </div>
  )
} 