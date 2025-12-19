// ═══════════════════════════════════════════════════════════════════════════
// 👥 LIVE VISITOR FEED - Flux de visiteurs temps réel
// Animations d'arrivée, conversion, abandon
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, Eye, ShoppingCart, CreditCard, LogOut,
  ArrowRight, Sparkles, AlertTriangle, Star
} from 'lucide-react'
import clsx from 'clsx'
import { Badge } from '@/components/ui'

// Animation d'une étoile filante pour nouvelle arrivée
function ShootingStar({ onComplete }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ x: -50, y: -20, opacity: 1 }}
      animate={{ x: 150, y: 100, opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      onAnimationComplete={onComplete}
    >
      <div className="relative">
        <Star className="w-4 h-4 text-vision" fill="currentColor" />
        <motion.div
          className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-l from-vision to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
        />
      </div>
    </motion.div>
  )
}

// Animation de conversion (flash doré + particules)
function ConversionBurst({ onComplete }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1 }}
      onAnimationComplete={onComplete}
    >
      {/* Flash central */}
      <motion.div
        className="w-20 h-20 rounded-full bg-vault"
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Particules */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-vault"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos((i / 8) * Math.PI * 2) * 60,
            y: Math.sin((i / 8) * Math.PI * 2) * 60,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      ))}
      
      {/* Emoji célébration */}
      <motion.span
        className="absolute text-3xl"
        initial={{ scale: 0, y: 0 }}
        animate={{ scale: [0, 1.5, 1], y: -30 }}
        transition={{ duration: 0.5 }}
      >
        🎉
      </motion.span>
    </motion.div>
  )
}

// Animation d'abandon (pulse rouge)
function AbandonPulse({ onComplete }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.5, 0] }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={onComplete}
    >
      <div className="w-full h-full bg-error/20 rounded-xl" />
    </motion.div>
  )
}

// Carte d'événement
function EventCard({ event, onAnimationComplete }) {
  const [showAnimation, setShowAnimation] = useState(true)
  
  const getEventConfig = () => {
    switch (event.type) {
      case 'arrival':
        return {
          icon: Star,
          color: 'vision',
          label: 'Nouvelle visite',
          detail: `${event.visitor.country.flag} ${event.visitor.device.icon} → ${event.page.name}`,
        }
      case 'navigate':
        return {
          icon: ArrowRight,
          color: 'tribe',
          label: 'Navigation',
          detail: `${event.from} → ${event.to.name}`,
        }
      case 'conversion':
        return {
          icon: CreditCard,
          color: 'vault',
          label: 'Conversion !',
          detail: `${event.value}€`,
          highlight: true,
        }
      case 'cart_abandon':
        return {
          icon: ShoppingCart,
          color: 'error',
          label: 'Panier abandonné',
          detail: `${event.value}€ perdus`,
          warning: true,
        }
      default:
        return {
          icon: Eye,
          color: 'gray',
          label: 'Activité',
          detail: '',
        }
    }
  }
  
  const config = getEventConfig()
  const Icon = config.icon
  const timeAgo = Math.floor((Date.now() - event.timestamp) / 1000)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.8 }}
      className={clsx(
        'relative flex items-center gap-3 p-3 rounded-xl transition-colors',
        config.highlight && 'bg-vault/10 border border-vault/30',
        config.warning && 'bg-error/10 border border-error/30',
        !config.highlight && !config.warning && 'bg-pulse-surface/50 hover:bg-pulse-surface'
      )}
    >
      {/* Animation spéciale */}
      {showAnimation && event.type === 'conversion' && (
        <ConversionBurst onComplete={() => setShowAnimation(false)} />
      )}
      {showAnimation && event.type === 'cart_abandon' && (
        <AbandonPulse onComplete={() => setShowAnimation(false)} />
      )}
      
      {/* Icon */}
      <div className={clsx(
        'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
        `bg-${config.color}/20`
      )}>
        <Icon className={`w-5 h-5 text-${config.color}`} />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={clsx(
            'text-sm font-medium',
            config.highlight ? 'text-vault' : config.warning ? 'text-error' : 'text-white'
          )}>
            {config.label}
          </span>
          {config.highlight && (
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              ✨
            </motion.span>
          )}
        </div>
        <p className="text-xs text-gray-400 truncate">{config.detail}</p>
      </div>
      
      {/* Time */}
      <span className="text-xs text-gray-500">
        {timeAgo < 60 ? `${timeAgo}s` : `${Math.floor(timeAgo / 60)}m`}
      </span>
    </motion.div>
  )
}

// Compteur animé principal
export function LiveCounter({ count, label, icon: Icon, color = 'vision', pulse = true }) {
  const [displayCount, setDisplayCount] = useState(count)
  const [isIncreasing, setIsIncreasing] = useState(false)
  
  useEffect(() => {
    if (count !== displayCount) {
      setIsIncreasing(count > displayCount)
      setDisplayCount(count)
    }
  }, [count, displayCount])
  
  return (
    <motion.div 
      className="relative flex items-center gap-3"
      animate={isIncreasing ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Pulse effect */}
      {pulse && (
        <motion.div
          className={`absolute -inset-2 rounded-full bg-${color}/20`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      <div className={`relative w-14 h-14 rounded-full bg-${color}/20 flex items-center justify-center`}>
        <Icon className={`w-6 h-6 text-${color}`} />
      </div>
      
      <div>
        <motion.div
          key={count}
          initial={{ y: isIncreasing ? 10 : -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`text-3xl font-display font-bold text-${color}`}
        >
          {count}
        </motion.div>
        <p className="text-sm text-gray-400">{label}</p>
      </div>
    </motion.div>
  )
}

// Flux principal
export function LiveVisitorFeed({ events, className }) {
  const [displayedEvents, setDisplayedEvents] = useState([])
  const containerRef = useRef(null)
  
  useEffect(() => {
    // Limiter à 8 events max pour éviter overflow
    setDisplayedEvents(events.slice(0, 8))
  }, [events])
  
  return (
    <div className={clsx('space-y-3', className)} ref={containerRef}>
      <AnimatePresence mode="popLayout">
        {displayedEvents.map((event) => (
          <EventCard 
            key={event.id} 
            event={event}
          />
        ))}
      </AnimatePresence>
      
      {displayedEvents.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Eye className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p>En attente d'activité...</p>
        </div>
      )}
    </div>
  )
}

// Stats temps réel en barre
export function LiveStatsBar({ stats, className }) {
  return (
    <div className={clsx('flex items-center gap-6', className)}>
      <LiveCounter 
        count={stats.total} 
        label="Visiteurs live" 
        icon={Users} 
        color="vision"
      />
      
      <div className="h-12 w-px bg-pulse-border" />
      
      <div className="flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-vault" />
        <div>
          <span className="text-xl font-bold text-vault">{stats.conversions}</span>
          <p className="text-xs text-gray-400">Conversions</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-error" />
        <div>
          <span className="text-xl font-bold text-error">{stats.abandonedCarts}</span>
          <p className="text-xs text-gray-400">Abandons</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-flow" />
        <div>
          <span className="text-xl font-bold text-flow">{stats.avgTimeOnSite}s</span>
          <p className="text-xs text-gray-400">Temps moyen</p>
        </div>
      </div>
    </div>
  )
}

export default LiveVisitorFeed
