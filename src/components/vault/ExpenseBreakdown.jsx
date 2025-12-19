// ═══════════════════════════════════════════════════════════════════════════
// 📊 EXPENSE BREAKDOWN - Analyse des dépenses par catégories
// Donut chart interactif avec détails
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, Users, Laptop, Megaphone, CreditCard, Truck,
  Coffee, FileText, TrendingDown, TrendingUp, ChevronRight,
  AlertCircle, Sparkles
} from 'lucide-react'
import clsx from 'clsx'
import { Card, Badge, Button } from '@/components/ui'

// Catégories de dépenses
const EXPENSE_CATEGORIES = [
  { id: 'rent', label: 'Loyer & Charges', icon: Home, color: '#F472B6', budget: 2500 },
  { id: 'salaries', label: 'Salaires', icon: Users, color: '#A78BFA', budget: 8000 },
  { id: 'software', label: 'Logiciels & SaaS', icon: Laptop, color: '#22D3EE', budget: 800 },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, color: '#34D399', budget: 1500 },
  { id: 'services', label: 'Services externes', icon: FileText, color: '#FBBF24', budget: 1200 },
  { id: 'transport', label: 'Transport', icon: Truck, color: '#F59E0B', budget: 400 },
  { id: 'other', label: 'Divers', icon: Coffee, color: '#6B7280', budget: 500 },
]

// Générer des dépenses fictives
const generateExpenses = () => {
  return EXPENSE_CATEGORIES.map(cat => {
    const variance = (Math.random() - 0.5) * 0.4 // -20% à +20%
    const actual = Math.round(cat.budget * (1 + variance))
    
    return {
      ...cat,
      actual,
      variance: actual - cat.budget,
      variancePercent: ((actual - cat.budget) / cat.budget * 100).toFixed(1),
      // Sous-détails
      details: generateCategoryDetails(cat.id, actual),
    }
  })
}

// Générer les détails par catégorie
const generateCategoryDetails = (categoryId, total) => {
  const detailsByCategory = {
    rent: ['Loyer bureau', 'Électricité', 'Internet', 'Assurance'],
    salaries: ['Salaire 1', 'Salaire 2', 'Charges sociales', 'Primes'],
    software: ['Figma', 'Notion', 'AWS', 'GitHub', 'Slack'],
    marketing: ['Facebook Ads', 'Google Ads', 'Influence', 'Contenu'],
    services: ['Comptable', 'Avocat', 'Consultant', 'Freelance'],
    transport: ['Train', 'Uber', 'Parking', 'Essence'],
    other: ['Fournitures', 'Repas équipe', 'Café', 'Cadeaux clients'],
  }
  
  const items = detailsByCategory[categoryId] || ['Autre']
  const weights = items.map(() => Math.random())
  const totalWeight = weights.reduce((a, b) => a + b, 0)
  
  return items.map((name, i) => ({
    name,
    amount: Math.round(total * (weights[i] / totalWeight)),
  }))
}

