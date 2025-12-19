// ═══════════════════════════════════════════════════════════════════════════
// 💚 FLOW V3 - Inbox Révolutionnaire MAGNIFIQUE
// Plus aéré, plus impactant, expérience utilisateur premium
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, Send, Plus, Users, Clock, TrendingUp, Eye, Inbox, Sparkles, 
  ChevronRight, CheckCircle, Edit3, Play, Pause, Archive, Zap, Target, 
  Heart, ShoppingCart, RefreshCw, Star, X, List, Filter, MoreHorizontal, 
  Reply, ArrowRight, Circle
} from 'lucide-react'
import clsx from 'clsx'
import { Card, Button, Badge, Avatar, HeroHeader, StatCard, Tabs, Divider, EmptyState } from '@/components/ui'
import { usePulseStore } from '@/stores/pulseStore'
import { emailContacts, emails, getInboxStats } from '@/data/inbox'

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════

const EMAIL_TEMPLATES = [
  { id: 'welcome', name: 'Bienvenue', icon: Star, color: 'vision', preview: 'Merci de nous avoir rejoint...' },
  { id: 'reactivation', name: 'Réactivation', icon: RefreshCw, color: 'warning', preview: 'Ça fait un moment...' },
  { id: 'cart_recovery', name: 'Panier abandonné', icon: ShoppingCart, color: 'error', preview: 'Ton panier t\'attend...' },
  { id: 'vip_thanks', name: 'Merci VIP', icon: Heart, color: 'core', preview: 'Tu es exceptionnel(le)...' },
  { id: 'newsletter', name: 'Newsletter', icon: Mail, color: 'flow', preview: 'Les news de la semaine...' },
]

const AUTOMATIONS = [
  { id: 1, name: 'Séquence Bienvenue', trigger: 'Nouveau client', emails: 3, active: true, stats: { sent: 234, opened: 189, converted: 45 } },
  { id: 2, name: 'Panier abandonné', trigger: 'Abandon panier', emails: 2, active: true, stats: { sent: 156, opened: 98, converted: 23 } },
  { id: 3, name: 'Réactivation 60 jours', trigger: 'Inactif 60j', emails: 3, active: false, stats: { sent: 45, opened: 18, converted: 5 } },
]

// ═══════════════════════════════════════════════════════════════════════════
// VUE CONSTELLATION - Contacts en étoiles
// ═══════════════════════════════════════════════════════════════════════════

