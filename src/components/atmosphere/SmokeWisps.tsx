import { useExperience } from '@/state/useExperience'

type SmokeWispsProps = {
  layer?: 'back' | 'front'
}

export function SmokeWisps({ layer = 'front' }: SmokeWispsProps) {
  const { performanceTier } = useExperience()
  const front = layer === 'front'
  const textured = performanceTier !== 'light'
  const filter = textured ? `url(#smoke-ink-${layer})` : undefined

  return (
    <svg
      className={front ? 'smoke-wisps smoke-wisps-front' : 'smoke-wisps smoke-wisps-back'}
      viewBox="0 0 1200 900"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      {textured ? (
        <defs>
          <filter id={`smoke-ink-${layer}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={front ? '0.012' : '0.018'}
              numOctaves="3"
              seed={front ? 11 : 4}
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={front ? 22 : 28} />
            <feGaussianBlur stdDeviation={front ? 1.4 : 2.2} />
          </filter>
        </defs>
      ) : null}

      <g className="smoke-wisp smoke-wisp-a" filter={filter} fill={front ? 'rgb(232 220 198 / 0.16)' : 'rgb(210 196 170 / 0.18)'}>
        <path d="M560 820C520 700 610 640 570 520C530 400 630 340 590 210C560 120 640 70 610 10C700 80 720 200 680 320C640 460 740 540 700 680C670 760 640 800 560 820Z" />
      </g>
      <g className="smoke-wisp smoke-wisp-b" filter={filter} fill={front ? 'rgb(90 70 48 / 0.18)' : 'rgb(72 56 40 / 0.16)'}>
        <path d="M640 830C700 710 620 650 690 520C760 380 680 300 750 170C790 90 740 30 780 -10C860 90 820 220 780 340C730 490 830 560 780 700C750 780 700 820 640 830Z" />
      </g>
      <g className="smoke-wisp smoke-wisp-c" filter={filter} fill="rgb(236 224 200 / 0.1)">
        <path d="M480 760C430 620 510 560 450 430C400 320 490 250 430 140C390 70 460 20 420 -20C360 70 340 190 390 310C440 440 330 520 380 650C410 720 450 750 480 760Z" />
      </g>
      {front ? (
        <g className="smoke-wisp smoke-wisp-d" filter={filter} fill="rgb(200 184 158 / 0.12)">
          <path d="M720 640C780 520 720 450 790 340C840 250 780 170 830 80C860 30 820 -10 850 -40C920 40 900 160 850 260C800 370 890 450 840 560C810 610 760 640 720 640Z" />
        </g>
      ) : (
        <g className="smoke-wisp smoke-wisp-e" filter={filter} fill="rgb(40 32 24 / 0.2)">
          <ellipse cx="600" cy="280" rx="210" ry="160" />
        </g>
      )}
    </svg>
  )
}
