// ═══════════════════════════════════════════════════════════════════════════
// 🧠 LUNA AI - Intelligence artificielle contextuelle
// Réponses intelligentes basées sur mots-clés et contexte
// ═══════════════════════════════════════════════════════════════════════════

import { clientPersonas, narrativeStats, narrativeInvoices } from './narrative'

// ─────────────────────────────────────────────────────────────────────────────
// PATTERNS DE DÉTECTION
// ─────────────────────────────────────────────────────────────────────────────

const PATTERNS = {
  // Ventes & Revenus
  sales: /vente|revenue|chiffre|ca|argent|€|euros?|gagn/i,
  
  // Clients
  clients: /client|customer|utilisateur|user|acheteur/i,
  dormant: /dormant|inactif|perdu|churn|réactiv|reveill/i,
  nouveau: /nouveau|new|récent|dernier|inscrit/i,
  
  // Emails
  email: /email|mail|newsletter|campagne|envoy/i,
  
  // Factures
  invoice: /facture|invoice|paiement|impayé|retard|relance/i,
  
  // Métriques
  score: /score|santé|health|performance|kpi/i,
  stats: /stat|metric|chiffre|nombre|combien|total/i,
  
  // Actions
  help: /aide|help|comment|quoi faire|suggè|conseil|recommand/i,
  action: /action|faire|créer|envoyer|lancer/i,
  
  // Gratitude
  thanks: /merci|thank|super|génial|parfait|excellent/i,
  
  // Salutations
  greeting: /salut|hello|bonjour|hey|coucou|yo/i,
  
  // Questions
  question: /\?|pourquoi|comment|quand|où|qui|quel/i,
}

// ─────────────────────────────────────────────────────────────────────────────
// RÉPONSES CONTEXTUELLES
// ─────────────────────────────────────────────────────────────────────────────

