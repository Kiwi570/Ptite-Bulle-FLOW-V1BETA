// ═══════════════════════════════════════════════════════════════════════════
// 📧 EMAIL COMPOSER - Création d'email conversationnelle avec Luna
// Interface de chat pour créer des emails
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Send, Sparkles, Mail, Users, Eye, MousePointer,
  Image, Link, Bold, Italic, List, Smile, Paperclip,
  ChevronRight, Check, RefreshCw, Copy, Wand2, Palette
} from 'lucide-react'
import clsx from 'clsx'
import { Button, Badge, Avatar } from '@/components/ui'

// Suggestions initiales de Luna
const INITIAL_SUGGESTIONS = [
  { id: 'promo', label: '🎁 Créer une promo', prompt: 'Je veux créer un email promotionnel' },
  { id: 'newsletter', label: '📰 Newsletter', prompt: 'Je veux écrire une newsletter' },
  { id: 'abandon', label: '🛒 Panier abandonné', prompt: 'Email de relance panier abandonné' },
  { id: 'welcome', label: '👋 Bienvenue', prompt: 'Email de bienvenue pour nouveaux inscrits' },
  { id: 'reactivation', label: '💤 Réactivation', prompt: 'Email pour réactiver un client dormant' },
]

// Segments disponibles
const SEGMENTS = [
  { id: 'all', label: 'Tous les contacts', count: 1456, emoji: '👥' },
  { id: 'vip', label: 'Clients VIP', count: 89, emoji: '⭐' },
  { id: 'new', label: 'Nouveaux inscrits', count: 234, emoji: '✨' },
  { id: 'dormant', label: 'Clients dormants', count: 312, emoji: '💤' },
  { id: 'cart', label: 'Panier abandonné', count: 45, emoji: '🛒' },
  { id: 'birthday', label: 'Anniversaires du mois', count: 28, emoji: '🎂' },
]

// Templates de design
const DESIGN_TEMPLATES = [
  { id: 'minimal', name: 'Minimal', preview: '⬜', color: '#FFFFFF' },
  { id: 'modern', name: 'Moderne', preview: '🟪', color: '#A78BFA' },
  { id: 'elegant', name: 'Élégant', preview: '⬛', color: '#1A1A2E' },
  { id: 'playful', name: 'Fun', preview: '🟨', color: '#FBBF24' },
  { id: 'brand', name: 'Ta marque', preview: '💜', color: '#F472B6' },
]

