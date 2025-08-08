"use client"

import React from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { cn } from '@/lib/utils'
import { useCanvas } from './canvas-provider'

export function CanvasShell({
  center,
  left,
  right,
  bottom,
  className
}: {
  center: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  bottom?: React.ReactNode
  className?: string
}) {
  const { openPanels } = useCanvas()
  return (
    <div className={cn('flex flex-col h-full w-full', className)}>
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {openPanels.inspector && (
            <ResizablePanel defaultSize={22} minSize={16} maxSize={40} className="border-r border-border hidden xl:block">
              <div className="h-full overflow-hidden">
                {left}
              </div>
            </ResizablePanel>
          )}

          {openPanels.inspector && <ResizableHandle className="hidden xl:flex" />}

          <ResizablePanel defaultSize={openPanels.inspector && openPanels.gallery ? 56 : 78} minSize={40}>
            <div className="h-full w-full overflow-hidden">
              {center}
            </div>
          </ResizablePanel>

          {openPanels.gallery && <ResizableHandle className="hidden lg:flex" />}

          {openPanels.gallery && (
            <ResizablePanel defaultSize={22} minSize={16} maxSize={40} className="border-l border-border hidden lg:block">
              <div className="h-full overflow-hidden">
                {right}
              </div>
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
      </div>
      {bottom ? <div className="border-t border-border shrink-0">{bottom}</div> : null}
    </div>
  )
}