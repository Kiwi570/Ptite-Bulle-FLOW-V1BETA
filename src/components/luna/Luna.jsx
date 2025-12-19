// ═══════════════════════════════════════════════════════════════════════════
// 🤖 LUNA V1 - L'IA Copilote Intelligente
// 20+ réponses contextuelles, vraie personnalité
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Send, Sparkles, TrendingUp, AlertCircle, CheckCircle,
  ChevronRight, MessageCircle, Lightbulb, Zap, Users, Mail,
  Wallet, Eye, Heart, ArrowRight
} from 'lucide-react'
import clsx from 'clsx'
import { usePulseStore } from '@/stores/pulseStore'
import { Button, Badge } from '@/components/ui'
import { useNavigate } from 'react-router-dom'

// ═══════════════════════════════════════════════════════════════════════════
// 🧠 INTELLIGENCE DE LUNA - Base de réponses
// ═══════════════════════════════════════════════════════════════════════════

const LUNA_KNOWLEDGE = {
  greetings: {
    keywords: ['salut', 'hello', 'hey', 'coucou', 'bonjour', 'hi'],
    responses: [
      "Hey ! 👋 Comment je peux t'aider ?",
      "Salut toi ! Prêt à booster ton business ? 🚀",
      "Hello ! J'ai plein d'idées pour toi aujourd'hui !",
    ]
  },
  
  howAreYou: {
    keywords: ['ça va', 'ca va', 'comment vas', 'tu vas bien'],
    responses: [
      "Toujours au top ! 😄 Et ton business, il se porte comment ?",
      "Nickel ! J'ai repéré des opportunités, on en parle ?",
      "Super bien ! J'ai analysé tes données ce matin, y'a du potentiel !",
    ]
  },
  
  clients: {
    keywords: ['client', 'clients', 'tribe', 'crm'],
    responses: [
      "Côté clients : 2 ambassadeurs 👑, 2 fans 💜, 3 actifs ⚡, 3 dormants 😴 et 2 nouveaux 🌟. Les dormants sont ta priorité !",
      "Tu as 8 dormants à réactiver = +2 400€ potentiels. Je peux te montrer lesquels cibler en premier ?",
      "Tes meilleurs clients sont Marie et Thomas. Ils méritent un petit message VIP ! 💜",
    ],
    action: { label: 'Voir les clients', path: '/tribe' }
  },
  
  dormants: {
    keywords: ['dormant', 'dormants', 'inactif', 'réactiver', 'perdu'],
    responses: [
      "3 dormants prioritaires : Pierre (3 200€ CA), Camille (560€) et Nicolas (1 450€). Pierre est urgent, ça fait 4 mois !",
      "Bonne nouvelle : Camille a visité ton site cette semaine. Elle est encore intéressée ! Un email personnalisé peut la réactiver.",
      "Les dormants = 5 210€ de CA passé. Une campagne ciblée peut récupérer 30-40%. On s'y met ? 💪",
    ],
    action: { label: 'Voir les dormants', path: '/tribe', filter: 'dormant' }
  },
  
  emails: {
    keywords: ['email', 'emails', 'newsletter', 'envoyer', 'campagne'],
    responses: [
      "12 emails envoyés aujourd'hui, 52% d'ouverture. C'est au-dessus de la moyenne, bravo ! 📧",
      "Conseil : envoie tes emails le mardi ou jeudi entre 10h-11h. C'est ton créneau optimal selon tes stats !",
      "12 paniers abandonnés = 1 890€ qui t'attendent. Un email de relance peut en récupérer 20-30% !",
    ],
    action: { label: 'Créer un email', path: '/flow' }
  },
  
  automation: {
    keywords: ['automation', 'automatisation', 'séquence', 'workflow'],
    responses: [
      "Je te conseille 3 automations essentielles : Bienvenue (nouveaux), Relance panier (abandons), Réactivation (dormants).",
      "Une automation de bienvenue bien faite augmente la LTV de 33%. Tu veux que je t'aide à en créer une ?",
      "Tes automations actuelles tournent bien ! L'automation panier abandonné a récupéré 890€ ce mois-ci. 🎯",
    ],
    action: { label: 'Créer une automation', path: '/flow' }
  },
  
  money: {
    keywords: ['argent', 'revenu', 'chiffre', 'vente', 'ca', 'euros', '€'],
    responses: [
      "Aujourd'hui : 2 340€ de CA ! Tu es à +18% vs la moyenne. Continue comme ça ! 💰",
      "Ce mois-ci : 28 900€ de revenus, 16 200€ de dépenses = 12 700€ de bénéfice. Marge de 44%, pas mal !",
      "Tu as 4 200€ de factures en retard. Une relance groupée pourrait tout débloquer cette semaine.",
    ],
    action: { label: 'Voir les finances', path: '/vault' }
  },
  
  invoices: {
    keywords: ['facture', 'factures', 'paiement', 'impayé', 'retard', 'relance'],
    responses: [
      "3 factures en retard : Creative Studio (2 100€), WebDev Pro (1 650€), et une petite de 450€. Total = 4 200€ à récupérer !",
      "Conseil : relance d'abord Creative Studio (2 100€). C'est la plus grosse et elle a 16 jours de retard.",
      "68% des factures sont payées dans les 48h après relance. Un petit email peut faire des miracles ! 📤",
    ],
    action: { label: 'Voir les factures', path: '/vault' }
  },
  
  visitors: {
    keywords: ['visiteur', 'visiteurs', 'trafic', 'site', 'analytics'],
    responses: [
      "42 visiteurs en ce moment sur ton site ! La page Pricing est populaire aujourd'hui. 👀",
      "847 visiteurs aujourd'hui, +12% vs hier. Ta campagne fonctionne bien !",
      "J'ai repéré un visiteur qui a vu la page Pricing 4 fois. Il hésite... Un chatbot pourrait l'aider !",
    ],
    action: { label: 'Voir le trafic', path: '/vision' }
  },
  
  score: {
    keywords: ['score', 'santé', 'performance', 'comment ça va'],
    responses: [
      "Ton score de santé est à 78/100. Vision 82, Tribe 75, Flow 68, Vault 88. Le Flow est à améliorer !",
      "Pour booster ton score : 1) Réactive les dormants (+Tribe), 2) Envoie plus d'emails (+Flow), 3) Relance les factures (+Vault)",
      "Tu as gagné +3 points cette semaine ! Continue les bonnes actions et tu passeras les 80 🎯",
    ]
  },
  
  help: {
    keywords: ['aide', 'help', 'quoi faire', 'conseil', 'suggestion', 'idée'],
    responses: [
      "Mes 3 priorités pour toi : 1) Relancer Pierre (dormant VIP), 2) Email aux paniers abandonnés, 3) Facture Creative Studio",
      "Tu veux un quick win ? Envoie un email aux 12 paniers abandonnés. Potentiel : +500€ en 24h !",
      "Je suggère de commencer par les dormants. 3 emails personnalisés = potentiellement 1 500€ récupérés.",
    ]
  },
  
  thanks: {
    keywords: ['merci', 'thanks', 'super', 'génial', 'top', 'parfait'],
    responses: [
      "Avec plaisir ! C'est mon job de t'aider à cartonner 🚀",
      "De rien ! N'hésite pas si tu as d'autres questions 💜",
      "Content de t'aider ! Ensemble on va faire décoller ton business !",
    ]
  },
  
  joke: {
    keywords: ['blague', 'drôle', 'rire', 'humour', 'marrant'],
    responses: [
      "Pourquoi les développeurs n'aiment pas la nature ? Parce qu'il y a trop de bugs ! 🐛😄",
      "Un client dormant et une facture en retard entrent dans un bar... et toi tu devrais les relancer ! 😂",
      "Je suis une IA, je ne connais pas de blagues... mais je connais tes KPIs par cœur ! 📊",
    ]
  },
  
  default: {
    responses: [
      "Hmm, je ne suis pas sûre de comprendre. Tu veux qu'on parle de tes clients, emails, ou finances ?",
      "Je peux t'aider avec : clients 👥, emails 📧, finances 💰, ou trafic 👀. Qu'est-ce qui t'intéresse ?",
      "Reformule ta question ! Je suis forte en : analyse clients, stratégie email, et suivi financier.",
    ]
  }
}

