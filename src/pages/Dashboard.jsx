// ═══════════════════════════════════════════════════════════════════════════
// 🫀 DASHBOARD V3 - Vue d'ensemble MAGNIFIQUE
// Plus aéré, stats impactantes, hiérarchie visuelle claire
// ═══════════════════════════════════════════════════════════════════════════

import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Heart, Eye, Users, Mail, Wallet, TrendingUp, ShoppingCart,
  ArrowRight, Sparkles, Clock, Target, Zap, Star
} from 'lucide-react'
import clsx from 'clsx'
import { Card, StatCard, HeroHeader, Button, Badge, ProgressRing, Divider } from '@/components/ui'
import { usePulseStore } from '@/stores/pulseStore'
import { getClientStats } from '@/data/clients'

// ═══════════════════════════════════════════════════════════════════════════
// SCORE PRINCIPAL - Hero central
// ═══════════════════════════════════════════════════════════════════════════

function MainHealthScore() {
  const { healthScore } = usePulseStore()
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative"
    >
      <Card variant="featured" className="p-8 md:p-12 text-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-core/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-vision/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block"
          >
            <ProgressRing value={healthScore} size={200} strokeWidth={14} glow />
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-3">
            Score de Santé Business
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Ton business pulse fort ! Continue sur cette lancée.
          </p>
          
          {/* Mini stats */}
          <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-pulse-border">
            <div className="text-center">
              <p className="stat-medium text-flow">+12%</p>
              <p className="text-sm text-gray-500 mt-1">ce mois</p>
            </div>
            <div className="w-px h-12 bg-pulse-border" />
            <div className="text-center">
              <p className="stat-medium text-vault">3</p>
              <p className="text-sm text-gray-500 mt-1">alertes</p>
            </div>
            <div className="w-px h-12 bg-pulse-border" />
            <div className="text-center">
              <p className="stat-medium text-tribe">98%</p>
              <p className="text-sm text-gray-500 mt-1">objectif</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE CARDS - Accès rapide aux modules
// ═══════════════════════════════════════════════════════════════════════════

const MODULES = [
  { 
    id: 'vision', 
    name: 'Vision', 
    icon: Eye, 
    color: 'vision',
    path: '/vision',
    stat: '1.2k',
    label: 'visiteurs actifs',
    description: 'Analyse en temps réel'
  },
  { 
    id: 'tribe', 
    name: 'Tribu', 
    icon: Users, 
    color: 'tribe',
    path: '/tribe',
    stat: '847',
    label: 'clients',
    description: 'CRM & Pipeline'
  },
  { 
    id: 'flow', 
    name: 'Flow', 
    icon: Mail, 
    color: 'flow',
    path: '/flow',
    stat: '24',
    label: 'non lus',
    description: 'Inbox & Marketing'
  },
  { 
    id: 'vault', 
    name: 'Coffre', 
    icon: Wallet, 
    color: 'vault',
    path: '/vault',
    stat: '45.2k€',
    label: 'CA mensuel',
    description: 'Finances & Factures'
  },
]

function ModuleCard({ module, index }) {
  const colorClasses = {
    vision: { bg: 'bg-vision/10', text: 'text-vision', border: 'hover:border-vision/50', glow: 'group-hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]' },
    tribe: { bg: 'bg-tribe/10', text: 'text-tribe', border: 'hover:border-tribe/50', glow: 'group-hover:shadow-[0_0_40px_rgba(167,139,250,0.2)]' },
    flow: { bg: 'bg-flow/10', text: 'text-flow', border: 'hover:border-flow/50', glow: 'group-hover:shadow-[0_0_40px_rgba(52,211,153,0.2)]' },
    vault: { bg: 'bg-vault/10', text: 'text-vault', border: 'hover:border-vault/50', glow: 'group-hover:shadow-[0_0_40px_rgba(251,191,36,0.2)]' },
  }
  
  const colors = colorClasses[module.color]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={module.path} className="group block">
        <Card className={clsx('p-6 md:p-8 h-full transition-all duration-500', colors.border, colors.glow)}>
          <div className="flex items-start justify-between mb-6">
            <div className={clsx('stat-icon-sm', colors.bg)}>
              <module.icon className={clsx('w-7 h-7', colors.text)} />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-1">{module.name}</h3>
          <p className="text-sm text-gray-500 mb-6">{module.description}</p>
          
          <div className="pt-4 border-t border-pulse-border">
            <p className={clsx('stat-large', colors.text)}>{module.stat}</p>
            <p className="text-sm text-gray-400 mt-1">{module.label}</p>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// LUNA INSIGHTS - Assistant IA
// ═══════════════════════════════════════════════════════════════════════════

function LunaInsights() {
  const insights = [
    { icon: '🔥', text: '3 prospects chauds à contacter cette semaine', priority: 'high' },
    { icon: '📧', text: '12 emails en attente de réponse depuis 48h', priority: 'medium' },
    { icon: '💰', text: 'Facture #2024-087 en retard de paiement', priority: 'high' },
  ]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <motion.div 
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-core to-tribe flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-white">Luna</h3>
            <p className="text-gray-400">Ton assistant IA</p>
          </div>
          <Badge variant="flow" className="ml-auto" dot>Active</Badge>
        </div>
        
        <div className="space-y-4">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={clsx(
                'flex items-start gap-4 p-4 rounded-xl transition-all cursor-pointer',
                'hover:bg-pulse-surface-light',
                insight.priority === 'high' && 'border-l-3 border-core bg-core/5'
              )}
            >
              <span className="text-2xl">{insight.icon}</span>
              <p className="text-gray-300 flex-1">{insight.text}</p>
              {insight.priority === 'high' && (
                <Badge variant="error" size="sm">Urgent</Badge>
              )}
            </motion.div>
          ))}
        </div>
        
        <Button variant="ghost" className="w-full mt-6" icon={ArrowRight} iconPosition="right">
          Voir toutes les suggestions
        </Button>
      </Card>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// QUICK STATS - Métriques clés
