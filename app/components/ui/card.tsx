'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick
}) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${hover ? 'hover:shadow-md transition-shadow' : ''} ${className}`}
      whileHover={hover ? { y: -2 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

export const CardHeader: React.FC<{ 
  children: React.ReactNode
  className?: string 
}> = ({ children, className = '' }) => {
  return (
    <div className={`px-4 py-3 border-b border-gray-200 bg-gray-50 ${className}`}>
      {children}
    </div>
  )
}

export const CardContent: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export const CardFooter: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return (
    <div className={`px-4 py-3 border-t border-gray-200 bg-gray-50 ${className}`}>
      {children}
    </div>
  )
}

export const CardTitle: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return (
    <h3 className={`text-lg font-medium text-gray-900 ${className}`}>
      {children}
    </h3>
  )
}

export const CardDescription: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  )
} 