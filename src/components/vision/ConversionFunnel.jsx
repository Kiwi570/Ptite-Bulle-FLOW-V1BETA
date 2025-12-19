// ═══════════════════════════════════════════════════════════════════════════
// 📊 CONVERSION FUNNEL - Entonnoir de conversion animé
// Visualisation du parcours utilisateur vers la conversion
// ═══════════════════════════════════════════════════════════════════════════

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, Eye, ShoppingCart, CreditCard, CheckCircle, TrendingDown } from 'lucide-react'
import clsx from 'clsx'

// Données de l'entonnoir par défaut
const DEFAULT_FUNNEL = [
  { id: 'visitors', label: 'Visiteurs', icon: Users, color: '#22D3EE' },
  { id: 'product_view', label: 'Vue produit', icon: Eye, color: '#A78BFA' },
  { id: 'add_cart', label: 'Ajout panier', icon: ShoppingCart, color: '#F59E0B' },
  { id: 'checkout', label: 'Checkout', icon: CreditCard, color: '#F472B6' },
  { id: 'purchase', label: 'Achat', icon: CheckCircle, color: '#34D399' },
]

export function ConversionFunnel({ 
  data,
  showDropoff = true,
  animated = true,
  className 
}) {
  // Données simulées si non fournies
  const funnelData = useMemo(() => {
    if (data) return data
    
    // Simuler un entonnoir réaliste
    let count = 18920 // Visiteurs totaux
    return DEFAULT_FUNNEL.map((step, index) => {
      const dropRate = [0, 0.55, 0.82, 0.55, 0.54][index] // Taux de perte
      count = index === 0 ? count : Math.floor(count * (1 - dropRate))
      return {
        ...step,
        count,
        percentage: index === 0 ? 100 : Math.round((count / 18920) * 100 * 10) / 10,
      }
    })
  }, [data])
  
  const maxCount = funnelData[0]?.count || 1
  
  return (
    <div className={clsx('space-y-4', className)}>
      {funnelData.map((step, index) => {
        const width = (step.count / maxCount) * 100
        const dropoff = index > 0 
          ? funnelData[index - 1].count - step.count 
          : 0
        const dropoffPercent = index > 0 
          ? Math.round((dropoff / funnelData[index - 1].count) * 100) 
          : 0
        
        const Icon = step.icon
        
        return (
          <div key={step.id}>
            {/* Dropoff indicator */}
            {showDropoff && index > 0 && dropoff > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="flex items-center gap-2 mb-2 ml-4"
              >
                <TrendingDown className="w-4 h-4 text-error" />
                <span className="text-xs text-error">
                  -{dropoff.toLocaleString()} ({dropoffPercent}% de perte)
                </span>
              </motion.div>
            )}
            
            {/* Funnel step */}
            <motion.div
              initial={animated ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative"
            >
              {/* Background bar */}
              <div className="h-16 bg-pulse-surface/30 rounded-xl overflow-hidden">
                {/* Progress bar */}
                <motion.div
                  className="h-full rounded-xl relative overflow-hidden"
                  initial={animated ? { width: 0 } : { width: `${width}%` }}
                  animate={{ width: `${width}%` }}
                  transition={{ delay: index * 0.15 + 0.2, duration: 0.8, ease: 'easeOut' }}
                  style={{ backgroundColor: `${step.color}30` }}
                >
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(90deg, ${step.color}40 0%, ${step.color}20 100%)`
                    }}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </motion.div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center px-4">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon */}
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}30` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: step.color }} />
                    </div>
                    
                    {/* Label */}
                    <div>
                      <span className="font-medium text-white">{step.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {step.percentage}% du total
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Count */}
                  <motion.span
                    initial={animated ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                    className="text-2xl font-display font-bold"
                    style={{ color: step.color }}
                  >
                    {step.count.toLocaleString()}
                  </motion.span>
                </div>
              </div>
              
              {/* Connector line */}
              {index < funnelData.length - 1 && (
                <div className="flex justify-center py-1">
                  <motion.div
                    className="w-0.5 h-4 bg-gradient-to-b"
                    style={{ 
                      backgroundImage: `linear-gradient(to bottom, ${step.color}, ${funnelData[index + 1].color})`
                    }}
                    initial={animated ? { scaleY: 0 } : false}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  />
                </div>
              )}
            </motion.div>
          </div>
        )
      })}
      
      {/* Conversion rate summary */}
      <motion.div
        initial={animated ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: funnelData.length * 0.15 }}
        className="mt-6 p-4 bg-flow/10 border border-flow/30 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-flow/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-flow" />
            </div>
            <div>
              <span className="text-white font-medium">Taux de conversion global</span>
              <p className="text-xs text-gray-400">
                {funnelData[funnelData.length - 1]?.count.toLocaleString()} conversions 
                sur {funnelData[0]?.count.toLocaleString()} visiteurs
              </p>
            </div>
          </div>
          <span className="text-3xl font-display font-bold text-flow">
            {funnelData[funnelData.length - 1]?.percentage}%
          </span>
        </div>
      </motion.div>
    </div>
  )
}

// Version mini pour dashboard
export function MiniFunnel({ data, className }) {
  const funnelData = data || [
    { count: 18920, color: '#22D3EE' },
    { count: 8450, color: '#A78BFA' },
    { count: 1520, color: '#F59E0B' },
    { count: 680, color: '#F472B6' },
    { count: 312, color: '#34D399' },
  ]
  
  const maxCount = funnelData[0].count
  
  return (
    <div className={clsx('flex items-end gap-1 h-16', className)}>
      {funnelData.map((step, index) => {
        const height = (step.count / maxCount) * 100
        
        return (
          <motion.div
            key={index}
            className="flex-1 rounded-t"
            style={{ backgroundColor: step.color }}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          />
        )
      })}
    </div>
  )
}

export default ConversionFunnel
