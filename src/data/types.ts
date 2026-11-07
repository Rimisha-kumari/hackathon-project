/**
 * Sample records for the Karya prototype.
 * They are not real programmes, partners, people, or measured results.
 */
export const DEMO_DATA_LABEL =
  "Sample data for the Karya prototype. These are not real programmes, partners, or measured results."

export const COUNTRIES = ["Singapore", "India"] as const

export const LANGUAGES = [
  "English",
  "Hindi",
  "Mandarin",
  "Malay",
  "Tamil",
] as const

export const SKILLS = [
  "teaching",
  "reading",
  "repair",
  "walking",
  "cooking",
  "digital skills",
  "conversation",
  "storytelling",
] as const

export const INTERESTS = [
  "children",
  "stories",
  "practical help",
  "outdoors",
  "books",
  "language",
  "food",
  "helping peers",
] as const

export const WEEKLY_TIMES = [
  "1 hour/week",
  "2 hours/week",
  "Half a day/week",
] as const

export const EFFORTS = ["Light", "Moderate", "Steady"] as const

export const DEED_STATUSES = ["open", "confirmed", "completed"] as const

export const INTEREST_STATUSES = ["interested", "confirmed"] as const

export const CONTRIBUTION_STATUSES = ["completed"] as const

export type Country = (typeof COUNTRIES)[number]

export type Language = (typeof LANGUAGES)[number]

export type Skill = (typeof SKILLS)[number]

export type InterestTopic = (typeof INTERESTS)[number]

export type WeeklyTime = (typeof WEEKLY_TIMES)[number]

export type Effort = (typeof EFFORTS)[number]

export type DeedStatus = (typeof DEED_STATUSES)[number]

export type InterestStatus = (typeof INTEREST_STATUSES)[number]

export type ContributionStatus = (typeof CONTRIBUTION_STATUSES)[number]

export type Deed = {
  id: string
  title: string
  summary: string
  description: string
  country: Country
  area: string
  language: Language[]
  skills: Skill[]
  interests: InterestTopic[]
  /** Weekly time the deed asks for. */
  duration: WeeklyTime
  /** When a session happens, in plain language. */
  time: string
  effort: Effort
  beneficiary: string
  location: string
  status: DeedStatus
  createdAt: string
}

export type SeniorProfile = {
  id: string
  firstName: string
  skills: Skill[]
  interests: InterestTopic[]
  languages: Language[]
  country: Country
  area: string
  availability: WeeklyTime
  preferredEffort: Effort
}

export type Interest = {
  id: string
  deedId: string
  seniorId: string
  status: InterestStatus
  createdAt: string
}

export type Contribution = {
  id: string
  deedId: string
  seniorId: string
  status: ContributionStatus
  /** Placeholder hours for the prototype layout. Not a measured result. */
  hours: number
  /** Placeholder count for the prototype layout. Not a measured result. */
  beneficiaryCount: number
  completedAt: string
}

export type Centre = {
  id: string
  name: string
  country: Country
  area: string
}
