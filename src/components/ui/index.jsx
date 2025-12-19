// ═══════════════════════════════════════════════════════════════════════════
// 🧩 COMPOSANTS UI V3 - Design System PULSE MAGNIFIQUE
// Plus aéré, plus impactant, plus ludique
// ═══════════════════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

// ═══════════════════════════════════════════════════════════════════════════
// CARD - Système hiérarchique
// ═══════════════════════════════════════════════════════════════════════════

export function Card({ 
  children, 
  className, 
  variant = 'default', // default, featured, accent, glass
  accentColor = 'core', // core, vision, tribe, flow, vault
  hover = true, 
  animate = false, 
  ...props 
}) {
  const Component = animate ? motion.div : 'div'
  const motionProps = animate ? {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  } : {}
  
  const variants = {
    default: 'card',
    featured: 'card-featured',
    accent: `card-accent card-accent-${accentColor}`,
    glass: 'card-glass',
  }
  
  return (
    <Component
      {...motionProps}
      className={clsx(variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// STAT CARD - Gros chiffres impactants
// ═══════════════════════════════════════════════════════════════════════════

export function StatCard({ 
  label, 
  value, 
  change, 
  icon: Icon,
  color = 'core',
  prefix = '',
  suffix = '',
  size = 'default', // default, large, huge
  className 
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const isPositive = change > 0
  
  const colorClasses = {
    core: 'text-core',
    vision: 'text-vision',
    tribe: 'text-tribe',
    flow: 'text-flow',
    vault: 'text-vault',
  }
  
  const iconBoxClasses = {
    core: 'icon-box-core',
    vision: 'icon-box-vision',
    tribe: 'icon-box-tribe',
    flow: 'icon-box-flow',
    vault: 'icon-box-vault',
  }
  
  const sizeClasses = {
    default: 'stat-medium',
    large: 'stat-large',
    huge: 'stat-huge',
  }
  
  // Animation de comptage
  useEffect(() => {
    if (typeof value !== 'number') return
    const duration = 1200
    const steps = 40
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])
  
  return (
    <Card className={clsx('p-6 md:p-8', className)} animate>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-base text-pulse-text-muted mb-3 font-medium">{label}</p>
          <p className={clsx(sizeClasses[size], colorClasses[color], 'count-up')}>
            {prefix}
            {typeof value === 'number' ? displayValue.toLocaleString('fr-FR') : value}
            {suffix}
          </p>
          {change !== undefined && (
            <div className={clsx(
              'inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-sm font-semibold',
              isPositive ? 'bg-flow/20 text-flow' : 'bg-error/20 text-error'
            )}>
              <span className="text-lg">{isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={clsx('stat-icon', iconBoxClasses[color])}>
            <Icon className={clsx('w-8 h-8 md:w-10 md:h-10', colorClasses[color])} />
          </div>
        )}
      </div>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO HEADER - En-tête de page impactant
// ═══════════════════════════════════════════════════════════════════════════

export function HeroHeader({
  title,
  subtitle,
  icon: Icon,
  color = 'core', // core, vision, tribe, flow, vault
  children,
  className,
}) {
  const colorClasses = {
    core: 'hero-header text-core',
    vision: 'hero-header-vision text-vision',
    tribe: 'hero-header-tribe text-tribe',
    flow: 'hero-header-flow text-flow',
    vault: 'hero-header-vault text-vault',
  }
  
  const iconBoxClasses = {
    core: 'icon-box-core',
    vision: 'icon-box-vision',
    tribe: 'icon-box-tribe',
    flow: 'icon-box-flow',
    vault: 'icon-box-vault',
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={clsx(colorClasses[color], className)}
    >
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-5">
          {Icon && (
            <motion.div 
              className={clsx('stat-icon', iconBoxClasses[color])}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Icon className="w-10 h-10" />
            </motion.div>
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{title}</h1>
            {subtitle && <p className="text-pulse-text-muted text-lg">{subtitle}</p>}
          </div>
        </div>
        {children && <div className="flex items-center gap-4">{children}</div>}
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// BUTTON - Avec glow effects
// ═══════════════════════════════════════════════════════════════════════════

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  glow = false,
  className,
  ...props 
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    core: 'btn-core',
    vision: 'btn-vision',
    tribe: 'btn-tribe',
    flow: 'btn-flow',
    vault: 'btn-vault',
    danger: 'bg-error/20 text-error border border-error/40 hover:bg-error/30',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3',
    lg: 'px-7 py-4 text-lg',
  }
  
  const glowClasses = {
    core: 'glow-core',
    vision: 'glow-vision',
    tribe: 'glow-tribe',
    flow: 'glow-flow',
    vault: 'glow-vault',
  }
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      disabled={disabled || loading}
      className={clsx(
        'rounded-xl font-semibold transition-all duration-300',
        'flex items-center justify-center gap-2.5',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pulse-bg focus:ring-core/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        glow && glowClasses[variant],
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
        </>
      )}
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// BADGE - Plus élégant
// ═══════════════════════════════════════════════════════════════════════════

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md', 
  dot = false, 
  glow = false,
  className 
}) {
  const variants = {
    default: 'bg-pulse-surface text-gray-300',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    error: 'bg-error/20 text-error',
    info: 'bg-info/20 text-info',
    core: 'bg-core/20 text-core',
    vision: 'bg-vision/20 text-vision',
    tribe: 'bg-tribe/20 text-tribe',
    flow: 'bg-flow/20 text-flow',
    vault: 'bg-vault/20 text-vault',
  }
  
  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'badge',
    lg: 'badge-lg',
  }
  
  return (
    <span className={clsx(
      'inline-flex items-center gap-2 rounded-full font-semibold',
      variants[variant],
      sizes[size],
      glow && 'badge-glow',
      className
    )}>
      {dot && (
        <motion.span 
          className={clsx(
            'w-2 h-2 rounded-full',
            variant === 'success' && 'bg-success',
            variant === 'warning' && 'bg-warning',
            variant === 'error' && 'bg-error',
            variant === 'info' && 'bg-info',
            variant === 'default' && 'bg-gray-400',
            variant === 'core' && 'bg-core',
            variant === 'vision' && 'bg-vision',
            variant === 'tribe' && 'bg-tribe',
            variant === 'flow' && 'bg-flow',
            variant === 'vault' && 'bg-vault',
          )}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      {children}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// AVATAR - Avec ring coloré
// ═══════════════════════════════════════════════════════════════════════════

export function Avatar({ src, name, size = 'md', status, ring, className }) {
  const sizes = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
  }
  
  const statusColors = {
    online: 'bg-success',
    away: 'bg-warning',
    offline: 'bg-gray-500',
    busy: 'bg-error',
  }
  
  const ringColors = {
    core: 'ring-core',
    vision: 'ring-vision',
    tribe: 'ring-tribe',
    flow: 'ring-flow',
    vault: 'ring-vault',
  }
  
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  
  return (
    <div className={clsx('relative', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={clsx(
            'rounded-full object-cover',
            sizes[size],
            ring && `ring-3 ${ringColors[ring]} ring-offset-2 ring-offset-pulse-bg`
          )}
        />
      ) : (
        <div className={clsx(
          'rounded-full bg-gradient-to-br from-core via-tribe to-vision flex items-center justify-center font-bold text-white',
          sizes[size],
          ring && `ring-3 ${ringColors[ring]} ring-offset-2 ring-offset-pulse-bg`
        )}>
          {initials}
        </div>
      )}
      {status && (
        <motion.span 
          className={clsx(
            'absolute bottom-0 right-0 w-4 h-4 rounded-full border-3 border-pulse-bg',
            statusColors[status]
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PROGRESS RING - Avec glow
// ═══════════════════════════════════════════════════════════════════════════

export function ProgressRing({ 
  value, 
  size = 140, 
  strokeWidth = 10, 
  color = 'gradient',
  showValue = true,
  label,
  glow = true,
  className 
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference
  
  const colors = {
    core: '#F472B6',
    vision: '#22D3EE',
    tribe: '#A78BFA',
    flow: '#34D399',
    vault: '#FBBF24',
    gradient: 'url(#ringGradient)',
  }
  
  return (
    <div className={clsx('relative inline-flex items-center justify-center', glow && 'score-ring', className)}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          className="score-ring-bg"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="score-ring-progress"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="stat-large text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            {value}
          </motion.span>
          {label && <span className="text-sm text-gray-400 mt-1">{label}</span>}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// TABS - Navigation élégante
// ═══════════════════════════════════════════════════════════════════════════

export function Tabs({ tabs, activeTab, onChange, className }) {
  return (
    <div className={clsx('tabs-container', className)}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx('tab', activeTab === tab.id && 'tab-active')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center gap-2">
            {tab.icon && <tab.icon className="w-4 h-4" />}
            {tab.label}
            {tab.count !== undefined && (
              <span className={clsx(
                'px-2 py-0.5 rounded-full text-xs',
                activeTab === tab.id ? 'bg-white/20' : 'bg-pulse-surface'
              )}>
                {tab.count}
              </span>
            )}
          </span>
        </motion.button>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// INPUT - Raffiné
// ═══════════════════════════════════════════════════════════════════════════

export function Input({ label, icon: Icon, error, className, ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        )}
        <input
          className={clsx(
            'input',
            Icon && 'pl-12',
            error && 'border-error focus:border-error focus:ring-error/20'
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// DIVIDER - Séparateur élégant
// ═══════════════════════════════════════════════════════════════════════════

export function Divider({ variant = 'default', className }) {
  return <div className={clsx(variant === 'subtle' ? 'divider-subtle' : 'divider', className)} />
}

// ═══════════════════════════════════════════════════════════════════════════
// SKELETON - Loading state
// ═══════════════════════════════════════════════════════════════════════════

export function Skeleton({ className, variant = 'rectangular' }) {
  const variants = {
    rectangular: 'rounded-xl',
    circular: 'rounded-full',
    text: 'rounded h-4',
  }
  
  return (
    <div className={clsx(
      'shimmer bg-pulse-surface',
      variants[variant],
      className
    )} />
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// TOOLTIP - Info au survol
// ═══════════════════════════════════════════════════════════════════════════

export function Tooltip({ children, content, position = 'top' }) {
  const [show, setShow] = useState(false)
  
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
    left: 'right-full top-1/2 -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 -translate-y-1/2 ml-3',
  }
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={clsx(
              'absolute z-50 px-4 py-2.5 text-sm font-medium',
              'bg-pulse-surface-elevated border border-pulse-border rounded-xl shadow-xl',
              'whitespace-nowrap',
              positions[position]
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EMPTY STATE - Quand il n'y a pas de données
// ═══════════════════════════════════════════════════════════════════════════

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx('text-center py-16 px-6', className)}
    >
      {Icon && (
        <motion.div 
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pulse-surface flex items-center justify-center"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Icon className="w-10 h-10 text-gray-500" />
        </motion.div>
      )}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-gray-400 mb-6 max-w-sm mx-auto">{description}</p>}
      {action}
    </motion.div>
  )
}

export default {
  Card,
  StatCard,
  HeroHeader,
  Button,
  Badge,
  Avatar,
  ProgressRing,
  Tabs,
  Input,
  Divider,
  Skeleton,
  Tooltip,
  EmptyState,
}
