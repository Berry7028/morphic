import { notFound, redirect } from 'next/navigation'

import { getChat } from '@/lib/actions/chat'
import { getCurrentUserId } from '@/lib/auth/get-current-user'
import { getModels } from '@/lib/config/models'
import { ExtendedCoreMessage, SearchResults } from '@/lib/types'
import { convertToUIMessages } from '@/lib/utils'

import { Chat } from '@/components/chat'
import { CanvasProvider } from '@/components/canvas/canvas-provider'
import { CanvasShell } from '@/components/canvas/canvas-shell'
import InspectorPanel from '@/components/canvas/inspector-panel'
import GalleryPanel from '@/components/canvas/gallery-panel'
import Dock from '@/components/canvas/dock'
import CommandPalette from '@/components/canvas/command-palette'

export const maxDuration = 60

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const userId = await getCurrentUserId()
  const chat = await getChat(id, userId || 'anonymous')

  let metadata: { title: string; openGraph?: { images?: { url: string; width?: number; height?: number }[] } } = {
    title: chat?.title?.toString().slice(0, 50) || 'Search'
  }

  if (chat && chat.messages) {
    const dataMessage = chat.messages.find((msg: ExtendedCoreMessage) => msg.role === 'data')

    if (dataMessage && dataMessage.content) {
      const searchData = dataMessage.content as SearchResults
      if (searchData.images && searchData.images.length > 0) {
        const firstImage = searchData.images[0]
        let imageUrl: string | undefined = undefined

        if (typeof firstImage === 'string') {
          imageUrl = firstImage
        } else if (typeof firstImage === 'object' && firstImage.url) {
          imageUrl = firstImage.url
        }

        if (imageUrl) {
          metadata.openGraph = {
            images: [{ url: imageUrl, width: 1200, height: 630 }]
          }
        }
      }
    }
  }
  return metadata
}

export default async function SearchPage(props: { params: Promise<{ id: string }> }) {
  const userId = await getCurrentUserId()
  const { id } = await props.params

  const chat = await getChat(id, userId)
  const messages = convertToUIMessages(chat?.messages || [])

  if (!chat) {
    redirect('/')
  }

  if (chat?.userId !== userId && chat?.userId !== 'anonymous') {
    notFound()
  }

  const models = await getModels()

  return (
    <CanvasProvider>
      <CommandPalette />
      <CanvasShell
        left={<InspectorPanel chatId={id} />}
        right={<GalleryPanel />}
        bottom={<Dock />}
        center={<Chat id={id} savedMessages={messages} models={models} />}
      />
    </CanvasProvider>
  )
}
