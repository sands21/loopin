'use client'

import { useState, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { SUGGESTED_TAGS } from '@/lib/utils'

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  maxTags?: number
  className?: string
}

export default function TagInput({
  tags,
  onTagsChange,
  maxTags = 5,
  className = ''
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const addTag = () => {
    const trimmedValue = inputValue.trim().toLowerCase()
    if (trimmedValue && !tags.includes(trimmedValue) && tags.length < maxTags) {
      onTagsChange([...tags, trimmedValue])
      setInputValue('')
    }
  }

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index)
    onTagsChange(newTags)
  }

  const addSuggestedTag = (tag: string) => {
    if (!tags.includes(tag) && tags.length < maxTags) {
      onTagsChange([...tags, tag])
    }
  }

  const availableSuggestions = SUGGESTED_TAGS.filter(tag => !tags.includes(tag))

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        Tags ({tags.length}/{maxTags})
      </label>
      
      {/* Tag Input Area */}
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2 p-3 border border-gray-200 rounded-xl min-h-[52px] focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all">
          <AnimatePresence>
            {tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="p-0.5 hover:bg-purple-200 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={tags.length === 0 ? "Add tags (press Enter or comma to add)" : ""}
            disabled={tags.length >= maxTags}
            className="flex-1 min-w-[120px] outline-none bg-transparent placeholder-gray-400 disabled:opacity-50"
          />
        </div>
        
        {/* Suggestions */}
        <AnimatePresence>
          {showSuggestions && availableSuggestions.length > 0 && tags.length < maxTags && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-3"
            >
              <div className="text-xs font-medium text-gray-500 mb-2">Suggested tags:</div>
              <div className="flex flex-wrap gap-2">
                {availableSuggestions.slice(0, 8).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addSuggestedTag(tag)}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <p className="text-xs text-gray-500">
        Press Enter or comma to add tags. Use tags to help others find your thread.
      </p>
    </div>
  )
} 