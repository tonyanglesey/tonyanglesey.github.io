/**
 * Site content, ported from the current live tonyanglesey.github.io home page
 * and the v2-blue redesign mockup. Editing copy here updates every page.
 */

export const profile = {
  name: "Tony Anglesey",
  role: "Full-stack developer and UI/UX designer in Chicago and New York.",
  lede:
    "Over twenty years building software that ships. Founder of lla.ma and Zen Fitness, crafting high-performance web and mobile apps that blend clean code with intuitive, user-focused design.",
  availability: "Available for new work, remote or on-site",
  resumeHref: "/TonyAnglesey-Resume.pdf",
  email: "tony@tonyanglesey.com",
} as const;

export const rail = {
  currently: {
    label: "Currently",
    title: "Founder, lla.ma",
    sub: "Open-source Postgres and deploy tooling",
  },
  focus: {
    label: "Focus",
    title: "Product engineering",
    sub: "Design systems, data-heavy interfaces, AI features",
  },
  stack: ["React", "Tailwind", "Supabase", "Postgres", "Node"],
  stackHighlight: "Node",
} as const;

export type Project = {
  name: string;
  blurb: string;
  tech: string;
  year: string;
  href: string;
  image: string;
  tint: string; // fallback background if image fails
};

export const projects: Project[] = [
  {
    name: "Zen Fitness",
    blurb: "AI-powered trainer & client dashboard with real-time fitness insights",
    tech: "React · JavaScript · Tailwind · Supabase",
    year: "2024 — present",
    href: "https://github.com/tonyanglesey",
    image: "/work/zen-fitness.png",
    tint: "#edf3e2",
  },
  {
    name: "Llama — lla.ma",
    blurb: "Developer infrastructure for AI agents — used by solo builders, teams, and enterprises alike.",
    tech: "NextJS · Bootstrap · JavaScript · Chart.js",
    year: "2026",
    href: "https://github.com/tonyanglesey/llama",
    image: "/work/llama.png",
    tint: "#e7eef7",
  },
  {
    name: "KEH Camera",
    blurb: "UI/UX-focused e-commerce redesign for certified pre-owned gear",
    tech: "WordPress · Adobe Commerce (Magento) · PHP",
    year: "2022",
    href: "https://github.com/tonyanglesey",
    image: "/work/keh.png",
    tint: "#fbede6",
  },
];

export type Solution = {
  num: string;
  title: string;
  blurb: string;
  points: string[];
};

export const solutions: Solution[] = [
  {
    num: "01",
    title: "Custom software development",
    blurb: "Tailored solutions built to meet your specific business needs.",
    points: [
      "Full-stack web applications",
      "API design and integration",
      "Legacy system modernization",
    ],
  },
  {
    num: "02",
    title: "Mobile app development",
    blurb: "Native and cross-platform apps that deliver exceptional UX.",
    points: [
      "iOS & Android development",
      "React Native applications",
      "Progressive Web Apps (PWA)",
    ],
  },
  {
    num: "03",
    title: "Web development",
    blurb: "Modern, responsive sites and apps built on the latest stack.",
    points: [
      "Responsive web design",
      "E-commerce solutions",
      "Single-page applications",
    ],
  },
  {
    num: "04",
    title: "Cloud & DevOps",
    blurb: "Scalable infrastructure to power your digital transformation.",
    points: [
      "Cloud migration & serverless",
      "Self-hosting & cost reduction",
      "CI/CD and deploy pipelines",
    ],
  },
  {
    num: "05",
    title: "Consulting & strategy",
    blurb: "Guidance for complex technical decisions and implementations.",
    points: [
      "Technical architecture review",
      "Technology stack selection",
      "Performance optimization",
    ],
  },
];

export const llama = {
  pill: "Open source",
  title: "lla.ma",
  blurb:
    "A small suite of self-hosted tools. Build in the open, run it on your own box, keep the data yours.",
  github: "https://github.com/tonyanglesey/llama",
  repos: [
    {
      name: "llama-base",
      blurb:
        "An AI-native Postgres console with Supabase Studio's polish, for any database.",
      href: "https://github.com/tonyanglesey/llama",
    },
    {
      name: "llama-apps",
      blurb:
        "Git-to-deploy app platform. Push, build, and run on your own infrastructure.",
      href: "https://github.com/tonyanglesey/llama",
    },
    {
      name: "llama-cli",
      blurb: "Drive the whole suite from a terminal — scriptable and fast.",
      href: "https://github.com/tonyanglesey/llama",
    },
  ],
} as const;

export const socials = [
  // { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: "@tonyanglesey", href: "https://github.com/tonyanglesey" },
  { label: "LinkedIn", value: "in/tonyanglesey", href: "https://linkedin.com/in/tonyanglesey" },
  { label: "X", value: "@tanglesey", href: "https://x.com/tanglesey" },
  { label: "Instagram", value: "@tonyanglesey", href: "https://instagram.com/tonyanglesey" },
  { label: "Résumé", value: "PDF, 2 pages", href: profile.resumeHref },
] as const;
