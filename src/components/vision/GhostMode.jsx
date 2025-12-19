// ═══════════════════════════════════════════════════════════════════════════
// 👻 GHOST MODE - Observer un visiteur en temps réel
// Suivre le parcours d'un visiteur spécifique
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Ghost, X, Eye, Clock, MousePointer, Scroll, 
  ShoppingCart, ArrowRight, Sparkles, AlertTriangle,
  CheckCircle, Target
} from 'lucide-react'
import clsx from 'clsx'
import { Button, Badge } from '@/components/ui'

export function GhostMode({ 
  visitor, 
  pages,
  onClose,
  className 
}) {
  const [timeOnPage, setTimeOnPage] = useState(0)
  const [prediction, setPrediction] = useState(null)
  
  // Timer temps sur la page actuelle
  useEffect(() => {
    if (!visitor) return
    
    const startTime = visitor.lastActivity
    const interval = setInterval(() => {
      setTimeOnPage(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [visitor?.lastActivity])
  
  // Prédiction basée sur le comportement
  useEffect(() => {
    if (!visitor) return
    
    const { currentPage, scrollDepth, clicks, hasCart, path } = visitor
    
    // Logique de prédiction simple
    if (hasCart && currentPage.id === 'checkout') {
      setPrediction({ type: 'conversion', probability: 75, message: 'Conversion probable !' })
    } else if (hasCart && scrollDepth < 30 && timeOnPage > 60) {
      setPrediction({ type: 'abandon', probability: 60, message: 'Risque d\'abandon panier' })
    } else if (currentPage.id === 'pricing' && scrollDepth > 70 && clicks > 3) {
      setPrediction({ type: 'interest', probability: 80, message: 'Très intéressé par l\'offre' })
    } else if (path.length > 4) {
      setPrediction({ type: 'engaged', probability: 70, message: 'Visiteur engagé' })
    } else {
      setPrediction(null)
    }
  }, [visitor, timeOnPage])
  
  if (!visitor) return null
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  const sessionDuration = Math.floor((Date.now() - visitor.startTime) / 1000)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={clsx(
        'bg-pulse-bg/95 backdrop-blur-xl rounded-2xl border border-tribe/30',
        'shadow-2xl shadow-tribe/20 overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-tribe/20 to-transparent border-b border-pulse-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-full bg-tribe/20 flex items-center justify-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Ghost className="w-5 h-5 text-tribe" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2">
                Mode Fantôme
                <Badge variant="tribe" size="sm">LIVE</Badge>
              </h3>
              <p className="text-xs text-gray-400">
                {visitor.country.flag} {visitor.device.icon} • {visitor.source.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-pulse-surface rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
      
      {/* Current page highlight */}
      <div className="p-4 border-b border-pulse-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Page actuelle</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-white font-mono">{formatTime(timeOnPage)}</span>
          </div>
        </div>
        
        <motion.div
          key={visitor.currentPage.id}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 rounded-xl border-2"
          style={{ 
            borderColor: visitor.currentPage.color,
            backgroundColor: `${visitor.currentPage.color}10`
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${visitor.currentPage.color}30` }}
            >
              <Target className="w-6 h-6" style={{ color: visitor.currentPage.color }} />
            </div>
            <div>
              <h4 className="font-semibold text-white text-lg">{visitor.currentPage.name}</h4>
              <p className="text-sm text-gray-400">{visitor.currentPage.path}</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Stats en temps réel */}
      <div className="p-4 grid grid-cols-3 gap-3 border-b border-pulse-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Scroll className="w-4 h-4 text-vision" />
          </div>
          <div className="text-xl font-bold text-white">{visitor.scrollDepth}%</div>
          <div className="text-xs text-gray-400">Scroll</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <MousePointer className="w-4 h-4 text-flow" />
          </div>
          <div className="text-xl font-bold text-white">{visitor.clicks}</div>
          <div className="text-xs text-gray-400">Clics</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Eye className="w-4 h-4 text-tribe" />
          </div>
          <div className="text-xl font-bold text-white">{visitor.pagesViewed}</div>
          <div className="text-xs text-gray-400">Pages</div>
        </div>
      </div>
      
      {/* Panier */}
      {visitor.hasCart && (
        <div className="p-4 border-b border-pulse-border">
          <div className="flex items-center justify-between p-3 bg-vault/10 border border-vault/30 rounded-xl">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-5 h-5 text-vault" />
              <span className="text-white font-medium">Panier actif</span>
            </div>
            <span className="text-xl font-bold text-vault">{visitor.cartValue}€</span>
          </div>
        </div>
      )}
      
      {/* Parcours */}
      <div className="p-4 border-b border-pulse-border">
        <h4 className="text-sm text-gray-400 mb-3">Parcours</h4>
        <div className="flex items-center gap-2 flex-wrap">
          {visitor.path.map((pageId, index) => {
            const page = pages.find(p => p.id === pageId)
            if (!page) return null
            
            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                )}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-2 py-1 rounded-lg text-xs font-medium"
                  style={{ 
                    backgroundColor: `${page.color}20`,
                    color: page.color
                  }}
                >
                  {page.name}
                </motion.div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
      
      {/* Prédiction IA */}
      <AnimatePresence>
        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 border-b border-pulse-border"
          >
            <div className={clsx(
              'p-4 rounded-xl border',
              prediction.type === 'conversion' && 'bg-flow/10 border-flow/30',
              prediction.type === 'abandon' && 'bg-error/10 border-error/30',
              prediction.type === 'interest' && 'bg-vision/10 border-vision/30',
              prediction.type === 'engaged' && 'bg-tribe/10 border-tribe/30',
            )}>
              <div className="flex items-start gap-3">
                <div className={clsx(
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  prediction.type === 'conversion' && 'bg-flow/20',
                  prediction.type === 'abandon' && 'bg-error/20',
                  prediction.type === 'interest' && 'bg-vision/20',
                  prediction.type === 'engaged' && 'bg-tribe/20',
                )}>
                  {prediction.type === 'conversion' && <CheckCircle className="w-5 h-5 text-flow" />}
                  {prediction.type === 'abandon' && <AlertTriangle className="w-5 h-5 text-error" />}
                  {prediction.type === 'interest' && <Sparkles className="w-5 h-5 text-vision" />}
                  {prediction.type === 'engaged' && <Target className="w-5 h-5 text-tribe" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{prediction.message}</span>
                    <Badge 
                      variant={
                        prediction.type === 'conversion' ? 'success' :
                        prediction.type === 'abandon' ? 'error' : 'info'
                      }
                    >
                      {prediction.probability}%
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Prédiction basée sur le comportement
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer avec stats session */}
      <div className="p-4 bg-pulse-surface/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Durée session</span>
          <span className="text-white font-mono">{formatTime(sessionDuration)}</span>
        </div>
      </div>
    </motion.div>
  )
}

// Liste des visiteurs pour sélection Ghost Mode
export function VisitorSelector({ visitors, onSelect, className }) {
  return (
    <div className={clsx('space-y-2', className)}>
      <h4 className="text-sm text-gray-400 mb-3 flex items-center gap-2">
        <Ghost className="w-4 h-4" />
        Sélectionner un visiteur à observer
      </h4>
      
      <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
        {visitors.slice(0, 15).map((visitor, index) => (
          <motion.button
            key={visitor.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => onSelect(visitor.id)}
            className="w-full flex items-center gap-3 p-3 bg-pulse-surface/50 hover:bg-pulse-surface rounded-xl transition-colors text-left group"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{visitor.country.flag}</span>
              <span className="text-lg">{visitor.device.icon}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white truncate">
                  {visitor.currentPage.name}
                </span>
                {visitor.hasCart && (
                  <Badge variant="vault" size="sm">{visitor.cartValue}€</Badge>
                )}
              </div>
              <div className="text-xs text-gray-400">
                {visitor.pagesViewed} pages • {visitor.source.name}
              </div>
            </div>
            
            <Ghost className="w-4 h-4 text-gray-500 group-hover:text-tribe transition-colors" />
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default GhostMode
