import { generateId } from 'ai'

import { getModels } from '@/lib/config/models'

import { Chat } from '@/components/chat'
import { CanvasProvider } from '@/components/canvas/canvas-provider'
import { CanvasShell } from '@/components/canvas/canvas-shell'
import InspectorPanel from '@/components/canvas/inspector-panel'
import GalleryPanel from '@/components/canvas/gallery-panel'
import Dock from '@/components/canvas/dock'
import CommandPalette from '@/components/canvas/command-palette'

export default async function Page() {
  const id = generateId()
  const models = await getModels()

  return (
    <CanvasProvider>
      <CommandPalette />
      <CanvasShell
        left={<InspectorPanel chatId={id} />}
        right={<GalleryPanel />}
        bottom={<Dock />}
        center={<Chat id={id} models={models} />}
      />
    </CanvasProvider>
  )
}
