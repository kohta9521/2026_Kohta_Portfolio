export default function AboutPage() {
  return (
    <div className="p-8 text-[var(--text-primary)]">
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      <div className="space-y-4">
        <p className="text-[var(--text-secondary)] leading-relaxed">
          こんにちは！Kohtaです。
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          フルスタックエンジニアとして、モダンなWeb技術を使った開発に取り組んでいます。
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Python",
              "Docker",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-[var(--bg-overlay)] text-[var(--text-primary)] rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
