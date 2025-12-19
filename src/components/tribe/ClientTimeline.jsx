// ═══════════════════════════════════════════════════════════════════════════
// 📅 CLIENT TIMELINE - Historique visuel du client
// Timeline verticale avec événements
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, Mail, Eye, Phone, MessageCircle, Star, 
  CreditCard, RefreshCw, Gift, AlertTriangle, Heart,
  Calendar, ChevronDown, ChevronUp, Filter
} from 'lucide-react'
import clsx from 'clsx'
import { Badge, Button } from '@/components/ui'

// Types d'événements avec configuration
const EVENT_TYPES = {
  purchase: {
    icon: ShoppingCart,
    color: '#34D399',
    label: 'Achat',
    bgColor: 'bg-flow/20',
  },
  email_open: {
    icon: Mail,
    color: '#22D3EE',
    label: 'Email ouvert',
    bgColor: 'bg-vision/20',
  },
  email_click: {
    icon: Mail,
    color: '#A78BFA',
    label: 'Clic email',
    bgColor: 'bg-tribe/20',
  },
  visit: {
    icon: Eye,
    color: '#6B7280',
    label: 'Visite site',
    bgColor: 'bg-gray-500/20',
  },
  support: {
    icon: MessageCircle,
    color: '#F59E0B',
    label: 'Support',
    bgColor: 'bg-warning/20',
  },
  review: {
    icon: Star,
    color: '#FBBF24',
    label: 'Avis',
    bgColor: 'bg-vault/20',
  },
  refund: {
    icon: RefreshCw,
    color: '#EF4444',
    label: 'Remboursement',
    bgColor: 'bg-error/20',
  },
  referral: {
    icon: Gift,
    color: '#F472B6',
    label: 'Parrainage',
    bgColor: 'bg-core/20',
  },
  call: {
    icon: Phone,
    color: '#10B981',
    label: 'Appel',
    bgColor: 'bg-flow/20',
  },
  loyalty: {
    icon: Heart,
    color: '#F472B6',
    label: 'Fidélité',
    bgColor: 'bg-core/20',
  },
}

// Générer des événements fictifs pour un client
export function generateClientEvents(client) {
  const events = []
  const now = Date.now()
  const dayMs = 24 * 60 * 60 * 1000
  
  // Événement de création
  events.push({
    id: `${client.id}-signup`,
    type: 'loyalty',
    title: 'Inscription',
    description: 'Nouveau client',
    date: new Date(now - (Math.random() * 365 + 30) * dayMs),
    value: null,
  })
  
  // Achats basés sur ordersCount
  const ordersCount = client.stats?.ordersCount || Math.floor(Math.random() * 10)
  for (let i = 0; i < ordersCount; i++) {
    const avgBasket = client.stats?.avgBasket || 100 + Math.random() * 200
    events.push({
      id: `${client.id}-purchase-${i}`,
      type: 'purchase',
      title: 'Commande',
      description: `Commande #${1000 + Math.floor(Math.random() * 9000)}`,
      date: new Date(now - Math.random() * 300 * dayMs),
      value: Math.floor(avgBasket * (0.5 + Math.random())),
    })
  }
  
  // Emails ouverts
  const emailOpens = Math.floor(Math.random() * 15) + 5
  for (let i = 0; i < emailOpens; i++) {
    events.push({
      id: `${client.id}-email-${i}`,
      type: Math.random() > 0.3 ? 'email_open' : 'email_click',
      title: Math.random() > 0.5 ? 'Newsletter ouverte' : 'Promo ouverte',
      description: ['Promo Noël', 'Newsletter Décembre', 'Black Friday', 'Nouveautés'][Math.floor(Math.random() * 4)],
      date: new Date(now - Math.random() * 60 * dayMs),
      value: null,
    })
  }
  
  // Visites site
  const visits = Math.floor(Math.random() * 20) + 3
  for (let i = 0; i < visits; i++) {
    events.push({
      id: `${client.id}-visit-${i}`,
      type: 'visit',
      title: 'Visite site',
      description: ['Accueil', 'Produits', 'Pricing', 'Blog', 'Contact'][Math.floor(Math.random() * 5)],
      date: new Date(now - Math.random() * 90 * dayMs),
      value: null,
    })
  }
  
  // Support occasionnel
  if (Math.random() > 0.7) {
    events.push({
      id: `${client.id}-support`,
      type: 'support',
      title: 'Ticket support',
      description: 'Question sur commande',
      date: new Date(now - Math.random() * 60 * dayMs),
      value: null,
    })
  }
  
  // Avis si ambassadeur/fan
  if (client.status?.id === 'ambassador' || client.status?.id === 'fan') {
    events.push({
      id: `${client.id}-review`,
      type: 'review',
      title: 'Avis 5 étoiles',
      description: '"Excellent service !"',
      date: new Date(now - Math.random() * 180 * dayMs),
      value: 5,
    })
  }
  
  // Parrainage si ambassadeur
  if (client.status?.id === 'ambassador') {
    const referrals = client.stats?.referrals || Math.floor(Math.random() * 5) + 1
    for (let i = 0; i < referrals; i++) {
      events.push({
        id: `${client.id}-referral-${i}`,
        type: 'referral',
        title: 'Parrainage réussi',
        description: 'A parrainé un nouveau client',
        date: new Date(now - Math.random() * 200 * dayMs),
        value: 20, // Bonus parrainage
      })
    }
  }
  
  // Trier par date décroissante
  return events.sort((a, b) => b.date - a.date)
}

