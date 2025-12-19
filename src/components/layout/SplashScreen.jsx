// ═══════════════════════════════════════════════════════════════════════════
// 🌟 SPLASH SCREEN - Écran de chargement animé
// Animation d'entrée avec logo PULSE
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(0)
  
  useEffect(() => {
    // Phase 1: Logo apparaît
    const t1 = setTimeout(() => setPhase(1), 300)
    // Phase 2: Texte apparaît
    const t2 = setTimeout(() => setPhase(2), 800)
    // Phase 3: Loading bar
    const t3 = setTimeout(() => setPhase(3), 1200)
    // Phase 4: Disparition
    const t4 = setTimeout(() => setPhase(4), 2200)
    // Complete
    const t5 = setTimeout(() => onComplete?.(), 2700)
    
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, [onComplete])
  
  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-pulse-bg flex flex-col items-center justify-center"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-core via-vision via-tribe via-flow to-vault opacity-10 blur-3xl"
            />
          </div>
          
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={phase >= 1 ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative"
          >
            {/* Cercles concentriques */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#pulseGradient)"
                  strokeWidth="1"
                  strokeDasharray="10 5"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F472B6" />
                    <stop offset="50%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            
            {/* Cœur central */}
            <motion.div
              animate={phase >= 1 ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-core via-vision to-tribe flex items-center justify-center shadow-2xl shadow-core/50"
            >
              <span className="text-4xl">🫀</span>
            </motion.div>
          </motion.div>
          
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-core via-vision to-tribe bg-clip-text text-transparent">
              PULSE
            </h1>
            <p className="text-gray-400 mt-2">Le cœur de ton business</p>
          </motion.div>
          
          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : {}}
            className="mt-8 w-48 h-1 bg-pulse-surface rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={phase >= 3 ? { x: '100%' } : {}}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="h-full w-full bg-gradient-to-r from-core via-vision to-tribe"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SplashScreen