// Fonction pour trouver la meilleure réponse
function findBestResponse(input) {
  const normalizedInput = input.toLowerCase().trim()
  
  // Chercher dans chaque catégorie
  for (const [category, data] of Object.entries(LUNA_KNOWLEDGE)) {
    if (category === 'default') continue
    
    const hasKeyword = data.keywords?.some(keyword => 
      normalizedInput.includes(keyword.toLowerCase())
    )
    
    if (hasKeyword) {
      const randomResponse = data.responses[Math.floor(Math.random() * data.responses.length)]
      return {
        text: randomResponse,
        action: data.action || null,
        category
      }
    }
  }
  
  // Réponse par défaut
  const defaultResponses = LUNA_KNOWLEDGE.default.responses
  return {
    text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
    action: null,
    category: 'default'
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 💬 COMPOSANTS LUNA
// ═══════════════════════════════════════════════════════════════════════════

export function LunaBubble() {
  const { lunaOpen, lunaNotifications, toggleLuna } = usePulseStore()
  
  if (lunaOpen) return null
  
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLuna}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-core via-tribe to-vision flex items-center justify-center shadow-lg shadow-core/30"
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-core via-tribe to-vision"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <Sparkles className="w-7 h-7 text-white relative z-10" />
      {lunaNotifications > 0 && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-error rounded-full flex items-center justify-center text-xs font-bold text-white"
        >
          {lunaNotifications > 9 ? '9+' : lunaNotifications}
        </motion.div>
      )}
    </motion.button>
  )
}

