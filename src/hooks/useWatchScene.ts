import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { gsap } from '@/animations/gsapSetup'
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

const ENTRY_HIDDEN = {
  opacity: 0,
  y: 28,
  rotateX: -72,
  scaleY: 0.82,
  transformOrigin: '50% 0%',
  transformPerspective: 920,
  filter: 'none',
} as const

export function useWatchScene({
  sectionRef,
  count,
  reducedMotion,
  light,
}: UseWatchSceneOptions): { opened: boolean; open: () => void } {
  const openedRef = useRef(reducedMotion)
  const playRef = useRef<() => void>(() => {})
  const [opened, setOpened] = useState(reducedMotion)

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
      gsap.set(entries, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scaleY: 1,
        filter: 'none',
      })
      entries.forEach((entry) => entry.classList.add('is-marked'))
    }

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
    let tick: gsap.core.Tween | null = null
    const loopsVisible = { current: true }

    const setLoops = (on: boolean) => {
      loopsVisible.current = on
      if (on) {
        spinA.play()
        spinB.play()
        tick?.play()
      } else {
        spinA.pause()
        spinB.pause()
        tick?.pause()
      }
    }

    const ctx = gsap.context(() => {
      if (reducedMotion || openedRef.current) {
        settle()
        playRef.current = () => undefined
        if (!reducedMotion && !light) setLoops(true)
        return
      }

      gsap.set(lid, { rotation: 0, svgOrigin: LID_ORIGIN })
      gsap.set(hour, { rotation: -48, svgOrigin: HAND_ORIGIN })
      gsap.set(minute, { rotation: -48, svgOrigin: HAND_ORIGIN })
      gsap.set(gearA, { rotation: 0, svgOrigin: GEAR_A_ORIGIN })
      gsap.set(gearB, { rotation: 0, svgOrigin: GEAR_B_ORIGIN })
      gsap.set(entries, ENTRY_HIDDEN)

      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (light) return
          tick = gsap.to(minute, {
            rotation: last + 1.6,
            duration: 0.06,
            ease: 'power1.out',
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.94,
            svgOrigin: HAND_ORIGIN,
          })
          if (!loopsVisible.current) tick.pause()
        },
      })

      timeline.to(
        lid,
        { rotation: LID_OPEN, duration: 1.12, ease: 'power2.inOut', svgOrigin: LID_ORIGIN },
        0,
      )
      timeline.to(
        minute,
        { rotation: last, duration: 0.72, ease: 'power1.inOut', svgOrigin: HAND_ORIGIN },
        0.68,
      )
      timeline.to(
        hour,
        { rotation: last * 0.35, duration: 0.72, ease: 'power1.inOut', svgOrigin: HAND_ORIGIN },
        0.68,
      )

      entries.forEach((entry, index) => {
        const at = 1.2 + index * 0.24
        timeline.to(
          entry,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scaleY: 1,
            duration: 0.62,
            ease: 'power2.out',
          },
          at,
        )
        timeline.add(() => entry.classList.add('is-marked'), at + 0.08)
      })

      playRef.current = () => {
        if (timeline.isActive() || timeline.progress() > 0) return
        timeline.play()
        if (!light && loopsVisible.current) {
          spinA.play()
          spinB.play()
        }
      }
    }, section)

    const io = new IntersectionObserver(
      (records) => {
        const on = records.some((record) => record.isIntersecting)
        if (!openedRef.current || reducedMotion || light) {
          loopsVisible.current = on
          return
        }
        setLoops(on)
      },
      { rootMargin: '24% 0px' },
    )
    io.observe(section)

    return () => {
      io.disconnect()
      tick?.kill()
      spinA.kill()
      spinB.kill()
      ctx.revert()
    }
  }, [count, light, reducedMotion, sectionRef])

  useLayoutEffect(() => {
    if (!opened || reducedMotion) return
    playRef.current()
  }, [opened, reducedMotion])

  const open = useCallback(() => {
    if (openedRef.current) return
    openedRef.current = true
    setOpened(true)
  }, [])

  return { opened, open }
}
