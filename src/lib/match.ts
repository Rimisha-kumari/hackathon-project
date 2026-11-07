import type { Deed, Effort, SeniorProfile, WeeklyTime } from "../data/types"

/**
 * Karya Match for the prototype.
 * Scores come from the fixed weights below. This is not a trained model.
 */
export const MATCH_WEIGHTS = {
  language: 30,
  area: 20,
  skill: 20,
  interest: 15,
  availability: 10,
  effort: 5,
} as const

/** Points when the country matches and the area does not. */
export const SAME_COUNTRY_AREA_POINTS = 8

export type MatchFactor =
  | "language"
  | "area"
  | "skill"
  | "interest"
  | "availability"
  | "effort"

export type MatchReason = {
  factor: MatchFactor
  label: string
}

export type DeedMatch = {
  deed: Deed
  /** Whole number from 0 to 100. */
  score: number
  reasons: MatchReason[]
}

const WEEKLY_HOURS: Record<WeeklyTime, number> = {
  "1 hour/week": 1,
  "2 hours/week": 2,
  "Half a day/week": 4,
}

const EFFORT_RANK: Record<Effort, number> = {
  Light: 0,
  Moderate: 1,
  Steady: 2,
}

type ScorePart = {
  points: number
  reasons: MatchReason[]
}

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function overlaps<T extends string>(left: T[], right: T[]) {
  const wanted = new Set(right.map((item) => normalize(item)))
  const seen = new Set<string>()
  const shared: T[] = []

  for (const item of left) {
    const key = normalize(item)
    if (wanted.has(key) && !seen.has(key)) {
      seen.add(key)
      shared.push(item)
    }
  }

  return shared
}

function scoreLanguage(senior: SeniorProfile, deed: Deed): ScorePart {
  const shared = overlaps(senior.languages, deed.language)
  if (shared.length === 0) {
    return { points: 0, reasons: [] }
  }

  return {
    points: MATCH_WEIGHTS.language,
    reasons: [{ factor: "language", label: "Matches your language" }],
  }
}

function scoreArea(senior: SeniorProfile, deed: Deed): ScorePart {
  const sameArea = normalize(senior.area) === normalize(deed.area)
  if (sameArea && senior.country === deed.country) {
    return {
      points: MATCH_WEIGHTS.area,
      reasons: [{ factor: "area", label: "Matches your area" }],
    }
  }

  if (senior.country === deed.country) {
    return {
      points: SAME_COUNTRY_AREA_POINTS,
      reasons: [{ factor: "area", label: "Same country, another area" }],
    }
  }

  return { points: 0, reasons: [] }
}

function scoreSkills(senior: SeniorProfile, deed: Deed): ScorePart {
  const shared = overlaps(senior.skills, deed.skills)
  if (shared.length === 0) {
    return { points: 0, reasons: [] }
  }

  return {
    points: MATCH_WEIGHTS.skill,
    reasons: shared.map((skill) => ({
      factor: "skill" as const,
      label: `Matches your ${skill} interest`,
    })),
  }
}

function scoreInterests(senior: SeniorProfile, deed: Deed): ScorePart {
  const shared = overlaps(senior.interests, deed.interests)
  if (shared.length === 0) {
    return { points: 0, reasons: [] }
  }

  return {
    points: MATCH_WEIGHTS.interest,
    reasons: shared.map((topic) => ({
      factor: "interest" as const,
      label: `Matches your ${topic} interest`,
    })),
  }
}

function scoreAvailability(senior: SeniorProfile, deed: Deed): ScorePart {
  const seniorHours = WEEKLY_HOURS[senior.availability]
  const deedHours = WEEKLY_HOURS[deed.duration]

  if (seniorHours < deedHours) {
    return { points: 0, reasons: [] }
  }

  return {
    points: MATCH_WEIGHTS.availability,
    reasons: [{ factor: "availability", label: "Matches your available time" }],
  }
}

function scoreEffort(senior: SeniorProfile, deed: Deed): ScorePart {
  if (EFFORT_RANK[senior.preferredEffort] !== EFFORT_RANK[deed.effort]) {
    return { points: 0, reasons: [] }
  }

  return {
    points: MATCH_WEIGHTS.effort,
    reasons: [{ factor: "effort", label: "Matches your preferred effort" }],
  }
}

export function explainMatchRules() {
  return [
    `A shared language is ${MATCH_WEIGHTS.language} points.`,
    `The same area is ${MATCH_WEIGHTS.area} points. The same country, in another area, is ${SAME_COUNTRY_AREA_POINTS} points.`,
    `Sharing at least one skill is ${MATCH_WEIGHTS.skill} points. Each shared skill is listed as a reason.`,
    `Sharing at least one interest is ${MATCH_WEIGHTS.interest} points. Each shared interest is listed as a reason.`,
    `Enough time for the deed is ${MATCH_WEIGHTS.availability} points. A shorter deed still fits.`,
    `The same effort is ${MATCH_WEIGHTS.effort} points. A different effort adds no points.`,
    "The points are added and shown as a score out of 100.",
    "Karya Match uses these fixed rules. It is not a trained model.",
  ]
}

export function scoreDeed(senior: SeniorProfile, deed: Deed): DeedMatch {
  const parts = [
    scoreLanguage(senior, deed),
    scoreArea(senior, deed),
    scoreSkills(senior, deed),
    scoreInterests(senior, deed),
    scoreAvailability(senior, deed),
    scoreEffort(senior, deed),
  ]

  const score = parts.reduce((total, part) => total + part.points, 0)
  const seen = new Set<string>()
  const reasons = parts
    .flatMap((part) => part.reasons)
    .filter((reason) => {
      if (seen.has(reason.label)) {
        return false
      }
      seen.add(reason.label)
      return true
    })

  return { deed, score, reasons }
}

export function matchDeeds(senior: SeniorProfile, deeds: Deed[]): DeedMatch[] {
  return deeds
    .map((deed) => scoreDeed(senior, deed))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score
      }
      return left.deed.title.localeCompare(right.deed.title)
    })
}
