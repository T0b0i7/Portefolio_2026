import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Frameworks
  { name: "React", category: "framework", level: 90 },
  { name: "Vue.js", category: "framework", level: 75 },
  { name: "Svelte", category: "framework", level: 70 },
  { name: "Next.js", category: "framework", level: 85 },
  { name: "Nuxt.js", category: "framework", level: 80 },
  { name: "Gatsby", category: "framework", level: 75 },
  { name: "Astro", category: "framework", level: 75 },
  { name: "SolidJS", category: "framework", level: 70 },
  { name: "Qwik", category: "framework", level: 70 },
  { name: "NestJS", category: "framework", level: 80 },
  { name: "Flutter", category: "framework", level: 75 },
  { name: "Three.js", category: "framework", level: 75 },
  { name: "Node.js", category: "framework", level: 85 },
  { name: "Laravel", category: "framework", level: 75 },
  { name: "Tailwind", category: "framework", level: 90 },

  // Langages
  { name: "TypeScript", category: "language", level: 80 },
  { name: "JavaScript", category: "language", level: 95 },
  { name: "PHP", category: "language", level: 80 },
  { name: "Python", category: "language", level: 75 },
  { name: "HTML/CSS", category: "language", level: 95 },
  { name: "C", category: "language", level: 70 },
  { name: "C++", category: "language", level: 70 },
  { name: "Prolog", category: "language", level: 40 },
  { name: "Mercury", category: "language", level: 15 },
  { name: "Solidity", category: "language", level: 55 },
  { name: "Vyper", category: "language", level: 10},
  { name: "Rust (Solana)", category: "language", level: 10 },
  // Bases de données
  { name: "PostgreSQL", category: "database", level: 75 },
  { name: "MySQL", category: "database", level: 80 },
  { name: "SQL Server", category: "database", level: 70 },

  // Design
  { name: "Figma", category: "design", level: 85 },
  { name: "Canva", category: "design", level: 80 },
  { name: "Adobe XD", category: "design", level: 75 },
  { name: "Sketch", category: "design", level: 70 },
  { name: "InVision", category: "design", level: 70 },
  { name: "Framer", category: "design", level: 75 },

  // Outils
  { name: "Git", category: "tool", level: 85 },
  { name: "VS Code", category: "tool", level: 95 },
  { name: "Docker", category: "tool", level: 80 },
  { name: "npm", category: "tool", level: 90 },
  { name: "Yarn", category: "tool", level: 85 },
  { name: "Webpack", category: "tool", level: 80 },
  { name: "Vite", category: "tool", level: 90 },
  { name: "Postman", category: "tool", level: 85 },
  { name: "GitHub", category: "tool", level: 90 },
  { name: "GitLab", category: "tool", level: 80 },

  // Automatisation
  { name: "Zapier", category: "automation", level: 80 },
  { name: "Make", category: "automation", level: 75 },

  // IA
  { name: "ChatGPT", category: "ai", level: 90 },
  { name: "Claude IA", category: "ai", level: 85 },
  { name: "ChatPDF", category: "ai", level: 80 },
  { name: "DeepSeek", category: "ai", level: 75 },
  { name: "Google Gemini", category: "ai", level: 80 },
  { name: "Perplexity AI", category: "ai", level: 75 },
  { name: "Copilot", category: "ai", level: 85 },
  { name: "Midjourney", category: "ai", level: 80 },
  { name: "DALL-E", category: "ai", level: 80 },
  { name: "Stable Diffusion", category: "ai", level: 75 },

  // No-Code
  { name: "Lovable", category: "nocode", level: 75 },
  { name: "Webflow", category: "nocode", level: 70 },
];

const categories = {
  framework: { color: "bg-primary", label: "Frameworks" },
  language: { color: "bg-secondary", label: "Langages" },
  database: { color: "bg-accent", label: "Bases de données" },
  design: { color: "bg-warning", label: "Design" },
  tool: { color: "bg-muted-foreground", label: "Outils" },
  automation: { color: "bg-success", label: "Automatisation" },
  ai: { color: "bg-violet", label: "IA" },
  nocode: { color: "bg-gold", label: "No-Code" },
};

export function SkillsOrb() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory
    ? skills.filter((s) => s.category === activeCategory)
    : skills;

  return (
    <div className="relative">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            !activeCategory
              ? "bg-primary text-primary-foreground glow-cyan"
              : "glass text-muted-foreground hover:text-foreground"
          )}
        >
          Tous
        </button>
        {Object.entries(categories).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(activeCategory === key ? null : key)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeCategory === key
                ? "bg-primary text-primary-foreground glow-cyan"
                : "glass text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {filteredSkills.map((skill, index) => {
          const category = categories[skill.category as keyof typeof categories];
          const isHovered = hoveredSkill === skill.name;

          return (
            <div
              key={skill.name}
              className={cn(
                "relative group cursor-pointer transition-all duration-300",
                isHovered && "z-10"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div
                className={cn(
                  "aspect-square rounded-2xl glass flex flex-col items-center justify-center p-4 transition-all duration-300",
                  isHovered && "scale-110 glow-cyan"
                )}
              >
                {/* Skill Level Ring */}
                <div className="relative w-16 h-16 mb-2">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle
                      className="text-muted"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="transparent"
                      r="16"
                      cx="18"
                      cy="18"
                    />
                    <circle
                      className="text-primary transition-all duration-700"
                      strokeWidth="3"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="16"
                      cx="18"
                      cy="18"
                      strokeDasharray={`${skill.level} 100`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                    {skill.level}%
                  </span>
                </div>

                {/* Skill Name */}
                <span className="text-sm font-medium text-center leading-tight">
                  {skill.name}
                </span>

                {/* Category Indicator */}
                <div
                  className={cn(
                    "absolute top-2 right-2 w-2 h-2 rounded-full",
                    category.color
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
