// ═══════════════════════════════════════════════════════════════════════════
// 🔔 TOAST SYSTEM - Notifications avec style
// ═══════════════════════════════════════════════════════════════════════════

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X, Sparkles, Zap } from 'lucide-react'
import clsx from 'clsx'
import { usePulseStore } from '@/stores/pulseStore'

const TOAST_ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertCircle,
  info: Info,
  luna: Sparkles,
  action: Zap,
}

const TOAST_STYLES = {
  success: 'bg-flow/20 border-flow/40 text-flow',
  error: 'bg-error/20 border-error/40 text-error',
  warning: 'bg-warning/20 border-warning/40 text-warning',
  info: 'bg-vision/20 border-vision/40 text-vision',
  luna: 'bg-core/20 border-core/40 text-core',
  action: 'bg-tribe/20 border-tribe/40 text-tribe',
}

function Toast({ toast, onRemove }) {
  const Icon = TOAST_ICONS[toast.type] || Info
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      className={clsx(
        'flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-xl min-w-[320px] max-w-[420px]',
        TOAST_STYLES[toast.type] || TOAST_STYLES.info
      )}
    >
      <div className="flex-shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        {toast.title && (
          <h4 className="font-semibold text-white text-sm">{toast.title}</h4>
        )}
        {toast.message && (
          <p className="text-sm opacity-90 mt-0.5">{toast.message}</p>
        )}
      </div>
      
      <button 
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
      >
        <X className="w-4 h-4 opacity-60" />
      </button>
    </motion.div>
  )
}

export function ToastContainer() {
  const { toasts, removeToast } = usePulseStore()
  
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ToastContainer
