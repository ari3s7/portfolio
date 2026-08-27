import { education } from '@/data/education'

export type ExperienceKind =
  | 'education'
  | 'work'
  | 'project'
  | 'achievement'
  | 'milestone'

export type ExperienceItem = {
  id: string
  year: string
  title: string
  kind: ExperienceKind
  summary: string
}

export type Achievement = {
  id: string
  title: string
  summary: string
}

export const experience: ExperienceItem[] = education.map((item) => ({
  id: item.id,
  year: item.years,
  title: item.credential,
  kind: 'education',
  summary: item.institution,
}))

export const achievements: Achievement[] = []
