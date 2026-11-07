import type { SeniorProfile } from "./types"

/**
 * Sample people for the prototype. Anita is the demo senior used before
 * someone sets their own preferences. These are not real users.
 */
export const demoSenior: SeniorProfile = {
  id: "senior-anita",
  firstName: "Anita",
  skills: ["teaching"],
  interests: ["stories"],
  languages: ["Hindi"],
  country: "India",
  area: "Pune",
  availability: "2 hours/week",
  preferredEffort: "Moderate",
}

export const seniors: SeniorProfile[] = [
  demoSenior,
  {
    id: "senior-rahim",
    firstName: "Rahim",
    skills: ["repair"],
    interests: ["practical help"],
    languages: ["English", "Malay"],
    country: "Singapore",
    area: "Tampines",
    availability: "2 hours/week",
    preferredEffort: "Moderate",
  },
  {
    id: "senior-mei",
    firstName: "Mei",
    skills: ["walking", "digital skills"],
    interests: ["outdoors", "helping peers"],
    languages: ["English", "Mandarin"],
    country: "Singapore",
    area: "Bedok",
    availability: "1 hour/week",
    preferredEffort: "Light",
  },
  {
    id: "senior-joseph",
    firstName: "Joseph",
    skills: ["conversation"],
    interests: ["language"],
    languages: ["English", "Hindi"],
    country: "India",
    area: "Pune",
    availability: "1 hour/week",
    preferredEffort: "Light",
  },
]
