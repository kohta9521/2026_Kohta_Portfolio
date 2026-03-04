export default function Skills() {
  return (
    <div className="p-8 text-[var(--text-primary)]">
      <h1 className="text-4xl font-bold mb-6">Skills</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Frontend</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-[var(--bg-overlay)] text-[var(--text-primary)] rounded-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Backend</h2>
          <div className="flex flex-wrap gap-3">
            {["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-[var(--bg-overlay)] text-[var(--text-primary)] rounded-lg"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
