import { CoreMessage, generateObject, generateText } from 'ai'

import { relatedSchema } from '@/lib/schema/related'

import {
  getModel,
  getToolCallModel,
  isToolCallSupported
} from '../utils/registry'

export async function generateRelatedQuestions(
  messages: CoreMessage[],
  model: string
) {
  const lastMessages = messages.slice(-1).map(message => ({
    ...message,
    role: 'user'
  })) as CoreMessage[]

  const supportedModel = isToolCallSupported(model)
  const currentModel = supportedModel
    ? getModel(model)
    : getToolCallModel(model)

  const providerId = (model?.split(':') ?? [])[0]

  // LMStudioはOpenAI互換APIでのtool_choiceオブジェクトがエラーになるため、
  // generateObjectの代わりにJSONを直接生成させてパースする
  if (providerId === 'lmstudio') {
    const userText = (() => {
      const content = lastMessages[0]?.content
      if (typeof content === 'string') return content
      if (Array.isArray(content)) {
        return content
          .map(part => (typeof part === 'string' ? part : (part as any)?.text))
          .filter(Boolean)
          .join('\n')
      }
      return ''
    })()

    const { text } = await generateText({
      model: currentModel,
      system:
        'Return only JSON matching this schema: {"items":[{"query":"string"},{"query":"string"},{"query":"string"}]}. No extra text.',
      prompt: `Generate three deeper follow-up search queries based on the user's last message. Match the user's language.\nUser: ${userText}`
    })

    let parsed
    try {
      parsed = JSON.parse(text)
      parsed = relatedSchema.parse(parsed)
    } catch (_) {
      // フォールバック: シンプルな3件リスト
      parsed = {
        items: [
          { query: userText },
          { query: `${userText} details` },
          { query: `${userText} latest` }
        ]
      }
    }

    return { object: parsed }
  }

  const providerOptions = undefined

  const result = await generateObject({
    model: currentModel,
    system: `As a professional web researcher, your task is to generate a set of three queries that explore the subject matter more deeply, building upon the initial query and the information uncovered in its search results.

    For instance, if the original query was "Starship's third test flight key milestones", your output should follow this format:

    Aim to create queries that progressively delve into more specific aspects, implications, or adjacent topics related to the initial query. The goal is to anticipate the user's potential information needs and guide them towards a more comprehensive understanding of the subject matter.
    Please match the language of the response to the user's language.`,
    messages: lastMessages,
    schema: relatedSchema,
    providerOptions
  })

  return result
}
