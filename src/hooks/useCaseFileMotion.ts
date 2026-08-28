import { useLayoutEffect, useRef, type RefObject } from 'react'
import { gsap } from '@/animations/gsapSetup'

type UseCaseFileMotionOptions = {
  sectionRef: RefObject<HTMLElement | null>
  openId: string | null
  reducedMotion: boolean
  onClose: () => void
}

function restRotate(index: number) {
  return index % 2 === 0 ? -0.8 : 0.95
}

export function useCaseFileMotion({
  sectionRef,
  openId,
  reducedMotion,
  onClose,
}: UseCaseFileMotionOptions): void {
  const previousOpen = useRef<string | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const root = document.documentElement
    root.dataset.fileOpen = String(Boolean(openId))

    const closing = Boolean(previousOpen.current) && !openId
    const opening = Boolean(openId)
    previousOpen.current = openId

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !openId) return
      event.preventDefault()
      const hit = sectionRef.current?.querySelector<HTMLElement>(
        `.case-file[data-file="${openId}"] .case-file-hit`,
      )
      onClose()
      hit?.focus()
    }
    window.addEventListener('keydown', onKey)

    if (!section || (!opening && !closing)) {
      return () => {
        window.removeEventListener('keydown', onKey)
        delete root.dataset.fileOpen
      }
    }

    const cards = [...section.querySelectorAll<HTMLElement>('.case-file')]
    const tweens: gsap.core.Tween[] = []
    const compact = window.innerWidth < 768

    const motion = (target: gsap.TweenTarget, vars: gsap.TweenVars) => {
      if (reducedMotion) {
        const next: gsap.TweenVars = {}
        ;(['x', 'y', 'scale', 'rotate', 'rotateX', 'opacity', 'zIndex'] as const).forEach(
          (key) => {
            if (vars[key] !== undefined) next[key] = vars[key]
          },
        )
        gsap.set(target, next)
        return
      }
      tweens.push(gsap.to(target, { overwrite: 'auto', ...vars }))
    }

    cards.forEach((card, index) => {
      const isOpen = card.dataset.file === openId
      const inner = card.querySelector<HTMLElement>('.case-file-docket-inner')
      const ink = card.querySelectorAll<SVGPathElement>('.case-file-ink path')
      const stain = card.querySelectorAll<HTMLElement>('.case-file-stain')
      const aside = Boolean(openId) && !isOpen
      const dir = index % 2 === 0 ? -1 : 1

      motion(card, {
        x: aside ? dir * (compact ? 8 : 32) : 0,
        y: isOpen ? (compact ? -6 : -12) : aside ? 10 : 0,
        scale: isOpen ? (compact ? 1.02 : 1.055) : aside ? 0.96 : 1,
        rotate: isOpen ? 0 : restRotate(index),
        rotateX: isOpen && !reducedMotion ? -6 : 0,
        opacity: aside ? 0.58 : 1,
        zIndex: isOpen ? 6 : 1,
        duration: isOpen ? 0.48 : 0.36,
        ease: 'power2.out',
      })

      if (inner && !reducedMotion) {
        motion(inner, {
          y: isOpen ? 0 : 8,
          opacity: isOpen ? 1 : 0,
          duration: 0.38,
          ease: 'power1.out',
        })
      }

      if (isOpen && !reducedMotion) {
        ink.forEach((path, pathIndex) => {
          if (typeof path.getTotalLength !== 'function') return
          const length = path.getTotalLength()
          tweens.push(
            gsap.fromTo(
              path,
              { strokeDasharray: length, strokeDashoffset: length },
              {
                strokeDashoffset: 0,
                duration: 0.7,
                delay: pathIndex * 0.06,
                ease: 'power1.out',
                overwrite: 'auto',
              },
            ),
          )
        })
      }

      motion(stain, {
        opacity: isOpen ? 0.22 : 0,
        duration: 0.5,
        ease: 'sine.out',
      })
    })

    return () => {
      window.removeEventListener('keydown', onKey)
      tweens.forEach((tween) => tween.kill())
      delete root.dataset.fileOpen
    }
  }, [onClose, openId, reducedMotion, sectionRef])
}
