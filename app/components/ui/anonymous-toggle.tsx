'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useIdentity } from '../providers/identity-provider'

export default function AnonymousToggle() {
  const { isAnonymousMode, toggleAnonymousMode } = useIdentity()
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative flex items-center space-x-4">
      <motion.span 
        className={`text-sm font-semibold transition-colors duration-300 ${
          isAnonymousMode ? 'text-gray-400' : 'text-purple-700'
        }`}
        animate={{ 
          scale: isAnonymousMode ? 0.95 : 1.05,
          opacity: isAnonymousMode ? 0.7 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        Verified
      </motion.span>
      
      <div className="relative">
        <motion.button
          onClick={toggleAnonymousMode}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md hover:shadow-lg ${
            isAnonymousMode 
              ? 'bg-gradient-to-r from-gray-400 to-gray-500 focus:ring-gray-400' 
              : 'bg-gradient-to-r from-purple-600 to-blue-600 focus:ring-purple-500'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Track inner glow */}
          <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
            isAnonymousMode 
              ? 'bg-gray-300/30' 
              : 'bg-white/20'
          }`} />
          
          {/* Thumb */}
          <motion.div
            className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg border border-gray-200/50"
            animate={{
              x: isAnonymousMode ? 28 : 2,
            }}
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 30
            }}
          >
            {/* Thumb inner circle for visual depth */}
            <div className="absolute inset-0.5 bg-gradient-to-br from-white to-gray-50 rounded-full" />
            
            {/* Icon inside thumb */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: isAnonymousMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isAnonymousMode ? (
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )}
            </motion.div>
          </motion.div>
          
          {/* Active state indicator */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: isAnonymousMode 
                ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)" 
                : "inset 0 2px 4px rgba(147, 51, 234, 0.2)"
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ 
            opacity: showTooltip ? 1 : 0, 
            y: showTooltip ? 0 : 10, 
            scale: showTooltip ? 1 : 0.9 
          }}
          transition={{ duration: 0.2 }}
          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-lg pointer-events-none z-50 whitespace-nowrap"
        >
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          {isAnonymousMode ? 'Switch to verified posting' : 'Switch to anonymous posting'}
        </motion.div>
      </div>
      
      <motion.span 
        className={`text-sm font-semibold transition-colors duration-300 ${
          isAnonymousMode ? 'text-gray-700' : 'text-gray-400'
        }`}
        animate={{ 
          scale: isAnonymousMode ? 1.05 : 0.95,
          opacity: isAnonymousMode ? 1 : 0.7
        }}
        transition={{ duration: 0.2 }}
      >
        Anonymous
      </motion.span>
    </div>
  )
} 