const generateResponse = (input, context = {}) => {
  const lowerInput = input.toLowerCase()
  
  // Déterminer le type de question
  const matchedPatterns = Object.entries(PATTERNS)
    .filter(([_, regex]) => regex.test(lowerInput))
    .map(([key]) => key)
  
  // ═══ SALUTATIONS ═══
  if (matchedPatterns.includes('greeting') && matchedPatterns.length <= 2) {
    return randomFrom([
      { text: "Hey ! 👋 Comment ça va aujourd'hui ? Je suis là pour t'aider avec ton business !", suggestions: ['Comment vont mes ventes ?', 'Qui sont mes clients dormants ?', 'Que dois-je faire ?'] },
      { text: "Salut ! 🌟 Prêt à faire décoller ton business ? Demande-moi ce que tu veux !", suggestions: ['Montre-moi mes stats', 'Des clients à réactiver ?', 'Aide-moi'] },
      { text: "Hello ! 😊 Ton business m'a l'air en forme aujourd'hui. Une question ?", suggestions: ['Comment va mon score ?', 'Mes dernières ventes', 'Quoi de neuf ?'] },
    ])
  }
  
  // ═══ REMERCIEMENTS ═══
  if (matchedPatterns.includes('thanks')) {
    return randomFrom([
      { text: "Avec plaisir ! 💜 C'est mon job de t'aider à réussir. Autre chose ?", suggestions: ['Oui, une autre question', 'Non, merci !'] },
      { text: "De rien ! 🚀 N'hésite pas si tu as d'autres questions !", suggestions: ['Montre-moi mes priorités', 'C\'est tout pour l\'instant'] },
      { text: "Always ! 🙌 Je suis là H24 pour toi. Besoin d'autre chose ?", suggestions: ['Mes actions du jour', 'Non ça va'] },
    ])
  }
  
  // ═══ CLIENTS DORMANTS ═══
  if (matchedPatterns.includes('dormant') || matchedPatterns.includes('clients') && lowerInput.includes('réactiv')) {
    const dormants = clientPersonas.filter(c => c.status === 'dormant')
    const potential = narrativeStats.dormantRecoveryPotential
    
    return {
      text: `🔔 Tu as ${dormants.length} clients dormants avec un potentiel de ${potential.toLocaleString()}€ à récupérer !\n\n` +
        dormants.map(c => `• **${c.name}** — Score ${c.score}/100, dernier achat il y a ${daysSince(c.lastOrder)} jours`).join('\n') +
        `\n\nJe te recommande de commencer par **${dormants[0]?.name}** qui a le plus gros potentiel.`,
      suggestions: [`Email de réactivation pour ${dormants[0]?.name}`, 'Voir tous les dormants', 'Créer une campagne de réactivation'],
      action: { type: 'navigate', target: '/tribe', filter: 'dormant' },
    }
  }
  
  // ═══ NOUVEAUX CLIENTS ═══
  if (matchedPatterns.includes('nouveau')) {
    const newClients = clientPersonas.filter(c => c.status === 'nouveau')
    
    return {
      text: `🌟 Tu as ${newClients.length} nouveaux clients récents !\n\n` +
        newClients.map(c => `• **${c.name}** — Inscrit le ${formatDate(c.joinDate)}, premier achat de ${c.totalRevenue}€`).join('\n') +
        `\n\nL'onboarding est crucial ! Un email de bienvenue personnalisé peut augmenter la rétention de 40%.`,
      suggestions: ['Envoyer un email de bienvenue', 'Voir les nouveaux clients', 'Créer une séquence onboarding'],
      action: { type: 'navigate', target: '/tribe', filter: 'nouveau' },
    }
  }
  
  // ═══ VENTES & REVENUS ═══
  if (matchedPatterns.includes('sales')) {
    return {
      text: `💰 Voici tes stats de ventes :\n\n` +
        `• **CA total clients** : ${narrativeStats.totalRevenue.toLocaleString()}€\n` +
        `• **Nombre de clients** : ${narrativeStats.total}\n` +
        `• **Panier moyen** : ${Math.round(narrativeStats.totalRevenue / narrativeStats.total)}€\n` +
        `• **Meilleur client** : ${clientPersonas.sort((a,b) => b.totalRevenue - a.totalRevenue)[0].name} (${clientPersonas[0].totalRevenue}€)\n\n` +
        `📈 Tendance positive ! Continue comme ça.`,
      suggestions: ['Qui sont mes meilleurs clients ?', 'Comment augmenter le panier moyen ?', 'Voir le détail'],
    }
  }
  
  // ═══ FACTURES ═══
  if (matchedPatterns.includes('invoice')) {
    const overdue = narrativeInvoices.filter(i => i.status === 'overdue')
    const pending = narrativeInvoices.filter(i => i.status === 'sent')
    const totalOverdue = overdue.reduce((sum, i) => sum + i.amount, 0)
    
    if (overdue.length > 0) {
      return {
        text: `⚠️ Attention ! Tu as ${overdue.length} facture(s) en retard pour un total de ${totalOverdue.toLocaleString()}€ :\n\n` +
          overdue.map(i => `• **${i.client}** (${i.company}) — ${i.amount}€, ${i.daysOverdue}j de retard`).join('\n') +
          `\n\nJe te recommande de relancer **${overdue[0].client}** en priorité.`,
        suggestions: [`Relancer ${overdue[0].client}`, 'Relancer toutes les factures', 'Voir dans Vault'],
        action: { type: 'navigate', target: '/vault', tab: 'invoices' },
        priority: 'high',
      }
    }
    
    return {
      text: `📄 Situation des factures :\n\n` +
        `• **En attente** : ${pending.length} factures (${pending.reduce((s,i) => s + i.amount, 0).toLocaleString()}€)\n` +
        `• **En retard** : ${overdue.length} 🎉\n\n` +
        `Tout est sous contrôle côté facturation !`,
      suggestions: ['Créer une nouvelle facture', 'Voir toutes les factures'],
    }
  }
  
  // ═══ SCORE DE SANTÉ ═══
  if (matchedPatterns.includes('score')) {
    const avgScore = narrativeStats.avgScore
    const trend = avgScore > 65 ? '📈 en hausse' : avgScore > 50 ? '➡️ stable' : '📉 à surveiller'
    
    return {
      text: `🫀 Score de santé de ton business : **${avgScore}/100** (${trend})\n\n` +
        `Détail par module :\n` +
        `• Vision (Analytics) : 92/100 ✅\n` +
        `• Tribe (Clients) : ${avgScore}/100\n` +
        `• Flow (Emails) : 78/100\n` +
        `• Vault (Finances) : 85/100\n\n` +
        `💡 Pour améliorer : réactive tes clients dormants (+5 points potentiels)`,
      suggestions: ['Comment améliorer mon score ?', 'Voir les clients dormants', 'Détail du score'],
    }
  }
  
  // ═══ AIDE / SUGGESTIONS ═══
  if (matchedPatterns.includes('help') || matchedPatterns.includes('action')) {
    const priorities = generatePriorities()
    
    return {
      text: `🎯 Voici tes priorités du jour :\n\n` +
        priorities.map((p, i) => `${i + 1}. **${p.title}** — ${p.description}`).join('\n') +
        `\n\nPar quoi veux-tu commencer ?`,
      suggestions: priorities.slice(0, 3).map(p => p.action),
    }
  }
  
  // ═══ EMAILS ═══
  if (matchedPatterns.includes('email')) {
    return {
      text: `📧 Tu veux envoyer un email ? Je peux t'aider !\n\n` +
        `Quelques idées :\n` +
        `• **Réactivation** — Pour tes ${narrativeStats.byStatus.dormant} clients dormants\n` +
        `• **Bienvenue** — Pour tes ${narrativeStats.byStatus.nouveau} nouveaux clients\n` +
        `• **Newsletter** — Pour tous tes clients\n` +
        `• **Relance facture** — Pour les factures en attente\n\n` +
        `Dis-moi ce que tu veux envoyer !`,
      suggestions: ['Créer un email de réactivation', 'Email de bienvenue', 'Aller dans Flow'],
      action: { type: 'navigate', target: '/flow' },
    }
  }
  
  // ═══ STATS GÉNÉRALES ═══
  if (matchedPatterns.includes('stats')) {
    return {
      text: `📊 Tes stats en un coup d'œil :\n\n` +
        `**Clients**\n` +
        `• Total : ${narrativeStats.total}\n` +
        `• Ambassadeurs : ${narrativeStats.byStatus.ambassadeur}\n` +
        `• Actifs : ${narrativeStats.byStatus.actif}\n` +
        `• Dormants : ${narrativeStats.byStatus.dormant} ⚠️\n` +
        `• Nouveaux : ${narrativeStats.byStatus.nouveau}\n\n` +
        `**Revenus**\n` +
        `• CA total : ${narrativeStats.totalRevenue.toLocaleString()}€\n` +
        `• Potentiel dormants : ${narrativeStats.dormantRecoveryPotential.toLocaleString()}€`,
      suggestions: ['Voir les dormants', 'Voir les ambassadeurs', 'Détail revenus'],
    }
  }
  
  // ═══ QUESTION GÉNÉRIQUE ═══
  if (matchedPatterns.includes('question')) {
    return {
      text: `🤔 Bonne question ! Laisse-moi réfléchir...\n\n` +
        `Je peux t'aider sur :\n` +
        `• 📈 **Ventes & revenus** — "Comment vont mes ventes ?"\n` +
        `• 👥 **Clients** — "Qui sont mes clients dormants ?"\n` +
        `• 📧 **Emails** — "Aide-moi à créer un email"\n` +
        `• 💰 **Factures** — "J'ai des impayés ?"\n` +
        `• 🎯 **Actions** — "Que dois-je faire aujourd'hui ?"\n\n` +
        `Reformule ta question et je ferai de mon mieux !`,
      suggestions: ['Mes priorités du jour', 'État de mon business', 'Aide-moi à décider'],
    }
  }
  
  // ═══ RÉPONSE PAR DÉFAUT (intelligente) ═══
  return randomFrom([
    {
      text: `Hmm, je ne suis pas sûre de comprendre... 🤔\n\nMais je peux t'aider avec plein de choses ! Essaie de me demander :\n` +
        `• "Comment vont mes ventes ?"\n` +
        `• "Qui sont mes clients dormants ?"\n` +
        `• "Que dois-je faire aujourd'hui ?"`,
      suggestions: ['Mes ventes', 'Mes clients dormants', 'Mes priorités'],
    },
    {
      text: `Je n'ai pas tout compris, mais pas de souci ! 😊\n\nVoici ce que je sais faire :\n` +
        `• Analyser tes clients et revenus\n` +
        `• Te suggérer des actions prioritaires\n` +
        `• T'aider à créer des emails\n` +
        `• Suivre tes factures`,
      suggestions: ['Analyse mes clients', 'Mes actions du jour', 'Créer un email'],
    },
  ])
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function daysSince(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  return Math.floor((now - date) / (1000 * 60 * 60 * 24))
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

function generatePriorities() {
  const priorities = []
  
  // Factures en retard
  const overdueInvoices = narrativeInvoices.filter(i => i.status === 'overdue')
  if (overdueInvoices.length > 0) {
    priorities.push({
      title: '🚨 Relancer les factures en retard',
      description: `${overdueInvoices.length} facture(s) impayée(s)`,
      action: 'Relancer les factures',
      priority: 1,
    })
  }
  
  // Clients dormants
  const dormants = clientPersonas.filter(c => c.status === 'dormant')
  if (dormants.length > 0) {
    priorities.push({
      title: '💤 Réactiver les clients dormants',
      description: `${dormants.length} clients à réveiller (${narrativeStats.dormantRecoveryPotential}€ potentiel)`,
      action: 'Voir les dormants',
      priority: 2,
    })
  }
  
  // Nouveaux clients à onboarder
  const newClients = clientPersonas.filter(c => c.status === 'nouveau')
  if (newClients.length > 0) {
    priorities.push({
      title: '🌟 Onboarder les nouveaux',
      description: `${newClients.length} client(s) à accueillir`,
      action: 'Email de bienvenue',
      priority: 3,
    })
  }
  
  // Upsell ambassadeurs
  const ambassadors = clientPersonas.filter(c => c.status === 'ambassadeur')
  if (ambassadors.length > 0) {
    priorities.push({
      title: '🎯 Proposer l\'offre Premium',
      description: `${ambassadors.length} ambassadeur(s) prêts pour l'upgrade`,
      action: 'Créer une offre VIP',
      priority: 4,
    })
  }
  
  return priorities.sort((a, b) => a.priority - b.priority)
}

// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS CONTEXTUELS (selon la page)
// ─────────────────────────────────────────────────────────────────────────────

export const contextualInsights = {
  dashboard: () => {
    const dormants = clientPersonas.filter(c => c.status === 'dormant').length
    const potential = narrativeStats.dormantRecoveryPotential
    return {
      message: `Tu as ${dormants} clients dormants. Potentiel récupérable : ${potential.toLocaleString()}€ 💰`,
      action: { label: 'Les réactiver', target: '/tribe', filter: 'dormant' },
    }
  },
  vision: () => ({
    message: "42 visiteurs en ce moment ! Le trafic est 12% au-dessus de la normale.",
    action: { label: 'Mode Fantôme', target: 'ghostMode' },
  }),
  tribe: () => {
    const dormants = clientPersonas.filter(c => c.status === 'dormant')
    const topDormant = dormants[0]
    return {
      message: `${topDormant?.name} n'a pas acheté depuis ${daysSince(topDormant?.lastOrder || '')} jours. Un email de réactivation ?`,
      action: { label: 'Envoyer un email', target: '/flow', client: topDormant },
    }
  },
  flow: () => ({
    message: "Tes dernières campagnes ont un taux d'ouverture de 52% ! Au-dessus de la moyenne.",
    action: { label: 'Créer une campagne', target: 'newCampaign' },
  }),
  vault: () => {
    const overdue = narrativeInvoices.filter(i => i.status === 'overdue')
    if (overdue.length > 0) {
      return {
        message: `⚠️ ${overdue.length} facture(s) en retard ! Total : ${overdue.reduce((s,i) => s + i.amount, 0).toLocaleString()}€`,
        action: { label: 'Relancer', target: 'remindInvoices' },
        priority: 'high',
      }
    }
    return {
      message: "Ta trésorerie est saine. 8.5 mois de runway au rythme actuel. 👍",
      action: { label: 'Voir les prévisions', target: 'forecast' },
    }
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export { generateResponse, generatePriorities, PATTERNS }

export default {
  generateResponse,
  generatePriorities,
  contextualInsights,
  PATTERNS,
}
