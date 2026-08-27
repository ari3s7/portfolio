export function WorldField() {
  return (
    <svg
      className="world-field"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="world-wood" cx="50%" cy="42%" r="78%">
          <stop offset="0%" stopColor="#1c1814" />
          <stop offset="38%" stopColor="#151210" />
          <stop offset="72%" stopColor="#0f0d0b" />
          <stop offset="100%" stopColor="#080706" />
        </radialGradient>
        <pattern
          id="world-grain"
          width="1200"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 2.2H1200" stroke="#2a231c" strokeWidth="0.7" opacity="0.55" />
          <path d="M0 6.8H1200" stroke="#0a0908" strokeWidth="0.95" opacity="0.42" />
          <path d="M0 11.4H1200" stroke="#3a3228" strokeWidth="0.45" opacity="0.28" />
          <path d="M0 16.1H1200" stroke="#1a1612" strokeWidth="0.8" opacity="0.38" />
          <path d="M0 19.8H1200" stroke="#2e2720" strokeWidth="0.4" opacity="0.22" />
        </pattern>
        <pattern
          id="world-grain-wave"
          width="1200"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 12C180 8 340 18 520 11C720 3 900 16 1200 9"
            fill="none"
            stroke="#2c241c"
            strokeWidth="0.55"
            opacity="0.35"
          />
          <path
            d="M0 34C220 40 480 28 760 36C960 42 1100 30 1200 33"
            fill="none"
            stroke="#0c0b09"
            strokeWidth="0.7"
            opacity="0.28"
          />
          <path
            d="M0 52C160 48 380 58 620 50C860 42 1040 56 1200 51"
            fill="none"
            stroke="#3a3228"
            strokeWidth="0.4"
            opacity="0.22"
          />
        </pattern>
        <pattern
          id="world-hatch"
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-18)"
        >
          <path d="M0 1.1H9" stroke="#0a0908" strokeWidth="0.55" />
        </pattern>
        <pattern
          id="world-cross"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <path d="M0 0.9H8" stroke="#2a2218" strokeWidth="0.35" />
        </pattern>
        <pattern
          id="world-stipple"
          width="11"
          height="11"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.4" cy="2.2" r="0.4" fill="#0a0908" />
          <circle cx="7.1" cy="6.4" r="0.28" fill="#3a3228" />
          <circle cx="4.2" cy="9.1" r="0.22" fill="#0a0908" />
        </pattern>
      </defs>

      <rect width="1200" height="800" fill="url(#world-wood)" />
      <rect width="1200" height="800" fill="url(#world-grain)" opacity="0.55" />
      <rect width="1200" height="800" fill="url(#world-grain-wave)" opacity="0.42" />
      <rect width="1200" height="800" fill="url(#world-stipple)" opacity="0.18" />
      <rect width="1200" height="800" fill="url(#world-hatch)" opacity="0.12" />
      <rect width="1200" height="800" fill="url(#world-cross)" opacity="0.08" />

      <g fill="url(#world-hatch)" opacity="0.22">
        <path d="M0 0H280L180 160H0Z" />
        <path d="M900 0H1200V180L1020 110Z" />
        <path d="M0 620H220L140 800H0Z" />
        <path d="M1000 640H1200V800H920Z" />
      </g>

      <g className="world-detail" fill="#080706" opacity="0.35">
        <circle cx="96" cy="214" r="3.2" />
        <circle cx="108" cy="226" r="1.4" />
        <circle cx="118" cy="216" r="0.7" />
        <circle cx="1112" cy="318" r="2.6" />
        <circle cx="248" cy="760" r="2" />
        <circle cx="972" cy="688" r="1.8" />
        <ellipse cx="430" cy="140" rx="18" ry="7" opacity="0.7" />
        <ellipse cx="860" cy="420" rx="14" ry="6" />
        <path d="M160 40C168 46 176 38 184 50C172 54 164 60 160 40Z" />
        <path d="M1040 120C1050 114 1060 128 1048 132C1040 128 1036 124 1040 120Z" />
        <path d="M70 500C78 508 88 498 96 514C80 516 72 524 70 500Z" />
      </g>

      <g className="world-detail" fill="none" stroke="#2c241c" strokeLinecap="round" opacity="0.28">
        <path d="M40 70C70 30 90 110 55 150" strokeWidth="0.9" />
        <path d="M1148 84C1114 34 1090 124 1164 156" strokeWidth="0.8" />
        <path d="M24 420C48 390 36 460 18 470" strokeWidth="0.7" />
        <path d="M1178 480C1150 450 1168 530 1188 540" strokeWidth="0.7" />
        <path d="M210 36H328" stroke="#0a0908" strokeWidth="0.55" />
        <path d="M860 32H990" stroke="#0a0908" strokeWidth="0.45" />
      </g>
    </svg>
  )
}
