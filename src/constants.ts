import { Candidate, Job, Recruiter, Task } from './types';

export const RECRUITERS: Recruiter[] = [
  {
    id: '1',
    name: 'Sarah Connor',
    role: 'Senior Tech Recruiter',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    activeJobs: 12,
    placementsThisMonth: 4
  }
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'c1',
    name: 'Alex Rivera',
    role: 'Senior Full Stack Engineer',
    company: 'Vercel',
    experience: 8,
    location: 'Remote (GMT-5)',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
    salaryExpectation: '$160k - $180k',
    status: 'interview',
    aiScore: 94,
    aiSummary: 'Relentless focus on performance and DX. Strong background in infrastructure and frontend patterns. Previously led teams at high-growth startups.',
    lastContacted: '2024-05-10',
    email: 'alex.rivera@example.com',
    ownerId: '1'
  },
  {
    id: 'c2',
    name: 'Jessica Chen',
    role: 'Engineering Manager',
    company: 'Stripe',
    experience: 12,
    location: 'San Francisco, CA',
    skills: ['Leadership', 'System Design', 'Ruby', 'Go', 'API Design'],
    salaryExpectation: '$220k - $250k',
    status: 'client_interview',
    aiScore: 88,
    aiSummary: 'Exceptional leader with a track record of scaling engineering orgs. Deep technical expertise in payment systems and distributed architecture.',
    lastContacted: '2024-05-08',
    email: 'j.chen@example.com',
    ownerId: '1'
  },
  {
    id: 'c3',
    name: 'Marcus Thorne',
    role: 'DevOps Engineer',
    company: 'HashiCorp',
    experience: 6,
    location: 'Berlin, Germany',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Python', 'CI/CD'],
    salaryExpectation: '€90k - €110k',
    status: 'screening',
    aiScore: 82,
    aiSummary: 'Cloud-native expert with extensive experience in automation and infrastructure-as-code. Strong problem-solving skills and security mindset.',
    lastContacted: '2024-05-11',
    email: 'marcus.t@example.com',
    ownerId: '1'
  },
  {
    id: 'c4',
    name: 'Elena Vance',
    role: 'Product Designer',
    company: 'Figma',
    experience: 5,
    location: 'London, UK',
    skills: ['UI/UX', 'Prototyping', 'Design Systems', 'React'],
    salaryExpectation: '£75k - £90k',
    status: 'contacted',
    aiScore: 91,
    aiSummary: 'Visually impeccable designer with strong technical understanding. Excellent at bridging the gap between design and engineering.',
    lastContacted: '2024-05-09',
    email: 'elena.v@example.com',
    ownerId: '1'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Senior Frontend Engineer',
    company: 'Linear',
    location: 'Remote',
    salary: '$150k - $200k',
    type: 'full-time',
    status: 'open',
    postedAt: '2024-05-01',
    pipelineCount: 24,
    ownerId: '1'
  },
  {
    id: 'j2',
    title: 'Staff Backend Engineer (Go)',
    company: 'Supabase',
    location: 'Remote',
    salary: '$180k - $240k',
    type: 'full-time',
    status: 'open',
    postedAt: '2024-04-28',
    pipelineCount: 18,
    ownerId: '1'
  },
  {
    id: 'j3',
    title: 'Principal Designer',
    company: 'Vante',
    location: 'New York, NY',
    salary: '$200k+',
    type: 'full-time',
    status: 'on-hold',
    postedAt: '2024-05-05',
    pipelineCount: 32,
    ownerId: '1'
  }
];

export const MOCK_TASKS: Task[] = [
  { id: 't1', title: 'Call Alex Rivera for brief sync', dueDate: '2024-05-12T14:30:00Z', priority: 'high', status: 'todo', order: 0, completed: false, type: 'follow-up', candidateId: 'c1' },
  { id: 't2', title: 'Review feedback for Jessica Chen', dueDate: '2024-05-12T16:00:00Z', priority: 'medium', status: 'in_progress', order: 0, completed: false, type: 'screening', candidateId: 'c2' },
  { id: 't3', title: 'Schedule interview for Staff Backend', dueDate: '2024-05-13T10:00:00Z', priority: 'medium', status: 'todo', order: 1, completed: false, type: 'interview' }
];
