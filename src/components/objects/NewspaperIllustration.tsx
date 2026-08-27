import { useId } from 'react'

export function NewspaperIllustration() {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      className="newspaper-illustration-mark"
      viewBox="0 0 280 360"
      fill="none"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`${id}-hatch`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(38)"
        >
          <path d="M0 0.7H6" stroke="#0c0b09" strokeWidth="0.7" />
        </pattern>
        <pattern
          id={`${id}-cross`}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-48)"
        >
          <path d="M0 0.8H7" stroke="#0c0b09" strokeWidth="0.45" opacity="0.75" />
        </pattern>
        <pattern
          id={`${id}-stipple`}
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.2" cy="2" r="0.45" fill="#0c0b09" />
          <circle cx="6.4" cy="5.1" r="0.35" fill="#0c0b09" />
          <circle cx="3.1" cy="7.4" r="0.4" fill="#0c0b09" />
        </pattern>
        <pattern
          id={`${id}-halftone`}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.1" cy="1.1" r="0.55" fill="#0c0b09" />
        </pattern>
        <clipPath id={`${id}-window`}>
          <rect x="28" y="28" width="92" height="118" rx="1.5" />
        </clipPath>
        <clipPath id={`${id}-figure`}>
          <path d="M148 168C156 150 172 142 188 148C204 154 214 172 210 198L206 268H132L136 210C138 188 140 176 148 168Z" />
        </clipPath>
        <clipPath id={`${id}-desk`}>
          <path d="M18 268L262 258L268 328L12 338Z" />
        </clipPath>
      </defs>

      <g className="paper-ill-sketch">
        <rect
          x="22"
          y="22"
          width="236"
          height="316"
          stroke="#6b5748"
          strokeWidth="0.9"
          strokeDasharray="4 6"
          opacity="0.32"
        />
        <path
          d="M40 268H240"
          stroke="#6b5748"
          strokeWidth="0.8"
          strokeDasharray="3 5"
          opacity="0.28"
        />
      </g>

      <g className="paper-ill-fill">
        <rect x="24" y="24" width="232" height="312" fill="#d4c6ae" />
        <rect x="28" y="28" width="92" height="118" fill="#9a8b74" />
        <path d="M18 268L262 258L268 328L12 338Z" fill="#cbbba0" />
        <ellipse cx="188" cy="214" rx="42" ry="58" fill="#b7a890" />
        <path d="M168 248C176 236 198 232 214 244L210 268H166Z" fill="#8f8270" />
      </g>

      <g className="paper-ill-hatch">
        <g clipPath={`url(#${id}-window)`} opacity="0.55">
          <rect x="28" y="28" width="92" height="118" fill={`url(#${id}-halftone)`} />
          <rect x="28" y="28" width="92" height="118" fill={`url(#${id}-cross)`} />
        </g>
        <g clipPath={`url(#${id}-figure)`} opacity="0.62">
          <rect x="128" y="140" width="90" height="140" fill={`url(#${id}-hatch)`} />
          <rect x="128" y="140" width="90" height="140" fill={`url(#${id}-stipple)`} />
        </g>
        <g clipPath={`url(#${id}-desk)`} opacity="0.28">
          <rect x="10" y="250" width="270" height="100" fill={`url(#${id}-hatch)`} />
        </g>
      </g>

      <g
        className="paper-ill-outline"
        fill="none"
        stroke="#0c0b09"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          className="paper-ill-stroke"
          pathLength="1"
          x="24"
          y="24"
          width="232"
          height="312"
          strokeWidth="2.1"
        />
        <rect
          className="paper-ill-stroke"
          pathLength="1"
          x="28"
          y="28"
          width="92"
          height="118"
          strokeWidth="1.7"
        />
        <path
          className="paper-ill-stroke"
          pathLength="1"
          d="M74 28V146"
          strokeWidth="1.15"
        />
        <path
          className="paper-ill-stroke"
          pathLength="1"
          d="M28 68H120"
          strokeWidth="1.1"
        />
        <path
          className="paper-ill-stroke"
          pathLength="1"
          d="M28 108H120"
          strokeWidth="1.05"
        />
        <path
          className="paper-ill-stroke"
          pathLength="1"
          d="M18 268L262 258L268 328L12 338Z"
          strokeWidth="2.05"
        />
        <path
          className="paper-ill-stroke"
          pathLength="1"
          d="M148 168C156 150 172 142 188 148C204 154 214 172 210 198L206 268"
          strokeWidth="1.85"
        />
        <path
          className="paper-ill-stroke"
          pathLength="1"
          d="M148 168C140 176 138 188 136 210L132 268"
          strokeWidth="1.7"
        />
        <path
          className="paper-ill-stroke"
          pathLength="1"
          d="M176 148C182 132 198 126 208 138C214 148 210 158 202 162"
          strokeWidth="1.55"
        />
        <path
          className="paper-ill-stroke"
          pathLength="1"
          d="M168 248C176 236 198 232 214 244"
          strokeWidth="1.2"
        />
        <path
          className="paper-ill-stroke"
          pathLength="1"
          d="M42 268V214H118V262"
          strokeWidth="1.55"
        />
        <path
          className="paper-ill-stroke"
          pathLength="1"
          d="M52 214V196H108V214"
          strokeWidth="1.35"
        />
        <path
          className="paper-ill-stroke"
          pathLength="1"
          d="M58 196C62 186 78 180 96 184C108 188 110 198 108 196"
          strokeWidth="1.25"
        />
        <path
          className="paper-ill-stroke"
          pathLength="1"
          d="M218 268L232 148C236 132 248 128 256 142L248 268"
          strokeWidth="1.45"
        />
        <path
          className="paper-ill-stroke"
          pathLength="1"
          d="M232 168C238 160 252 158 258 170"
          strokeWidth="1.15"
        />
        <ellipse
          className="paper-ill-stroke"
          pathLength="1"
          cx="84"
          cy="286"
          rx="18"
          ry="8"
          strokeWidth="1.2"
        />
        <rect
          className="paper-ill-stroke"
          pathLength="1"
          x="128"
          y="274"
          width="52"
          height="36"
          strokeWidth="1.25"
        />
      </g>

      <g
        className="paper-ill-detail"
        stroke="#0c0b09"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M34 40L46 52" strokeWidth="0.7" opacity="0.55" />
        <path d="M50 36L58 50" strokeWidth="0.65" opacity="0.45" />
        <path d="M86 38L94 54" strokeWidth="0.7" opacity="0.5" />
        <path d="M102 42L110 56" strokeWidth="0.6" opacity="0.4" />
        <path d="M62 214H98" strokeWidth="0.9" />
        <path d="M66 222H94" strokeWidth="0.7" opacity="0.7" />
        <path d="M70 230H90" strokeWidth="0.65" opacity="0.55" />
        <path d="M136 282H174" strokeWidth="0.7" opacity="0.6" />
        <path d="M140 290H170" strokeWidth="0.65" opacity="0.5" />
        <path d="M138 298H168" strokeWidth="0.6" opacity="0.45" />
        <path d="M188 176C176 188 170 210 174 236" strokeWidth="0.85" opacity="0.55" />
        <circle cx="84" cy="286" r="1.1" fill="#0c0b09" stroke="none" />
        <circle cx="46" cy="248" r="0.8" fill="#0c0b09" stroke="none" />
        <circle cx="236" cy="240" r="0.7" fill="#0c0b09" stroke="none" />
        <circle cx="198" cy="154" r="0.85" fill="#0c0b09" stroke="none" />
        <path d="M240 132C246 118 238 108 228 112" strokeWidth="1.05" opacity="0.7" />
      </g>
    </svg>
  )
}
