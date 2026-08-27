export function PendantLamp() {
  return (
    <svg
      className="hero-lamp-mark"
      viewBox="0 0 180 250"
      fill="none"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="lamp-hatch"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(18)"
        >
          <path d="M0 1H6" stroke="#0c0b09" strokeWidth="0.7" />
        </pattern>
        <pattern
          id="lamp-cross"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-42)"
        >
          <path d="M0 0.8H5" stroke="#0c0b09" strokeWidth="0.45" />
        </pattern>
      </defs>

      <path d="M90 0V38" stroke="#0c0b09" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M86 0V18" stroke="#0c0b09" strokeWidth="0.7" opacity="0.45" />

      <path d="M78 38H102V46H78Z" fill="#2a221c" stroke="#0c0b09" strokeWidth="1.6" />
      <rect x="78" y="38" width="24" height="8" fill="url(#lamp-hatch)" opacity="0.35" />

      <path
        d="M28 86L48 48H132L152 86C148 92 128 98 90 98C52 98 32 92 28 86Z"
        fill="#6a5846"
        stroke="#0c0b09"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      <path
        d="M28 86L48 48H132L152 86C148 92 128 98 90 98C52 98 32 92 28 86Z"
        fill="url(#lamp-hatch)"
        opacity="0.55"
      />
      <path
        d="M40 80L54 52H126L140 80C136 86 118 90 90 90C62 90 44 86 40 80Z"
        fill="url(#lamp-cross)"
        opacity="0.28"
      />

      <g stroke="#0c0b09" strokeLinecap="round" opacity="0.85">
        <path d="M58 50V88" strokeWidth="1.15" />
        <path d="M74 49V91" strokeWidth="1.05" />
        <path d="M90 48V92" strokeWidth="1.25" />
        <path d="M106 49V91" strokeWidth="1.05" />
        <path d="M122 50V88" strokeWidth="1.15" />
        <path d="M42 78H138" strokeWidth="0.7" opacity="0.5" />
      </g>

      <path d="M48 48H132" stroke="#0c0b09" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M70 44H110" stroke="#0c0b09" strokeWidth="1.2" />

      <ellipse cx="90" cy="108" rx="18" ry="16" fill="#ead9b4" stroke="#0c0b09" strokeWidth="1.5" />
      <path d="M84 100V116M90 98V118M96 100V116" stroke="#0c0b09" strokeWidth="1.05" />
      <path d="M84 100H96" stroke="#0c0b09" strokeWidth="0.9" />
      <ellipse cx="84" cy="104" rx="3.2" ry="2.2" fill="#f6ecd4" opacity="0.45" />

      <g fill="none" stroke="#0c0b09" strokeWidth="0.7" opacity="0.28">
        <path d="M64 98C70 118 84 132 90 168" />
        <path d="M116 98C110 118 96 132 90 168" />
        <path d="M74 102C78 126 86 148 90 186" />
        <path d="M106 102C102 126 94 148 90 186" />
      </g>
    </svg>
  )
}
