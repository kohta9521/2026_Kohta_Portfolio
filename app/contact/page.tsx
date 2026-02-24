export default function Contact() {
  return (
    <div className="p-8 text-[var(--text-primary)]">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>
      <div className="space-y-4">
        <p className="text-[var(--text-secondary)]">お気軽にご連絡ください。</p>
        <div className="space-y-3 mt-6">
          <div className="flex items-center gap-3">
            <span className="text-[var(--text-secondary)]">Email:</span>
            <a
              href="mailto:example@example.com"
              className="text-blue-500 hover:underline"
            >
              example@example.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[var(--text-secondary)]">GitHub:</span>
            <a
              href="https://github.com/yourusername"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/yourusername
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
