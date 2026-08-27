import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '@/animations/gsapSetup'
import { NewspaperIllustration } from '@/components/objects/NewspaperIllustration'
import { copy, personal } from '@/data'
import { cx } from '@/lib/cx'
import { useExperience } from '@/state/useExperience'

export function Newspaper() {
  const sceneRef = useRef<HTMLElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)
  const unfoldPlayed = useRef(false)
  const fromHash = useRef(
    typeof window !== 'undefined' && window.location.hash === '#about',
  )

  const {
    activeSection,
    setActiveSection,
    prefersReducedMotion,
    pointerMode,
    performanceTier,
  } = useExperience()

  const settleVisible = useCallback(() => {
    const scene = sceneRef.current
    if (!scene) return
    gsap.set(scene.querySelectorAll('.newspaper-reveal'), {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
    })
    gsap.set(scene.querySelectorAll('.paper-ill-stroke'), {
      strokeDasharray: 1,
      strokeDashoffset: 0,
    })
    gsap.set(scene.querySelectorAll('.paper-ill-fill, .paper-ill-hatch, .paper-ill-detail'), {
      opacity: 1,
    })
    gsap.set(scene.querySelector('.paper-ill-sketch'), { opacity: 0.12 })
  }, [])

  useEffect(() => {
    if (!fromHash.current) return
    setActiveSection('about')
    sceneRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
    settleVisible()
    unfoldPlayed.current = true
  }, [setActiveSection, settleVisible])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || pointerMode !== 'fine' || prefersReducedMotion) {
      scene?.style.setProperty('--nx', '0')
      scene?.style.setProperty('--ny', '0')
      return
    }

    let frame = 0
    let nextX = 0
    let nextY = 0

    const apply = () => {
      frame = 0
      scene.style.setProperty('--nx', nextX.toFixed(4))
      scene.style.setProperty('--ny', nextY.toFixed(4))
    }

    const onMove = (event: PointerEvent) => {
      const box = scene.getBoundingClientRect()
      nextX = (event.clientX - box.left) / box.width - 0.5
      nextY = (event.clientY - box.top) / box.height - 0.5
      if (!frame) frame = requestAnimationFrame(apply)
    }

    const reset = () => {
      nextX = 0
      nextY = 0
      if (!frame) frame = requestAnimationFrame(apply)
    }

    scene.addEventListener('pointermove', onMove)
    scene.addEventListener('pointerleave', reset)

    return () => {
      scene.removeEventListener('pointermove', onMove)
      scene.removeEventListener('pointerleave', reset)
      if (frame) cancelAnimationFrame(frame)
      scene.style.setProperty('--nx', '0')
      scene.style.setProperty('--ny', '0')
    }
  }, [pointerMode, prefersReducedMotion])

  useLayoutEffect(() => {
    const scene = sceneRef.current
    const paper = paperRef.current
    if (!scene || !paper) return

    if (prefersReducedMotion || fromHash.current || unfoldPlayed.current) {
      settleVisible()
      unfoldPlayed.current = true
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(paper, { y: 42, scale: 0.94, opacity: 0 })
      gsap.set(scene.querySelectorAll('.newspaper-copy-reveal'), { opacity: 0, y: 14 })
      gsap.set(scene.querySelectorAll('.paper-ill-stroke'), {
        strokeDasharray: 1,
        strokeDashoffset: 1,
      })
      gsap.set(scene.querySelector('.paper-ill-sketch'), { opacity: 0 })
      gsap.set(
        scene.querySelectorAll('.paper-ill-fill, .paper-ill-hatch, .paper-ill-detail'),
        { opacity: 0 },
      )

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top 78%',
          once: true,
        },
        onComplete: () => {
          unfoldPlayed.current = true
        },
      })

      timeline.to(paper, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.62,
        ease: 'power3.out',
      })
      timeline.to(
        scene.querySelector('.paper-ill-sketch'),
        { opacity: 0.34, duration: 0.16 },
        0.18,
      )
      timeline.to(
        scene.querySelectorAll('.paper-ill-stroke'),
        { strokeDashoffset: 0, duration: 0.7, stagger: 0.018, ease: 'power1.out' },
        0.22,
      )
      timeline.to(
        scene.querySelectorAll('.paper-ill-fill'),
        { opacity: 1, duration: 0.22 },
        0.42,
      )
      timeline.to(
        scene.querySelectorAll('.paper-ill-hatch'),
        { opacity: 1, duration: 0.24 },
        0.5,
      )
      timeline.to(
        scene.querySelectorAll('.paper-ill-detail'),
        { opacity: 1, duration: 0.2 },
        0.58,
      )
      timeline.to(
        scene.querySelector('.paper-ill-sketch'),
        { opacity: 0.1, duration: 0.2 },
        0.62,
      )
      timeline.to(
        scene.querySelectorAll('.newspaper-copy-reveal'),
        { opacity: 1, y: 0, duration: 0.38, stagger: 0.07, ease: 'power2.out' },
        0.28,
      )
    }, scene)

    return () => {
      ctx.revert()
    }
  }, [prefersReducedMotion, settleVisible])

  useLayoutEffect(() => {
    if (activeSection !== 'about' || fromHash.current) return

    const scene = sceneRef.current
    const veil = veilRef.current
    if (!scene) return

    const box = scene.getBoundingClientRect()
    const alreadyNear = box.top < window.innerHeight * 0.45 && box.bottom > 120

    if (prefersReducedMotion) {
      if (veil) gsap.set(veil, { autoAlpha: 0 })
      if (!alreadyNear) scene.scrollIntoView({ behavior: 'auto', block: 'start' })
      settleVisible()
      return
    }

    if (alreadyNear) return
    if (!veil) return

    const stain = veil.querySelector('.newspaper-veil-stain')
    const ctx = gsap.context(() => {
      gsap.set(veil, { autoAlpha: 0 })
      if (stain) gsap.set(stain, { scale: 0.12, opacity: 0.92 })
      const timeline = gsap.timeline()
      timeline.to(veil, { autoAlpha: 1, duration: 0.22, ease: 'power2.out' })
      if (stain) {
        timeline.to(stain, { scale: 16, duration: 0.5, ease: 'power2.inOut' }, 0.04)
      }
      timeline.add(() => {
        scene.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 0.26)
      timeline.to(veil, { autoAlpha: 0, duration: 0.4, ease: 'power2.inOut' }, 0.7)
    })

    return () => {
      ctx.revert()
    }
  }, [activeSection, prefersReducedMotion, settleVisible])

  const returnToOpening = () => {
    setActiveSection(null)
    window.history.replaceState(null, '', window.location.pathname)
    document.getElementById('opening')?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
    document.getElementById('opening')?.focus()
  }

  return (
    <>
      <div
        ref={veilRef}
        className="newspaper-veil"
        aria-hidden="true"
      >
        <div className="newspaper-veil-ink" />
        <div className="newspaper-veil-stain" />
      </div>

      <section
        ref={sceneRef}
        id="about"
        className={cx(
          'newspaper-scene',
          performanceTier === 'light' && 'is-light',
        )}
        tabIndex={-1}
        aria-labelledby="about-headline"
      >
        <div className="newspaper-well">
          <div className="newspaper-stack" aria-hidden="true">
            <div className="newspaper-underlay newspaper-underlay-a" />
            <div className="newspaper-underlay newspaper-underlay-b" />
          </div>

          <div className="newspaper-shadow" aria-hidden="true" />

          <div ref={paperRef} className="newspaper-pose newspaper-reveal">
          <article className="newspaper-paper">
            <div className="newspaper-fiber" aria-hidden="true" />
            <div className="newspaper-halftone" aria-hidden="true" />
            <div className="newspaper-fold" aria-hidden="true" />

            <header className="newspaper-masthead newspaper-copy-reveal">
              <p className="newspaper-edition">{copy.newspaper.specialEdition}</p>
              <p className="newspaper-name letterpress">{copy.newspaper.name}</p>
              <p className="newspaper-meta">
                <span>{copy.newspaper.volume}</span>
                <span aria-hidden="true">·</span>
                <span>{copy.newspaper.number}</span>
                {personal.location ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{personal.location}</span>
                  </>
                ) : null}
                {copy.newspaper.date && !copy.newspaper.date.includes('PLACEHOLDER') ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{copy.newspaper.date}</span>
                  </>
                ) : null}
              </p>
            </header>

            <div className="newspaper-rule" aria-hidden="true" />

            <div className="newspaper-headline-block newspaper-copy-reveal">
              <p className="newspaper-kicker">{copy.newspaper.kicker}</p>
              <h1 id="about-headline" className="newspaper-headline letterpress">
                {personal.headline}
              </h1>
              <p className="newspaper-byline">
                <span className="newspaper-subject">{personal.name}</span>
                <span aria-hidden="true"> — </span>
                <span>{personal.role}</span>
              </p>
            </div>

            <div className="newspaper-rule newspaper-rule-thin" aria-hidden="true" />

            <div className="newspaper-body">
              <section className="newspaper-col newspaper-col-intro newspaper-copy-reveal">
                <h2 className="newspaper-col-title">{copy.newspaper.columnIntro}</h2>
                <p>{personal.intro}</p>
              </section>

              <figure className="newspaper-figure newspaper-copy-reveal">
                <NewspaperIllustration />
                {copy.newspaper.illustrationCaption.includes('PLACEHOLDER') ? null : (
                  <figcaption>{copy.newspaper.illustrationCaption}</figcaption>
                )}
              </figure>

              <div className="newspaper-col newspaper-col-identity newspaper-copy-reveal">
                <section>
                  <h2 className="newspaper-col-title">{copy.newspaper.columnIdentity}</h2>
                  <p>{personal.identity}</p>
                </section>
                <section>
                  <h2 className="newspaper-col-title">{copy.newspaper.columnInterests}</h2>
                  <ul className="newspaper-list">
                    {personal.interests.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h2 className="newspaper-col-title">{copy.newspaper.columnFocus}</h2>
                  <p>{personal.focus}</p>
                </section>
              </div>
            </div>

            <blockquote className="newspaper-statement newspaper-copy-reveal">
              <p className="newspaper-statement-label">{copy.newspaper.statementLabel}</p>
              <p className="newspaper-statement-body">{personal.statement}</p>
            </blockquote>

            <footer className="newspaper-footer newspaper-copy-reveal">
              {copy.newspaper.issue.includes('PLACEHOLDER') ? null : <p>{copy.newspaper.issue}</p>}
              {copy.newspaper.price.includes('PLACEHOLDER') ? null : <p>{copy.newspaper.price}</p>}
              {copy.newspaper.footer.includes('PLACEHOLDER') ? null : (
                <p>{copy.newspaper.footer}</p>
              )}
              <button
                type="button"
                className="newspaper-return"
                onClick={returnToOpening}
              >
                {copy.newspaper.returnToCap}
              </button>
            </footer>
          </article>
          </div>
        </div>
      </section>
    </>
  )
}
