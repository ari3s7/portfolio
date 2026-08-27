import type { SectionId } from '@/state/types'

type GoToSectionOptions = {
  prefersReducedMotion: boolean
  setActiveSection: (section: SectionId | null) => void
}

export function goToSection(
  target: SectionId,
  { prefersReducedMotion, setActiveSection }: GoToSectionOptions,
): void {
  setActiveSection(target)
  window.history.replaceState(null, '', `#${target}`)
  const node = document.getElementById(target)
  if (target !== 'about') {
    node?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }
  if (node && !node.inert) {
    node.focus({ preventScroll: true })
  }
}
