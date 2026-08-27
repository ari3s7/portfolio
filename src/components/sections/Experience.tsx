import { useEffect, useRef } from 'react'
import { PocketWatch } from '@/components/objects/PocketWatch'
import { copy, experience } from '@/data'
import { useWatchScene } from '@/hooks/useWatchScene'
import { cx } from '@/lib/cx'
import { timelineAngles } from '@/lib/timelineAngles'
import { useExperience } from '@/state/useExperience'

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const { prefersReducedMotion, performanceTier, pointerMode, setActiveSection } =
    useExperience()
  const angles = timelineAngles(experience.length)
  const marks = experience.map((item, index) => ({
    id: item.id,
    year: item.year,
    angle: angles[index] ?? 0,
  }))

  useWatchScene({
    sectionRef,
    count: experience.length,
    reducedMotion: prefersReducedMotion,
    light: performanceTier === 'light',
  })

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#experience') return
    setActiveSection('experience')
    sectionRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [setActiveSection])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={cx(
        'watch-scene',
        performanceTier === 'light' && 'is-light',
        pointerMode === 'coarse' && 'is-touch',
      )}
      aria-labelledby="experience-heading"
      tabIndex={-1}
    >
      <div className="watch-hatch" aria-hidden="true" />
      <div className="watch-vignette" aria-hidden="true" />

      <div className="watch-well">
        <header className="watch-copy">
          <p className="watch-kicker">{copy.experience.kicker}</p>
          <h2 id="experience-heading" className="watch-heading letterpress">
            {copy.experience.heading}
          </h2>
        </header>

        <div className="watch-layout">
          <div className="watch-stage">
            <PocketWatch marks={marks} />
          </div>

          {experience.length > 0 ? (
            <ol className="watch-log" aria-label={copy.experience.heading}>
              {experience.map((item) => (
                <li key={item.id}>
                  <article className="watch-entry" data-entry={item.id}>
                    <p className="watch-entry-year">{item.year}</p>
                    <p className="watch-entry-kind">{copy.experience.kinds[item.kind]}</p>
                    <h3 className="watch-entry-title">{item.title}</h3>
                    <p className="watch-entry-summary">{item.summary}</p>
                  </article>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </section>
  )
}
