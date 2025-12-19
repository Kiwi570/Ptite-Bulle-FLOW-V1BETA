// ═══════════════════════════════════════════════════════════════════════════
// 🏗️ LAYOUT V3 - Structure principale MAGNIFIQUE
// Plus aéré, plus impactant
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, Eye, Users, Mail, Wallet, Menu, ChevronLeft, 
  Settings, HelpCircle, Moon, Sun, Sparkles
} from 'lucide-react'
import clsx from 'clsx'
import { usePulseStore } from '@/stores/pulseStore'

// ═══════════════════════════════════════════════════════════════════════════
// SPLASH SCREEN
// ═══════════════════════════════════════════════════════════════════════════

function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(0)
  
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => onComplete(), 1800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] bg-pulse-bg flex items-center justify-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-core/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-vision/10 rounded-full blur-3xl" />
      </div>
      
      <div className="text-center relative z-10">
        {/* Logo animé */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-core via-tribe to-vision flex items-center justify-center shadow-2xl"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-14 h-14 text-white" />
          </motion.div>
        </motion.div>
        
        {/* Texte */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
          className="text-5xl font-black text-white mb-3 tracking-tight"
        >
          PULSE
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          className="text-lg text-gray-400"
        >
          Le cœur de ton business
        </motion.p>
        
        {/* Loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 3 ? 1 : 0 }}
          className="flex justify-center gap-2 mt-8"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-core to-tribe"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════════════════════════════

const NAV_ITEMS = [
  { path: '/', icon: Heart, label: 'Dashboard', color: 'core', emoji: '🫀' },
  { path: '/vision', icon: Eye, label: 'Vision', color: 'vision', emoji: '👁️' },
  { path: '/tribe', icon: Users, label: 'Tribu', color: 'tribe', emoji: '👥' },
  { path: '/flow', icon: Mail, label: 'Flow', color: 'flow', emoji: '💌' },
  { path: '/vault', icon: Wallet, label: 'Coffre', color: 'vault', emoji: '💰' },
]

function Sidebar({ collapsed, onToggle }) {
  const { healthScore } = usePulseStore()
  
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      className="sidebar-dark h-screen border-r border-white/5 flex flex-col fixed left-0 top-0 z-40"
    >
      {/* Logo */}
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-core to-vision flex items-center justify-center shadow-lg shadow-core/20">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-lg">PULSE</span>
                <p className="text-xs text-gray-500">Business OS</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={onToggle}
          className="p-2.5 hover:bg-white/5 rounded-xl transition-colors"
        >
          {collapsed ? <Menu className="w-5 h-5 text-gray-400" /> : <ChevronLeft className="w-5 h-5 text-gray-400" />}
        </button>
      </div>
      
      {/* Score mini */}
      {collapsed && (
        <div className="p-4 text-center border-b border-white/5">
          <div className="text-2xl font-bold text-gradient">{healthScore}</div>
          <p className="text-[10px] text-gray-500 mt-1">Score</p>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1.5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group',
              isActive 
                ? `bg-${item.color}/15 text-${item.color}` 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            )}
          >
            {({ isActive }) => (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={clsx(
                    'w-9 h-9 rounded-xl flex items-center justify-center transition-all',
                    isActive ? `bg-${item.color}/20` : 'bg-white/5 group-hover:bg-white/10'
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                </motion.div>
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* Footer */}
      <div className="p-3 border-t border-white/5 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          {!collapsed && <span>Paramètres</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
          <HelpCircle className="w-5 h-5" />
          {!collapsed && <span>Aide</span>}
        </button>
      </div>
    </motion.aside>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MOBILE NAV
// ═══════════════════════════════════════════════════════════════════════════

function MobileNav() {
  return (
    <nav className="mobile-nav-dark fixed bottom-0 left-0 right-0 border-t border-white/5 p-2 flex justify-around z-40 md:hidden safe-area-bottom">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => clsx(
            'flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl transition-all',
            isActive ? `text-${item.color}` : 'text-gray-400'
          )}
        >
          {({ isActive }) => (
            <>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={clsx(
                  'p-2 rounded-xl transition-all',
                  isActive && `bg-${item.color}/20`
                )}
              >
                <item.icon className="w-5 h-5" />
              </motion.div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════════════════════════════════════════════

function ThemeToggle() {
  const { theme, toggleTheme } = usePulseStore()
  const isDark = theme === 'dark'
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={clsx(
        'relative w-16 h-9 rounded-full p-1 transition-all duration-300',
        isDark ? 'bg-pulse-surface' : 'bg-vault/20'
      )}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 flex items-center justify-between px-2.5">
        <Moon className={clsx('w-4 h-4 transition-opacity', isDark ? 'opacity-100 text-vision' : 'opacity-30')} />
        <Sun className={clsx('w-4 h-4 transition-opacity', isDark ? 'opacity-30' : 'opacity-100 text-vault')} />
      </div>
      
      <motion.div
        className={clsx('w-7 h-7 rounded-full shadow-lg flex items-center justify-center', isDark ? 'bg-vision' : 'bg-vault')}
        animate={{ x: isDark ? 0 : 28 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? <Moon className="w-4 h-4 text-white" /> : <Sun className="w-4 h-4 text-white" />}
      </motion.div>
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// DEMO BANNER
// ═══════════════════════════════════════════════════════════════════════════

function DemoBanner() {
  const [time, setTime] = useState(300)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  
  return (
    <div className="bg-gradient-to-r from-core/20 via-tribe/10 to-vision/20 border-b border-core/20 px-4 py-2.5 flex items-center justify-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-core" />
        <span className="text-white font-medium">Mode Démo</span>
      </div>
      <span className="text-gray-500">•</span>
      <span className="text-gray-300">
        ⏱️ {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// LAYOUT PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

export function Layout({ children }) {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('pulse_splash_shown'))
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()
  
  const handleSplashComplete = () => {
    sessionStorage.setItem('pulse_splash_shown', 'true')
    setShowSplash(false)
  }
  
  const currentItem = NAV_ITEMS.find(item => item.path === location.pathname)
  const pageColor = currentItem?.color || 'core'
  
  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>
      
      <div className="min-h-screen bg-pulse-bg">
        <DemoBanner />
        
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        </div>
        
        {/* Main content */}
        <main className={clsx(
          'transition-all duration-300 pb-24 md:pb-8 overflow-x-hidden',
          sidebarCollapsed ? 'md:ml-20' : 'md:ml-[260px]'
        )}>
          {/* Header */}
          <header className="sticky top-0 z-30 bg-pulse-bg/80 backdrop-blur-xl border-b border-pulse-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 md:hidden">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-core to-vision flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-pulse-text">PULSE</span>
              </div>
              
              <div className="hidden md:flex items-center gap-3">
                <span className="text-2xl">{currentItem?.emoji}</span>
                <h1 className={clsx('text-xl font-bold', `text-${pageColor}`)}>
                  {currentItem?.label || 'Dashboard'}
                </h1>
              </div>
              
              <div className="flex items-center gap-5">
                <ThemeToggle />
                
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-pulse-text">Mon Business</p>
                  <p className="text-xs text-pulse-text-muted">Plan Pro</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tribe to-vision flex items-center justify-center ring-2 ring-white/10">
                  <span className="text-white font-bold">M</span>
                </div>
              </div>
            </div>
          </header>
          
          {/* Page content */}
          <div className="p-6 md:p-8 lg:p-10 overflow-hidden max-w-full">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="max-w-full"
            >
              {children}
            </motion.div>
          </div>
        </main>
        
        <MobileNav />
      </div>
    </>
  )
}

export default Layout
