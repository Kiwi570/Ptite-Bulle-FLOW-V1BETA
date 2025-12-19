// ═══════════════════════════════════════════════════════════════════════════
// 🔄 AUTOMATION BUILDER - Builder visuel d'automations
// Interface drag & drop pour créer des séquences
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { 
  Mail, Clock, Users, GitBranch, Zap, Gift, Tag, Filter,
  Plus, X, GripVertical, ChevronRight, Play, Pause, Save,
  Trash2, Copy, Settings, ArrowDown, Sparkles, Check,
  ShoppingCart, Eye, MousePointer, Bell, Heart
} from 'lucide-react'
import clsx from 'clsx'
import { Card, Badge, Button } from '@/components/ui'

// Types de blocs disponibles
const BLOCK_TYPES = {
  triggers: [
    { id: 'signup', icon: Users, label: 'Inscription', color: '#22D3EE', desc: 'Quand un contact s\'inscrit' },
    { id: 'purchase', icon: ShoppingCart, label: 'Achat', color: '#34D399', desc: 'Quand un achat est effectué' },
    { id: 'cart_abandon', icon: ShoppingCart, label: 'Panier abandonné', color: '#F59E0B', desc: 'Après abandon de panier' },
    { id: 'page_visit', icon: Eye, label: 'Visite page', color: '#A78BFA', desc: 'Visite d\'une page spécifique' },
    { id: 'tag_added', icon: Tag, label: 'Tag ajouté', color: '#F472B6', desc: 'Quand un tag est ajouté' },
    { id: 'date', icon: Clock, label: 'Date', color: '#6B7280', desc: 'À une date spécifique' },
  ],
  actions: [
    { id: 'send_email', icon: Mail, label: 'Envoyer email', color: '#22D3EE', desc: 'Envoyer un email' },
    { id: 'wait', icon: Clock, label: 'Attendre', color: '#6B7280', desc: 'Pause dans la séquence' },
    { id: 'add_tag', icon: Tag, label: 'Ajouter tag', color: '#A78BFA', desc: 'Ajouter un tag au contact' },
    { id: 'remove_tag', icon: Tag, label: 'Retirer tag', color: '#EF4444', desc: 'Retirer un tag' },
    { id: 'notify', icon: Bell, label: 'Notification', color: '#F59E0B', desc: 'T\'envoyer une notif' },
    { id: 'webhook', icon: Zap, label: 'Webhook', color: '#10B981', desc: 'Appeler une URL' },
  ],
  conditions: [
    { id: 'if_opened', icon: Eye, label: 'Si ouvert', color: '#22D3EE', desc: 'Si l\'email précédent a été ouvert' },
    { id: 'if_clicked', icon: MousePointer, label: 'Si cliqué', color: '#34D399', desc: 'Si un lien a été cliqué' },
    { id: 'if_tag', icon: Tag, label: 'Si tag', color: '#A78BFA', desc: 'Si le contact a un tag' },
    { id: 'if_purchased', icon: ShoppingCart, label: 'Si acheté', color: '#F472B6', desc: 'Si le contact a acheté' },
  ],
}

// Templates d'automations prédéfinis
const AUTOMATION_TEMPLATES = [
  {
    id: 'welcome',
    name: 'Bienvenue',
    emoji: '👋',
    desc: 'Séquence d\'onboarding pour nouveaux inscrits',
    blocks: [
      { id: '1', type: 'signup', category: 'triggers' },
      { id: '2', type: 'send_email', category: 'actions', config: { subject: 'Bienvenue !' } },
      { id: '3', type: 'wait', category: 'actions', config: { duration: 2, unit: 'days' } },
      { id: '4', type: 'send_email', category: 'actions', config: { subject: 'Comment ça va ?' } },
    ],
  },
  {
    id: 'cart_recovery',
    name: 'Panier abandonné',
    emoji: '🛒',
    desc: 'Récupérer les paniers abandonnés',
    blocks: [
      { id: '1', type: 'cart_abandon', category: 'triggers' },
      { id: '2', type: 'wait', category: 'actions', config: { duration: 1, unit: 'hours' } },
      { id: '3', type: 'send_email', category: 'actions', config: { subject: 'Tu as oublié quelque chose ?' } },
      { id: '4', type: 'if_purchased', category: 'conditions' },
      { id: '5', type: 'wait', category: 'actions', config: { duration: 24, unit: 'hours' } },
      { id: '6', type: 'send_email', category: 'actions', config: { subject: '-10% pour toi !' } },
    ],
  },
  {
    id: 'reactivation',
    name: 'Réactivation',
    emoji: '💤',
    desc: 'Réengager les clients dormants',
    blocks: [
      { id: '1', type: 'tag_added', category: 'triggers', config: { tag: 'dormant' } },
      { id: '2', type: 'send_email', category: 'actions', config: { subject: 'Tu nous manques !' } },
      { id: '3', type: 'wait', category: 'actions', config: { duration: 7, unit: 'days' } },
      { id: '4', type: 'if_opened', category: 'conditions' },
      { id: '5', type: 'send_email', category: 'actions', config: { subject: 'Offre spéciale juste pour toi' } },
    ],
  },
]

