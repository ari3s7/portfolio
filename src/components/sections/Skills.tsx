import { useCallback, useEffect, useRef, useState } from 'react'
import { PlayingCard } from '@/components/objects/PlayingCard'
import { copy, skills, supportingTechnologies } from '@/data'
import { useSkillDeal } from '@/hooks/useSkillDeal'
import { cx } from '@/lib/cx'
import { useExperience } from '@/state/useExperience'

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const { prefersReducedMotion, performanceTier, pointerMode, setActiveSection } =
    useExperience()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const kit = supportingTechnologies.filter(Boolean)

  const toggle = useCallback((id: string) => {
    setSelectedId((current) => (current === id ? null : id))
  }, [])

  useSkillDeal({
    sectionRef,
    selectedId,
    reducedMotion: prefersReducedMotion,
  })

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#skills') return
    setActiveSection('skills')
    sectionRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [setActiveSection])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={cx(
        'skills-scene',
        selectedId && 'has-selected',
        performanceTier === 'light' && 'is-light',
        pointerMode === 'coarse' && 'is-touch',
      )}
      aria-labelledby="skills-heading"
      tabIndex={-1}
    >
      <div className="skills-hatch" aria-hidden="true" />
      <div className="skills-table" aria-hidden="true" />

      <div className="skills-well">
        <header className="skills-copy">
          <p className="skills-kicker">{copy.skills.kicker}</p>
          <h2 id="skills-heading" className="skills-heading letterpress">
            {copy.skills.heading}
          </h2>
        </header>

        <div className="skills-stage">
          <div
            className="skills-deck"
            onKeyDown={(event) => {
              if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
              const cards = [
                ...event.currentTarget.querySelectorAll<HTMLButtonElement>('.skill-card'),
              ]
              const index = cards.indexOf(event.target as HTMLButtonElement)
              if (index < 0) return
              event.preventDefault()
              const next =
                event.key === 'ArrowRight'
                  ? Math.min(cards.length - 1, index + 1)
                  : Math.max(0, index - 1)
              cards[next]?.focus()
            }}
          >
            {skills.map((skill) => (
              <PlayingCard
                key={skill.id}
                skill={skill}
                selected={selectedId === skill.id}
                onToggle={() => toggle(skill.id)}
              />
            ))}
          </div>
        </div>

        {kit.length > 0 ? (
          <div className="skills-kit">
            <p className="skills-kit-label">{copy.skills.supporting}</p>
            <ul className="skills-kit-list">
              {kit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}
