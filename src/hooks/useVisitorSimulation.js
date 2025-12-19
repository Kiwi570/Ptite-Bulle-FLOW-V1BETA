// ═══════════════════════════════════════════════════════════════════════════
// 🔄 HOOK - useVisitorSimulation
// Simulation avancée des visiteurs en temps réel
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useRef } from 'react'

// Pages du site avec positions sur la carte
export const SITE_PAGES = [
  { id: 'home', name: 'Accueil', path: '/', x: 50, y: 20, weight: 30, color: '#F472B6' },
  { id: 'features', name: 'Fonctionnalités', path: '/features', x: 25, y: 45, weight: 20, color: '#A78BFA' },
  { id: 'pricing', name: 'Tarifs', path: '/pricing', x: 75, y: 45, weight: 25, color: '#22D3EE' },
  { id: 'about', name: 'À propos', path: '/about', x: 15, y: 70, weight: 8, color: '#6B7280' },
  { id: 'blog', name: 'Blog', path: '/blog', x: 40, y: 70, weight: 10, color: '#34D399' },
  { id: 'contact', name: 'Contact', path: '/contact', x: 60, y: 70, weight: 5, color: '#F59E0B' },
  { id: 'checkout', name: 'Paiement', path: '/checkout', x: 85, y: 70, weight: 2, color: '#FBBF24' },
]

// Sources de trafic
const TRAFFIC_SOURCES = [
  { id: 'google', name: 'Google', icon: '🔍', weight: 40 },
  { id: 'direct', name: 'Direct', icon: '🔗', weight: 25 },
  { id: 'social', name: 'Réseaux', icon: '📱', weight: 20 },
  { id: 'referral', name: 'Referral', icon: '🔄', weight: 10 },
  { id: 'email', name: 'Email', icon: '📧', weight: 5 },
]

// Pays
const COUNTRIES = [
  { code: 'FR', flag: '🇫🇷', weight: 65 },
  { code: 'BE', flag: '🇧🇪', weight: 12 },
  { code: 'CH', flag: '🇨🇭', weight: 8 },
  { code: 'CA', flag: '🇨🇦', weight: 7 },
  { code: 'US', flag: '🇺🇸', weight: 5 },
  { code: 'MA', flag: '🇲🇦', weight: 3 },
]

// Devices
const DEVICES = [
  { id: 'desktop', icon: '🖥️', weight: 45 },
  { id: 'mobile', icon: '📱', weight: 48 },
  { id: 'tablet', icon: '📲', weight: 7 },
]

// Fonction utilitaire - sélection pondérée
function weightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  let random = Math.random() * totalWeight
  for (const item of items) {
    random -= item.weight
    if (random <= 0) return item
  }
  return items[0]
}

// Générer un visiteur unique
function createVisitor() {
  const source = weightedRandom(TRAFFIC_SOURCES)
  const country = weightedRandom(COUNTRIES)
  const device = weightedRandom(DEVICES)
  const entryPage = weightedRandom(SITE_PAGES)
  
  return {
    id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    source,
    country,
    device,
    currentPage: entryPage,
    entryPage,
    path: [entryPage.id],
    pagesViewed: 1,
    startTime: Date.now(),
    lastActivity: Date.now(),
    scrollDepth: Math.floor(Math.random() * 100),
    clicks: Math.floor(Math.random() * 5),
    isEngaged: Math.random() > 0.4,
    hasCart: false,
    cartValue: 0,
    isConverted: false,
    isGhost: false, // Pour le mode fantôme
  }
}

