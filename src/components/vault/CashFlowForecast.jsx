// ═══════════════════════════════════════════════════════════════════════════
// 💰 CASH FLOW FORECAST - Prévisions de trésorerie avancées
// Graphique interactif avec scénarios et projections
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, TrendingDown, Calendar, AlertTriangle,
  ChevronRight, Sparkles, ArrowUpRight, ArrowDownRight,
  DollarSign, Target, Zap, Info
} from 'lucide-react'
import clsx from 'clsx'
import { Card, Badge, Button } from '@/components/ui'

// Générer des données de prévision
function generateForecastData(months = 6, currentBalance = 45000) {
  const data = []
  let balance = currentBalance
  const now = new Date()
  
  for (let i = 0; i < months; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1)
    const monthName = date.toLocaleDateString('fr-FR', { month: 'short' })
    
    // Revenus prévus (avec saisonnalité)
    const seasonality = 1 + Math.sin((date.getMonth() + 3) * Math.PI / 6) * 0.2
    const baseRevenue = 12000 + Math.random() * 3000
    const revenue = Math.round(baseRevenue * seasonality)
    
    // Dépenses prévues
    const fixedExpenses = 6500 // Loyer, salaires, etc.
    const variableExpenses = Math.round(revenue * 0.25) // 25% du CA
    const expenses = fixedExpenses + variableExpenses
    
    // Factures en attente (certaines à risque)
    const pendingInvoices = i === 0 ? Math.round(Math.random() * 5000 + 3000) : 0
    
    balance = balance + revenue - expenses + pendingInvoices
    
    data.push({
      month: monthName,
      date,
      revenue,
      expenses,
      balance,
      pendingInvoices,
      // Scénarios
      optimistic: Math.round(balance * 1.15),
      pessimistic: Math.round(balance * 0.85),
    })
  }
  
  return data
}

// Mini graphique sparkline
function Sparkline({ data, dataKey, color, height = 40 }) {
  const values = data.map(d => d[dataKey])
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100
    const y = ((max - v) / range) * height
    return `${x},${y}`
  }).join(' ')
  
  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" style={{ height }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Point final */}
      <circle
        cx={(values.length - 1) / (values.length - 1) * 100}
        cy={((max - values[values.length - 1]) / range) * height}
        r="3"
        fill={color}
      />
    </svg>
  )
}

