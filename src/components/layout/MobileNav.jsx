// ═══════════════════════════════════════════════════════════════════════════
// 📱 MOBILE NAV - Navigation mobile bottom tabs
// Barre de navigation fixe en bas pour mobile
// ═══════════════════════════════════════════════════════════════════════════

import React from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, Eye, Users, Mail, Wallet, Sparkles
} from 'lucide-react'
import clsx from 'clsx'

const NAV_ITEMS = [
  { path: '/', icon: LayoutDashboard, label: 'Home', color: 'core' },
  { path: '/vision', icon: Eye, label: 'Vision', color: 'vision' },
  { path: '/tribe', icon: Users, label: 'Tribe', color: 'tribe' },
  { path: '/flow', icon: Mail, label: 'Flow', color: 'flow' },
  { path: '/vault', icon: Wallet, label: 'Vault', color: 'vault' },
]

export function MobileNav({ onOpenLuna }) {
  const location = useLocation()
  const navigate = useNavigate()
  
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-pulse-bg/95 backdrop-blur-lg border-t border-pulse-border safe-area-bottom"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors"
            >
              {/* Indicateur actif */}
              {isActive && (
                <motion.div
                  layoutId="mobileNavIndicator"
                  className={`absolute inset-0 bg-${item.color}/20 rounded-xl`}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              
              <Icon 
                className={clsx(
                  'w-6 h-6 relative z-10 transition-colors',
                  isActive ? `text-${item.color}` : 'text-gray-500'
                )} 
              />
              <span 
                className={clsx(
                  'text-xs relative z-10 transition-colors',
                  isActive ? 'text-white' : 'text-gray-500'
                )}
              >
                {item.label}
              </span>
            </button>
          )
        })}
        
        {/* Bouton Luna */}
        <button
          onClick={onOpenLuna}
          className="relative flex flex-col items-center gap-1 px-3 py-2"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-core to-vision flex items-center justify-center shadow-lg shadow-core/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </button>
      </div>
    </motion.nav>
  )
}

export default MobileNav
