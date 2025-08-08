"use client"

import React from 'react'

export default function GalleryPanel({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-full overflow-auto p-3">
      {children ?? (
        <div className="text-sm text-muted-foreground">No items yet.</div>
      )}
    </div>
  )
}