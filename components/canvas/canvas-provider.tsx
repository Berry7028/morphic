"use client"

import React, { createContext, useContext, useMemo, useState } from 'react'

export type CanvasPanelId = 'chat' | 'notes' | 'gallery' | 'inspector'

export interface CanvasContextValue {
  openPanels: Record<CanvasPanelId, boolean>
  setPanelOpen: (panelId: CanvasPanelId, isOpen: boolean) => void
  togglePanel: (panelId: CanvasPanelId) => void
}

const CanvasContext = createContext<CanvasContextValue | null>(null)

export function useCanvas() {
  const ctx = useContext(CanvasContext)
  if (!ctx) throw new Error('useCanvas must be used within CanvasProvider')
  return ctx
}

export function CanvasProvider({
  children,
  defaultOpen = { chat: true, notes: false, gallery: false, inspector: false }
}: {
  children: React.ReactNode
  defaultOpen?: Record<CanvasPanelId, boolean>
}) {
  const [openPanels, setOpenPanels] = useState<Record<CanvasPanelId, boolean>>({
    chat: defaultOpen.chat,
    notes: defaultOpen.notes,
    gallery: defaultOpen.gallery,
    inspector: defaultOpen.inspector
  })

  const value = useMemo<CanvasContextValue>(
    () => ({
      openPanels,
      setPanelOpen: (panelId, isOpen) =>
        setOpenPanels(prev => ({ ...prev, [panelId]: isOpen })),
      togglePanel: panelId =>
        setOpenPanels(prev => ({ ...prev, [panelId]: !prev[panelId] }))
    }),
    [openPanels]
  )

  return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
}