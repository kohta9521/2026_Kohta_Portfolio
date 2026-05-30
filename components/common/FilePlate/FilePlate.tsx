import Image from "next/image";

// 図版/画像用の共通プレート。
// ① プライマリーカラー(--color-accent)の超細かいドット背景（radial-gradient のタイル、画像ゼロ）
// ② 左上に縦書き(writing-mode: vertical-rl)の等幅ファイル名
// ③ src があれば中央に object-contain で表示
// デフォルトで親要素いっぱい(w-full h-full)に広がる。サイズは親側で指定する。

interface FilePlateProps {
  /** 左上に縦書きで出すファイル名 / ラベル */
  filename: string;
  /** 中央表示する画像（任意） */
  src?: string;
  alt?: string;
  /** 追加クラス（サイズ調整など） */
  className?: string;
  /** 中央画像の余白（Tailwind の padding クラス）。小さいプレートでは "p-3" などに */
  imgPadding?: string;
}

export default function FilePlate({
  filename,
  src,
  alt = "",
  className = "",
  imgPadding = "p-8",
}: FilePlateProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-[--radius-card] bg-paper-raised bg-[radial-gradient(var(--color-accent-dot)_0.5px,transparent_0.5px)] [background-size:6px_6px] ${className}`}
    >
      {/* 縦書きファイル名（左上） */}
      <span className="pointer-events-none absolute left-1 top-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-3 [writing-mode:vertical-rl]">
        {filename}
      </span>

      {/* 画像があれば中央表示 */}
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`object-contain ${imgPadding}`}
          // SVG は最適化エンドポイントが拒否する（image type not allowed）ため素のまま配信
          unoptimized={src.endsWith(".svg")}
        />
      )}
    </div>
  );
}
