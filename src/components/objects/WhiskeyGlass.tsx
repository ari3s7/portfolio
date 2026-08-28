import { useId } from 'react'

export function WhiskeyGlass() {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      className="deal-glass-art"
      viewBox="0 0 280 360"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={`${id}-hatch`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-22)"
        >
          <path d="M0 1H6" stroke="#0c0b09" strokeWidth="0.4" opacity="0.32" />
        </pattern>
        <pattern id={`${id}-stipple`} width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="1.1" cy="1.3" r="0.32" fill="#0c0b09" />
          <circle cx="3.4" cy="3.2" r="0.22" fill="#0c0b09" />
        </pattern>
        <linearGradient id={`${id}-glass`} x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#ead9b8" stopOpacity="0.22" />
          <stop offset="42%" stopColor="#d8c49a" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#c4b089" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={`${id}-whiskey`} x1="0.18" y1="0" x2="0.82" y2="1">
          <stop offset="0%" stopColor="#8a4e18" stopOpacity="0.5" />
          <stop offset="16%" stopColor="#6a3410" stopOpacity="0.72" />
          <stop offset="46%" stopColor="#431c0a" stopOpacity="0.86" />
          <stop offset="76%" stopColor="#271008" stopOpacity="0.93" />
          <stop offset="100%" stopColor="#120706" stopOpacity="0.96" />
        </linearGradient>
        <linearGradient id={`${id}-whiskey-side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d4a45a" stopOpacity="0.26" />
          <stop offset="24%" stopColor="#8a4a18" stopOpacity="0.08" />
          <stop offset="58%" stopColor="#2a1208" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#1a0c06" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id={`${id}-surface`} cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#d4a45a" stopOpacity="0.48" />
          <stop offset="38%" stopColor="#8a4e1c" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3a1c0c" stopOpacity="0.1" />
        </radialGradient>
        <clipPath id={`${id}-bowl`} clipPathUnits="userSpaceOnUse">
          <path d="M72 90H208L195.5 258H84.5Z" />
        </clipPath>
      </defs>

      <ellipse className="deal-glass-desk" cx="140" cy="318" rx="92" ry="14" fill="#1a1612" opacity="0.55" />
      <ellipse className="deal-glass-desk" cx="140" cy="318" rx="92" ry="14" fill={`url(#${id}-hatch)`} opacity="0.35" />

      <g className="deal-glass-body">
        <path
          d="M58 78H222L206 274C204 286 190 294 140 294C90 294 76 286 74 274Z"
          fill={`url(#${id}-glass)`}
          stroke="#0c0b09"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <g clipPath={`url(#${id}-bowl)`} opacity="0.18">
          <rect x="50" y="80" width="180" height="200" fill={`url(#${id}-hatch)`} />
          <rect x="50" y="80" width="180" height="200" fill={`url(#${id}-stipple)`} />
        </g>
        <path
          d="M70 92H210L198 258H82Z"
          fill="none"
          stroke="#0c0b09"
          strokeWidth="0.8"
          opacity="0.4"
        />

        <g className="deal-liquid" clipPath={`url(#${id}-bowl)`}>
          <g className="deal-liquid-sway">
            <path
              className="deal-liquid-fill"
              d="M18 176C48 158 232 158 262 176L248 292H32Z"
              fill={`url(#${id}-whiskey)`}
            />
            <path
              className="deal-liquid-fill"
              d="M18 176C48 158 232 158 262 176L248 292H32Z"
              fill={`url(#${id}-whiskey-side)`}
            />
            <g className="deal-liquid-surface">
              <path
                className="deal-liquid-meniscus"
                d="M32 176C62 162 218 162 248 176C218 190 62 190 32 176Z"
                fill={`url(#${id}-surface)`}
              />
              <path
                d="M48 172C86 164 154 163 196 170"
                stroke="#e8c888"
                strokeWidth="3"
                opacity="0.34"
                strokeLinecap="round"
              />
              <path
                d="M58 180C98 192 168 191 214 178"
                stroke="#0c0b09"
                strokeWidth="0.7"
                opacity="0.22"
              />
              <ellipse cx="92" cy="198" rx="2.2" ry="3.2" fill="#ead9b8" opacity="0.16" />
              <ellipse cx="118" cy="214" rx="1.5" ry="2.2" fill="#ead9b8" opacity="0.12" />
            </g>
          </g>
        </g>

        <path
          className="deal-glass-shine"
          d="M86 108C96 150 92 210 90 246"
          stroke="#ead9b8"
          strokeWidth="7"
          opacity="0.2"
          strokeLinecap="round"
        />
        <path
          className="deal-highlight"
          d="M92 100C96 148 94 210 92 248"
          stroke="#f4ead4"
          strokeWidth="4.5"
          opacity="0.28"
          strokeLinecap="round"
        />
        <path
          d="M188 112C180 168 184 220 190 250"
          stroke="#0c0b09"
          strokeWidth="1.1"
          opacity="0.22"
        />
        <path
          className="deal-glass-shine"
          d="M176 118C184 168 182 214 178 248"
          stroke="#ead9b8"
          strokeWidth="3.2"
          opacity="0.14"
          strokeLinecap="round"
        />

        <path d="M62 86H218" stroke="#0c0b09" strokeWidth="2" />
        <path d="M68 78H212" stroke="#0c0b09" strokeWidth="1.6" />
        <ellipse cx="140" cy="78" rx="72" ry="8" fill="#ead9b8" fillOpacity="0.28" stroke="#0c0b09" strokeWidth="1.5" />
        <ellipse cx="140" cy="78" rx="58" ry="5" fill="none" stroke="#ead9b8" strokeWidth="1.1" opacity="0.45" />
        <ellipse cx="140" cy="78" rx="48" ry="3.2" fill="none" stroke="#f4ead4" strokeWidth="0.7" opacity="0.35" />

        <path d="M76 274H204" stroke="#0c0b09" strokeWidth="2.1" />
        <path d="M84 282H196" stroke="#0c0b09" strokeWidth="1.4" />
        <path d="M96 288H184" stroke="#0c0b09" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M108 268V288" stroke="#0c0b09" strokeWidth="0.7" opacity="0.45" />
        <path d="M140 268V288" stroke="#0c0b09" strokeWidth="0.7" opacity="0.45" />
        <path d="M172 268V288" stroke="#0c0b09" strokeWidth="0.7" opacity="0.45" />
      </g>
    </svg>
  )
}

export function DealDeskProps() {
  return (
    <svg
      className="deal-props"
      viewBox="0 0 420 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="deal-matchbox" transform="translate(12 38) rotate(-8)">
        <rect x="0" y="0" width="86" height="46" fill="#5c1c1c" stroke="#0c0b09" strokeWidth="1.8" />
        <rect x="6" y="6" width="74" height="34" fill="#ead9b8" stroke="#0c0b09" strokeWidth="1.1" />
        <path d="M10 16H70" stroke="#0c0b09" strokeWidth="0.7" opacity="0.45" />
        <path d="M10 24H54" stroke="#0c0b09" strokeWidth="0.7" opacity="0.35" />
        <rect x="58" y="12" width="16" height="22" fill="#3a3228" stroke="#0c0b09" strokeWidth="0.9" />
      </g>
      <g className="deal-lighter" transform="translate(318 28) rotate(12)">
        <rect x="0" y="18" width="36" height="52" rx="3" fill="#8a6a3e" stroke="#0c0b09" strokeWidth="1.7" />
        <rect x="4" y="22" width="28" height="44" fill="#c4a574" stroke="#0c0b09" strokeWidth="0.8" />
        <rect x="8" y="8" width="20" height="14" fill="#3a3228" stroke="#0c0b09" strokeWidth="1.3" />
        <path d="M12 8V4H24V8" stroke="#0c0b09" strokeWidth="1.3" />
        <circle cx="18" cy="40" r="5" fill="#ead9b8" stroke="#0c0b09" strokeWidth="1" />
      </g>
    </svg>
  )
}
