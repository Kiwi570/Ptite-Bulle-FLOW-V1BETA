// ═══════════════════════════════════════════════════════════════════════════
// 📊 WIDGETS - Composants du Dashboard CORE
// ═══════════════════════════════════════════════════════════════════════════

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, Eye, ShoppingCart, CreditCard, TrendingUp, TrendingDown,
  ArrowRight, Clock, CheckCircle, AlertCircle, Mail, Calendar,
  Zap, Sparkles
} from 'lucide-react'
import clsx from 'clsx'
import { Card, Badge, Button, Avatar } from '@/components/ui'
import { usePulseStore } from '@/stores/pulseStore'

// ═══════════════════════════════════════════════════════════════════════════
// WIDGET TEMPS RÉEL - "Maintenant"
// ═══════════════════════════════════════════════════════════════════════════

export function LiveWidget({ className }) {
  const { liveVisitorCount, siteStats, recentTransactions } = usePulseStore()
  
  const liveStats = [
    { 
      icon: Eye, 
      label: 'Visiteurs', 
      value: liveVisitorCount,
      color: 'vision',
      live: true 
    },
    { 
      icon: ShoppingCart, 
      label: 'Paniers', 
      value: 3,
      color: 'warning',
    },
    { 
      icon: CreditCard, 
      label: 'Ventes aujourd\'hui', 
      value: siteStats.today.conversions,
      color: 'flow',
      suffix: ` (${siteStats.today.revenue.toLocaleString()}€)`
    },
  ]
  
  return (
    <Card className={clsx('p-5', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <h3 className="font-semibold text-white">Maintenant</h3>
        </div>
        <Badge variant="success" size="sm" dot>Live</Badge>
      </div>
      
      <div className="space-y-4">
        {liveStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className={clsx(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                stat.color === 'vision' && 'bg-vision/20',
                stat.color === 'warning' && 'bg-warning/20',
                stat.color === 'flow' && 'bg-flow/20',
              )}>
                <stat.icon className={clsx(
                  'w-5 h-5',
                  stat.color === 'vision' && 'text-vision',
                  stat.color === 'warning' && 'text-warning',
                  stat.color === 'flow' && 'text-flow',
                )} />
              </div>
              <span className="text-gray-300">{stat.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-display font-bold text-white">
                {stat.value}
              </span>
              {stat.suffix && (
                <span className="text-sm text-gray-400">{stat.suffix}</span>
              )}
              {stat.live && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-vision"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Dernière vente */}
      {recentTransactions[0] && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 pt-4 border-t border-pulse-border"
        >
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-vault" />
            <span className="text-gray-400">Dernière vente :</span>
            <span className="text-white font-medium">
              {recentTransactions[0].amount}€
            </span>
            <span className="text-gray-500">
              — {recentTransactions[0].client}
            </span>
          </div>
        </motion.div>
      )}
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// WIDGET TENDANCES
// ═══════════════════════════════════════════════════════════════════════════

export function TrendsWidget({ className }) {
  const { siteStats } = usePulseStore()
  
  const trends = [
    { 
      label: 'Revenus', 
      value: '+18%',
      trend: 'up',
      detail: 'vs mois dernier',
      color: 'flow'
    },
    { 
      label: 'Trafic', 
      value: '+12%',
      trend: 'up',
      detail: 'vs semaine dernière',
      color: 'vision'
    },
    { 
      label: 'Taux conversion', 
      value: '+0.3%',
      trend: 'up',
      detail: '2.1% total',
      color: 'tribe'
    },
    { 
      label: 'Emails ouverts', 
      value: '-5%',
      trend: 'down',
      detail: 'vs moyenne',
      color: 'warning'
    },
  ]
  
  return (
    <Card className={clsx('p-5', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-flow" />
          Tendances
        </h3>
        <select className="bg-pulse-surface text-sm text-gray-400 rounded-lg px-2 py-1 border border-pulse-border">
          <option>7 derniers jours</option>
          <option>30 derniers jours</option>
          <option>Ce mois</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {trends.map((trend, index) => (
          <motion.div
            key={trend.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={clsx(
              'p-3 rounded-xl',
              'bg-pulse-surface/50'
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">{trend.label}</span>
              {trend.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-flow" />
              ) : (
                <TrendingDown className="w-4 h-4 text-error" />
              )}
            </div>
            <div className={clsx(
              'text-2xl font-display font-bold',
              trend.trend === 'up' ? 'text-flow' : 'text-error'
            )}>
              {trend.value}
            </div>
            <div className="text-xs text-gray-500 mt-1">{trend.detail}</div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// WIDGET ACTIONS
// ═══════════════════════════════════════════════════════════════════════════

export function ActionsWidget({ className }) {
  const actions = [
    {
      id: 1,
      icon: ShoppingCart,
      title: 'Relancer 5 paniers abandonnés',
      subtitle: 'Valeur totale : 1 240€',
      priority: 'high',
      color: 'warning',
    },
    {
      id: 2,
      icon: CreditCard,
      title: 'Facture #044 en retard',
      subtitle: '2 100€ — 16 jours',
      priority: 'high',
      color: 'error',
    },
    {
      id: 3,
      icon: Users,
      title: 'Client VIP silencieux',
      subtitle: 'Thomas L. — 2 semaines sans activité',
      priority: 'medium',
      color: 'tribe',
    },
    {
      id: 4,
      icon: Mail,
      title: 'Newsletter à envoyer',
      subtitle: 'Prête depuis 2 jours',
      priority: 'low',
      color: 'flow',
    },
  ]
  
  const [completedActions, setCompletedActions] = React.useState([])
  
  const handleComplete = (actionId) => {
    setCompletedActions([...completedActions, actionId])
  }
  
  return (
    <Card className={clsx('p-5', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-vault" />
          Actions suggérées
        </h3>
        <Badge variant="warning">{actions.length - completedActions.length}</Badge>
      </div>
      
      <div className="space-y-3">
        <AnimatePresence>
          {actions
            .filter(a => !completedActions.includes(a.id))
            .map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10, height: 0 }}
              transition={{ delay: index * 0.05 }}
              className={clsx(
                'flex items-center gap-3 p-3 rounded-xl',
                'bg-pulse-surface/50 hover:bg-pulse-surface',
                'transition-all duration-200 cursor-pointer group'
              )}
              onClick={() => handleComplete(action.id)}
            >
              <div className={clsx(
                'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                action.color === 'warning' && 'bg-warning/20',
                action.color === 'error' && 'bg-error/20',
                action.color === 'tribe' && 'bg-tribe/20',
                action.color === 'flow' && 'bg-flow/20',
              )}>
                <action.icon className={clsx(
                  'w-5 h-5',
                  action.color === 'warning' && 'text-warning',
                  action.color === 'error' && 'text-error',
                  action.color === 'tribe' && 'text-tribe',
                  action.color === 'flow' && 'text-flow',
                )} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {action.title}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {action.subtitle}
                </div>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="w-5 h-5 text-flow" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {completedActions.length === actions.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6 text-gray-400"
          >
            <CheckCircle className="w-10 h-10 text-flow mx-auto mb-2" />
            <p>Toutes les actions sont complétées ! 🎉</p>
          </motion.div>
        )}
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// WIDGET ACTIVITÉ RÉCENTE
// ═══════════════════════════════════════════════════════════════════════════

export function RecentActivityWidget({ className }) {
  const { recentTransactions } = usePulseStore()
  
  const activities = [
    {
      type: 'sale',
      icon: CreditCard,
      title: 'Nouvelle vente',
      detail: 'Marie D. — 89€',
      time: 'Il y a 2 min',
      color: 'flow',
    },
    {
      type: 'visit',
      icon: Eye,
      title: 'Visiteur récurrent',
      detail: 'Sophie L. sur /pricing',
      time: 'Il y a 5 min',
      color: 'vision',
    },
    {
      type: 'email',
      icon: Mail,
      title: 'Email ouvert',
      detail: 'Thomas B. — Promo Noël',
      time: 'Il y a 12 min',
      color: 'tribe',
    },
    {
      type: 'signup',
      icon: Users,
      title: 'Nouvelle inscription',
      detail: 'contact@startup.io',
      time: 'Il y a 28 min',
      color: 'core',
    },
    {
      type: 'cart',
      icon: ShoppingCart,
      title: 'Panier abandonné',
      detail: 'Anonyme — 348€',
      time: 'Il y a 45 min',
      color: 'warning',
    },
  ]
  
  return (
    <Card className={clsx('p-5', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          Activité récente
        </h3>
        <Button variant="ghost" size="sm">
          Tout voir
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3"
          >
            <div className={clsx(
              'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
              activity.color === 'flow' && 'bg-flow/20',
              activity.color === 'vision' && 'bg-vision/20',
              activity.color === 'tribe' && 'bg-tribe/20',
              activity.color === 'core' && 'bg-core/20',
              activity.color === 'warning' && 'bg-warning/20',
            )}>
              <activity.icon className={clsx(
                'w-4 h-4',
                activity.color === 'flow' && 'text-flow',
                activity.color === 'vision' && 'text-vision',
                activity.color === 'tribe' && 'text-tribe',
                activity.color === 'core' && 'text-core',
                activity.color === 'warning' && 'text-warning',
              )} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white">{activity.title}</div>
              <div className="text-xs text-gray-500">{activity.detail}</div>
            </div>
            
            <div className="text-xs text-gray-500 flex-shrink-0">
              {activity.time}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// WIDGET MINI GRAPHIQUE
// ═══════════════════════════════════════════════════════════════════════════

export function MiniChartWidget({ 
  title, 
  value, 
  change, 
  data, 
  color = 'core',
  className 
}) {
  const isPositive = change >= 0
  const colorHex = {
    core: '#F472B6',
    vision: '#22D3EE',
    tribe: '#A78BFA',
    flow: '#34D399',
    vault: '#FBBF24',
  }[color]
  
  // Mini graphique simplifié
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  return (
    <Card className={clsx('p-4', className)}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-display font-bold text-white">{value}</p>
        </div>
        <Badge 
          variant={isPositive ? 'success' : 'error'} 
          size="sm"
        >
          {isPositive ? '+' : ''}{change}%
        </Badge>
      </div>
      
      {/* Mini sparkline */}
      <div className="h-12 flex items-end gap-1">
        {data.map((point, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${((point - min) / range) * 100}%` }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="flex-1 rounded-t"
            style={{ 
              backgroundColor: colorHex,
              opacity: 0.3 + (index / data.length) * 0.7,
              minHeight: '4px'
            }}
          />
        ))}
      </div>
    </Card>
  )
}

export default {
  LiveWidget,
  TrendsWidget,
  ActionsWidget,
  RecentActivityWidget,
  MiniChartWidget,
}