// Hook principal
export function useVisitorSimulation(options = {}) {
  const {
    initialCount = 35,
    minVisitors = 25,
    maxVisitors = 60,
    newVisitorInterval = 3000,
    actionInterval = 1000,
    enabled = true,
  } = options
  
  const [visitors, setVisitors] = useState([])
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    byPage: {},
    conversions: 0,
    abandonedCarts: 0,
    avgTimeOnSite: 0,
  })
  const [ghostVisitor, setGhostVisitor] = useState(null)
  
  const intervalsRef = useRef({ newVisitor: null, actions: null })
  
  // Initialiser les visiteurs
  useEffect(() => {
    if (!enabled) return
    
    const initial = Array.from({ length: initialCount }, createVisitor)
    setVisitors(initial)
    
    return () => {
      clearInterval(intervalsRef.current.newVisitor)
      clearInterval(intervalsRef.current.actions)
    }
  }, [enabled, initialCount])
  
  // Ajouter de nouveaux visiteurs
  useEffect(() => {
    if (!enabled) return
    
    intervalsRef.current.newVisitor = setInterval(() => {
      setVisitors(prev => {
        if (prev.length >= maxVisitors) return prev
        if (Math.random() > 0.6) return prev
        
        const newVisitor = createVisitor()
        
        // Event d'arrivée
        setEvents(e => [{
          id: Date.now(),
          type: 'arrival',
          visitor: newVisitor,
          page: newVisitor.entryPage,
          timestamp: Date.now(),
        }, ...e.slice(0, 14)])
        
        return [...prev, newVisitor]
      })
    }, newVisitorInterval + Math.random() * 2000)
    
    return () => clearInterval(intervalsRef.current.newVisitor)
  }, [enabled, maxVisitors, newVisitorInterval])
  
  // Actions des visiteurs (navigation, conversion, départ)
  useEffect(() => {
    if (!enabled) return
    
    intervalsRef.current.actions = setInterval(() => {
      setVisitors(prev => {
        const updated = [...prev]
        const toRemove = []
        
        updated.forEach((visitor, index) => {
          const timeSinceStart = Date.now() - visitor.startTime
          const random = Math.random()
          
          // Chance de partir (augmente avec le temps)
          const leaveChance = Math.min(0.02 + (timeSinceStart / 300000) * 0.1, 0.15)
          
          if (random < leaveChance && prev.length > minVisitors) {
            // Le visiteur part
            toRemove.push(visitor.id)
            
            // Event de départ
            if (visitor.hasCart && !visitor.isConverted) {
              setEvents(e => [{
                id: Date.now(),
                type: 'cart_abandon',
                visitor,
                value: visitor.cartValue,
                timestamp: Date.now(),
              }, ...e.slice(0, 14)])
            }
            return
          }
          
          // Chance de naviguer vers une autre page
          if (random < 0.15) {
            const possiblePages = SITE_PAGES.filter(p => p.id !== visitor.currentPage.id)
            const nextPage = weightedRandom(possiblePages)
            
            visitor.currentPage = nextPage
            visitor.path.push(nextPage.id)
            visitor.pagesViewed++
            visitor.lastActivity = Date.now()
            visitor.scrollDepth = Math.floor(Math.random() * 100)
            
            // Event de navigation
            setEvents(e => [{
              id: Date.now(),
              type: 'navigate',
              visitor,
              from: visitor.path[visitor.path.length - 2],
              to: nextPage,
              timestamp: Date.now(),
            }, ...e.slice(0, 14)])
            
            // Si sur pricing, chance d'ajouter au panier
            if (nextPage.id === 'pricing' && Math.random() > 0.7) {
              visitor.hasCart = true
              visitor.cartValue = [89, 199, 299, 499][Math.floor(Math.random() * 4)]
            }
            
            // Si sur checkout avec panier, chance de convertir
            if (nextPage.id === 'checkout' && visitor.hasCart && Math.random() > 0.5) {
              visitor.isConverted = true
              
              // Event de conversion 🎉
              setEvents(e => [{
                id: Date.now(),
                type: 'conversion',
                visitor,
                value: visitor.cartValue,
                timestamp: Date.now(),
              }, ...e.slice(0, 14)])
            }
          }
          
          // Mettre à jour scroll/clicks
          if (random < 0.3) {
            visitor.scrollDepth = Math.min(100, visitor.scrollDepth + Math.floor(Math.random() * 20))
            visitor.clicks += Math.random() > 0.7 ? 1 : 0
          }
        })
        
        return updated.filter(v => !toRemove.includes(v.id))
      })
    }, actionInterval)
    
    return () => clearInterval(intervalsRef.current.actions)
  }, [enabled, minVisitors, actionInterval])
  
  // Calculer les stats
  useEffect(() => {
    const byPage = {}
    SITE_PAGES.forEach(page => {
      byPage[page.id] = visitors.filter(v => v.currentPage.id === page.id).length
    })
    
    const conversions = events.filter(e => e.type === 'conversion').length
    const abandonedCarts = events.filter(e => e.type === 'cart_abandon').length
    
    const totalTime = visitors.reduce((sum, v) => sum + (Date.now() - v.startTime), 0)
    const avgTime = visitors.length > 0 ? totalTime / visitors.length / 1000 : 0
    
    setStats({
      total: visitors.length,
      byPage,
      conversions,
      abandonedCarts,
      avgTimeOnSite: Math.round(avgTime),
    })
  }, [visitors, events])
  
  // Activer le mode fantôme sur un visiteur
  const startGhostMode = useCallback((visitorId) => {
    const visitor = visitors.find(v => v.id === visitorId)
    if (visitor) {
      setGhostVisitor({ ...visitor, isGhost: true })
    }
  }, [visitors])
  
  // Arrêter le mode fantôme
  const stopGhostMode = useCallback(() => {
    setGhostVisitor(null)
  }, [])
  
  // Mettre à jour le ghost visitor s'il existe
  useEffect(() => {
    if (ghostVisitor) {
      const current = visitors.find(v => v.id === ghostVisitor.id)
      if (current) {
        setGhostVisitor({ ...current, isGhost: true })
      } else {
        // Le visiteur est parti
        setGhostVisitor(null)
      }
    }
  }, [visitors, ghostVisitor?.id])
  
  return {
    visitors,
    events,
    stats,
    ghostVisitor,
    startGhostMode,
    stopGhostMode,
    pages: SITE_PAGES,
  }
}

export default useVisitorSimulation
