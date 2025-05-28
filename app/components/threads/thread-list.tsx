'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Thread } from '@/lib/supabase/types'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardFooter, CardTitle } from '@/app/components/ui/card'
import { StaggerContainer, StaggerItem } from '@/app/components/ui/transitions'

interface ThreadListProps {
  threads: Thread[]
  loading: boolean
}

export default function ThreadList({ threads, loading }: ThreadListProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest')
  
  // Apply sorting
  const sortedThreads = [...threads].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    } else {
      // Sort by view count for 'popular'
      return b.view_count - a.view_count
    }
  })

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (sortedThreads.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">No threads yet</h3>
        <p className="text-gray-500 mt-1">Be the first to start a discussion!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Discussions</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setSortBy('newest')}
            className={`px-3 py-1 text-sm rounded-md ${sortBy === 'newest' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-700'}`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-3 py-1 text-sm rounded-md ${sortBy === 'popular' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-700'}`}
          >
            Popular
          </button>
        </div>
      </div>

      <StaggerContainer>
        {sortedThreads.map((thread) => (
          <StaggerItem key={thread.id}>
            <Link href={`/threads/${thread.id}`} className="block mb-4">
              <Card hover>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="mb-2 line-clamp-2">{thread.title}</CardTitle>
                    {thread.is_pinned && (
                      <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">
                        Pinned
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-2">
                    {thread.content}
                  </p>
                </CardContent>
                <CardFooter className="py-2 px-4">
                  <div className="flex justify-between items-center w-full text-xs text-gray-500">
                    <div className="flex space-x-4">
                      <span>
                        {thread.post_count} {thread.post_count === 1 ? 'reply' : 'replies'}
                      </span>
                      <span>{thread.view_count} views</span>
                    </div>
                    <span className="text-xs">
                      {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
} 