// ═══════════════════════════════════════════════════════════════════════════
// 👁️ VISION V3 - Analytics MAGNIFIQUE
// Tracking temps réel, heatmaps, funnel conversion
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, Users, Clock, TrendingUp, MousePointer, Globe, Monitor, Smartphone,
  MapPin, ArrowRight, Zap, Target, Activity, BarChart3, Tablet
} from 'lucide-react'
import clsx from 'clsx'
import { Card, Button, Badge, HeroHeader, StatCard, Tabs, Divider } from '@/components/ui'

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════

const LIVE_VISITORS = [
  { id: 1, page: '/produits/serum-miracle', device: 'mobile', country: 'FR', duration: 245, source: 'Instagram' },
  { id: 2, page: '/checkout', device: 'desktop', country: 'FR', duration: 89, source: 'Google' },
  { id: 3, page: '/blog/routine-soin', device: 'mobile', country: 'BE', duration: 412, source: 'Direct' },
  { id: 4, page: '/produits', device: 'tablet', country: 'CH', duration: 156, source: 'Facebook' },
  { id: 5, page: '/', device: 'desktop', country: 'FR', duration: 34, source: 'Google' },
]

const TOP_PAGES = [
  { path: '/', views: 4523, avgTime: '1:45', bounce: 32 },
  { path: '/produits', views: 3241, avgTime: '2:12', bounce: 28 },
  { path: '/produits/serum-miracle', views: 2156, avgTime: '3:45', bounce: 18 },
  { path: '/blog', views: 1834, avgTime: '4:23', bounce: 42 },
  { path: '/contact', views: 987, avgTime: '1:12', bounce: 55 },
]

const TRAFFIC_SOURCES = [
  { name: 'Google', value: 42, color: '#22D3EE' },
  { name: 'Instagram', value: 28, color: '#F472B6' },
  { name: 'Direct', value: 15, color: '#A78BFA' },
  { name: 'Facebook', value: 10, color: '#34D399' },
  { name: 'Autres', value: 5, color: '#FBBF24' },
]

const FUNNEL_STEPS = [
  { name: 'Visiteurs', value: 10000, color: '#22D3EE' },
  { name: 'Page produit', value: 4200, color: '#A78BFA' },
  { name: 'Ajout panier', value: 1800, color: '#F472B6' },
  { name: 'Checkout', value: 850, color: '#FBBF24' },
  { name: 'Achat', value: 320, color: '#34D399' },
]

// ═══════════════════════════════════════════════════════════════════════════
// VISITEURS EN DIRECT
// ═══════════════════════════════════════════════════════════════════════════

