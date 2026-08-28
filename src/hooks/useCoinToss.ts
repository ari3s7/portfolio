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

const FULL_TURNS_LIGHT = 5
const FULL_TURNS_FULL = 7

function restCoin(
  coin: HTMLElement,
  lift: HTMLElement,
  shadow: HTMLElement | null,
) {
  gsap.set(coin, { rotationY: 0, rotationX: 0, rotationZ: 0, force3D: true })
  gsap.set(lift, { y: 0, scale: 1, force3D: true })
  gsap.set(shadow, { scale: 1, y: 0, x: 0, opacity: 0.52 })
}

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
    const lift = liftRef.current
    if (!coin || !lift) return
    restCoin(coin, lift, shadowRef.current)
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
      restCoin(coin, lift, shadow)
      phaseRef.current = 'heads'
      setPhase('heads')
      return
    }

    const turns = light ? FULL_TURNS_LIGHT : FULL_TURNS_FULL
    const endY = tossesRef.current * 360 * turns
    const spin = light ? 1.7 : 2.2
    const apex = 0.4
    const landAt = light ? 1.28 : 1.68

    const timeline = gsap.timeline({
      onComplete: () => {
        restCoin(coin, lift, shadow)
        phaseRef.current = 'heads'
        setPhase('heads')
      },
    })
    timelineRef.current = timeline

    timeline.fromTo(
      lift,
      { y: 0, scale: 1 },
      { y: -62, scale: 1.06, duration: apex, ease: 'power2.out' },
      0,
    )
    timeline.to(lift, { y: 12, scale: 0.97, duration: 0.38, ease: 'power2.in' }, landAt)
    timeline.to(lift, { y: -11, scale: 1.03, duration: 0.16, ease: 'power2.out' })
    timeline.to(lift, { y: 5, scale: 0.992, duration: 0.12, ease: 'power1.in' })
    timeline.to(lift, { y: 0, scale: 1, duration: 0.2, ease: 'power1.out' })

    timeline.fromTo(
      coin,
      { rotationY: 0 },
      {
        rotationY: endY,
        duration: spin,
        ease: 'power3.inOut',
        force3D: true,
        overwrite: false,
      },
      0,
    )
    timeline.to(
      coin,
      { rotationX: 18, rotationZ: 12, duration: spin * 0.38, ease: 'sine.inOut', overwrite: false },
      0,
    )
    timeline.to(
      coin,
      { rotationX: -8, rotationZ: -7, duration: spin * 0.32, ease: 'sine.inOut', overwrite: false },
      spin * 0.38,
    )
    timeline.to(
      coin,
      { rotationX: 0, rotationZ: 0, duration: spin * 0.3, ease: 'power2.out', overwrite: false },
      spin * 0.7,
    )

    if (shadow) {
      timeline.fromTo(
        shadow,
        { scale: 1, y: 0, x: 0, opacity: 0.52 },
        { scale: 0.52, y: 16, x: 8, opacity: 0.2, duration: apex, ease: 'power2.out' },
        0,
      )
      timeline.to(
        shadow,
        { scale: 1.1, y: 2, x: 0, opacity: 0.6, duration: 0.38, ease: 'power2.in' },
        landAt,
      )
      timeline.to(shadow, { scale: 0.96, y: 0, opacity: 0.48, duration: 0.16, ease: 'power2.out' })
      timeline.to(shadow, { scale: 1, opacity: 0.52, duration: 0.22, ease: 'power1.out' })
    }
  }, [coinRef, liftRef, light, reducedMotion, shadowRef])

  useEffect(() => {
    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  return { phase, toss }
}
