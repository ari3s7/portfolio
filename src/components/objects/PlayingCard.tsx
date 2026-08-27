import { useId } from 'react'
import { SuitMark } from '@/components/objects/SuitMark'
import { copy, type Skill } from '@/data'
import { cx } from '@/lib/cx'
import { parseRank } from '@/lib/parseRank'

type PlayingCardProps = {
  skill: Skill
  selected: boolean
  onToggle: () => void
}

export function PlayingCard({ skill, selected, onToggle }: PlayingCardProps) {
  const id = useId().replace(/:/g, '')
  const { value, suit } = parseRank(skill.rank)
  const index = `${value}${suit ? skill.rank.trim().slice(-1) : ''}`
  const label = selected ? copy.skills.close : copy.skills.open

  return (
    <button
      type="button"
      className={cx('skill-card', selected && 'is-selected', skill.major && 'is-major')}
      data-skill={skill.id}
      aria-pressed={selected}
      aria-label={`${label}: ${skill.name}${skill.items.length ? `. ${skill.items.join(', ')}` : ''}${skill.rank ? `, ${skill.rank}` : ''}`}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        event.preventDefault()
        onToggle()
      }}
    >
      <span className="skill-card-paper">
        <span className="skill-card-fiber" aria-hidden="true" />
        <span className="skill-card-hatch" aria-hidden="true" />
        <span className="skill-card-halftone" aria-hidden="true" />
        <span className="skill-card-stain" aria-hidden="true" />

        <svg
          className="skill-card-frame"
          viewBox="0 0 190 276"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <pattern
              id={`${id}-print`}
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(18)"
            >
              <path d="M0 1H6" stroke="#0c0b09" strokeWidth="0.35" opacity="0.28" />
            </pattern>
          </defs>
          <rect x="8" y="8" width="174" height="260" fill={`url(#${id}-print)`} opacity="0.35" />
          <path
            d="M10 16C14 8 28 8 42 9H148C168 8 180 12 181 28V248C182 262 170 268 148 269H42C22 268 10 260 9 244V30C8 22 8 18 10 16Z"
            fill="none"
            stroke="#0c0b09"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M18 22H172"
            fill="none"
            stroke="#0c0b09"
            strokeWidth="0.6"
            opacity="0.28"
          />
        </svg>

        {index ? (
          <span className="skill-card-index skill-card-index-tl" aria-hidden="true">
            {index}
          </span>
        ) : null}
        {index ? (
          <span className="skill-card-index skill-card-index-br" aria-hidden="true">
            {index}
          </span>
        ) : null}

        <svg className="skill-card-pip" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
          <SuitMark suit={suit} />
        </svg>

        <span className="skill-card-name">{skill.name}</span>
        {skill.items.length > 0 ? (
          <span className="skill-card-items">
            {skill.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </span>
        ) : null}
        {skill.rank ? <span className="skill-card-rank">{skill.rank}</span> : null}
      </span>
      <span className="skill-card-shadow" aria-hidden="true" />
    </button>
  )
}
