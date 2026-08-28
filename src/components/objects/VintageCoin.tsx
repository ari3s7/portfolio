import { useId } from 'react'
import { copy } from '@/data'

type CoinFace = 'heads' | 'tails'

type VintageCoinFaceProps = {
  face: CoinFace
}

const REEDS = 120
const BEADS = 72

function polar(cx: number, cy: number, radius: number, angle: number) {
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
  }
}

export function VintageCoinFace({ face }: VintageCoinFaceProps) {
  const id = useId().replace(/:/g, '')
  const heads = face === 'heads'
  const label = heads ? copy.decide.headsLabel : copy.decide.tailsLabel

  return (
    <svg
      className="decide-coin-art"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${id}-disk`} cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#c8ae7a" />
          <stop offset="18%" stopColor="#9a7548" />
          <stop offset="46%" stopColor="#6d4e2c" />
          <stop offset="74%" stopColor="#3f2a18" />
          <stop offset="100%" stopColor="#1a120c" />
        </radialGradient>
        <radialGradient id={`${id}-field`} cx="42%" cy="36%" r="68%">
          <stop offset="0%" stopColor="#8a6640" />
          <stop offset="42%" stopColor="#5c4026" />
          <stop offset="100%" stopColor="#2a1c12" />
        </radialGradient>
        <radialGradient id={`${id}-rim`} cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#d2b07a" />
          <stop offset="38%" stopColor="#8a6238" />
          <stop offset="100%" stopColor="#2c1c10" />
        </radialGradient>
        <linearGradient id={`${id}-reed`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2c898" />
          <stop offset="45%" stopColor="#6a4a2a" />
          <stop offset="100%" stopColor="#1c120c" />
        </linearGradient>
        <radialGradient id={`${id}-cut`} cx="40%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#4a3420" />
          <stop offset="100%" stopColor="#120c08" />
        </radialGradient>
        <linearGradient id={`${id}-raise`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#e6d0a4" />
          <stop offset="48%" stopColor="#8a6640" />
          <stop offset="100%" stopColor="#2a1c12" />
        </linearGradient>
        <pattern
          id={`${id}-grain`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(18)"
        >
          <path d="M0 1.1H6" stroke="#0c0b09" strokeWidth="0.35" opacity="0.34" />
          <path d="M0 4.2H6" stroke="#ead3a8" strokeWidth="0.2" opacity="0.08" />
        </pattern>
        <pattern id={`${id}-pits`} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="2" r="0.42" fill="#0c0b09" opacity="0.55" />
          <circle cx="6.2" cy="5.4" r="0.28" fill="#0c0b09" opacity="0.4" />
          <circle cx="4.1" cy="7.6" r="0.22" fill="#ead3a8" opacity="0.16" />
        </pattern>
        <pattern
          id={`${id}-hatch`}
          width="4.5"
          height="4.5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(38)"
        >
          <path d="M0 0.7H4.5" stroke="#0c0b09" strokeWidth="0.38" opacity="0.42" />
        </pattern>
        <pattern
          id={`${id}-cross`}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-32)"
        >
          <path d="M0 0.8H5" stroke="#0c0b09" strokeWidth="0.28" opacity="0.28" />
        </pattern>
        <clipPath id={`${id}-disk`}>
          <circle cx="200" cy="200" r="186" />
        </clipPath>
        <clipPath id={`${id}-field`}>
          <circle cx="200" cy="200" r="132" />
        </clipPath>
        <clipPath id={`${id}-bust`}>
          <path d="M174 128C182 100 214 88 238 98C258 106 270 128 260 152C252 142 230 134 208 136C196 138 186 142 178 136C168 140 148 148 130 158C116 166 106 178 102 192C120 184 148 172 168 162C162 172 150 184 138 194C126 204 118 216 120 228C126 230 136 230 144 234C148 240 148 248 144 254C150 266 164 278 180 282C194 286 208 280 216 270C220 282 214 298 202 310C190 318 174 318 162 310C150 300 146 284 150 270C146 260 148 248 156 238C166 228 178 216 184 200C198 196 212 182 208 164C214 156 218 144 210 134C200 124 186 124 174 128Z" />
        </clipPath>
        <path
          id={`${id}-legend`}
          d="M86 176A122 122 0 0 1 314 176"
          fill="none"
        />
      </defs>

      <circle cx="200" cy="200" r="198" fill="#1a120c" />
      <circle cx="200" cy="200" r="192" fill={`url(#${id}-rim)`} />
      <circle cx="200" cy="200" r="186" fill={`url(#${id}-disk)`} stroke="#0c0b09" strokeWidth="2.2" />

      {Array.from({ length: REEDS }, (_, index) => {
        const angle = (index / REEDS) * Math.PI * 2
        const inner = polar(200, 200, 180, angle)
        const outer = polar(200, 200, 193, angle)
        return (
          <line
            key={`reed-${index}`}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke={index % 2 === 0 ? `url(#${id}-reed)` : '#1c120c'}
            strokeWidth={index % 3 === 0 ? 2.4 : 1.5}
            strokeLinecap="butt"
            opacity="0.92"
          />
        )
      })}

      <circle cx="200" cy="200" r="176" fill="none" stroke="#ead3a8" strokeWidth="1.1" opacity="0.18" />
      <circle cx="200" cy="200" r="172" fill="none" stroke="#0c0b09" strokeWidth="2.4" />
      <circle cx="200" cy="200" r="166" fill="none" stroke="#c4a06a" strokeWidth="1.2" opacity="0.35" />

      {Array.from({ length: BEADS }, (_, index) => {
        const point = polar(200, 200, 159, (index / BEADS) * Math.PI * 2)
        return (
          <circle
            key={`bead-${index}`}
            cx={point.x}
            cy={point.y}
            r={index % 12 === 0 ? 2.4 : 1.9}
            fill={`url(#${id}-raise)`}
            stroke="#0c0b09"
            strokeWidth="0.55"
          />
        )
      })}

      <circle cx="200" cy="200" r="146" fill="none" stroke="#0c0b09" strokeWidth="2.8" />
      <circle cx="200" cy="200" r="142" fill="none" stroke="#d2b07a" strokeWidth="1.1" opacity="0.28" />
      <circle cx="200" cy="200" r="136" fill={`url(#${id}-field)`} stroke="#0c0b09" strokeWidth="1.6" />

      <g clipPath={`url(#${id}-disk)`} opacity="0.42">
        <rect width="400" height="400" fill={`url(#${id}-grain)`} />
        <rect width="400" height="400" fill={`url(#${id}-pits)`} />
      </g>

      <g clipPath={`url(#${id}-field)`} opacity="0.22">
        <rect width="400" height="400" fill={`url(#${id}-cross)`} />
      </g>

      <ellipse cx="118" cy="96" rx="42" ry="18" fill="#1a120c" opacity="0.2" transform="rotate(-28 118 96)" />
      <ellipse cx="286" cy="268" rx="48" ry="22" fill="#5c1c1c" opacity="0.1" transform="rotate(18 286 268)" />
      <path
        d="M64 168C92 92 148 58 196 54"
        stroke="#ead3a8"
        strokeWidth="7"
        opacity="0.16"
        strokeLinecap="round"
      />

      <text className="decide-coin-label" fill="#1a120c">
        <textPath href={`#${id}-legend`} startOffset="50%" textAnchor="middle" fontSize="17" letterSpacing="0.34em">
          {label}
        </textPath>
      </text>
      <text className="decide-coin-label" fill="#c4a06a" opacity="0.35">
        <textPath href={`#${id}-legend`} startOffset="50%" textAnchor="middle" fontSize="17" letterSpacing="0.34em">
          {label}
        </textPath>
      </text>

      {heads ? <HeadsEmblem id={id} /> : <TailsEmblem id={id} />}

      <text
        x="200"
        y="318"
        textAnchor="middle"
        fill="#1a120c"
        fontSize="13"
        letterSpacing="0.38em"
        className="decide-coin-label"
      >
        A · S
      </text>
      <text
        x="200"
        y="317"
        textAnchor="middle"
        fill="#d2b07a"
        fontSize="13"
        letterSpacing="0.38em"
        opacity="0.28"
        className="decide-coin-label"
      >
        A · S
      </text>

      <g clipPath={`url(#${id}-disk)`} pointerEvents="none">
        <path d="M48 210C70 188 92 206 70 228" stroke="#ead3a8" strokeWidth="0.6" opacity="0.18" />
        <path d="M250 52C268 70 310 78 330 64" stroke="#0c0b09" strokeWidth="0.7" opacity="0.28" />
        <path d="M300 250C318 262 340 248 348 268" stroke="#0c0b09" strokeWidth="0.55" opacity="0.22" />
        <path d="M80 300C110 288 132 312 108 330" stroke="#ead3a8" strokeWidth="0.45" opacity="0.12" />
      </g>

      <circle cx="200" cy="200" r="186" fill="none" stroke="#0c0b09" strokeWidth="2.4" />
      <circle cx="200" cy="200" r="198" fill="none" stroke="#0c0b09" strokeWidth="1.6" />
    </svg>
  )
}

function HeadsEmblem({ id }: { id: string }) {
  return (
    <g className="decide-emblem">
      <path
        d="M174 128C182 100 214 88 238 98C258 106 270 128 260 152C252 142 230 134 208 136C196 138 186 142 178 136C168 140 148 148 130 158C116 166 106 178 102 192C120 184 148 172 168 162C162 172 150 184 138 194C126 204 118 216 120 228C126 230 136 230 144 234C148 240 148 248 144 254C150 266 164 278 180 282C194 286 208 280 216 270C220 282 214 298 202 310C190 318 174 318 162 310C150 300 146 284 150 270C146 260 148 248 156 238C166 228 178 216 184 200C198 196 212 182 208 164C214 156 218 144 210 134C200 124 186 124 174 128Z"
        fill={`url(#${id}-cut)`}
        stroke="#0c0b09"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <g clipPath={`url(#${id}-bust)`}>
        <rect width="400" height="400" fill={`url(#${id}-hatch)`} opacity="0.55" />
        <rect width="400" height="400" fill={`url(#${id}-cross)`} opacity="0.28" />
      </g>

      <path
        d="M174 128C182 100 214 88 238 98C258 106 270 128 260 152C252 142 230 134 208 136C196 138 186 142 178 136"
        fill={`url(#${id}-raise)`}
        stroke="#0c0b09"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      <path
        d="M130 158C116 166 106 178 102 192C120 184 148 172 168 162C162 152 148 150 130 158Z"
        fill="#2a1c12"
        stroke="#0c0b09"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M226 110C234 114 242 124 240 134"
        stroke="#ead3a8"
        strokeWidth="1.4"
        opacity="0.28"
        strokeLinecap="round"
      />
      <circle cx="224" cy="110" r="3.2" fill="#3a2818" stroke="#0c0b09" strokeWidth="0.8" />

      <path
        d="M166 142C158 154 146 168 134 180C126 190 120 202 124 214C132 216 142 216 150 222"
        fill="none"
        stroke="#0c0b09"
        strokeWidth="1.15"
      />
      <path
        d="M138 190C132 196 126 204 126 212"
        fill="none"
        stroke="#ead3a8"
        strokeWidth="1.35"
        opacity="0.34"
        strokeLinecap="round"
      />
      <path d="M144 222C148 228 146 236 142 242" stroke="#0c0b09" strokeWidth="1.05" />
      <path d="M152 230C158 234 166 234 172 230" stroke="#0c0b09" strokeWidth="0.9" />
      <path
        d="M184 200C196 194 206 180 202 166C196 154 184 148 174 152"
        fill="none"
        stroke="#0c0b09"
        strokeWidth="1.1"
      />
      <path
        d="M196 176C202 170 206 162 202 154"
        fill="none"
        stroke="#ead3a8"
        strokeWidth="1.1"
        opacity="0.24"
      />
      <path
        d="M166 238C174 252 166 268 154 274C166 280 184 278 194 268C190 256 184 246 176 238"
        fill="#24180f"
        stroke="#0c0b09"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M162 250C170 256 182 256 190 250" stroke="#0c0b09" strokeWidth="0.85" />
      <path d="M156 264C168 270 184 268 194 260" stroke="#0c0b09" strokeWidth="0.8" />

      <path
        d="M92 200C104 186 118 200 108 214C100 208 96 204 92 200Z"
        fill={`url(#${id}-raise)`}
        stroke="#0c0b09"
        strokeWidth="1"
      />
      <path
        d="M308 200C296 186 282 200 292 214C300 208 304 204 308 200Z"
        fill={`url(#${id}-raise)`}
        stroke="#0c0b09"
        strokeWidth="1"
      />
    </g>
  )
}

function TailsEmblem({ id }: { id: string }) {
  return (
    <g className="decide-emblem">
      {Array.from({ length: 24 }, (_, index) => {
        const angle = (index / 24) * Math.PI * 2
        const inner = polar(200, 200, 38, angle)
        const outer = polar(200, 200, 78, angle)
        return (
          <line
            key={`ray-${index}`}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="#0c0b09"
            strokeWidth={index % 3 === 0 ? 1.15 : 0.55}
            opacity="0.38"
          />
        )
      })}

      <path
        d="M200 108C186 132 168 148 146 158C168 166 186 184 200 208C214 184 232 166 254 158C232 148 214 132 200 108Z"
        fill={`url(#${id}-raise)`}
        stroke="#0c0b09"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="200" cy="158" r="26" fill={`url(#${id}-cut)`} stroke="#0c0b09" strokeWidth="1.4" />
      <circle cx="200" cy="158" r="18" fill="none" stroke="#d2b07a" strokeWidth="0.8" opacity="0.28" />
      <path
        d="M200 144L204 154H216L206 160L210 172L200 164L190 172L194 160L184 154H196Z"
        fill="#2a1c12"
        stroke="#0c0b09"
        strokeWidth="1.05"
        strokeLinejoin="round"
      />

      <path
        d="M118 168C128 148 148 138 164 146C150 154 140 168 138 186C128 180 118 176 118 168Z"
        fill="#2a1c12"
        stroke="#0c0b09"
        strokeWidth="1.15"
      />
      <path
        d="M282 168C272 148 252 138 236 146C250 154 260 168 262 186C272 180 282 176 282 168Z"
        fill="#2a1c12"
        stroke="#0c0b09"
        strokeWidth="1.15"
      />
      <path
        d="M126 214C140 236 166 250 186 246C168 234 152 220 146 202C136 206 128 210 126 214Z"
        fill="#2a1c12"
        stroke="#0c0b09"
        strokeWidth="1.1"
      />
      <path
        d="M274 214C260 236 234 250 214 246C232 234 248 220 254 202C264 206 272 210 274 214Z"
        fill="#2a1c12"
        stroke="#0c0b09"
        strokeWidth="1.1"
      />

      <path
        d="M92 200C104 186 118 200 108 214C100 208 96 204 92 200Z"
        fill={`url(#${id}-raise)`}
        stroke="#0c0b09"
        strokeWidth="1"
      />
      <path
        d="M308 200C296 186 282 200 292 214C300 208 304 204 308 200Z"
        fill={`url(#${id}-raise)`}
        stroke="#0c0b09"
        strokeWidth="1"
      />
    </g>
  )
}
