export function ChamberSketch() {
  return (
    <svg
      className="chamber-sketch"
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="chamber-hatch" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
          <path d="M0 1.2H14" stroke="#0c0b09" strokeWidth="0.7" opacity="0.55" />
        </pattern>
        <pattern id="chamber-cross" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <path d="M0 0.8H10" stroke="#0c0b09" strokeWidth="0.45" opacity="0.4" />
        </pattern>
        <pattern id="chamber-stipple" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.6" r="0.45" fill="#0c0b09" />
          <circle cx="4.8" cy="4.1" r="0.32" fill="#0c0b09" />
          <circle cx="6.1" cy="1.2" r="0.22" fill="#0c0b09" />
        </pattern>
        <pattern id="chamber-fiber" width="80" height="18" patternUnits="userSpaceOnUse">
          <path d="M0 4H80" stroke="#2c241c" strokeWidth="0.45" opacity="0.35" />
          <path d="M0 11H80" stroke="#0c0b09" strokeWidth="0.4" opacity="0.28" />
        </pattern>
        <filter id="chamber-grain" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 0.08  0 0 0 0 0.06  0 0 0 0 0.04  0 0 0 0.28 0" />
        </filter>
      </defs>

      <rect width="1200" height="900" fill="url(#chamber-fiber)" opacity="0.4" />
      <rect width="1200" height="900" filter="url(#chamber-grain)" opacity="0.22" />

      <g fill="url(#chamber-hatch)" opacity="0.38">
        <path d="M0 0H280L210 190H0Z" />
        <path d="M980 0H1200V240L1040 170Z" />
        <path d="M0 620H190L140 900H0Z" />
        <path d="M1020 700H1200V900H940Z" />
      </g>

      <g fill="url(#chamber-cross)" opacity="0.28">
        <ellipse cx="180" cy="760" rx="220" ry="90" />
        <ellipse cx="980" cy="790" rx="260" ry="80" />
        <path d="M420 0H760L700 80H470Z" />
      </g>

      <g fill="url(#chamber-stipple)" opacity="0.36">
        <path d="M70 40C180 20 240 90 210 180C150 250 40 210 50 120Z" />
        <path d="M980 60C1100 30 1180 110 1140 210C1080 270 930 200 960 110Z" />
        <ellipse cx="600" cy="820" rx="340" ry="70" />
      </g>

      <g fill="none" stroke="#0c0b09" strokeLinecap="round" opacity="0.28">
        <path d="M40 80C70 40 90 120 60 150" strokeWidth="1.1" />
        <path d="M1140 90C1110 40 1090 130 1160 160" strokeWidth="0.9" />
        <path d="M90 820C140 790 180 860 120 880" strokeWidth="1.2" />
        <path d="M1080 840C1120 800 1180 870 1140 890" strokeWidth="1" />
        <path d="M200 40H310" strokeWidth="0.6" opacity="0.5" />
        <path d="M860 36H980" strokeWidth="0.55" />
      </g>

      <g fill="#0c0b09" opacity="0.18">
        <circle cx="96" cy="210" r="3.2" />
        <circle cx="108" cy="224" r="1.4" />
        <circle cx="1118" cy="318" r="2.6" />
        <circle cx="248" cy="760" r="2.1" />
        <circle cx="972" cy="688" r="1.8" />
        <path d="M430 48C436 52 442 46 448 54C440 58 434 62 430 48Z" />
        <path d="M790 70C798 66 806 78 796 82C790 78 786 74 790 70Z" />
      </g>

      <g fill="none" stroke="#6b5748" strokeWidth="0.55" opacity="0.2">
        <path d="M0 710C180 690 340 740 520 718C720 692 900 748 1200 720" />
        <path d="M0 738C220 760 480 700 760 742C960 770 1100 730 1200 748" />
      </g>
    </svg>
  )
}
