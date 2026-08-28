import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { gsap } from '@/animations/gsapSetup'

type UseCoinTossOptions = {
  coinRef: RefObject<HTMLElement | null>
  liftRef: RefObject<HTMLElement | null>
  shadowRef: RefObject<HTMLElement | null>
  reducedMotion: boolean
  light: boolean
}

type CoinPhase = 'idle' | 'tossing' | 'heads'

const FULL_TURNS_LIGHT = 4
const FULL_TURNS_FULL = 6

export function useCoinToss({
  coinRef,
  liftRef,
  shadowRef,
  reducedMotion,
  light,
}: UseCoinTossOptions): { phase: CoinPhase; toss: () => void } {
  const [phase, setPhase] = useState<CoinPhase>('idle')
  const phaseRef = useRef<CoinPhase>('idle')
  const tossesRef = useRef(0)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const coin = coinRef.current
    if (coin) gsap.set(coin, { rotationY: 0, force3D: true })
    if (liftRef.current) gsap.set(liftRef.current, { y: 0, scale: 1, force3D: true })
    if (shadowRef.current) gsap.set(shadowRef.current, { scale: 1, opacity: 0.52 })
  }, [coinRef, liftRef, shadowRef])

  const toss = useCallback(() => {
    if (phaseRef.current === 'tossing') return

    const coin = coinRef.current
    const lift = liftRef.current
    const shadow = shadowRef.current
    if (!coin || !lift) return

    phaseRef.current = 'tossing'
    setPhase('tossing')
    tossesRef.current += 1

    timelineRef.current?.kill()

    if (reducedMotion) {
      gsap.set(coin, { rotationY: 0 })
      gsap.set(lift, { y: 0, scale: 1 })
      gsap.set(shadow, { scale: 1, opacity: 0.5 })
      phaseRef.current = 'heads'
      setPhase('heads')
      return
    }

    const turns = light ? FULL_TURNS_LIGHT : FULL_TURNS_FULL
    const endY = tossesRef.current * 360 * turns
    const spin = light ? 1.35 : 1.7
    const landAt = light ? 1.05 : 1.32

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(coin, { rotationY: 0 })
        gsap.set(lift, { y: 0, scale: 1 })
        phaseRef.current = 'heads'
        setPhase('heads')
      },
    })
    timelineRef.current = timeline

    timeline.to(lift, { y: -36, scale: 1.04, duration: 0.32, ease: 'power2.out' }, 0)
    timeline.to(
      coin,
      { rotationY: endY, duration: spin, ease: 'power3.inOut' },
      0,
    )
    if (shadow) {
      timeline.to(
        shadow,
        { scale: 0.68, opacity: 0.28, duration: 0.32, ease: 'power2.out' },
        0,
      )
    }
    timeline.to(lift, { y: 0, scale: 1, duration: 0.48, ease: 'power2.out' }, landAt)
    if (shadow) {
      timeline.to(
        shadow,
        { scale: 1, opacity: 0.52, duration: 0.48, ease: 'power2.out' },
        landAt,
      )
    }
  }, [coinRef, liftRef, light, reducedMotion, shadowRef])

  useEffect(() => {
    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  return { phase, toss }
}
