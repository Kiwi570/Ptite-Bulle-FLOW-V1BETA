// ═══════════════════════════════════════════════════════════════════════════
// 👥 CLIENTS NARRATIFS - 12 personas avec histoires cohérentes
// Chaque client a une histoire, des événements, des factures liées
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// STATUTS & SEGMENTS
// ─────────────────────────────────────────────────────────────────────────────

export const CLIENT_SEGMENTS = {
  ambassador: { 
    id: 'ambassador', 
    label: 'Ambassadeurs', 
    emoji: '👑', 
    color: 'core',
    description: 'Clients fidèles qui recommandent'
  },
  fan: { 
    id: 'fan', 
    label: 'Fans', 
    emoji: '💜', 
    color: 'tribe',
    description: 'Clients très engagés'
  },
  active: { 
    id: 'active', 
    label: 'Actifs', 
    emoji: '⚡', 
    color: 'flow',
    description: 'Achats réguliers'
  },
  dormant: { 
    id: 'dormant', 
    label: 'Dormants', 
    emoji: '😴', 
    color: 'warning',
    description: 'Pas d\'achat depuis 60+ jours'
  },
  lost: { 
    id: 'lost', 
    label: 'Perdus', 
    emoji: '💔', 
    color: 'error',
    description: 'Inactifs depuis 6+ mois'
  },
  new: { 
    id: 'new', 
    label: 'Nouveaux', 
    emoji: '🌟', 
    color: 'vision',
    description: 'Moins de 30 jours'
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 12 CLIENTS AVEC HISTOIRES
// ─────────────────────────────────────────────────────────────────────────────

export const clients = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 👑 AMBASSADEURS (2)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'client_001',
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@gmail.com',
    phone: '+33 6 12 34 56 78',
    avatar: 'https://i.pravatar.cc/150?u=marie_dupont',
    company: 'Studio Créatif MD',
    segment: 'ambassador',
    score: 95,
    scoreEvolution: [88, 90, 91, 92, 94, 95, 95],
    
    // Métriques
    totalRevenue: 4850,
    ordersCount: 12,
    avgOrderValue: 404,
    emailOpenRate: 92,
    lastOrderDate: '2024-12-10',
    firstOrderDate: '2023-06-15',
    
    // Histoire
    story: 'Marie est ta meilleure cliente. Designeuse freelance, elle te recommande à tous ses clients. Elle a même écrit un témoignage sur ton site.',
    
    // Prédiction Luna
    prediction: {
      type: 'positive',
      probability: 95,
      message: 'Marie va très probablement commander ce mois-ci. Elle consulte tes nouveautés chaque semaine !',
      suggestedAction: 'Lui envoyer un aperçu exclusif de ta nouvelle collection'
    },
    
    // Tags
    tags: ['VIP', 'Recommandations', 'Design', 'Fidèle'],
    
    // Événements récents
    events: [
      { type: 'purchase', date: '2024-12-10', title: 'Commande #1247', amount: 289, description: 'Pack Premium + Formation' },
      { type: 'email_opened', date: '2024-12-08', title: 'Email ouvert', description: 'Newsletter "Tendances 2025"' },
      { type: 'referral', date: '2024-11-28', title: 'Parrainage', description: 'A recommandé Sophie Martin' },
      { type: 'review', date: '2024-11-15', title: 'Avis 5 étoiles', description: '"Service exceptionnel, je recommande !"' },
      { type: 'purchase', date: '2024-10-22', title: 'Commande #1198', amount: 445, description: 'Formation complète' },
    ],
    
    // Notes
    notes: 'Anniversaire le 15 mars. Préfère être contactée par email. Intéressée par les formations avancées.',
  },
  
  {
    id: 'client_002',
    firstName: 'Thomas',
    lastName: 'Bernard',
    email: 'thomas.bernard@techcorp.fr',
    phone: '+33 6 98 76 54 32',
    avatar: 'https://i.pravatar.cc/150?u=thomas_bernard',
    company: 'TechCorp Solutions',
    segment: 'ambassador',
    score: 92,
    scoreEvolution: [85, 87, 88, 90, 91, 92, 92],
    
    totalRevenue: 8200,
    ordersCount: 8,
    avgOrderValue: 1025,
    emailOpenRate: 88,
    lastOrderDate: '2024-12-05',
    firstOrderDate: '2023-03-20',
    
    story: 'Thomas est directeur tech d\'une startup. Il achète des licences pour toute son équipe et parle de toi dans sa newsletter tech.',
    
    prediction: {
      type: 'positive',
      probability: 88,
      message: 'Thomas renouvelle généralement ses licences en janvier. Prépare une offre équipe !',
      suggestedAction: 'Proposer un tarif groupe pour 2025'
    },
    
    tags: ['B2B', 'Licences Team', 'Tech', 'Newsletter'],
    
    events: [
      { type: 'purchase', date: '2024-12-05', title: 'Renouvellement', amount: 1200, description: '5 licences Pro' },
      { type: 'email_clicked', date: '2024-12-01', title: 'Clic email', description: 'Lien vers tarifs équipe' },
      { type: 'support', date: '2024-11-20', title: 'Support', description: 'Question sur l\'API - Résolu' },
      { type: 'purchase', date: '2024-09-15', title: 'Commande #1156', amount: 1200, description: '5 licences Pro' },
    ],
    
    notes: 'Contact principal pour TechCorp. Demander des news sur leur levée de fonds.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 💜 FANS (2)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'client_003',
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.m@freelance.io',
    phone: '+33 6 45 67 89 01',
    avatar: 'https://i.pravatar.cc/150?u=sophie_martin',
    company: null,
    segment: 'fan',
    score: 85,
    scoreEvolution: [78, 80, 82, 83, 84, 85, 85],
    
    totalRevenue: 1890,
    ordersCount: 7,
    avgOrderValue: 270,
    emailOpenRate: 78,
    lastOrderDate: '2024-11-28',
    firstOrderDate: '2024-02-10',
    
    story: 'Sophie a été recommandée par Marie. Copywriter freelance, elle adore tes formations et les partage sur LinkedIn.',
    
    prediction: {
      type: 'positive',
      probability: 75,
      message: 'Sophie engage beaucoup avec tes contenus. Un email personnalisé pourrait déclencher un achat.',
      suggestedAction: 'Envoyer un code promo personnalisé -15%'
    },
    
    tags: ['Freelance', 'Copywriting', 'LinkedIn', 'Parrainée'],
    
    events: [
      { type: 'email_opened', date: '2024-12-12', title: 'Email ouvert', description: 'Promo Black Friday' },
      { type: 'page_visit', date: '2024-12-11', title: 'Visite page', description: 'Formation avancée - 3 vues' },
      { type: 'purchase', date: '2024-11-28', title: 'Commande #1235', amount: 189, description: 'Template Pack' },
      { type: 'social_mention', date: '2024-11-15', title: 'Mention LinkedIn', description: 'Post sur ta dernière formation' },
    ],
    
    notes: 'Parrainée par Marie Dupont. Active sur LinkedIn.',
  },
  
  {
    id: 'client_004',
    firstName: 'Lucas',
    lastName: 'Petit',
    email: 'lucas.petit@agency.com',
    phone: '+33 6 23 45 67 89',
    avatar: 'https://i.pravatar.cc/150?u=lucas_petit',
    company: 'Digital Agency',
    segment: 'fan',
    score: 82,
    scoreEvolution: [75, 77, 79, 80, 81, 82, 82],
    
    totalRevenue: 2450,
    ordersCount: 6,
    avgOrderValue: 408,
    emailOpenRate: 85,
    lastOrderDate: '2024-12-01',
    firstOrderDate: '2024-01-15',
    
    story: 'Lucas dirige une petite agence web. Il utilise tes outils pour ses projets clients et forme son équipe avec tes ressources.',
    
    prediction: {
      type: 'positive',
      probability: 70,
      message: 'Lucas a consulté la page tarifs 2x cette semaine. Il prépare probablement un achat.',
      suggestedAction: 'Appeler pour proposer un accompagnement agence'
    },
    
    tags: ['Agence', 'B2B', 'Formation équipe', 'Web'],
    
    events: [
      { type: 'page_visit', date: '2024-12-14', title: 'Visite pricing', description: '2 visites cette semaine' },
      { type: 'purchase', date: '2024-12-01', title: 'Commande #1240', amount: 350, description: 'Formation + Templates' },
      { type: 'email_clicked', date: '2024-11-25', title: 'Clic email', description: 'Offre agences partenaires' },
    ],
    
    notes: 'Intéressé par un partenariat agence. À recontacter en janvier.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ⚡ ACTIFS (3)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'client_005',
    firstName: 'Emma',
    lastName: 'Leroy',
    email: 'emma.leroy@startup.io',
    phone: '+33 6 34 56 78 90',
    avatar: 'https://i.pravatar.cc/150?u=emma_leroy',
    company: 'StartupLab',
    segment: 'active',
    score: 72,
    scoreEvolution: [68, 69, 70, 71, 72, 72, 72],
    
    totalRevenue: 890,
    ordersCount: 4,
    avgOrderValue: 222,
    emailOpenRate: 65,
    lastOrderDate: '2024-11-15',
    firstOrderDate: '2024-05-20',
    
    story: 'Emma est product manager dans une startup. Elle achète régulièrement mais n\'engage pas beaucoup avec les emails.',
    
    prediction: {
      type: 'neutral',
      probability: 55,
      message: 'Emma achète tous les 2-3 mois. Son prochain achat devrait être mi-janvier.',
      suggestedAction: 'Envoyer un contenu éducatif pour augmenter l\'engagement'
    },
    
    tags: ['Startup', 'Product', 'Régulier'],
    
    events: [
      { type: 'purchase', date: '2024-11-15', title: 'Commande #1220', amount: 199, description: 'Outil Pro mensuel' },
      { type: 'email_opened', date: '2024-11-10', title: 'Email ouvert', description: 'Newsletter novembre' },
      { type: 'purchase', date: '2024-09-08', title: 'Commande #1145', amount: 249, description: 'Template + Outil' },
    ],
    
    notes: 'Préfère les achats one-shot aux abonnements.',
  },
  
  {
    id: 'client_006',
    firstName: 'Antoine',
    lastName: 'Moreau',
    email: 'antoine.moreau@consultant.fr',
    phone: '+33 6 56 78 90 12',
    avatar: 'https://i.pravatar.cc/150?u=antoine_moreau',
    company: 'AM Consulting',
    segment: 'active',
    score: 68,
    scoreEvolution: [65, 66, 67, 67, 68, 68, 68],
    
    totalRevenue: 1250,
    ordersCount: 5,
    avgOrderValue: 250,
    emailOpenRate: 72,
    lastOrderDate: '2024-11-20',
    firstOrderDate: '2024-03-10',
    
    story: 'Antoine est consultant indépendant. Il utilise tes outils pour ses missions et achète à chaque nouveau projet.',
    
    prediction: {
      type: 'neutral',
      probability: 50,
      message: 'Antoine achète généralement quand il décroche un nouveau client. Surveiller son activité.',
      suggestedAction: 'Email de check-in personnalisé'
    },
    
    tags: ['Consultant', 'Indépendant', 'Projets'],
    
    events: [
      { type: 'purchase', date: '2024-11-20', title: 'Commande #1228', amount: 299, description: 'Pack Consultant' },
      { type: 'support', date: '2024-11-05', title: 'Support', description: 'Question facturation - Résolu' },
      { type: 'email_opened', date: '2024-10-28', title: 'Email ouvert', description: 'Nouveautés octobre' },
    ],
    
    notes: 'Besoin de factures détaillées pour ses notes de frais.',
  },
  
  {
    id: 'client_007',
    firstName: 'Julie',
    lastName: 'Dubois',
    email: 'julie.dubois@ecommerce.fr',
    phone: '+33 6 67 89 01 23',
    avatar: 'https://i.pravatar.cc/150?u=julie_dubois',
    company: 'E-Shop Julie',
    segment: 'active',
    score: 70,
    scoreEvolution: [72, 71, 70, 70, 70, 70, 70],
    
    totalRevenue: 680,
    ordersCount: 3,
    avgOrderValue: 227,
    emailOpenRate: 58,
    lastOrderDate: '2024-10-25',
    firstOrderDate: '2024-06-12',
    
    story: 'Julie gère une boutique e-commerce. Score stable mais engagement en baisse - à surveiller.',
    
    prediction: {
      type: 'warning',
      probability: 45,
      message: 'Attention, le score de Julie stagne et son engagement baisse. Risque de passage en dormant.',
      suggestedAction: 'Appel de courtoisie pour comprendre ses besoins'
    },
    
    tags: ['E-commerce', 'Boutique', 'À surveiller'],
    
    events: [
      { type: 'email_not_opened', date: '2024-12-10', title: 'Email non ouvert', description: '3 emails non ouverts consécutifs' },
      { type: 'purchase', date: '2024-10-25', title: 'Commande #1185', amount: 180, description: 'Renouvellement' },
      { type: 'email_opened', date: '2024-10-01', title: 'Email ouvert', description: 'Dernière ouverture' },
    ],
    
    notes: '⚠️ Engagement en baisse. Dernière interaction il y a 2 mois.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 😴 DORMANTS (3) - À RÉACTIVER !
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'client_008',
    firstName: 'Pierre',
    lastName: 'Lambert',
    email: 'pierre.lambert@bigcorp.com',
    phone: '+33 6 78 90 12 34',
    avatar: 'https://i.pravatar.cc/150?u=pierre_lambert',
    company: 'BigCorp International',
    segment: 'dormant',
    score: 45,
    scoreEvolution: [65, 60, 55, 52, 48, 45, 45],
    
    totalRevenue: 3200,
    ordersCount: 6,
    avgOrderValue: 533,
    emailOpenRate: 25,
    lastOrderDate: '2024-08-15',
    firstOrderDate: '2023-02-28',
    
    story: 'Pierre était un très bon client B2B. Pas de nouvelle depuis 4 mois. Peut-être un changement de poste ?',
    
    prediction: {
      type: 'warning',
      probability: 35,
      message: 'Pierre n\'a pas ouvert un email depuis 3 mois. Il faut agir vite avant de le perdre définitivement.',
      suggestedAction: 'Email de réactivation avec offre spéciale "Tu nous manques"'
    },
    
    tags: ['B2B', 'Ancien VIP', 'À réactiver', 'Priorité'],
    
    events: [
      { type: 'email_not_opened', date: '2024-12-01', title: 'Email ignoré', description: 'Promo Black Friday - Non ouvert' },
      { type: 'email_not_opened', date: '2024-11-01', title: 'Email ignoré', description: 'Newsletter novembre - Non ouvert' },
      { type: 'purchase', date: '2024-08-15', title: 'Dernière commande', amount: 890, description: 'Il y a 4 mois' },
    ],
    
    notes: '🚨 PRIORITÉ : 3200€ de CA historique. Tenter une relance personnelle.',
  },
  
  {
    id: 'client_009',
    firstName: 'Camille',
    lastName: 'Roux',
    email: 'camille.roux@designer.co',
    phone: '+33 6 89 01 23 45',
    avatar: 'https://i.pravatar.cc/150?u=camille_roux',
    company: null,
    segment: 'dormant',
    score: 42,
    scoreEvolution: [58, 55, 50, 48, 45, 42, 42],
    
    totalRevenue: 560,
    ordersCount: 3,
    avgOrderValue: 187,
    emailOpenRate: 30,
    lastOrderDate: '2024-07-20',
    firstOrderDate: '2024-01-08',
    
    story: 'Camille est designer freelance. Dernier achat il y a 5 mois. Peut-être en pause projet ?',
    
    prediction: {
      type: 'warning',
      probability: 40,
      message: 'Camille a visité ton site la semaine dernière mais n\'a rien acheté. Intérêt encore présent !',
      suggestedAction: 'Email avec nouveau contenu design + offre retour'
    },
    
    tags: ['Designer', 'Freelance', 'Visite récente'],
    
    events: [
      { type: 'page_visit', date: '2024-12-08', title: 'Visite site', description: 'Page portfolio - Signe d\'intérêt !' },
      { type: 'email_not_opened', date: '2024-11-15', title: 'Email ignoré', description: 'Newsletter' },
      { type: 'purchase', date: '2024-07-20', title: 'Dernière commande', amount: 210, description: 'Pack Design' },
    ],
    
    notes: 'A visité le site récemment - opportunité de réactivation !',
  },
  
  {
    id: 'client_010',
    firstName: 'Nicolas',
    lastName: 'Garcia',
    email: 'nicolas.garcia@media.tv',
    phone: '+33 6 90 12 34 56',
    avatar: 'https://i.pravatar.cc/150?u=nicolas_garcia',
    company: 'MediaTV Production',
    segment: 'dormant',
    score: 38,
    scoreEvolution: [52, 48, 45, 42, 40, 38, 38],
    
    totalRevenue: 1450,
    ordersCount: 4,
    avgOrderValue: 363,
    emailOpenRate: 20,
    lastOrderDate: '2024-06-30',
    firstOrderDate: '2023-09-15',
    
    story: 'Nicolas travaille dans la production TV. Bon client devenu inactif. Secteur en crise ?',
    
    prediction: {
      type: 'negative',
      probability: 25,
      message: 'Nicolas est presque perdu. Dernière chance avec une offre irrésistible.',
      suggestedAction: 'Offre exceptionnelle -30% ou appel direct'
    },
    
    tags: ['Média', 'Production', 'Urgent', 'Dernière chance'],
    
    events: [
      { type: 'email_bounced', date: '2024-11-01', title: 'Email rejeté', description: 'Boîte pleine ou changement d\'email ?' },
      { type: 'purchase', date: '2024-06-30', title: 'Dernière commande', amount: 450, description: 'Il y a 6 mois' },
    ],
    
    notes: '⚠️ Email peut-être invalide. Essayer de contacter par téléphone.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🌟 NOUVEAUX (2)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'client_011',
    firstName: 'Léa',
    lastName: 'Fournier',
    email: 'lea.fournier@newco.io',
    phone: '+33 6 01 23 45 67',
    avatar: 'https://i.pravatar.cc/150?u=lea_fournier',
    company: 'NewCo',
    segment: 'new',
    score: 65,
    scoreEvolution: [0, 0, 0, 60, 62, 64, 65],
    
    totalRevenue: 149,
    ordersCount: 1,
    avgOrderValue: 149,
    emailOpenRate: 100,
    lastOrderDate: '2024-12-12',
    firstOrderDate: '2024-12-12',
    
    story: 'Léa vient de faire son premier achat il y a 3 jours ! Elle a ouvert tous tes emails de bienvenue.',
    
    prediction: {
      type: 'positive',
      probability: 70,
      message: 'Léa est très engagée pour une nouvelle cliente. Le timing est parfait pour créer une relation.',
      suggestedAction: 'Email de bienvenue personnalisé + ressource gratuite'
    },
    
    tags: ['Nouvelle', 'Engagée', 'Potentiel'],
    
    events: [
      { type: 'purchase', date: '2024-12-12', title: 'Premier achat ! 🎉', amount: 149, description: 'Pack Starter' },
      { type: 'email_opened', date: '2024-12-12', title: 'Email ouvert', description: 'Bienvenue - Ouvert en 2min !' },
      { type: 'signup', date: '2024-12-12', title: 'Inscription', description: 'Via Google Ads' },
    ],
    
    notes: '🌟 Nouveau client à chouchouter ! Source: Google Ads.',
  },
  
  {
    id: 'client_012',
    firstName: 'Hugo',
    lastName: 'Martinez',
    email: 'hugo.martinez@etudiant.fr',
    phone: '+33 6 12 34 56 78',
    avatar: 'https://i.pravatar.cc/150?u=hugo_martinez',
    company: null,
    segment: 'new',
    score: 58,
    scoreEvolution: [0, 0, 0, 0, 55, 57, 58],
    
    totalRevenue: 49,
    ordersCount: 1,
    avgOrderValue: 49,
    emailOpenRate: 80,
    lastOrderDate: '2024-12-08',
    firstOrderDate: '2024-12-08',
    
    story: 'Hugo est étudiant. Premier achat petit budget mais très engagé sur les réseaux. Potentiel ambassadeur jeune !',
    
    prediction: {
      type: 'neutral',
      probability: 50,
      message: 'Hugo a un petit budget mais un grand réseau social. Investir dans la relation pourrait payer.',
      suggestedAction: 'Proposer le programme ambassadeur étudiant'
    },
    
    tags: ['Étudiant', 'Social Media', 'Petit budget', 'Potentiel ambassadeur'],
    
    events: [
      { type: 'social_mention', date: '2024-12-10', title: 'Story Instagram', description: 'A partagé son achat !' },
      { type: 'purchase', date: '2024-12-08', title: 'Premier achat', amount: 49, description: 'Offre étudiant' },
      { type: 'email_opened', date: '2024-12-08', title: 'Email ouvert', description: 'Confirmation de commande' },
    ],
    
    notes: 'Étudiant actif sur Instagram. Proposer programme ambassadeur ?',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export const getClientById = (id) => clients.find(c => c.id === id)

export const getClientsBySegment = (segment) => clients.filter(c => c.segment === segment)

export const getClientStats = () => ({
  total: clients.length,
  bySegment: {
    ambassador: clients.filter(c => c.segment === 'ambassador').length,
    fan: clients.filter(c => c.segment === 'fan').length,
    active: clients.filter(c => c.segment === 'active').length,
    dormant: clients.filter(c => c.segment === 'dormant').length,
    lost: clients.filter(c => c.segment === 'lost').length,
    new: clients.filter(c => c.segment === 'new').length,
  },
  totalRevenue: clients.reduce((sum, c) => sum + c.totalRevenue, 0),
  avgScore: Math.round(clients.reduce((sum, c) => sum + c.score, 0) / clients.length),
})

// Pour compatibilité avec l'ancien code
export const mockClients = clients
export const clientStats = getClientStats()

export default clients
