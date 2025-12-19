// ═══════════════════════════════════════════════════════════════════════════
// 🗺️ SITEMAP - Carte Interactive du Site
// Visualisation des pages avec visiteurs en temps réel
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Users, MousePointer, Clock, TrendingUp, Zap } from 'lucide-react'
import clsx from 'clsx'

// Composant Zone de page
function PageZone({ page, visitorCount, maxVisitors, isSelected, onClick, connections }) {
  const intensity = Math.min(visitorCount / Math.max(maxVisitors, 1), 1)
  const size = 80 + intensity * 40
  
  // Couleur basée sur l'intensité (froid -> chaud)
  const getHeatColor = (intensity) => {
    if (intensity > 0.7) return 'rgba(239, 68, 68, 0.8)' // Rouge
    if (intensity > 0.5) return 'rgba(249, 115, 22, 0.7)' // Orange
    if (intensity > 0.3) return 'rgba(251, 191, 36, 0.6)' // Jaune
    if (intensity > 0.1) return 'rgba(34, 211, 238, 0.5)' // Cyan
    return 'rgba(107, 114, 128, 0.4)' // Gris
  }
  
  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ left: `${page.x}%`, top: `${page.y}%` }}
      onClick={() => onClick(page)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute rounded-full blur-xl"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: getHeatColor(intensity),
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Zone principale */}
      <motion.div
        className={clsx(
          'relative rounded-2xl flex flex-col items-center justify-center',
          'border-2 backdrop-blur-sm transition-all duration-300',
          isSelected 
            ? 'border-white bg-white/20' 
            : 'border-white/20 bg-pulse-surface/50 hover:border-white/40'
        )}
        style={{ width: size, height: size }}
        animate={{
          boxShadow: intensity > 0.3 
            ? `0 0 ${20 + intensity * 30}px ${getHeatColor(intensity)}`
            : 'none'
        }}
      >
        {/* Nom de la page */}
        <span className="text-white font-semibold text-sm text-center px-2">
          {page.name}
        </span>
        
        {/* Compteur visiteurs */}
        <div className="flex items-center gap-1 mt-1">
          <motion.div
            className="w-2 h-2 rounded-full bg-flow"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs text-gray-300">{visitorCount}</span>
        </div>
      </motion.div>
      
      {/* Visiteurs animés autour */}
      <AnimatePresence>
        {Array.from({ length: Math.min(visitorCount, 5) }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-vision"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
              x: Math.cos((i / 5) * Math.PI * 2) * (size / 2 + 10),
              y: Math.sin((i / 5) * Math.PI * 2) * (size / 2 + 10),
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: '50%',
              top: '50%',
            }}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

// Connexion entre pages (flux de navigation)
function PageConnection({ from, to, flow, maxFlow }) {
  const intensity = flow / Math.max(maxFlow, 1)
  const strokeWidth = 1 + intensity * 3
  
  // Points de contrôle pour courbe bezier
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2 - 10
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id={`gradient-${from.id}-${to.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={from.color} stopOpacity={0.6} />
          <stop offset="100%" stopColor={to.color} stopOpacity={0.6} />
        </linearGradient>
      </defs>
      
      <motion.path
        d={`M ${from.x}% ${from.y}% Q ${midX}% ${midY}% ${to.x}% ${to.y}%`}
        fill="none"
        stroke={`url(#gradient-${from.id}-${to.id})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: intensity * 0.8 }}
        transition={{ duration: 1 }}
      />
      
      {/* Particule animée sur le chemin */}
      {intensity > 0.2 && (
        <motion.circle
          r={3}
          fill={to.color}
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
          style={{
            offsetPath: `path("M ${from.x * 6} ${from.y * 4} Q ${midX * 6} ${midY * 4} ${to.x * 6} ${to.y * 4}")`,
          }}
        />
      )}
    </svg>
  )
}

// Composant principal SiteMap
export function SiteMap({ 
  pages, 
  visitors, 
  stats, 
  onPageSelect, 
  selectedPage,
  showConnections = true,
  showHeatmap = true,
  className 
}) {
  const [connections, setConnections] = useState([])
  
  // Calculer les connexions entre pages basées sur les parcours
  useEffect(() => {
    const flowMap = {}
    
    visitors.forEach(visitor => {
      const path = visitor.path
      for (let i = 0; i < path.length - 1; i++) {
        const key = `${path[i]}-${path[i + 1]}`
        flowMap[key] = (flowMap[key] || 0) + 1
      }
    })
    
    const conns = Object.entries(flowMap).map(([key, flow]) => {
      const [fromId, toId] = key.split('-')
      return {
        from: pages.find(p => p.id === fromId),
        to: pages.find(p => p.id === toId),
        flow,
      }
    }).filter(c => c.from && c.to)
    
    setConnections(conns)
  }, [visitors, pages])
  
  const maxVisitorsOnPage = useMemo(() => {
    return Math.max(...Object.values(stats.byPage || {}), 1)
  }, [stats.byPage])
  
  const maxFlow = useMemo(() => {
    return Math.max(...connections.map(c => c.flow), 1)
  }, [connections])
  
  return (
    <div className={clsx('relative w-full h-full min-h-[400px]', className)}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
      </div>
      
      {/* Connexions entre pages */}
      {showConnections && connections.map((conn, i) => (
        <PageConnection
          key={`${conn.from.id}-${conn.to.id}`}
          from={conn.from}
          to={conn.to}
          flow={conn.flow}
          maxFlow={maxFlow}
        />
      ))}
      
      {/* Zones de pages */}
      {pages.map(page => (
        <PageZone
          key={page.id}
          page={page}
          visitorCount={stats.byPage?.[page.id] || 0}
          maxVisitors={maxVisitorsOnPage}
          isSelected={selectedPage?.id === page.id}
          onClick={onPageSelect}
          connections={connections.filter(c => c.from.id === page.id || c.to.id === page.id)}
        />
      ))}
      
      {/* Légende */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500" />
          <span>Froid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span>Tiède</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span>Chaud</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span>Brûlant</span>
        </div>
      </div>
    </div>
  )
}

export default SiteMap
