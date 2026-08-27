import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useExperience } from '@/state/useExperience'

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, summary, [tabindex]:not([tabindex="-1"])'

export function InkCursor() {
  const ringRef = useRef<HTMLSpanElement>(null)
  const { prefersReducedMotion, hasEntered } = useExperience()
  const desktopPointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const enabled = hasEntered && desktopPointer && !prefersReducedMotion

  useEffect(() => {
    const ring = ringRef.current
    if (!ring || !enabled) return

    let frame = 0
    let currentX = window.innerWidth / 2
    let currentY = window.innerHeight / 2
    let nextX = currentX
    let nextY = currentY
    let hot = false

    const paint = () => {
      ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${hot ? 1.18 : 1})`
    }

    const tick = () => {
      const dx = nextX - currentX
      const dy = nextY - currentY
      if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
        currentX = nextX
        currentY = nextY
        paint()
        frame = 0
        return
      }
      currentX += dx * 0.28
      currentY += dy * 0.28
      paint()
      frame = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      nextX = event.clientX
      nextY = event.clientY
      hot = Boolean((event.target as Element | null)?.closest(INTERACTIVE))
      if (!frame) frame = requestAnimationFrame(tick)
    }

    document.documentElement.classList.add('has-ink-cursor')
    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('has-ink-cursor')
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [enabled])

  if (!enabled) return null

  return <span ref={ringRef} className="ink-cursor" aria-hidden="true" />
}
