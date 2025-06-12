'use client'

import { motion } from 'framer-motion'
import { CATEGORIES } from '@/lib/utils'

interface CategorySelectorProps {
  selectedCategory?: string
  onCategoryChange: (categoryId: string) => void
  className?: string
}

export default function CategorySelector({
  selectedCategory,
  onCategoryChange,
  className = ''
}: CategorySelectorProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        Category
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CATEGORIES.map((category) => (
          <motion.button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-3 rounded-xl border-2 transition-all duration-200 ${
              selectedCategory === category.id
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center text-white text-lg`}>
                {category.icon}
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </div>
          </motion.button>
        ))}
      </div>
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-sm text-gray-600"
        >
          {CATEGORIES.find(cat => cat.id === selectedCategory)?.description}
        </motion.div>
      )}
    </div>
  )
} 