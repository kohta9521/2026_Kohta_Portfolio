"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="flex flex-col gap-4 border-t border-rule py-10 sm:flex-row sm:items-baseline sm:justify-between">
      <span className="label !text-ink-3">{t.colophon}</span>
      <ThemeToggle />
    </footer>
  );
}
