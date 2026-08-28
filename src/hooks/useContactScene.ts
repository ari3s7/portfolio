import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { gsap } from '@/animations/gsapSetup'

type UseContactSceneOptions = {
  sectionRef: RefObject<HTMLElement | null>
  reducedMotion: boolean
}

type LetterMetrics = {
  closedY: number
  openY: number
  rise: number
}

function letterParts(section: HTMLElement) {
  return {
    flap: section.querySelector('.letter-flap'),
    sheet: section.querySelector<HTMLElement>('.letter-sheet'),
    sealButton: section.querySelector<HTMLButtonElement>('.letter-seal'),
    seal: section.querySelector('.letter-seal-art'),
    left: section.querySelector('.letter-seal-left'),
    right: section.querySelector('.letter-seal-right'),
    join: section.querySelector('.letter-seal-join'),
    face: section.querySelector('.letter-seal-face'),
    cracks: section.querySelectorAll('.letter-seal-crack'),
    lines: section.querySelectorAll('.letter-reveal'),
    firstLink: section.querySelector<HTMLAnchorElement>('.letter-link'),
  }
}

function letterMetrics(section: HTMLElement): LetterMetrics | null {
  const envelope = section.querySelector<HTMLElement>('.letter-envelope')
  const sheet = section.querySelector<HTMLElement>('.letter-sheet')
  const mouth = section.querySelector<HTMLElement>('.letter-mouth')
  if (!envelope || !sheet || !mouth) return null

  const envelopeH = envelope.getBoundingClientRect().height
  const mouthH = mouth.getBoundingClientRect().height
  const sheetH = sheet.scrollHeight
  if (envelopeH < 8 || mouthH < 8 || sheetH < 8) return null

  const pocket = Math.min(Math.max(envelopeH * 0.32, 52), envelopeH * 0.4)
  const closedY = Math.max(0, sheetH - mouthH)
  const openY = pocket - mouthH
  const rise = Math.max(0, sheetH - pocket)

  section.style.setProperty('--letter-rise', `${rise}px`)
  return { closedY, openY, rise }
}

function settleLetter(section: HTMLElement, metrics: LetterMetrics) {
  const { flap, sheet, sealButton, left, right, join, face, cracks, lines } = letterParts(section)
  gsap.set(flap, {
    rotationX: -170,
    z: 0,
    zIndex: 1,
    transformOrigin: '50% 0%',
    transformPerspective: 1400,
    force3D: true,
  })
  gsap.set(sheet, { y: metrics.openY, opacity: 1 })
  gsap.set(sealButton, { opacity: 0 })
  gsap.set(join, { opacity: 0 })
  gsap.set(left, { x: -11, rotation: -16, y: 7 })
  gsap.set(right, { x: 11, rotation: 14, y: 9 })
  gsap.set(face, { opacity: 0.35, scale: 0.92 })
  gsap.set(cracks, { opacity: 0.85 })
  gsap.set(lines, { opacity: 1, y: 0 })
}

function restClosed(section: HTMLElement, metrics: LetterMetrics) {
  const { flap, sheet, sealButton, left, right, join, face, cracks, lines } = letterParts(section)
  gsap.set(flap, {
    rotationX: 0,
    z: 8,
    zIndex: 6,
    transformOrigin: '50% 0%',
    transformPerspective: 1400,
    force3D: true,
  })
  gsap.set(sheet, { y: metrics.closedY, opacity: 1 })
  gsap.set(sealButton, { opacity: 1 })
  gsap.set(join, { opacity: 1 })
  gsap.set(left, { x: 0, y: 0, rotation: 0 })
  gsap.set(right, { x: 0, y: 0, rotation: 0 })
  gsap.set(face, { opacity: 1, scale: 1 })
  gsap.set(cracks, { opacity: 0 })
  gsap.set(lines, { opacity: 0, y: 10 })
}

