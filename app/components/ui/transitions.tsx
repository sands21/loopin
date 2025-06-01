'use client'

import { motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'

// Animation variants for page transitions
export const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

// Animation variants for staggered children
export const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Animation variants for individual items in a staggered list
export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

// Animation variants for hover effects
export const hoverVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
}

// Scroll-triggered animation variants
export const scrollFadeVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export const scrollSlideVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export const scrollScaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
  delay = 0
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  delay = 0
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={staggerVariants}
      transition={{ delayChildren: delay }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      className={className}
      variants={itemVariants}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

// Scroll-triggered animation components
interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  amount?: number
  once?: boolean
}

export const ScrollFadeIn: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  amount = 0.2,
  once = true
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount, once })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scrollFadeVariants}
    >
      {children}
    </motion.div>
  )
}

export const ScrollSlideIn: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  amount = 0.2,
  once = true
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount, once })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scrollSlideVariants}
    >
      {children}
    </motion.div>
  )
}

export const ScrollScaleIn: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  amount = 0.2,
  once = true
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount, once })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scrollScaleVariants}
    >
      {children}
    </motion.div>
  )
}

// Scroll-triggered stagger container
export const ScrollStaggerContainer: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  amount = 0.2,
  once = true
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount, once })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
} 