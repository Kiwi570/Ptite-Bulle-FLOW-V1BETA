// ═══════════════════════════════════════════════════════════════════════════
// 🎮 DEMO BAR - Barre de mode démo
// Affiche le statut démo et permet le reset
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, RotateCcw, Clock, X, Sparkles, CheckCircle
} from 'lucide-react'
import clsx from 'clsx'
import { useDemo } from '@/hooks/useUtils'

export function DemoBar() {
  const { isDemoMode, demoElapsed, startDemo, stopDemo, resetDemo } = useDemo()
  const [showToast, setShowToast] = useState(false)
  
  // Formater le temps écoulé
  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) return `${hours}h ${minutes % 60}min`
    if (minutes > 0) return `${minutes}min ${seconds % 60}s`
    return `${seconds}s`
  }
  
  // Timer live
  const [elapsed, setElapsed] = useState(demoElapsed)
  
  useEffect(() => {
    if (!isDemoMode) return
    
    const interval = setInterval(() => {
      setElapsed(Date.now() - (demoElapsed ? Date.now() - demoElapsed : Date.now()))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isDemoMode, demoElapsed])
  
  const handleReset = () => {
    setShowToast(true)
    setTimeout(() => {
      resetDemo()
    }, 500)
  }
  
  // Si pas en mode démo, afficher le bouton pour l'activer
  if (!isDemoMode) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-50"
      >
        <button
          onClick={startDemo}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-core to-vision rounded-full text-white text-sm font-medium shadow-lg shadow-core/30 hover:shadow-core/50 transition-shadow"
        >
          <Play className="w-4 h-4" />
          Mode Démo
        </button>
      </motion.div>
    )
  }
  
  return (
    <>
      {/* Barre de démo */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-core via-vision to-tribe"
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-white/90">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium text-sm">Mode Démo</span>
            </div>
            <div className="flex items-center gap-1 text-white/70 text-xs">
              <Clock className="w-3 h-3" />
              {formatTime(elapsed)}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-white text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
            <button
              onClick={stopDemo}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Toast de confirmation reset */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 bg-flow rounded-xl text-white shadow-lg"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Données réinitialisées !</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default DemoBar
