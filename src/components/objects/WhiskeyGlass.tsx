import { useId } from 'react'

function svgId(raw: string) {
  return raw.replace(/:/g, '')
}

function IceChunk({
  id,
  variant,
}: {
  id: string
  variant: 'a' | 'b'
}) {
  const compact = variant === 'b'

  return (
    <g className={`deal-ice deal-ice-${variant}`}>
      <g transform={compact ? 'translate(178 122) rotate(18) scale(0.9)' : 'translate(102 96) rotate(-12)'}>
        <path
          d="M10 22L46 10C50 9 56 12 60 16L78 28L42 42L10 22Z"
          fill={`url(#${id}-ice-top)`}
        />
        <path
          d="M10 22L8 50C9 60 18 68 42 72L42 42L10 22Z"
          fill={`url(#${id}-ice-side)`}
        />
        <path
          d="M78 28L80 54C78 64 60 70 42 72L42 42L78 28Z"
          fill={`url(#${id}-ice-shade)`}
        />
        <path
          d="M20 26L50 16"
          stroke="#fffaf0"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M24 38L38 58M52 32L50 60"
          stroke="#f4ead4"
          strokeWidth="0.75"
          opacity="0.3"
        />
        <path
          d="M16 46C24 56 34 64 42 68"
          stroke="#6a3010"
          strokeWidth="0.85"
          opacity="0.22"
        />
        <ellipse cx="32" cy="22" rx="8" ry="3" fill="#fff8ec" opacity="0.32" />
      </g>
    </g>
  )
}

