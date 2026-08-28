import { useEffect, useRef, type KeyboardEvent } from 'react'
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

  const { opened, open } = useWatchScene({
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

  const onWatchKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    open()
  }

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={cx(
        'watch-scene',
        opened && 'is-open',
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
            <button
              type="button"
              className="watch-trigger"
              aria-label={copy.experience.open}
              aria-expanded={opened}
              aria-controls="education-log"
              aria-pressed={opened}
              tabIndex={opened ? -1 : 0}
              onClick={open}
              onKeyDown={onWatchKeyDown}
            >
              <PocketWatch marks={marks} />
            </button>
            {opened ? null : <p className="watch-hint">{copy.experience.hint}</p>}
          </div>

          {experience.length > 0 ? (
            <ol
              id="education-log"
              className="watch-log"
              aria-label={copy.experience.heading}
              aria-hidden={!opened || undefined}
              inert={!opened ? true : undefined}
            >
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

        <p className="watch-status" aria-live="polite">
          {opened ? copy.experience.opened : ''}
        </p>
      </div>
    </section>
  )
}