export function LunaPanel() {
  const { lunaOpen, lunaInsights, closeLuna, suggestedActions, completeSuggestedAction } = usePulseStore()
  const [activeTab, setActiveTab] = useState('chat')
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: "Hey ! 👋 Je suis Luna, ton copilote business. Pose-moi une question ou demande-moi un conseil !" }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()
  
  // Scroll auto
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  const handleSend = async (e) => {
    e?.preventDefault()
    if (!inputValue.trim()) return
    
    // Ajouter message user
    const userMessage = { id: Date.now(), role: 'user', content: inputValue }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)
    
    // Simuler réflexion
    await new Promise(r => setTimeout(r, 800 + Math.random() * 700))
    
    // Trouver réponse
    const response = findBestResponse(inputValue)
    
    setIsTyping(false)
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      role: 'assistant', 
      content: response.text,
      action: response.action
    }])
  }
  
  const handleAction = (action) => {
    if (action.filter) {
      // Navigation avec contexte
      navigate(action.path)
      // On pourrait aussi set le filtre dans le store ici
    } else {
      navigate(action.path)
    }
    closeLuna()
  }
  
  const handleSuggestedAction = (action) => {
    completeSuggestedAction(action.id)
    navigate(`/${action.module}`)
    closeLuna()
  }
  
  if (!lunaOpen) return null
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-h-[80vh] bg-pulse-bg/95 backdrop-blur-xl rounded-2xl border border-pulse-border shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-pulse-border bg-gradient-to-r from-core/10 to-vision/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-core via-tribe to-vision flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Luna</h3>
              <p className="text-xs text-gray-400">Ta copilote business IA</p>
            </div>
          </div>
          <button onClick={closeLuna} className="p-2 hover:bg-pulse-surface rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-pulse-border">
          {[
            { id: 'chat', label: 'Chat', icon: MessageCircle },
            { id: 'actions', label: 'Actions', icon: Zap, count: suggestedActions.length },
            { id: 'insights', label: 'Insights', icon: Lightbulb, count: lunaInsights.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors',
                activeTab === tab.id 
                  ? 'text-core border-b-2 border-core bg-core/5' 
                  : 'text-gray-400 hover:text-white'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count > 0 && (
                <Badge variant="error" size="sm">{tab.count}</Badge>
              )}
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'chat' && (
            <div className="h-full flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={clsx('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}
                  >
                    <div className={clsx(
                      'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                      msg.role === 'assistant' 
                        ? 'bg-gradient-to-br from-core to-vision' 
                        : 'bg-pulse-surface'
                    )}>
                      {msg.role === 'assistant' 
                        ? <Sparkles className="w-4 h-4 text-white" />
                        : <Users className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                    <div className={clsx(
                      'max-w-[80%] px-4 py-3 rounded-2xl text-sm',
                      msg.role === 'assistant' 
                        ? 'bg-pulse-surface text-white rounded-tl-sm' 
                        : 'bg-core text-white rounded-tr-sm'
                    )}>
                      {msg.content}
                      {msg.action && (
                        <button
                          onClick={() => handleAction(msg.action)}
                          className="mt-2 flex items-center gap-1 text-xs text-core hover:text-core/80 transition-colors"
                        >
                          {msg.action.label} <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-core to-vision flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-pulse-surface px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Quick suggestions */}
              <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
                {['Mes clients', 'Dormants', 'Factures', 'Aide-moi'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInputValue(suggestion)
                      setTimeout(() => handleSend(), 100)
                    }}
                    className="px-3 py-1.5 bg-pulse-surface hover:bg-pulse-surface-light rounded-full text-xs text-gray-300 whitespace-nowrap transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              
              {/* Input */}
              <form onSubmit={handleSend} className="p-4 border-t border-pulse-border flex gap-2">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Pose-moi une question..."
                  className="flex-1 px-4 py-2 rounded-xl bg-pulse-surface border border-pulse-border text-white placeholder-gray-500 focus:outline-none focus:border-core"
                />
                <Button type="submit" variant="primary" className="px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          )}
          
          {activeTab === 'actions' && (
            <div className="p-4 space-y-3 overflow-y-auto h-full">
              <p className="text-sm text-gray-400 mb-4">Actions prioritaires pour booster ton score :</p>
              {suggestedActions.map((action, i) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={clsx(
                    'p-4 rounded-xl border cursor-pointer hover:scale-[1.02] transition-transform',
                    action.priority === 'urgent' 
                      ? 'bg-error/10 border-error/30' 
                      : 'bg-pulse-surface border-pulse-border'
                  )}
                  onClick={() => handleSuggestedAction(action)}
                >
                  <div className="flex items-start gap-3">
                    <div className={clsx(
                      'w-10 h-10 rounded-xl flex items-center justify-center',
                      action.module === 'tribe' && 'bg-tribe/20',
                      action.module === 'flow' && 'bg-flow/20',
                      action.module === 'vault' && 'bg-vault/20',
                    )}>
                      {action.module === 'tribe' && <Users className="w-5 h-5 text-tribe" />}
                      {action.module === 'flow' && <Mail className="w-5 h-5 text-flow" />}
                      {action.module === 'vault' && <Wallet className="w-5 h-5 text-vault" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">{action.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{action.description}</p>
                      <p className="text-xs text-flow font-medium mt-1">{action.impact}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </div>
                </motion.div>
              ))}
              
              {suggestedActions.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-flow mx-auto mb-3" />
                  <h3 className="text-white font-medium">Tout est fait !</h3>
                  <p className="text-sm text-gray-400">Bravo, tu as complété toutes les actions suggérées 🎉</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'insights' && (
            <div className="p-4 space-y-3 overflow-y-auto h-full">
              {lunaInsights.length > 0 ? (
                lunaInsights.map((insight, i) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={clsx(
                      'p-4 rounded-xl border',
                      insight.type === 'success' && 'bg-flow/10 border-flow/30',
                      insight.type === 'tip' && 'bg-vision/10 border-vision/30',
                      insight.type === 'celebration' && 'bg-vault/10 border-vault/30',
                      insight.type === 'warning' && 'bg-warning/10 border-warning/30',
                    )}
                  >
                    <p className="text-sm text-white">{insight.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(insight.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Lightbulb className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <h3 className="text-white font-medium">Pas encore d'insights</h3>
                  <p className="text-sm text-gray-400">Utilise l'app et je te donnerai des conseils personnalisés !</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default { LunaBubble, LunaPanel }
