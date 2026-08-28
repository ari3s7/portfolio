import { useId } from 'react'

export function EnvelopeBodyArt() {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      className="letter-body-art"
      viewBox="0 0 320 200"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8c49a" />
          <stop offset="55%" stopColor="#c6b089" />
          <stop offset="100%" stopColor="#b49c74" />
        </linearGradient>
        <pattern
          id={`${id}-hatch`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-24)"
        >
          <path d="M0 1H6" stroke="#0c0b09" strokeWidth="0.45" opacity="0.28" />
        </pattern>
      </defs>
      <path
        d="M5 7C22 3 70 6 160 5C252 4 300 3 315 8L313 193C298 198 248 196 160 195C70 194 18 198 6 192Z"
        fill={`url(#${id}-paper)`}
        stroke="#0c0b09"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M5 7C22 3 70 6 160 5C252 4 300 3 315 8L313 193C298 198 248 196 160 195C70 194 18 198 6 192Z"
        fill={`url(#${id}-hatch)`}
        opacity="0.22"
      />
      <path d="M18 12H302" stroke="#0c0b09" strokeWidth="1" opacity="0.28" />
    </svg>
  )
}

export function EnvelopeFlapArt() {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      className="letter-flap-art"
      viewBox="0 0 320 180"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="0.12" y2="1">
          <stop offset="0%" stopColor="#f4e7c8" />
          <stop offset="48%" stopColor="#ead9b4" />
          <stop offset="100%" stopColor="#dcc8a0" />
        </linearGradient>
        <pattern
          id={`${id}-hatch`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(32)"
        >
          <path d="M0 1H6" stroke="#0c0b09" strokeWidth="0.4" opacity="0.3" />
        </pattern>
      </defs>
      <path
        d="M4 8C36 3 96 6 160 5C228 4 286 3 316 9L170 176C164 180 156 180 150 176Z"
        fill={`url(#${id}-paper)`}
        stroke="#0c0b09"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M4 8C36 3 96 6 160 5C228 4 286 3 316 9L170 176C164 180 156 180 150 176Z"
        fill={`url(#${id}-hatch)`}
        opacity="0.14"
      />
      <path d="M160 5V14" stroke="#0c0b09" strokeWidth="1.1" opacity="0.35" />
    </svg>
  )
}
