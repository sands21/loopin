'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { Thread } from '@/lib/supabase/types'
import { getThreads } from '@/lib/utils'
import { Button } from '@/app/components/ui/button'
import { PageTransition } from '@/app/components/ui/transitions'
import ThreadList from '@/app/components/threads/thread-list'
import CreateThread from '@/app/components/threads/create-thread'
import Link from 'next/link'

type UserWithProfile = User & {
  display_name?: string | null
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserWithProfile | null>(null)
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const [threadsLoading, setThreadsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Fetch user's profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', user.id)
          .single()
        
        setUser({
          ...user,
          display_name: profile?.display_name
        })
        
        fetchThreadsData()
      } else {
        setUser(null)
      }
      
      setLoading(false)
    }
    getUser()
  }, [])

  async function fetchThreadsData() {
    try {
      setThreadsLoading(true)
      const threadsData = await getThreads()
      // Limit to 5 most recent for dashboard
      setThreads(threadsData.slice(0, 5))
    } catch {
      // Error handled silently for better UX
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
                {user?.display_name || user?.email}
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

          {user && <CreateThread userId={user.id} userEmail={user.display_name || user.email} />}
          
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