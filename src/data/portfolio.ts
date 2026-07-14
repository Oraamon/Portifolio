import type {
  Certification,
  ContactInfo,
  Education,
  ExperienceEntry,
  JobMapping,
  PartyMember,
  Profile,
  Project,
} from '../types/portfolio'

export const profile: Profile = {
  name: 'Horácio Monte',
  title: 'Full Stack Developer',
  level: 25,
  bio: 'Passionate developer building robust web applications with modern stacks. I combine backend architecture with polished frontend experiences.',
  stats: {
    hp: { label: 'PHP/Laravel', value: 92, max: 100 },
    mp: { label: 'React.js', value: 88, max: 100 },
    ct: { label: 'MySQL', value: 85, max: 100 },
    brave: 95,
    faith: 90,
  },
  skills: ['Laravel', 'React', 'REST APIs', 'Docker', 'Git'],
}

export const jobMappings: JobMapping[] = [
  { fft: 'Squire', career: 'Intern' },
  { fft: 'Knight', career: 'Junior Developer' },
  { fft: 'Lancer', career: 'Mid-level Developer' },
  { fft: 'Holy Knight', career: 'Senior Developer' },
]

export const partyMembers: PartyMember[] = [
  {
    id: 'ramza',
    name: profile.name,
    fftName: 'Mime',
    section: 'About Me',
    route: '/status/about',
    color: '#4a7a4a',
    accentColor: '#6aaa6a',
    job: 'Full Stack Developer',
    level: profile.level,
    stats: profile.stats,
    skills: profile.skills,
    description: profile.bio,
  },
  {
    id: 'agrias',
    name: 'Black Chocobo',
    fftName: 'Black Chocobo',
    section: 'Professional Experience',
    route: '/status/experience',
    color: '#7a4a4a',
    accentColor: '#aa6a6a',
    job: 'Holy Knight',
    level: 18,
    stats: {
      hp: { label: 'Leadership', value: 90, max: 100 },
      mp: { label: 'Strategy', value: 85, max: 100 },
      ct: { label: 'Execution', value: 88, max: 100 },
      brave: 92,
      faith: 78,
    },
    skills: ['Team Lead', 'Agile', 'Architecture', 'Mentoring'],
  },
]

export const experiences: ExperienceEntry[] = [
  {
    company: 'Fetchly Labs',
    job: 'Full Stack Developer',
    jobTier: 'lancer',
    level: 12,
    exp: 28750,
    period: '2023 — Present',
    skillsLearned: ['Laravel', 'React', 'Payment Gateways', 'REST APIs'],
    isCurrent: true,
  },
  {
    company: 'Tech Solutions Inc.',
    job: 'Junior Developer',
    jobTier: 'knight',
    level: 8,
    exp: 15400,
    period: '2021 — 2023',
    skillsLearned: ['PHP', 'MySQL', 'Vue.js', 'Git'],
  },
  {
    company: 'Startup Hub',
    job: 'Intern',
    jobTier: 'squire',
    level: 3,
    exp: 4200,
    period: '2020 — 2021',
    skillsLearned: ['HTML', 'CSS', 'JavaScript', 'Git Basics'],
  },
]

export const projects: Project[] = [
  {
    name: 'Flight Management System',
    description: 'Complete aviation operations platform',
    stack: ['Laravel', 'React'],
  },
  {
    name: 'G.G — GAS GUARD',
    description: 'Gas leak detection system',
    stack: ['IoT', 'React Native', 'Node.js'],
  },
  {
    name: 'ENEM 2023 Data Analysis',
    description: 'Brazilian national exam data science project',
    stack: ['Python', 'Pandas', 'Matplotlib'],
  },
]

export const certifications: Certification[] = [
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
  { name: 'Laravel Certified Developer', issuer: 'Laravel', year: '2023' },
  { name: 'React Developer Certification', issuer: 'Meta', year: '2023' },
]

export const education: Education[] = [
  {
    institution: 'Federal University',
    degree: 'B.S. Computer Science',
    period: '2017 — 2021',
    highlights: ['Data Structures', 'Software Engineering', 'Database Systems'],
  },
]

export const contact: ContactInfo = {
  email: 'horacio.monte@email.com',
  linkedin: 'linkedin.com/in/horaciomonte',
  github: 'github.com/horaciomonte',
  location: 'Brazil',
}

export const menuItems = [
  { label: 'Status', route: '/status/about' },
  { label: 'Experience', route: '/status/experience' },
]

export const statusMenuItems = [
  { label: 'Party', route: '/' },
  { label: 'Status', route: '/status/about' },
  { label: 'Experience', route: '/status/experience' },
]

export const sectionEquipment = {
  about: [
    { slot: 'shield' as const, name: 'Laravel', color: '#e85020', subtitle: 'Backend Shield' },
    { slot: 'weapon' as const, name: 'React.js', color: '#48b8e8', subtitle: 'Main Weapon' },
    { slot: 'helm' as const, name: 'Docker', color: '#2080c0', subtitle: 'Container Helm' },
    { slot: 'armor' as const, name: 'MySQL', color: '#48b848', subtitle: 'Data Armor' },
    { slot: 'accessory' as const, name: 'Git', color: '#e88830', subtitle: 'Version Bracer' },
  ],
  experience: experiences.map((exp) => ({
    slot: 'armor' as const,
    name: exp.company,
    color: exp.isCurrent ? '#e85020' : '#8a8070',
    subtitle: `${getJobFFT(exp.jobTier)} · Lv.${exp.level}`,
  })),
}

export const sectionDetailStats = {
  about: {
    move: 5,
    jump: 4,
    speed: 12,
    physical: { at: 92, cev: 88, sev: 85, aev: 90 },
    magical: { at: 88, cev: 82, sev: 80, aev: 85 },
  },
  experience: {
    move: 4,
    jump: 3,
    speed: 10,
    physical: { at: 90, cev: 85, sev: 88, aev: 82 },
    magical: { at: 75, cev: 70, sev: 72, aev: 78 },
  },
}

export function getJobCareer(tier: ExperienceEntry['jobTier']): string {
  const map: Record<ExperienceEntry['jobTier'], string> = {
    squire: 'Intern',
    knight: 'Junior Developer',
    lancer: 'Mid-level Developer',
    'holy-knight': 'Senior Developer',
  }
  return map[tier]
}

export function getJobFFT(tier: ExperienceEntry['jobTier']): string {
  const map: Record<ExperienceEntry['jobTier'], string> = {
    squire: 'Squire',
    knight: 'Knight',
    lancer: 'Lancer',
    'holy-knight': 'Holy Knight',
  }
  return map[tier]
}
