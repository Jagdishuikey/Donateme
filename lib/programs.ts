export type Program = {
  slug: string;
  title: string;
  eyebrow: string;
  location: string;
  summary: string;
  problem: string;
  plan: string[];
  outcomes: string[];
  raised: number;
  goal: number;
  donors: number;
  accent: string;
  bg: string;
};

export const programs: Program[] = [
  {
    slug: "solar-schools",
    title: "Solar Classrooms",
    eyebrow: "Education",
    location: "Kenya, Nepal, India",
    summary:
      "Equip rural learning centers with solar power, offline tablets, and teacher kits so classes continue after sunset.",
    problem:
      "Many community schools lose learning hours because electricity is unreliable and printed materials arrive late.",
    plan: [
      "Install compact solar kits for one classroom at a time.",
      "Ship offline-first lesson tablets with local language content.",
      "Train teachers to run after-school STEM circles."
    ],
    outcomes: ["18,400 study hours restored", "72 classrooms powered", "9,600 learners reached"],
    raised: 74200,
    goal: 100000,
    donors: 1184,
    accent: "bg-sun",
    bg: "from-[#fff4cf] to-[#eff7df]"
  },
  {
    slug: "clean-water-nodes",
    title: "Clean Water Nodes",
    eyebrow: "Health",
    location: "Bangladesh, Malawi",
    summary:
      "Build community-managed filtration points with live maintenance logs and transparent repair funds.",
    problem:
      "Families spend hours collecting unsafe water, and broken wells often stay broken because repair accountability is unclear.",
    plan: [
      "Deploy low-maintenance filtration kiosks near schools and clinics.",
      "Train local operators and publish weekly quality checks.",
      "Reserve 12 percent of every gift for future repairs."
    ],
    outcomes: ["4.1M liters filtered", "31 operators trained", "42 percent less water travel time"],
    raised: 51890,
    goal: 85000,
    donors: 736,
    accent: "bg-river",
    bg: "from-[#d7f1ef] to-[#f7f3ea]"
  },
  {
    slug: "women-builder-fund",
    title: "Women Builder Fund",
    eyebrow: "Livelihood",
    location: "Rwanda, Indonesia",
    summary:
      "Offer micro-grants, business mentoring, and market access to women-led climate-resilient enterprises.",
    problem:
      "Women founders are closest to local solutions but often lack flexible capital, distribution, and trusted mentorship.",
    plan: [
      "Fund practical tools, inventory, and first hires.",
      "Match founders with monthly finance and sales mentors.",
      "Open shared storefronts for local cooperatives."
    ],
    outcomes: ["640 ventures supported", "2,900 jobs strengthened", "87 percent repayment health"],
    raised: 96840,
    goal: 120000,
    donors: 1542,
    accent: "bg-coral",
    bg: "from-[#ffe0d8] to-[#e7f2e8]"
  }
];

export const featuredProgram = programs[0];

export function getProgram(slug: string) {
  return programs.find((program) => program.slug === slug);
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}
