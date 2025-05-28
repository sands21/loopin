'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Thread } from '@/lib/supabase/types'
import { PageTransition } from '@/app/components/ui/transitions'
import ThreadList from '@/app/components/threads/thread-list'
import CreateThread from '@/app/components/threads/create-thread'
import { Button } from '@/app/components/ui/button'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export default function ThreadsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [threads, setThreads] = useState<Thread[]>([])
  const [threadsLoading, setThreadsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      // Always fetch threads, whether user is logged in or not
      fetchThreads()
    }
    getUser()
  }, [])

  async function fetchThreads() {
    try {
      setThreadsLoading(true)
      
      // Get threads first - no joins needed
      const { data: threadsData, error } = await supabase
        .from('threads')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })
      
      if (error) {
        throw error
      }

      if (!threadsData) {
        setThreads([])
        return
      }

      // Get unique user IDs
      const userIds = [...new Set(threadsData.map(thread => thread.user_id))]
      
      // Fetch profiles for these user IDs
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email')
        .in('id', userIds)
      
      if (profilesError) {
        console.error('Error fetching profiles:', profilesError)
        // Still show threads even if we can't get emails
        setThreads(threadsData.map(thread => ({ ...thread, user_email: null })) as Thread[])
        return
      }

      // Create a map for quick lookup
      const profileMap = new Map(profiles?.map(p => [p.id, p.email]) || [])

      // Combine threads with emails
      const threadsWithEmail = threadsData.map(thread => ({
        ...thread,
        user_email: profileMap.get(thread.user_id) || null
      })) as Thread[]

      setThreads(threadsWithEmail)
    } catch (error) {
      console.error('Error fetching threads:', error)
    } finally {
      setThreadsLoading(false)
    }
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <PageTransition>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">All Discussions</h1>
            {user ? (
              <span className="text-sm text-gray-600">
                Signed in as {user.email}
              </span>
            ) : (
              <Button onClick={handleLogin} size="sm">
                Sign in
              </Button>
            )}
          </div>

          {user && <CreateThread userId={user.id} userEmail={user.email} />}
          
          <div className="bg-white shadow rounded-lg p-6">
            <ThreadList threads={threads} loading={threadsLoading} />
          </div>
        </div>
      </PageTransition>
    </div>
  )
} 