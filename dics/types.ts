// 全言語で共通のメッセージ構造。en.ts / ja.ts はこの型に従う（差異があれば型エラー）。

export interface CareerItem {
  period: string;
  org: string;
  role: string;
  desc: string;
}

export interface SkillItem {
  /** ツール名 */
  name: string;
  /** 対応可能なバージョン（任意） */
  version?: string;
  /** hover 時のツールチップ本文：どの案件でどんな実務を積んだか */
  note: string;
}

export interface SkillGroup {
  no: string;
  label: string;
  items: SkillItem[];
}

export interface ProjectItem {
  /** スラッグ（言語間共通・/works/[slug] の URL に使う） */
  slug: string;
  period: string;
  title: string;
  /** 一覧カード／詳細ページ冒頭のリード文 */
  desc: string;
  /** 担当ロール（詳細ページのヘッダに出す・任意） */
  role?: string;
  /** 詳細ページ本文（段落配列） */
  body: string[];
  tags: string[];
  image: string;
  /** 公開 URL など外部リンク（任意） */
  link?: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface FaqItem {
  /** 質問（左リスト・カード上部の IN: に出す） */
  q: string;
  /** 回答（段落配列・カード下部の OUT: に出す） */
  a: string[];
}

export interface Messages {
  meta: {
    role: string;
    location: string;
    year: string;
  };
  nav: {
    brand: string;
    tagline: string;
  };
  hero: {
    kicker: string;
    nameJa: string;
    title: string;
    byline: string;
    intro: string[];
    ctaWork: string;
    ctaContact: string;
    /** Hero 下の「なぜクリエイティブが好きか」ブロック（横並び2段組） */
    creative: {
      title: string;
      blocks: string[];
    };
  };
  career: {
    kicker: string;
    title: string;
    items: CareerItem[];
  };
  skills: {
    kicker: string;
    title: string;
    groups: SkillGroup[];
  };
  highlights: {
    kicker: string;
    title: string;
    items: string[];
  };
  projects: {
    kicker: string;
    title: string;
    items: ProjectItem[];
  };
  faq: {
    kicker: string;
    title: string;
    items: FaqItem[];
  };
  contact: {
    kicker: string;
    title: string;
    body: string;
    email: string;
    links: LinkItem[];
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      sent: string;
      /** mailto 件名 */
      subject: string;
      /** メール直接リンクの前置き */
      orEmail: string;
    };
  };
  colophon: string;
}
