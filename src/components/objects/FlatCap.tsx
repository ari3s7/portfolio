import { useId } from 'react'

export function FlatCap() {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      className="flat-cap"
      viewBox="0 0 720 360"
      fill="none"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`${id}-wool`}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(32)"
        >
          <path d="M0 0.7H5" stroke="#0d0c0a" strokeWidth="0.7" />
        </pattern>
        <pattern
          id={`${id}-cross`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-38)"
        >
          <path d="M0 0.85H6" stroke="#0d0c0a" strokeWidth="0.5" />
        </pattern>
        <pattern
          id={`${id}-dense`}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(48)"
        >
          <path d="M0 0.55H4" stroke="#0c0b09" strokeWidth="0.95" />
        </pattern>
        <pattern
          id={`${id}-stipple`}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.1" cy="1.8" r="0.45" fill="#0d0c0a" />
          <circle cx="5.4" cy="4.6" r="0.35" fill="#0d0c0a" />
          <circle cx="3.2" cy="6.8" r="0.3" fill="#0d0c0a" />
        </pattern>
        <clipPath id={`${id}-crown`}>
          <path d="M92 168C98 236 196 274 360 280C524 274 622 234 628 166C622 228 518 284 360 290C200 284 92 226 92 168Z" />
        </clipPath>
        <clipPath id={`${id}-deck`}>
          <ellipse cx="360" cy="148" rx="258" ry="78" />
        </clipPath>
        <clipPath id={`${id}-peak`}>
          <path d="M168 248C198 304 270 338 360 344C450 338 522 304 552 248C520 276 448 298 360 302C270 298 198 276 168 248Z" />
        </clipPath>
        <clipPath id={`${id}-front`}>
          <path d="M150 176C186 228 262 258 360 262C458 258 534 226 570 176C536 198 456 218 360 222C262 218 184 198 150 176Z" />
        </clipPath>
      </defs>

      <g className="cap-sketch">
        <ellipse
          cx="360"
          cy="150"
          rx="266"
          ry="86"
          stroke="#6e5748"
          strokeWidth="1.15"
          strokeDasharray="5 7"
          opacity="0.34"
        />
        <path
          d="M148 252C214 324 292 354 360 358C436 354 518 320 572 252"
          stroke="#6e5748"
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.28"
        />
        <path
          d="M210 102C276 68 322 60 360 60C408 62 468 74 522 108"
          stroke="#6e5748"
          strokeWidth="0.9"
          strokeDasharray="3 5"
          opacity="0.26"
        />
      </g>

      <g className="cap-fill">
        <path
          d="M168 248C196 304 270 340 360 346C450 340 524 304 552 248C520 276 448 298 360 302C270 298 196 276 168 248Z"
          fill="#7a6b58"
        />
        <path
          d="M92 168C98 236 196 274 360 280C524 274 622 234 628 166C622 228 518 284 360 290C200 284 92 226 92 168Z"
          fill="#9a8b74"
        />
        <ellipse cx="360" cy="148" rx="258" ry="78" fill="#c4b496" />
        <path
          d="M150 176C186 228 262 258 360 262C458 258 534 226 570 176C536 198 456 218 360 222C262 218 184 198 150 176Z"
          fill="#8d7e6a"
        />
        <path
          d="M188 214C220 250 284 272 360 274C436 272 500 248 532 214C500 228 436 242 360 244C282 242 220 228 188 214Z"
          fill="#6e6252"
        />
      </g>

      <g className="cap-hatch">
        <g clipPath={`url(#${id}-peak)`} opacity="0.78">
          <rect x="150" y="230" width="420" height="130" fill={`url(#${id}-dense)`} />
          <rect x="150" y="230" width="420" height="130" fill={`url(#${id}-cross)`} />
        </g>
        <g clipPath={`url(#${id}-front)`} opacity="0.62">
          <rect x="140" y="170" width="440" height="110" fill={`url(#${id}-wool)`} />
          <rect x="140" y="170" width="440" height="110" fill={`url(#${id}-cross)`} />
        </g>
        <g clipPath={`url(#${id}-crown)`} opacity="0.5">
          <rect x="80" y="150" width="560" height="150" fill={`url(#${id}-wool)`} />
        </g>
        <g clipPath={`url(#${id}-deck)`} opacity="0.34">
          <rect x="90" y="60" width="540" height="170" fill={`url(#${id}-stipple)`} />
          <rect x="90" y="60" width="540" height="170" fill={`url(#${id}-wool)`} />
        </g>
      </g>

      <g className="cap-outline" fill="none" stroke="#0c0b09" strokeLinecap="round" strokeLinejoin="round">
        <path
          pathLength="1"
          d="M166 250C190 302 268 340 358 348C452 342 528 302 554 246C522 274 448 296 360 300C270 296 196 274 166 250Z"
          strokeWidth="2.7"
        />
        <path
          pathLength="1"
          d="M178 242C204 276 276 310 362 312C448 310 518 274 542 238"
          strokeWidth="1.65"
        />
        <path
          pathLength="1"
          d="M90 170C100 228 198 274 358 280C518 272 632 224 632 164"
          strokeWidth="2.8"
        />
        <path
          pathLength="1"
          d="M90 170C110 112 214 58 358 54C514 58 616 112 632 164"
          strokeWidth="2.4"
        />
        <path
          pathLength="1"
          d="M118 196C188 240 268 262 362 266C456 262 536 238 604 192"
          strokeWidth="1.3"
          opacity="0.85"
        />
      </g>

      <g className="cap-detail" stroke="#0c0b09" strokeLinecap="round" fill="none">
        <path d="M360 118L168 186" strokeWidth="1.55" />
        <path d="M360 118L214 214" strokeWidth="1.15" />
        <path d="M360 116L248 236" strokeWidth="1.05" />
        <path d="M360 116L360 228" strokeWidth="1.35" />
        <path d="M360 116L472 234" strokeWidth="1.05" />
        <path d="M360 118L506 210" strokeWidth="1.15" />
        <path d="M360 118L554 184" strokeWidth="1.5" />
        <path
          d="M188 114C256 78 308 70 360 70C420 72 474 82 536 116"
          strokeWidth="1.1"
          opacity="0.8"
        />
        <path
          d="M210 138C268 108 318 98 360 98C410 100 458 112 514 140"
          strokeWidth="0.85"
          opacity="0.55"
        />
        <ellipse cx="360" cy="116" rx="13.5" ry="9" fill="#1c1814" strokeWidth="1.85" />
        <ellipse cx="357.2" cy="113.6" rx="4.1" ry="2.4" fill="#d7cbb4" stroke="none" opacity="0.42" />
        <path d="M148 228C164 240 150 248 138 240" strokeWidth="1.2" opacity="0.74" />
        <path d="M572 220C586 210 596 228 580 234" strokeWidth="1.1" opacity="0.68" />
        <circle cx="228" cy="158" r="1.25" fill="#0c0b09" stroke="none" />
        <circle cx="468" cy="172" r="1" fill="#0c0b09" stroke="none" />
        <circle cx="292" cy="206" r="0.9" fill="#0c0b09" stroke="none" />
        <circle cx="412" cy="192" r="0.75" fill="#0c0b09" stroke="none" />
        <circle cx="198" cy="136" r="0.65" fill="#0c0b09" stroke="none" />
        <circle cx="540" cy="148" r="0.7" fill="#0c0b09" stroke="none" />
      </g>
    </svg>
  )
}
