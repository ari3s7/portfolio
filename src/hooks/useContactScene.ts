import { useLayoutEffect, useRef, type RefObject } from 'react'
import { gsap, ScrollTrigger } from '@/animations/gsapSetup'

type UseContactSceneOptions = {
  sectionRef: RefObject<HTMLElement | null>
  reducedMotion: boolean
  light: boolean
}

export function useContactScene({
  sectionRef,
  reducedMotion,
  light,
}: UseContactSceneOptions): void {
  const playedRef = useRef(false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const art = section.querySelector('.finale-art')
    const copyBlock = section.querySelector('.finale-copy')
    const wisps = section.querySelectorAll('.finale-wisp')

    const settle = () => {
      gsap.set([art, copyBlock], { opacity: 1, y: 0 })
      gsap.set(wisps, { opacity: 0.28, x: 0, y: 0 })
    }

    const ctx = gsap.context(() => {
      if (reducedMotion || playedRef.current) {
        settle()
        playedRef.current = true
        return
      }

      gsap.set(art, { opacity: 0.55, y: 22 })
      gsap.set(copyBlock, { opacity: 0.9, y: 10 })
      gsap.set(wisps, { opacity: 0.12, y: 8 })

      const timeline = gsap.timeline({ paused: true })
      timeline.to(art, { opacity: 1, y: 0, duration: 1.15, ease: 'power2.out' }, 0)
      timeline.to(copyBlock, { opacity: 1, y: 0, duration: 0.7, ease: 'power1.out' }, 0.28)
      timeline.to(wisps, { opacity: 0.3, y: 0, duration: 1.1, ease: 'power1.out' }, 0.2)

      const play = () => {
        if (playedRef.current || timeline.isActive()) return
        playedRef.current = true
        timeline.play()
        if (!light) {
          gsap.to(wisps, {
            y: -10,
            x: 4,
            duration: 16,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        }
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top 78%',
        once: true,
        onEnter: play,
      })

      if (section.getBoundingClientRect().top < window.innerHeight * 0.78) {
        play()
      }
    }, section)

    return () => {
      ctx.revert()
    }
  }, [light, reducedMotion, sectionRef])
}