function LiveVisitorsFeed() {
  const [visitors, setVisitors] = useState(LIVE_VISITORS)
  const [pulse, setPulse] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  
  const getDeviceIcon = (device) => {
    if (device === 'mobile') return Smartphone
    if (device === 'tablet') return Tablet
    return Monitor
  }
  
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <Card className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div 
            className={clsx('w-3 h-3 rounded-full bg-flow', pulse && 'glow-flow')}
            animate={{ scale: pulse ? [1, 1.5, 1] : 1 }}
          />
          <h3 className="text-xl font-bold text-white">En direct</h3>
          <Badge variant="flow" dot>{visitors.length} actifs</Badge>
        </div>
      </div>
      
      <div className="space-y-3">
        {visitors.map((visitor, i) => {
          const DeviceIcon = getDeviceIcon(visitor.device)
          return (
            <motion.div
              key={visitor.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-pulse-surface/50 hover:bg-pulse-surface transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-vision/20 flex items-center justify-center">
                <DeviceIcon className="w-5 h-5 text-vision" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{visitor.page}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {visitor.country}
                  </span>
                  <span>via {visitor.source}</span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-vision font-semibold">{formatDuration(visitor.duration)}</p>
                <p className="text-xs text-gray-500">sur la page</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNNEL DE CONVERSION
// ═══════════════════════════════════════════════════════════════════════════

function ConversionFunnel() {
  const maxValue = FUNNEL_STEPS[0].value
  
  return (
    <Card className="p-6 md:p-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <Target className="w-6 h-6 text-vision" />
        Funnel de conversion
      </h3>
      
      <div className="space-y-4">
        {FUNNEL_STEPS.map((step, i) => {
          const width = (step.value / maxValue) * 100
          const conversionRate = i > 0 ? ((step.value / FUNNEL_STEPS[i-1].value) * 100).toFixed(1) : 100
          
          return (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 font-medium">{step.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold">{step.value.toLocaleString()}</span>
                  {i > 0 && (
                    <Badge variant={parseFloat(conversionRate) > 30 ? 'success' : 'warning'} size="sm">
                      {conversionRate}%
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="h-10 bg-pulse-surface rounded-xl overflow-hidden">
                <motion.div
                  className="h-full rounded-xl flex items-center justify-end pr-4"
                  style={{ backgroundColor: step.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                >
                  {width > 20 && (
                    <span className="text-white text-sm font-semibold">{width.toFixed(0)}%</span>
                  )}
                </motion.div>
              </div>
              
              {i < FUNNEL_STEPS.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowRight className="w-4 h-4 text-gray-600 rotate-90" />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
      
      <Divider variant="subtle" />
      
      <div className="flex items-center justify-between pt-2">
        <span className="text-gray-400">Taux de conversion global</span>
        <span className="text-2xl font-bold text-flow">
          {((FUNNEL_STEPS[4].value / FUNNEL_STEPS[0].value) * 100).toFixed(2)}%
        </span>
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// SOURCES DE TRAFIC
// ═══════════════════════════════════════════════════════════════════════════

function TrafficSources() {
  return (
    <Card className="p-6 md:p-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <Globe className="w-6 h-6 text-vision" />
        Sources de trafic
      </h3>
      
      <div className="space-y-4">
        {TRAFFIC_SOURCES.map((source, i) => (
          <motion.div
            key={source.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">{source.name}</span>
              <span className="font-bold" style={{ color: source.color }}>{source.value}%</span>
            </div>
            <div className="h-3 bg-pulse-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: source.color }}
                initial={{ width: 0 }}
                animate={{ width: `${source.value}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// TOP PAGES
// ═══════════════════════════════════════════════════════════════════════════

function TopPages() {
  return (
    <Card className="p-6 md:p-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <BarChart3 className="w-6 h-6 text-vision" />
        Pages populaires
      </h3>
      
      <div className="space-y-3">
        {TOP_PAGES.map((page, i) => (
          <motion.div
            key={page.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-pulse-surface/50 hover:bg-pulse-surface transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-vision/20 flex items-center justify-center font-bold text-vision">
              {i + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate group-hover:text-vision transition-colors">
                {page.path}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{page.views.toLocaleString()} vues</span>
                <span>⏱️ {page.avgTime}</span>
              </div>
            </div>
            
            <Badge variant={page.bounce < 30 ? 'success' : page.bounce < 50 ? 'warning' : 'error'}>
              {page.bounce}% rebond
            </Badge>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════

export default function VisionPage() {
  const [activeTab, setActiveTab] = useState('realtime')
  
  const tabs = [
    { id: 'realtime', label: 'Temps réel', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ]
  
  return (
    <div className="space-y-8">
      <HeroHeader
        icon={Eye}
        title="Vision"
        subtitle="Analytics et tracking en temps réel"
        color="vision"
      >
        <Button variant="vision" icon={Eye}>Mode Ghost</Button>
      </HeroHeader>
      
      {/* Stats principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Visiteurs aujourd'hui" value={1247} icon={Users} color="vision" change={18} />
        <StatCard label="Pages vues" value={4523} icon={Eye} color="tribe" change={12} />
        <StatCard label="Temps moyen" value="2:34" icon={Clock} color="flow" />
        <StatCard label="Taux conversion" value={3.2} suffix="%" icon={Target} color="vault" change={5} />
      </div>
      
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {activeTab === 'realtime' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <LiveVisitorsFeed />
              <ConversionFunnel />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <TopPages />
              <TrafficSources />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
