"use client";

// App Router の template はナビゲーションごとに再マウントされる。
// それを利用して、ルート遷移時に「フェードアップ + アクセントのスキャンライン縦断」を出す。
// 純 CSS アニメーション（route-enter / route-scan）なので JS バンドルを増やさず確実に動く。
// reduced-motion では globals.css 側で無効化済み。
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="route-scan" aria-hidden />
      <div className="route-enter">{children}</div>
    </>
  );
}
