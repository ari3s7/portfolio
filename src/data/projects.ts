export type Project = {
  id: string
  number: string
  title: string
  description: string
  technologies: string[]
  status: string
  result: string
  image?: string
  github?: string
  live?: string
}

export const projects: Project[] = [
  {
    id: 'klyro',
    number: '001',
    title: 'Klyro',
    description:
      'Discord-inspired real-time communication platform supporting text messaging, voice channels, and multi-user voice communication using Socket.IO and WebRTC signaling.',
    technologies: [
      'TypeScript',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'Socket.IO',
      'WebRTC',
      'React',
    ],
    status: '',
    result:
      '10+ normalized PostgreSQL relational models using Prisma ORM. 35+ REST APIs for authentication, server/channel management, memberships, messaging, voice signaling, and user operations. JWT authentication with secure refresh token rotation. Redis caching and protected routes. Real-time messaging using WebSockets. Deployed on Microsoft Azure Ubuntu VM using Nginx and PM2. GitHub Actions CI/CD pipeline.',
  },
  {
    id: 'recoverai',
    number: '002',
    title: 'RecoverAI',
    description: 'Agentic workflow with a hard policy layer for failed-subscription recovery.',
    technologies: [
      'TypeScript',
      'Next.js',
      'React',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Prisma',
      'Neon',
      'Zod',
      'Razorpay API',
      'OpenAI API',
    ],
    status: '',
    result:
      'Razorpay integration across detect, diagnose, intervene, execute, and stop stages. TypeScript monorepo using Next.js 15, Express.js, PostgreSQL/Neon, Prisma and shared Zod schemas. Risk-scoring and policy engine with retry limits, quiet hours, DNC rules, promise-to-pay holds, and a 5-stage recovery escalation ladder. Operator dashboard tracking INR at risk, INR recovered, recovery rate, root-cause analytics, batch execution, and audit timelines. 80-subscription demo dataset.',
  },
  {
    id: 'github-analytics',
    number: '003',
    title: 'GitHub Repository Analytics Platform',
    description:
      'Backend platform for analyzing public GitHub repositories using GitHub REST APIs.',
    technologies: ['TypeScript', 'Express.js', 'Redis', 'GitHub OAuth', 'JWT'],
    status: '',
    result:
      'Repository comparison. Language analytics. Repository health scoring using stars, forks, issues, and activity metrics. GitHub OAuth and JWT authentication. Redis caching. Reduced API response time from approximately 600ms to approximately 3ms.',
  },
]
