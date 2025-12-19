// ═══════════════════════════════════════════════════════════════════════════
// 💰 VAULT V3 - Finances MAGNIFIQUE
// Trésorerie, factures, prévisions
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wallet, TrendingUp, TrendingDown, FileText, Clock, CheckCircle, 
  AlertCircle, Calendar, ArrowUpRight, ArrowDownRight, Plus, Filter,
  Download, Eye, Send, MoreHorizontal
} from 'lucide-react'
import clsx from 'clsx'
import { Card, Button, Badge, HeroHeader, StatCard, Tabs, Divider } from '@/components/ui'

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════

const INVOICES = [
  { id: 'FAC-2024-087', client: 'Studio Lumière', amount: 4500, date: '2024-12-15', dueDate: '2024-12-30', status: 'pending' },
  { id: 'FAC-2024-086', client: 'Marie Dupont', amount: 1200, date: '2024-12-10', dueDate: '2024-12-25', status: 'paid' },
  { id: 'FAC-2024-085', client: 'Boutique Zen', amount: 3200, date: '2024-12-05', dueDate: '2024-12-20', status: 'overdue' },
  { id: 'FAC-2024-084', client: 'Jean Martin', amount: 850, date: '2024-12-01', dueDate: '2024-12-15', status: 'paid' },
  { id: 'FAC-2024-083', client: 'Sophie Bernard', amount: 2100, date: '2024-11-28', dueDate: '2024-12-13', status: 'paid' },
]

const EXPENSES = [
  { id: 1, category: 'Marketing', amount: 1250, icon: '📣', color: '#F472B6' },
  { id: 2, category: 'Logiciels', amount: 450, icon: '💻', color: '#22D3EE' },
  { id: 3, category: 'Matières premières', amount: 2800, icon: '📦', color: '#A78BFA' },
  { id: 4, category: 'Livraison', amount: 680, icon: '🚚', color: '#34D399' },
  { id: 5, category: 'Autres', amount: 320, icon: '📋', color: '#FBBF24' },
]

const CASH_FLOW = [
  { month: 'Jan', income: 12500, expenses: 8200 },
  { month: 'Fév', income: 14200, expenses: 9100 },
  { month: 'Mar', income: 11800, expenses: 8800 },
  { month: 'Avr', income: 16500, expenses: 10200 },
  { month: 'Mai', income: 18200, expenses: 11500 },
  { month: 'Juin', income: 15800, expenses: 9800 },
]

// ═══════════════════════════════════════════════════════════════════════════
// CASHFLOW CHART
// ═══════════════════════════════════════════════════════════════════════════

