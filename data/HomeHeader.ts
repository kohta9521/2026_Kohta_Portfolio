export type DropdownItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

export type DropdownSubMenu = {
  id: string;
  label: string;
  icon: string;
  items: DropdownItem[];
};

export type HeaderMenuItem = {
  id: string;
  label: string;
  icon: string;
  displayType?: "icon" | "text"; // "icon" = アイコンのみ、"text" = テキストのみ
  align?: "start" | "center" | "end";
  items: (DropdownItem | DropdownSubMenu)[];
  hideOnMobile?: boolean; // trueの場合、モバイルで非表示
};

export const homeHeaderLeftData: HeaderMenuItem[] = [
  {
    id: "home-menu",
    label: "Kohta Portfolio",
    icon: "Home",
    displayType: "text",
    align: "start",
    items: [
      {
        id: "home-top",
        label: "Top",
        href: "#top",
        icon: "Home",
      },
      {
        id: "home-about",
        label: "About",
        href: "#about",
        icon: "User",
      },
    ],
  },
  {
    id: "about-menu",
    label: "このサイトについて",
    icon: "Briefcase",
    displayType: "text",
    align: "start",
    hideOnMobile: true,
    items: [
      {
        id: "about-site",
        label: "About This Site",
        href: "/about-site",
        icon: "Briefcase",
      },
      {
        id: "about-tech",
        label: "Tech Stack",
        href: "/tech",
        icon: "BookOpen",
      },
    ],
  },
  {
    id: "work-menu",
    label: "仕事",
    icon: "Briefcase",
    displayType: "text",
    align: "start",
    items: [
      {
        id: "work-projects",
        label: "Projects",
        href: "/projects",
        icon: "Briefcase",
      },
      {
        id: "work-experience",
        label: "Experience",
        href: "/experience",
        icon: "BookOpen",
      },
    ],
  },
  {
    id: "contact-menu",
    label: "Contact",
    icon: "Mail",
    displayType: "icon",
    align: "start",
    items: [
      {
        id: "contact-email",
        label: "Email",
        href: "mailto:your@email.com",
        icon: "Mail",
      },
      {
        id: "contact-social",
        label: "Social Links",
        icon: "Github",
        items: [
          {
            id: "social-github",
            label: "GitHub",
            href: "https://github.com/yourusername",
            icon: "Github",
          },
          {
            id: "social-linkedin",
            label: "LinkedIn",
            href: "https://linkedin.com/in/yourusername",
            icon: "Linkedin",
          },
        ],
      },
    ],
  },
];

export const homeHeaderRightData: HeaderMenuItem[] = [
  {
    id: "search-menu",
    label: "検索",
    icon: "Search",
    displayType: "icon",
    align: "end",
    hideOnMobile: true,
    items: [
      {
        id: "search-all",
        label: "全体検索",
        href: "/search",
        icon: "Search",
      },
      {
        id: "search-projects",
        label: "プロジェクト検索",
        href: "/search/projects",
        icon: "Briefcase",
      },
    ],
  },
  {
    id: "settings-menu",
    label: "設定",
    icon: "Settings",
    displayType: "icon",
    align: "end",
    hideOnMobile: true,
    items: [
      {
        id: "settings-theme",
        label: "テーマ切替",
        href: "#theme",
        icon: "Palette",
      },
      {
        id: "settings-language",
        label: "言語設定",
        href: "#language",
        icon: "Languages",
      },
    ],
  },
  {
    id: "user-menu",
    label: "ユーザー",
    icon: "User",
    displayType: "icon",
    align: "end",
    items: [
      {
        id: "user-profile",
        label: "プロフィール",
        href: "/profile",
        icon: "User",
      },
      {
        id: "user-settings",
        label: "アカウント設定",
        href: "/settings",
        icon: "Settings",
      },
    ],
  },
];
