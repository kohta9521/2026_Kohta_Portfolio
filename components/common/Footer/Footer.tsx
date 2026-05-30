import { getDictionary, type Lang } from "@/lib/i18n";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Footer({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);

  return (
    <footer className="flex flex-col gap-4 border-t border-rule py-10 sm:flex-row sm:items-baseline sm:justify-between">
      <span className="label !text-ink-3">{t.colophon}</span>
      <ThemeToggle />
    </footer>
  );
}
