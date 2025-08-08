'use client'

import React from 'react'
import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'

export default function InspectorPanel() {
  return (
    <div className="h-full overflow-auto p-3 space-y-4">
      <Section title="Answer">
        <p className="text-sm text-muted-foreground">
          Use the chat to ask anything. Press <kbd className="px-1 py-0.5 bg-muted rounded">Enter</kbd> to send.
        </p>
      </Section>
      <Section title="Related">
        <div className="flex flex-wrap gap-2">
          {['Research', 'Compare', 'Summarize', 'Explain'].map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </Section>
      <Section title="Follow-up">
        <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
          <li>Toggle panels with Cmd/Ctrl + K</li>
          <li>Resize panels by dragging dividers</li>
          <li>Start a new chat from the input menu</li>
        </ul>
      </Section>
    </div>
  )
}