'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { useUser } from '@/app/hooks/useUser'
import { motion } from 'framer-motion'
import { PageTransition, FadeIn } from '@/app/components/ui/transitions'
import AvatarUpload from '@/app/components/ui/avatar-upload'

export default function ProfilePage() {
  const { user, profile, isLoading } = useUser()
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (profile) {
      setUsername(profile.display_name || '')
      setBio(profile.bio || '')
      setAvatarUrl(profile.avatar_url || null)
    }
  }, [profile])

  const checkUsernameAvailability = async (usernameToCheck: string) => {
    if (!usernameToCheck.trim() || usernameToCheck === profile?.display_name) {
      setIsUsernameAvailable(null)
      return
    }

    setCheckingUsername(true)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('display_name', usernameToCheck.trim())
        .single()

      if (error && error.code === 'PGRST116') {
        // No rows found - username is available
        setIsUsernameAvailable(true)
      } else if (data) {
        // Username exists
        setIsUsernameAvailable(false)
      }
    } catch {
      setCheckingUsername(false)
      return false
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value
    setUsername(newUsername)
    
    // Debounce username checking
    if (newUsername.trim() && newUsername !== profile?.display_name) {
      const timeoutId = setTimeout(() => {
        checkUsernameAvailability(newUsername)
      }, 500)
      
      return () => clearTimeout(timeoutId)
    } else {
      setIsUsernameAvailable(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || saving) return

    // Validate username
    if (username.trim()) {
      if (username.length < 3) {
        setError('Username must be at least 3 characters long')
        return
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        setError('Username can only contain letters, numbers, and underscores')
        return
      }
      if (isUsernameAvailable === false) {
        setError('This username is already taken')
        return
      }
    }

    setSaving(true)
    setError(null)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email!,
          display_name: username.trim() || null,
          bio: bio.trim() || null,
          avatar_url: avatarUrl,
        })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch {
      setError('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading profile...</p>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <PageTransition>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FadeIn>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="text-center mb-8">
                <div className="mb-6">
                  <AvatarUpload
                    currentAvatarUrl={avatarUrl}
                    onAvatarUpdate={setAvatarUrl}
                    userName={username || user.email || 'User'}
                  />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
                <p className="text-gray-600">Customize your profile and username</p>
              </div>

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center space-x-3"
                >
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Profile updated successfully! Redirecting...</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={user.email || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username (optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={handleUsernameChange}
                      placeholder="Choose a unique username"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                        isUsernameAvailable === true
                          ? 'border-green-300 focus:border-green-500'
                          : isUsernameAvailable === false
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-gray-300 focus:border-purple-500'
                      }`}
                    />
                    {checkingUsername && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    {!checkingUsername && isUsernameAvailable === true && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {!checkingUsername && isUsernameAvailable === false && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Username must be at least 3 characters and contain only letters, numbers, and underscores.
                    {!username.trim() && ' If no username is set, your email will be displayed.'}
                  </p>
                  {isUsernameAvailable === true && (
                    <p className="text-xs text-green-600 mt-1">✓ Username is available</p>
                  )}
                  {isUsernameAvailable === false && (
                    <p className="text-xs text-red-600 mt-1">✗ Username is already taken</p>
                  )}
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    Bio (optional)
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us a bit about yourself..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                  />
                </div>

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

                <div className="flex space-x-4">
                  <motion.button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={saving || Boolean(username.trim() && isUsernameAvailable === false)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: saving ? 1 : 1.01 }}
                    whileTap={{ scale: saving ? 1 : 0.99 }}
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save Profile</span>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </PageTransition>
    </div>
  )
} 