// Composant d'un événement
function TimelineEvent({ event, isLast, index }) {
  const config = EVENT_TYPES[event.type] || EVENT_TYPES.visit
  const Icon = config.icon
  
  const formatDate = (date) => {
    const now = new Date()
    const diff = now - date
    const days = Math.floor(diff / (24 * 60 * 60 * 1000))
    
    if (days === 0) return "Aujourd'hui"
    if (days === 1) return "Hier"
    if (days < 7) return `Il y a ${days} jours`
    if (days < 30) return `Il y a ${Math.floor(days / 7)} sem.`
    if (days < 365) return `Il y a ${Math.floor(days / 30)} mois`
    return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative flex gap-4"
    >
      {/* Ligne verticale */}
      {!isLast && (
        <div 
          className="absolute left-5 top-10 w-0.5 h-full -ml-px"
          style={{ backgroundColor: `${config.color}30` }}
        />
      )}
      
      {/* Icône */}
      <div 
        className={clsx(
          'relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
          config.bgColor
        )}
      >
        <Icon className="w-5 h-5" style={{ color: config.color }} />
      </div>
      
      {/* Contenu */}
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-white">{event.title}</h4>
            <p className="text-sm text-gray-400">{event.description}</p>
          </div>
          <div className="text-right">
            {event.value && (
              <span 
                className="text-lg font-bold"
                style={{ color: config.color }}
              >
                {event.type === 'review' ? `${event.value}★` : `${event.value}€`}
              </span>
            )}
            <p className="text-xs text-gray-500">{formatDate(event.date)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Composant Timeline principal
export function ClientTimeline({ client, maxEvents = 10, className }) {
  const [showAll, setShowAll] = useState(false)
  const [filter, setFilter] = useState('all')
  
  // Générer les événements
  const allEvents = useMemo(() => generateClientEvents(client), [client.id])
  
  // Filtrer les événements
  const filteredEvents = useMemo(() => {
    if (filter === 'all') return allEvents
    return allEvents.filter(e => e.type === filter)
  }, [allEvents, filter])
  
  // Limiter le nombre d'événements affichés
  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, maxEvents)
  
  // Stats rapides
  const stats = useMemo(() => ({
    purchases: allEvents.filter(e => e.type === 'purchase').length,
    emails: allEvents.filter(e => e.type.startsWith('email')).length,
    visits: allEvents.filter(e => e.type === 'visit').length,
    totalValue: allEvents.filter(e => e.type === 'purchase').reduce((sum, e) => sum + (e.value || 0), 0),
  }), [allEvents])
  
  const filterOptions = [
    { id: 'all', label: 'Tout', count: allEvents.length },
    { id: 'purchase', label: '🛒', count: stats.purchases },
    { id: 'email_open', label: '📧', count: stats.emails },
    { id: 'visit', label: '👁️', count: stats.visits },
  ]
  
  return (
    <div className={clsx('space-y-4', className)}>
      {/* Header avec filtres */}
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-tribe" />
          Timeline
        </h4>
        
        {/* Filtres rapides */}
        <div className="flex gap-1">
          {filterOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              className={clsx(
                'px-2 py-1 rounded-lg text-xs font-medium transition-colors',
                filter === opt.id
                  ? 'bg-tribe text-white'
                  : 'bg-pulse-surface text-gray-400 hover:text-white'
              )}
            >
              {opt.label} {opt.count > 0 && <span className="opacity-60">({opt.count})</span>}
            </button>
          ))}
        </div>
      </div>
      
      {/* Stats résumé */}
      <div className="grid grid-cols-4 gap-2 p-3 bg-pulse-surface/50 rounded-xl">
        <div className="text-center">
          <div className="text-lg font-bold text-flow">{stats.purchases}</div>
          <div className="text-xs text-gray-400">Achats</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-vision">{stats.emails}</div>
          <div className="text-xs text-gray-400">Emails</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-400">{stats.visits}</div>
          <div className="text-xs text-gray-400">Visites</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-vault">{stats.totalValue}€</div>
          <div className="text-xs text-gray-400">Total</div>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {displayedEvents.map((event, index) => (
            <TimelineEvent
              key={event.id}
              event={event}
              index={index}
              isLast={index === displayedEvents.length - 1}
            />
          ))}
        </AnimatePresence>
        
        {/* Message si vide */}
        {displayedEvents.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>Aucun événement trouvé</p>
          </div>
        )}
      </div>
      
      {/* Bouton voir plus/moins */}
      {filteredEvents.length > maxEvents && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-tribe hover:text-white transition-colors"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Voir moins
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Voir les {filteredEvents.length - maxEvents} autres événements
            </>
          )}
        </button>
      )}
    </div>
  )
}

// Version compacte pour aperçu
export function MiniTimeline({ client, className }) {
  const events = useMemo(() => generateClientEvents(client).slice(0, 5), [client.id])
  
  return (
    <div className={clsx('flex items-center gap-1', className)}>
      {events.map((event, i) => {
        const config = EVENT_TYPES[event.type] || EVENT_TYPES.visit
        return (
          <motion.div
            key={event.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${config.color}30` }}
            title={`${config.label} - ${event.title}`}
          >
            <config.icon className="w-3 h-3" style={{ color: config.color }} />
          </motion.div>
        )
      })}
      {events.length < 5 && (
        <span className="text-xs text-gray-500 ml-1">+{5 - events.length}</span>
      )}
    </div>
  )
}

export default ClientTimeline
