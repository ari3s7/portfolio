import { createContext } from 'react'
import type { PerformanceTier, PointerMode } from '@/lib/breakpoints'
import type { ExperienceGates, SectionId } from '@/state/types'

export type ExperienceContextValue = {
  hasEntered: boolean
  bladesRevealed: boolean
  gates: ExperienceGates
  soundEnabled: boolean
  activeSection: SectionId | null
  performanceTier: PerformanceTier
  prefersReducedMotion: boolean
  pointerMode: PointerMode
  setHasEntered: (value: boolean) => void
  setBladesRevealed: (value: boolean) => void
  setGate: (gate: keyof ExperienceGates, value: boolean) => void
  setSoundEnabled: (value: boolean) => void
  setActiveSection: (section: SectionId | null) => void
}

export const ExperienceContext = createContext<ExperienceContextValue | null>(
  null,
)
