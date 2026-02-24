export default function Blog() {
  return (
    <div className="p-8 text-[var(--text-primary)]">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <div className="space-y-6">
        <div className="p-6 bg-[var(--bg-secondary)] rounded-lg border border-[var(--window-border)]">
          <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-[var(--text-secondary)]">
            技術ブログを準備中です...
          </p>
        </div>
      </div>
    </div>
  );
}
