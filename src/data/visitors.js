// ═══════════════════════════════════════════════════════════════════════════
// 👁️ MOCK DATA - VISITEURS & ANALYTICS
// Simulation temps réel du trafic
// ═══════════════════════════════════════════════════════════════════════════

export const sitePages = [
  { id: 'home', name: 'Accueil', path: '/', weight: 30 },
  { id: 'features', name: 'Fonctionnalités', path: '/features', weight: 20 },
  { id: 'pricing', name: 'Tarifs', path: '/pricing', weight: 25 },
  { id: 'about', name: 'À propos', path: '/about', weight: 8 },
  { id: 'blog', name: 'Blog', path: '/blog', weight: 10 },
  { id: 'contact', name: 'Contact', path: '/contact', weight: 5 },
  { id: 'checkout', name: 'Paiement', path: '/checkout', weight: 2 },
]

export const trafficSources = [
  { id: 'google', name: 'Google', icon: '🔍', weight: 40, color: '#4285F4' },
  { id: 'direct', name: 'Direct', icon: '🔗', weight: 25, color: '#6B7280' },
  { id: 'social', name: 'Réseaux sociaux', icon: '📱', weight: 20, color: '#E1306C' },
  { id: 'referral', name: 'Referral', icon: '🔄', weight: 10, color: '#34D399' },
  { id: 'email', name: 'Email', icon: '📧', weight: 5, color: '#F59E0B' },
]

export const devices = [
  { id: 'desktop', name: 'Desktop', icon: '🖥️', weight: 45 },
  { id: 'mobile', name: 'Mobile', icon: '📱', weight: 48 },
  { id: 'tablet', name: 'Tablette', icon: '📲', weight: 7 },
]

