// ═══════════════════════════════════════════════════════════════════════════
// 💜 TRIBE V3 - CRM & Pipeline MAGNIFIQUE
// Plus aéré, plus impactant, expérience premium
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Users, Search, Grid, List, Mail, Phone, ChevronRight, X, Star, Sparkles,
  ShoppingBag, Eye, FileText, Heart, Plus, Target, Clock, Zap, ArrowRight
} from 'lucide-react'
import clsx from 'clsx'
import { Card, Button, Badge, Avatar, HeroHeader, StatCard, Tabs, Divider, EmptyState } from '@/components/ui'
import { clients, CLIENT_SEGMENTS, getClientStats } from '@/data/clients'
import { usePulseStore } from '@/stores/pulseStore'
import { PIPELINE_STAGES, pipelineDeals, getHeatColor, getPipelineStats } from '@/data/pipeline'

// ═══════════════════════════════════════════════════════════════════════════
// CERCLES DE RELATION
// ═══════════════════════════════════════════════════════════════════════════

function RelationCircles({ onSelectSegment, activeSegment }) {
  const stats = getClientStats()
  const circles = [
    { id: 'ambassador', count: stats.bySegment.ambassador, color: '#F472B6', radius: 40, label: '👑 Ambassadeurs' },
    { id: 'fan', count: stats.bySegment.fan, color: '#A78BFA', radius: 65, label: '💜 Fans' },
    { id: 'active', count: stats.bySegment.active, color: '#34D399', radius: 90, label: '⚡ Actifs' },
    { id: 'dormant', count: stats.bySegment.dormant, color: '#FBBF24', radius: 115, label: '😴 Dormants' },
    { id: 'lost', count: stats.bySegment.lost, color: '#EF4444', radius: 140, label: '💔 Perdus' },
    { id: 'new', count: stats.bySegment.new, color: '#22D3EE', radius: 165, label: '🌟 Nouveaux' },
  ]
  
  return (
    <Card className="p-6 md:p-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <Heart className="w-6 h-6 text-tribe" />
        Cercles de relation
      </h3>
      
      <div className="relative w-full h-[380px]">
        <svg viewBox="0 0 400 380" className="w-full h-full">
          {circles.map((c, i) => (
            <motion.circle
              key={c.id}
              cx="200" cy="190" r={c.radius}
              fill="none"
              stroke={c.color}
              strokeWidth={activeSegment === c.id ? 5 : 2}
              opacity={activeSegment && activeSegment !== c.id ? 0.2 : 0.5}
              className="cursor-pointer transition-all"
              whileHover={{ strokeWidth: 5 }}
              onClick={() => onSelectSegment(activeSegment === c.id ? null : c.id)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: activeSegment && activeSegment !== c.id ? 0.2 : 0.5 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
          
          {/* Centre */}
          <motion.circle 
            cx="200" cy="190" r="30" 
            className="fill-pulse-surface stroke-tribe" strokeWidth={3}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          />
          <text x="200" y="195" textAnchor="middle" className="fill-white text-lg font-bold">{stats.total}</text>
        </svg>
        
        {/* Labels */}
        {circles.map((c, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180)
          const labelRadius = c.radius + 25
          const x = 50 + (200 + Math.cos(angle) * labelRadius) / 4
          const y = (190 + Math.sin(angle) * labelRadius) / 3.8 * 100 / 100
          
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className={clsx(
                'absolute px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all',
                activeSegment === c.id ? 'bg-white/20 scale-110' : 'hover:bg-white/10'
              )}
              style={{ 
                left: `${x}%`, 
                top: `${y * 100}%`, 
                transform: 'translate(-50%, -50%)',
                color: c.color 
              }}
              onClick={() => onSelectSegment(activeSegment === c.id ? null : c.id)}
            >
              {c.count}
            </motion.div>
          )
        })}
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {circles.map(c => (
          <button
            key={c.id}
            onClick={() => onSelectSegment(activeSegment === c.id ? null : c.id)}
            className={clsx(
              'flex items-center gap-2 p-2 rounded-lg text-sm transition-all',
              activeSegment === c.id ? 'bg-white/10' : 'hover:bg-white/5'
            )}
          >
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
            <span className="text-gray-400">{c.label}</span>
            <span className="ml-auto font-semibold" style={{ color: c.color }}>{c.count}</span>
          </button>
        ))}
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CARTE CLIENT
// ═══════════════════════════════════════════════════════════════════════════

function ClientCard({ client, onClick, viewMode }) {
  const segment = CLIENT_SEGMENTS[client.segment]
  
  if (viewMode === 'list') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} 
        onClick={onClick}
        className="group"
      >
        <Card className="p-4 cursor-pointer">
          <div className="flex items-center gap-4">
            <Avatar name={`${client.firstName} ${client.lastName}`} size="md" ring={segment?.color?.includes('F472B6') ? 'core' : 'tribe'} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h4 className="font-semibold text-white truncate">{client.firstName} {client.lastName}</h4>
                <Badge style={{ backgroundColor: `${segment?.color}25`, color: segment?.color }} size="sm">
                  {segment?.emoji}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 truncate">{client.email}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-vault">{client.totalSpent?.toLocaleString() || 0}€</p>
              <p className="text-xs text-gray-500">dépensé</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
          </div>
        </Card>
      </motion.div>
    )
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <Card className="p-6 cursor-pointer h-full">
        <div className="flex items-start justify-between mb-4">
          <Avatar name={`${client.firstName} ${client.lastName}`} size="lg" ring="tribe" />
          <Badge style={{ backgroundColor: `${segment?.color}25`, color: segment?.color }}>
            {segment?.emoji} {segment?.label}
          </Badge>
        </div>
        
        <h4 className="font-semibold text-white text-lg mb-1">{client.firstName} {client.lastName}</h4>
        <p className="text-sm text-gray-500 truncate mb-4">{client.email}</p>
        
        <Divider variant="subtle" />
        
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-2xl font-bold text-vault">{client.totalSpent?.toLocaleString() || 0}€</p>
            <p className="text-xs text-gray-500">dépensé</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-pulse-surface rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-tribe to-core rounded-full" style={{ width: `${client.score}%` }} />
              </div>
              <span className="text-sm font-semibold text-tribe">{client.score}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">score</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// ONGLET CRM
// ═══════════════════════════════════════════════════════════════════════════

function CRMTab() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedSegment, setSelectedSegment] = useState(null)
  const stats = getClientStats()
  
  const filteredClients = useMemo(() => {
    let result = clients
    if (selectedSegment) result = result.filter(c => c.segment === selectedSegment)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(c => 
        c.firstName.toLowerCase().includes(q) || 
        c.lastName.toLowerCase().includes(q) || 
        c.email.toLowerCase().includes(q)
      )
    }
    return result.sort((a, b) => b.score - a.score)
  }, [selectedSegment, searchQuery])
  
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total clients" value={stats.total} icon={Users} color="tribe" />
        <StatCard label="Actifs" value={stats.bySegment.active + stats.bySegment.fan + stats.bySegment.ambassador} icon={Zap} color="flow" />
        <StatCard label="Dormants" value={stats.bySegment.dormant} icon={Clock} color="warning" />
        <StatCard label="CA Total" value={45230} suffix="€" icon={ShoppingBag} color="vault" change={12} />
      </div>
      
      <Divider variant="subtle" />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Cercles */}
        <div className="lg:col-span-1">
          <RelationCircles onSelectSegment={setSelectedSegment} activeSegment={selectedSegment} />
        </div>
        
        {/* Liste clients */}
        <div className="lg:col-span-3 space-y-6">
          {/* Contrôles */}
          <Card className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 relative min-w-[200px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher un client..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="input pl-12"
                />
              </div>
              
              <div className="flex gap-2 bg-pulse-surface rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={clsx('p-2.5 rounded-lg transition-all', viewMode === 'grid' ? 'bg-tribe text-white' : 'text-gray-400 hover:text-white')}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={clsx('p-2.5 rounded-lg transition-all', viewMode === 'list' ? 'bg-tribe text-white' : 'text-gray-400 hover:text-white')}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              
              <Button variant="tribe" icon={Plus}>Ajouter</Button>
            </div>
          </Card>
          
          {/* Filtre actif */}
          {selectedSegment && (
            <div className="flex items-center gap-3">
              <Badge style={{ backgroundColor: `${CLIENT_SEGMENTS[selectedSegment]?.color}25`, color: CLIENT_SEGMENTS[selectedSegment]?.color }}>
                {CLIENT_SEGMENTS[selectedSegment]?.emoji} {CLIENT_SEGMENTS[selectedSegment]?.label}
              </Badge>
              <button onClick={() => setSelectedSegment(null)} className="text-sm text-gray-400 hover:text-white">✕ Effacer le filtre</button>
            </div>
          )}
          
          {/* Grille/Liste */}
          <div className={clsx(
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' 
              : 'space-y-3'
          )}>
            {filteredClients.map((client, i) => (
              <motion.div key={client.id} transition={{ delay: i * 0.05 }}>
                <ClientCard client={client} onClick={() => {}} viewMode={viewMode} />
              </motion.div>
            ))}
          </div>
          
          {filteredClients.length === 0 && (
            <EmptyState
              icon={Users}
              title="Aucun client trouvé"
              description="Modifie tes filtres ou ajoute de nouveaux clients"
              action={<Button variant="tribe" icon={Plus}>Ajouter un client</Button>}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CARTE DEAL PIPELINE
// ═══════════════════════════════════════════════════════════════════════════

function DealCard({ deal, onDragStart }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      draggable
      onDragStart={(e) => onDragStart(e, deal.id)}
      whileHover={{ scale: 1.02, y: -2 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="p-4">
        <div className="flex items-start justify-between mb-3">
          <Avatar name={deal.clientName} size="sm" />
          <div className="flex items-center gap-1 text-sm font-bold" style={{ color: getHeatColor(deal.heatScore) }}>
            🔥 {deal.heatScore}
          </div>
        </div>
        
        <h4 className="font-semibold text-white text-sm mb-1">{deal.clientName}</h4>
        <p className="text-xs text-gray-500 mb-3">{deal.company}</p>
        
        <p className="text-sm text-gray-400 line-clamp-2 mb-4">{deal.title}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-pulse-border">
          <span className="text-lg font-bold text-vault">{deal.value.toLocaleString()}€</span>
          <Badge variant="default" size="sm">{deal.probability}%</Badge>
        </div>
        
        {deal.nextAction && (
          <div className="mt-3 flex items-center gap-2 text-xs text-warning">
            <Zap className="w-3 h-3" />
            <span className="truncate">{deal.nextAction}</span>
          </div>
        )}
      </Card>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// COLONNE PIPELINE
// ═══════════════════════════════════════════════════════════════════════════

function PipelineColumn({ stage, deals, onDragStart, onDrop }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0)
  
  return (
    <div
      className={clsx('flex flex-col min-w-[300px] max-w-[340px]', isDragOver && 'ring-2 ring-tribe rounded-2xl')}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setIsDragOver(false); onDrop(e.dataTransfer.getData('dealId'), stage.id) }}
    >
      {/* Header */}
      <Card className="p-5 rounded-b-none" style={{ borderBottom: `3px solid ${stage.color}` }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{stage.emoji}</span>
            <h3 className="font-bold text-white">{stage.name}</h3>
          </div>
          <Badge style={{ backgroundColor: `${stage.color}25`, color: stage.color }}>{deals.length}</Badge>
        </div>
        <p className="text-xs text-gray-500 mb-3">{stage.description}</p>
        <p className="text-xl font-bold" style={{ color: stage.color }}>{totalValue.toLocaleString()}€</p>
      </Card>
      
      {/* Deals */}
      <div className="flex-1 p-3 bg-pulse-bg/50 rounded-b-2xl border border-t-0 border-pulse-border space-y-3 min-h-[400px]">
        <AnimatePresence>
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} onDragStart={onDragStart} />
          ))}
        </AnimatePresence>
        
        {deals.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <Target className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">Aucun deal</p>
          </div>
        )}
        
        <button className="w-full p-3 rounded-xl border-2 border-dashed border-pulse-border hover:border-tribe/50 text-gray-500 hover:text-tribe transition-all flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          <span className="text-sm">Ajouter</span>
        </button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// ONGLET PIPELINE
// ═══════════════════════════════════════════════════════════════════════════

function PipelineTab() {
  const [deals, setDeals] = useState(pipelineDeals)
  const stats = getPipelineStats()
  
  const handleDragStart = (e, dealId) => {
    e.dataTransfer.setData('dealId', dealId)
  }
  
  const handleDrop = (dealId, newStage) => {
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: newStage } : d))
  }
  
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PIPELINE_STAGES.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage.id)
          const value = stageDeals.reduce((sum, d) => sum + d.value, 0)
          return (
            <Card key={stage.id} className="p-5" style={{ borderLeft: `4px solid ${stage.color}` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{stage.emoji}</span>
                <span className="font-medium text-white">{stage.name}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold" style={{ color: stage.color }}>{stageDeals.length}</span>
                <span className="text-sm text-gray-400">{value.toLocaleString()}€</span>
              </div>
            </Card>
          )
        })}
      </div>
      
      {/* Stats globales */}
      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-8">
          <div>
            <p className="text-sm text-gray-400">Total deals</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="w-px h-12 bg-pulse-border" />
          <div>
            <p className="text-sm text-gray-400">Valeur totale</p>
            <p className="text-2xl font-bold text-vault">{stats.totalValue.toLocaleString()}€</p>
          </div>
          <div className="w-px h-12 bg-pulse-border" />
          <div>
            <p className="text-sm text-gray-400">Valeur pondérée</p>
            <p className="text-2xl font-bold text-flow">{stats.weightedValue.toLocaleString()}€</p>
          </div>
          <div className="w-px h-12 bg-pulse-border" />
          <div>
            <p className="text-sm text-gray-400">🔥 Hot deals</p>
            <p className="text-2xl font-bold text-error">{stats.hotDeals}</p>
          </div>
        </div>
      </Card>
      
      {/* Kanban */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex gap-4 min-w-max">
          {PIPELINE_STAGES.map(stage => (
            <PipelineColumn
              key={stage.id}
              stage={stage}
              deals={deals.filter(d => d.stage === stage.id)}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════

export default function TribePage() {
  const [activeTab, setActiveTab] = useState('crm')
  const stats = getClientStats()
  const pipelineStats = getPipelineStats()
  
  const tabs = [
    { id: 'crm', label: 'Clients', icon: Users, count: stats.total },
    { id: 'pipeline', label: 'Pipeline', icon: Target, count: pipelineStats.total },
  ]
  
  return (
    <div className="space-y-8">
      <HeroHeader
        icon={Users}
        title="Tribu"
        subtitle="CRM relationnel & Pipeline commercial"
        color="tribe"
      >
        <Button variant="tribe" icon={Plus}>Nouveau client</Button>
      </HeroHeader>
      
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {activeTab === 'crm' && <CRMTab />}
          {activeTab === 'pipeline' && <PipelineTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
