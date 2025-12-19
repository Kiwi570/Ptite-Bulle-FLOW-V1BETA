// ═══════════════════════════════════════════════════════════════════════════
// 🎯 PIPELINE COMMERCIAL - Kanban 4 étapes avec scoring chaleur
// Découverte → Nurturing → Conversion → Fidélisation
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// ÉTAPES DU PIPELINE
// ─────────────────────────────────────────────────────────────────────────────

export const PIPELINE_STAGES = [
  {
    id: 'discovery',
    name: 'Découverte',
    emoji: '🌱',
    color: '#22D3EE',
    description: 'Premier contact établi',
    targetDays: 7,
    conversionRate: 60,
  },
  {
    id: 'nurturing',
    name: 'Nurturing',
    emoji: '🌿',
    color: '#34D399',
    description: 'Relation en développement',
    targetDays: 14,
    conversionRate: 45,
  },
  {
    id: 'conversion',
    name: 'Conversion',
    emoji: '🌸',
    color: '#F472B6',
    description: 'Négociation en cours',
    targetDays: 7,
    conversionRate: 70,
  },
  {
    id: 'loyalty',
    name: 'Fidélisation',
    emoji: '🌳',
    color: '#A78BFA',
    description: 'Client fidèle',
    targetDays: null,
    conversionRate: 90,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// DEALS DU PIPELINE
// ─────────────────────────────────────────────────────────────────────────────

export const pipelineDeals = [
  // ═══ DÉCOUVERTE ═══
  {
    id: 'deal-1',
    clientId: 'contact-1',
    clientName: 'Sophie Martin',
    company: 'TechCorp',
    avatar: null,
    stage: 'discovery',
    value: 8500,
    probability: 30,
    heatScore: 85, // 🔥 Très chaud
    title: 'Licence Enterprise TechCorp',
    description: 'Migration de leur solution actuelle vers notre plateforme pour 50 utilisateurs.',
    source: 'Inbound',
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    expectedClose: Date.now() + 14 * 24 * 60 * 60 * 1000,
    lastActivity: 'Email reçu - Intéressée par proposition',
    nextAction: 'Planifier call de qualification',
    tags: ['enterprise', 'migration', 'prioritaire'],
    activities: [
      { icon: '📧', title: 'Email reçu', date: 'Il y a 45 min' },
      { icon: '📤', title: 'Proposition envoyée', date: 'Il y a 2 jours' },
      { icon: '📞', title: 'Premier appel', date: 'Il y a 5 jours' },
    ],
  },
  {
    id: 'deal-new-1',
    clientId: 'contact-6',
    clientName: 'Thomas Moreau',
    company: 'Agence Créa',
    avatar: null,
    stage: 'discovery',
    value: 3200,
    probability: 15,
    heatScore: 35, // Froid
    title: 'Pack Agence - 10 licences',
    description: 'Demande d\'information initiale pour équiper son agence.',
    source: 'Site web',
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    expectedClose: Date.now() + 30 * 24 * 60 * 60 * 1000,
    lastActivity: 'Demande d\'info reçue',
    nextAction: 'Recontacter pour qualifier',
    tags: ['agence', 'petit-compte'],
    activities: [
      { icon: '📧', title: 'Demande info', date: 'Il y a 7 jours' },
    ],
  },

  // ═══ NURTURING ═══
  {
    id: 'deal-2',
    clientId: 'contact-2',
    clientName: 'Marc Dubois',
    company: 'StartupIO',
    avatar: null,
    stage: 'nurturing',
    value: 15000,
    probability: 45,
    heatScore: 72, // Chaud
    title: 'Déploiement StartupIO - 50 users',
    description: 'Scale-up en forte croissance, besoin urgent d\'une solution collaborative.',
    source: 'Recommandation',
    createdAt: Date.now() - 12 * 24 * 60 * 60 * 1000,
    expectedClose: Date.now() + 21 * 24 * 60 * 60 * 1000,
    lastActivity: 'Demande de devis reçue',
    nextAction: 'Envoyer devis personnalisé',
    tags: ['startup', 'croissance', 'urgent'],
    activities: [
      { icon: '📧', title: 'Demande de devis', date: 'Il y a 5h' },
      { icon: '🎥', title: 'Démo réalisée', date: 'Il y a 3 jours' },
      { icon: '📞', title: 'Call découverte', date: 'Il y a 12 jours' },
    ],
  },
  {
    id: 'deal-3',
    clientId: 'contact-4',
    clientName: 'Alexandre Petit',
    company: 'BigCorp',
    avatar: null,
    stage: 'nurturing',
    value: 25000,
    probability: 25,
    heatScore: 28, // ⚠️ En danger
    title: 'Contrat cadre BigCorp',
    description: 'Grand compte avec processus de décision long. Budget validé mais timing incertain.',
    source: 'Salon pro',
    createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
    expectedClose: Date.now() + 60 * 24 * 60 * 60 * 1000,
    lastActivity: 'Retard annoncé dans la décision',
    nextAction: '⚠️ Relancer urgemment',
    tags: ['grand-compte', 'à-risque', 'long-cycle'],
    activities: [
      { icon: '📧', title: 'Email - Retard décision', date: 'Il y a 3 jours' },
      { icon: '📤', title: 'Proposition envoyée', date: 'Il y a 30 jours' },
      { icon: '🤝', title: 'Rencontre salon', date: 'Il y a 45 jours' },
    ],
  },

  // ═══ CONVERSION ═══
  {
    id: 'deal-4',
    clientId: 'contact-5',
    clientName: 'Emma Bernard',
    company: 'Freelance',
    avatar: null,
    stage: 'conversion',
    value: 2400,
    probability: 90,
    heatScore: 95, // 🔥🔥 Très très chaud
    title: 'Upgrade Pro + Renouvellement',
    description: 'Cliente fidèle qui souhaite upgrader vers la formule Pro.',
    source: 'Client existant',
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    expectedClose: Date.now() + 3 * 24 * 60 * 60 * 1000,
    lastActivity: 'Demande d\'upgrade reçue',
    nextAction: 'Envoyer offre Pro avec bonus fidélité',
    tags: ['upsell', 'client-vip', 'quick-win'],
    activities: [
      { icon: '📧', title: 'Demande upgrade', date: 'Il y a 1h' },
      { icon: '⭐', title: 'Feedback positif', date: 'Il y a 2 jours' },
    ],
  },
  {
    id: 'deal-conv-1',
    clientId: null,
    clientName: 'Marie Fontaine',
    company: 'Studio MF',
    avatar: null,
    stage: 'conversion',
    value: 4800,
    probability: 75,
    heatScore: 78,
    title: 'Licence annuelle Studio MF',
    description: 'Studio de design intéressé par notre offre créative.',
    source: 'Webinar',
    createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    expectedClose: Date.now() + 5 * 24 * 60 * 60 * 1000,
    lastActivity: 'Négociation tarifaire',
    nextAction: 'Valider remise et closer',
    tags: ['créatif', 'négociation'],
    activities: [
      { icon: '💬', title: 'Négo prix', date: 'Hier' },
      { icon: '🎥', title: 'Démo', date: 'Il y a 1 semaine' },
    ],
  },

  // ═══ FIDÉLISATION ═══
  {
    id: 'deal-loyal-1',
    clientId: 'contact-3',
    clientName: 'Julie Leroy',
    company: 'DesignCo',
    avatar: null,
    stage: 'loyalty',
    value: 6000,
    probability: 100,
    heatScore: 88,
    title: 'Partenariat DesignCo - Année 2',
    description: 'Renouvellement automatique + extension du partenariat.',
    source: 'Client existant',
    createdAt: Date.now() - 365 * 24 * 60 * 60 * 1000,
    expectedClose: null,
    lastActivity: 'Collaboration événement proposée',
    nextAction: 'Organiser workshop commun',
    tags: ['partenaire', 'fidèle', 'ambassadeur'],
    activities: [
      { icon: '🤝', title: 'Nouvelle collab proposée', date: 'Il y a 30 min' },
      { icon: '⭐', title: 'Feedback workshop', date: 'Il y a 2 jours' },
      { icon: '🔄', title: 'Renouvellement', date: 'Il y a 1 mois' },
    ],
  },
  {
    id: 'deal-loyal-2',
    clientId: null,
    clientName: 'Pierre Durand',
    company: 'ConsultPro',
    avatar: null,
    stage: 'loyalty',
    value: 12000,
    probability: 100,
    heatScore: 92,
    title: 'Contrat ConsultPro - Année 3',
    description: 'Client historique, ambassadeur actif qui nous recommande.',
    source: 'Client existant',
    createdAt: Date.now() - 730 * 24 * 60 * 60 * 1000,
    expectedClose: null,
    lastActivity: '2 recommandations ce mois',
    nextAction: 'Remercier + programme ambassadeur',
    tags: ['ambassadeur', 'VIP', 'recommandation'],
    activities: [
      { icon: '🎁', title: '2 nouveaux referrals', date: 'Cette semaine' },
      { icon: '📞', title: 'Call trimestriel', date: 'Il y a 2 semaines' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// FONCTIONS UTILITAIRES
// ─────────────────────────────────────────────────────────────────────────────

export const getPipelineStats = (deals = pipelineDeals) => {
  const byStage = {}
  
  PIPELINE_STAGES.forEach(stage => {
    const stageDeals = deals.filter(d => d.stage === stage.id)
    byStage[stage.id] = {
      count: stageDeals.length,
      value: stageDeals.reduce((sum, d) => sum + d.value, 0),
      avgHeat: stageDeals.length > 0 
        ? Math.round(stageDeals.reduce((sum, d) => sum + d.heatScore, 0) / stageDeals.length)
        : 0,
    }
  })
  
  return {
    total: deals.length,
    totalValue: deals.reduce((sum, d) => sum + d.value, 0),
    weightedValue: Math.round(deals.reduce((sum, d) => sum + (d.value * d.probability / 100), 0)),
    avgProbability: Math.round(deals.reduce((sum, d) => sum + d.probability, 0) / deals.length),
    byStage,
    hotDeals: deals.filter(d => d.heatScore >= 80).length,
    warmDeals: deals.filter(d => d.heatScore >= 50 && d.heatScore < 80).length,
    coldDeals: deals.filter(d => d.heatScore < 50).length,
    atRisk: deals.filter(d => d.heatScore < 40 && d.stage !== 'loyalty').length,
  }
}

export const getHeatColor = (score) => {
  if (score >= 80) return '#EF4444' // Rouge - très chaud
  if (score >= 60) return '#F59E0B' // Orange - chaud  
  if (score >= 40) return '#10B981' // Vert - tiède
  return '#6B7280' // Gris - froid
}

export const getHeatLabel = (score) => {
  if (score >= 80) return '🔥🔥 Très chaud'
  if (score >= 60) return '🔥 Chaud'
  if (score >= 40) return '♨️ Tiède'
  return '❄️ Froid'
}
