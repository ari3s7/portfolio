import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '@/animations/gsapSetup'
import { RazorBlade, type BladePhase } from '@/components/interactions/RazorBlade'
import { navigation } from '@/data'
import { getBladePose, isStackedBladeLayout } from '@/lib/bladeLayout'
import { goToSection } from '@/lib/goToSection'
import { onResize } from '@/lib/onResize'
import type { SectionId } from '@/state/types'
import { useExperience } from '@/state/useExperience'

function poseVars(index: number, width: number, stacked: boolean) {
  const pose = getBladePose(index, width)
  return {
    xPercent: stacked ? 0 : -50,
    yPercent: stacked ? 0 : -50,
    x: pose.x,
    y: pose.y,
    rotation: pose.rotation,
    rotationX: pose.rotationX,
    skewX: pose.skewX,
    scale: pose.scale,
    opacity: 1,
    transformPerspective: 820,
    transformOrigin: '50% 50%',
  }
}

export function BladeNav() {
  const orbitRef = useRef<HTMLElement>(null)
  const {
    hasEntered,
    bladesRevealed,
    setBladesRevealed,
    activeSection,
    setActiveSection,
    prefersReducedMotion,
  } = useExperience()

  const applyPoses = useCallback(
    (animate: boolean) => {
      const orbit = orbitRef.current
      if (!orbit) return

      const blades = orbit.querySelectorAll<HTMLElement>('.razor-blade')
      const width = window.innerWidth
      const stacked = isStackedBladeLayout(width)

      blades.forEach((blade, index) => {
        const next = poseVars(index, width, stacked)
        if (animate && !prefersReducedMotion) {
          gsap.to(blade, { ...next, duration: 0.32, ease: 'power2.out' })
        } else {
          gsap.set(blade, next)
        }
      })
    },
    [prefersReducedMotion],
  )

  useLayoutEffect(() => {
    const orbit = orbitRef.current
    if (!orbit || !hasEntered) return

    const blades = orbit.querySelectorAll<HTMLElement>('.razor-blade')
    const hint = document.querySelector('.hero-hint')
    const title = document.querySelector('.hero-enter')
    const width = window.innerWidth
    const stacked = isStackedBladeLayout(width)

    const ctx = gsap.context(() => {
      gsap.to(hint, { opacity: 0, duration: 0.24, overwrite: 'auto' })
      gsap.to(title, { opacity: 0, duration: 0.32, overwrite: 'auto' })

      if (prefersReducedMotion) {
        applyPoses(false)
        setBladesRevealed(true)
        return
      }

      blades.forEach((blade, index) => {
        const fromX = stacked ? 0 : getBladePose(index, width).x * 0.12
        gsap.set(blade, {
          xPercent: stacked ? 0 : -50,
          yPercent: stacked ? 0 : -50,
          x: fromX,
          y: stacked ? -28 : 8,
          rotation: stacked ? 4 : 8,
          rotationX: stacked ? 2 : 4,
          skewX: stacked ? 0 : 1.2,
          scale: stacked ? 0.94 : 0.78,
          opacity: 0,
          transformPerspective: 820,
          transformOrigin: '50% 50%',
        })
        gsap.set(blade.querySelectorAll('.blade-ink-sketch'), { opacity: 0 })
        gsap.set(blade.querySelectorAll('.blade-ink-outline, .blade-ink-cut'), {
          strokeDasharray: 1,
          strokeDashoffset: 1,
        })
        gsap.set(
          blade.querySelectorAll(
            '.blade-ink-fill, .blade-ink-hatch, .blade-ink-stipple, .razor-blade-label',
          ),
          { opacity: 0 },
        )
      })

      const timeline = gsap.timeline({
        delay: 0.4,
        onComplete: () => setBladesRevealed(true),
      })

      blades.forEach((blade, index) => {
        const pose = getBladePose(index, width)
        const start = index * 0.14
        const outlines = blade.querySelectorAll('.blade-ink-outline, .blade-ink-cut')
        const sketch = blade.querySelectorAll('.blade-ink-sketch')
        const fill = blade.querySelectorAll('.blade-ink-fill, .blade-ink-stipple')
        const hatch = blade.querySelectorAll('.blade-ink-hatch')
        const label = blade.querySelector('.razor-blade-label')
        const motion = blade.querySelector('.blade-motion')
        const shadow = blade.querySelector('.razor-blade-shadow')

        timeline.to(blade, { opacity: 1, duration: 0.08 }, start)
        timeline.to(sketch, { opacity: 0.35, duration: 0.1 }, start)
        timeline.to(
          outlines,
          { strokeDashoffset: 0, duration: 0.22, ease: 'power1.out' },
          start + 0.04,
        )
        timeline.to(fill, { opacity: 1, duration: 0.14 }, start + 0.16)
        timeline.to(hatch, { opacity: 0.32, duration: 0.14 }, start + 0.18)
        timeline.to(label, { opacity: 1, duration: 0.12 }, start + 0.22)
        timeline.to(sketch, { opacity: 0, duration: 0.16 }, start + 0.24)
        if (motion) {
          timeline.fromTo(
            motion,
            { opacity: 0.35, x: -6 },
            { opacity: 0, x: 10, duration: 0.2, ease: 'power1.out' },
            start + 0.18,
          )
        }
        if (shadow) {
          timeline.fromTo(
            shadow,
            { opacity: 0, scaleY: 0.2 },
            { opacity: 1, scaleY: 0.35, duration: 0.22, ease: 'power1.out' },
            start + 0.28,
          )
        }
        timeline.to(
          blade,
          {
            x: pose.x,
            y: pose.y - (stacked ? 0 : 5),
            rotation: pose.rotation + 1.8,
            rotationX: pose.rotationX,
            skewX: pose.skewX,
            scale: pose.scale * 1.02,
            duration: 0.34,
            ease: 'power3.out',
          },
          start + 0.2,
        )
        timeline.to(
          blade,
          {
            y: pose.y,
            rotation: pose.rotation,
            scale: pose.scale,
            duration: 0.18,
            ease: 'power2.out',
          },
          start + 0.5,
        )
      })
    }, orbit)

    return () => {
      ctx.revert()
    }
  }, [applyPoses, hasEntered, prefersReducedMotion, setBladesRevealed])

  useEffect(() => {
    if (!bladesRevealed) return

    return onResize(() => applyPoses(false))
  }, [applyPoses, bladesRevealed])

  const onSelect = (target: SectionId) => {
    goToSection(target, { prefersReducedMotion, setActiveSection })
  }

  const phase: BladePhase = !hasEntered
    ? 'hidden'
    : bladesRevealed
      ? 'idle'
      : 'revealing'

  return (
    <nav
      ref={orbitRef}
      className="blade-orbit"
      aria-label="Portfolio sections"
      hidden={!hasEntered}
    >
      {navigation.map((item) => (
        <RazorBlade
          key={item.id}
          item={item}
          phase={phase}
          selected={activeSection === item.id}
          onSelect={onSelect}
        />
      ))}
    </nav>
  )
}