// Simuler les réponses de Luna
function generateLunaResponse(userMessage, context) {
  const msg = userMessage.toLowerCase()
  
  // Détection du type de demande
  if (msg.includes('promo') || msg.includes('réduction') || msg.includes('offre')) {
    return {
      text: "Super ! Je vais t'aider à créer un email promo efficace 🎁\n\nQuel type de réduction veux-tu proposer ?\n- Un pourcentage (-20%, -30%...)\n- Un montant fixe (-10€, -25€...)\n- Livraison offerte\n- Cadeau surprise",
      suggestions: ['20% de réduction', 'Livraison offerte', '-15€ sur la commande'],
      action: null
    }
  }
  
  if (msg.includes('newsletter') || msg.includes('actualités')) {
    return {
      text: "Parfait pour une newsletter ! 📰\n\nQuel est le thème principal de cette édition ?",
      suggestions: ['Nouveautés produits', 'Conseils & astuces', 'Coulisses de l\'entreprise'],
      action: null
    }
  }
  
  if (msg.includes('panier') || msg.includes('abandonné') || msg.includes('relance')) {
    return {
      text: "Excellente idée ! Les emails de panier abandonné ont un taux de conversion de 15% en moyenne 🛒\n\nJe te propose cette structure :\n\n1. **Accroche** : \"Tu as oublié quelque chose ?\"\n2. **Rappel du panier** avec visuels\n3. **Urgence** : \"Stock limité\" ou \"Offre expire dans 24h\"\n4. **CTA** : Bouton \"Finaliser ma commande\"",
      suggestions: ['Générer l\'email', 'Ajouter un code promo', 'Personnaliser le ton'],
      action: 'preview',
      emailPreview: {
        subject: 'Tu as oublié quelque chose ? 🛒',
        preheader: 'Ton panier t\'attend...',
        content: `Salut {{prenom}},

Tu étais si proche ! Il ne te reste qu'un clic pour finaliser ta commande.

**Ton panier :**
{{produits_panier}}

**Total : {{total_panier}}€**

➡️ [Finaliser ma commande]

PS : Les stocks sont limités, ne tarde pas trop !`
      }
    }
  }
  
  if (msg.includes('bienvenue') || msg.includes('onboarding') || msg.includes('inscription')) {
    return {
      text: "L'email de bienvenue est crucial, c'est le premier contact ! 👋\n\nVoici ce que je te propose :",
      suggestions: ['Voir la preview', 'Modifier le ton', 'Ajouter un code promo'],
      action: 'preview',
      emailPreview: {
        subject: 'Bienvenue dans l\'aventure {{prenom}} ! 🎉',
        preheader: 'On est ravis de t\'avoir parmi nous',
        content: `Hey {{prenom}} !

Bienvenue dans la communauté ! 🙌

On est super contents de t'accueillir. Voici ce qui t'attend :

✨ **Accès à toutes nos nouveautés en avant-première**
🎁 **-10% sur ta première commande** avec le code BIENVENUE10
💬 **Une équipe aux petits soins** pour t'aider

➡️ [Découvrir la boutique]

À très vite,
L'équipe`
      }
    }
  }
  
  if (msg.includes('réactiv') || msg.includes('dormant') || msg.includes('revenir')) {
    return {
      text: "On va ramener ces clients ! 💪\n\nLes emails de réactivation marchent mieux avec une offre exclusive.",
      suggestions: ['Offre -20% exclusive', 'Montrer les nouveautés', 'Demander du feedback'],
      action: 'preview',
      emailPreview: {
        subject: 'Tu nous manques {{prenom}} ! 💜',
        preheader: 'On a quelque chose pour toi...',
        content: `Salut {{prenom}},

Ça fait un moment qu'on ne t'a pas vu, et franchement, tu nous manques !

Pour te montrer qu'on pense à toi, voici un petit cadeau :

🎁 **-20% sur tout le site**
Code : COMEBACK20
Valable 48h seulement

➡️ [Revenir découvrir]

On espère te revoir bientôt !`
      }
    }
  }
  
  if (msg.includes('générer') || msg.includes('créer') || msg.includes('preview')) {
    return {
      text: "Voilà ! J'ai généré l'email. Tu peux le modifier ou l'envoyer directement.",
      suggestions: ['Modifier le sujet', 'Changer le design', 'Programmer l\'envoi'],
      action: 'preview',
      emailPreview: context.lastPreview || {
        subject: 'Un email pour toi ! ✨',
        preheader: 'Découvre ce qu\'on t\'a préparé',
        content: `Salut {{prenom}} !

On a quelque chose de spécial pour toi aujourd'hui...

[Ton contenu ici]

À bientôt !`
      }
    }
  }
  
  // Réponse par défaut
  return {
    text: "Je suis là pour t'aider à créer des emails qui convertissent ! 🚀\n\nDis-moi ce que tu veux faire ou choisis une suggestion ci-dessous.",
    suggestions: INITIAL_SUGGESTIONS.map(s => s.label),
    action: null
  }
}

// Message de chat
function ChatMessage({ message, isUser }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'flex gap-3',
        isUser && 'flex-row-reverse'
      )}
    >
      {/* Avatar */}
      <div className={clsx(
        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
        isUser ? 'bg-tribe' : 'bg-gradient-to-br from-core to-vision'
      )}>
        {isUser ? (
          <span className="text-xs font-medium text-white">Toi</span>
        ) : (
          <Sparkles className="w-4 h-4 text-white" />
        )}
      </div>
      
      {/* Bulle */}
      <div className={clsx(
        'max-w-md p-3 rounded-2xl',
        isUser 
          ? 'bg-tribe text-white rounded-tr-sm' 
          : 'bg-pulse-surface text-white rounded-tl-sm'
      )}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </motion.div>
  )
}

