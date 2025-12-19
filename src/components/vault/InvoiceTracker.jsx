// ═══════════════════════════════════════════════════════════════════════════
// 📄 INVOICE TRACKER - Suivi des factures avec alertes
// Liste des factures, statuts, relances automatiques
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, Clock, CheckCircle, AlertTriangle, XCircle,
  Send, ChevronRight, Filter, Search, Calendar,
  TrendingUp, ArrowUpRight, MoreHorizontal, Mail, Phone
} from 'lucide-react'
import clsx from 'clsx'
import { Card, Badge, Button, Avatar } from '@/components/ui'

// Statuts des factures
const INVOICE_STATUS = {
  paid: { label: 'Payée', color: 'success', icon: CheckCircle, bgColor: 'bg-flow/20' },
  pending: { label: 'En attente', color: 'warning', icon: Clock, bgColor: 'bg-warning/20' },
  overdue: { label: 'En retard', color: 'error', icon: AlertTriangle, bgColor: 'bg-error/20' },
  sent: { label: 'Envoyée', color: 'vision', icon: Send, bgColor: 'bg-vision/20' },
  draft: { label: 'Brouillon', color: 'default', icon: FileText, bgColor: 'bg-gray-500/20' },
}

// Générer des factures fictives
const generateInvoices = () => {
  const clients = [
    { name: 'Marie Dupont', email: 'marie.dupont@gmail.com', company: 'Studio Créatif' },
    { name: 'Thomas Bernard', email: 'thomas.b@startup.io', company: 'Tech Startup' },
    { name: 'Sophie Leroy', email: 'sophie@agence.fr', company: 'Agence Digital' },
    { name: 'Lucas Martin', email: 'lucas.m@conseil.com', company: 'Cabinet Conseil' },
    { name: 'Emma Wilson', email: 'emma@design.co', company: 'Design Studio' },
    { name: 'Pierre Durand', email: 'p.durand@corp.fr', company: 'Grande Corp' },
  ]
  
  const invoices = []
  const now = new Date()
  
  // Factures payées
  for (let i = 0; i < 8; i++) {
    const client = clients[Math.floor(Math.random() * clients.length)]
    const daysAgo = Math.floor(Math.random() * 60) + 5
    const date = new Date(now - daysAgo * 24 * 60 * 60 * 1000)
    
    invoices.push({
      id: `INV-${2024}${String(i + 1).padStart(4, '0')}`,
      client,
      amount: Math.floor(Math.random() * 3000) + 500,
      status: 'paid',
      issueDate: date,
      dueDate: new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000),
      paidDate: new Date(date.getTime() + Math.floor(Math.random() * 25) * 24 * 60 * 60 * 1000),
      description: ['Développement web', 'Consulting', 'Design UI/UX', 'Formation', 'Support mensuel'][Math.floor(Math.random() * 5)],
    })
  }
  
  // Factures en attente
  for (let i = 0; i < 4; i++) {
    const client = clients[Math.floor(Math.random() * clients.length)]
    const daysAgo = Math.floor(Math.random() * 20) + 1
    const date = new Date(now - daysAgo * 24 * 60 * 60 * 1000)
    
    invoices.push({
      id: `INV-${2024}${String(i + 10).padStart(4, '0')}`,
      client,
      amount: Math.floor(Math.random() * 2500) + 800,
      status: 'pending',
      issueDate: date,
      dueDate: new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000),
      description: ['Développement web', 'Consulting', 'Design UI/UX'][Math.floor(Math.random() * 3)],
    })
  }
  
  // Factures en retard
  for (let i = 0; i < 3; i++) {
    const client = clients[Math.floor(Math.random() * clients.length)]
    const daysAgo = Math.floor(Math.random() * 30) + 35
    const date = new Date(now - daysAgo * 24 * 60 * 60 * 1000)
    
    invoices.push({
      id: `INV-${2024}${String(i + 15).padStart(4, '0')}`,
      client,
      amount: Math.floor(Math.random() * 4000) + 1000,
      status: 'overdue',
      issueDate: date,
      dueDate: new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000),
      daysOverdue: Math.floor((now - new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)),
      remindersSent: Math.floor(Math.random() * 3) + 1,
      description: ['Projet complet', 'Consulting stratégique', 'Développement app'][Math.floor(Math.random() * 3)],
    })
  }
  
  // Trier par date
  return invoices.sort((a, b) => b.issueDate - a.issueDate)
}

