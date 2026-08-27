import { useRef, type KeyboardEvent, type PointerEvent } from 'react'
import { gsap } from '@/animations/gsapSetup'
import { RazorBladeMark } from '@/components/objects/RazorBladeMark'
import { cx } from '@/lib/cx'
import type { NavItem } from '@/data'
import type { SectionId } from '@/state/types'
import { useExperience } from '@/state/useExperience'

export type BladePhase = 'hidden' | 'revealing' | 'idle'

const DENSITY: Record<string, 'far' | 'mid' | 'near'> = {
  about: 'far',
  skills: 'mid',
  projects: 'mid',
  experience: 'near',
  contact: 'near',
}

type RazorBladeProps = {
  item: NavItem
  phase: BladePhase
  selected: boolean
  onSelect: (target: SectionId) => void
}

export function RazorBlade({ item, phase, selected, onSelect }: RazorBladeProps) {
  const visualRef = useRef<HTMLSpanElement>(null)
  const sheenRef = useRef<HTMLSpanElement>(null)
  const { pointerMode, prefersReducedMotion } = useExperience()
  const ready = phase === 'idle'

  const sweepSheen = () => {
    const sheen = sheenRef.current
    if (!sheen || prefersReducedMotion) return
    gsap.killTweensOf(sheen)
    gsap.fromTo(
      sheen,
      { xPercent: -70, opacity: 0.22 },
      { xPercent: 80, opacity: 0, duration: 0.55, ease: 'power1.out' },
    )
  }

  const liftVisual = (pressed: boolean) => {
    const visual = visualRef.current
    if (!visual || prefersReducedMotion) return
    gsap.killTweensOf(visual)
    gsap.to(visual, {
      y: pressed ? -5 : -3,
      rotate: pressed ? -0.8 : -1.4,
      scale: pressed ? 1.04 : 1.02,
      duration: pressed ? 0.16 : 0.18,
      ease: 'power2.out',
    })
  }

  const restVisual = () => {
    const visual = visualRef.current
    if (!visual) return
    gsap.killTweensOf(visual)
    if (prefersReducedMotion) {
      gsap.set(visual, { y: 0, rotate: 0, scale: 1 })
      return
    }
    gsap.to(visual, {
      y: selected ? -2 : 0,
      rotate: selected ? -0.6 : 0,
      scale: selected ? 1.015 : 1,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const activate = () => {
    if (!ready) return
    liftVisual(true)
    sweepSheen()
    onSelect(item.target)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    activate()
  }

  const onPointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
    if (!ready || event.pointerType !== 'mouse' || pointerMode !== 'fine') return
    liftVisual(false)
    sweepSheen()
  }

  const onPointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse') return
    restVisual()
  }

  return (
    <button
      type="button"
      className={cx('razor-blade', selected && 'is-selected')}
      data-blade={item.id}
      data-blade-state={selected ? 'selected' : phase}
      tabIndex={ready ? 0 : -1}
      aria-current={selected ? 'page' : undefined}
      aria-label={`${item.label} section`}
      disabled={!ready}
      onClick={activate}
      onKeyDown={onKeyDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={() => {
        if (ready) liftVisual(false)
      }}
      onBlur={restVisual}
    >
      <span className="razor-blade-shadow" aria-hidden="true" />
      <span className="blade-motion" aria-hidden="true" />
      <span ref={visualRef} className="razor-blade-visual">
        <RazorBladeMark density={DENSITY[item.id] ?? 'mid'} />
        <span className="razor-blade-label">{item.label}</span>
        <span ref={sheenRef} className="razor-blade-sheen" aria-hidden="true" />
      </span>
    </button>
  )
}