// Preview de l'email
function EmailPreview({ email, design, onEdit }) {
  const designConfig = DESIGN_TEMPLATES.find(d => d.id === design) || DESIGN_TEMPLATES[0]
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl overflow-hidden border border-pulse-border"
    >
      {/* Header email */}
      <div className="p-3 bg-pulse-surface border-b border-pulse-border">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">De:</span>
          <span className="text-white">Mon Business &lt;hello@monbusiness.com&gt;</span>
        </div>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-gray-400">Sujet:</span>
          <span className="text-white font-medium">{email.subject}</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">{email.preheader}</div>
      </div>
      
      {/* Corps email */}
      <div 
        className="p-6 min-h-[200px]"
        style={{ backgroundColor: designConfig.color === '#FFFFFF' ? '#FFFFFF' : '#1A1A2E' }}
      >
        <div className={clsx(
          'text-sm whitespace-pre-wrap leading-relaxed',
          designConfig.color === '#FFFFFF' ? 'text-gray-800' : 'text-gray-200'
        )}>
          {email.content}
        </div>
      </div>
      
      {/* Actions */}
      <div className="p-3 bg-pulse-surface/50 border-t border-pulse-border flex gap-2">
        <Button variant="ghost" size="sm" icon={RefreshCw} onClick={onEdit}>
          Régénérer
        </Button>
        <Button variant="ghost" size="sm" icon={Copy}>
          Copier
        </Button>
        <Button variant="ghost" size="sm" icon={Palette}>
          Design
        </Button>
      </div>
    </motion.div>
  )
}

