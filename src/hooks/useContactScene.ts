import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { gsap } from '@/animations/gsapSetup'

type UseContactSceneOptions = {
  sectionRef: RefObject<HTMLElement | null>
  reducedMotion: boolean
}

function letterParts(section: HTMLElement) {
  return {
    flap: section.querySelector('.letter-flap'),
    sheet: section.querySelector('.letter-sheet'),
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

function settleLetter(section: HTMLElement) {
  const { flap, sheet, sealButton, left, right, join, face, cracks, lines } = letterParts(section)
  gsap.set(flap, { scaleY: -1, y: 0, transformOrigin: '50% 0%' })
  gsap.set(sheet, { yPercent: -52, opacity: 1 })
  gsap.set(sealButton, { opacity: 0 })
  gsap.set(join, { opacity: 0 })
  gsap.set(left, { x: -11, rotation: -16, y: 7 })
  gsap.set(right, { x: 11, rotation: 14, y: 9 })
  gsap.set(face, { opacity: 0.35, scale: 0.92 })
  gsap.set(cracks, { opacity: 0.85 })
  gsap.set(lines, { opacity: 1, y: 0 })
}

export function useContactScene({
  sectionRef,
  reducedMotion,
}: UseContactSceneOptions): { opened: boolean; opening: boolean; open: () => void } {
  const [opened, setOpened] = useState(false)
  const [opening, setOpening] = useState(false)
  const openedRef = useRef(false)
  const openingRef = useRef(false)
  const playedRef = useRef(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const open = useCallback(() => {
    if (openedRef.current || openingRef.current) return

    const section = sectionRef.current
    if (!section) return

    const { sealButton, firstLink } = letterParts(section)
    const hadSealFocus = document.activeElement === sealButton

    if (reducedMotion) {
      openedRef.current = true
      openingRef.current = true
      playedRef.current = true
      settleLetter(section)
      setOpened(true)
      if (hadSealFocus) firstLink?.focus()
      return
    }

    openingRef.current = true
    setOpening(true)
  }, [reducedMotion, sectionRef])

  useLayoutEffect(() => {
    if (!opening || playedRef.current) return

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

    playedRef.current = true

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
      { scale: 0.9, duration: 0.1, ease: 'power2.out' },
      0,
    )
    timeline.to(seal, { scale: 1, duration: 0.16, ease: 'power1.out' }, 0.1)
    timeline.to(cracks, { opacity: 0.9, duration: 0.16, ease: 'none' }, 0.1)
    timeline.to(join, { opacity: 0, duration: 0.14, ease: 'power1.out' }, 0.1)
    timeline.to(left, { x: -14, y: 8, rotation: -18, duration: 0.32, ease: 'power2.out' }, 0.12)
    timeline.to(right, { x: 14, y: 9, rotation: 16, duration: 0.32, ease: 'power2.out' }, 0.12)
    timeline.to(face, { opacity: 0.32, scale: 0.92, duration: 0.28, ease: 'power1.out' }, 0.14)
    timeline.fromTo(
      flap,
      { scaleY: 1, y: 0, transformOrigin: '50% 0%' },
      { scaleY: -1, y: 0, transformOrigin: '50% 0%', duration: 0.9, ease: 'power2.inOut' },
      0.28,
    )
    timeline.to(sealButton, { opacity: 0, duration: 0.28, ease: 'power1.out' }, 0.42)
    timeline.fromTo(
      sheet,
      { yPercent: 10, opacity: 0.15 },
      { yPercent: -52, opacity: 1, duration: 0.85, ease: 'power2.out' },
      0.52,
    )
    timeline.fromTo(
      lines,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.42, stagger: 0.1, ease: 'power1.out' },
      0.88,
    )

    return () => {
      timeline.kill()
    }
  }, [opening, sectionRef])

  useLayoutEffect(() => {
    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  return { opened, opening, open }
}