// Composant Block
function AutomationBlock({ block, onRemove, onConfigure, isDragging }) {
  const blockConfig = [...BLOCK_TYPES.triggers, ...BLOCK_TYPES.actions, ...BLOCK_TYPES.conditions]
    .find(b => b.id === block.type)
  
  if (!blockConfig) return null
  
  const Icon = blockConfig.icon
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, x: -50 }}
      className={clsx(
        'relative group',
        isDragging && 'z-50'
      )}
    >
      {/* Connecteur vers le bas */}
      <div className="absolute left-1/2 -bottom-6 w-0.5 h-6 bg-pulse-border" />
      
      <div 
        className={clsx(
          'flex items-center gap-3 p-4 rounded-xl border-2 transition-all',
          'bg-pulse-surface/80 backdrop-blur-sm',
          isDragging ? 'border-flow shadow-lg shadow-flow/20' : 'border-pulse-border hover:border-gray-600'
        )}
      >
        {/* Grip pour drag */}
        <div className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-white">
          <GripVertical className="w-5 h-5" />
        </div>
        
        {/* Icône du bloc */}
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${blockConfig.color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: blockConfig.color }} />
        </div>
        
        {/* Contenu */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-white">{blockConfig.label}</span>
            <Badge 
              variant={
                block.category === 'triggers' ? 'vision' : 
                block.category === 'conditions' ? 'warning' : 'flow'
              }
              size="sm"
            >
              {block.category === 'triggers' ? 'Déclencheur' : 
               block.category === 'conditions' ? 'Condition' : 'Action'}
            </Badge>
          </div>
          {block.config && (
            <p className="text-sm text-gray-400 mt-0.5">
              {block.config.subject || block.config.tag || 
               (block.config.duration && `${block.config.duration} ${block.config.unit}`)}
            </p>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onConfigure(block)}
            className="p-1.5 rounded-lg hover:bg-pulse-bg transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
          <button 
            onClick={() => onRemove(block.id)}
            className="p-1.5 rounded-lg hover:bg-error/20 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-error" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Sélecteur de bloc
function BlockSelector({ onSelect, onClose }) {
  const [category, setCategory] = useState('triggers')
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute z-50 left-1/2 -translate-x-1/2 w-80 bg-pulse-bg border border-pulse-border rounded-xl shadow-xl overflow-hidden"
    >
      {/* Tabs */}
      <div className="flex border-b border-pulse-border">
        {[
          { id: 'triggers', label: 'Déclencheurs', icon: Zap },
          { id: 'actions', label: 'Actions', icon: Play },
          { id: 'conditions', label: 'Conditions', icon: GitBranch },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setCategory(tab.id)}
            className={clsx(
              'flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors',
              category === tab.id ? 'text-white bg-pulse-surface' : 'text-gray-400 hover:text-white'
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Blocs */}
      <div className="p-2 max-h-64 overflow-y-auto">
        {BLOCK_TYPES[category].map(block => (
          <button
            key={block.id}
            onClick={() => {
              onSelect({ 
                id: Date.now().toString(), 
                type: block.id, 
                category,
                config: {} 
              })
              onClose()
            }}
            className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-pulse-surface transition-colors text-left"
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${block.color}20` }}
            >
              <block.icon className="w-4 h-4" style={{ color: block.color }} />
            </div>
            <div>
              <div className="text-sm font-medium text-white">{block.label}</div>
              <div className="text-xs text-gray-400">{block.desc}</div>
            </div>
          </button>
        ))}
      </div>
      
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 hover:bg-pulse-surface rounded"
      >
        <X className="w-4 h-4 text-gray-400" />
      </button>
    </motion.div>
  )
}

// Modal de configuration de bloc
function BlockConfigModal({ block, onSave, onClose }) {
  const [config, setConfig] = useState(block.config || {})
  
  const blockConfig = [...BLOCK_TYPES.triggers, ...BLOCK_TYPES.actions, ...BLOCK_TYPES.conditions]
    .find(b => b.id === block.type)
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md bg-pulse-bg rounded-xl border border-pulse-border shadow-xl"
      >
        <div className="p-4 border-b border-pulse-border flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${blockConfig?.color}20` }}
          >
            {blockConfig && <blockConfig.icon className="w-5 h-5" style={{ color: blockConfig.color }} />}
          </div>
          <div>
            <h3 className="font-semibold text-white">{blockConfig?.label}</h3>
            <p className="text-sm text-gray-400">Configurer ce bloc</p>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Configuration selon le type de bloc */}
          {block.type === 'send_email' && (
            <>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Sujet de l'email</label>
                <input
                  value={config.subject || ''}
                  onChange={e => setConfig({ ...config, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-pulse-surface border border-pulse-border text-white"
                  placeholder="Sujet de l'email..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Template</label>
                <select
                  value={config.template || ''}
                  onChange={e => setConfig({ ...config, template: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-pulse-surface border border-pulse-border text-white"
                >
                  <option value="">Sélectionner un template</option>
                  <option value="welcome">Bienvenue</option>
                  <option value="promo">Promotion</option>
                  <option value="reminder">Rappel</option>
                </select>
              </div>
            </>
          )}
          
          {block.type === 'wait' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Durée</label>
                <input
                  type="number"
                  value={config.duration || 1}
                  onChange={e => setConfig({ ...config, duration: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-pulse-surface border border-pulse-border text-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Unité</label>
                <select
                  value={config.unit || 'days'}
                  onChange={e => setConfig({ ...config, unit: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-pulse-surface border border-pulse-border text-white"
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Heures</option>
                  <option value="days">Jours</option>
                </select>
              </div>
            </div>
          )}
          
          {(block.type === 'add_tag' || block.type === 'remove_tag' || block.type === 'if_tag' || block.type === 'tag_added') && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tag</label>
              <input
                value={config.tag || ''}
                onChange={e => setConfig({ ...config, tag: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-pulse-surface border border-pulse-border text-white"
                placeholder="Nom du tag..."
              />
            </div>
          )}
          
          {block.type === 'page_visit' && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">URL de la page</label>
              <input
                value={config.url || ''}
                onChange={e => setConfig({ ...config, url: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-pulse-surface border border-pulse-border text-white"
                placeholder="/pricing, /checkout..."
              />
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-pulse-border flex gap-2 justify-end">
          <Button variant="secondary" onClick={onClose}>Annuler</Button>
          <Button 
            variant="flow" 
            icon={Check}
            onClick={() => {
              onSave({ ...block, config })
              onClose()
            }}
          >
            Enregistrer
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Composant principal
export function AutomationBuilder({ automation, onSave, onClose }) {
  const [name, setName] = useState(automation?.name || 'Nouvelle automation')
  const [blocks, setBlocks] = useState(automation?.blocks || [])
  const [showBlockSelector, setShowBlockSelector] = useState(false)
  const [insertIndex, setInsertIndex] = useState(null)
  const [configBlock, setConfigBlock] = useState(null)
  const [isActive, setIsActive] = useState(automation?.isActive || false)
  
  // Ajouter un bloc
  const addBlock = useCallback((block) => {
    if (insertIndex !== null) {
      const newBlocks = [...blocks]
      newBlocks.splice(insertIndex, 0, block)
      setBlocks(newBlocks)
      setInsertIndex(null)
    } else {
      setBlocks([...blocks, block])
    }
  }, [blocks, insertIndex])
  
  // Supprimer un bloc
  const removeBlock = useCallback((blockId) => {
    setBlocks(blocks.filter(b => b.id !== blockId))
  }, [blocks])
  
  // Mettre à jour un bloc
  const updateBlock = useCallback((updatedBlock) => {
    setBlocks(blocks.map(b => b.id === updatedBlock.id ? updatedBlock : b))
  }, [blocks])
  
  // Charger un template
  const loadTemplate = useCallback((template) => {
    setName(template.name)
    setBlocks(template.blocks.map(b => ({ ...b, id: Date.now().toString() + Math.random() })))
  }, [])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex bg-pulse-bg"
    >
      {/* Sidebar gauche - Templates */}
      <div className="w-64 border-r border-pulse-border p-4 overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Templates</h3>
        <div className="space-y-2">
          {AUTOMATION_TEMPLATES.map(template => (
            <button
              key={template.id}
              onClick={() => loadTemplate(template)}
              className="w-full p-3 rounded-xl bg-pulse-surface/50 hover:bg-pulse-surface transition-colors text-left"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{template.emoji}</span>
                <span className="font-medium text-white">{template.name}</span>
              </div>
              <p className="text-xs text-gray-400">{template.desc}</p>
              <div className="text-xs text-gray-500 mt-1">{template.blocks.length} blocs</div>
            </button>
          ))}
        </div>
        
        <div className="mt-6 p-3 bg-flow/10 border border-flow/30 rounded-xl">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-flow mt-0.5" />
            <div>
              <p className="text-sm text-white font-medium">Astuce Luna</p>
              <p className="text-xs text-gray-400 mt-1">
                Les automations de panier abandonné génèrent en moyenne +15% de revenus récupérés !
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Zone principale - Builder */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-pulse-border">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-pulse-surface rounded-lg">
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="text-xl font-bold text-white bg-transparent border-none focus:outline-none"
            />
            <Badge variant={isActive ? 'success' : 'default'}>
              {isActive ? 'Active' : 'Brouillon'}
            </Badge>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              icon={isActive ? Pause : Play}
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? 'Pause' : 'Activer'}
            </Button>
            <Button 
              variant="flow" 
              icon={Save}
              onClick={() => onSave({ name, blocks, isActive })}
            >
              Enregistrer
            </Button>
          </div>
        </div>
        
        {/* Canvas */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-lg mx-auto">
            {/* Blocs */}
            <Reorder.Group axis="y" values={blocks} onReorder={setBlocks} className="space-y-6">
              {blocks.map((block, index) => (
                <Reorder.Item key={block.id} value={block}>
                  <AutomationBlock
                    block={block}
                    onRemove={removeBlock}
                    onConfigure={setConfigBlock}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
            
            {/* Bouton ajouter */}
            <motion.div 
              className="relative flex justify-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Button
                variant="secondary"
                icon={Plus}
                onClick={() => setShowBlockSelector(true)}
                className="rounded-full"
              >
                Ajouter un bloc
              </Button>
              
              <AnimatePresence>
                {showBlockSelector && (
                  <BlockSelector
                    onSelect={addBlock}
                    onClose={() => setShowBlockSelector(false)}
                  />
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Message si vide */}
            {blocks.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-flow/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-flow" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Crée ton automation</h3>
                <p className="text-gray-400 mb-4">
                  Commence par ajouter un déclencheur, puis des actions
                </p>
                <Button variant="flow" icon={Plus} onClick={() => setShowBlockSelector(true)}>
                  Ajouter un bloc
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Stats preview */}
        {blocks.length > 0 && (
          <div className="p-4 border-t border-pulse-border bg-pulse-surface/30">
            <div className="flex items-center justify-around text-center">
              <div>
                <div className="text-2xl font-bold text-flow">{blocks.filter(b => b.category === 'actions').length}</div>
                <div className="text-xs text-gray-400">Actions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-vision">{blocks.filter(b => b.type === 'send_email').length}</div>
                <div className="text-xs text-gray-400">Emails</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">{blocks.filter(b => b.category === 'conditions').length}</div>
                <div className="text-xs text-gray-400">Conditions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-tribe">~3-5j</div>
                <div className="text-xs text-gray-400">Durée estimée</div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Modal configuration */}
      <AnimatePresence>
        {configBlock && (
          <BlockConfigModal
            block={configBlock}
            onSave={updateBlock}
            onClose={() => setConfigBlock(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AutomationBuilder
