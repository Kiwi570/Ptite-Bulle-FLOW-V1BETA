// ═══════════════════════════════════════════════════════════════════════════
// 🎣 HOOKS UTILITAIRES
// useMediaQuery, useDemo, useAnimateOnMount
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useMediaQuery - Détection responsive
// ─────────────────────────────────────────────────────────────────────────────
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    
    const listener = (e) => setMatches(e.matches)
    media.addEventListener('change', listener)
    
    return () => media.removeEventListener('change', listener)
  }, [query])
  
  return matches
}

// Shortcuts pratiques
export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)')
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1025px)')
}

// ─────────────────────────────────────────────────────────────────────────────
// useDemo - Mode démo avec reset
// ─────────────────────────────────────────────────────────────────────────────
const DEMO_KEY = 'pulse_demo_mode'
const DEMO_START_KEY = 'pulse_demo_start'

export function useDemo() {
  const [isDemoMode, setIsDemoMode] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(DEMO_KEY) === 'true'
  })
  
  const [demoStartTime, setDemoStartTime] = useState(() => {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem(DEMO_START_KEY)
    return stored ? parseInt(stored) : null
  })
  
  // Activer le mode démo
  const startDemo = useCallback(() => {
    const now = Date.now()
    localStorage.setItem(DEMO_KEY, 'true')
    localStorage.setItem(DEMO_START_KEY, now.toString())
    setIsDemoMode(true)
    setDemoStartTime(now)
  }, [])
  
  // Désactiver le mode démo
  const stopDemo = useCallback(() => {
    localStorage.removeItem(DEMO_KEY)
    localStorage.removeItem(DEMO_START_KEY)
    setIsDemoMode(false)
    setDemoStartTime(null)
  }, [])
  
  // Reset complet (recharge la page)
  const resetDemo = useCallback(() => {
    // Clear all pulse-related localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('pulse_')) {
        localStorage.removeItem(key)
      }
    })
    // Restart demo
    startDemo()
    // Reload page
    window.location.reload()
  }, [startDemo])
  
  // Temps écoulé en démo
  const demoElapsed = demoStartTime ? Date.now() - demoStartTime : 0
  
  return {
    isDemoMode,
    demoStartTime,
    demoElapsed,
    startDemo,
    stopDemo,
    resetDemo,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// useAnimateOnMount - Animation au montage
// ─────────────────────────────────────────────────────────────────────────────
export function useAnimateOnMount(delay = 0) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])
  
  return isVisible
}

// ─────────────────────────────────────────────────────────────────────────────
// useLocalStorage - Persistance locale
// ─────────────────────────────────────────────────────────────────────────────
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })
  
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue])
  
  return [storedValue, setValue]
}

export default {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useDemo,
  useAnimateOnMount,
  useLocalStorage,
}
