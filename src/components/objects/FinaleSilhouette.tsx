import { useId } from 'react'

export function FinaleSilhouette() {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      className="finale-silhouette"
      viewBox="0 0 1100 640"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={`${id}-hatch`}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(34)"
        >
          <path d="M0 1H7" stroke="#0c0b09" strokeWidth="0.7" opacity="0.7" />
        </pattern>
        <pattern
          id={`${id}-cross`}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-46)"
        >
          <path d="M0 0.9H8" stroke="#0c0b09" strokeWidth="0.45" opacity="0.5" />
        </pattern>
        <pattern
          id={`${id}-stipple`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.2" cy="1.5" r="0.42" fill="#0c0b09" />
          <circle cx="4.1" cy="3.8" r="0.3" fill="#0c0b09" />
          <circle cx="5.2" cy="1.1" r="0.22" fill="#0c0b09" />
        </pattern>
        <pattern
          id={`${id}-halftone`}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.05" cy="1.05" r="0.52" fill="#0c0b09" />
        </pattern>
        <pattern
          id={`${id}-grain`}
          width="64"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 10H64" stroke="#6b5748" strokeWidth="0.4" opacity="0.24" />
          <path d="M0 26H64" stroke="#0c0b09" strokeWidth="0.3" opacity="0.16" />
        </pattern>
        <clipPath id={`${id}-window`}>
          <rect x="92" y="58" width="430" height="300" />
        </clipPath>
        <clipPath id={`${id}-coat`}>
          <path d="M628 262C648 236 692 228 728 248C754 264 768 298 760 338L748 468H612L620 340C622 304 618 278 628 262Z" />
        </clipPath>
        <clipPath id={`${id}-desk`}>
          <path d="M28 468L1072 446L1094 628H12Z" />
        </clipPath>
        <clipPath id={`${id}-wall`}>
          <path d="M0 0H1100V468H0Z" />
        </clipPath>
      </defs>

      <rect width="1100" height="640" fill="#151310" />
      <rect width="1100" height="640" fill={`url(#${id}-grain)`} opacity="0.55" />
      <g clipPath={`url(#${id}-wall)`} opacity="0.22">
        <rect width="1100" height="468" fill={`url(#${id}-hatch)`} />
      </g>
      <rect width="1100" height="640" fill={`url(#${id}-stipple)`} opacity="0.14" />

      <g fill="none" stroke="#0c0b09" strokeLinecap="round">
        <path d="M48 36V468" strokeWidth="1.7" opacity="0.5" />
        <path d="M48 36H980" strokeWidth="1.3" opacity="0.32" />
        <path d="M1048 72V446" strokeWidth="1.5" opacity="0.4" />
      </g>

      <g clipPath={`url(#${id}-window)`}>
        <rect x="92" y="58" width="430" height="300" fill="#1b1713" />
        <rect x="92" y="58" width="430" height="300" fill={`url(#${id}-halftone)`} opacity="0.28" />
        <rect x="92" y="248" width="430" height="110" fill="#12100e" />
        <path d="M148 248V358" fill="none" stroke="#0c0b09" strokeWidth="14" />
        <path d="M236 232V358" fill="none" stroke="#0c0b09" strokeWidth="22" />
        <path d="M340 240V358" fill="none" stroke="#0c0b09" strokeWidth="16" />
        <path d="M428 252V358" fill="none" stroke="#0c0b09" strokeWidth="11" />
        <circle cx="392" cy="168" r="26" fill="#cbbfa8" opacity="0.16" />
        <path d="M392 194V248" stroke="#a68654" strokeWidth="2" opacity="0.45" />
        <g stroke="#cbbfa8" strokeLinecap="round" opacity="0.28">
          <path d="M118 78L110 128" strokeWidth="0.75" />
          <path d="M162 68L152 136" strokeWidth="0.7" />
          <path d="M214 74L204 140" strokeWidth="0.8" />
          <path d="M268 66L258 132" strokeWidth="0.65" />
          <path d="M318 80L310 138" strokeWidth="0.7" />
          <path d="M372 70L362 134" strokeWidth="0.75" />
          <path d="M448 76L440 130" strokeWidth="0.65" />
          <path d="M488 84L480 136" strokeWidth="0.6" />
        </g>
      </g>
      <g fill="none" stroke="#0c0b09" strokeLinejoin="round">
        <rect x="92" y="58" width="430" height="300" strokeWidth="2.3" />
        <path d="M307 58V358" strokeWidth="1.5" />
        <path d="M92 208H522" strokeWidth="1.45" />
        <rect x="80" y="46" width="454" height="324" strokeWidth="1.15" opacity="0.5" />
      </g>
      <g clipPath={`url(#${id}-window)`} opacity="0.2">
        <rect x="92" y="58" width="430" height="300" fill={`url(#${id}-cross)`} />
      </g>

      <g className="finale-figure">
        <path
          d="M628 262C648 236 692 228 728 248C754 264 768 298 760 338L748 468H612L620 340C622 304 618 278 628 262Z"
          fill="#1a1714"
          stroke="#0c0b09"
          strokeWidth="2.15"
          strokeLinejoin="round"
        />
        <g clipPath={`url(#${id}-coat)`} opacity="0.55">
          <rect x="600" y="220" width="180" height="260" fill={`url(#${id}-hatch)`} />
          <rect x="600" y="220" width="180" height="260" fill={`url(#${id}-stipple)`} />
        </g>
        <path
          d="M748 468L732 392C748 386 768 398 770 424L762 468"
          fill="#12100e"
          stroke="#0c0b09"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M612 468L624 400C608 392 592 408 590 432L598 468"
          fill="#12100e"
          stroke="#0c0b09"
          strokeWidth="1.45"
        />
        <path
          d="M676 258C682 236 704 224 726 232C744 240 750 260 742 276C728 294 698 292 682 278C670 270 672 262 676 258Z"
          fill="#1a1714"
          stroke="#0c0b09"
          strokeWidth="1.7"
        />
        <path
          d="M668 248C678 228 706 220 730 232C746 242 746 258 732 264H678C668 260 664 254 668 248Z"
          fill="#2c2722"
          stroke="#0c0b09"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M760 338C792 330 818 348 812 384C804 416 778 428 758 418"
          fill="none"
          stroke="#0c0b09"
          strokeWidth="1.7"
        />
        <path
          d="M812 382C828 378 852 392 846 412"
          stroke="#0c0b09"
          strokeWidth="1.55"
          strokeLinecap="round"
        />
        <path d="M846 412L872 428" stroke="#0c0b09" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      <g className="finale-desk">
        <path d="M28 468L1072 446L1094 628H12Z" fill="#1e1a16" stroke="#0c0b09" strokeWidth="2.2" strokeLinejoin="round" />
        <g clipPath={`url(#${id}-desk)`} opacity="0.38">
          <rect x="0" y="440" width="1100" height="200" fill={`url(#${id}-hatch)`} />
          <rect x="0" y="440" width="1100" height="200" fill={`url(#${id}-cross)`} />
        </g>
        <path d="M70 504H990" stroke="#0c0b09" strokeWidth="0.7" opacity="0.32" />
        <path d="M96 542H940" stroke="#0c0b09" strokeWidth="0.55" opacity="0.22" />
        <path d="M130 580H880" stroke="#0c0b09" strokeWidth="0.45" opacity="0.16" />
      </g>

      <g className="finale-props" stroke="#0c0b09" strokeLinejoin="round">
        <path d="M196 468L248 352H318L348 468" fill="#2a241f" strokeWidth="1.8" />
        <g opacity="0.35">
          <path d="M210 430H330" />
          <path d="M218 412H322" />
          <path d="M228 392H312" />
        </g>
        <path d="M248 352C266 322 300 320 318 352" fill="#3a3228" strokeWidth="1.6" />
        <path d="M272 322V300" fill="none" strokeWidth="1.45" />
        <ellipse cx="272" cy="298" rx="12" ry="5" fill="#a68654" strokeWidth="1.35" />
        <path d="M400 478L436 438H548L568 478" fill="#d2c09a" strokeWidth="1.55" />
        <path d="M418 456H538" fill="none" strokeWidth="0.7" opacity="0.45" />
        <path d="M424 466H530" fill="none" strokeWidth="0.6" opacity="0.35" />
        <path d="M430 438L442 412H520L528 438" fill="#cbbfa8" strokeWidth="1.35" />
        <ellipse cx="620" cy="486" rx="24" ry="11" fill="#6b5748" strokeWidth="1.45" />
        <path d="M612 486V458" fill="none" strokeWidth="1.35" />
        <circle cx="612" cy="450" r="9" fill="#3a3228" strokeWidth="1.35" />
        <path d="M872 478H978L988 504H862Z" fill="#cbbfa8" strokeWidth="1.4" />
        <path d="M884 488H966" fill="none" strokeWidth="0.55" opacity="0.4" />
        <path d="M890 496H958" fill="none" strokeWidth="0.5" opacity="0.3" />
      </g>

      <g className="finale-wisps" fill="none" stroke="#cbbfa8" strokeLinecap="round">
        <path
          className="finale-wisp"
          d="M272 298C262 268 284 246 274 214C266 188 286 168 278 142"
          strokeWidth="1.25"
          opacity="0.3"
        />
        <path
          className="finale-wisp"
          d="M288 296C300 266 282 244 296 216C308 190 288 170 300 146"
          strokeWidth="0.95"
          opacity="0.2"
        />
      </g>

      <g fill="#0c0b09" opacity="0.24">
        <circle cx="64" cy="96" r="2.3" />
        <circle cx="86" cy="148" r="1.4" />
        <circle cx="1018" cy="120" r="1.9" />
        <circle cx="1062" cy="402" r="1.5" />
        <path d="M560 84C568 80 576 92 566 96C560 92 556 88 560 84Z" />
      </g>
    </svg>
  )
}
