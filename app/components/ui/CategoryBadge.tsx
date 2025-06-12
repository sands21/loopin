'use client'

import { getCategoryById } from '@/lib/utils'

interface CategoryBadgeProps {
  categoryId: string
  size?: 'sm' | 'md'
  className?: string
}

export default function CategoryBadge({ 
  categoryId, 
  size = 'sm', 
  className = '' 
}: CategoryBadgeProps) {
  const category = getCategoryById(categoryId)
  
  if (!category) {
    return null
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  }

  return (
    <span className={`inline-flex items-center space-x-1 ${sizeClasses[size]} ${category.color} text-white rounded-full font-medium ${className}`}>
      <span>{category.icon}</span>
      <span>{category.name}</span>
    </span>
  )
} 