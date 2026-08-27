import { useLayoutEffect, useRef, type RefObject } from 'react'
import { gsap, ScrollTrigger } from '@/animations/gsapSetup'
import { onResize } from '@/lib/onResize'

type Pose = {
  x: number
  y: number
  rotate: number
}

type UseSkillDealOptions = {
  sectionRef: RefObject<HTMLElement | null>
  selectedId: string | null
  reducedMotion: boolean
}

function posesFor(count: number, width: number): Pose[] {
  if (count <= 0) return []

  const mobile = width < 768
  const tablet = width < 1024
  const maxOffset = Math.min(
    mobile ? 64 : tablet ? 108 : 150,
    Math.max(24, width * 0.5 - 110),
  )
  const angle = mobile ? 7 : tablet ? 11 : 15
  const drop = mobile ? 10 : 16

  return Array.from({ length: count }, (_, index) => {
    const t = count === 1 ? 0 : index / (count - 1) - 0.5
    const twoRow = tablet && !mobile && count >= 4
    if (twoRow) {
      const columns = Math.ceil(count / 2)
      const row = index % 2
      const col = Math.floor(index / 2)
      const ct = columns === 1 ? 0 : col / (columns - 1) - 0.5
      return {
        x: ct * maxOffset * 1.6,
        y: (row - 0.5) * 118,
        rotate: ct * angle * 0.45,
      }
    }
    return {
      x: t * maxOffset * 2,
      y: Math.abs(t) * drop,
      rotate: t * angle * 2,
    }
  })
}

export function useSkillDeal({
  sectionRef,
  selectedId,
  reducedMotion,
}: UseSkillDealOptions): void {
  const selectedRef = useRef(selectedId)
  const dealtRef = useRef(reducedMotion)

  useLayoutEffect(() => {
    selectedRef.current = selectedId
  }, [selectedId])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = [...section.querySelectorAll<HTMLElement>('.skill-card')]
    if (cards.length === 0) return

    const place = (animate: boolean) => {
      const current = selectedRef.current
      const poses = posesFor(cards.length, section.clientWidth)
      const compact = section.clientWidth < 768

      cards.forEach((card, index) => {
        const pose = poses[index] ?? { x: 0, y: 0, rotate: 0 }
        const selected = card.dataset.skill === current
        const next = {
          xPercent: -50,
          yPercent: -50,
          x: pose.x,
          y: selected ? pose.y - (compact ? 10 : 18) : pose.y + (current ? 8 : 0),
          rotate: selected ? 0 : pose.rotate,
          scale: selected ? (compact ? 1.04 : 1.08) : current ? 0.96 : 1,
          zIndex: selected ? 20 : index + 1,
          opacity: current && !selected ? 0.78 : 1,
        }

        if (animate && !reducedMotion) {
          gsap.to(card, { ...next, duration: 0.34, ease: 'power2.out', overwrite: 'auto' })
        } else {
          gsap.set(card, next)
        }
      })
    }

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        dealtRef.current = true
        place(false)
        return
      }

      dealtRef.current = false
      cards.forEach((card, index) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          rotate: -3 + index * 0.5,
          scale: 1,
          zIndex: cards.length - index,
          opacity: 1,
        })
      })

      const deal = gsap.timeline({
        paused: true,
        onComplete: () => {
          dealtRef.current = true
          place(true)
        },
      })

      const poses = posesFor(cards.length, section.clientWidth)
      cards.forEach((card, index) => {
        const pose = poses[index] ?? { x: 0, y: 0, rotate: 0 }
        deal.to(
          card,
          {
            xPercent: -50,
            yPercent: -50,
            x: pose.x,
            y: pose.y,
            rotate: pose.rotate,
            zIndex: index + 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          index * 0.1,
        )
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top 76%',
        once: true,
        onEnter: () => deal.play(),
      })

      if (section.getBoundingClientRect().top < window.innerHeight * 0.76) {
        deal.play()
      }
    }, section)

    const stopResize = onResize(() => {
      if (dealtRef.current) place(false)
    })

    return () => {
      stopResize()
      ctx.revert()
    }
  }, [reducedMotion, sectionRef])

  useLayoutEffect(() => {
    if (!dealtRef.current) return
    const section = sectionRef.current
    if (!section) return
    const cards = [...section.querySelectorAll<HTMLElement>('.skill-card')]
    const poses = posesFor(cards.length, section.clientWidth)
    const compact = section.clientWidth < 768

    cards.forEach((card, index) => {
      const pose = poses[index] ?? { x: 0, y: 0, rotate: 0 }
      const selected = card.dataset.skill === selectedId
      const next = {
        xPercent: -50,
        yPercent: -50,
        x: pose.x,
        y: selected ? pose.y - (compact ? 10 : 18) : pose.y + (selectedId ? 8 : 0),
        rotate: selected ? 0 : pose.rotate,
        scale: selected ? (compact ? 1.04 : 1.08) : selectedId ? 0.96 : 1,
        zIndex: selected ? 20 : index + 1,
        opacity: selectedId && !selected ? 0.78 : 1,
      }
      if (reducedMotion) gsap.set(card, next)
      else gsap.to(card, { ...next, duration: 0.34, ease: 'power2.out', overwrite: 'auto' })
    })

    return () => {
      cards.forEach((card) => gsap.killTweensOf(card))
    }
  }, [reducedMotion, sectionRef, selectedId])
}
