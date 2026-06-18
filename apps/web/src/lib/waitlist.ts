export const WAITLIST = {
  bg: "#f8f3ef",
  text: "#1a1a1a",
  muted: "#9a9490",
  border: "#d8d5cf",
  barInactive: "#e8e0d8",
  barActive: "#1a1a1a",
  inputBg: "#ffffff",
  pillInactive: "#ffffff",
  pillActive: "#1a1a1a",
} as const;

export const WAITLIST_CITIES = [
  {
    id: "nyc",
    name: "New York",
    plans: "2,481",
    image: "/waitlist/cities/new-york.png",
  },
  {
    id: "boston",
    name: "Boston",
    plans: "1,202",
    image: "/waitlist/cities/boston.png",
  },
  {
    id: "miami",
    name: "Miami",
    plans: "973",
    image: "/waitlist/cities/miami.png",
  },
  {
    id: "la",
    name: "Los Angeles",
    plans: "1,156",
    image: "/waitlist/cities/los-angeles.png",
  },
] as const;

export const WAITLIST_HERO_CITIES = [
  "NYC",
  "Boston",
  "Miami",
  "Los Angeles",
  "Chicago",
] as const;

export const WAITLIST_JOIN_STEPS = [
  { href: "/waitlist/market", label: "Market" },
  { href: "/waitlist/name", label: "Name" },
  { href: "/waitlist/school", label: "School" },
  { href: "/waitlist/email", label: "Email" },
] as const;

export type WaitlistJoinStepIndex = 0 | 1 | 2 | 3;
