'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface IdentityContextType {
  isAnonymousMode: boolean
  toggleAnonymousMode: () => void
  setAnonymousMode: (anonymous: boolean) => void
}

const IdentityContext = createContext<IdentityContextType | undefined>(undefined)

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [isAnonymousMode, setIsAnonymousMode] = useState(false)

  const toggleAnonymousMode = () => {
    setIsAnonymousMode(prev => !prev)
  }

  const setAnonymousMode = (anonymous: boolean) => {
    setIsAnonymousMode(anonymous)
  }

  return (
    <IdentityContext.Provider value={{
      isAnonymousMode,
      toggleAnonymousMode,
      setAnonymousMode
    }}>
      {children}
    </IdentityContext.Provider>
  )
}

export function useIdentity() {
  const context = useContext(IdentityContext)
  if (context === undefined) {
    throw new Error('useIdentity must be used within an IdentityProvider')
  }
  return context
} 