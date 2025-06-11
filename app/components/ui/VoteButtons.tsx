'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { ChevronUpIcon as ChevronUpSolid, ChevronDownIcon as ChevronDownSolid } from '@heroicons/react/24/solid'
import { voteOnThread, voteOnPost, getUserVote } from '@/lib/utils'
import { useUser } from '@/app/hooks/useUser'

interface VoteButtonsProps {
  threadId?: string
  postId?: string
  upvotes: number
  downvotes: number
  vote_score: number
  className?: string
}

export default function VoteButtons({
  threadId,
  postId,
  upvotes,
  downvotes,
  vote_score,
  className = ''
}: VoteButtonsProps) {
  const { user } = useUser()
  const [currentVote, setCurrentVote] = useState<-1 | 1 | null>(null)
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes)
  const [currentDownvotes, setCurrentDownvotes] = useState(downvotes)
  const [currentScore, setCurrentScore] = useState(vote_score)
  const [isLoading, setIsLoading] = useState(false)

  // Load user's current vote
  useEffect(() => {
    async function loadUserVote() {
      if (user && (threadId || postId)) {
        const vote = await getUserVote(threadId, postId)
        setCurrentVote(vote)
      }
    }
    loadUserVote()
  }, [user, threadId, postId])

  // Update counts when props change
  useEffect(() => {
    setCurrentUpvotes(upvotes)
    setCurrentDownvotes(downvotes)
    setCurrentScore(vote_score)
  }, [upvotes, downvotes, vote_score])

  const handleVote = async (voteType: -1 | 1, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (!user || isLoading) return

    setIsLoading(true)
    try {
      // Optimistic update
      const wasVoted = currentVote === voteType
      const newVote = wasVoted ? null : voteType
      
      // Calculate new counts
      let newUpvotes = currentUpvotes
      let newDownvotes = currentDownvotes

      // Remove previous vote if any
      if (currentVote === 1) {
        newUpvotes--
      } else if (currentVote === -1) {
        newDownvotes--
      }

      // Add new vote if not removing
      if (!wasVoted) {
        if (voteType === 1) {
          newUpvotes++
        } else {
          newDownvotes++
        }
      }

      setCurrentVote(newVote)
      setCurrentUpvotes(newUpvotes)
      setCurrentDownvotes(newDownvotes)
      setCurrentScore(newUpvotes - newDownvotes)

      // Perform actual vote
      if (threadId) {
        await voteOnThread(threadId, voteType)
      } else if (postId) {
        await voteOnPost(postId, voteType)
      }
    } catch (error) {
      // Revert optimistic update on error
      setCurrentVote(currentVote)
      setCurrentUpvotes(upvotes)
      setCurrentDownvotes(downvotes)
      setCurrentScore(vote_score)
      console.error('Error voting:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className={`flex flex-col items-center space-y-1 ${className}`}>
        <div className="flex items-center text-gray-400">
          <ChevronUpIcon className="h-5 w-5" />
        </div>
        <span className="text-sm text-gray-600 font-medium">{currentScore}</span>
        <div className="flex items-center text-gray-400">
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center space-y-1 ${className}`}>
      <motion.button
        onClick={(e) => handleVote(1, e)}
        disabled={isLoading}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center justify-center p-1 rounded transition-colors ${
          currentVote === 1
            ? 'text-green-600 bg-green-50'
            : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {currentVote === 1 ? (
          <ChevronUpSolid className="h-5 w-5" />
        ) : (
          <ChevronUpIcon className="h-5 w-5" />
        )}
      </motion.button>
      
      <span className={`text-sm font-medium ${
        currentScore > 0 ? 'text-green-600' : 
        currentScore < 0 ? 'text-red-600' : 
        'text-gray-600'
      }`}>
        {currentScore}
      </span>
      
      <motion.button
        onClick={(e) => handleVote(-1, e)}
        disabled={isLoading}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center justify-center p-1 rounded transition-colors ${
          currentVote === -1
            ? 'text-red-600 bg-red-50'
            : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {currentVote === -1 ? (
          <ChevronDownSolid className="h-5 w-5" />
        ) : (
          <ChevronDownIcon className="h-5 w-5" />
        )}
      </motion.button>
    </div>
  )
} 