// Composant principal
export function EmailComposer({ onClose, onSend }) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      isUser: false, 
      text: "Hey ! 👋 Je suis Luna, ton assistante email.\n\nDis-moi ce que tu veux créer, ou choisis une suggestion ci-dessous !" 
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS.map(s => s.label))
  const [emailPreview, setEmailPreview] = useState(null)
  const [selectedSegment, setSelectedSegment] = useState(null)
  const [selectedDesign, setSelectedDesign] = useState('minimal')
  const [step, setStep] = useState('chat') // chat | segment | design | confirm
  
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  
  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  // Envoyer un message
  const sendMessage = (text) => {
    if (!text.trim()) return
    
    // Message utilisateur
    const userMsg = { id: Date.now(), isUser: true, text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    
    // Réponse de Luna (simulée)
    setTimeout(() => {
      const response = generateLunaResponse(text, { lastPreview: emailPreview })
      const lunaMsg = { id: Date.now() + 1, isUser: false, text: response.text }
      setMessages(prev => [...prev, lunaMsg])
      setSuggestions(response.suggestions || [])
      
      if (response.emailPreview) {
        setEmailPreview(response.emailPreview)
      }
      
      setIsTyping(false)
    }, 1000 + Math.random() * 500)
  }
  
  // Passer à l'étape suivante
  const nextStep = () => {
    if (step === 'chat' && emailPreview) setStep('segment')
    else if (step === 'segment') setStep('design')
    else if (step === 'design') setStep('confirm')
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex bg-pulse-bg"
    >
      {/* Zone de chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-pulse-border">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-pulse-surface rounded-lg">
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-core to-vision flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Créer un email avec Luna</h3>
              <p className="text-xs text-gray-400">Décris ce que tu veux, Luna s'occupe du reste</p>
            </div>
          </div>
          
          {emailPreview && (
            <Button variant="flow" onClick={nextStep}>
              Continuer
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} isUser={msg.isUser} />
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-core to-vision flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gray-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="px-4 pb-2">
            <div className="flex gap-2 flex-wrap">
              {suggestions.map((suggestion, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => sendMessage(suggestion)}
                  className="px-3 py-1.5 rounded-full bg-pulse-surface border border-pulse-border text-sm text-gray-300 hover:text-white hover:border-flow transition-colors"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>
        )}
        
        {/* Input */}
        <div className="p-4 border-t border-pulse-border">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Décris l'email que tu veux créer..."
                className="w-full px-4 py-3 pr-12 rounded-xl bg-pulse-surface border border-pulse-border text-white placeholder-gray-500 focus:outline-none focus:border-flow"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-pulse-bg rounded-lg">
                <Wand2 className="w-5 h-5 text-flow" />
              </button>
            </div>
            <Button 
              variant="flow" 
              icon={Send}
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
            />
          </div>
        </div>
      </div>
      
      {/* Sidebar - Preview & Config */}
      <div className="w-[400px] border-l border-pulse-border flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-pulse-border">
          {[
            { id: 'preview', label: 'Preview', icon: Eye },
            { id: 'segment', label: 'Audience', icon: Users },
            { id: 'design', label: 'Design', icon: Palette },
          ].map(tab => (
            <button
              key={tab.id}
              className={clsx(
                'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors',
                step === tab.id || (step === 'chat' && tab.id === 'preview')
                  ? 'text-white border-b-2 border-flow'
                  : 'text-gray-400'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {/* Preview de l'email */}
          {(step === 'chat' || step === 'preview') && (
            <>
              {emailPreview ? (
                <EmailPreview 
                  email={emailPreview} 
                  design={selectedDesign}
                  onEdit={() => sendMessage('Régénérer l\'email')}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-flow/20 flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-flow" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Pas encore d'email</h3>
                  <p className="text-sm text-gray-400">
                    Décris ce que tu veux créer et Luna génèrera l'email pour toi.
                  </p>
                </div>
              )}
            </>
          )}
          
          {/* Sélection segment */}
          {step === 'segment' && (
            <div className="space-y-3">
              <h4 className="font-semibold text-white mb-4">À qui envoyer ?</h4>
              {SEGMENTS.map(segment => (
                <button
                  key={segment.id}
                  onClick={() => setSelectedSegment(segment.id)}
                  className={clsx(
                    'w-full flex items-center gap-3 p-3 rounded-xl transition-colors',
                    selectedSegment === segment.id
                      ? 'bg-flow/20 border-2 border-flow'
                      : 'bg-pulse-surface border-2 border-transparent hover:border-gray-600'
                  )}
                >
                  <span className="text-2xl">{segment.emoji}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-white">{segment.label}</div>
                    <div className="text-sm text-gray-400">{segment.count} contacts</div>
                  </div>
                  {selectedSegment === segment.id && (
                    <Check className="w-5 h-5 text-flow" />
                  )}
                </button>
              ))}
            </div>
          )}
          
          {/* Sélection design */}
          {step === 'design' && (
            <div className="space-y-3">
              <h4 className="font-semibold text-white mb-4">Choisis un design</h4>
              <div className="grid grid-cols-2 gap-3">
                {DESIGN_TEMPLATES.map(design => (
                  <button
                    key={design.id}
                    onClick={() => setSelectedDesign(design.id)}
                    className={clsx(
                      'p-4 rounded-xl transition-colors text-center',
                      selectedDesign === design.id
                        ? 'bg-flow/20 border-2 border-flow'
                        : 'bg-pulse-surface border-2 border-transparent hover:border-gray-600'
                    )}
                  >
                    <div className="text-3xl mb-2">{design.preview}</div>
                    <div className="font-medium text-white text-sm">{design.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Confirmation */}
          {step === 'confirm' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-white mb-4">Récapitulatif</h4>
              
              <div className="p-4 bg-pulse-surface rounded-xl space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sujet</span>
                  <span className="text-white font-medium">{emailPreview?.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Audience</span>
                  <span className="text-white">{SEGMENTS.find(s => s.id === selectedSegment)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contacts</span>
                  <span className="text-flow font-bold">{SEGMENTS.find(s => s.id === selectedSegment)?.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Design</span>
                  <span className="text-white">{DESIGN_TEMPLATES.find(d => d.id === selectedDesign)?.name}</span>
                </div>
              </div>
              
              <Button variant="flow" className="w-full" icon={Send} onClick={() => onSend?.({ emailPreview, selectedSegment, selectedDesign })}>
                Envoyer maintenant
              </Button>
              <Button variant="secondary" className="w-full" icon={Clock}>
                Programmer l'envoi
              </Button>
            </div>
          )}
        </div>
        
        {/* Actions selon l'étape */}
        {step !== 'chat' && step !== 'confirm' && (
          <div className="p-4 border-t border-pulse-border">
            <Button 
              variant="flow" 
              className="w-full"
              onClick={nextStep}
              disabled={step === 'segment' && !selectedSegment}
            >
              Continuer
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default EmailComposer
