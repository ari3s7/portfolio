import { useId } from 'react'

export function Cigarette() {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      className="cigarette-mark"
      viewBox="0 0 360 86"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={`${id}-cork`}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(18)"
        >
          <path d="M0 0.7H5" stroke="#0c0b09" strokeWidth="0.45" opacity="0.5" />
        </pattern>
        <pattern
          id={`${id}-paper`}
          width="11"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 3H11" stroke="#0c0b09" strokeWidth="0.35" opacity="0.22" />
        </pattern>
        <pattern
          id={`${id}-tobacco`}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1.2" r="0.45" fill="#0c0b09" />
          <circle cx="2.8" cy="2.6" r="0.35" fill="#0c0b09" />
        </pattern>
        <clipPath id={`${id}-filter`}>
          <rect x="18" y="28" width="72" height="30" rx="2" />
        </clipPath>
        <clipPath id={`${id}-body`}>
          <rect x="88" y="29" width="232" height="28" />
        </clipPath>
        <clipPath id={`${id}-tip`}>
          <rect x="318" y="30" width="16" height="26" />
        </clipPath>
      </defs>

      <g className="cig-sketch">
        <rect
          x="16"
          y="26"
          width="322"
          height="34"
          stroke="#6b5748"
          strokeWidth="0.85"
          strokeDasharray="4 6"
          opacity="0.32"
        />
      </g>

      <g className="cig-fill">
        <rect x="18" y="28" width="72" height="30" fill="#b08962" />
        <rect x="88" y="29" width="232" height="28" fill="#e4d6bc" />
        <rect className="cig-tip-fill" x="318" y="30" width="16" height="26" fill="#3a3228" />
      </g>

      <g className="cig-hatch">
        <g clipPath={`url(#${id}-filter)`} opacity="0.42">
          <rect x="18" y="28" width="72" height="30" fill={`url(#${id}-cork)`} />
        </g>
        <g clipPath={`url(#${id}-body)`} opacity="0.28">
          <rect x="88" y="29" width="232" height="28" fill={`url(#${id}-paper)`} />
        </g>
        <g className="cig-tip-hatch" clipPath={`url(#${id}-tip)`} opacity="0.55">
          <rect x="318" y="30" width="16" height="26" fill={`url(#${id}-tobacco)`} />
        </g>
      </g>

      <g
        className="cig-outline"
        fill="none"
        stroke="#0c0b09"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="18" y="28" width="302" height="30" rx="2.2" strokeWidth="1.85" />
        <path d="M90 28.2V57.8" strokeWidth="1.35" />
        <path d="M78 28.4V57.6" strokeWidth="0.8" opacity="0.7" />
        <path d="M318 30.2V55.8" strokeWidth="1.2" />
        <path d="M108 36H300" strokeWidth="0.55" opacity="0.28" />
        <path d="M118 48H292" strokeWidth="0.5" opacity="0.2" />
      </g>

      <g className="cig-detail">
        <circle cx="44" cy="36" r="0.7" fill="#0c0b09" />
        <circle cx="160" cy="34" r="0.55" fill="#0c0b09" />
        <circle cx="248" cy="52" r="0.5" fill="#0c0b09" />
      </g>

      <g className="cig-glow" opacity="0">
        <ellipse cx="332" cy="43" rx="28" ry="20" fill="#c47a3a" />
      </g>

      <g className="cig-ember" opacity="0">
        <rect x="314" y="30" width="22" height="26" fill="#8a3a1f" />
        <rect x="318" y="33" width="12" height="20" fill="#e4d6bc" opacity="0.55" />
        <path
          d="M314 31Q320 43 314 55"
          stroke="#0c0b09"
          strokeWidth="1.1"
          fill="none"
        />
        <path
          d="M336 31Q330 43 336 55"
          stroke="#5c1c1c"
          strokeWidth="1.05"
          fill="none"
          opacity="0.8"
        />
      </g>

      <g className="cig-smoke" opacity="0" fill="none" stroke="#cbbfa8" strokeLinecap="round">
        <path
          className="cig-smoke-a"
          d="M334 26C338 12 328 -2 340 -16C348 -26 338 -38 346 -52"
          strokeWidth="1.35"
          opacity="0.7"
        />
        <path
          className="cig-smoke-b"
          d="M328 24C318 8 330 -8 318 -24C310 -36 322 -46 312 -62"
          strokeWidth="1.05"
          opacity="0.5"
        />
        <path
          className="cig-smoke-c"
          d="M340 22C352 6 344 -12 356 -28"
          strokeWidth="0.85"
          opacity="0.4"
        />
      </g>
    </svg>
  )
}
