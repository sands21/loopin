'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BellIcon } from '@heroicons/react/24/outline'
import { BellIcon as BellSolid } from '@heroicons/react/24/solid'
import { followThread, unfollowThread, isFollowingThread } from '@/lib/utils'
import { useUser } from '@/app/hooks/useUser'

interface FollowButtonProps {
  threadId: string
  followCount: number
  className?: string
  onFollowChange?: (isFollowing: boolean, newCount: number) => void
}

export default function FollowButton({
  threadId,
  followCount,
  className = '',
  onFollowChange
}: FollowButtonProps) {
  const { user } = useUser()
  const [isFollowing, setIsFollowing] = useState(false)
  const [currentFollowCount, setCurrentFollowCount] = useState(followCount)
  const [isLoading, setIsLoading] = useState(false)

  // Load user's follow status
  useEffect(() => {
    async function loadFollowStatus() {
      if (user && threadId) {
        const following = await isFollowingThread(threadId)
        setIsFollowing(following)
      }
    }
    loadFollowStatus()
  }, [user, threadId])

  // Update count when props change
  useEffect(() => {
    setCurrentFollowCount(followCount)
  }, [followCount])

  const handleToggleFollow = async () => {
    if (!user || isLoading) return

    setIsLoading(true)
    try {
      const newFollowState = !isFollowing
      const newCount = newFollowState ? currentFollowCount + 1 : currentFollowCount - 1

      // Optimistic update
      setIsFollowing(newFollowState)
      setCurrentFollowCount(newCount)

      // Perform actual follow/unfollow
      if (newFollowState) {
        await followThread(threadId)
      } else {
        await unfollowThread(threadId)
      }

      // Notify parent component of the change
      if (onFollowChange) {
        onFollowChange(newFollowState, newCount)
      }
    } catch (error) {
      // Revert optimistic update on error
      setIsFollowing(!isFollowing)
      setCurrentFollowCount(followCount)
      console.error('Error toggling follow:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className={`flex items-center space-x-2 text-gray-400 ${className}`}>
        <BellIcon className="h-5 w-5" />
        <span className="text-sm font-medium">{currentFollowCount}</span>
      </div>
    )
  }

  return (
    <motion.button
      onClick={handleToggleFollow}
      disabled={isLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
        isFollowing
          ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-purple-600'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {isFollowing ? (
        <BellSolid className="h-5 w-5" />
      ) : (
        <BellIcon className="h-5 w-5" />
      )}
      <span className="text-sm font-medium">
        {isFollowing ? 'Following' : 'Follow'}
      </span>
      {currentFollowCount > 0 && (
        <span className="text-xs bg-white bg-opacity-70 px-2 py-0.5 rounded-full">
          {currentFollowCount}
        </span>
      )}
    </motion.button>
  )
} 