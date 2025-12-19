// ═══════════════════════════════════════════════════════════════════════════
// 🤖 MOCK DATA - LUNA
// Briefings, suggestions et alertes contextuelles
// ═══════════════════════════════════════════════════════════════════════════

export const morningBriefing = {
  date: new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }),
  greeting: 'Bonjour ! ☀️',
  summary: 'Voici ton business ce matin :',
  
  wins: [
    {
      icon: '🎉',
      title: '3 nouvelles ventes cette nuit',
      detail: '+890€ de revenus',
      type: 'revenue',
    },
    {
      icon: '⭐',
      title: 'Marie Dubois t\'a laissé un avis 5 étoiles',
      detail: 'Sur Google Business',
      type: 'review',
    },
    {
      icon: '📧',
      title: 'Ton mail "Promo Noël" cartonne !',
      detail: '52% d\'ouverture (record !)',
      type: 'email',
    },
    {
      icon: '📈',
      title: 'Trafic en hausse',
      detail: '+23% vs semaine dernière',
      type: 'traffic',
    },
  ],
  
  alerts: [
    {
      icon: '🛒',
      title: '5 paniers abandonnés hier',
      detail: 'Valeur totale : 1 240€',
      type: 'cart',
      priority: 'high',
      action: {
        label: 'Envoyer relance',
        type: 'send_cart_recovery',
      },
    },
    {
      icon: '😴',
      title: 'Thomas K. n\'ouvre plus tes mails',
      detail: '3 derniers emails ignorés',
      type: 'engagement',
      priority: 'medium',
      action: {
        label: 'Voir son profil',
        type: 'view_client',
        clientId: 'cli_004',
      },
    },
    {
      icon: '⏰',
      title: 'Facture #044 en retard',
      detail: '2 100€ - 16 jours de retard',
      type: 'invoice',
      priority: 'high',
      action: {
        label: 'Relancer',
        type: 'send_invoice_reminder',
        invoiceId: 'inv_044',
      },
    },
  ],
  
  suggestions: [
    {
      icon: '📧',
      title: 'Relancer les paniers abandonnés',
      description: 'J\'ai préparé un email personnalisé pour chacun',
      impact: 'Potentiel : ~400€ récupérés',
      action: {
        label: 'Voir le mail',
        type: 'preview_cart_email',
      },
    },
    {
      icon: '📞',
      title: 'Appeler Thomas Leroy',
      description: 'Client VIP silencieux depuis 2 semaines',
      impact: 'CA annuel : 5 670€',
      action: {
        label: 'Voir son historique',
        type: 'view_client',
        clientId: 'cli_004',
      },
    },
    {
      icon: '💰',
      title: 'Relancer la facture en retard',
      description: 'Creative Studio - #044',
      impact: '2 100€ à récupérer',
      action: {
        label: 'Envoyer rappel',
        type: 'send_invoice_reminder',
        invoiceId: 'inv_044',
      },
    },
  ],
  
  stats: {
    healthScore: 87,
    trend: 'up',
    change: 3,
  },
}

