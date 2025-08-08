"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

export default function NotesPanel() {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('morphic-notes')
    if (saved) setValue(saved)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => localStorage.setItem('morphic-notes', value), 200)
    return () => clearTimeout(id)
  }, [value])

  return (
    <div className="h-full p-3">
      <Textarea
        ref={ref}
        value={value}
        onChange={e => setValue(e.target.value)}
        className="h-full resize-none"
        placeholder="Quick notes…"
      />
    </div>
  )
}