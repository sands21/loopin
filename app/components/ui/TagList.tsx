'use client'

interface TagListProps {
  tags: string[]
  maxVisible?: number
  size?: 'sm' | 'md'
  className?: string
}

export default function TagList({ 
  tags, 
  maxVisible = 3, 
  size = 'sm',
  className = '' 
}: TagListProps) {
  if (!tags || tags.length === 0) {
    return null
  }

  const visibleTags = tags.slice(0, maxVisible)
  const hiddenCount = Math.max(0, tags.length - maxVisible)

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {visibleTags.map((tag, index) => (
        <span
          key={index}
          className={`inline-flex items-center ${sizeClasses[size]} bg-gray-100 text-gray-700 rounded-full font-medium`}
        >
          #{tag}
        </span>
      ))}
      {hiddenCount > 0 && (
        <span className={`inline-flex items-center ${sizeClasses[size]} bg-gray-200 text-gray-600 rounded-full font-medium`}>
          +{hiddenCount}
        </span>
      )}
    </div>
  )
} 