function ConstellationView({ contacts, onSelectContact, selectedContact }) {
  const centerX = 300, centerY = 250
  
  const positionedContacts = contacts.map((contact, i) => {
    const angle = (i / contacts.length) * 2 * Math.PI - Math.PI / 2
    const radius = 100 + (contact.totalEmails * 4)
    return {
      ...contact,
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      size: Math.min(55, 30 + contact.totalEmails * 2),
    }
  })
  
  const getUnreadCount = (contactId) => emails.filter(e => e.contactId === contactId && !e.read && e.direction === 'incoming').length
  
  return (
    <Card className="p-6 md:p-8">
      <div className="relative w-full h-[500px] overflow-hidden rounded-2xl bg-pulse-bg/50">
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-core/10 rounded-full blur-3xl" />
        </div>
        
        <svg viewBox="0 0 600 500" className="w-full h-full">
          {/* Lignes de connexion */}
          {positionedContacts.map((contact, i) => (
            <motion.line 
              key={`line-${contact.id}`} 
              x1={centerX} y1={centerY} x2={contact.x} y2={contact.y}
              stroke={contact.color} 
              strokeWidth={selectedContact === contact.id ? 3 : 1.5}
              strokeOpacity={selectedContact === contact.id ? 0.9 : 0.25}
              strokeDasharray={selectedContact === contact.id ? '0' : '5,5'}
              initial={{ pathLength: 0 }} 
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}
          
          {/* Centre - Vous */}
          <motion.circle 
            cx={centerX} cy={centerY} r={45} 
            className="fill-pulse-surface stroke-core" strokeWidth={3}
            initial={{ scale: 0 }} animate={{ scale: 1 }} 
            transition={{ type: 'spring', delay: 0.3 }}
          />
          <motion.circle 
            cx={centerX} cy={centerY} r={55} 
            fill="none" stroke="rgba(244,114,182,0.3)" strokeWidth={1}
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <text x={centerX} y={centerY + 6} textAnchor="middle" className="fill-white text-base font-bold">Vous</text>
          
          {/* Contacts */}
          {positionedContacts.map((contact, i) => {
            const unread = getUnreadCount(contact.id)
            const isSelected = selectedContact === contact.id
            return (
              <g key={contact.id} className="cursor-pointer" onClick={() => onSelectContact(isSelected ? null : contact.id)}>
                {/* Glow effect when selected */}
                {isSelected && (
                  <motion.circle 
                    cx={contact.x} cy={contact.y} r={contact.size + 15} 
                    fill={contact.color} opacity={0.2}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                {/* Contact circle */}
                <motion.circle 
                  cx={contact.x} cy={contact.y} r={contact.size} 
                  fill={contact.color}
                  opacity={selectedContact && !isSelected ? 0.3 : 0.9}
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: 'spring', delay: 0.4 + i * 0.08 }}
                  whileHover={{ scale: 1.15 }}
                />
                
                {/* Initial */}
                <text 
                  x={contact.x} y={contact.y + 6} 
                  textAnchor="middle" 
                  className="fill-white text-lg font-bold pointer-events-none"
                >
                  {contact.name.charAt(0)}
                </text>
                
                {/* Unread badge */}
                {unread > 0 && (
                  <g>
                    <circle cx={contact.x + contact.size * 0.6} cy={contact.y - contact.size * 0.6} r={14} fill="#EF4444" />
                    <text 
                      x={contact.x + contact.size * 0.6} 
                      y={contact.y - contact.size * 0.6 + 5} 
                      textAnchor="middle" 
                      className="fill-white text-xs font-bold"
                    >
                      {unread}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// VUE STREAM - Timeline emails
// ═══════════════════════════════════════════════════════════════════════════

function StreamView({ emailList, onSelectEmail, selectedEmailId }) {
  const now = Date.now()
  const groups = [
    { label: '⚡ Maintenant', emails: emailList.filter(e => now - e.date < 60 * 60 * 1000) },
    { label: '📅 Aujourd\'hui', emails: emailList.filter(e => now - e.date >= 60 * 60 * 1000 && now - e.date < 24 * 60 * 60 * 1000) },
    { label: '📆 Cette semaine', emails: emailList.filter(e => now - e.date >= 24 * 60 * 60 * 1000) },
  ].filter(g => g.emails.length > 0)
  
  const formatTime = (date) => {
    const diff = now - date
    if (diff < 60 * 1000) return 'À l\'instant'
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / 60000)} min`
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / 3600000)}h`
    return `${Math.floor(diff / 86400000)}j`
  }
  
  return (
    <div className="space-y-8">
      {groups.map((group, gi) => (
        <motion.div 
          key={group.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.1 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
            {group.label}
            <Badge variant="default" size="sm">{group.emails.length}</Badge>
          </h3>
          
          <div className="space-y-3">
            {group.emails.map((email, i) => {
              const contact = emailContacts.find(c => c.id === email.contactId)
              const isSelected = selectedEmailId === email.id
              
              return (
                <motion.div
                  key={email.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: gi * 0.1 + i * 0.05 }}
                >
                  <Card 
                    className={clsx(
                      'p-5 cursor-pointer transition-all',
                      isSelected && 'ring-2 ring-flow',
                      !email.read && 'border-l-4 border-l-flow'
                    )}
                    onClick={() => onSelectEmail(email.id)}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar 
                        name={contact?.name} 
                        size="md"
                        ring={!email.read ? 'flow' : undefined}
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={clsx('font-semibold truncate', !email.read ? 'text-white' : 'text-gray-300')}>
                              {contact?.name || 'Inconnu'}
                            </span>
                            {email.priority === 'urgent' && <Badge variant="error" size="sm">Urgent</Badge>}
                            {email.starred && <Star className="w-4 h-4 text-vault fill-vault flex-shrink-0" />}
                          </div>
                          <span className="text-sm text-gray-500 flex-shrink-0">{formatTime(email.date)}</span>
                        </div>
                        
                        <p className={clsx('font-medium mb-1', !email.read ? 'text-white' : 'text-gray-400')}>
                          {email.subject}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-1">{email.preview}</p>
                        
                        {email.aiSummary && isSelected && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 p-4 rounded-xl bg-tribe/10 border border-tribe/30"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="w-4 h-4 text-tribe" />
                              <span className="text-sm font-medium text-tribe">Résumé Luna</span>
                            </div>
                            <p className="text-sm text-gray-300">{email.aiSummary}</p>
                          </motion.div>
                        )}
                        
                        {email.linkedAmount && (
                          <div className="mt-3 flex items-center gap-2">
                            <Badge variant="vault" size="sm">{email.linkedAmount.toLocaleString()}€</Badge>
                            <span className="text-xs text-gray-500">Montant lié</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// ONGLET INBOX
// ═══════════════════════════════════════════════════════════════════════════

function InboxTab() {
  const [view, setView] = useState('stream')
  const [filter, setFilter] = useState('all')
  const [selectedContact, setSelectedContact] = useState(null)
  const [selectedEmail, setSelectedEmail] = useState(null)
  
  const stats = getInboxStats()
  const filteredEmails = emails.filter(e => {
    if (filter === 'unread') return !e.read && e.direction === 'incoming'
    if (filter === 'starred') return e.starred
    if (filter === 'urgent') return e.priority === 'urgent'
    if (selectedContact) return e.contactId === selectedContact
    return true
  })
  
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total" value={stats.total} icon={Mail} color="flow" />
        <StatCard label="Non lus" value={stats.unread} icon={Inbox} color="vision" />
        <StatCard label="Urgents" value={stats.urgent} icon={Zap} color="error" />
        <StatCard label="Valeur liée" value={stats.totalValue} suffix="€" icon={Target} color="vault" />
      </div>
      
      {/* Contrôles */}
      <Card className="p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {['all', 'unread', 'starred', 'urgent'].map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'flow' : 'ghost'}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f === 'all' && 'Tous'}
                {f === 'unread' && `Non lus (${stats.unread})`}
                {f === 'starred' && '⭐ Favoris'}
                {f === 'urgent' && '🔥 Urgents'}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 bg-pulse-surface rounded-xl p-1">
            <button
              onClick={() => setView('constellation')}
              className={clsx('p-2.5 rounded-lg transition-all', view === 'constellation' ? 'bg-flow text-white' : 'text-gray-400 hover:text-white')}
            >
              <Circle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('stream')}
              className={clsx('p-2.5 rounded-lg transition-all', view === 'stream' ? 'bg-flow text-white' : 'text-gray-400 hover:text-white')}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>
      
      {/* Vue */}
      <AnimatePresence mode="wait">
        <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {view === 'constellation' ? (
            <ConstellationView 
              contacts={emailContacts} 
              onSelectContact={setSelectedContact}
              selectedContact={selectedContact}
            />
          ) : (
            <StreamView 
              emailList={filteredEmails}
              onSelectEmail={setSelectedEmail}
              selectedEmailId={selectedEmail}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// ONGLET MARKETING
// ═══════════════════════════════════════════════════════════════════════════

function MarketingTab() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Emails envoyés" value={2847} icon={Send} color="flow" change={12} />
        <StatCard label="Taux ouverture" value={48.5} suffix="%" icon={Eye} color="vision" change={5} />
        <StatCard label="Taux clic" value={12.3} suffix="%" icon={Target} color="tribe" change={-2} />
        <StatCard label="Conversions" value={156} icon={ShoppingCart} color="vault" change={23} />
      </div>
      
      <Divider variant="subtle" />
      
      {/* Templates */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Templates</h3>
          <Button variant="flow" size="sm" icon={Plus}>Nouveau</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMAIL_TEMPLATES.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className={clsx('stat-icon-sm', `icon-box-${template.color}`)}>
                    <template.icon className={clsx('w-6 h-6', `text-${template.color}`)} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{template.name}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{template.preview}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// ONGLET AUTOMATIONS
// ═══════════════════════════════════════════════════════════════════════════

function AutomationsTab() {
  const [automations, setAutomations] = useState(AUTOMATIONS)
  
  const toggleAutomation = (id) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a))
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Automations actives</h3>
          <p className="text-gray-400 mt-1">{automations.filter(a => a.active).length} sur {automations.length}</p>
        </div>
        <Button variant="primary" icon={Plus}>Créer une automation</Button>
      </div>
      
      <div className="space-y-4">
        {automations.map((auto, i) => (
          <motion.div
            key={auto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={clsx('p-6', !auto.active && 'opacity-60')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={clsx('stat-icon-sm', auto.active ? 'icon-box-flow' : 'bg-pulse-surface')}>
                    <Zap className={clsx('w-6 h-6', auto.active ? 'text-flow' : 'text-gray-500')} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{auto.name}</h4>
                    <p className="text-sm text-gray-500">Trigger: {auto.trigger} • {auto.emails} emails</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="hidden md:flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-white">{auto.stats.sent}</p>
                      <p className="text-gray-500">Envoyés</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-flow">{Math.round(auto.stats.opened / auto.stats.sent * 100)}%</p>
                      <p className="text-gray-500">Ouverture</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-vault">{auto.stats.converted}</p>
                      <p className="text-gray-500">Conversions</p>
                    </div>
                  </div>
                  
                  <Button
                    variant={auto.active ? 'flow' : 'secondary'}
                    size="sm"
                    icon={auto.active ? Pause : Play}
                    onClick={() => toggleAutomation(auto.id)}
                  >
                    {auto.active ? 'Pause' : 'Activer'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════

export default function FlowPage() {
  const [activeTab, setActiveTab] = useState('inbox')
  const stats = getInboxStats()
  
  const tabs = [
    { id: 'inbox', label: 'Boîte de réception', icon: Inbox, count: stats.unread },
    { id: 'marketing', label: 'Marketing', icon: Send },
    { id: 'automations', label: 'Automations', icon: Zap },
  ]
  
  return (
    <div className="space-y-8">
      <HeroHeader
        icon={Mail}
        title="Flow"
        subtitle="Inbox révolutionnaire & Email Marketing"
        color="flow"
      >
        <Button variant="flow" icon={Edit3}>Composer</Button>
      </HeroHeader>
      
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {activeTab === 'inbox' && <InboxTab />}
          {activeTab === 'marketing' && <MarketingTab />}
          {activeTab === 'automations' && <AutomationsTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
