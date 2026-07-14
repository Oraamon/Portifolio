export type JobTier = 'squire' | 'knight' | 'lancer' | 'holy-knight'

export interface JobMapping {
  fft: string
  career: string
}

export interface CharacterStats {
  hp: { label: string; value: number; max: number }
  mp: { label: string; value: number; max: number }
  ct: { label: string; value: number; max: number }
  brave: number
  faith: number
}

export interface PartyMember {
  id: string
  name: string
  fftName: string
  section: string
  route: string
  color: string
  accentColor: string
  job: string
  level: number
  stats: CharacterStats
  skills: string[]
  description?: string
}

export interface ExperienceEntry {
  company: string
  job: string
  jobTier: JobTier
  level: number
  exp: number
  period: string
  skillsLearned: string[]
  isCurrent?: boolean
}

export interface Project {
  name: string
  description: string
  stack: string[]
  link?: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export interface Education {
  institution: string
  degree: string
  period: string
  highlights: string[]
}

export interface ContactInfo {
  email: string
  linkedin: string
  github: string
  location: string
}

export interface Profile {
  name: string
  title: string
  level: number
  bio: string
  stats: CharacterStats
  skills: string[]
}

export type EquipmentSlot = 'shield' | 'weapon' | 'helm' | 'armor' | 'accessory'

export interface EquipmentItem {
  slot: EquipmentSlot
  name: string
  color: string
  subtitle?: string
}

export interface DetailStats {
  move: number
  jump: number
  speed: number
  physical: { at: number; cev: number; sev: number; aev: number }
  magical: { at: number; cev: number; sev: number; aev: number }
}
