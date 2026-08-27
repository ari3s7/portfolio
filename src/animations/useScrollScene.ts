import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '@/animations/gsapSetup'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type ScrollSceneFactory = (
  motion: typeof gsap,
  trigger: typeof ScrollTrigger,
) => void

export function useScrollScene(factory: ScrollSceneFactory): void {
  const prefersReducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      factory(gsap, ScrollTrigger)
    })

    return () => {
      ctx.revert()
    }
  }, [factory, prefersReducedMotion])
}
