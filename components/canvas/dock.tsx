"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCanvas } from './canvas-provider'
import { GalleryHorizontalEnd, PanelRight, StickyNote } from 'lucide-react'

export default function Dock({ className }: { className?: string }) {
  const { openPanels, togglePanel } = useCanvas()
  return (
    <div className={cn('flex items-center justify-center gap-2 p-2', className)}>
      <Button
        variant={openPanels.inspector ? 'default' : 'secondary'}
        size="sm"
        onClick={() => togglePanel('inspector')}
        className="gap-2"
      >
        <PanelRight className="size-4" /> Inspector
      </Button>
      <Button
        variant={openPanels.gallery ? 'default' : 'secondary'}
        size="sm"
        onClick={() => togglePanel('gallery')}
        className="gap-2"
      >
        <GalleryHorizontalEnd className="size-4" /> Gallery
      </Button>
      <Button
        variant={openPanels.notes ? 'default' : 'secondary'}
        size="sm"
        onClick={() => togglePanel('notes')}
        className="gap-2"
      >
        <StickyNote className="size-4" /> Notes
      </Button>
      <div className="ml-auto text-xs text-muted-foreground pr-3 hidden md:block">
        Cmd/Ctrl + K
      </div>
    </div>
  )
}