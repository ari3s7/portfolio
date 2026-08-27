import { useRef } from 'react'
import { SmokeWisps } from '@/components/atmosphere/SmokeWisps'
import { useCigaretteSmoke } from '@/hooks/useCigaretteSmoke'
import { useExperience } from '@/state/useExperience'

type SmokeFieldProps = {
  originSelector?: string
}

export function SmokeField({ originSelector = '.cig-tip-hotspot' }: SmokeFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { gates, prefersReducedMotion, performanceTier } = useExperience()

  useCigaretteSmoke({
    canvasRef,
    originSelector,
    active: gates.cigaretteLit,
    reducedMotion: prefersReducedMotion,
    performanceTier,
  })

  return (
    <div
      className={`smoke-field${gates.cigaretteLit ? ' is-lit' : ''}${prefersReducedMotion ? ' is-static' : ''}`}
      aria-hidden="true"
    >
      <SmokeWisps layer="back" />
      <canvas ref={canvasRef} className="smoke-canvas" />
      <div className="smoke-haze" />
      <SmokeWisps layer="front" />
    </div>
  )
}
