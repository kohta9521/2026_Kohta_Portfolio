// 個人開発（Works）の参照ヘルパー。データは Messages.projects.items を流用し、
// /works と /works/[slug] の詳細ページがここを参照する（ブログの dics/blog.ts と同じ役割）。

import { en } from "./en";
import { ja } from "./ja";
import type { ProjectItem } from "./types";

export type WorkLang = "en" | "ja";

const messages: Record<WorkLang, typeof en> = { en, ja };

/** ある言語の全プロジェクト */
export function getWorks(lang: WorkLang): ProjectItem[] {
  return messages[lang].projects.items;
}

/** スラッグから1件取得（無ければ undefined） */
export function getWork(lang: WorkLang, slug: string): ProjectItem | undefined {
  return messages[lang].projects.items.find((p) => p.slug === slug);
}

/** 全言語共通のスラッグ一覧（generateStaticParams 用） */
export function allWorkSlugs(): string[] {
  return en.projects.items.map((p) => p.slug);
}
