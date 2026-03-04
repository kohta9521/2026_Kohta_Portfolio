export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kohta",
    jobTitle: "Full Stack Engineer",
    url: "https://kohta-engineer.com/",
    sameAs: [
      "https://github.com/kohta9521",
      "https://www.linkedin.com/in/%E5%85%89%E5%A4%AA-%E6%B2%B3%E5%86%85-89476b2a2/",
      "https://twitter.com/yourusername",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "Web Development",
      "Full Stack Development",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Your University",
    },
    worksFor: {
      "@type": "Organization",
      name: "Your Company",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
