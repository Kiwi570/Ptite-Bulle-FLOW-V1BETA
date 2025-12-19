// ═══════════════════════════════════════════════════════════════════════════
// 🫀 PULSE V1 - Application principale
// Tout est connecté, tout réagit
// ═══════════════════════════════════════════════════════════════════════════

import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { LunaBubble, LunaPanel } from '@/components/luna/Luna'
import { ToastContainer } from '@/components/ui/Toast'
import { usePulseStore } from '@/stores/pulseStore'

// Pages
import DashboardPage from '@/pages/Dashboard'
import VisionPage from '@/pages/Vision'
import TribePage from '@/pages/Tribe'
import FlowPage from '@/pages/Flow'
import VaultPage from '@/pages/Vault'

export default function App() {
  const { initTheme } = usePulseStore()
  
  // Initialiser le thème au montage
  useEffect(() => {
    initTheme()
  }, [initTheme])
  
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/tribe" element={<TribePage />} />
          <Route path="/flow" element={<FlowPage />} />
          <Route path="/vault" element={<VaultPage />} />
        </Routes>
      </Layout>
      
      {/* Luna AI - Disponible partout */}
      <LunaBubble />
      <LunaPanel />
      
      {/* Système de notifications toast */}
      <ToastContainer />
    </>
  )
}
