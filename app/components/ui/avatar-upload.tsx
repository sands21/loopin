'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client'

interface AvatarUploadProps {
  currentAvatarUrl?: string | null
  onAvatarUpdate: (url: string | null) => void
  userName: string
}

export default function AvatarUpload({ currentAvatarUrl, onAvatarUpdate, userName }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size (max 5MB for avatars)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    setError(null)
    setUploading(true)

    try {
      // Delete old avatar if exists
      if (currentAvatarUrl) {
        const oldFileName = currentAvatarUrl.split('/').pop()
        if (oldFileName) {
          await supabase.storage.from('uploads').remove([oldFileName])
        }
      }

      // Upload new file with unique name
      const fileName = `avatars/${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name}`

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(fileName, file)

      if (uploadError) {
        throw uploadError
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName)

      onAvatarUpdate(urlData.publicUrl)
    } catch {
      setError('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    onAvatarUpdate(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getUserInitial = () => {
    return userName[0]?.toUpperCase() || 'U'
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar Display */}
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
        >
          {currentAvatarUrl ? (
            <Image
              src={currentAvatarUrl}
              alt="Profile picture"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-2xl">
              {getUserInitial()}
            </span>
          )}
        </motion.div>

        {/* Loading Overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Upload/Remove Buttons */}
      <div className="flex space-x-3">
        <motion.button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? 'Uploading...' : currentAvatarUrl ? 'Change Photo' : 'Upload Photo'}
        </motion.button>

        {currentAvatarUrl && (
          <motion.button
            onClick={handleRemove}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            Remove
          </motion.button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Upload Instructions */}
      <p className="text-xs text-gray-500 text-center">
        PNG, JPG, GIF up to 5MB
      </p>
    </div>
  )
} 