export const countries = [
  { code: 'FR', name: 'France', flag: '🇫🇷', weight: 65 },
  { code: 'BE', name: 'Belgique', flag: '🇧🇪', weight: 12 },
  { code: 'CH', name: 'Suisse', flag: '🇨🇭', weight: 8 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', weight: 7 },
  { code: 'MA', name: 'Maroc', flag: '🇲🇦', weight: 4 },
  { code: 'US', name: 'États-Unis', flag: '🇺🇸', weight: 4 },
]

export const cities = {
  FR: ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Nantes', 'Lille', 'Nice', 'Strasbourg', 'Rennes'],
  BE: ['Bruxelles', 'Anvers', 'Gand', 'Liège'],
  CH: ['Genève', 'Zurich', 'Lausanne', 'Berne'],
  CA: ['Montréal', 'Québec', 'Toronto', 'Ottawa'],
  MA: ['Casablanca', 'Rabat', 'Marrakech'],
  US: ['New York', 'Los Angeles', 'San Francisco'],
}

// Données de trafic horaire (simulation)
export const hourlyTraffic = [
  { hour: '00h', visitors: 12 },
  { hour: '01h', visitors: 8 },
  { hour: '02h', visitors: 5 },
  { hour: '03h', visitors: 3 },
  { hour: '04h', visitors: 4 },
  { hour: '05h', visitors: 6 },
  { hour: '06h', visitors: 15 },
  { hour: '07h', visitors: 28 },
  { hour: '08h', visitors: 45 },
  { hour: '09h', visitors: 62 },
  { hour: '10h', visitors: 78 },
  { hour: '11h', visitors: 85 },
  { hour: '12h', visitors: 72 },
  { hour: '13h', visitors: 68 },
  { hour: '14h', visitors: 82 },
  { hour: '15h', visitors: 90 },
  { hour: '16h', visitors: 88 },
  { hour: '17h', visitors: 76 },
  { hour: '18h', visitors: 65 },
  { hour: '19h', visitors: 58 },
  { hour: '20h', visitors: 52 },
  { hour: '21h', visitors: 45 },
  { hour: '22h', visitors: 32 },
  { hour: '23h', visitors: 18 },
]

// Stats globales du site
export const siteStats = {
  today: {
    visitors: 847,
    uniqueVisitors: 623,
    pageViews: 2341,
    avgSessionDuration: '3m 24s',
    bounceRate: 42,
    conversions: 18,
    conversionRate: 2.1,
    revenue: 1890,
  },
  thisWeek: {
    visitors: 5420,
    uniqueVisitors: 4102,
    pageViews: 15680,
    avgSessionDuration: '3m 12s',
    bounceRate: 44,
    conversions: 98,
    conversionRate: 1.8,
    revenue: 11240,
  },
  thisMonth: {
    visitors: 18920,
    uniqueVisitors: 14350,
    pageViews: 52400,
    avgSessionDuration: '3m 08s',
    bounceRate: 45,
    conversions: 312,
    conversionRate: 1.6,
    revenue: 38450,
  },
  trends: {
    visitorsChange: 12,
    pageViewsChange: 8,
    conversionsChange: 23,
    revenueChange: 18,
  },
}

// Pages les plus visitées
export const topPages = [
  { path: '/', name: 'Accueil', views: 8420, avgTime: '2m 15s', bounceRate: 35 },
  { path: '/pricing', name: 'Tarifs', views: 4280, avgTime: '4m 32s', bounceRate: 28 },
  { path: '/features', name: 'Fonctionnalités', views: 3650, avgTime: '3m 45s', bounceRate: 38 },
  { path: '/blog/guide-complet', name: 'Guide Complet', views: 2180, avgTime: '6m 12s', bounceRate: 22 },
  { path: '/contact', name: 'Contact', views: 1240, avgTime: '1m 30s', bounceRate: 52 },
]

// Entonnoir de conversion
export const conversionFunnel = [
  { step: 'Visiteurs', count: 18920, percentage: 100 },
  { step: 'Page produit vue', count: 8450, percentage: 44.7 },
  { step: 'Ajout panier', count: 1520, percentage: 8.0 },
  { step: 'Début checkout', count: 680, percentage: 3.6 },
  { step: 'Paiement complété', count: 312, percentage: 1.6 },
]

// Abandons de panier
export const cartAbandons = [
  {
    id: 'cart_001',
    visitorId: 'v_4892',
    email: 'zoe.fontaine@yahoo.fr',
    items: [{ name: 'Pack Premium', price: 299 }, { name: 'Extension Pro', price: 49 }],
    totalValue: 348,
    abandonedAt: '2024-12-14T20:32:00',
    page: '/checkout',
    recovered: false,
  },
  {
    id: 'cart_002',
    visitorId: 'v_4856',
    email: null,
    items: [{ name: 'Abonnement Annuel', price: 199 }],
    totalValue: 199,
    abandonedAt: '2024-12-14T18:15:00',
    page: '/checkout',
    recovered: false,
  },
  {
    id: 'cart_003',
    visitorId: 'v_4801',
    email: 'contact@startup.io',
    items: [{ name: 'Pack Business', price: 499 }],
    totalValue: 499,
    abandonedAt: '2024-12-14T14:42:00',
    page: '/checkout/payment',
    recovered: false,
  },
  {
    id: 'cart_004',
    visitorId: 'v_4789',
    email: 'marie.l@gmail.com',
    items: [{ name: 'Pack Starter', price: 89 }],
    totalValue: 89,
    abandonedAt: '2024-12-13T16:20:00',
    page: '/checkout',
    recovered: true,
    recoveredAt: '2024-12-14T10:00:00',
  },
  {
    id: 'cart_005',
    visitorId: 'v_4756',
    email: null,
    items: [{ name: 'Pack Premium', price: 299 }],
    totalValue: 299,
    abandonedAt: '2024-12-13T11:30:00',
    page: '/checkout',
    recovered: false,
  },
]

// Générateur de visiteurs aléatoires pour simulation temps réel
export function generateRandomVisitor() {
  const source = weightedRandom(trafficSources)
  const device = weightedRandom(devices)
  const country = weightedRandom(countries)
  const city = cities[country.code][Math.floor(Math.random() * cities[country.code].length)]
  const page = weightedRandom(sitePages)
  
  return {
    id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    source,
    device,
    country,
    city,
    currentPage: page,
    entryPage: page,
    pagesViewed: 1,
    sessionStart: new Date(),
    lastActivity: new Date(),
    isNew: Math.random() > 0.3,
    isReturning: Math.random() > 0.7,
    hasCart: false,
    cartValue: 0,
  }
}

// Fonction utilitaire pour sélection pondérée
function weightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  let random = Math.random() * totalWeight
  
  for (const item of items) {
    random -= item.weight
    if (random <= 0) return item
  }
  
  return items[0]
}

// Actions possibles d'un visiteur
export const visitorActions = [
  { type: 'navigate', weight: 40 },
  { type: 'scroll', weight: 25 },
  { type: 'click', weight: 15 },
  { type: 'addToCart', weight: 5 },
  { type: 'leave', weight: 15 },
]

export function generateVisitorAction(visitor) {
  const action = weightedRandom(visitorActions)
  
  switch (action.type) {
    case 'navigate':
      const newPage = weightedRandom(sitePages)
      return {
        type: 'navigate',
        from: visitor.currentPage,
        to: newPage,
        timestamp: new Date(),
      }
    case 'addToCart':
      return {
        type: 'addToCart',
        page: visitor.currentPage,
        value: Math.floor(Math.random() * 300) + 50,
        timestamp: new Date(),
      }
    case 'leave':
      return {
        type: 'leave',
        page: visitor.currentPage,
        sessionDuration: Date.now() - visitor.sessionStart.getTime(),
        pagesViewed: visitor.pagesViewed,
        timestamp: new Date(),
      }
    default:
      return {
        type: action.type,
        page: visitor.currentPage,
        timestamp: new Date(),
      }
  }
}

export default {
  sitePages,
  trafficSources,
  devices,
  countries,
  cities,
  hourlyTraffic,
  siteStats,
  topPages,
  conversionFunnel,
  cartAbandons,
  generateRandomVisitor,
  generateVisitorAction,
}
