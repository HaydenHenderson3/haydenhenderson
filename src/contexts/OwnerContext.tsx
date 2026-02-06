import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface OwnerContextType {
  isOwner: boolean
  toggleOwnerMode: () => void
  enableOwnerMode: (password: string) => boolean
}

const OwnerContext = createContext<OwnerContextType | undefined>(undefined)

const OWNER_MODE_KEY = 'ownerMode'
const OWNER_PASSWORD = 'admin' // Simple password - can be changed

export function OwnerProvider({ children }: { children: ReactNode }) {
  const [isOwner, setIsOwner] = useState(() => {
    const stored = localStorage.getItem(OWNER_MODE_KEY)
    return stored === 'true'
  })

  useEffect(() => {
    localStorage.setItem(OWNER_MODE_KEY, String(isOwner))
  }, [isOwner])

  const toggleOwnerMode = () => {
    setIsOwner(prev => !prev)
  }

  const enableOwnerMode = (password: string): boolean => {
    if (password === OWNER_PASSWORD) {
      setIsOwner(true)
      return true
    }
    return false
  }

  return (
    <OwnerContext.Provider value={{ isOwner, toggleOwnerMode, enableOwnerMode }}>
      {children}
    </OwnerContext.Provider>
  )
}

export function useOwner() {
  const context = useContext(OwnerContext)
  if (context === undefined) {
    throw new Error('useOwner must be used within an OwnerProvider')
  }
  return context
}