// Graphique principal
function ForecastChart({ data, showScenarios }) {
  const maxValue = Math.max(...data.flatMap(d => [d.optimistic, d.balance, d.pessimistic]))
  const minValue = Math.min(...data.flatMap(d => [d.optimistic, d.balance, d.pessimistic]))
  const range = maxValue - minValue || 1
  
  const getY = (value) => ((maxValue - value) / range) * 180 + 20
  
  // Générer les paths
  const mainPath = data.map((d, i) => {
    const x = 50 + (i * (500 / (data.length - 1)))
    const y = getY(d.balance)
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')
  
  const optimisticPath = data.map((d, i) => {
    const x = 50 + (i * (500 / (data.length - 1)))
    const y = getY(d.optimistic)
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')
  
  const pessimisticPath = data.map((d, i) => {
    const x = 50 + (i * (500 / (data.length - 1)))
    const y = getY(d.pessimistic)
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')
  
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      {/* Grille */}
      {[0, 1, 2, 3, 4].map(i => (
        <g key={i}>
          <line
            x1="50"
            y1={20 + i * 45}
            x2="550"
            y2={20 + i * 45}
            stroke="#2A2A3E"
            strokeDasharray="4,4"
          />
          <text
            x="45"
            y={25 + i * 45}
            textAnchor="end"
            className="text-xs fill-gray-500"
          >
            {Math.round(maxValue - (i * range / 4) / 1000)}k€
          </text>
        </g>
      ))}
      
      {/* Zone de scénarios */}
      {showScenarios && (
        <motion.path
          d={`${optimisticPath} L 550 ${getY(data[data.length-1].pessimistic)} ${pessimisticPath.split(' ').reverse().join(' ')} Z`}
          fill="url(#scenarioGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
        />
      )}
      
      {/* Lignes de scénarios */}
      {showScenarios && (
        <>
          <motion.path
            d={optimisticPath}
            fill="none"
            stroke="#34D399"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d={pessimisticPath}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
        </>
      )}
      
      {/* Ligne principale */}
      <motion.path
        d={mainPath}
        fill="none"
        stroke="#FBBF24"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Points de données */}
      {data.map((d, i) => {
        const x = 50 + (i * (500 / (data.length - 1)))
        const y = getY(d.balance)
        
        return (
          <g key={i}>
            <motion.circle
              cx={x}
              cy={y}
              r="6"
              fill="#1A1A2E"
              stroke="#FBBF24"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
            {/* Label mois */}
            <text
              x={x}
              y="215"
              textAnchor="middle"
              className="text-xs fill-gray-400"
            >
              {d.month}
            </text>
          </g>
        )
      })}
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="scenarioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Composant principal
export function CashFlowForecast({ currentBalance = 45000, className }) {
  const [showScenarios, setShowScenarios] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(null)
  
  const forecastData = useMemo(() => generateForecastData(6, currentBalance), [currentBalance])
  
  // Calculs
  const lastMonth = forecastData[forecastData.length - 1]
  const trend = lastMonth.balance - currentBalance
  const trendPercent = ((trend / currentBalance) * 100).toFixed(1)
  
  // Alertes
  const alerts = useMemo(() => {
    const result = []
    forecastData.forEach((month, i) => {
      if (month.balance < 20000) {
        result.push({
          type: 'danger',
          month: month.month,
          message: `Trésorerie critique en ${month.month}`,
          value: month.balance,
        })
      } else if (month.balance < 30000) {
        result.push({
          type: 'warning',
          month: month.month,
          message: `Attention à la trésorerie en ${month.month}`,
          value: month.balance,
        })
      }
    })
    return result
  }, [forecastData])
  
  return (
    <div className={clsx('space-y-6', className)}>
      {/* Header avec stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <DollarSign className="w-4 h-4" />
            Solde actuel
          </div>
          <div className="text-2xl font-bold text-vault">{currentBalance.toLocaleString()}€</div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <Target className="w-4 h-4" />
            Prévision 6 mois
          </div>
          <div className="text-2xl font-bold text-white">{lastMonth.balance.toLocaleString()}€</div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            {trend >= 0 ? <TrendingUp className="w-4 h-4 text-flow" /> : <TrendingDown className="w-4 h-4 text-error" />}
            Tendance
          </div>
          <div className={clsx('text-2xl font-bold', trend >= 0 ? 'text-flow' : 'text-error')}>
            {trend >= 0 ? '+' : ''}{trendPercent}%
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <AlertTriangle className="w-4 h-4" />
            Alertes
          </div>
          <div className="text-2xl font-bold text-white">
            {alerts.length}
            {alerts.length > 0 && (
              <Badge variant="warning" size="sm" className="ml-2">À surveiller</Badge>
            )}
          </div>
        </Card>
      </div>
      
      {/* Graphique */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-vault" />
            Prévisions de trésorerie
          </h3>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={showScenarios}
                onChange={(e) => setShowScenarios(e.target.checked)}
                className="rounded border-pulse-border bg-pulse-surface"
              />
              Afficher les scénarios
            </label>
          </div>
        </div>
        
        <ForecastChart data={forecastData} showScenarios={showScenarios} />
        
        {/* Légende */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-vault rounded" />
            <span className="text-sm text-gray-400">Prévision</span>
          </div>
          {showScenarios && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-flow rounded border-dashed" style={{ borderStyle: 'dashed' }} />
                <span className="text-sm text-gray-400">Optimiste</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-warning rounded" style={{ borderStyle: 'dashed' }} />
                <span className="text-sm text-gray-400">Pessimiste</span>
              </div>
            </>
          )}
        </div>
      </Card>
      
      {/* Détails par mois */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {forecastData.map((month, i) => (
          <motion.div
            key={month.month}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card 
              className={clsx(
                'p-4 cursor-pointer transition-all',
                selectedMonth === i ? 'border-vault' : 'hover:border-gray-600'
              )}
              onClick={() => setSelectedMonth(selectedMonth === i ? null : i)}
            >
              <div className="text-sm text-gray-400 mb-1">{month.month}</div>
              <div className="text-xl font-bold text-white mb-2">
                {(month.balance / 1000).toFixed(1)}k€
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Entrées</span>
                  <span className="text-flow">+{(month.revenue / 1000).toFixed(1)}k</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Sorties</span>
                  <span className="text-error">-{(month.expenses / 1000).toFixed(1)}k</span>
                </div>
              </div>
              
              {/* Alerte si nécessaire */}
              {month.balance < 30000 && (
                <div className={clsx(
                  'mt-2 px-2 py-1 rounded text-xs flex items-center gap-1',
                  month.balance < 20000 ? 'bg-error/20 text-error' : 'bg-warning/20 text-warning'
                )}>
                  <AlertTriangle className="w-3 h-3" />
                  {month.balance < 20000 ? 'Critique' : 'Attention'}
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Suggestion Luna */}
      {alerts.length > 0 && (
        <Card className="p-5 border-vault/30 bg-gradient-to-r from-vault/10 to-transparent">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-core to-vision flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-1">🔮 Prédiction Luna</h4>
              <p className="text-gray-400 text-sm mb-3">
                D'après mes calculs, ta trésorerie pourrait être tendue en <span className="text-warning font-medium">{alerts[0]?.month}</span>. 
                Je te suggère de relancer les factures impayées dès maintenant pour sécuriser ton cash flow.
              </p>
              <div className="flex gap-2">
                <Button variant="vault" size="sm">
                  Voir les factures en retard
                </Button>
                <Button variant="ghost" size="sm">
                  Optimiser mes dépenses
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default CashFlowForecast
