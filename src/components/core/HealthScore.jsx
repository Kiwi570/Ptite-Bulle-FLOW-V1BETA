// ═══════════════════════════════════════════════════════════════════════════
// 🫀 HEALTH SCORE - Le Cœur Battant de PULSE
// Le composant central qui montre la santé globale du business
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, Activity, Eye, Users, Mail, Wallet } from 'lucide-react'
import clsx from 'clsx'
import { usePulseStore } from '@/stores/pulseStore'

// Animation du battement de cœur
const heartbeatAnimation = {
  scale: [1, 1.05, 1, 1.03, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

export function HealthScore({ className }) {
  const { healthScore, subScores } = usePulseStore()
  const [displayScore, setDisplayScore] = useState(0)
  const [previousScore, setPreviousScore] = useState(healthScore)
  const [showChange, setShowChange] = useState(false)
  
  // Animation du score au chargement
  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = healthScore / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= healthScore) {
        setDisplayScore(healthScore)
        clearInterval(timer)
      } else {
        setDisplayScore(Math.round(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [healthScore])
  
  // Détection du changement de score
  useEffect(() => {
    if (healthScore !== previousScore) {
      setShowChange(true)
      const timer = setTimeout(() => setShowChange(false), 2000)
      setPreviousScore(healthScore)
      return () => clearTimeout(timer)
    }
  }, [healthScore, previousScore])
  
  const scoreChange = healthScore - previousScore
  const isPositive = scoreChange >= 0
  
  // Couleur en fonction du score
  const getScoreColor = (score) => {
    if (score >= 80) return { color: '#34D399', label: 'Excellent' }
    if (score >= 60) return { color: '#FBBF24', label: 'Bon' }
    if (score >= 40) return { color: '#F59E0B', label: 'À surveiller' }
    return { color: '#EF4444', label: 'Critique' }
  }
  
  const { color, label } = getScoreColor(healthScore)
  
  // Sous-scores avec icônes
  const subScoreItems = [
    { key: 'vision', label: 'Trafic', icon: Eye, score: subScores.vision, color: '#22D3EE' },
    { key: 'tribe', label: 'Clients', icon: Users, score: subScores.tribe, color: '#A78BFA' },
    { key: 'flow', label: 'Emails', icon: Mail, score: subScores.flow, color: '#34D399' },
    { key: 'vault', label: 'Finance', icon: Wallet, score: subScores.vault, color: '#FBBF24' },
  ]
  
  return (
    <div className={clsx('relative', className)}>
      {/* Conteneur principal avec effet glow */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={heartbeatAnimation}
      >
        {/* Cercle de fond avec glow */}
        <div className="relative">
          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-full blur-2xl opacity-30"
            style={{ backgroundColor: color }}
          />
          
          {/* SVG du cercle de progression */}
          <svg width="200" height="200" className="transform -rotate-90">
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="50%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Cercle de fond */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="12"
            />
            
            {/* Cercle de progression */}
            <motion.circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              filter="url(#glow)"
              strokeDasharray={2 * Math.PI * 85}
              initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
              animate={{ 
                strokeDashoffset: 2 * Math.PI * 85 * (1 - displayScore / 100) 
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
          
          {/* Contenu central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Score principal */}
            <motion.div
              className="text-6xl font-display font-bold text-white"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              {displayScore}
            </motion.div>
            
            {/* Label */}
            <motion.div
              className="text-sm font-medium mt-1"
              style={{ color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {label}
            </motion.div>
            
            {/* Icône de tendance */}
            <motion.div
              className="flex items-center gap-1 mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Activity className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">Santé Business</span>
            </motion.div>
          </div>
        </div>
        
        {/* Indicateur de changement */}
        <AnimatePresence>
          {showChange && scoreChange !== 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className={clsx(
                'absolute -top-2 right-0 flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
                isPositive ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {isPositive ? '+' : ''}{scoreChange}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Sous-scores */}
      <motion.div
        className="flex justify-center gap-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        {subScoreItems.map((item, index) => (
          <motion.div
            key={item.key}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
            </div>
            <span className="text-lg font-display font-bold text-white">
              {item.score}
            </span>
            <span className="text-xs text-gray-400">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// Version compacte pour la sidebar ou header
export function HealthScoreCompact({ className }) {
  const { healthScore } = usePulseStore()
  const { color } = getScoreColorCompact(healthScore)
  
  return (
    <motion.div 
      className={clsx('flex items-center gap-3', className)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative">
        <svg width="44" height="44" className="transform -rotate-90">
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="4"
          />
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 18}
            strokeDashoffset={2 * Math.PI * 18 * (1 - healthScore / 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
          {healthScore}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white">Santé</span>
        <span className="text-xs text-gray-400">Business</span>
      </div>
    </motion.div>
  )
}

function getScoreColorCompact(score) {
  if (score >= 80) return { color: '#34D399' }
  if (score >= 60) return { color: '#FBBF24' }
  if (score >= 40) return { color: '#F59E0B' }
  return { color: '#EF4444' }
}

export default HealthScore
