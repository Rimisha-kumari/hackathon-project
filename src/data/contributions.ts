import type { Contribution } from "./types"

/**
 * Sample past sessions for the prototype history screen.
 * Hours and beneficiary counts are placeholders, not measured outcomes.
 * A recurring deed can stay open after one sample session is completed.
 */
export const contributions: Contribution[] = [
  {
    id: "contribution-anita-library",
    deedId: "deed-library-pune",
    seniorId: "senior-anita",
    status: "completed",
    hours: 1,
    beneficiaryCount: 1,
    completedAt: "2026-09-18T08:00:00.000Z",
  },
  {
    id: "contribution-anita-cooking",
    deedId: "deed-cooking-pune",
    seniorId: "senior-anita",
    status: "completed",
    hours: 2,
    beneficiaryCount: 4,
    completedAt: "2026-10-11T08:00:00.000Z",
  },
  {
    id: "contribution-mei-digital",
    deedId: "deed-digital-toa-payoh",
    seniorId: "senior-mei",
    status: "completed",
    hours: 1,
    beneficiaryCount: 1,
    completedAt: "2026-10-20T04:00:00.000Z",
  },
]