// Ligne de facture
function InvoiceRow({ invoice, onAction }) {
  const status = INVOICE_STATUS[invoice.status]
  const StatusIcon = status.icon
  
  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 p-4 hover:bg-pulse-surface/50 rounded-xl transition-colors group"
    >
      {/* Icône statut */}
      <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', status.bgColor)}>
        <StatusIcon className={`w-5 h-5 text-${status.color}`} />
      </div>
      
      {/* Info facture */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white">{invoice.id}</span>
          <Badge variant={status.color} size="sm">{status.label}</Badge>
          {invoice.daysOverdue > 0 && (
            <Badge variant="error" size="sm">+{invoice.daysOverdue}j</Badge>
          )}
        </div>
        <div className="text-sm text-gray-400 truncate">
          {invoice.client.company} — {invoice.description}
        </div>
      </div>
      
      {/* Client */}
      <div className="hidden md:block text-right">
        <div className="text-sm text-white">{invoice.client.name}</div>
        <div className="text-xs text-gray-400">{invoice.client.email}</div>
      </div>
      
      {/* Montant */}
      <div className="text-right min-w-[100px]">
        <div className="text-lg font-bold text-vault">{invoice.amount.toLocaleString()}€</div>
        <div className="text-xs text-gray-400">
          {invoice.status === 'paid' ? `Payé ${formatDate(invoice.paidDate)}` : `Échéance ${formatDate(invoice.dueDate)}`}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {invoice.status === 'overdue' && (
          <Button 
            variant="error" 
            size="sm" 
            icon={Mail}
            onClick={() => onAction('remind', invoice)}
          >
            Relancer
          </Button>
        )}
        {invoice.status === 'pending' && (
          <Button 
            variant="ghost" 
            size="sm" 
            icon={Send}
            onClick={() => onAction('remind', invoice)}
          />
        )}
        <Button variant="ghost" size="sm" icon={MoreHorizontal} />
      </div>
    </motion.div>
  )
}

// Composant principal
export function InvoiceTracker({ className }) {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const invoices = useMemo(() => generateInvoices(), [])
  
  // Stats
  const stats = useMemo(() => {
    const paid = invoices.filter(i => i.status === 'paid')
    const pending = invoices.filter(i => i.status === 'pending')
    const overdue = invoices.filter(i => i.status === 'overdue')
    
    return {
      totalPaid: paid.reduce((sum, i) => sum + i.amount, 0),
      totalPending: pending.reduce((sum, i) => sum + i.amount, 0),
      totalOverdue: overdue.reduce((sum, i) => sum + i.amount, 0),
      countPending: pending.length,
      countOverdue: overdue.length,
    }
  }, [invoices])
  
  // Filtrage
  const filteredInvoices = useMemo(() => {
    let result = invoices
    
    if (filter !== 'all') {
      result = result.filter(i => i.status === filter)
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(i => 
        i.id.toLowerCase().includes(query) ||
        i.client.name.toLowerCase().includes(query) ||
        i.client.company.toLowerCase().includes(query)
      )
    }
    
    return result
  }, [invoices, filter, searchQuery])
  
  // Actions
  const handleAction = (action, invoice) => {
    console.log(`Action: ${action} on invoice ${invoice.id}`)
  }
  
  return (
    <div className={clsx('space-y-6', className)}>
      {/* Stats rapides */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">En attente</div>
              <div className="text-2xl font-bold text-warning">{stats.totalPending.toLocaleString()}€</div>
              <div className="text-xs text-gray-400">{stats.countPending} factures</div>
            </div>
            <Clock className="w-8 h-8 text-warning/50" />
          </div>
        </Card>
        
        <Card className="p-4 border-error/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">En retard</div>
              <div className="text-2xl font-bold text-error">{stats.totalOverdue.toLocaleString()}€</div>
              <div className="text-xs text-gray-400">{stats.countOverdue} factures</div>
            </div>
            <AlertTriangle className="w-8 h-8 text-error/50" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Encaissé (30j)</div>
              <div className="text-2xl font-bold text-flow">{stats.totalPaid.toLocaleString()}€</div>
              <div className="text-xs text-flow">+12% vs mois dernier</div>
            </div>
            <TrendingUp className="w-8 h-8 text-flow/50" />
          </div>
        </Card>
      </div>
      
      {/* Filtres et recherche */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une facture..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-pulse-surface border border-pulse-border text-white placeholder-gray-500 focus:outline-none focus:border-vault"
          />
        </div>
        
        <div className="flex rounded-xl overflow-hidden border border-pulse-border">
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'pending', label: 'En attente' },
            { id: 'overdue', label: 'En retard' },
            { id: 'paid', label: 'Payées' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={clsx(
                'px-4 py-2 text-sm font-medium transition-colors',
                filter === f.id ? 'bg-vault text-white' : 'bg-pulse-surface text-gray-400 hover:text-white'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Liste des factures */}
      <Card className="divide-y divide-pulse-border">
        <AnimatePresence>
          {filteredInvoices.map((invoice, i) => (
            <InvoiceRow 
              key={invoice.id} 
              invoice={invoice} 
              onAction={handleAction}
            />
          ))}
        </AnimatePresence>
        
        {filteredInvoices.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aucune facture trouvée</p>
          </div>
        )}
      </Card>
      
      {/* Action groupée si factures en retard */}
      {stats.countOverdue > 0 && filter !== 'paid' && (
        <Card className="p-4 border-error/30 bg-error/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-error" />
              <div>
                <div className="font-medium text-white">
                  {stats.countOverdue} factures en retard
                </div>
                <div className="text-sm text-gray-400">
                  Total: {stats.totalOverdue.toLocaleString()}€
                </div>
              </div>
            </div>
            <Button variant="error" icon={Mail}>
              Relancer toutes
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

export default InvoiceTracker
