import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { WindowProvider } from "@/contexts/WindowContext";
import WindowManager from "@/components/ui/WindowManager";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider>
        <WindowProvider>
          <div className="w-screen h-screen overflow-hidden relative bg-[var(--bg-primary)]">
            {children}
            <WindowManager />
          </div>
        </WindowProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
