import { useLayoutEffect, useRef, type RefObject } from 'react'
import { gsap, ScrollTrigger } from '@/animations/gsapSetup'
import { timelineAngles } from '@/lib/timelineAngles'

type UseWatchSceneOptions = {
  sectionRef: RefObject<HTMLElement | null>
  count: number
  reducedMotion: boolean
  light: boolean
}

const LID_OPEN = -168
const LID_ORIGIN = '210 144'
const HAND_ORIGIN = '210 292'
const GEAR_A_ORIGIN = '132 400'
const GEAR_B_ORIGIN = '178 422'

export function useWatchScene({
  sectionRef,
  count,
  reducedMotion,
  light,
}: UseWatchSceneOptions): void {
  const playedRef = useRef(false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const lid = section.querySelector('.watch-lid')
    const hour = section.querySelector('.watch-hand-hour')
    const minute = section.querySelector('.watch-hand-minute')
    const gearA = section.querySelector('.watch-gear-a')
    const gearB = section.querySelector('.watch-gear-b')
    const entries = [...section.querySelectorAll<HTMLElement>('.watch-entry')]
    const angles = timelineAngles(count)
    const last = angles[angles.length - 1] ?? 0

    const settle = () => {
      gsap.set(lid, { rotation: LID_OPEN, svgOrigin: LID_ORIGIN })
      gsap.set(hour, { rotation: last * 0.35, svgOrigin: HAND_ORIGIN })
      gsap.set(minute, { rotation: last, svgOrigin: HAND_ORIGIN })
      gsap.set(entries, { opacity: 1, y: 0, filter: 'none' })
      entries.forEach((entry) => entry.classList.add('is-marked'))
    }

    const ctx = gsap.context(() => {
      if (reducedMotion || playedRef.current) {
        settle()
        playedRef.current = true
        return
      }

      gsap.set(lid, { rotation: 0, svgOrigin: LID_ORIGIN })
      gsap.set(hour, { rotation: -48, svgOrigin: HAND_ORIGIN })
      gsap.set(minute, { rotation: -48, svgOrigin: HAND_ORIGIN })
      gsap.set(gearA, { rotation: 0, svgOrigin: GEAR_A_ORIGIN })
      gsap.set(gearB, { rotation: 0, svgOrigin: GEAR_B_ORIGIN })
      gsap.set(entries, { opacity: 0.88, y: 6 })

      const spinA = gsap.to(gearA, {
        paused: true,
        rotation: 360,
        duration: 28,
        ease: 'none',
        repeat: -1,
        svgOrigin: GEAR_A_ORIGIN,
      })
      const spinB = gsap.to(gearB, {
        paused: true,
        rotation: -360,
        duration: 19,
        ease: 'none',
        repeat: -1,
        svgOrigin: GEAR_B_ORIGIN,
      })

      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          playedRef.current = true
          if (light) return
          gsap.to(minute, {
            rotation: last + 1.6,
            duration: 0.06,
            ease: 'power1.out',
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.94,
            svgOrigin: HAND_ORIGIN,
          })
        },
      })

      timeline.to(
        lid,
        { rotation: LID_OPEN, duration: 1.15, ease: 'power2.inOut', svgOrigin: LID_ORIGIN },
        0,
      )

      angles.forEach((angle, index) => {
        const at = 0.85 + index * 0.72
        timeline.to(
          minute,
          { rotation: angle, duration: 0.7, ease: 'power1.inOut', svgOrigin: HAND_ORIGIN },
          at,
        )
        timeline.to(
          hour,
          { rotation: angle * 0.35, duration: 0.7, ease: 'power1.inOut', svgOrigin: HAND_ORIGIN },
          at,
        )
        const entry = entries[index]
        if (entry) {
          timeline.to(
            entry,
            { opacity: 1, y: 0, duration: 0.45, ease: 'power1.out' },
            at + 0.1,
          )
          timeline.add(() => entry.classList.add('is-marked'), at + 0.1)
        }
      })

      const play = () => {
        if (playedRef.current || timeline.isActive()) return
        playedRef.current = true
        timeline.play()
        if (!light) {
          spinA.play()
          spinB.play()
        }
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top 74%',
        once: true,
        onEnter: play,
      })

      if (section.getBoundingClientRect().top < window.innerHeight * 0.74) {
        play()
      }
    }, section)

    return () => {
      ctx.revert()
    }
  }, [count, light, reducedMotion, sectionRef])
}
