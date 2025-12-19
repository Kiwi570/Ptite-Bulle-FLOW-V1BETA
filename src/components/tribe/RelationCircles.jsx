// ═══════════════════════════════════════════════════════════════════════════
// 🎯 RELATION CIRCLES - Cercles concentriques de relation client
// Ambassadeurs au centre → Perdus à l'extérieur
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Star, Heart, Zap, Moon, CloudOff, Sparkles } from 'lucide-react'
import clsx from 'clsx'

// Configuration des cercles
const CIRCLES_CONFIG = [
  { 
    id: 'ambassador', 
    label: 'Ambassadeurs', 
    emoji: '🔥',
    icon: Star,
    color: '#F472B6', // core
    radius: 60,
    description: 'Tes meilleurs clients'
  },
  { 
    id: 'fan', 
    label: 'Fans', 
    emoji: '💜',
    icon: Heart,
    color: '#A78BFA', // tribe
    radius: 100,
    description: 'Clients fidèles'
  },
  { 
    id: 'active', 
    label: 'Actifs', 
    emoji: '🟢',
    icon: Zap,
    color: '#34D399', // flow
    radius: 140,
    description: 'Clients réguliers'
  },
  { 
    id: 'dormant', 
    label: 'Dormants', 
    emoji: '🟡',
    icon: Moon,
    color: '#FBBF24', // vault
    radius: 180,
    description: 'À réactiver'
  },
  { 
    id: 'lost', 
    label: 'Perdus', 
    emoji: '🔴',
    icon: CloudOff,
    color: '#EF4444', // error
    radius: 220,
    description: 'Clients inactifs'
  },
  { 
    id: 'new', 
    label: 'Nouveaux', 
    emoji: '✨',
    icon: Sparkles,
    color: '#22D3EE', // vision
    radius: 260,
    description: 'Récemment acquis'
  },
]

