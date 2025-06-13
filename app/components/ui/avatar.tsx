'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AvatarProps {
  src?: string | null
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  onClick?: () => void
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg'
}

export default function Avatar({ src, name, size = 'md', className = '', onClick }: AvatarProps) {
  const getUserInitial = () => {
    return name[0]?.toUpperCase() || 'U'
  }

  const baseClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 shadow-md overflow-hidden ${className}`

  const avatarContent = src ? (
    <Image
      src={src}
      alt={`${name}'s avatar`}
      width={64}
      height={64}
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-white font-medium">
      {getUserInitial()}
    </span>
  )

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseClasses} cursor-pointer hover:shadow-lg transition-shadow`}
      >
        {avatarContent}
      </motion.button>
    )
  }

  return (
    <div className={baseClasses}>
      {avatarContent}
    </div>
  )
} 