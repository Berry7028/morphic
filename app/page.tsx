import { generateId } from 'ai'

import { CanvasProvider } from '@/components/canvas/canvas-provider'
import { CanvasShell } from '@/components/canvas/canvas-shell'
import CommandPalette from '@/components/canvas/command-palette'
import GalleryPanel from '@/components/canvas/gallery-panel'
import InspectorPanel from '@/components/canvas/inspector-panel'
import { Chat } from '@/components/chat'
import { getModels } from '@/lib/config/models'

export default async function Page() {
  const id = generateId()
  const models = await getModels()

  return (
    <CanvasProvider>
      <CommandPalette />
      <CanvasShell
        left={<InspectorPanel />}
        right={<GalleryPanel />}
        center={<Chat id={id} models={models} />}
      />
    </CanvasProvider>
  )
}
