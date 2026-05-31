import type { Messages } from "./types";
import { consentCopy } from "./consent";

export const en: Messages = {
  meta: {
    role: "COO · PdM · Software Engineer",
    location: "Tokyo",
    year: "2026",
  },
  nav: {
    brand: "KOHTA KOUCHI",
    tagline: "COO · PDM · SOFTWARE ENGINEER",
  },
  hero: {
    kicker: "PROFILE — Who is Kohta?",
    nameJa: "河内 光太",
    title: "Kohta Kouchi",
    byline:
      "It's not that I'm so smart,\nit's just that I stay with problems longer.",
    intro: [
      "I'm a final-year law student at Gakushuin, but pretty much everything I know about building, I taught myself. I'm into AI and FinTech, digging into copyright and payment-services law on the side — and honestly, law and engineering feel worlds apart until you find the spots where they overlap, which is where it gets fun. I've shipped as a full-stack engineer for a handful of companies, and the stuff I've put out on my own has been used by 10,000+ people all in. At Simple I ran a full replatform of their core service and built new products from scratch; at Mercari's FinTech arm, Mercoin, I worked as a PdM on new currency launches. Design, front-end, product — I can take a thing the whole way on my own. That's kind of my whole deal.",
      "These days I'm COO at QueryLift, a company I started with a friend, building an LLM-powered analytics tool for the GEO era — making sure brands worth knowing actually show up when generative AI does the searching. The throughline for me has always been the same: there's no limit on being useful with tech, and the goal's to build things that quietly change what people take for granted. Off the clock, it's all music — I DJ at clubs and make videos. Same instinct, different medium: figure out how it works, then make something people feel.",
    ],
    ctaWork: "View work",
    ctaContact: "Get in touch",
    creative: {
      title: "Why I love making things",
      blocks: [
        "Give me a laptop and I can turn most of what's in my head into something real — and honestly, that's been the engine behind everything since I was a kid. Engineering just happens to be the medium that carries the act of making the furthest: write a little code, and a world exactly as you pictured it stands up on the screen, ready for someone else to walk into. I'm not the fastest in the room, and I'm not the flashiest. What I do have is a kind of stubbornness — I tend to stay with a problem long after most people have set it down, turning it over and over until it finally gives. Curiosity, mostly. I just really want to know how things work.",
        "That same itch spills over into the rest of my life. Cameras, video, the late nights I spend DJing in clubs — on paper they look like a different person's hobbies, but the wiring underneath is identical: figure out how a thing actually ticks, then build something a real person can feel. What I care about in the end isn't the technology itself; it's whoever's on the other side of it, and whether the thing I made quietly earned a place in their day. I'd take making one piece of work that genuinely moves somebody over ten that merely function. That, more than any stack or title, is the part of me I'd want you to know.",
      ],
    },
  },
  career: {
    kicker: "Career",
    title: "Where I've been working.",
    items: [
      {
        period: "2026.05 — Present · Tokyo",
        org: "Noahloy Inc.",
        role: "Frontend Engineer / Designer",
        desc: "At a company driving DX in the shipbuilding industry, leading the frontend replacement, design, design-system development and corporate branding.",
      },
      {
        period: "2025.02 — Present · Tokyo / Hybrid",
        org: "QueryLift Inc.",
        role: "Director / COO (Full-stack · Designer · PdM)",
        desc: 'A startup founded with a friend. Building an LLM-powered analytics tool that helps valuable brands stay correctly visible in the age of GEO (generative engine optimisation). With the mission of "conveying the right information the right way," I work across frontend development, design and product management.',
      },
      {
        period: "2025.03 — 2025.05 · Tokyo / Hybrid",
        org: "Mercari (Mercoin)",
        role: "Engineer / PdM (Intern)",
        desc: "Joined the FinTech division Mercoin as a Product Manager. Owned the full launch flow for a new currency — defining how it was presented to customers, designing and developing the landing page, and shipping the release.",
      },
      {
        period: "2024.07 — 2025.04 · Tokyo / On-site",
        org: "Media Aid Inc.",
        role: "New Business Development (Contract)",
        desc: "Worked on two new business initiatives in parallel, including a new social platform. Handled industry research, competitive analysis, interviews and documentation — my first step from engineering toward the PdM and business side.",
      },
      {
        period: "2023.01 — 2024.08 · Tokyo / On-site",
        org: "Simple Inc.",
        role: "Frontend Engineer (Intern → Full-time)",
        desc: "Worked across three main projects. For a full replacement of the core service, I rebuilt a job-change information site from Laravel / Vue.js to TypeScript / Next.js / TailwindCSS / Go / AWS, owning everything from Figma design to implementation. For a new product, I developed a mobile app aimed at reducing early resignations end to end — requirements, interviews, design and implementation (Figma / React Native). I also customised and optimised the in-house Salesforce / CMS using Apex.",
      },
      {
        period: "2023.12 — Present · Tokyo",
        org: "Google Developers Group Tokyo",
        role: "Organizing Staff",
        desc: "Helping run a technical community and organise its events.",
      },
      {
        period: "2022.09 — 2023.10 · Tokyo / On-site",
        org: "REGAL CORE Inc.",
        role: "Frontend Engineer (Intern)",
        desc: "Renewed the corporate site and maintained / improved the core service. Covered a wide range — requirement gathering, wireframes and design in Figma, coding (JavaScript / React), database management for the in-house service (regex maintenance / Go), and even shooting internal videos (DaVinci Resolve).",
      },
      {
        period: "2022.04 — 2026.03 · Tokyo",
        org: "Gakushuin University, Faculty of Law",
        role: "Expected to graduate",
        desc: "Enrolled drawn by the versatility of combining law and engineering. Recently, out of an interest in FinTech, studying the Payment Services Act, the Financial Instruments and Exchange Act, and civil law.",
      },
    ],
  },
  skills: {
    kicker: "Toolbox",
    title: "The tools I reach for.",
    groups: [
      {
        no: "01",
        label: "Frontend",
        items: [
          {
            name: "Next.js",
            version: "13 – 15",
            note: "Led Simple's core-service replatform from Laravel/Vue.js to Next.js — my default stack since, at QueryLift, Mercoin and Noahloy.",
          },
          {
            name: "React",
            version: "17 – 19",
            note: "Front-end daily driver since REGAL CORE — component architecture, hooks and design-system work across every role.",
          },
          {
            name: "TypeScript",
            version: "4.5 – 5.x",
            note: "Standardised the codebase on TS during the Simple migration; typed end-to-end ever since.",
          },
          {
            name: "Tailwind CSS",
            version: "v3 / v4",
            note: "Built and maintained design systems with it at Simple and Noahloy — tokens through component library.",
          },
        ],
      },
      {
        no: "02",
        label: "Backend",
        items: [
          {
            name: "Rust",
            version: "stable (2021 ed.)",
            note: "Performance-sensitive backend and tooling work. [draft — please verify the project]",
          },
          {
            name: "Node.js",
            version: "18 – 22 LTS",
            note: "API and tooling layer behind the front-end apps. [draft — please verify the project]",
          },
          {
            name: "Go",
            version: "1.21+",
            note: "Built the Simple replatform backend and maintained REGAL CORE's in-house service DB layer in Go.",
          },
        ],
      },
      {
        no: "03",
        label: "Infrastructure",
        items: [
          {
            name: "AWS",
            note: "Hosting and deploy for the Simple replatform — front-end through delivery.",
          },
          {
            name: "Docker",
            note: "Containerised local and CI environments across projects. [draft — please verify]",
          },
          {
            name: "Terraform",
            version: "1.x",
            note: "Infrastructure-as-code for cloud provisioning. [draft — please verify]",
          },
          {
            name: "CI/CD",
            version: "GitHub Actions",
            note: "Build, test and deploy pipelines. [draft — please verify]",
          },
        ],
      },
      {
        no: "04",
        label: "Other",
        items: [
          {
            name: "PostgreSQL",
            version: "14 – 16",
            note: "Primary relational store for production apps. [draft — please verify]",
          },
          {
            name: "MongoDB",
            version: "6.x",
            note: "Document store for flexible-schema features. [draft — please verify]",
          },
          {
            name: "Redis",
            version: "7.x",
            note: "Caching and session layer. [draft — please verify]",
          },
          {
            name: "Git",
            note: "Version control and team workflow on every project.",
          },
          {
            name: "Figma",
            note: "Design-to-implementation handoff I own end to end — from Simple to Mercoin's LP to Noahloy's design system.",
          },
        ],
      },
      {
        no: "05",
        label: "Mobile",
        items: [
          {
            name: "React Native",
            version: "0.7x",
            note: "Built Simple's early-resignation-reduction mobile app end to end — requirements, interviews, design and implementation.",
          },
        ],
      },
      {
        no: "06",
        label: "Analytics & Media",
        items: [
          {
            name: "Google Analytics",
            version: "GA4",
            note: "Measurement for QueryLift's GEO analytics and the Mercoin launch LP. [draft — please verify]",
          },
          {
            name: "Search Console",
            note: "Search-visibility monitoring, central to QueryLift's GEO work. [draft — please verify]",
          },
          {
            name: "Tag Manager",
            note: "Tag and event management for analytics across launches. [draft — please verify]",
          },
          {
            name: "DaVinci Resolve",
            version: "18 / 19",
            note: "Shot and edited REGAL CORE's internal videos; also my off-the-clock video work.",
          },
        ],
      },
    ],
  },
  highlights: {
    kicker: "Highlights",
    title: "A few things I'm proud of.",
    items: [
      "Shipped several personal web services (10,000+ users in total).",
      "Technical support for multiple companies through full-stack work.",
      "Operating as an [[FDE]] (Forward Deployed Engineer) — embedding with customers to turn problems into shipped solutions.",
      "A distinct perspective from balancing law and engineering.",
      "Hands-on management and business-development experience at a startup.",
    ],
  },
  projects: {
    kicker: "Personal work & portfolio",
    title: "Things I've shipped on my own.",
    items: [
      {
        slug: "reginavi",
        period: "2023.10",
        title: "Reginavi",
        desc: "A festival app for Gakushuin University that centralises event information and improves the visitor experience.",
        role: "Solo · Design & Development",
        body: [
          "Reginavi started from a simple frustration: every year the Gakushuin festival scattered its schedule, maps and booth information across flyers and a handful of group chats. I wanted one place that just told you what was happening, and where.",
          "Built with Next.js and TypeScript as a mobile-first web app, it pulled the event information into a single timeline and map so visitors could plan their day without hunting around. The constraint that shaped everything was the crowd — it had to load fast on packed campus Wi-Fi and make sense at a glance while you were walking.",
          "[draft — please verify the scope, usage numbers and outcome before publishing.]",
        ],
        tags: ["Next.js", "TypeScript", "Mobile App"],
        image: "/images/dummy/reginavi.png",
      },
      {
        slug: "enter",
        period: "2022.09",
        title: "Enter",
        desc: "An engineering community for university students — a platform for exchange, knowledge sharing and events.",
        role: "Founder · Full-stack",
        body: [
          "Enter was an attempt to give student engineers the room I wished I'd had earlier: a place to show what you're building, share what you've learned, and find people to make things with.",
          "Beyond the platform itself, a lot of the work was community design — figuring out how events, knowledge sharing and casual exchange could reinforce each other instead of competing for the same attention.",
          "[draft — please verify the scope and outcome before publishing.]",
        ],
        tags: ["Community", "Event"],
        image: "/images/dummy/enter.png",
      },
      {
        slug: "ufes-2024-spring",
        period: "2024.01 — 2024.04",
        title: "UFES 2024 — Spring",
        desc: "Planned and ran an engineering event for university students, creating a space for technical exchange.",
        role: "Organiser",
        body: [
          "UFES 2024 (Spring) was a student-engineering event I planned and ran end to end — from the concept and the program down to the operations on the day.",
          "The goal was a low-friction space for technical exchange: enough structure to spark conversation, enough slack for the unplanned hallway-track moments that usually turn out to be the best part.",
          "[draft — please verify the attendance, format and outcome before publishing.]",
        ],
        tags: ["Event"],
        image: "/images/dummy/ufes.png",
      },
    ],
  },
  faq: {
    kicker: "FAQ",
    title: "Common Questions.",
    items: [
      {
        q: "What are you looking for right now?",
        a: [
          "Product work and design-engineering roles where I can own a thing end to end — from the problem and the design through to shipped code.",
          "I'm most useful where front-end, design and product overlap, especially in AI or FinTech contexts. Small, ambitious teams suit me best.",
        ],
      },
      {
        q: "Are you available for freelance work?",
        a: [
          "Sometimes. I take on a limited number of small, interesting projects alongside my main work at QueryLift and Noahloy.",
          "If the scope is sharp and the problem is fun, email me and we'll see if it fits.",
        ],
      },
      {
        q: "Engineer, designer or PdM — which one are you?",
        a: [
          "All three, depending on what the work needs. My core is front-end engineering, but I can take something from Figma design through implementation, and I've run product as a PdM at Mercoin and QueryLift.",
          "The point of doing all three isn't to be a generalist — it's to remove handoffs. One person carrying the whole thing ships faster and keeps the intent intact.",
        ],
      },
      {
        q: "Why law and engineering?",
        a: [
          "I went into law drawn by how widely it combines with building things — and I was right. A statute is a spec with edge cases; the same precision serves both.",
          "In FinTech especially, that overlap is exactly where the interesting, defensible work lives.",
        ],
      },
      {
        q: "What's your stack?",
        a: [
          "Day to day: TypeScript, Next.js, React and Tailwind on the front end; Go and Node on the back; AWS for delivery. Figma for design.",
          "I'm not precious about tools, though. The stack serves the product, not the other way around.",
        ],
      },
      {
        q: "How do I reach you?",
        a: [
          "Email is fastest — it's just below in the colophon. I read everything, even if a reply takes a day or two.",
        ],
      },
    ],
  },
  contact: {
    kicker: "Colophon",
    title: "Let's make something.",
    body: "Open to product work, design-engineering roles and the occasional small, strange project. The fastest way to reach me is email.",
    email: "kohta.kochi@noahlogy.com",
    links: [
      { label: "GitHub", href: "https://github.com/kohta9521" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/%E5%85%89%E5%A4%AA-%E6%B2%B3%E5%86%85-89476b2a2/",
      },
    ],
    form: {
      name: "Your name",
      email: "Email address",
      message: "Tell me what you're building",
      submit: "Send message",
      sending: "Opening…",
      sent: "Opened your mail app — hit send and it reaches me.",
      subject: "Hello from your portfolio",
      orEmail: "or email me directly",
    },
  },
  consent: consentCopy.en,
  colophon:
    "Set in Newsreader & Departure Mono · Built with Next.js · Tokyo, 2026",
};
