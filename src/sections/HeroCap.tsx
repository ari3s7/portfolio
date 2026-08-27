import { useCallback, useRef } from 'react'
import { gsap } from '@/animations/gsapSetup'
import { useGsapContext } from '@/animations/useGsapContext'
import { Dust } from '@/components/atmosphere/Dust'
import { Fog } from '@/components/atmosphere/Fog'
import { Spotlight } from '@/components/atmosphere/Spotlight'
import { BladeNav } from '@/components/interactions/BladeNav'
import { InteractiveCap } from '@/components/interactions/InteractiveCap'
import { PendantLamp } from '@/components/objects/PendantLamp'
import { copy, personal } from '@/data'
import { usePointerParallax } from '@/hooks/usePointerParallax'
import { cx } from '@/lib/cx'
import { useExperience } from '@/state/useExperience'

export function HeroCap() {
  const sceneRef = useRef<HTMLElement>(null)
  const { hasEntered, pointerMode, prefersReducedMotion } = useExperience()

  usePointerParallax(
    sceneRef,
    pointerMode === 'fine' && !prefersReducedMotion,
  )

  const playIntro = useCallback(() => {
    const scene = sceneRef.current
    if (!scene) return

    const blackout = scene.querySelector('.hero-blackout')
    const environment = scene.querySelectorAll(
      '.hero-bg, .hero-room, .hero-print, .hero-mast, .hero-lamp',
    )
    const table = scene.querySelector('.hero-table-reveal')
    const spotlight = scene.querySelector('.hero-spotlight')
    const cap = scene.querySelector('.hero-cap-reveal')
    const sketch = scene.querySelector('.cap-sketch')
    const outlines = scene.querySelectorAll('.cap-outline path')
    const hatch = scene.querySelector('.cap-hatch')
    const fill = scene.querySelector('.cap-fill')
    const detail = scene.querySelector('.cap-detail')
    const title = scene.querySelectorAll('.hero-kicker, .hero-enter')
    const hint = scene.querySelector('.hero-hint')

    if (prefersReducedMotion) {
      gsap.set(
        [environment, table, spotlight, cap, sketch, hatch, fill, detail, title, hint],
        { opacity: 1, y: 0, scale: 1 },
      )
      gsap.set(outlines, { strokeDasharray: 1, strokeDashoffset: 0 })
      gsap.set(blackout, { autoAlpha: 0 })
      return
    }

    gsap.set(blackout, { autoAlpha: 1 })
    gsap.set(environment, { opacity: 0 })
    gsap.set(table, { opacity: 0, y: 12 })
    gsap.set(spotlight, { opacity: 0 })
    gsap.set(cap, { opacity: 1, y: 0 })
    gsap.set(sketch, { opacity: 0 })
    gsap.set(outlines, { strokeDasharray: 1, strokeDashoffset: 1 })
    gsap.set([hatch, fill, detail], { opacity: 0 })
    gsap.set(title, { opacity: 0, y: 8 })
    gsap.set(hint, { opacity: 0, y: 6 })

    gsap
      .timeline()
      .to(blackout, { autoAlpha: 0, duration: 0.38, ease: 'power2.out' })
      .to(environment, { opacity: 1, duration: 0.42, ease: 'power1.out' }, '-=0.18')
      .to(table, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.22')
      .to(spotlight, { opacity: 1, duration: 0.45, ease: 'power1.out' }, '-=0.28')
      .to(sketch, { opacity: 0.55, duration: 0.16 }, '-=0.12')
      .to(
        outlines,
        {
          strokeDashoffset: 0,
          duration: 0.48,
          stagger: 0.04,
          ease: 'power1.inOut',
        },
        '-=0.04',
      )
      .to(fill, { opacity: 1, duration: 0.18 }, '-=0.12')
      .to(hatch, { opacity: 1, duration: 0.2 }, '-=0.08')
      .to(detail, { opacity: 1, duration: 0.16 }, '-=0.06')
      .to(sketch, { opacity: 0.12, duration: 0.22 }, '-=0.08')
      .to(title, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' }, '-=0.04')
      .to(hint, { opacity: 1, y: 0, duration: 0.26, ease: 'power2.out' }, '-=0.14')
  }, [prefersReducedMotion])

  useGsapContext(playIntro, sceneRef)

  return (
    <section
      ref={sceneRef}
      id="opening"
      className={cx('hero-scene', hasEntered && 'is-entered')}
      tabIndex={-1}
      aria-label="Opening scene"
    >
      <div className="hero-layer hero-bg parallax-bg" aria-hidden="true" />
      <div className="hero-layer hero-room parallax-room" aria-hidden="true" />
      <div className="hero-print" aria-hidden="true">
        <div className="hero-paper" />
        <div className="hero-halftone" />
      </div>
      <div className="hero-layer parallax-table" aria-hidden="true">
        <div className="hero-table-reveal">
          <div className="hero-table">
            <span className="hero-table-sheen" />
          </div>
        </div>
      </div>

      <Fog />

      <div className="hero-layer parallax-light">
        <div className="hero-spotlight">
          <Spotlight />
        </div>
        <div className="hero-lamp">
          <PendantLamp />
        </div>
      </div>

      <div className="hero-mast">
        <p className="hero-name">{personal.name}</p>
        <p className="hero-role">{personal.role}</p>
      </div>

      <div className="hero-stage">
        <div className="hero-copy-slot parallax-copy">
          <div className="hero-copy" aria-hidden="true">
            <p className="hero-kicker">{copy.enterKicker}</p>
            <p className="hero-enter letterpress">{copy.enter}</p>
            <p className="hero-hint">{copy.capHint}</p>
          </div>
        </div>

        <div className="hero-cap-slot parallax-cap">
          <div className="hero-cap-reveal">
            <div className="cap-idle">
              <InteractiveCap />
              <BladeNav />
            </div>
          </div>
        </div>
      </div>

      <Dust />
      <div className="hero-blackout" aria-hidden="true" />
    </section>
  )
}
