export type EducationItem = {
  id: string
  institution: string
  credential: string
  years: string
}

export const education: EducationItem[] = [
  {
    id: 'aktu-btech',
    institution: 'Dr. A.P.J. Abdul Kalam Technical University, Lucknow',
    credential: 'B.Tech in Computer Science & Engineering',
    years: '2023–2027',
  },
  {
    id: 'reliance-xii',
    institution: 'Reliance Academy, Gorakhpur, UP',
    credential: 'Senior Secondary (XII)',
    years: '2021',
  },
  {
    id: 'basil-x',
    institution: "St. Basil's School, Basti, UP",
    credential: 'Secondary (X)',
    years: '2019',
  },
]
