export type Skill = {
  id: string
  name: string
  rank: string
  major: boolean
  items: string[]
}

export const skills: Skill[] = [
  {
    id: 'languages',
    name: 'Languages',
    rank: 'A♠',
    major: true,
    items: ['JavaScript', 'TypeScript', 'C++', 'SQL (PostgreSQL)', 'HTML', 'CSS'],
  },
  {
    id: 'frameworks',
    name: 'Frameworks & Libraries',
    rank: 'K♥',
    major: true,
    items: ['React.js', 'Node.js', 'Express.js', 'Zod', 'Socket.IO', 'WebRTC'],
  },
  {
    id: 'backend',
    name: 'Backend Systems',
    rank: 'Q♦',
    major: true,
    items: [
      'REST APIs',
      'JWT Authentication',
      'OAuth2',
      'Redis',
      'Rate Limiting',
      'Role-Based Access Control (RBAC)',
      'WebSockets',
    ],
  },
  {
    id: 'databases',
    name: 'Databases',
    rank: 'J♣',
    major: true,
    items: ['PostgreSQL', 'MongoDB', 'Prisma ORM'],
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    rank: '10♠',
    major: true,
    items: [
      'Docker',
      'GitHub Actions',
      'Microsoft Azure (Virtual Machines)',
      'Nginx',
      'Linux Server Administration',
    ],
  },
  {
    id: 'tools',
    name: 'Developer Tools',
    rank: '9♥',
    major: true,
    items: ['Git', 'GitHub', 'Postman', 'Linux', 'VS Code'],
  },
]

export const supportingTechnologies: string[] = []
