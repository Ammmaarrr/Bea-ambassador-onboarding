import type { WaitlistArtboardId, WaitlistStepArtboardId } from "@/lib/waitlist";

export type WaitlistStepContent = {
  title: string;
  subtitle?: string;
  titleSerif?: boolean;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export const WAITLIST_LANDING_CONTENT = {
  eyebrow: "LAUNCHING THIS SUMMER",
  title: "Together,\ntoday.",
  subtitle: "24 hour to chat. Only see active profiles.",
  emailPlaceholder: "Enter email to join waitlist",
  heroCities: ["NYC", "Boston", "Miami", "Los Angeles", "Chicago"] as const,
  timerHeading: "The countdown is on",
  timerBody: "We're launching city by city. The sooner you join, the sooner your market unlocks.",
  featuresEyebrow: "BUILT FOR THE MOMENT",
  featuresTitle: "24 hours to connect.",
  featuresSub: "Less text, more date.",
  features: [
    { icon: "♡", label: "Match with intention" },
    { icon: "◷", label: "Connect today" },
    { icon: "◎", label: "Explore anywhere" },
  ],
  launchCitiesLabel: "Launching first in",
  launchHeading: "Launching soon in",
  launchSubtitle:
    "We're curating something special.",
  experienceHeading: "Experience the waitlist",
  experienceSteps: [
    {
      number: 1,
      title: "Join the waitlist",
      description: "Choose your campus and market",
      icon: "calendar" as const,
    },
    {
      number: 2,
      title: "Friendly competition",
      description: "Daily icebreaker prompts\nPost and vote to gain points",
      icon: "star" as const,
    },
    {
      number: 3,
      title: "Win prizes & perks",
      description: "We're giving away in-app perks, merch, cash, & a car!",
      icon: "gift" as const,
    },
  ],
  footerTitle: "Join the waitlist for",
  footerEmphasis: "early access and perks",
  footerEmailPlaceholder: "Your email address",
  footerCta: "Join waitlist",
} as const;

export const WAITLIST_PAGE_CONTENT: Record<WaitlistStepArtboardId, WaitlistStepContent> = {
  "3": {
    title: "Which market do you\nwant to join",
    subtitle: "Select your city or search a city.",
    titleSerif: true,
    cta: { label: "Claim my spot", href: "/waitlist/4" },
    secondary: {
      label: "Continue without selecting a market",
      href: "/waitlist/4",
    },
  },
  "4": {
    title: "What do we\ncall you?",
    titleSerif: true,
    cta: { label: "Continue", href: "/waitlist/5" },
  },
  "5": {
    title: "Which school are\nyou affiliated with?",
    titleSerif: true,
    cta: { label: "Continue", href: "/waitlist/7" },
  },
  "7": {
    title: "Where should we\nsend the invite to?",
    subtitle: "We'll let you know the moment you can join",
    titleSerif: true,
    cta: { label: "Confirm email", href: "/waitlist/8" },
  },
};

export const WAITLIST_CONFIRMED_CONTENT = {
  title: "You're on the list!",
  subtitle: "Thanks for being part of bea\u200b.",
  rankEyebrow: "YOUR PLACE IN LINE",
  rankNumber: "#2,487",
  rankCity: "in New York, NY",
  progressLabel: "NYC PROGRESS",
  progressPercent: "85%",
  progressHint: "Almost there! Share with friends to help unlock your city sooner.",
  perksEyebrow: "UNLOCK PERKS",
  perksSubtitle: "Every friend you invite earns in-app rewards",
  perks: [
    {
      id: "early",
      title: "Early Access",
      description: "Be in the first cohort of\nusers when we launch",
      footer: "Invite 1 friend",
      active: true,
    },
    {
      id: "time",
      title: "Time Pack",
      description: "Extend conversations for\n24 hours",
      footer: "Invite 2 friends",
      active: false,
    },
    {
      id: "premium",
      title: "Premium Membership",
      description: "Free month of premium\nmembership on us",
      footer: "Invite 3 friends",
      active: false,
    },
  ],
  shareEyebrow: "SHARE YOUR LINK",
  waitingRoom: { label: "Waiting room", href: "/waitlist/9" },
  copyLabel: "Copy Invite Link",
  footerThankYou: "Thank you for helping build something meaningful.",
  footerClosing: "We can't wait to bring Bea to your community",
} as const;

export const WAITLIST_PRIZES_CONTENT = {
  title: "Waitlist prizes",
  subtitle: "Track your rank and see what you can unlock as you move up the list.",
  cta: { label: "Back to confirmation", href: "/waitlist/8" },
} as const;

/** App-shell chrome from artboard 9 (sidebar nav, profile, rank cards). */
export const WAITLIST_APP_SHELL = {
  logo: "Bea",
  profile: { name: "Ron", org: "Northeastern", avatar: "/waitlist/avatars/ron.png" },
  nav: [
    { label: "Today", icon: "today" as const },
    { label: "Top Voices", icon: "voices" as const },
    { label: "Markets", icon: "markets" as const },
    { label: "Invite Friends", icon: "invite" as const },
    { label: "Rewards", icon: "rewards" as const, active: true },
  ],
  ranks: [
    { org: "Northeastern", detail: "#2 in Boston" },
    { org: "Northeastern", detail: "#4 in America" },
  ],
} as const;

/** Full artboard-9 content for the coded mobile prizes screen. */
export const WAITLIST_PRIZES_DETAIL = {
  title: "Waitlist Prizes",
  subtitle: [
    "Earn points for participation in the waitlist!",
    "Prizes and perks, individual and school-based.",
  ],
  points: {
    eyebrow: "YOUR POINTS",
    value: "2,350",
    percent: 62,
    note: "Top 10% of all participants",
    historyLabel: "Points history",
  },
  featured: {
    heading: "Featured rewards",
    viewAll: "View all prizes",
    rewards: [
      {
        status: "100% Unlocked",
        title: "Annual Premium Membership",
        desc: ["Win exclusive Bea merch.", "Hoodie, hat, tote & more."],
        cost: "1200 points",
        cta: "Redeem",
      },
      {
        status: "100% Unlocked",
        title: "Bea merch bundle",
        desc: ["Win exclusive Bea merch.", "Hoodie, hat, tote & more."],
        cost: "1200 points",
        cta: "Redeem",
      },
      {
        status: "100% Unlocked",
        title: "Vintage car & merch package",
        desc: ["Win exclusive Bea merch.", "Hoodie, hat, tote & more."],
        cost: "Most points",
        cta: "Redeem",
      },
    ],
  },
  school: {
    eyebrow: "SCHOOL COMPETITION",
    desc: "The school with the most points in each market wins",
    prize: "1 month Premium",
    leaderLabel: "Current leader",
    leaderName: "Boston University",
    leaderPts: "1280 pts",
  },
  prompts: {
    eyebrow: "PROMPT POINTS BREAKDOWN",
    desc: "Awarded to the daily prompt winner",
    groups: [
      {
        label: "Campus Winners",
        icon: "campus" as const,
        places: ["1st: 100 pts", "2nd: 50 pts", "3rd: 25 pts"],
      },
      {
        label: "Market Winners",
        icon: "market" as const,
        places: ["1st: 300 pts", "2nd: 150 pts", "3rd: 75 pts"],
      },
      {
        label: "National Winners",
        icon: "national" as const,
        places: ["1st: 1000 pts", "2nd: 500 pts", "3rd: 250 pts"],
      },
    ],
  },
  earn: {
    heading: "Ways to earn points",
    items: [
      {
        title: "Invite friends",
        desc: "Earn 10 points for every friend who joins with your link",
        points: "+10",
      },
      {
        title: "Answer daily prompts",
        desc: "Participate in the daily prompt competition",
        points: "+5",
      },
      {
        title: "Give a like",
        desc: "Participate in the daily prompt competition",
        points: "+5",
      },
      {
        title: "Write a comment",
        desc: "Participate in the daily prompt competition",
        points: "+5",
      },
    ],
  },
  standing: {
    heading: "Your standing",
    ranks: [
      {
        title: "Campus rank",
        desc: "Earn 10 points for every friend who joins with your link",
        value: "#2",
        icon: "campus" as const,
      },
      {
        title: "Market rank",
        desc: "Participate in the daily prompt competition",
        value: "#10",
        icon: "market" as const,
      },
      {
        title: "National rank",
        desc: "Participate in the daily prompt competition",
        value: "#200",
        icon: "national" as const,
      },
    ],
    cta: "View full leaderboard",
  },
} as const;

export function isWaitlistStepId(id: WaitlistArtboardId): id is WaitlistStepArtboardId {
  return id === "3" || id === "4" || id === "5" || id === "7";
}
