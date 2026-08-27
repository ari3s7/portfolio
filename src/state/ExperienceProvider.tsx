import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { usePerformanceTier } from '@/hooks/usePerformanceTier'
import { usePointerMode } from '@/hooks/usePointerMode'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import {
  ExperienceContext,
  type ExperienceContextValue,
} from '@/state/experience-context'
import { INITIAL_GATES, type ExperienceGates, type SectionId } from '@/state/types'

type ExperienceProviderProps = {
  children: ReactNode
}

export function ExperienceProvider({ children }: ExperienceProviderProps) {
  const performanceTier = usePerformanceTier()
  const prefersReducedMotion = usePrefersReducedMotion()
  const pointerMode = usePointerMode()

  const [hasEntered, setHasEntered] = useState(false)
  const [bladesRevealed, setBladesRevealed] = useState(false)
  const [gates, setGates] = useState<ExperienceGates>(INITIAL_GATES)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)

  const setActiveSectionIfChanged = useCallback((value: SectionId | null) => {
    setActiveSection((current) => (current === value ? current : value))
  }, [])

  const setGate = useCallback(
    (gate: keyof ExperienceGates, value: boolean) => {
      setGates((current) =>
        current[gate] === value ? current : { ...current, [gate]: value },
      )
    },
    [],
  )

  useEffect(() => {
    const root = document.documentElement
    root.dataset.performanceTier = performanceTier
    root.dataset.reducedMotion = String(prefersReducedMotion)
    root.dataset.pointerMode = pointerMode
    root.dataset.hasEntered = String(hasEntered)
    root.dataset.bladesRevealed = String(bladesRevealed)
    root.dataset.soundEnabled = String(soundEnabled)
    root.dataset.matchLit = String(gates.matchLit)
    root.dataset.cigaretteLit = String(gates.cigaretteLit)
  }, [
    bladesRevealed,
    gates.cigaretteLit,
    gates.matchLit,
    hasEntered,
    performanceTier,
    prefersReducedMotion,
    pointerMode,
    soundEnabled,
  ])

  const value = useMemo<ExperienceContextValue>(
    () => ({
      hasEntered,
      bladesRevealed,
      gates,
      soundEnabled,
      activeSection,
      performanceTier,
      prefersReducedMotion,
      pointerMode,
      setHasEntered,
      setBladesRevealed,
      setGate,
      setSoundEnabled,
      setActiveSection: setActiveSectionIfChanged,
    }),
    [
      hasEntered,
      bladesRevealed,
      gates,
      soundEnabled,
      activeSection,
      performanceTier,
      prefersReducedMotion,
      pointerMode,
      setGate,
      setActiveSectionIfChanged,
    ],
  )

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  )
}
