"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useCanvas } from './canvas-provider'

export default function CommandPalette() {
  const { togglePanel } = useCanvas()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const toggle = useCallback((panel: 'chat' | 'notes' | 'gallery' | 'inspector') => {
    togglePanel(panel)
    setOpen(false)
  }, [togglePanel])

  const focusChat = useCallback(() => {
    const input = document.querySelector<HTMLInputElement>('form[data-chat-input] textarea, form[data-chat-input] input')
    input?.focus()
    setOpen(false)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Panels">
          <CommandItem onSelect={() => toggle('inspector')}>Toggle Inspector</CommandItem>
          <CommandItem onSelect={() => toggle('gallery')}>Toggle Gallery</CommandItem>
          <CommandItem onSelect={() => toggle('notes')}>Toggle Notes</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Chat">
          <CommandItem onSelect={focusChat}>Focus Chat Input</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}