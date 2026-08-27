import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/animations/gsapSetup'
import { CaseFile } from '@/components/projects/CaseFile'
import { copy, projects } from '@/data'
import { useCaseFileMotion } from '@/hooks/useCaseFileMotion'
import { cx } from '@/lib/cx'
import { useExperience } from '@/state/useExperience'

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const { gates, prefersReducedMotion, performanceTier, pointerMode } =
    useExperience()
  const lit = gates.cigaretteLit
  const [openId, setOpenId] = useState<string | null>(null)

  const closeFile = useCallback(() => {
    setOpenId(null)
  }, [])

  const toggleFile = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }, [])

  useCaseFileMotion({
    sectionRef,
    openId,
    reducedMotion: prefersReducedMotion,
    onClose: closeFile,
  })

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll<HTMLElement>('.case-file')
    const veils = section.querySelectorAll<HTMLElement>('.case-file-veil')
    const copyBlock = section.querySelector<HTMLElement>('.projects-copy')

    if (prefersReducedMotion || !lit) {
      gsap.set(cards, {
        opacity: prefersReducedMotion ? 1 : 0,
        y: 0,
        scale: 1,
        rotate: 0,
        filter: 'none',
        clipPath: prefersReducedMotion ? 'inset(0%)' : 'inset(48% 18% 42% 18%)',
      })
      gsap.set(veils, { opacity: prefersReducedMotion ? 0.12 : 0.9 })
      gsap.set(copyBlock, { opacity: prefersReducedMotion ? 1 : 0, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const blurFrom = performanceTier === 'light' ? 'blur(0px)' : 'blur(10px)'
      gsap.set(cards, {
        opacity: 0,
        y: 18,
        scale: 1.04,
        filter: blurFrom,
        clipPath: 'inset(46% 16% 40% 16%)',
      })
      gsap.set(veils, { opacity: 0.92 })
      gsap.set(copyBlock, { opacity: 0, y: 10 })

      const timeline = gsap.timeline({ delay: 0.45 })
      timeline.to(copyBlock, { opacity: 1, y: 0, duration: 0.7, ease: 'power1.out' }, 0)

      cards.forEach((card, index) => {
        const tilt = index % 2 === 0 ? -0.8 : 0.95
        timeline.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: tilt,
            filter: 'blur(0px)',
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.25,
            ease: 'power2.out',
          },
          0.35 + index * 0.42,
        )
        timeline.to(
          veils[index],
          { opacity: 0.18, duration: 1.1, ease: 'sine.out' },
          0.5 + index * 0.42,
        )
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          gsap.set(veils, { opacity: 0.18 + self.progress * 0.08 })
        },
      })
    }, section)

    return () => {
      ctx.revert()
    }
  }, [lit, performanceTier, prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={cx(
        'projects-scene',
        lit && 'is-lit',
        openId && 'is-file-open',
        performanceTier === 'light' && 'is-light',
        pointerMode === 'coarse' && 'is-touch',
      )}
      aria-labelledby="projects-heading"
      aria-hidden={!lit && !prefersReducedMotion}
      inert={!lit && !prefersReducedMotion ? true : undefined}
      tabIndex={-1}
    >
      <div className="projects-well">
        <header className="projects-copy">
          <p className="projects-kicker">{copy.projects.kicker}</p>
          <h2 id="projects-heading" className="projects-heading letterpress">
            {copy.projects.heading}
          </h2>
        </header>

        <div className="projects-stage">
          <div className={cx('projects-grid', openId && 'has-open')}>
            {projects.map((project) => (
              <CaseFile
                key={project.id}
                project={project}
                open={openId === project.id}
                interactive={lit || prefersReducedMotion}
                onToggle={() => toggleFile(project.id)}
                onClose={closeFile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