export const contextualAlerts = [
  {
    id: 'alert_001',
    trigger: 'pricing_page_repeat',
    title: 'Sophie visite ta page Pricing pour la 5ème fois !',
    description: 'Elle est vraiment intéressée 🔥',
    priority: 'hot',
    actions: [
      { label: '📧 Lui écrire', type: 'compose_email', clientId: 'cli_003' },
      { label: '📞 L\'appeler', type: 'call', clientId: 'cli_003' },
      { label: '⏰ Me rappeler demain', type: 'remind', delay: '24h' },
    ],
  },
  {
    id: 'alert_002',
    trigger: 'cart_abandon_live',
    title: 'Un visiteur vient d\'abandonner son panier',
    description: 'Valeur : 348€ - Page checkout',
    priority: 'high',
    actions: [
      { label: 'Voir les détails', type: 'view_cart', cartId: 'cart_001' },
      { label: 'Ignorer', type: 'dismiss' },
    ],
  },
  {
    id: 'alert_003',
    trigger: 'email_performance',
    title: 'Ton taux d\'ouverture baisse',
    description: '34% → 28% sur les 3 dernières semaines',
    priority: 'medium',
    suggestion: 'Je pense que c\'est l\'objet. Voici 3 alternatives...',
    actions: [
      { label: 'Voir suggestions', type: 'view_suggestions' },
      { label: 'Ignorer', type: 'dismiss' },
    ],
  },
  {
    id: 'alert_004',
    trigger: 'revenue_milestone',
    title: '🎉 Tu viens de dépasser 70k€ de CA !',
    description: 'Félicitations ! Tu es dans le top 10% de ta catégorie.',
    priority: 'celebration',
    actions: [
      { label: 'Voir les stats', type: 'view_stats' },
    ],
  },
  {
    id: 'alert_005',
    trigger: 'dormant_client',
    title: 'Client à risque détecté',
    description: 'Julien Girard n\'a pas commandé depuis 7 mois',
    priority: 'medium',
    actions: [
      { label: 'Envoyer une offre', type: 'send_offer', clientId: 'cli_030' },
      { label: 'Voir son profil', type: 'view_client', clientId: 'cli_030' },
    ],
  },
]

export const lunaResponses = {
  greeting: [
    'Hey ! Comment ça va aujourd\'hui ? 👋',
    'Salut ! Prêt à faire des merveilles ? ✨',
    'Hello ! Qu\'est-ce qu\'on fait de beau ? 🚀',
  ],
  
  thinking: [
    'Je réfléchis... 🤔',
    'Laisse-moi analyser ça... 📊',
    'Un instant, je cherche... 🔍',
  ],
  
  success: [
    'C\'est fait ! ✅',
    'Parfait, c\'est envoyé ! 🚀',
    'Done ! Autre chose ? 😊',
  ],
  
  encouragement: [
    'Tu gères ! 💪',
    'Ton business se porte bien ! 📈',
    'Continue comme ça ! 🌟',
  ],
  
  suggestions: {
    email: 'Tu veux que je t\'aide à écrire un mail ?',
    client: 'Je peux te montrer les clients à relancer si tu veux.',
    invoice: 'Il y a des factures à suivre. On s\'en occupe ?',
    analytics: 'Le trafic est intéressant aujourd\'hui. Tu veux voir les détails ?',
  },
}

export const lunaPersonality = {
  name: 'Luna',
  role: 'Copilote Business',
  traits: ['Enthousiaste', 'Proactive', 'Bienveillante', 'Efficace'],
  avatar: '🤖',
  primaryColor: 'core',
}

// Simuler les interventions de Luna
export const scheduledInterventions = [
  {
    delay: 30000, // 30 secondes après arrivée
    condition: 'page === "core"',
    alert: {
      title: 'Hey ! Tu as 3 actions en attente',
      description: 'Des clients à relancer et une facture en retard',
      actions: [{ label: 'Voir les actions', type: 'view_actions' }],
    },
  },
  {
    delay: 120000, // 2 minutes
    condition: 'page === "vision"',
    alert: {
      title: 'Je vois que 3 visiteurs hésitent sur Pricing',
      description: 'Ils y sont depuis plus de 2 minutes',
      actions: [
        { label: 'Voir qui', type: 'view_visitors' },
        { label: 'Envoyer popup promo', type: 'trigger_popup' },
      ],
    },
  },
  {
    delay: 60000, // 1 minute
    condition: 'viewing_dormant_client',
    alert: {
      title: 'Ce client n\'a pas commandé depuis longtemps',
      description: 'Je peux lui envoyer une offre personnalisée',
      actions: [
        { label: 'Créer l\'offre', type: 'create_offer' },
        { label: 'Non merci', type: 'dismiss' },
      ],
    },
  },
]

export default {
  morningBriefing,
  contextualAlerts,
  lunaResponses,
  lunaPersonality,
  scheduledInterventions,
}