function CashFlowChart() {
  const maxValue = Math.max(...CASH_FLOW.flatMap(m => [m.income, m.expenses]))
  
  return (
    <Card className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-vault" />
          Cash Flow
        </h3>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-flow" />
            Revenus
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-error" />
            Dépenses
          </span>
        </div>
      </div>
      
      <div className="flex items-end justify-between gap-4 h-64">
        {CASH_FLOW.map((month, i) => {
          const incomeHeight = (month.income / maxValue) * 100
          const expenseHeight = (month.expenses / maxValue) * 100
          const profit = month.income - month.expenses
          
          return (
            <motion.div
              key={month.month}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="w-full flex items-end justify-center gap-1 h-48">
                <motion.div
                  className="w-5 bg-flow rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: `${incomeHeight}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />
                <motion.div
                  className="w-5 bg-error/70 rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: `${expenseHeight}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.1 }}
                />
              </div>
              
              <span className="text-xs text-gray-500">{month.month}</span>
              <span className={clsx('text-xs font-semibold', profit > 0 ? 'text-flow' : 'text-error')}>
                {profit > 0 ? '+' : ''}{(profit / 1000).toFixed(1)}k
              </span>
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// DÉPENSES
// ═══════════════════════════════════════════════════════════════════════════

function ExpenseBreakdown() {
  const total = EXPENSES.reduce((sum, e) => sum + e.amount, 0)
  
  return (
    <Card className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <TrendingDown className="w-6 h-6 text-error" />
          Dépenses du mois
        </h3>
        <span className="text-2xl font-bold text-error">{total.toLocaleString()}€</span>
      </div>
      
      <div className="space-y-4">
        {EXPENSES.map((expense, i) => {
          const percentage = (expense.amount / total) * 100
          
          return (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{expense.icon}</span>
                  <span className="text-gray-300">{expense.category}</span>
                </div>
                <span className="font-bold text-white">{expense.amount.toLocaleString()}€</span>
              </div>
              
              <div className="h-2.5 bg-pulse-surface rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: expense.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// FACTURES
// ═══════════════════════════════════════════════════════════════════════════

function InvoicesList() {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'paid': return { label: 'Payée', variant: 'success', icon: CheckCircle }
      case 'pending': return { label: 'En attente', variant: 'warning', icon: Clock }
      case 'overdue': return { label: 'En retard', variant: 'error', icon: AlertCircle }
      default: return { label: status, variant: 'default', icon: FileText }
    }
  }
  
  const stats = {
    total: INVOICES.reduce((sum, inv) => sum + inv.amount, 0),
    paid: INVOICES.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    pending: INVOICES.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
    overdue: INVOICES.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0),
  }
  
  return (
    <div className="space-y-6">
      {/* Stats factures */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <p className="text-sm text-gray-400 mb-1">Total facturé</p>
          <p className="text-2xl font-bold text-white">{stats.total.toLocaleString()}€</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-flow">
          <p className="text-sm text-gray-400 mb-1">Payées</p>
          <p className="text-2xl font-bold text-flow">{stats.paid.toLocaleString()}€</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-warning">
          <p className="text-sm text-gray-400 mb-1">En attente</p>
          <p className="text-2xl font-bold text-warning">{stats.pending.toLocaleString()}€</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-error">
          <p className="text-sm text-gray-400 mb-1">En retard</p>
          <p className="text-2xl font-bold text-error">{stats.overdue.toLocaleString()}€</p>
        </Card>
      </div>
      
      {/* Liste factures */}
      <Card className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Factures récentes</h3>
          <Button variant="vault" icon={Plus} size="sm">Nouvelle facture</Button>
        </div>
        
        <div className="space-y-3">
          {INVOICES.map((invoice, i) => {
            const statusConfig = getStatusConfig(invoice.status)
            const StatusIcon = statusConfig.icon
            
            return (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-5 cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={clsx(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      invoice.status === 'paid' && 'bg-flow/20',
                      invoice.status === 'pending' && 'bg-warning/20',
                      invoice.status === 'overdue' && 'bg-error/20',
                    )}>
                      <FileText className={clsx(
                        'w-6 h-6',
                        invoice.status === 'paid' && 'text-flow',
                        invoice.status === 'pending' && 'text-warning',
                        invoice.status === 'overdue' && 'text-error',
                      )} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-white">{invoice.id}</span>
                        <Badge variant={statusConfig.variant} size="sm">
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">{invoice.client}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-vault">{invoice.amount.toLocaleString()}€</p>
                      <p className="text-xs text-gray-500">Échéance: {invoice.dueDate}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-pulse-surface rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-pulse-surface rounded-lg transition-colors">
                        <Send className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-pulse-surface rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PRÉVISIONS
// ═══════════════════════════════════════════════════════════════════════════

function CashForecast() {
  const forecast = [
    { month: 'Déc', predicted: 42500, confidence: 'high' },
    { month: 'Jan', predicted: 38200, confidence: 'high' },
    { month: 'Fév', predicted: 41000, confidence: 'medium' },
    { month: 'Mar', predicted: 45500, confidence: 'low' },
  ]
  
  return (
    <Card className="p-6 md:p-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <Calendar className="w-6 h-6 text-vault" />
        Prévisions trésorerie
      </h3>
      
      <div className="space-y-4">
        {forecast.map((month, i) => (
          <motion.div
            key={month.month}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-pulse-surface/50"
          >
            <div className="w-16">
              <span className="text-gray-400 font-medium">{month.month}</span>
            </div>
            
            <div className="flex-1">
              <div className="h-3 bg-pulse-surface rounded-full overflow-hidden">
                <motion.div
                  className={clsx(
                    'h-full rounded-full',
                    month.confidence === 'high' && 'bg-flow',
                    month.confidence === 'medium' && 'bg-warning',
                    month.confidence === 'low' && 'bg-gray-500',
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${(month.predicted / 50000) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-lg font-bold text-vault">{month.predicted.toLocaleString()}€</p>
              <Badge 
                variant={month.confidence === 'high' ? 'success' : month.confidence === 'medium' ? 'warning' : 'default'}
                size="sm"
              >
                {month.confidence === 'high' ? 'Confiance haute' : month.confidence === 'medium' ? 'Confiance moyenne' : 'Confiance basse'}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════

export default function VaultPage() {
  const [activeTab, setActiveTab] = useState('overview')
  
  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Wallet },
    { id: 'invoices', label: 'Factures', icon: FileText },
  ]
  
  return (
    <div className="space-y-8">
      <HeroHeader
        icon={Wallet}
        title="Coffre"
        subtitle="Finances, factures et trésorerie"
        color="vault"
      >
        <Button variant="vault" icon={Plus}>Nouvelle facture</Button>
      </HeroHeader>
      
      {/* Stats principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Solde actuel" value={45230} suffix="€" icon={Wallet} color="vault" size="large" />
        <StatCard label="CA ce mois" value={18200} suffix="€" icon={TrendingUp} color="flow" change={12} />
        <StatCard label="Dépenses" value={5500} suffix="€" icon={TrendingDown} color="error" change={-8} />
        <StatCard label="Marge" value={68} suffix="%" icon={ArrowUpRight} color="vision" change={5} />
      </div>
      
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {activeTab === 'overview' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <CashFlowChart />
              <ExpenseBreakdown />
              <div className="lg:col-span-2">
                <CashForecast />
              </div>
            </div>
          ) : (
            <InvoicesList />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
