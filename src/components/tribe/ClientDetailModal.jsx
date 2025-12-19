// ═══════════════════════════════════════════════════════════════════════════
// 👤 CLIENT DETAIL MODAL - Fiche client enrichie
// Avec prédictions Luna, score évolution, actions rapides
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Mail, Phone, Heart, Calendar, TrendingUp, TrendingDown,
  AlertTriangle, Sparkles, Star, Gift, ShoppingCart, Eye,
  MessageCircle, Send, Clock, Target, Zap, ChevronRight
} from 'lucide-react'
import clsx from 'clsx'
import { Button, Badge, Avatar } from '@/components/ui'
import { ClientTimeline } from './ClientTimeline'

// Générer une prédiction Luna basée sur le client
function generateLunaPrediction(client) {
  const predictions = []
  
  // Risque de churn pour les dormants
  if (client.status?.id === 'dormant') {
    predictions.push({
      type: 'warning',
      icon: AlertTriangle,
      title: 'Risque de perte',
      probability: 65 + Math.floor(Math.random() * 25),
      description: `${client.firstName} n'a pas commandé depuis longtemps`,
      action: { label: 'Envoyer une offre', type: 'offer' },
    })
  }
  
  // Potentiel d'upsell pour les actifs
  if (client.status?.id === 'active' || client.status?.id === 'fan') {
    predictions.push({
      type: 'opportunity',
      icon: TrendingUp,
      title: 'Potentiel d\'upsell',
      probability: 45 + Math.floor(Math.random() * 30),
      description: 'Intérêt détecté pour des produits premium',
      action: { label: 'Proposer upgrade', type: 'upsell' },
    })
  }
  
  // Potentiel ambassadeur pour les fans
  if (client.status?.id === 'fan' && client.score >= 85) {
    predictions.push({
      type: 'success',
      icon: Star,
      title: 'Futur ambassadeur',
      probability: 70 + Math.floor(Math.random() * 20),
      description: 'Score élevé et engagement fort',
      action: { label: 'Proposer parrainage', type: 'referral' },
    })
  }
  
  // Réactivation pour les perdus
  if (client.status?.id === 'lost') {
    predictions.push({
      type: 'info',
      icon: Gift,
      title: 'Réactivation possible',
      probability: 20 + Math.floor(Math.random() * 30),
      description: 'Une offre spéciale pourrait le faire revenir',
      action: { label: 'Campagne win-back', type: 'winback' },
    })
  }
  
  // Nouveau client - onboarding
  if (client.status?.id === 'new') {
    predictions.push({
      type: 'info',
      icon: Zap,
      title: 'Onboarding en cours',
      probability: 80,
      description: 'Accompagner pour première commande',
      action: { label: 'Envoyer guide', type: 'onboard' },
    })
  }
  
  return predictions[0] || null
}

