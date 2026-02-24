export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Next.js + TypeScriptで作成したポートフォリオサイト",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "Task Manager App",
      description: "タスク管理アプリケーション",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 3,
      title: "E-commerce Platform",
      description: "ECサイトプラットフォーム",
      tech: ["Next.js", "Stripe", "PostgreSQL"],
    },
  ];

  return (
    <div className="p-8 text-[var(--text-primary)]">
      <h1 className="text-4xl font-bold mb-6">Projects</h1>
      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-6 bg-[var(--bg-secondary)] rounded-lg border border-[var(--window-border)] hover:bg-[var(--bg-overlay)] transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[var(--bg-overlay)] text-[var(--text-primary)] rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
