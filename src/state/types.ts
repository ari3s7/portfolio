export const SECTION_IDS = [
  'about',
  'projects',
  'skills',
  'experience',
  'decide',
  'deal',
  'contact',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

export type ExperienceGates = {
  matchLit: boolean
  cigaretteLit: boolean
}

export const INITIAL_GATES: ExperienceGates = {
  matchLit: false,
  cigaretteLit: false,
}