// Générer l'évolution du score (mini graphique)
function ScoreEvolution({ currentScore }) {
  // Générer un historique fictif
  const history = useMemo(() => {
    const data = []
    let score = currentScore - 10 + Math.random() * 20
    
    for (let i = 6; i >= 0; i--) {
      score = Math.max(0, Math.min(100, score + (Math.random() - 0.4) * 8))
      data.push(Math.round(score))
    }
    data[data.length - 1] = currentScore // S'assurer que le dernier est le score actuel
    return data
  }, [currentScore])
  
  const max = Math.max(...history)
  const min = Math.min(...history)
  const trend = currentScore - history[0]
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Évolution 7 jours</span>
        <div className={clsx(
          'flex items-center gap-1 text-sm font-medium',
          trend >= 0 ? 'text-flow' : 'text-error'
        )}>
          {trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {trend >= 0 ? '+' : ''}{trend} pts
        </div>
      </div>
      
      {/* Mini sparkline */}
      <div className="flex items-end gap-1 h-12">
        {history.map((score, i) => {
          const height = ((score - min) / (max - min || 1)) * 100
          const isLast = i === history.length - 1
          
          return (
            <motion.div
              key={i}
              className={clsx(
                'flex-1 rounded-t',
                isLast ? 'bg-tribe' : 'bg-tribe/40'
              )}
              initial={{ height: 0 }}
              animate={{ height: `${Math.max(height, 10)}%` }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            />
          )
        })}
      </div>
    </div>
  )
}

// Actions rapides
function QuickActions({ client, onAction }) {
  const actions = [
    { id: 'email', icon: Mail, label: 'Email', color: 'vision' },
    { id: 'call', icon: Phone, label: 'Appeler', color: 'flow' },
    { id: 'offer', icon: Gift, label: 'Offre', color: 'vault' },
    { id: 'note', icon: MessageCircle, label: 'Note', color: 'tribe' },
  ]
  
  return (
    <div className="flex gap-2">
      {actions.map(action => (
        <motion.button
          key={action.id}
          onClick={() => onAction(action.id)}
          className={clsx(
            'flex-1 flex flex-col items-center gap-1 p-3 rounded-xl',
            'bg-pulse-surface/50 hover:bg-pulse-surface transition-colors'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <action.icon className={`w-5 h-5 text-${action.color}`} />
          <span className="text-xs text-gray-400">{action.label}</span>
        </motion.button>
      ))}
    </div>
  )
}

// Modal principal
export function ClientDetailModal({ client, onClose, onAction }) {
  const [activeTab, setActiveTab] = useState('overview')
  
  if (!client) return null
  
  const prediction = generateLunaPrediction(client)
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] bg-pulse-bg rounded-2xl border border-pulse-border shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header avec gradient */}
        <div className="relative p-6 bg-gradient-to-r from-tribe/20 via-tribe/10 to-transparent border-b border-pulse-border">
          {/* Décoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-tribe/10 rounded-full blur-3xl" />
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar 
                src={client.avatar} 
                name={`${client.firstName} ${client.lastName}`} 
                size="xl"
                status={client.status?.id === 'active' ? 'online' : client.status?.id === 'dormant' ? 'away' : 'offline'}
              />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {client.firstName} {client.lastName}
                </h2>
                <p className="text-gray-400">{client.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="tribe">
                    {client.status?.emoji} {client.status?.label}
                  </Badge>
                  <Badge variant="default">
                    {client.location?.city}, {client.location?.country}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="secondary" icon={Heart}>
                Favoris
              </Button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-pulse-surface rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          
          {/* Score principal */}
          <div className="absolute bottom-4 right-6 text-right">
            <div className="text-4xl font-display font-bold text-tribe">{client.score}</div>
            <div className="text-sm text-gray-400">Score de santé</div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-pulse-border">
          {[
            { id: 'overview', label: 'Vue d\'ensemble' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'actions', label: 'Actions' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'flex-1 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'text-tribe border-b-2 border-tribe bg-tribe/5'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {/* Tab Overview */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Stats principales */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'CA Total', value: `${client.stats?.totalRevenue || 0}€`, color: 'vault', icon: ShoppingCart },
                    { label: 'Commandes', value: client.stats?.ordersCount || 0, color: 'flow', icon: ShoppingCart },
                    { label: 'Panier moyen', value: `${client.stats?.avgBasket || 0}€`, color: 'tribe', icon: Target },
                    { label: 'Taux ouverture', value: `${client.stats?.emailOpenRate || 0}%`, color: 'vision', icon: Mail },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 bg-pulse-surface/50 rounded-xl"
                    >
                      <stat.icon className={`w-5 h-5 text-${stat.color} mb-2`} />
                      <div className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Évolution du score */}
                <div className="p-4 bg-pulse-surface/50 rounded-xl">
                  <ScoreEvolution currentScore={client.score} />
                </div>
                
                {/* Prédiction Luna */}
                {prediction && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={clsx(
                      'p-4 rounded-xl border',
                      prediction.type === 'warning' && 'bg-error/10 border-error/30',
                      prediction.type === 'opportunity' && 'bg-vision/10 border-vision/30',
                      prediction.type === 'success' && 'bg-flow/10 border-flow/30',
                      prediction.type === 'info' && 'bg-tribe/10 border-tribe/30',
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-core to-vision flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-white flex items-center gap-2">
                            <prediction.icon className={clsx(
                              'w-4 h-4',
                              prediction.type === 'warning' && 'text-error',
                              prediction.type === 'opportunity' && 'text-vision',
                              prediction.type === 'success' && 'text-flow',
                              prediction.type === 'info' && 'text-tribe',
                            )} />
                            {prediction.title}
                          </h4>
                          <Badge variant={prediction.type === 'warning' ? 'error' : 'success'}>
                            {prediction.probability}% probable
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{prediction.description}</p>
                        <Button 
                          variant={prediction.type === 'warning' ? 'error' : 'primary'}
                          size="sm"
                          onClick={() => onAction(prediction.action.type, client)}
                        >
                          {prediction.action.label}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Infos contact */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-pulse-surface/50 rounded-xl">
                    <h4 className="text-sm text-gray-400 mb-2">Contact</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {client.email}
                      </div>
                      {client.phone && (
                        <div className="flex items-center gap-2 text-white">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {client.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-pulse-surface/50 rounded-xl">
                    <h4 className="text-sm text-gray-400 mb-2">Activité</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        Client depuis {client.stats?.firstOrderDate || 'N/A'}
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <Clock className="w-4 h-4 text-gray-400" />
                        Dernière activité: {client.lastActivity || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tags */}
                {client.tags && client.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {client.tags.map((tag, i) => (
                        <Badge key={i} variant="default">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Tab Timeline */}
            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <ClientTimeline client={client} maxEvents={15} />
              </motion.div>
            )}
            
            {/* Tab Actions */}
            {activeTab === 'actions' && (
              <motion.div
                key="actions"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h4 className="font-semibold text-white">Actions rapides</h4>
                <QuickActions client={client} onAction={(action) => onAction(action, client)} />
                
                <div className="space-y-3">
                  {[
                    { icon: Send, label: 'Envoyer un email personnalisé', desc: 'Créer un email avec Luna', action: 'email' },
                    { icon: Gift, label: 'Proposer une offre spéciale', desc: 'Code promo ou réduction', action: 'offer' },
                    { icon: Star, label: 'Inviter au programme fidélité', desc: 'Gagner des points et avantages', action: 'loyalty' },
                    { icon: MessageCircle, label: 'Ajouter une note interne', desc: 'Pour le suivi commercial', action: 'note' },
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => onAction(item.action, client)}
                      className="w-full flex items-center gap-4 p-4 bg-pulse-surface/50 rounded-xl hover:bg-pulse-surface transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-tribe/20 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-tribe" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{item.label}</div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-pulse-border bg-pulse-surface/30 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            ID: {client.id}
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onClose}>
              Fermer
            </Button>
            <Button variant="tribe" icon={Mail}>
              Contacter
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ClientDetailModal
