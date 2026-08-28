import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { gsap } from '@/animations/gsapSetup'

type UseDealSceneOptions = {
  glassRef: RefObject<HTMLElement | null>
  reducedMotion: boolean
}

type DealPhase = 'idle' | 'playing' | 'dealt'

const LIQUID_ORIGIN = '140 258'

export function useDealScene({
  glassRef,
  reducedMotion,
}: UseDealSceneOptions): { phase: DealPhase; offered: boolean; play: () => void } {
  const [phase, setPhase] = useState<DealPhase>('idle')
  const [offered, setOffered] = useState(false)
  const phaseRef = useRef<DealPhase>('idle')
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const play = useCallback(() => {
    if (phaseRef.current === 'playing') return

    const glass = glassRef.current
    if (!glass) return

    const sway = glass.querySelector('.deal-liquid-sway')
    const surface = glass.querySelector('.deal-liquid-surface')
    const highlight = glass.querySelector('.deal-highlight')
    const shine = glass.querySelectorAll('.deal-glass-shine')
    const smoke = glass.closest('.deal-stage')?.querySelectorAll('.deal-wisp')

    if (reducedMotion) {
      phaseRef.current = 'dealt'
      setPhase('dealt')
      setOffered(true)
      gsap.set(glass, { x: 0, y: 0, rotation: 0 })
      if (sway) gsap.set(sway, { rotation: 0, x: 0, svgOrigin: LIQUID_ORIGIN })
      if (surface) gsap.set(surface, { rotation: 0, y: 0, svgOrigin: LIQUID_ORIGIN })
      if (highlight) gsap.set(highlight, { x: 0, opacity: 0.28 })
      if (shine.length > 0) gsap.set(shine, { opacity: 0.2 })
      if (smoke && smoke.length > 0) gsap.set(smoke, { opacity: 0.22, y: 0 })
      return
    }

    phaseRef.current = 'playing'
    setPhase('playing')
    timelineRef.current?.kill()

    const timeline = gsap.timeline({
      onComplete: () => {
        phaseRef.current = 'dealt'
        setPhase('dealt')
        setOffered(true)
      },
    })
    timelineRef.current = timeline

    timeline.to(
      glass,
      { rotation: -2.2, x: -4, y: 1.5, duration: 0.12, ease: 'power2.out' },
      0,
    )
    timeline.to(glass, { rotation: 1.4, x: 3, y: 0, duration: 0.16, ease: 'power1.inOut' }, 0.12)
    timeline.to(glass, { rotation: 0, x: 0, y: 0, duration: 0.32, ease: 'power2.out' }, 0.28)

    if (sway) {
      timeline.fromTo(
        sway,
        { rotation: 0, x: 0, svgOrigin: LIQUID_ORIGIN },
        { rotation: 7.5, x: 3, duration: 0.16, ease: 'power2.out', svgOrigin: LIQUID_ORIGIN },
        0.04,
      )
      timeline.to(
        sway,
        { rotation: -6, x: -2, duration: 0.24, ease: 'sine.inOut', svgOrigin: LIQUID_ORIGIN },
        0.2,
      )
      timeline.to(
        sway,
        { rotation: 2.4, x: 1, duration: 0.28, ease: 'sine.inOut', svgOrigin: LIQUID_ORIGIN },
        0.44,
      )
      timeline.to(
        sway,
        { rotation: 0, x: 0, duration: 0.4, ease: 'power1.out', svgOrigin: LIQUID_ORIGIN },
        0.72,
      )
    }

    if (surface) {
      timeline.fromTo(
        surface,
        { rotation: 0, y: 0, svgOrigin: LIQUID_ORIGIN },
        { rotation: 9, y: 3, duration: 0.16, ease: 'power2.out', svgOrigin: LIQUID_ORIGIN },
        0.04,
      )
      timeline.to(
        surface,
        { rotation: -7, y: -2, duration: 0.24, ease: 'sine.inOut', svgOrigin: LIQUID_ORIGIN },
        0.2,
      )
      timeline.to(
        surface,
        { rotation: 0, y: 0, duration: 0.48, ease: 'power1.out', svgOrigin: LIQUID_ORIGIN },
        0.48,
      )
    }

    if (highlight) {
      timeline.fromTo(
        highlight,
        { x: -14, opacity: 0.12 },
        { x: 18, opacity: 0.42, duration: 0.5, ease: 'power1.out' },
        0.08,
      )
      timeline.to(highlight, { x: 0, opacity: 0.28, duration: 0.4, ease: 'power1.inOut' }, 0.58)
    }

    if (shine.length > 0) {
      timeline.to(shine, { opacity: 0.34, duration: 0.2, ease: 'power1.out' }, 0.06)
      timeline.to(shine, { opacity: 0.2, duration: 0.45, ease: 'power1.inOut' }, 0.5)
    }

    if (smoke && smoke.length > 0) {
      timeline.to(
        smoke,
        { opacity: 0.3, y: -10, duration: 0.85, stagger: 0.1, ease: 'power1.out' },
        0.26,
      )
    }
  }, [glassRef, reducedMotion])

  useEffect(() => {
    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  return { phase, offered, play }
}
