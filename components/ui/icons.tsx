'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type IconLogoProps = React.ComponentProps<'svg'> & {
  interactive?: boolean
}

function IconLogo({ className, interactive = false, ...props }: IconLogoProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [leftOffset, setLeftOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [rightOffset, setRightOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    if (!interactive) return

    const handleMove = (e: MouseEvent) => {
      const svg = svgRef.current
      if (!svg) return
      const rect = svg.getBoundingClientRect()

      // ViewBoxは 256x256 固定
      const viewBoxSize = 256
      const scaleX = rect.width / viewBoxSize
      const scaleY = rect.height / viewBoxSize

      const mouseX = e.clientX
      const mouseY = e.clientY

      // 目の中心（SVG座標 → 画面座標）
      const leftCenterX = rect.left + 102 * scaleX
      const leftCenterY = rect.top + 128 * scaleY
      const rightCenterX = rect.left + 154 * scaleX
      const rightCenterY = rect.top + 128 * scaleY

      // 半径（画面座標）
      const eyeRadiusPx = 18 * Math.min(scaleX, scaleY)
      const pupilRadiusPx = 6 * Math.min(scaleX, scaleY)
      const maxOffset = Math.max(eyeRadiusPx - pupilRadiusPx - 2, 0)

      const computeOffset = (cx: number, cy: number) => {
        const dx = mouseX - cx
        const dy = mouseY - cy
        const len = Math.hypot(dx, dy) || 1
        const ux = dx / len
        const uy = dy / len
        return { x: ux * maxOffset, y: uy * maxOffset }
      }

      const l = computeOffset(leftCenterX, leftCenterY)
      const r = computeOffset(rightCenterX, rightCenterY)

      setLeftOffset(l)
      setRightOffset(r)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [interactive])

  return (
    <svg
      ref={svgRef}
      fill="currentColor"
      viewBox="0 0 256 256"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <circle cx="128" cy="128" r="128" fill="black"></circle>
      {/* Eyeballs */}
      <circle cx="102" cy="128" r="18" fill="white"></circle>
      <circle cx="154" cy="128" r="18" fill="white"></circle>
      {/* Pupils (interactive) */}
      <g
        style={{ transition: 'transform 80ms linear' }}
        transform={interactive ? `translate(${leftOffset.x}, ${leftOffset.y})` : undefined}
      >
        <circle cx="102" cy="128" r="6" fill="black"></circle>
      </g>
      <g
        style={{ transition: 'transform 80ms linear' }}
        transform={interactive ? `translate(${rightOffset.x}, ${rightOffset.y})` : undefined}
      >
        <circle cx="154" cy="128" r="6" fill="black"></circle>
      </g>
    </svg>
  )
}

export { IconLogo }
