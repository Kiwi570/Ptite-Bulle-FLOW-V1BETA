// ═══════════════════════════════════════════════════════════════════════════
// 🏪 PULSE STORE V2 - État global connecté enrichi
// V1 (CRM, Marketing, Vault) + V2 (Inbox révolutionnaire, Pipeline)
// ═══════════════════════════════════════════════════════════════════════════

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { emails as initialEmails, emailContacts as initialContacts, getInboxStats as calcInboxStats } from '@/data/inbox'
import { pipelineDeals as initialDeals, PIPELINE_STAGES, getPipelineStats as calcPipelineStats } from '@/data/pipeline'

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 STORE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

export const usePulseStore = create(
  persist(
    (set, get) => ({
      // ═══════════════════════════════════════════════════════════════════════
      // 🌓 THEME
      // ═══════════════════════════════════════════════════════════════════════
      theme: 'dark',
      
      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark'
        set({ theme: newTheme })
        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(newTheme)
      },
      
      initTheme: () => {
        const theme = get().theme
        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(theme)
      },

      // ═══════════════════════════════════════════════════════════════════════
      // 🫀 SCORE DE SANTÉ DYNAMIQUE
      // ═══════════════════════════════════════════════════════════════════════
      healthScore: 78,
      previousHealthScore: 78,
      subScores: {
        vision: 82,
        tribe: 75,
        flow: 68,
        vault: 88,
      },
      
      updateSubScore: (module, change) => {
        set((state) => {
          const newSubScores = {
            ...state.subScores,
            [module]: Math.min(100, Math.max(0, state.subScores[module] + change))
          }
          const newHealthScore = Math.round(
            (newSubScores.vision + newSubScores.tribe + newSubScores.flow + newSubScores.vault) / 4
          )
          return { 
            subScores: newSubScores, 
            previousHealthScore: state.healthScore,
            healthScore: newHealthScore 
          }
        })
      },

      // ═══════════════════════════════════════════════════════════════════════
      // 📊 STATISTIQUES TEMPS RÉEL
      // ═══════════════════════════════════════════════════════════════════════
      stats: {
        liveVisitors: 42,
        todayVisitors: 847,
        todayRevenue: 2340,
        pendingActions: 5,
        emailsSentToday: 12,
        openRate: 52,
      },
      
      updateStat: (key, value) => set((state) => ({
        stats: { ...state.stats, [key]: value }
      })),
      
      incrementStat: (key, amount = 1) => set((state) => ({
        stats: { ...state.stats, [key]: state.stats[key] + amount }
      })),

      // ═══════════════════════════════════════════════════════════════════════
      // 👥 CLIENTS CRM (TRIBE)
      // ═══════════════════════════════════════════════════════════════════════
      selectedClientId: null,
      clientFilter: null,
      clientModalOpen: false,
      
      setSelectedClient: (clientId) => set({ selectedClientId: clientId, clientModalOpen: !!clientId }),
      closeClientModal: () => set({ clientModalOpen: false, selectedClientId: null }),
      setClientFilter: (filter) => set({ clientFilter: filter }),

      // ═══════════════════════════════════════════════════════════════════════
      // 📝 JOURNAL D'ACTIVITÉS
      // ═══════════════════════════════════════════════════════════════════════
      activityLog: [],
      
      addActivity: (activity) => set((state) => ({
        activityLog: [
          { id: Date.now(), timestamp: new Date(), ...activity },
          ...state.activityLog
        ].slice(0, 100)
      })),

      // ═══════════════════════════════════════════════════════════════════════
      // 📧 EMAIL MARKETING (FLOW - Existant)
      // ═══════════════════════════════════════════════════════════════════════
      emailComposerOpen: false,
      emailDraft: null,
      emailRecipient: null,
      recentEmails: [],
      
      openEmailComposer: (recipient = null, template = null) => set({ 
        emailComposerOpen: true, 
        emailRecipient: recipient,
        emailDraft: template 
      }),
      
      closeEmailComposer: () => set({ 
        emailComposerOpen: false, 
        emailRecipient: null, 
        emailDraft: null 
      }),
      
      sendEmail: (email) => {
        const { updateSubScore, incrementStat, addToast, addActivity, addLunaInsight } = get()
        
        set((state) => ({
          recentEmails: [
            { id: Date.now(), sentAt: new Date(), ...email },
            ...state.recentEmails
          ].slice(0, 20),
          emailComposerOpen: false,
          emailDraft: null,
        }))
        
        updateSubScore('flow', 2)
        incrementStat('emailsSentToday', 1)
        
        addToast({
          type: 'success',
          title: 'Email envoyé ! 🚀',
          message: `"${email.subject}" envoyé à ${email.recipientCount || 1} contact(s)`
        })
        
        addActivity({
          type: 'email_sent',
          icon: '📧',
          title: 'Email envoyé',
          description: `"${email.subject}" → ${email.recipientName || email.recipientCount + ' contacts'}`,
          module: 'flow'
        })
        
        setTimeout(() => {
          addLunaInsight({
            type: 'success',
            message: `Email parti ! Je surveille les stats. En moyenne, tes emails sont ouverts dans les 2h. 📊`
          })
        }, 2000)
      },

      // ═══════════════════════════════════════════════════════════════════════
      // 📥 INBOX RÉVOLUTIONNAIRE (NOUVEAU)
      // ═══════════════════════════════════════════════════════════════════════
      inboxEmails: initialEmails,
      inboxContacts: initialContacts,
      selectedInboxEmail: null,
      selectedInboxContact: null,
      inboxView: 'stream', // 'stream' | 'constellation'
      inboxFilter: 'all', // 'all' | 'unread' | 'starred' | 'urgent'
      
      // Sélectionner un email
      selectInboxEmail: (emailId) => {
        const email = get().inboxEmails.find(e => e.id === emailId)
        set({ selectedInboxEmail: email || null })
        if (email && !email.read) {
          get().markInboxEmailRead(emailId)
        }
      },
      
      // Marquer comme lu
      markInboxEmailRead: (emailId) => {
        const { updateSubScore, addActivity } = get()
        set((state) => ({
          inboxEmails: state.inboxEmails.map(e => 
            e.id === emailId ? { ...e, read: true } : e
          )
        }))
        updateSubScore('flow', 1)
        addActivity({
          type: 'email_read',
          icon: '📧',
          title: 'Email traité',
          description: 'Un email a été lu et traité',
          module: 'flow'
        })
      },
      
      // Toggle étoile
      toggleInboxEmailStar: (emailId) => {
        set((state) => ({
          inboxEmails: state.inboxEmails.map(e => 
            e.id === emailId ? { ...e, starred: !e.starred } : e
          )
        }))
      },
      
      // Archiver email
      archiveInboxEmail: (emailId) => {
        const { updateSubScore, addToast } = get()
        set((state) => ({
          inboxEmails: state.inboxEmails.filter(e => e.id !== emailId),
          selectedInboxEmail: state.selectedInboxEmail?.id === emailId ? null : state.selectedInboxEmail,
        }))
        updateSubScore('flow', 2)
        addToast({
          type: 'success',
          title: 'Email archivé ✓',
          message: 'L\'email a été archivé'
        })
      },
      
      // Sélectionner contact
      selectInboxContact: (contactId) => set({ selectedInboxContact: contactId }),
      
      // Changer vue
      setInboxView: (view) => set({ inboxView: view }),
      
      // Changer filtre
      setInboxFilter: (filter) => set({ inboxFilter: filter }),
      
      // Stats inbox
      getInboxStats: () => calcInboxStats(get().inboxEmails),
      
      // Emails filtrés
      getFilteredInboxEmails: () => {
        const { inboxEmails, inboxFilter, selectedInboxContact } = get()
        return inboxEmails.filter(e => {
          if (selectedInboxContact && e.contactId !== selectedInboxContact) return false
          if (inboxFilter === 'unread') return !e.read && e.direction === 'incoming'
          if (inboxFilter === 'starred') return e.starred
          if (inboxFilter === 'urgent') return e.priority === 'urgent' || e.priority === 'high'
          return e.direction === 'incoming'
        })
      },

      // ═══════════════════════════════════════════════════════════════════════
      // 🎯 PIPELINE COMMERCIAL (NOUVEAU)
      // ═══════════════════════════════════════════════════════════════════════
      pipelineDeals: initialDeals,
      pipelineStages: PIPELINE_STAGES,
      selectedDeal: null,
      
      // Sélectionner un deal
      selectDeal: (dealId) => {
        const deal = get().pipelineDeals.find(d => d.id === dealId)
        set({ selectedDeal: deal || null })
      },
      
      // Déplacer un deal (drag & drop)
      moveDeal: (dealId, newStage) => {
        const { updateSubScore, addToast, addActivity, addLunaInsight } = get()
        const deal = get().pipelineDeals.find(d => d.id === dealId)
        const stage = PIPELINE_STAGES.find(s => s.id === newStage)
        
        if (!deal || !stage || deal.stage === newStage) return
        
        // Calculer nouvelle probabilité basée sur l'étape
        const probabilities = { discovery: 20, nurturing: 45, conversion: 75, loyalty: 100 }
        const newProbability = probabilities[newStage] || deal.probability
        
        // Mettre à jour le heat score
        const heatBoost = newStage === 'conversion' ? 15 : newStage === 'loyalty' ? 20 : 5
        const newHeatScore = Math.min(100, deal.heatScore + heatBoost)
        
        set((state) => ({
          pipelineDeals: state.pipelineDeals.map(d => 
            d.id === dealId 
              ? { ...d, stage: newStage, probability: newProbability, heatScore: newHeatScore }
              : d
          ),
          selectedDeal: state.selectedDeal?.id === dealId 
            ? { ...state.selectedDeal, stage: newStage, probability: newProbability, heatScore: newHeatScore }
            : state.selectedDeal
        }))
        
        // Impacts score
        const scoreImpact = newStage === 'conversion' ? 5 : newStage === 'loyalty' ? 10 : 2
        updateSubScore('tribe', scoreImpact)
        
        addToast({
          type: 'success',
          title: `Deal avancé ! ${stage.emoji}`,
          message: `${deal.clientName} → ${stage.name}`
        })
        
        addActivity({
          type: 'deal_moved',
          icon: stage.emoji,
          title: 'Deal déplacé',
          description: `${deal.clientName} (${deal.value.toLocaleString()}€) → ${stage.name}`,
          module: 'tribe'
        })
        
        // Luna réagit sur les conversions
        if (newStage === 'conversion' || newStage === 'loyalty') {
          setTimeout(() => {
            addLunaInsight({
              type: newStage === 'loyalty' ? 'celebration' : 'success',
              message: newStage === 'loyalty' 
                ? `🎉 Nouveau client fidélisé ! ${deal.clientName} rejoint ta tribu. +${deal.value.toLocaleString()}€ de valeur !`
                : `🔥 ${deal.clientName} passe en conversion ! ${deal.probability}% de chances de signer. Go go go !`
            })
          }, 1500)
        }
      },
      
      // Ajouter un deal
      addDeal: (dealData) => {
        const { updateSubScore, addToast, addActivity } = get()
        const newDeal = {
          id: `deal-${Date.now()}`,
          stage: 'discovery',
          probability: 20,
          heatScore: 50,
          createdAt: Date.now(),
          activities: [],
          tags: [],
          ...dealData,
        }
        
        set((state) => ({
          pipelineDeals: [...state.pipelineDeals, newDeal]
        }))
        
        updateSubScore('tribe', 5)
        
        addToast({
          type: 'success',
          title: 'Nouveau deal créé ! 🎯',
          message: `${newDeal.clientName} - ${newDeal.value?.toLocaleString() || 0}€`
        })
        
        addActivity({
          type: 'deal_created',
          icon: '🌱',
          title: 'Nouveau deal',
          description: `${newDeal.clientName} (${newDeal.value?.toLocaleString() || 0}€)`,
          module: 'tribe'
        })
      },
      
      // Mettre à jour un deal
      updateDeal: (dealId, updates) => {
        set((state) => ({
          pipelineDeals: state.pipelineDeals.map(d => 
            d.id === dealId ? { ...d, ...updates } : d
          ),
          selectedDeal: state.selectedDeal?.id === dealId 
            ? { ...state.selectedDeal, ...updates }
            : state.selectedDeal
        }))
      },
      
      // Stats pipeline
      getPipelineStats: () => calcPipelineStats(get().pipelineDeals),

      // ═══════════════════════════════════════════════════════════════════════
      // 🔗 CONNEXIONS INTER-MODULES
      // ═══════════════════════════════════════════════════════════════════════
      
      // Obtenir les emails d'un contact (pour pipeline)
      getEmailsForContact: (contactId) => {
        return get().inboxEmails.filter(e => e.contactId === contactId)
      },
      
      // Obtenir les emails d'un deal
      getEmailsForDeal: (dealId) => {
        const deal = get().pipelineDeals.find(d => d.id === dealId)
        if (!deal?.clientId) return []
        return get().inboxEmails.filter(e => e.contactId === deal.clientId)
      },
      
      // Obtenir le deal d'un contact
      getDealForContact: (contactId) => {
        return get().pipelineDeals.find(d => d.clientId === contactId)
      },
      
      // Créer un deal depuis un email
      createDealFromEmail: (emailId) => {
        const email = get().inboxEmails.find(e => e.id === emailId)
        if (!email) return
        
        const contact = get().inboxContacts.find(c => c.id === email.contactId)
        if (!contact) return
        
        get().addDeal({
          clientId: contact.id,
          clientName: contact.name,
          company: contact.company,
          avatar: contact.avatar,
          value: email.linkedAmount || 0,
          title: `Opportunité - ${email.subject}`,
          description: email.aiSummary || email.preview,
          source: 'Email entrant',
        })
      },

      // ═══════════════════════════════════════════════════════════════════════
      // 💰 FINANCES (VAULT)
      // ═══════════════════════════════════════════════════════════════════════
      sendInvoiceReminder: (invoice) => {
        const { updateSubScore, addToast, addActivity, addLunaInsight } = get()
        
        addToast({
          type: 'success',
          title: 'Relance envoyée ! 📤',
          message: `Email de relance envoyé à ${invoice.clientName}`
        })
        
        updateSubScore('vault', 1)
        updateSubScore('flow', 1)
        
        addActivity({
          type: 'invoice_reminder',
          icon: '📄',
          title: 'Facture relancée',
          description: `${invoice.number} - ${invoice.clientName} (${invoice.amount}€)`,
          module: 'vault'
        })
        
        setTimeout(() => {
          addLunaInsight({
            type: 'tip',
            message: `Relance envoyée à ${invoice.clientName} ! Fun fact: 68% des factures sont payées dans les 48h après relance. 🤞`
          })
        }, 1500)
      },
      
      markInvoicePaid: (invoice) => {
        const { updateSubScore, addToast, addActivity, addLunaInsight, incrementStat } = get()
        
        addToast({
          type: 'success',
          title: 'Paiement reçu ! 💰',
          message: `${invoice.amount.toLocaleString()}€ reçus de ${invoice.clientName}`
        })
        
        updateSubScore('vault', 3)
        incrementStat('todayRevenue', invoice.amount)
        
        addActivity({
          type: 'payment_received',
          icon: '💰',
          title: 'Paiement reçu',
          description: `${invoice.clientName} - ${invoice.amount.toLocaleString()}€`,
          module: 'vault'
        })
        
        setTimeout(() => {
          addLunaInsight({
            type: 'celebration',
            message: `Ka-ching ! 💰 +${invoice.amount.toLocaleString()}€ en banque. Ta trésorerie te remercie !`
          })
        }, 1000)
      },

      // ═══════════════════════════════════════════════════════════════════════
      // 🔔 SYSTÈME DE TOASTS
      // ═══════════════════════════════════════════════════════════════════════
      toasts: [],
      
      addToast: (toast) => {
        const id = Date.now() + Math.random()
        set((state) => ({
          toasts: [...state.toasts, { id, ...toast }]
        }))
        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter(t => t.id !== id)
          }))
        }, 4000)
      },
      
      removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter(t => t.id !== id)
      })),

      // ═══════════════════════════════════════════════════════════════════════
      // 🤖 LUNA AI
      // ═══════════════════════════════════════════════════════════════════════
      lunaOpen: false,
      lunaTab: 'chat',
      lunaInsights: [],
      lunaNotifications: 3,
      
      toggleLuna: () => set((state) => ({ 
        lunaOpen: !state.lunaOpen,
        lunaNotifications: state.lunaOpen ? state.lunaNotifications : 0 
      })),
      closeLuna: () => set({ lunaOpen: false }),
      setLunaTab: (tab) => set({ lunaTab: tab }),
      
      addLunaInsight: (insight) => set((state) => ({
        lunaInsights: [
          { id: Date.now(), timestamp: new Date(), ...insight },
          ...state.lunaInsights
        ].slice(0, 20),
        lunaNotifications: state.lunaNotifications + 1
      })),

      // ═══════════════════════════════════════════════════════════════════════
      // 🎯 ACTIONS SUGGÉRÉES
      // ═══════════════════════════════════════════════════════════════════════
      suggestedActions: [
        { id: 1, type: 'dormant_clients', title: 'Réactiver 8 clients dormants', description: 'Ils n\'ont pas acheté depuis 60+ jours', impact: '+2 400€ potentiel', priority: 'high', module: 'tribe' },
        { id: 2, type: 'abandoned_carts', title: 'Récupérer 12 paniers abandonnés', description: 'Valeur totale: 1 890€', impact: '+1 100€ estimé', priority: 'high', module: 'flow' },
        { id: 3, type: 'overdue_invoices', title: 'Relancer 3 factures en retard', description: 'Total: 4 200€ à encaisser', impact: '+4 200€ trésorerie', priority: 'urgent', module: 'vault' },
        { id: 4, type: 'hot_deals', title: '3 deals chauds à closer', description: 'Score chaleur > 80%', impact: '+15 700€ potentiel', priority: 'high', module: 'tribe' },
      ],
      
      completeSuggestedAction: (actionId) => {
        const { addToast, updateSubScore, addActivity } = get()
        const action = get().suggestedActions.find(a => a.id === actionId)
        
        set((state) => ({
          suggestedActions: state.suggestedActions.filter(a => a.id !== actionId),
          stats: { ...state.stats, pendingActions: Math.max(0, state.stats.pendingActions - 1) }
        }))
        
        addToast({
          type: 'success',
          title: 'Action complétée ! ✅',
          message: action?.title || 'Bien joué !'
        })
        
        updateSubScore(action?.module || 'tribe', 2)
        
        addActivity({
          type: 'action_completed',
          icon: '✅',
          title: 'Action suggérée complétée',
          description: action?.title,
          module: action?.module
        })
      },

      // ═══════════════════════════════════════════════════════════════════════
      // 🧭 NAVIGATION
      // ═══════════════════════════════════════════════════════════════════════
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // ═══════════════════════════════════════════════════════════════════════
      // 🔄 RESET DÉMO
      // ═══════════════════════════════════════════════════════════════════════
      resetDemo: () => {
        set({
          healthScore: 78,
          previousHealthScore: 78,
          subScores: { vision: 82, tribe: 75, flow: 68, vault: 88 },
          stats: {
            liveVisitors: 42,
            todayVisitors: 847,
            todayRevenue: 2340,
            pendingActions: 5,
            emailsSentToday: 12,
            openRate: 52,
          },
          // V1
          activityLog: [],
          recentEmails: [],
          lunaInsights: [],
          lunaNotifications: 3,
          toasts: [],
          selectedClientId: null,
          clientFilter: null,
          // V2 Inbox
          inboxEmails: initialEmails,
          inboxContacts: initialContacts,
          selectedInboxEmail: null,
          selectedInboxContact: null,
          inboxView: 'stream',
          inboxFilter: 'all',
          // V2 Pipeline
          pipelineDeals: initialDeals,
          selectedDeal: null,
          // Actions
          suggestedActions: [
            { id: 1, type: 'dormant_clients', title: 'Réactiver 8 clients dormants', description: 'Ils n\'ont pas acheté depuis 60+ jours', impact: '+2 400€ potentiel', priority: 'high', module: 'tribe' },
            { id: 2, type: 'abandoned_carts', title: 'Récupérer 12 paniers abandonnés', description: 'Valeur totale: 1 890€', impact: '+1 100€ estimé', priority: 'high', module: 'flow' },
            { id: 3, type: 'overdue_invoices', title: 'Relancer 3 factures en retard', description: 'Total: 4 200€ à encaisser', impact: '+4 200€ trésorerie', priority: 'urgent', module: 'vault' },
            { id: 4, type: 'hot_deals', title: '3 deals chauds à closer', description: 'Score chaleur > 80%', impact: '+15 700€ potentiel', priority: 'high', module: 'tribe' },
          ],
        })
        localStorage.removeItem('pulse-v2-storage')
      },
    }),
    {
      name: 'pulse-v2-storage',
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
)

export default usePulseStore
