import { useId } from 'react'

type WatchMark = {
  id: string
  year: string
  angle: number
}

type PocketWatchProps = {
  marks: WatchMark[]
}

export function PocketWatch({ marks }: PocketWatchProps) {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      className="pocket-watch"
      viewBox="0 -130 420 670"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={`${id}-brass`}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <path d="M0 1.1H8" stroke="#0c0b09" strokeWidth="0.45" opacity="0.35" />
        </pattern>
        <pattern
          id={`${id}-face`}
          width="10"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 3H10" stroke="#0c0b09" strokeWidth="0.3" opacity="0.18" />
        </pattern>
        <pattern
          id={`${id}-stipple`}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.1" cy="1.4" r="0.4" fill="#0c0b09" />
          <circle cx="3.6" cy="3.2" r="0.28" fill="#0c0b09" />
        </pattern>
        <clipPath id={`${id}-case`}>
          <circle cx="210" cy="292" r="148" />
        </clipPath>
        <clipPath id={`${id}-face`}>
          <circle cx="210" cy="292" r="108" />
        </clipPath>
      </defs>

      <g className="watch-chain" stroke="#0c0b09" fill="none" strokeLinecap="round">
        <circle cx="210" cy="38" r="16" strokeWidth="2.2" />
        <circle cx="210" cy="38" r="7" strokeWidth="1.3" />
        <path d="M210 54V78" strokeWidth="2" />
        <path d="M198 78H222" strokeWidth="1.6" />
        <path d="M194 42C168 58 156 86 148 118" strokeWidth="1.5" opacity="0.85" />
        <circle cx="148" cy="122" r="3.2" fill="#a68654" stroke="#0c0b09" strokeWidth="1.1" />
        <circle cx="162" cy="72" r="3" fill="#a68654" stroke="#0c0b09" strokeWidth="1.1" />
      </g>

      <g className="watch-bow" fill="#a68654" stroke="#0c0b09" strokeLinejoin="round">
        <path d="M186 78H234L228 102H192Z" strokeWidth="1.9" />
        <rect x="198" y="88" width="24" height="8" fill={`url(#${id}-brass)`} opacity="0.45" />
      </g>

      <g className="watch-case">
        <circle cx="210" cy="292" r="152" fill="#6b5748" stroke="#0c0b09" strokeWidth="2.4" />
        <circle cx="210" cy="292" r="148" fill="#a68654" />
        <g clipPath={`url(#${id}-case)`} opacity="0.32">
          <rect x="50" y="130" width="320" height="330" fill={`url(#${id}-brass)`} />
          <rect x="50" y="130" width="320" height="330" fill={`url(#${id}-stipple)`} />
        </g>
        <circle cx="210" cy="292" r="148" fill="none" stroke="#0c0b09" strokeWidth="2.2" />
        <circle cx="210" cy="292" r="138" fill="none" stroke="#0c0b09" strokeWidth="0.7" opacity="0.45" />
        <path
          d="M92 214C110 180 96 250 118 238"
          stroke="#0c0b09"
          strokeWidth="0.8"
          opacity="0.35"
        />
        <path
          d="M318 360C340 390 328 330 352 348"
          stroke="#0c0b09"
          strokeWidth="0.7"
          opacity="0.3"
        />
        <path d="M78 300H92" stroke="#0c0b09" strokeWidth="0.9" opacity="0.4" />
        <path d="M328 268H346" stroke="#0c0b09" strokeWidth="0.8" opacity="0.35" />
        <path d="M250 168C270 176 292 198 304 214" stroke="#0c0b09" strokeWidth="0.55" opacity="0.28" />
      </g>

      <g className="watch-hinge" fill="#8a7358" stroke="#0c0b09" strokeLinejoin="round">
        <rect x="196" y="136" width="28" height="12" rx="2.2" strokeWidth="1.5" />
        <rect x="200" y="139" width="20" height="6" rx="1.2" fill="#cbbfa8" strokeWidth="0.8" />
        <circle cx="204" cy="142" r="1.5" fill="#3a3228" stroke="none" />
        <circle cx="216" cy="142" r="1.5" fill="#3a3228" stroke="none" />
      </g>

      <g className="watch-gears" opacity="0.9">
        <g className="watch-gear-a">
          <circle cx="132" cy="400" r="22" fill="#8a7358" stroke="#0c0b09" strokeWidth="1.5" />
          <circle cx="132" cy="400" r="6" fill="#3a3228" stroke="#0c0b09" strokeWidth="1.1" />
          {Array.from({ length: 10 }, (_, index) => {
            const angle = (index / 10) * Math.PI * 2
            const x = 132 + Math.cos(angle) * 22
            const y = 400 + Math.sin(angle) * 22
            return (
              <rect
                key={index}
                x={x - 2.2}
                y={y - 3.4}
                width="4.4"
                height="6.8"
                fill="#8a7358"
                stroke="#0c0b09"
                strokeWidth="0.6"
                transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`}
              />
            )
          })}
        </g>
        <g className="watch-gear-b">
          <circle cx="178" cy="422" r="15" fill="#b08962" stroke="#0c0b09" strokeWidth="1.3" />
          <circle cx="178" cy="422" r="4" fill="#3a3228" stroke="#0c0b09" strokeWidth="0.9" />
          {Array.from({ length: 8 }, (_, index) => {
            const angle = (index / 8) * Math.PI * 2
            const x = 178 + Math.cos(angle) * 15
            const y = 422 + Math.sin(angle) * 15
            return (
              <rect
                key={index}
                x={x - 1.6}
                y={y - 2.6}
                width="3.2"
                height="5.2"
                fill="#b08962"
                stroke="#0c0b09"
                strokeWidth="0.5"
                transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`}
              />
            )
          })}
        </g>
      </g>

      <g className="watch-face">
        <circle cx="210" cy="292" r="112" fill="#e8d8bc" stroke="#0c0b09" strokeWidth="1.8" />
        <g clipPath={`url(#${id}-face)`} opacity="0.28">
          <rect x="90" y="170" width="240" height="240" fill={`url(#${id}-face)`} />
        </g>
        <circle cx="210" cy="292" r="102" fill="none" stroke="#0c0b09" strokeWidth="0.6" opacity="0.35" />

        {['XII', 'III', 'VI', 'IX'].map((label, index) => {
          const angle = (index * Math.PI) / 2 - Math.PI / 2
          const x = 210 + Math.cos(angle) * 78
          const y = 292 + Math.sin(angle) * 78 + 5
          return (
            <text
              key={label}
              x={x}
              y={y}
              textAnchor="middle"
              fill="#0c0b09"
              fontSize="13"
              letterSpacing="0.12em"
              className="watch-numeral"
            >
              {label}
            </text>
          )
        })}

        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index / 12) * Math.PI * 2 - Math.PI / 2
          const inner = index % 3 === 0 ? 92 : 96
          return (
            <line
              key={index}
              x1={210 + Math.cos(angle) * inner}
              y1={292 + Math.sin(angle) * inner}
              x2={210 + Math.cos(angle) * 104}
              y2={292 + Math.sin(angle) * 104}
              stroke="#0c0b09"
              strokeWidth={index % 3 === 0 ? 1.6 : 0.7}
            />
          )
        })}

        {marks.map((mark) => {
          const radian = (mark.angle * Math.PI) / 180 - Math.PI / 2
          return (
            <g key={mark.id} className="watch-mark" data-mark={mark.id}>
              <circle
                cx={210 + Math.cos(radian) * 118}
                cy={292 + Math.sin(radian) * 118}
                r="4.2"
                fill="#5c1c1c"
                stroke="#0c0b09"
                strokeWidth="0.8"
              />
              <text
                x={210 + Math.cos(radian) * 134}
                y={292 + Math.sin(radian) * 134 + 4}
                textAnchor="middle"
                fill="#5c1c1c"
                fontSize="9"
                letterSpacing="0.08em"
                className="watch-mark-year"
              >
                {mark.year}
              </text>
            </g>
          )
        })}
      </g>

      <g className="watch-hands">
        <g className="watch-hand-hour">
          <path
            d="M208.2 292L210 226L211.8 292L210 308Z"
            fill="#0c0b09"
            stroke="#0c0b09"
            strokeWidth="0.4"
            strokeLinejoin="round"
          />
        </g>
        <g className="watch-hand-minute">
          <path
            d="M208.8 292L210 204L211.2 292L210 312Z"
            fill="#5c1c1c"
            stroke="#0c0b09"
            strokeWidth="0.45"
            strokeLinejoin="round"
          />
        </g>
        <circle cx="210" cy="292" r="6.5" fill="#3a3228" stroke="#0c0b09" strokeWidth="1.2" />
        <circle cx="210" cy="292" r="2.2" fill="#e8d8bc" />
      </g>

      <g className="watch-lid">
        <circle cx="210" cy="292" r="148" fill="#8f7a62" stroke="#0c0b09" strokeWidth="2.2" />
        <g clipPath={`url(#${id}-case)`} opacity="0.38">
          <rect x="50" y="130" width="320" height="330" fill={`url(#${id}-brass)`} />
          <rect x="50" y="130" width="320" height="330" fill={`url(#${id}-stipple)`} />
        </g>
        <circle cx="210" cy="292" r="128" fill="none" stroke="#0c0b09" strokeWidth="0.8" opacity="0.4" />
        <circle cx="210" cy="292" r="118" fill="none" stroke="#0c0b09" strokeWidth="1.1" opacity="0.55" />
        <circle cx="210" cy="248" r="22" fill="#cbbfa8" stroke="#0c0b09" strokeWidth="1.3" />
        <path d="M210 232V264" stroke="#0c0b09" strokeWidth="0.8" />
        <path d="M194 248H226" stroke="#0c0b09" strokeWidth="0.8" />
        <path
          d="M120 200C150 160 270 160 300 200"
          stroke="#0c0b09"
          strokeWidth="0.7"
          opacity="0.28"
        />
        <path d="M98 250C90 280 96 320 108 350" stroke="#0c0b09" strokeWidth="0.6" opacity="0.25" />
        <path d="M300 248C312 270 318 300 312 332" stroke="#0c0b09" strokeWidth="0.55" opacity="0.22" />
      </g>
    </svg>
  )
}
