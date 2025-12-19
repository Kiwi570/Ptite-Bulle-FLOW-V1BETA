// ═══════════════════════════════════════════════════════════════════════════
// 📧 INBOX RÉVOLUTIONNAIRE - Données emails et contacts
// Constellation de contacts + Stream temporel + IA insights
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// CONTACTS EMAIL (pour vue Constellation)
// ─────────────────────────────────────────────────────────────────────────────

export const emailContacts = [
  {
    id: 'contact-1',
    name: 'Sophie Martin',
    email: 'sophie.martin@techcorp.fr',
    company: 'TechCorp',
    avatar: null,
    color: '#F472B6', // Rose
    totalEmails: 12,
    lastContact: Date.now() - 2 * 60 * 60 * 1000, // il y a 2h
    relationship: 'client',
    sentiment: 'positive',
    dealId: 'deal-1',
  },
  {
    id: 'contact-2',
    name: 'Marc Dubois',
    email: 'marc.dubois@startup.io',
    company: 'StartupIO',
    avatar: null,
    color: '#A78BFA', // Violet
    totalEmails: 8,
    lastContact: Date.now() - 24 * 60 * 60 * 1000, // hier
    relationship: 'prospect',
    sentiment: 'neutral',
    dealId: 'deal-2',
  },
  {
    id: 'contact-3',
    name: 'Julie Leroy',
    email: 'julie.leroy@design.co',
    company: 'DesignCo',
    avatar: null,
    color: '#34D399', // Vert
    totalEmails: 15,
    lastContact: Date.now() - 30 * 60 * 1000, // il y a 30min
    relationship: 'partner',
    sentiment: 'positive',
    dealId: null,
  },
  {
    id: 'contact-4',
    name: 'Alexandre Petit',
    email: 'alex.petit@bigcorp.com',
    company: 'BigCorp',
    avatar: null,
    color: '#FBBF24', // Orange
    totalEmails: 5,
    lastContact: Date.now() - 3 * 24 * 60 * 60 * 1000, // il y a 3 jours
    relationship: 'prospect',
    sentiment: 'negative',
    dealId: 'deal-3',
  },
  {
    id: 'contact-5',
    name: 'Emma Bernard',
    email: 'emma.b@freelance.fr',
    company: 'Freelance',
    avatar: null,
    color: '#22D3EE', // Cyan
    totalEmails: 20,
    lastContact: Date.now() - 1 * 60 * 60 * 1000, // il y a 1h
    relationship: 'client',
    sentiment: 'positive',
    dealId: 'deal-4',
  },
  {
    id: 'contact-6',
    name: 'Thomas Moreau',
    email: 'thomas@agence.fr',
    company: 'Agence Créa',
    avatar: null,
    color: '#EF4444', // Rouge
    totalEmails: 3,
    lastContact: Date.now() - 7 * 24 * 60 * 60 * 1000, // il y a 7 jours
    relationship: 'lead',
    sentiment: 'neutral',
    dealId: null,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// EMAILS INBOX
// ─────────────────────────────────────────────────────────────────────────────

export const emails = [
  // Sophie Martin - Client actif
  {
    id: 'email-1',
    contactId: 'contact-1',
    direction: 'incoming',
    subject: 'Re: Proposition commerciale - Urgent',
    preview: 'Bonjour, j\'ai bien reçu votre proposition et je suis très intéressée. Pouvons-nous planifier un call cette semaine ?',
    content: 'Bonjour,\n\nJ\'ai bien reçu votre proposition commerciale et je suis très intéressée par votre offre.\n\nPouvons-nous planifier un call cette semaine pour discuter des détails ?\n\nCordialement,\nSophie Martin',
    date: Date.now() - 45 * 60 * 1000, // il y a 45min
    read: false,
    starred: true,
    priority: 'urgent',
    sentiment: 'positive',
    hasAttachment: false,
    linkedAmount: 8500,
    aiSummary: 'Sophie est intéressée par la proposition. Elle demande un call cette semaine. Opportunité chaude à 8 500€.',
    suggestedActions: ['Planifier call', 'Envoyer calendrier', 'Préparer démo'],
    tags: ['prospect-chaud', 'relance'],
  },
  {
    id: 'email-2',
    contactId: 'contact-1',
    direction: 'outgoing',
    subject: 'Proposition commerciale - TechCorp',
    preview: 'Suite à notre échange, veuillez trouver ci-joint notre proposition...',
    content: 'Bonjour Sophie,\n\nSuite à notre échange, veuillez trouver ci-joint notre proposition commerciale.\n\nN\'hésitez pas à me contacter pour toute question.\n\nCordialement',
    date: Date.now() - 2 * 24 * 60 * 60 * 1000,
    read: true,
    starred: false,
    priority: 'normal',
    sentiment: 'neutral',
    hasAttachment: true,
    linkedAmount: 8500,
    aiSummary: null,
    suggestedActions: [],
    tags: ['proposition'],
  },
  
  // Marc Dubois - Prospect
  {
    id: 'email-3',
    contactId: 'contact-2',
    direction: 'incoming',
    subject: 'Demande de devis',
    preview: 'Bonjour, nous recherchons une solution pour notre équipe de 50 personnes...',
    content: 'Bonjour,\n\nNous recherchons une solution pour notre équipe de 50 personnes. Pourriez-vous nous faire parvenir un devis ?\n\nMerci,\nMarc Dubois',
    date: Date.now() - 5 * 60 * 60 * 1000, // il y a 5h
    read: false,
    starred: false,
    priority: 'high',
    sentiment: 'positive',
    hasAttachment: false,
    linkedAmount: 15000,
    aiSummary: 'Nouvelle demande de devis pour 50 utilisateurs. Potentiel estimé à 15 000€. Répondre rapidement.',
    suggestedActions: ['Créer devis', 'Qualifier besoin', 'Proposer démo'],
    tags: ['nouveau-lead', 'devis'],
  },
  
  // Julie Leroy - Partenaire
  {
    id: 'email-4',
    contactId: 'contact-3',
    direction: 'incoming',
    subject: 'Collaboration projet événement',
    preview: 'Hello ! J\'ai une super opportunité de collaboration à te proposer pour un événement en janvier...',
    content: 'Hello !\n\nJ\'ai une super opportunité de collaboration à te proposer pour un événement en janvier.\n\nOn s\'appelle pour en discuter ?\n\nJulie',
    date: Date.now() - 30 * 60 * 1000, // il y a 30min
    read: false,
    starred: true,
    priority: 'normal',
    sentiment: 'positive',
    hasAttachment: false,
    linkedAmount: null,
    aiSummary: 'Julie propose une collaboration pour un événement en janvier. Opportunité de partenariat.',
    suggestedActions: ['Répondre', 'Planifier call'],
    tags: ['partenariat', 'événement'],
  },
  {
    id: 'email-5',
    contactId: 'contact-3',
    direction: 'incoming',
    subject: 'Re: Retour sur le workshop',
    preview: 'Le workshop était génial ! Mes clients ont adoré. On remet ça quand tu veux !',
    content: 'Le workshop était génial ! Mes clients ont adoré.\n\nOn remet ça quand tu veux !\n\nJulie',
    date: Date.now() - 2 * 24 * 60 * 60 * 1000,
    read: true,
    starred: false,
    priority: 'normal',
    sentiment: 'positive',
    hasAttachment: false,
    linkedAmount: null,
    aiSummary: null,
    suggestedActions: [],
    tags: ['feedback'],
  },
  
  // Alexandre Petit - Deal à risque
  {
    id: 'email-6',
    contactId: 'contact-4',
    direction: 'incoming',
    subject: 'Re: Suivi proposition',
    preview: 'Bonjour, nous avons pris du retard dans notre décision. Je reviens vers vous dès que possible...',
    content: 'Bonjour,\n\nNous avons pris du retard dans notre décision interne. Je reviens vers vous dès que possible.\n\nCordialement,\nAlexandre Petit',
    date: Date.now() - 3 * 24 * 60 * 60 * 1000,
    read: true,
    starred: false,
    priority: 'normal',
    sentiment: 'negative',
    hasAttachment: false,
    linkedAmount: 25000,
    aiSummary: '⚠️ Deal en danger : Alexandre repousse la décision. Risque de perte du deal à 25 000€.',
    suggestedActions: ['Relancer', 'Proposer alternative', 'Identifier blocage'],
    tags: ['deal-froid', 'relance-urgente'],
  },
  
  // Emma Bernard - Cliente fidèle
  {
    id: 'email-7',
    contactId: 'contact-5',
    direction: 'incoming',
    subject: 'Renouvellement abonnement + upgrade',
    preview: 'Bonjour ! Mon abonnement arrive à échéance et je souhaiterais passer à la formule Pro...',
    content: 'Bonjour !\n\nMon abonnement arrive à échéance le mois prochain et je souhaiterais passer à la formule Pro.\n\nPouvez-vous me faire une proposition ?\n\nMerci,\nEmma',
    date: Date.now() - 1 * 60 * 60 * 1000, // il y a 1h
    read: false,
    starred: true,
    priority: 'high',
    sentiment: 'positive',
    hasAttachment: false,
    linkedAmount: 2400,
    aiSummary: '🎉 Emma veut upgrader vers Pro ! Opportunité d\'upsell. Renouvellement + upgrade = 2 400€/an.',
    suggestedActions: ['Préparer offre Pro', 'Proposer bonus fidélité', 'Planifier call'],
    tags: ['renouvellement', 'upsell', 'client-vip'],
  },
  {
    id: 'email-8',
    contactId: 'contact-5',
    direction: 'incoming',
    subject: 'Merci pour le super support !',
    preview: 'Juste un petit mot pour vous remercier pour votre réactivité. C\'est un plaisir de travailler avec vous !',
    content: 'Juste un petit mot pour vous remercier pour votre réactivité hier. C\'est un plaisir de travailler avec vous !\n\nEmma',
    date: Date.now() - 2 * 24 * 60 * 60 * 1000,
    read: true,
    starred: true,
    priority: 'normal',
    sentiment: 'positive',
    hasAttachment: false,
    linkedAmount: null,
    aiSummary: 'Feedback positif sur le support. Cliente satisfaite à fidéliser.',
    suggestedActions: ['Remercier', 'Demander témoignage'],
    tags: ['feedback', 'satisfaction'],
  },
  
  // Thomas Moreau - Lead froid
  {
    id: 'email-9',
    contactId: 'contact-6',
    direction: 'incoming',
    subject: 'Demande d\'information',
    preview: 'Bonjour, je souhaiterais avoir plus d\'informations sur vos services...',
    content: 'Bonjour,\n\nJe souhaiterais avoir plus d\'informations sur vos services.\n\nMerci,\nThomas Moreau',
    date: Date.now() - 7 * 24 * 60 * 60 * 1000,
    read: true,
    starred: false,
    priority: 'normal',
    sentiment: 'neutral',
    hasAttachment: false,
    linkedAmount: null,
    aiSummary: 'Lead initial - demande d\'information basique. À qualifier.',
    suggestedActions: ['Répondre', 'Qualifier'],
    tags: ['lead-froid'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// FONCTIONS UTILITAIRES
// ─────────────────────────────────────────────────────────────────────────────

export const getInboxStats = (emailList = emails) => ({
  total: emailList.length,
  unread: emailList.filter(e => !e.read && e.direction === 'incoming').length,
  urgent: emailList.filter(e => e.priority === 'urgent' || e.priority === 'high').length,
  starred: emailList.filter(e => e.starred).length,
  positive: emailList.filter(e => e.sentiment === 'positive').length,
  negative: emailList.filter(e => e.sentiment === 'negative').length,
  totalValue: emailList.filter(e => e.linkedAmount).reduce((sum, e) => sum + e.linkedAmount, 0),
  totalLinkedAmount: emailList.filter(e => e.linkedAmount).reduce((sum, e) => sum + e.linkedAmount, 0),
})

export const getContactStats = (contactId, emailList = emails) => {
  const contactEmails = emailList.filter(e => e.contactId === contactId)
  return {
    total: contactEmails.length,
    unread: contactEmails.filter(e => !e.read && e.direction === 'incoming').length,
    incoming: contactEmails.filter(e => e.direction === 'incoming').length,
    outgoing: contactEmails.filter(e => e.direction === 'outgoing').length,
    lastEmail: contactEmails.sort((a, b) => b.date - a.date)[0],
  }
}