// ═══════════════════════════════════════════════════════════════════════════

function QuickStats() {
  const stats = [
    { label: 'Chiffre du jour', value: 2847, prefix: '', suffix: '€', color: 'vault', icon: TrendingUp, change: 23 },
    { label: 'Commandes', value: 12, color: 'flow', icon: ShoppingCart, change: 8 },
    { label: 'Taux conversion', value: 3.2, suffix: '%', color: 'vision', icon: Target, change: -2 },
    { label: 'Score NPS', value: 72, color: 'tribe', icon: Star, change: 5 },
  ]
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1 }}
        >
          <StatCard {...stat} size="default" />
        </motion.div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// ACTIVITÉ RÉCENTE
// ═══════════════════════════════════════════════════════════════════════════

function RecentActivity() {
  const activities = [
    { icon: '💳', text: 'Nouvelle commande #2847', time: 'il y a 5 min', color: 'vault' },
    { icon: '👤', text: 'Marie Dupont a rejoint ta tribu', time: 'il y a 23 min', color: 'tribe' },
    { icon: '📧', text: 'Email ouvert par Jean Martin', time: 'il y a 1h', color: 'flow' },
    { icon: '👁️', text: 'Pic de trafic détecté', time: 'il y a 2h', color: 'vision' },
  ]
  
  return (
    <Card className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <Clock className="w-6 h-6 text-gray-400" />
          Activité récente
        </h3>
        <Badge variant="default">{activities.length} nouvelles</Badge>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-pulse-surface-light transition-all cursor-pointer"
          >
            <span className="text-2xl">{activity.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white truncate">{activity.text}</p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
            <div className={clsx('w-2 h-2 rounded-full', `bg-${activity.color}`)} />
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════

export default function Dashboard() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Hero Header */}
      <HeroHeader
        icon={Heart}
        title="Tableau de bord"
        subtitle="Vue d'ensemble de ton business"
        color="core"
      >
        <Button variant="primary" icon={Zap}>
          Actions rapides
        </Button>
      </HeroHeader>
      
      {/* Quick Stats */}
      <QuickStats />
      
      <Divider variant="subtle" />
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Score Principal - 2 colonnes */}
        <div className="lg:col-span-2">
          <MainHealthScore />
        </div>
        
        {/* Luna Insights */}
        <div className="lg:col-span-1">
          <LunaInsights />
        </div>
      </div>
      
      <Divider />
      
      {/* Modules */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Tes modules</h2>
            <p className="text-gray-400">Accède rapidement à tes outils</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {MODULES.map((module, i) => (
            <ModuleCard key={module.id} module={module} index={i} />
          ))}
        </div>
      </section>
      
      <Divider variant="subtle" />
      
      {/* Activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <RecentActivity />
        
        {/* Placeholder pour futur widget */}
        <Card className="p-6 md:p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 rounded-2xl bg-pulse-surface flex items-center justify-center mb-6"
          >
            <TrendingUp className="w-10 h-10 text-gray-500" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Objectifs du mois</h3>
          <p className="text-gray-400 mb-6">Configure tes objectifs pour suivre ta progression</p>
          <Button variant="secondary">Configurer</Button>
        </Card>
      </div>
    </div>
  )
}
