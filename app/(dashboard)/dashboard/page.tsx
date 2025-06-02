'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { Thread } from '@/lib/supabase/types'
import { Button } from '@/app/components/ui/button'
import { PageTransition } from '@/app/components/ui/transitions'
import ThreadList from '@/app/components/threads/thread-list'
import CreateThread from '@/app/components/threads/create-thread'
import Link from 'next/link'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const [threadsLoading, setThreadsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)

      if (user) {
        fetchThreads()
      }
    }
    getUser()
  }, [])

  async function fetchThreads() {
    try {
      setThreadsLoading(true)
      
      // Get threads first - no joins needed, limit to 5 most recent
      const { data: threadsData, error } = await supabase
        .from('threads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      
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

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <PageTransition>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Loopin Forum</h1>
            <div className="flex space-x-4 items-center">
              <span className="text-sm text-gray-600">
                {user?.email}
              </span>
              <Button
                variant="danger"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>

          {user && <CreateThread userId={user.id} userEmail={user.email} />}
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Discussions</h2>
              <Link href="/threads">
                <Button size="sm" variant="secondary">View All Discussions</Button>
              </Link>
            </div>
            <ThreadList threads={threads} loading={threadsLoading} />
          </div>
        </div>
      </PageTransition>
    </div>
  )
} 