// Donut Chart
function DonutChart({ data, selectedCategory, onSelectCategory }) {
  const total = data.reduce((sum, cat) => sum + cat.actual, 0)
  let currentAngle = -90 // Commencer en haut
  
  const segments = data.map(cat => {
    const angle = (cat.actual / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle
    
    // Convertir en coordonnées SVG
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180
    const radius = 80
    const innerRadius = 50
    const cx = 100
    const cy = 100
    
    const x1 = cx + radius * Math.cos(startRad)
    const y1 = cy + radius * Math.sin(startRad)
    const x2 = cx + radius * Math.cos(endRad)
    const y2 = cy + radius * Math.sin(endRad)
    const x3 = cx + innerRadius * Math.cos(endRad)
    const y3 = cy + innerRadius * Math.sin(endRad)
    const x4 = cx + innerRadius * Math.cos(startRad)
    const y4 = cy + innerRadius * Math.sin(startRad)
    
    const largeArc = angle > 180 ? 1 : 0
    
    const path = `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `
    
    return {
      ...cat,
      path,
      percentage: ((cat.actual / total) * 100).toFixed(1),
    }
  })
  
  return (
    <div className="relative">
      <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
        {segments.map((segment, i) => (
          <motion.path
            key={segment.id}
            d={segment.path}
            fill={segment.color}
            opacity={selectedCategory === null || selectedCategory === segment.id ? 1 : 0.3}
            className="cursor-pointer transition-opacity"
            onClick={() => onSelectCategory(selectedCategory === segment.id ? null : segment.id)}
            initial={{ scale: 0 }}
            animate={{ 
              scale: selectedCategory === segment.id ? 1.05 : 1,
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: i * 0.05, type: 'spring' }}
            style={{ transformOrigin: 'center' }}
          />
        ))}
        
        {/* Centre */}
        <circle cx="100" cy="100" r="45" fill="#12121A" />
        <text x="100" y="95" textAnchor="middle" className="text-lg font-bold fill-white">
          {(total / 1000).toFixed(1)}k€
        </text>
        <text x="100" y="112" textAnchor="middle" className="text-xs fill-gray-400">
          Total
        </text>
      </svg>
    </div>
  )
}

// Composant principal
export function ExpenseBreakdown({ className }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [viewMode, setViewMode] = useState('chart') // chart | list
  
  const expenses = useMemo(() => generateExpenses(), [])
  
  const totalBudget = expenses.reduce((sum, cat) => sum + cat.budget, 0)
  const totalActual = expenses.reduce((sum, cat) => sum + cat.actual, 0)
  const totalVariance = totalActual - totalBudget
  
  // Catégories problématiques (dépassement > 10%)
  const overBudget = expenses.filter(cat => cat.variancePercent > 10)
  
  // Catégorie sélectionnée
  const selected = expenses.find(cat => cat.id === selectedCategory)
  
  return (
    <div className={clsx('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-vault" />
          Répartition des dépenses
        </h3>
        <div className="flex rounded-xl overflow-hidden border border-pulse-border">
          <button
            onClick={() => setViewMode('chart')}
            className={clsx(
              'px-3 py-1.5 text-sm transition-colors',
              viewMode === 'chart' ? 'bg-vault text-white' : 'bg-pulse-surface text-gray-400'
            )}
          >
            Graphique
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={clsx(
              'px-3 py-1.5 text-sm transition-colors',
              viewMode === 'list' ? 'bg-vault text-white' : 'bg-pulse-surface text-gray-400'
            )}
          >
            Liste
          </button>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique ou liste */}
        <Card className="p-6">
          {viewMode === 'chart' ? (
            <DonutChart 
              data={expenses} 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          ) : (
            <div className="space-y-3">
              {expenses.map((cat, i) => {
                const Icon = cat.icon
                const isOver = cat.variance > 0
                
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={clsx(
                      'flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors',
                      selectedCategory === cat.id ? 'bg-pulse-surface' : 'hover:bg-pulse-surface/50'
                    )}
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${cat.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: cat.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{cat.label}</div>
                      <div className="text-sm text-gray-400">
                        Budget: {cat.budget.toLocaleString()}€
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">{cat.actual.toLocaleString()}€</div>
                      <div className={clsx(
                        'text-sm flex items-center gap-1',
                        isOver ? 'text-error' : 'text-flow'
                      )}>
                        {isOver ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isOver ? '+' : ''}{cat.variancePercent}%
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
          
          {/* Légende si mode graphique */}
          {viewMode === 'chart' && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {expenses.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                  className={clsx(
                    'flex items-center gap-2 px-2 py-1 rounded-lg text-left transition-colors',
                    selectedCategory === cat.id ? 'bg-pulse-surface' : 'hover:bg-pulse-surface/50'
                  )}
                >
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-xs text-gray-400 truncate">{cat.label}</span>
                </button>
              ))}
            </div>
          )}
        </Card>
        
        {/* Détails catégorie sélectionnée */}
        <Card className="p-6">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${selected.color}20` }}
                  >
                    <selected.icon className="w-6 h-6" style={{ color: selected.color }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{selected.label}</h4>
                    <div className="text-sm text-gray-400">
                      {selected.details.length} postes de dépense
                    </div>
                  </div>
                </div>
                
                {/* Barre de progression budget */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Budget utilisé</span>
                    <span className={selected.variance > 0 ? 'text-error' : 'text-flow'}>
                      {selected.actual.toLocaleString()}€ / {selected.budget.toLocaleString()}€
                    </span>
                  </div>
                  <div className="h-3 bg-pulse-surface rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: selected.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((selected.actual / selected.budget) * 100, 100)}%` }}
                    />
                  </div>
                  {selected.variance > 0 && (
                    <div className="text-xs text-error mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Dépassement de {selected.variance.toLocaleString()}€
                    </div>
                  )}
                </div>
                
                {/* Détails */}
                <div className="space-y-2">
                  {selected.details.map((item, i) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-pulse-surface/50"
                    >
                      <span className="text-gray-300">{item.name}</span>
                      <span className="font-medium text-white">{item.amount.toLocaleString()}€</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-8"
              >
                <CreditCard className="w-12 h-12 text-gray-600 mb-3" />
                <p className="text-gray-400">
                  Clique sur une catégorie pour voir les détails
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
      
      {/* Résumé budget */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400">Budget total</div>
            <div className="text-2xl font-bold text-white">{totalBudget.toLocaleString()}€</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Dépensé</div>
            <div className="text-2xl font-bold text-vault">{totalActual.toLocaleString()}€</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Écart</div>
            <div className={clsx(
              'text-2xl font-bold',
              totalVariance > 0 ? 'text-error' : 'text-flow'
            )}>
              {totalVariance > 0 ? '+' : ''}{totalVariance.toLocaleString()}€
            </div>
          </div>
        </div>
      </Card>
      
      {/* Alertes dépassements */}
      {overBudget.length > 0 && (
        <Card className="p-4 border-warning/30 bg-warning/5">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <div className="font-medium text-white mb-1">
                💡 Conseil de Luna
              </div>
              <p className="text-sm text-gray-400">
                Tu dépasses ton budget sur <span className="text-warning font-medium">{overBudget.map(c => c.label).join(', ')}</span>. 
                Je peux t'aider à trouver des alternatives moins chères ou à renégocier certains contrats.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default ExpenseBreakdown
