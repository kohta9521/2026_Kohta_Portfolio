"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { Lang } from "@/lib/i18n";
import type { Messages } from "@/dics/types";
import SectionHead from "@/components/common/SectionHead/SectionHead";
import { pushEvent, GTM_EVENT } from "@/lib/gtm";

type Status = "idle" | "sending" | "sent";

// 全ページ共通の CTA / お問い合わせフォーム。
// 送信はバックエンド不要の mailto 方式（フィールド内容を件名・本文に詰めてメールアプリを起動）。
// 必要なら handleSubmit を API / フォームサービスに差し替え可能。
export default function Contact({
  no = "§ —",
  data,
  lang,
}: {
  no?: string;
  data: Messages["contact"];
  lang: Lang;
}) {
  const f = data.form;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // スクロールで入った瞬間に順次フェードイン
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // CV（お問い合わせ送信）。GTM 側でこのイベントを GA4 のキーイベント＝コンバージョンに。
    // mailto 方式のため「送信意図（ボタン押下）」を計測する。
    pushEvent(GTM_EVENT.generateLead, {
      form_id: "contact",
      method: "mailto",
      language: lang,
      page_path:
        typeof window !== "undefined" ? window.location.pathname : undefined,
    });

    const subject = encodeURIComponent(f.subject);
    const body = encodeURIComponent(
      `${f.name}: ${name}\n${f.email}: ${email}\n\n${message}`
    );
    const href = `mailto:${data.email}?subject=${subject}&body=${body}`;
    window.location.href = href;
    window.setTimeout(() => setStatus("sent"), 650);
  }

  // 各要素のフェードイン用クラス（stagger は inline の transitionDelay で）
  const reveal = `cf-reveal${visible ? " is-visible" : ""}`;

  return (
    <section id="contact" className="pt-24 pb-12">
      <SectionHead no={no} kicker={data.kicker} title={data.title} />

      <div
        ref={wrapRef}
        className="mt-8 grid gap-x-16 gap-y-8 sm:mt-10 sm:gap-y-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
      >
        {/* 左：リード文 + 直接メール + SNS */}
        <div className={reveal} style={{ transitionDelay: "60ms" }}>
          <p className="max-w-[46ch] font-serif text-[1.18rem] leading-[1.55] text-ink-2">
            {data.body}
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {data.links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label inline-flex items-center gap-1.5 !text-ink-2 transition-colors hover:!text-accent"
                >
                  {l.label}
                  <span aria-hidden>↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 右：フォーム */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2.5 sm:gap-4"
          noValidate
        >
          <div className={reveal} style={{ transitionDelay: "140ms" }}>
            <div className="cf-field">
              <input
                id="cf-name"
                type="text"
                required
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="cf-input peer"
                autoComplete="name"
              />
              <label htmlFor="cf-name" className="cf-label">
                {f.name}
              </label>
              <span aria-hidden className="cf-scan" />
            </div>
          </div>

          <div className={reveal} style={{ transitionDelay: "210ms" }}>
            <div className="cf-field">
              <input
                id="cf-email"
                type="email"
                required
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cf-input peer"
                autoComplete="email"
              />
              <label htmlFor="cf-email" className="cf-label">
                {f.email}
              </label>
              <span aria-hidden className="cf-scan" />
            </div>
          </div>

          <div className={reveal} style={{ transitionDelay: "280ms" }}>
            <div className="cf-field">
              <textarea
                id="cf-message"
                required
                rows={3}
                placeholder=" "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="cf-input peer"
              />
              <label htmlFor="cf-message" className="cf-label">
                {f.message}
              </label>
              <span aria-hidden className="cf-scan" />
            </div>
          </div>

          <div className={reveal} style={{ transitionDelay: "350ms" }}>
            <button
              type="submit"
              disabled={status === "sending"}
              className="cf-submit group/btn"
            >
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                {status === "sending" ? (
                  f.sending
                ) : status === "sent" ? (
                  <>
                    <span aria-hidden>✓</span>
                    {f.submit}
                  </>
                ) : (
                  <>
                    {f.submit}
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    >
                      →
                    </span>
                  </>
                )}
              </span>
            </button>

            {/* 送信後の確認メッセージ */}
            <p
              role="status"
              className={`mt-3 flex items-center gap-2 font-mono text-[0.72rem] text-accent transition-all duration-300 ${
                status === "sent"
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
              }`}
            >
              <span aria-hidden>◆</span>
              {f.sent}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
