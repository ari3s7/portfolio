import { useId } from 'react'
import { copy } from '@/data'

export function MatchStriker() {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      className="match-striker-mark"
      viewBox="0 0 320 148"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={`${id}-board`}
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(16)"
        >
          <path d="M0 1.1H9" stroke="#0c0b09" strokeWidth="0.55" opacity="0.4" />
        </pattern>
        <pattern
          id={`${id}-grit`}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="0.9" cy="1.1" r="0.5" fill="#0c0b09" />
          <circle cx="2.7" cy="2.6" r="0.38" fill="#0c0b09" />
          <circle cx="1.6" cy="3.2" r="0.28" fill="#0c0b09" />
        </pattern>
        <pattern
          id={`${id}-cross`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-38)"
        >
          <path d="M0 0.8H6" stroke="#0c0b09" strokeWidth="0.4" opacity="0.55" />
        </pattern>
        <clipPath id={`${id}-box`}>
          <path d="M18 48H302L292 136H28Z" />
        </clipPath>
        <clipPath id={`${id}-strip`}>
          <path d="M24 18H296L302 48H18Z" />
        </clipPath>
      </defs>

      <g className="striker-sketch">
        <path
          d="M20 50H300L290 138H30Z"
          stroke="#6b5748"
          strokeWidth="0.9"
          strokeDasharray="5 6"
          opacity="0.3"
        />
      </g>

      <g className="striker-fill">
        <path d="M18 48H302L292 136H28Z" fill="#8f7a62" />
        <path d="M24 18H296L302 48H18Z" fill="#5c4a3c" />
        <rect x="86" y="64" width="148" height="48" fill="#d4c4a8" />
      </g>

      <g className="striker-hatch">
        <g clipPath={`url(#${id}-box)`} opacity="0.32">
          <rect x="16" y="48" width="290" height="92" fill={`url(#${id}-board)`} />
        </g>
        <g clipPath={`url(#${id}-strip)`} opacity="0.7">
          <rect x="16" y="16" width="290" height="36" fill={`url(#${id}-grit)`} />
          <rect x="16" y="16" width="290" height="36" fill={`url(#${id}-cross)`} />
        </g>
      </g>

      <g
        className="striker-outline"
        fill="none"
        stroke="#0c0b09"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 18H296L302 48H18Z" strokeWidth="2" />
        <path d="M18 48H302L292 136H28Z" strokeWidth="2.05" />
        <rect x="86" y="64" width="148" height="48" strokeWidth="1.45" />
        <path d="M18 48H302" strokeWidth="1.3" />
        <path d="M40 18V48" strokeWidth="0.7" opacity="0.45" />
        <path d="M80 18V48" strokeWidth="0.7" opacity="0.4" />
        <path d="M160 18V48" strokeWidth="0.7" opacity="0.4" />
        <path d="M240 18V48" strokeWidth="0.7" opacity="0.4" />
        <path d="M280 18V48" strokeWidth="0.7" opacity="0.45" />
      </g>

      <text
        className="striker-print"
        x="160"
        y="92"
        textAnchor="middle"
        fill="#0c0b09"
        fontSize="12"
        letterSpacing="0.14em"
      >
        {copy.match.strikerLabel}
      </text>
    </svg>
  )
}
