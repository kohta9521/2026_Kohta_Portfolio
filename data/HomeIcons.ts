export type HomeIconItem = {
  id: string;
  title: string;
  description?: string;
  iconImage: string; // /images/icons/ 配下のファイル名
  href: string;
  position?: { x: number; y: number };
};

export const homeIconsData: HomeIconItem[] = [
  {
    id: "about",
    title: "About",
    description: "私について",
    iconImage: "icons8-file-48.png",
    href: "/about",
    position: { x: 20, y: 70 },
  },
  {
    id: "projects",
    title: "Projects",
    description: "プロジェクト一覧",
    iconImage: "icons8-project-48.png",
    href: "/projects",
    position: { x: 20, y: 160 },
  },
  {
    id: "skills",
    title: "Skills",
    description: "スキルセット",
    iconImage: "icons8-skill-48.png",
    href: "/skills",
    position: { x: 20, y: 250 },
  },
  {
    id: "contact",
    title: "Contact",
    description: "お問い合わせ",
    iconImage: "icons8-contact-48.png",
    href: "/contact",
    position: { x: 20, y: 340 },
  },
  {
    id: "blog",
    title: "Blog",
    description: "技術ブログ",
    iconImage: "icons8-blog-48.png",
    href: "/blog",
    position: { x: 20, y: 430 },
  },
];