export function useContactScene({
  sectionRef,
  reducedMotion,
}: UseContactSceneOptions): { opened: boolean; opening: boolean; open: () => void } {
  const [opened, setOpened] = useState(false)
  const [opening, setOpening] = useState(false)
  const openedRef = useRef(false)
  const openingRef = useRef(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const metricsRef = useRef<LetterMetrics>({ closedY: 0, openY: 0, rise: 0 })

  const measure = useCallback((): LetterMetrics | null => {
    const section = sectionRef.current
    if (!section) return null
    const metrics = letterMetrics(section)
    if (!metrics) return null
    metricsRef.current = metrics
    return metrics
  }, [sectionRef])

  const open = useCallback(() => {
    if (openedRef.current || openingRef.current) return

    const section = sectionRef.current
    if (!section) return

    const { sealButton, firstLink } = letterParts(section)
    const hadSealFocus = document.activeElement === sealButton
    const metrics = measure()
    if (!metrics) return

    if (reducedMotion) {
      openedRef.current = true
      openingRef.current = true
      settleLetter(section, metrics)
      setOpened(true)
      if (hadSealFocus) firstLink?.focus()
      return
    }

    openingRef.current = true
    setOpening(true)
  }, [measure, reducedMotion, sectionRef])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const apply = () => {
      const metrics = measure()
      if (!metrics) return
      if (openingRef.current && !openedRef.current) return
      if (openedRef.current) {
        settleLetter(section, metrics)
        return
      }
      restClosed(section, metrics)
    }

    apply()

    const observer = new ResizeObserver(apply)
    observer.observe(section)
    const envelope = section.querySelector('.letter-envelope')
    const sheet = section.querySelector('.letter-sheet')
    if (envelope) observer.observe(envelope)
    if (sheet) observer.observe(sheet)

    return () => {
      observer.disconnect()
    }
  }, [measure, sectionRef])

  useLayoutEffect(() => {
    if (!opening || openedRef.current) return

    const section = sectionRef.current
    if (!section) return

    const {
      flap,
      sheet,
      sealButton,
      seal,
      left,
      right,
      join,
      face,
      cracks,
      lines,
      firstLink,
    } = letterParts(section)
    const hadSealFocus = document.activeElement === sealButton
    const metrics = measure()
    if (!metrics || !sheet || !flap) {
      openingRef.current = false
      setOpening(false)
      return
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        openedRef.current = true
        setOpened(true)
        setOpening(false)
        if (hadSealFocus) firstLink?.focus()
      },
    })
    timelineRef.current = timeline

    timeline.fromTo(
      seal,
      { scale: 1 },
      { scale: 0.88, duration: 0.12, ease: 'power2.out' },
      0,
    )
    timeline.to(seal, { scale: 1.02, duration: 0.18, ease: 'power1.out' }, 0.12)
    timeline.to(cracks, { opacity: 0.9, duration: 0.18, ease: 'none' }, 0.12)
    timeline.to(join, { opacity: 0, duration: 0.16, ease: 'power1.out' }, 0.12)
    timeline.to(left, { x: -14, y: 8, rotation: -18, duration: 0.36, ease: 'power2.out' }, 0.14)
    timeline.to(right, { x: 14, y: 9, rotation: 16, duration: 0.36, ease: 'power2.out' }, 0.14)
    timeline.to(face, { opacity: 0.32, scale: 0.92, duration: 0.3, ease: 'power1.out' }, 0.16)
    timeline.fromTo(
      flap,
      { rotationX: 0, z: 8, zIndex: 6, transformOrigin: '50% 0%', transformPerspective: 1400, force3D: true },
      {
        rotationX: -90,
        z: 8,
        zIndex: 6,
        transformOrigin: '50% 0%',
        transformPerspective: 1400,
        force3D: true,
        duration: 0.48,
        ease: 'power2.in',
      },
      0.28,
    )
    timeline.to(
      flap,
      {
        rotationX: -170,
        z: 0,
        zIndex: 1,
        duration: 0.56,
        ease: 'power2.out',
      },
      0.76,
    )
    timeline.to(sealButton, { opacity: 0, duration: 0.32, ease: 'power1.out' }, 0.72)
    timeline.fromTo(
      sheet,
      { y: metrics.closedY, opacity: 1 },
      { y: metrics.openY, opacity: 1, duration: 1.05, ease: 'power2.inOut' },
      0.58,
    )
    timeline.fromTo(
      lines,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.48, stagger: 0.1, ease: 'power1.out' },
      1.12,
    )

    return () => {
      timeline.kill()
    }
  }, [measure, opening, sectionRef])

  useLayoutEffect(() => {
    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  return { opened, opening, open }
}
