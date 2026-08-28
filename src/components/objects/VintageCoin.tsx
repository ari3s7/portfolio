import { useId } from 'react'
import { copy } from '@/data'

type CoinFace = 'heads' | 'tails'

type VintageCoinFaceProps = {
  face: CoinFace
}

export function VintageCoinFace({ face }: VintageCoinFaceProps) {
  const id = useId().replace(/:/g, '')
  const heads = face === 'heads'
  const label = heads ? copy.decide.headsLabel : copy.decide.tailsLabel

  return (
    <svg
      className="decide-coin-art"
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${id}-metal`} cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#f0e2c4" />
          <stop offset="42%" stopColor="#c4a574" />
          <stop offset="78%" stopColor="#8a6a3e" />
          <stop offset="100%" stopColor="#4a3824" />
        </radialGradient>
        <radialGradient id={`${id}-core`} cx="46%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#ead9b8" />
          <stop offset="100%" stopColor="#b08962" />
        </radialGradient>
        <pattern
          id={`${id}-hatch`}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <path d="M0 1.1H7" stroke="#0c0b09" strokeWidth="0.4" opacity="0.28" />
        </pattern>
        <pattern id={`${id}-stipple`} width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.4" r="0.38" fill="#0c0b09" />
          <circle cx="3.5" cy="3.3" r="0.26" fill="#0c0b09" />
        </pattern>
        <clipPath id={`${id}-disk`}>
          <circle cx="160" cy="160" r="148" />
        </clipPath>
      </defs>

      <circle cx="160" cy="160" r="156" fill="#3a3228" />
      <circle cx="160" cy="160" r="152" fill={`url(#${id}-metal)`} stroke="#0c0b09" strokeWidth="3" />
      <circle cx="160" cy="160" r="144" fill="none" stroke="#0c0b09" strokeWidth="1.2" opacity="0.55" />
      <circle cx="160" cy="160" r="136" fill={`url(#${id}-core)`} stroke="#0c0b09" strokeWidth="1.6" />

      <g clipPath={`url(#${id}-disk)`} opacity="0.34">
        <rect width="320" height="320" fill={`url(#${id}-hatch)`} />
        <rect width="320" height="320" fill={`url(#${id}-stipple)`} />
      </g>

      {Array.from({ length: 72 }, (_, index) => {
        const angle = (index / 72) * Math.PI * 2
        const inner = index % 6 === 0 ? 140 : 144
        return (
          <line
            key={index}
            x1={160 + Math.cos(angle) * inner}
            y1={160 + Math.sin(angle) * inner}
            x2={160 + Math.cos(angle) * 150}
            y2={160 + Math.sin(angle) * 150}
            stroke="#0c0b09"
            strokeWidth={index % 6 === 0 ? 1.5 : 0.7}
            opacity="0.72"
          />
        )
      })}

      <circle cx="160" cy="160" r="112" fill="none" stroke="#0c0b09" strokeWidth="1.1" opacity="0.45" />
      <circle cx="160" cy="160" r="104" fill="#d8c49a" stroke="#0c0b09" strokeWidth="1.4" />
      <circle cx="160" cy="160" r="104" fill={`url(#${id}-hatch)`} opacity="0.18" />

      {heads ? (
        <g className="decide-emblem">
          <ellipse cx="160" cy="168" rx="38" ry="48" fill="#cbbfa8" stroke="#0c0b09" strokeWidth="1.6" />
          <path
            d="M132 156C138 128 182 128 188 156C190 168 186 176 180 184C174 176 146 176 140 184C134 176 130 168 132 156Z"
            fill="#ead9b8"
            stroke="#0c0b09"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <path
            d="M126 152C132 138 148 132 160 132C172 132 188 138 194 152C200 148 204 142 198 134C184 122 136 122 122 134C116 142 120 148 126 152Z"
            fill="#5c1c1c"
            stroke="#0c0b09"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M148 170C152 176 168 176 172 170" stroke="#0c0b09" strokeWidth="1.1" />
          <path d="M160 148V158" stroke="#0c0b09" strokeWidth="1" opacity="0.7" />
          <text
            x="160"
            y="86"
            textAnchor="middle"
            fill="#0c0b09"
            fontSize="15"
            letterSpacing="0.28em"
            className="decide-coin-label"
          >
            {label}
          </text>
          <text
            x="160"
            y="246"
            textAnchor="middle"
            fill="#5c1c1c"
            fontSize="13"
            letterSpacing="0.34em"
            className="decide-coin-label"
          >
            A · S
          </text>
        </g>
      ) : (
        <g className="decide-emblem">
          {Array.from({ length: 16 }, (_, index) => {
            const angle = (index / 16) * Math.PI * 2
            return (
              <line
                key={index}
                x1="160"
                y1="160"
                x2={160 + Math.cos(angle) * 78}
                y2={160 + Math.sin(angle) * 78}
                stroke="#0c0b09"
                strokeWidth="0.7"
                opacity="0.42"
              />
            )
          })}
          <circle cx="160" cy="160" r="28" fill="#cbbfa8" stroke="#0c0b09" strokeWidth="1.5" />
          <path
            d="M160 138L166 154H183L169 164L174 181L160 171L146 181L151 164L137 154H154Z"
            fill="#5c1c1c"
            stroke="#0c0b09"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M96 160C112 128 208 128 224 160C208 192 112 192 96 160Z"
            fill="none"
            stroke="#0c0b09"
            strokeWidth="1.1"
            opacity="0.55"
          />
          <text
            x="160"
            y="86"
            textAnchor="middle"
            fill="#0c0b09"
            fontSize="15"
            letterSpacing="0.28em"
            className="decide-coin-label"
          >
            {label}
          </text>
          <text
            x="160"
            y="246"
            textAnchor="middle"
            fill="#3a3228"
            fontSize="12"
            letterSpacing="0.22em"
            className="decide-coin-label"
          >
            FORTUNE
          </text>
        </g>
      )}

      <path
        d="M48 128C72 70 120 42 160 40"
        stroke="#ead9b8"
        strokeWidth="6"
        opacity="0.22"
        strokeLinecap="round"
      />
      <circle cx="160" cy="160" r="152" fill="none" stroke="#0c0b09" strokeWidth="2.2" />
    </svg>
  )
}
