import { useEffect } from 'react'
import { SECTION_IDS, type SectionId } from '@/state/types'

const SPY_IDS = ['opening', ...SECTION_IDS] as const

type UseSectionSpyOptions = {
  enabled: boolean
  setActiveSection: (section: SectionId | null) => void
}

export function useSectionSpy({
  enabled,
  setActiveSection,
}: UseSectionSpyOptions): void {
  useEffect(() => {
    if (!enabled) return

    const nodes = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => Boolean(node),
    )
    if (nodes.length === 0) return

    const ratios = new Map<string, number>()
    let last: SectionId | null | undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }

        let bestId = 'opening'
        let bestRatio = 0
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestId = id
            bestRatio = ratio
          }
        }

        if (bestRatio < 0.08) return
        const next = bestId === 'opening' ? null : (bestId as SectionId)
        if (next === last) return
        last = next
        setActiveSection(next)
      },
      {
        root: null,
        rootMargin: '-18% 0px -42% 0px',
        threshold: [0.08, 0.2, 0.35, 0.5],
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [enabled, setActiveSection])
}