export function RelationCircles({ 
  clientsByStatus, 
  selectedStatus, 
  onSelectStatus,
  className 
}) {
  const [hoveredCircle, setHoveredCircle] = useState(null)
  
  // Calculer le total
  const totalClients = useMemo(() => {
    return Object.values(clientsByStatus).reduce((sum, count) => sum + count, 0)
  }, [clientsByStatus])
  
  // Centre du SVG
  const centerX = 280
  const centerY = 280
  
  return (
    <div className={clsx('relative', className)}>
      <svg 
        viewBox="0 0 560 560" 
        className="w-full h-full max-w-md mx-auto"
      >
        {/* Cercles de fond (du plus grand au plus petit) */}
        {[...CIRCLES_CONFIG].reverse().map((circle, index) => {
          const count = clientsByStatus[circle.id] || 0
          const isSelected = selectedStatus === circle.id
          const isHovered = hoveredCircle === circle.id
          
          return (
            <g key={circle.id}>
              {/* Cercle de fond */}
              <motion.circle
                cx={centerX}
                cy={centerY}
                r={circle.radius}
                fill="transparent"
                stroke={circle.color}
                strokeWidth={isSelected ? 4 : isHovered ? 3 : 2}
                strokeOpacity={isSelected ? 0.8 : isHovered ? 0.6 : 0.3}
                className="cursor-pointer transition-all"
                onClick={() => onSelectStatus(selectedStatus === circle.id ? null : circle.id)}
                onMouseEnter={() => setHoveredCircle(circle.id)}
                onMouseLeave={() => setHoveredCircle(null)}
                initial={false}
                animate={{
                  strokeOpacity: isSelected ? 0.8 : isHovered ? 0.6 : 0.3,
                  strokeWidth: isSelected ? 4 : isHovered ? 3 : 2,
                }}
              />
              
              {/* Zone cliquable plus large */}
              <circle
                cx={centerX}
                cy={centerY}
                r={circle.radius}
                fill="transparent"
                stroke="transparent"
                strokeWidth={30}
                className="cursor-pointer"
                onClick={() => onSelectStatus(selectedStatus === circle.id ? null : circle.id)}
                onMouseEnter={() => setHoveredCircle(circle.id)}
                onMouseLeave={() => setHoveredCircle(null)}
              />
              
              {/* Glow effect si sélectionné */}
              {isSelected && (
                <motion.circle
                  cx={centerX}
                  cy={centerY}
                  r={circle.radius}
                  fill="transparent"
                  stroke={circle.color}
                  strokeWidth={8}
                  strokeOpacity={0.2}
                  initial={{ strokeOpacity: 0 }}
                  animate={{ strokeOpacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  filter="blur(4px)"
                />
              )}
            </g>
          )
        })}
        
        {/* Labels sur les cercles */}
        {CIRCLES_CONFIG.map((circle, index) => {
          const count = clientsByStatus[circle.id] || 0
          const isSelected = selectedStatus === circle.id
          const isHovered = hoveredCircle === circle.id
          
          // Position du label (sur le bord droit du cercle)
          const labelX = centerX + circle.radius - 10
          const labelY = centerY
          
          return (
            <g 
              key={`label-${circle.id}`}
              className="cursor-pointer"
              onClick={() => onSelectStatus(selectedStatus === circle.id ? null : circle.id)}
              onMouseEnter={() => setHoveredCircle(circle.id)}
              onMouseLeave={() => setHoveredCircle(null)}
            >
              {/* Badge avec count */}
              <motion.rect
                x={labelX - 15}
                y={labelY - 12}
                width={50}
                height={24}
                rx={12}
                fill={isSelected || isHovered ? circle.color : '#1A1A2E'}
                stroke={circle.color}
                strokeWidth={2}
                initial={false}
                animate={{
                  fill: isSelected || isHovered ? circle.color : '#1A1A2E',
                }}
              />
              <text
                x={labelX + 10}
                y={labelY + 5}
                textAnchor="middle"
                className="text-xs font-bold fill-white pointer-events-none"
              >
                {count}
              </text>
            </g>
          )
        })}
        
        {/* Centre - Total */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={40}
          className="cursor-pointer"
          fill="#12121A"
          stroke="#F472B6"
          strokeWidth={3}
          onClick={() => onSelectStatus(null)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          className="text-2xl font-bold fill-white pointer-events-none"
        >
          {totalClients}
        </text>
        <text
          x={centerX}
          y={centerY + 12}
          textAnchor="middle"
          className="text-xs fill-gray-400 pointer-events-none"
        >
          clients
        </text>
      </svg>
      
      {/* Légende */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {CIRCLES_CONFIG.map(circle => {
          const count = clientsByStatus[circle.id] || 0
          const isSelected = selectedStatus === circle.id
          
          return (
            <motion.button
              key={circle.id}
              onClick={() => onSelectStatus(selectedStatus === circle.id ? null : circle.id)}
              className={clsx(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all',
                isSelected 
                  ? 'text-white' 
                  : 'bg-pulse-surface/50 text-gray-400 hover:text-white'
              )}
              style={{
                backgroundColor: isSelected ? circle.color : undefined,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{circle.emoji}</span>
              <span className="hidden sm:inline">{circle.label}</span>
              <span className="font-bold">{count}</span>
            </motion.button>
          )
        })}
      </div>
      
      {/* Info bulle au hover */}
      <AnimatePresence>
        {hoveredCircle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-pulse-surface border border-pulse-border rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {CIRCLES_CONFIG.find(c => c.id === hoveredCircle)?.emoji}
              </span>
              <div>
                <div className="font-medium text-white">
                  {CIRCLES_CONFIG.find(c => c.id === hoveredCircle)?.label}
                </div>
                <div className="text-xs text-gray-400">
                  {CIRCLES_CONFIG.find(c => c.id === hoveredCircle)?.description}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Version mini pour le dashboard
export function MiniRelationCircles({ clientsByStatus, className }) {
  const total = Object.values(clientsByStatus).reduce((sum, c) => sum + c, 0)
  
  return (
    <div className={clsx('flex items-center gap-1', className)}>
      {CIRCLES_CONFIG.slice(0, 5).map((circle, i) => {
        const count = clientsByStatus[circle.id] || 0
        const percentage = total > 0 ? (count / total) * 100 : 0
        
        return (
          <motion.div
            key={circle.id}
            className="h-8 rounded-full"
            style={{ 
              backgroundColor: circle.color,
              width: `${Math.max(percentage, 5)}%`,
              minWidth: '20px'
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.1 }}
            title={`${circle.label}: ${count}`}
          />
        )
      })}
    </div>
  )
}

export default RelationCircles