function GlassArt() {
  const id = svgId(useId())

  return (
    <svg
      className="deal-glass-art"
      viewBox="0 0 360 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-shell`} x1="0.22" y1="0" x2="0.84" y2="1">
          <stop offset="0%" stopColor="#f4ead4" stopOpacity="0.14" />
          <stop offset="36%" stopColor="#d8c49a" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#3a2a1c" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id={`${id}-wall-l`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f7f1e4" stopOpacity="0.48" />
          <stop offset="34%" stopColor="#ead9b8" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#120c08" stopOpacity="0.58" />
        </linearGradient>
        <linearGradient id={`${id}-wall-r`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#0c0806" stopOpacity="0.62" />
          <stop offset="48%" stopColor="#ead9b8" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#f4ead4" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`${id}-sham`} x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#c47828" stopOpacity="0.28" />
          <stop offset="28%" stopColor="#5a2a10" stopOpacity="0.22" />
          <stop offset="62%" stopColor="#1a100c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0c0806" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id={`${id}-sham-glow`} cx="42%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#e8a43a" stopOpacity="0.42" />
          <stop offset="46%" stopColor="#8a4010" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#120806" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-whiskey`} x1="0.38" y1="0" x2="0.58" y2="1">
          <stop offset="0%" stopColor="#f6d078" stopOpacity="0.55" />
          <stop offset="7%" stopColor="#e8a230" stopOpacity="0.72" />
          <stop offset="22%" stopColor="#d06a14" stopOpacity="0.84" />
          <stop offset="48%" stopColor="#9a3c0c" stopOpacity="0.9" />
          <stop offset="76%" stopColor="#4a1608" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#140806" stopOpacity="0.97" />
        </linearGradient>
        <linearGradient id={`${id}-whiskey-side`} x1="0" y1="0.15" x2="1" y2="0.85">
          <stop offset="0%" stopColor="#fbe4a0" stopOpacity="0.42" />
          <stop offset="18%" stopColor="#e09028" stopOpacity="0.08" />
          <stop offset="62%" stopColor="#3a1208" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#0c0604" stopOpacity="0.44" />
        </linearGradient>
        <radialGradient id={`${id}-surface`} cx="34%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.88" />
          <stop offset="22%" stopColor="#e8a43a" stopOpacity="0.52" />
          <stop offset="58%" stopColor="#a84810" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#3a1408" stopOpacity="0.05" />
        </radialGradient>
        <radialGradient id={`${id}-caustic`} cx="46%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#f0c060" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6a280c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-ice-top`} cx="34%" cy="24%" r="72%">
          <stop offset="0%" stopColor="#fff8ee" stopOpacity="0.7" />
          <stop offset="42%" stopColor="#e8dcc4" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#c4a070" stopOpacity="0.16" />
        </radialGradient>
        <linearGradient id={`${id}-ice-side`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4ead4" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#c46818" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`${id}-ice-shade`} x1="0.1" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#d2b07a" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#6a3010" stopOpacity="0.4" />
        </linearGradient>
        <clipPath id={`${id}-bowl`} clipPathUnits="userSpaceOnUse">
          <path d="M80 62H280L266 186H94Z" />
        </clipPath>
      </defs>

      <g className="deal-glass-body">
        <path
          d="M52 50H308L296 186L288 266C284 282 250 294 180 294C110 294 76 282 72 266L64 186Z"
          fill={`url(#${id}-shell)`}
        />

        <g clipPath={`url(#${id}-bowl)`}>
          <path d="M80 62H280L266 186H94Z" fill="#0a0806" opacity="0.38" />
          <g className="deal-liquid-sway">
            <path
              className="deal-liquid-fill"
              d="M18 136C54 118 306 118 342 136L326 220H34Z"
              fill={`url(#${id}-whiskey)`}
            />
            <path
              className="deal-liquid-fill"
              d="M18 136C54 118 306 118 342 136L326 220H34Z"
              fill={`url(#${id}-whiskey-side)`}
            />
            <ellipse
              className="deal-caustic"
              cx="180"
              cy="172"
              rx="72"
              ry="26"
              fill={`url(#${id}-caustic)`}
            />
            <g className="deal-liquid-surface">
              <path
                className="deal-liquid-meniscus"
                d="M34 136C70 118 290 118 326 136C290 154 70 154 34 136Z"
                fill={`url(#${id}-surface)`}
              />
              <path
                d="M62 132C104 124 188 122 248 130"
                stroke="#ffe9a8"
                strokeWidth="3.2"
                strokeLinecap="round"
                opacity="0.62"
              />
              <path
                d="M70 142C118 152 208 151 268 140"
                stroke="#4a1608"
                strokeWidth="0.9"
                opacity="0.32"
              />
              <ellipse
                className="deal-ripple deal-ripple-a"
                cx="180"
                cy="136"
                rx="48"
                ry="10"
                stroke="#f6d078"
                strokeWidth="1.4"
                opacity="0"
              />
              <ellipse
                className="deal-ripple deal-ripple-b"
                cx="180"
                cy="136"
                rx="68"
                ry="14"
                stroke="#ead9b8"
                strokeWidth="1.05"
                opacity="0"
              />
              <ellipse
                className="deal-ripple deal-ripple-c"
                cx="180"
                cy="136"
                rx="88"
                ry="18"
                stroke="#c46818"
                strokeWidth="0.85"
                opacity="0"
              />
            </g>
            <IceChunk id={id} variant="a" />
            <IceChunk id={id} variant="b" />
          </g>
        </g>

        <path d="M52 50L80 62L94 186L64 186Z" fill={`url(#${id}-wall-l)`} />
        <path d="M308 50L280 62L266 186L296 186Z" fill={`url(#${id}-wall-r)`} />

        <path d="M64 186H296L288 266C284 282 250 294 180 294C110 294 76 282 72 266Z" fill={`url(#${id}-sham)`} />
        <ellipse cx="180" cy="228" rx="96" ry="20" fill={`url(#${id}-sham-glow)`} />
        <ellipse cx="180" cy="186" rx="116" ry="14" fill="#ead9b8" fillOpacity="0.08" stroke="#f4ead4" strokeWidth="1.1" opacity="0.35" />
        <ellipse cx="180" cy="214" rx="104" ry="13" fill="none" stroke="#ead9b8" strokeWidth="1" opacity="0.22" />
        <ellipse cx="180" cy="238" rx="92" ry="11" fill="none" stroke="#c4a574" strokeWidth="0.9" opacity="0.28" />
        <ellipse cx="180" cy="258" rx="80" ry="9" fill="none" stroke="#ead9b8" strokeWidth="0.8" opacity="0.2" />
        <ellipse cx="180" cy="278" rx="66" ry="8" fill="#0c0806" fillOpacity="0.35" stroke="#3a2a1c" strokeWidth="1.1" />
        <path
          d="M96 200C110 236 128 262 180 274C232 262 250 236 264 200"
          stroke="#f4ead4"
          strokeWidth="1.2"
          opacity="0.12"
        />

        <path
          className="deal-glass-shine"
          d="M96 78C108 128 102 168 100 186"
          stroke="#f7f4ee"
          strokeWidth="9"
          strokeLinecap="round"
          opacity="0.28"
        />
        <path
          className="deal-highlight"
          d="M108 70C114 124 110 170 108 186"
          stroke="#fffaf0"
          strokeWidth="4.4"
          strokeLinecap="round"
          opacity="0.42"
        />
        <path
          className="deal-glass-shine"
          d="M252 82C244 132 250 172 256 186"
          stroke="#ead9b8"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.14"
        />
        <path
          d="M268 88C260 140 266 172 270 186"
          stroke="#0c0806"
          strokeWidth="1.2"
          opacity="0.22"
        />

        <ellipse cx="180" cy="44" rx="128" ry="16" fill="#f4ead4" fillOpacity="0.16" />
        <ellipse cx="180" cy="44" rx="128" ry="16" fill="none" stroke="#f8f4ea" strokeWidth="2.4" />
        <ellipse cx="180" cy="52" rx="102" ry="11" fill="#0a0806" fillOpacity="0.16" stroke="#ead9b8" strokeWidth="1.35" opacity="0.55" />
        <ellipse cx="180" cy="48" rx="70" ry="5.5" fill="none" stroke="#fffaf0" strokeWidth="1.35" opacity="0.55" />
      </g>
    </svg>
  )
}

export function WhiskeyGlass() {
  return (
    <span className="deal-pour">
      <span className="deal-glass-shadow" aria-hidden="true" />
      <GlassArt />
    </span>
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
