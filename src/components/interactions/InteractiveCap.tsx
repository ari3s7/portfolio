import { useEffect, useRef, type KeyboardEvent } from 'react'
import { gsap } from '@/animations/gsapSetup'
import { FlatCap } from '@/components/objects/FlatCap'
import { copy } from '@/data'
import { useExperience } from '@/state/useExperience'

export function InteractiveCap() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const motionRef = useRef<gsap.core.Timeline | null>(null)
  const { hasEntered, setHasEntered, prefersReducedMotion } = useExperience()

  useEffect(() => {
    return () => {
      motionRef.current?.kill()
    }
  }, [])

  const activate = () => {
    if (!hasEntered) setHasEntered(true)

    const cap = buttonRef.current
    if (!cap || prefersReducedMotion) return

    motionRef.current?.kill()
    motionRef.current = gsap
      .timeline()
      .to(cap, {
        rotateZ: -4.2,
        y: -5,
        duration: 0.2,
        ease: 'power2.out',
      })
      .to(cap, {
        rotateZ: 0,
        y: 0,
        duration: 0.42,
        ease: 'power2.inOut',
      })
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    activate()
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className="cap-trigger"
      aria-label={`${copy.enter}. ${copy.capHint}`}
      aria-pressed={hasEntered}
      tabIndex={hasEntered ? -1 : 0}
      onClick={activate}
      onKeyDown={onKeyDown}
    >
      <span className="cap-ambient-shadow" aria-hidden="true" />
      <span className="cap-contact-shadow" aria-hidden="true" />
      <span className="cap-brim-shadow" aria-hidden="true" />
      <FlatCap />
    </button>
  )
}
