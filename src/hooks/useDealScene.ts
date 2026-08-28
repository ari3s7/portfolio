import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { gsap } from '@/animations/gsapSetup'

type UseDealSceneOptions = {
  glassRef: RefObject<HTMLElement | null>
  reducedMotion: boolean
  light: boolean
}

type DealPhase = 'idle' | 'playing' | 'dealt'

const SURFACE_ORIGIN = '180 186'

type SipNodes = {
  rig: HTMLElement
  sway: Element | null
  surface: Element | null
  ripples: NodeListOf<Element>
  iceA: Element | null
  iceB: Element | null
  highlight: Element | null
  shine: NodeListOf<Element>
  caustic: Element | null
  shadow: Element | null
}

function selectSip(glass: HTMLElement): SipNodes {
  return {
    rig: glass,
    sway: glass.querySelector('.deal-liquid-sway'),
    surface: glass.querySelector('.deal-liquid-surface'),
    ripples: glass.querySelectorAll('.deal-ripple'),
    iceA: glass.querySelector('.deal-ice-a'),
    iceB: glass.querySelector('.deal-ice-b'),
    highlight: glass.querySelector('.deal-highlight'),
    shine: glass.querySelectorAll('.deal-glass-shine'),
    caustic: glass.querySelector('.deal-caustic'),
    shadow: glass.querySelector('.deal-glass-shadow'),
  }
}

function poseRest(nodes: SipNodes) {
  gsap.set(nodes.rig, { rotation: 0, x: 0, y: 0 })
  gsap.set(nodes.sway, { rotation: 0, x: 0, svgOrigin: SURFACE_ORIGIN })
  gsap.set(nodes.surface, { rotation: 0, y: 0, scaleX: 1, svgOrigin: SURFACE_ORIGIN })
  gsap.set(nodes.ripples, { opacity: 0, scale: 0.3, transformOrigin: '50% 50%' })
  gsap.set(nodes.iceA, { x: 0, y: 0, rotation: 0 })
  gsap.set(nodes.iceB, { x: 0, y: 0, rotation: 0 })
  gsap.set(nodes.highlight, { x: 0, opacity: 0.42 })
  gsap.set(nodes.shine, { opacity: 0.28 })
  gsap.set(nodes.caustic, { opacity: 0.55, scale: 1 })
  gsap.set(nodes.shadow, { scale: 1, x: 0, opacity: 0.78 })
}

