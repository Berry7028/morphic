import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from './ui/collapsible'
import { IconLogo } from './ui/icons'
import { Separator } from './ui/separator'
import { CurrentUserAvatar } from './current-user-avatar'

interface CollapsibleMessageProps {
  children: React.ReactNode
  role: 'user' | 'assistant'
  isCollapsible?: boolean
  isOpen?: boolean
  header?: React.ReactNode
  onOpenChange?: (open: boolean) => void
  showBorder?: boolean
  showIcon?: boolean
}

export function CollapsibleMessage({
  children,
  role,
  isCollapsible = false,
  isOpen = true,
  header,
  onOpenChange,
  showBorder = true,
  showIcon = true
}: CollapsibleMessageProps) {
  const content = <div className="max-w-[80%]">{children}</div>

  const AssistantIcon = (
    <div className="relative flex flex-col items-center w-5">
      <IconLogo className="size-5" />
    </div>
  )

  const UserIcon = (
    <div className="relative flex flex-col items-center w-5">
      <CurrentUserAvatar />
    </div>
  )

  const bubble = isCollapsible ? (
    <div
      className={cn(
        'rounded-2xl p-4',
        showBorder && 'border border-border/50'
      )}
    >
      <Collapsible open={isOpen} onOpenChange={onOpenChange} className="w-full">
        <div className="flex items-center justify-between w-full gap-2">
          {header && <div className="text-sm w-full">{header}</div>}
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="rounded-md p-1 hover:bg-accent group"
              aria-label={isOpen ? 'Collapse' : 'Expand'}
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
          <Separator className="my-4 border-border/50" />
          {content}
        </CollapsibleContent>
      </Collapsible>
    </div>
  ) : (
    <div className={cn('rounded-2xl', role === 'assistant' ? 'px-0' : 'px-3')}>
      {content}
    </div>
  )

  if (role === 'assistant') {
    return (
      <div className="flex w-full justify-start gap-3">
        {showIcon && AssistantIcon}
        <div className="flex-1 flex">{bubble}</div>
      </div>
    )
  }

  // user
  return (
    <div className="flex w-full justify-end gap-3">
      <div className="flex-1 flex justify-end">{bubble}</div>
      {showIcon && UserIcon}
    </div>
  )
}
