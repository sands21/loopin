'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client'

interface FileUploadProps {
  onFileUpload: (url: string) => void
  onFileRemove: () => void
  currentFile?: string | null
  accept?: string
  maxSizeMB?: number
}

export default function FileUpload({ 
  onFileUpload, 
  onFileRemove, 
  currentFile, 
  accept = "image/*",
  maxSizeMB = 10 
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`)
      return
    }

    // Validate file type
    if (accept === "image/*" && !file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    setError(null)
    setUploading(true)

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = fileName // Remove 'uploads/' prefix as bucket is already specified

      console.log('Uploading file:', fileName)

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file)

      console.log('Upload result:', { uploadData, uploadError })

      if (uploadError) {
        console.error('Upload error details:', uploadError)
        throw uploadError
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath)

      console.log('Public URL:', urlData.publicUrl)

      onFileUpload(urlData.publicUrl)
    } catch (error) {
      console.error('Upload error:', error)
      setError(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    onFileRemove()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!currentFile && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer bg-gradient-to-br from-gray-50 to-white"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="space-y-3">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 font-medium">Uploading...</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Click to upload an image</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to {maxSizeMB}MB</p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Preview */}
      {currentFile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-gray-50 rounded-xl p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-16 h-16 rounded-lg border border-gray-200 overflow-hidden">
                <Image
                  src={currentFile}
                  alt="Uploaded preview"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Image uploaded</p>
                <p className="text-xs text-gray-500">Ready to post</p>
              </div>
            </div>
            
            <motion.button
              onClick={handleRemove}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-3"
        >
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">{error}</span>
        </motion.div>
      )}
    </div>
  )
} 