"use client";

import React from "react";

type ComponentCache = {
  [key: string]: React.ComponentType;
};

const componentCache: ComponentCache = {};

export const loadWindowComponent = async (
  href: string,
  title: string,
  description?: string
): Promise<React.ComponentType> => {
  // キャッシュチェック
  if (componentCache[href]) {
    return componentCache[href];
  }

  // 動的インポート
  let PageComponent: React.ComponentType;

  switch (href) {
    case "/about": {
      const imported = await import("@/components/pages/AboutPage");
      PageComponent = imported.default;
      break;
    }
    case "/projects": {
      const imported = await import("@/components/pages/ProjectsPage");
      PageComponent = imported.default;
      break;
    }
    case "/skills": {
      const imported = await import("@/app/[locale]/skills/page");
      PageComponent = imported.default;
      break;
    }
    case "/contact": {
      const imported = await import("@/app/[locale]/contact/page");
      PageComponent = imported.default;
      break;
    }
    case "/blog": {
      const imported = await import("@/app/[locale]/blog/page");
      PageComponent = imported.default;
      break;
    }
    default: {
      const DefaultComponent = () => (
        <div className="p-8 text-[var(--text-primary)]">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-[var(--text-secondary)]">
            {description || "コンテンツを読み込み中..."}
          </p>
        </div>
      );
      DefaultComponent.displayName = "DefaultComponent";
      PageComponent = DefaultComponent;
      break;
    }
  }

  // キャッシュに保存
  componentCache[href] = PageComponent;
  return PageComponent;
};
