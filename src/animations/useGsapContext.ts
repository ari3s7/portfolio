import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from '@/animations/gsapSetup'

export function useGsapContext(
  setup: () => void,
  scope?: RefObject<Element | null>,
): void {
  useLayoutEffect(() => {
    const ctx = gsap.context(setup, scope?.current ?? undefined)
    return () => {
      ctx.revert()
    }
  }, [setup, scope])
}
