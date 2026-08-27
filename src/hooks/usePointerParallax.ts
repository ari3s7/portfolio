import { useEffect, type RefObject } from 'react'

export function usePointerParallax(
  target: RefObject<HTMLElement | null>,
  enabled: boolean,
): void {
  useEffect(() => {
    const element = target.current
    if (!element || !enabled) {
      element?.style.setProperty('--px', '0')
      element?.style.setProperty('--py', '0')
      return
    }

    let frame = 0
    let nextX = 0
    let nextY = 0

    const apply = () => {
      frame = 0
      element.style.setProperty('--px', nextX.toFixed(4))
      element.style.setProperty('--py', nextY.toFixed(4))
    }

    const onMove = (event: PointerEvent) => {
      nextX = event.clientX / window.innerWidth - 0.5
      nextY = event.clientY / window.innerHeight - 0.5
      if (!frame) frame = requestAnimationFrame(apply)
    }

    const reset = () => {
      nextX = 0
      nextY = 0
      if (!frame) frame = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', reset, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', reset)
      if (frame) cancelAnimationFrame(frame)
      element.style.setProperty('--px', '0')
      element.style.setProperty('--py', '0')
    }
  }, [enabled, target])
}
