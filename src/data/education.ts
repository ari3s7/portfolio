export type EducationKind = 'education' | 'beginnings'

export type EducationItem = {
  id: string
  institution: string
  credential: string
  years: string
  kind?: EducationKind
}

export const education: EducationItem[] = [
  {
    id: 'aktu-btech',
    institution: 'Dr. A.P.J. Abdul Kalam Technical University, Lucknow',
    credential: 'B.Tech in Computer Science & Engineering',
    years: '2023–2027',
  },
  {
    id: 'coding-start',
    institution:
      'Began programming and web development, building my first projects and a passion for creating with code.',
    credential: 'Started Coding & Web Development',
    years: '2022',
    kind: 'beginnings',
  },
  {
    id: 'reliance-xii',
    institution: '',
    credential: 'Senior Secondary (XII)',
    years: '2021',
  },
  {
    id: 'basil-x',
    institution: '',
    credential: 'Secondary (X)',
    years: '2019',
  },
]
