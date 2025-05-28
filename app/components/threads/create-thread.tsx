'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { supabase } from '@/lib/supabase/client'
import { FadeIn } from '@/app/components/ui/transitions'

interface CreateThreadProps {
  userId: string
  userEmail: string | undefined
}

export default function CreateThread({ userId, userEmail }: CreateThreadProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
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
      // Insert the thread into the database
      const { data, error: threadError } = await supabase
        .from('threads')
        .insert([
          {
            title,
            content,
            user_id: userId,
            is_pinned: false,
            is_locked: false,
            view_count: 0,
            post_count: 0,
          }
        ])
        .select('id')
        .single()

      if (threadError) throw threadError

      // Reset the form
      setTitle('')
      setContent('')
      setIsExpanded(false)
      
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

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Start a new discussion</CardTitle>
        {userEmail && (
          <p className="text-sm text-gray-500">Posting as {userEmail}</p>
        )}
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title your discussion"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                onClick={() => !isExpanded && setIsExpanded(true)}
              />
            </div>
            
            {isExpanded && (
              <FadeIn>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What would you like to discuss?"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </FadeIn>
            )}
          </div>
        </CardContent>
        
        {isExpanded && (
          <CardFooter className="flex justify-end space-x-2 bg-gray-50">
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Post Discussion'}
            </Button>
          </CardFooter>
        )}
      </form>
    </Card>
  )
} 