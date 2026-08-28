import { useId } from 'react'

export function WaxSeal() {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      className="letter-seal-art"
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${id}-wax`} cx="36%" cy="30%" r="74%">
          <stop offset="0%" stopColor="#d24a46" />
          <stop offset="28%" stopColor="#a42424" />
          <stop offset="62%" stopColor="#6e1212" />
          <stop offset="100%" stopColor="#2a0707" />
        </radialGradient>
        <radialGradient id={`${id}-core`} cx="40%" cy="34%" r="62%">
          <stop offset="0%" stopColor="#8a1c1c" />
          <stop offset="55%" stopColor="#5a1010" />
          <stop offset="100%" stopColor="#2c0808" />
        </radialGradient>
        <pattern
          id={`${id}-hatch`}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <path d="M0 0.8H5" stroke="#2a0808" strokeWidth="0.45" opacity="0.4" />
        </pattern>
        <pattern id={`${id}-stipple`} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="0.8" cy="1" r="0.28" fill="#1a0505" />
        </pattern>
      </defs>

      <ellipse cx="82" cy="128" rx="46" ry="10" fill="#0c0b09" opacity="0.38" />

      <g className="letter-seal-left">
        <path
          d="M22 78C14 46 38 16 74 14C92 12 108 28 104 48C96 44 86 52 82 78C78 108 90 128 104 136C88 148 36 138 24 116C14 98 26 92 22 78Z"
          fill={`url(#${id}-wax)`}
          stroke="#0c0b09"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M28 86C22 58 48 28 70 26C62 48 54 72 58 102"
          stroke="#ead9b8"
          strokeWidth="4.5"
          opacity="0.16"
          strokeLinecap="round"
        />
        <path
          d="M36 118C28 108 26 94 30 86"
          fill="#5c1010"
          stroke="#0c0b09"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </g>

      <g className="letter-seal-right">
        <path
          d="M56 20C92 8 148 28 146 72C150 104 132 140 96 146C78 150 64 138 58 118C70 124 92 112 96 80C100 48 86 32 64 30C60 26 52 22 56 20Z"
          fill={`url(#${id}-wax)`}
          stroke="#0c0b09"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M118 128C138 118 144 96 140 78"
          fill="#4a0c0c"
          stroke="#0c0b09"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M128 54C136 70 132 98 118 118"
          stroke="#0c0b09"
          strokeWidth="1.1"
          opacity="0.35"
        />
      </g>

      <g className="letter-seal-join">
        <path
          d="M54 18C78 8 108 10 122 28C136 48 128 86 118 118C108 142 70 146 52 122C36 100 40 54 54 18Z"
          fill={`url(#${id}-wax)`}
          stroke="#0c0b09"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </g>

      <g className="letter-seal-face">
        <circle cx="80" cy="78" r="38" fill={`url(#${id}-core)`} stroke="#0c0b09" strokeWidth="1.7" />
        <circle cx="80" cy="78" r="38" fill={`url(#${id}-hatch)`} opacity="0.42" />
        <circle cx="80" cy="78" r="38" fill={`url(#${id}-stipple)`} opacity="0.28" />
        <circle cx="80" cy="78" r="29" fill="none" stroke="#ead9b8" strokeWidth="0.8" opacity="0.28" />
        <circle cx="80" cy="78" r="24" fill="none" stroke="#0c0b09" strokeWidth="1.15" />
        <path
          d="M68 64C72 52 90 52 94 64C96 74 90 82 80 88C70 82 66 74 68 64Z"
          fill="#ead9b8"
          stroke="#0c0b09"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M72 66C74 58 88 58 90 66C88 74 84 78 80 82C76 78 72 74 72 66Z"
          fill="#3a0c0c"
          opacity="0.55"
        />
        <text
          x="80"
          y="116"
          textAnchor="middle"
          fill="#ead9b8"
          fontSize="12"
          letterSpacing="0.18em"
          className="letter-seal-mark"
        >
          A · S
        </text>
        <path
          d="M50 50C60 36 78 32 92 40"
          stroke="#ead9b8"
          strokeWidth="3.4"
          opacity="0.22"
          strokeLinecap="round"
        />
      </g>

      <path
        className="letter-seal-crack"
        d="M78 18C80 46 76 78 82 108C84 124 78 140 74 148"
        stroke="#1a0505"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0"
      />
      <path
        className="letter-seal-crack"
        d="M70 42C86 48 92 70 88 96"
        stroke="#ead9b8"
        strokeWidth="0.7"
        opacity="0"
      />
    </svg>
  )
}
