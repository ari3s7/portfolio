import { copy } from '@/data/copy'
import type { SectionId } from '@/state/types'

export type NavItem = {
  id: SectionId
  label: string
  target: SectionId
}

export const navigation: NavItem[] = [
  { id: 'about', label: copy.blades.about, target: 'about' },
  { id: 'projects', label: copy.blades.projects, target: 'projects' },
  { id: 'skills', label: copy.blades.skills, target: 'skills' },
  { id: 'experience', label: copy.blades.experience, target: 'experience' },
  { id: 'contact', label: copy.blades.contact, target: 'contact' },
]
