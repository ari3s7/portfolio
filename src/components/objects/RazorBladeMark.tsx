import { useId } from 'react'

const T = 28
const B = 104
const L = 18
const R = 542
const CY = 66
const CX = 280

function hole(cx: number, cy: number, r: number) {
  return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 ${-r * 2} 0 Z`
}

function slot(x1: number, x2: number, h: number) {
  const y1 = CY - h / 2
  const y2 = CY + h / 2
  return `M ${x1} ${y1} L ${x2} ${y1 + 0.15} L ${x2} ${y2} L ${x1} ${y2 - 0.2} Z`
}

function diamond(cx: number, towardCenter: 1 | -1) {
  const point = 15
  const back = 11
  const inner = cx + towardCenter * point
  const outer = cx - towardCenter * back
  return [
    `M ${outer} ${CY}`,
    `Q ${outer + towardCenter * 4} ${CY - 7.4} ${cx - towardCenter * 2} ${CY - 7.8}`,
    `L ${cx + towardCenter * 6} ${CY - 6.6}`,
    `Q ${inner - towardCenter * 2} ${CY - 2.2} ${inner} ${CY}`,
    `Q ${inner - towardCenter * 2} ${CY + 2.2} ${cx + towardCenter * 6} ${CY + 6.6}`,
    `L ${cx - towardCenter * 2} ${CY + 7.8}`,
    `Q ${outer + towardCenter * 4} ${CY + 7.4} ${outer} ${CY}`,
    'Z',
  ].join(' ')
}

function bladeBody() {
  return [
    `M ${L + 20} ${T + 0.35}`,
    `L 64 ${T - 0.15}`,
    `L 118 ${T + 0.55}`,
    `L 176 ${T - 0.1}`,
    `L 248 ${T + 0.4}`,
    `Q ${CX} ${T - 1.05} 312 ${T + 0.25}`,
    `L 392 ${T + 0.5}`,
    `L 454 ${T - 0.2}`,
    `L 500 ${T + 0.45}`,
    `L ${R - 20} ${T + 0.3}`,
    `Q ${R - 7} ${T + 6.5} ${R - 1.6} ${T + 13.5}`,
    `L ${R + 0.2} 44`,
    `L ${R - 12.5} 45.2`,
    `L ${R - 13.8} 52.6`,
    `L ${R - 0.3} 54.2`,
    `L ${R + 0.45} 60.4`,
    `L ${R - 15.2} 61.6`,
    `L ${R - 16.8} ${CY}`,
    `L ${R - 15.2} 70.4`,
    `L ${R + 0.45} 71.6`,
    `L ${R - 0.3} 77.8`,
    `L ${R - 13.8} 79.4`,
    `L ${R - 12.5} 86.8`,
    `L ${R + 0.2} 88`,
    `Q ${R - 7} ${B - 6.5} ${R - 20} ${B - 0.3}`,
    `L 500 ${B - 0.45}`,
    `L 454 ${B + 0.2}`,
    `L 392 ${B - 0.5}`,
    `L 312 ${B - 0.25}`,
    `Q ${CX} ${B + 1.05} 248 ${B - 0.4}`,
    `L 176 ${B + 0.1}`,
    `L 118 ${B - 0.55}`,
    `L 64 ${B + 0.15}`,
    `L ${L + 20} ${B - 0.35}`,
    `Q ${L + 7} ${B - 6.5} ${L + 1.6} ${B - 13.5}`,
    `L ${L - 0.2} 88`,
    `L ${L + 12.5} 86.8`,
    `L ${L + 13.8} 79.4`,
    `L ${L + 0.3} 77.8`,
    `L ${L - 0.45} 71.6`,
    `L ${L + 15.2} 70.4`,
    `L ${L + 16.8} ${CY}`,
    `L ${L + 15.2} 61.6`,
    `L ${L - 0.45} 60.4`,
    `L ${L + 0.3} 54.2`,
    `L ${L + 13.8} 52.6`,
    `L ${L + 12.5} 45.2`,
    `L ${L - 0.2} 44`,
    `Q ${L + 7} ${T + 6.5} ${L + 20} ${T + 0.35}`,
    'Z',
  ].join(' ')
}

const BODY = bladeBody()
const CENTER = hole(CX, CY, 10.6)
const LEFT_DIAMOND = diamond(238, 1)
const RIGHT_DIAMOND = diamond(322, -1)
const LEFT_EYE = hole(196, CY, 6.15)
const RIGHT_EYE = hole(364, CY, 6.15)
const SLOTS = [
  slot(202.2, 227, 4.35),
  slot(253, 269.4, 4.2),
  slot(290.6, 307, 4.2),
  slot(333, 357.8, 4.35),
].join(' ')
const CUTOUTS = `${CENTER} ${LEFT_DIAMOND} ${RIGHT_DIAMOND} ${LEFT_EYE} ${RIGHT_EYE} ${SLOTS}`
const BLADE = `${BODY} ${CUTOUTS}`

type RazorBladeMarkProps = {
  density?: 'far' | 'mid' | 'near'
}

export function RazorBladeMark({ density = 'mid' }: RazorBladeMarkProps) {
  const id = useId().replace(/:/g, '')
  const outline = density === 'near' ? 2.05 : density === 'far' ? 1.45 : 1.75
  const fill = density === 'far' ? '#d2c4aa' : '#c6b696'

  return (
    <svg
      className="razor-blade-mark"
      viewBox="0 0 560 132"
      fill="none"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`${id}-hatch`}
          width="7"
          height="9"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <path d="M0 1.1H6" stroke="#161310" strokeWidth="0.5" />
          <path d="M1.6 5.6H7" stroke="#161310" strokeWidth="0.35" />
        </pattern>
        <pattern
          id={`${id}-cross`}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-22)"
        >
          <path d="M0 2.2H7" stroke="#161310" strokeWidth="0.28" opacity="0.55" />
        </pattern>
        <pattern
          id={`${id}-grain`}
          width="11"
          height="3.4"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(3)"
        >
          <path d="M0 1.1H11" stroke="#161310" strokeWidth="0.26" opacity="0.72" />
          <path d="M2 2.6H9" stroke="#161310" strokeWidth="0.18" opacity="0.4" />
        </pattern>
        <pattern
          id={`${id}-stipple`}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.1" cy="2.2" r="0.38" fill="#161310" />
          <circle cx="6.8" cy="6.6" r="0.28" fill="#161310" />
          <circle cx="4" cy="8.8" r="0.22" fill="#161310" />
          <circle cx="8.4" cy="1.6" r="0.2" fill="#161310" />
        </pattern>
        <clipPath id={`${id}-clip`}>
          <path d={BLADE} fillRule="evenodd" />
        </clipPath>
      </defs>

      <g className="blade-ink-sketch" opacity="0" fill="none" stroke="#6b5748">
        <path d="M36 66H524" strokeWidth="0.7" strokeDasharray="4 6" />
        <path d="M48 34H512" strokeWidth="0.55" strokeDasharray="3 5" />
      </g>

      <path className="blade-ink-fill" d={BLADE} fillRule="evenodd" fill={fill} />
      <path
        className="blade-ink-hatch"
        d={BLADE}
        fillRule="evenodd"
        fill={`url(#${id}-hatch)`}
        opacity="0.34"
      />
      <g className="blade-ink-stipple" clipPath={`url(#${id}-clip)`} opacity="0.38">
        <rect width="560" height="132" fill={`url(#${id}-stipple)`} />
        <rect width="560" height="132" fill={`url(#${id}-grain)`} />
        <rect width="560" height="132" fill={`url(#${id}-cross)`} opacity="0.55" />
        <path
          d="M58 40H98M410 92H458M50 88H86M468 40H508M72 96H110"
          stroke="#161310"
          strokeWidth="0.45"
        />
        <path
          d="M132 38L148 92M420 36L434 94M88 48L96 84M470 50L462 82"
          stroke="#161310"
          strokeWidth="0.32"
          opacity="0.7"
        />
        <circle cx="74" cy="46" r="1.05" fill="#161310" opacity="0.55" />
        <circle cx="486" cy="86" r="0.85" fill="#161310" opacity="0.5" />
        <circle cx="128" cy="90" r="0.7" fill="#161310" opacity="0.45" />
        <path
          d="M42 50Q34 66 42 82M518 50Q526 66 518 82"
          fill="none"
          stroke="#120f0c"
          strokeWidth="0.65"
          opacity="0.4"
        />
        <path
          d="M86 31.5H474"
          fill="none"
          stroke="#efe6d4"
          strokeWidth="0.7"
          opacity="0.28"
        />
        <path
          d="M86 100.5H474"
          fill="none"
          stroke="#120f0c"
          strokeWidth="0.55"
          opacity="0.28"
        />
      </g>
      <path
        className="blade-ink-outline"
        d={BLADE}
        fillRule="evenodd"
        fill="none"
        stroke="#120f0c"
        strokeWidth={outline}
        strokeLinejoin="round"
        pathLength="1"
      />
      <path
        className="blade-ink-cut"
        d={CUTOUTS}
        fill="none"
        stroke="#120f0c"
        strokeWidth="1.25"
        pathLength="1"
      />
      <path
        className="blade-ink-cut"
        d={CUTOUTS}
        fill="none"
        stroke="#efe6d4"
        strokeOpacity="0.22"
        strokeWidth="0.55"
        transform="translate(-0.45 -0.55)"
      />
    </svg>
  )
}