export function useDealScene({
  glassRef,
  reducedMotion,
  light,
}: UseDealSceneOptions): { phase: DealPhase; offered: boolean; play: () => void } {
  const [phase, setPhase] = useState<DealPhase>('idle')
  const [offered, setOffered] = useState(false)
  const phaseRef = useRef<DealPhase>('idle')
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const glass = glassRef.current
    if (!glass) return
    poseRest(selectSip(glass))
  }, [glassRef])

  const play = useCallback(() => {
    if (phaseRef.current === 'playing') return

    const glass = glassRef.current
    if (!glass) return

    const nodes = selectSip(glass)

    if (reducedMotion) {
      phaseRef.current = 'dealt'
      setPhase('dealt')
      setOffered(true)
      poseRest(nodes)
      return
    }

    phaseRef.current = 'playing'
    setPhase('playing')
    timelineRef.current?.kill()
    poseRest(nodes)

    const timeline = gsap.timeline({
      onComplete: () => {
        poseRest(nodes)
        phaseRef.current = 'dealt'
        setPhase('dealt')
        setOffered(true)
      },
    })
    timelineRef.current = timeline

    const sway = light ? 0.14 : 0.18

    timeline.to(
      nodes.rig,
      { rotation: -1.8, x: -3, y: 1, duration: 0.14, ease: 'power2.out' },
      0,
    )
    timeline.to(nodes.rig, { rotation: 1.1, x: 2, y: 0, duration: 0.2, ease: 'sine.inOut' }, 0.14)
    timeline.to(nodes.rig, { rotation: 0, x: 0, y: 0, duration: 0.38, ease: 'power2.out' }, 0.34)

    if (nodes.sway) {
      timeline.to(
        nodes.sway,
        { rotation: 5.2, x: 2, duration: sway, ease: 'power2.out', svgOrigin: SURFACE_ORIGIN },
        0.04,
      )
      timeline.to(
        nodes.sway,
        { rotation: -4.4, x: -1.6, duration: 0.26, ease: 'sine.inOut', svgOrigin: SURFACE_ORIGIN },
        0.04 + sway,
      )
      timeline.to(
        nodes.sway,
        { rotation: 2.1, x: 0.7, duration: 0.32, ease: 'sine.inOut', svgOrigin: SURFACE_ORIGIN },
        0.3 + sway,
      )
      timeline.to(
        nodes.sway,
        { rotation: 0, x: 0, duration: 0.46, ease: 'power1.out', svgOrigin: SURFACE_ORIGIN },
        0.62 + sway,
      )
    }

    if (nodes.surface) {
      timeline.to(
        nodes.surface,
        { rotation: 6, y: 2, scaleX: 1.03, duration: sway, ease: 'power2.out', svgOrigin: SURFACE_ORIGIN },
        0.04,
      )
      timeline.to(
        nodes.surface,
        { rotation: -4.5, y: -1.2, scaleX: 1.02, duration: 0.26, ease: 'sine.inOut', svgOrigin: SURFACE_ORIGIN },
        0.04 + sway,
      )
      timeline.to(
        nodes.surface,
        { rotation: 0, y: 0, scaleX: 1, duration: 0.55, ease: 'power1.out', svgOrigin: SURFACE_ORIGIN },
        0.34 + sway,
      )
    }

    if (nodes.ripples.length > 0) {
      timeline.fromTo(
        nodes.ripples,
        { scale: 0.22, opacity: 0.55 },
        {
          scale: 1.18,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power1.out',
          transformOrigin: '50% 50%',
        },
        0.06,
      )
    }

    if (nodes.iceA) {
      timeline.to(nodes.iceA, { x: 5, y: 2, rotation: -7, duration: 0.2, ease: 'power2.out' }, 0.06)
      timeline.to(nodes.iceA, { x: -3, y: -1, rotation: 4, duration: 0.28, ease: 'sine.inOut' }, 0.26)
      timeline.to(nodes.iceA, { x: 0, y: 0, rotation: 0, duration: 0.48, ease: 'power1.out' }, 0.54)
    }

    if (nodes.iceB) {
      timeline.to(nodes.iceB, { x: -4, y: 3, rotation: 8, duration: 0.22, ease: 'power2.out' }, 0.1)
      timeline.to(nodes.iceB, { x: 3, y: -1, rotation: -3, duration: 0.28, ease: 'sine.inOut' }, 0.32)
      timeline.to(nodes.iceB, { x: 0, y: 0, rotation: 0, duration: 0.46, ease: 'power1.out' }, 0.6)
    }

    if (nodes.highlight) {
      timeline.fromTo(
        nodes.highlight,
        { x: -8, opacity: 0.22 },
        { x: 10, opacity: 0.5, duration: 0.45, ease: 'power1.out' },
        0.04,
      )
      timeline.to(nodes.highlight, { x: 0, opacity: 0.42, duration: 0.4, ease: 'power1.inOut' }, 0.5)
    }

    if (nodes.shine.length > 0) {
      timeline.to(nodes.shine, { opacity: 0.38, duration: 0.18, ease: 'power1.out' }, 0.04)
      timeline.to(nodes.shine, { opacity: 0.28, duration: 0.4, ease: 'power1.inOut' }, 0.46)
    }

    if (nodes.caustic) {
      timeline.to(nodes.caustic, { scale: 1.08, opacity: 0.7, duration: 0.28, ease: 'sine.inOut' }, 0.06)
      timeline.to(nodes.caustic, { scale: 1, opacity: 0.55, duration: 0.5, ease: 'power1.out' }, 0.4)
    }

    if (nodes.shadow) {
      timeline.to(nodes.shadow, { scale: 1.06, x: -4, opacity: 0.88, duration: 0.16, ease: 'power2.out' }, 0)
      timeline.to(nodes.shadow, { scale: 1, x: 0, opacity: 0.78, duration: 0.42, ease: 'power2.out' }, 0.34)
    }
  }, [glassRef, light, reducedMotion])

  useEffect(() => {
    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  return { phase, offered, play }
}
