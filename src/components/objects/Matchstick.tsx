import { useId } from 'react'

export function Matchstick() {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      className="matchstick-mark"
      viewBox="0 0 248 44"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={`${id}-grain`}
          width="8"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-8)"
        >
          <path d="M0 1.1H8" stroke="#0c0b09" strokeWidth="0.45" opacity="0.55" />
        </pattern>
        <clipPath id={`${id}-stick`}>
          <path d="M16 16H220Q226 16 226 22Q226 28 220 28H16Z" />
        </clipPath>
      </defs>

      <g className="match-sketch">
        <path
          d="M14 14H222"
          stroke="#6b5748"
          strokeWidth="0.8"
          strokeDasharray="3 5"
          opacity="0.35"
        />
      </g>

      <g className="match-fill">
        <path d="M16 15.5H220Q226.5 15.5 226.5 22Q226.5 28.5 220 28.5H16Z" fill="#cbb79a" />
        <ellipse cx="226" cy="22" rx="16" ry="12.5" fill="#4a2a22" />
      </g>

      <g className="match-hatch" clipPath={`url(#${id}-stick)`} opacity="0.38">
        <rect x="16" y="14" width="210" height="16" fill={`url(#${id}-grain)`} />
      </g>

      <g
        className="match-outline"
        fill="none"
        stroke="#0c0b09"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 15.6H220Q226.6 15.6 226.6 22Q226.6 28.4 220 28.4H16" strokeWidth="1.7" />
        <path d="M48 16.2L66 27.6" strokeWidth="0.7" opacity="0.45" />
        <path d="M108 16.4L122 27.2" strokeWidth="0.65" opacity="0.35" />
        <path d="M168 16.6L180 27" strokeWidth="0.6" opacity="0.3" />
        <ellipse cx="226" cy="22" rx="16.2" ry="12.7" strokeWidth="1.85" />
        <path d="M232 18Q236 16 238 20" strokeWidth="0.8" opacity="0.55" />
      </g>

      <g className="match-head-detail">
        <ellipse cx="230" cy="19" rx="4.2" ry="2.4" fill="#6b3a30" opacity="0.45" />
        <circle cx="234" cy="24" r="0.7" fill="#0c0b09" />
        <circle cx="220" cy="17" r="0.55" fill="#0c0b09" />
      </g>

      <g className="match-glow" opacity="0">
        <ellipse cx="226" cy="22" rx="28" ry="22" fill="#c47a3a" />
      </g>

      <g className="match-flame" opacity="0">
        <path
          className="match-flame-outer"
          d="M226 4C220 10 217 16 220 22C222 18 226 16 228 20C232 14 232 8 226 4Z"
          fill="#8a3a1f"
          stroke="#0c0b09"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <path
          className="match-flame-inner"
          d="M226 9C223 13 222 17 224 21C225 18 227 17 228 19C230 15 229 11 226 9Z"
          fill="#e4d6bc"
          opacity="0.82"
        />
      </g>
    </svg>
  )
}
