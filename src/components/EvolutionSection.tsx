import { useState, useEffect } from "react";
import { GraduationCap, Briefcase, Code, Database, Globe, Server, Smartphone, Cloud, Shield, GitBranch, Building2, Rocket, Clock, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const experiences = [
  {
    id: 1,
    type: "work",
    title: "Stagiaire Développeur Full-Stack",
    company: "INNOVTECH",
    location: "Cotonou, Aidjèdo (Télétravail)",
    period: "Nov 2025 - Fév 2026",
    current: true,
    description: [
      "Développement front-end et participation au back-end des applications internes",
      "Création d'interfaces et intégration de fonctionnalités",
      "Optimisation des outils internes et automatisation des processus",
    ],
    icon: Rocket,
    color: "primary",
    side: "left"
  },
  {
    id: 2,
    type: "work",
    title: "Stagiaire Développeur / Technicien Informatique",
    company: "SIAB – Société Industrielle d'Acier du Bénin",
    location: "Djeffa",
    period: "Juin 2024 - Avril 2025",
    current: false,
    description: [
      "Conception, développement et déploiement de systèmes internes",
      "Outils d'automatisation réduisant le temps de traitement de 30%",
      "Maintenance des équipements informatiques et support technique",
    ],
    badge: "-30% temps de traitement",
    icon: Building2,
    color: "secondary",
    side: "right"
  },
  {
    id: 3,
    type: "work",
    title: "Freelance / Prestataire",
    company: "Développeur & Designer Graphique",
    location: "Porto-Novo, Bénin",
    period: "2024 - Présent",
    current: true,
    description: [
      "Création de sites web pour particuliers et entreprises",
      "Réalisation d'affiches et supports visuels pour la communication digitale",
      "Maintenance et accompagnement technique de projets clients",
    ],
    icon: Briefcase,
    color: "accent",
    side: "left"
  },
  {
    id: 4,
    type: "education",
    title: "Licence Professionnelle en Système Informatique Logiciel (SIL)",
    company: "HECM - Haute École de Commerce et de Management",
    location: "Porto Novo, Bénin",
    period: "Terminé",
    current: false,
    description: [
      "Spécialisation en développement logiciel et systèmes d'information",
    ],
    badge: "Très Bien",
    icon: GraduationCap,
    color: "success",
    side: "right"
  },
  {
    id: 5,
    type: "education",
    title: "Baccalauréat Série D (scientifique)",
    company: "Collège Catholique Notre-Dame de Lourdes",
    location: "Porto-Novo",
    period: "2021 - 2022",
    current: false,
    description: [],
    icon: GraduationCap,
    color: "success",
    side: "left"
  },
];

const skills = [
  {
    category: "Frontend",
    icon: Code,
    technologies: ["React", "Next.js", "JavaScript ES6+", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"]
  },
  {
    category: "Backend",
    icon: Server,
    technologies: ["Node.js", "PHP", "Laravel", "Django", "API REST", "Architecture MVC", "JWT"]
  },
  {
    category: "Base de données",
    icon: Database,
    technologies: ["MySQL", "PostgreSQL", "SQL Server", "Supabase", "Airtable"]
  },
  {
    category: "IA & Automatisation",
    icon: Cloud,
    technologies: ["ChatGPT", "DALL·E", "Zapier", "Python Scripts", "No-Code Tools"]
  },
  {
    category: "Outils & DevOps",
    icon: GitBranch,
    technologies: ["VS Code", "Git", "GitHub", "Docker", "Postman", "Webpack", "Vite"]
  },
  {
    category: "Design & UX",
    icon: Globe,
    technologies: ["Figma", "Canva", "UI/UX Design", "Responsive Design", "Prototypes", "Wireframes"]
  }
];

const colorStyles = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    text: "text-primary",
    dot: "bg-primary",
    glow: "glow-cyan",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary/30",
    text: "text-secondary",
    dot: "bg-secondary",
    glow: "glow-orange",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent/30",
    text: "text-accent",
    dot: "bg-accent",
    glow: "glow-violet",
  },
  success: {
    bg: "bg-success/10",
    border: "border-success/30",
    text: "text-success",
    dot: "bg-success",
    glow: "",
  },
};

export function EvolutionSection() {
  const [activeTab, setActiveTab] = useState<"experience" | "skills">("experience");
  const { colors, theme } = useTheme();

  // Injecter les animations CSS personnalisées
  useEffect(() => {
    const styleId = 'evolution-section-animations';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes curtain-reveal {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <section id="evolution" className="py-20 relative" style={{ backgroundColor: colors.background }}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${colors.primary} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: colors.primary + '10', color: colors.primary }}>
            <GraduationCap className="w-4 h-4" />
            Mon Évolution
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.text }}>
            Mon <span style={{ color: colors.primary }}>Parcours</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: colors.textSecondary }}>
            Découvrez mon parcours professionnel et mes compétences techniques à travers les années.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl p-1" style={{ backgroundColor: colors.surface, border: colors.border }}>
            <button
              onClick={() => setActiveTab("experience")}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2",
                activeTab === "experience"
                  ? "text-white shadow-lg"
                  : ""
              )}
              style={{
                backgroundColor: activeTab === "experience" ? colors.primary : colors.surface,
                color: activeTab === "experience" ? '#ffffff' : colors.text
              }}
              onMouseEnter={(e) => { 
                if (activeTab !== "experience") e.currentTarget.style.backgroundColor = colors.primary + '10'; 
              }}
              onMouseLeave={(e) => { 
                if (activeTab !== "experience") e.currentTarget.style.backgroundColor = colors.surface; 
              }}
            >
              <Briefcase className="w-4 h-4" />
              Expériences & Formation
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2",
                activeTab === "skills"
                  ? "text-white shadow-lg"
                  : ""
              )}
              style={{
                backgroundColor: activeTab === "skills" ? colors.primary : colors.surface,
                color: activeTab === "skills" ? '#ffffff' : colors.text
              }}
              onMouseEnter={(e) => { 
                if (activeTab !== "skills") e.currentTarget.style.backgroundColor = colors.primary + '10'; 
              }}
              onMouseLeave={(e) => { 
                if (activeTab !== "skills") e.currentTarget.style.backgroundColor = colors.surface; 
              }}
            >
              <Code className="w-4 h-4" />
              Compétences Techniques
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "experience" ? (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 opacity-30 transform -translate-x-1/2" style={{
                background: `linear-gradient(to bottom, ${colors.primary}, ${colors.primaryDark}, ${colors.primaryLight})`
              }} />

              <div className="space-y-12">
                {experiences.map((exp, index) => {
                  const Icon = exp.icon;
                  const isLeft = exp.side === "left";

                  return (
                    <div
                      key={exp.id}
                      className={cn(
                        "relative flex items-center",
                        isLeft ? "justify-start" : "justify-end"
                      )}
                      style={{ 
                        opacity: 0,
                        animation: `curtain-reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                        animationDelay: `${index * 150}ms` 
                      }}
                    >
                      {/* Timeline Dot */}
                      <div
                        className={cn(
                          "absolute left-1/2 w-5 h-5 rounded-full border-4 transition-all duration-300 transform -translate-x-1/2",
                          exp.current ? `${colors.primary} pulse-glow animate-pulse` : colors.border,
                          exp.current ? "border-4" : "border-4"
                        )}
                      />

                      {/* Card */}
                      <div
                        className={cn(
                          "rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-105 group relative",
                          isLeft ? "w-5/12 mr-auto" : "w-5/12 ml-auto"
                        )}
                        style={{ 
                          backgroundColor: colors.surface,
                          borderColor: colors.border
                        }}
                      >
                        {/* Glow Effect Background */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl -z-10"
                          style={{ backgroundColor: colors.primary + '20' }}
                        />

                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: colors.primary + '10' }}>
                              <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300" style={{ color: colors.text }}>
                                {exp.title}
                              </h3>
                              <p className="font-medium" style={{ color: colors.text }}>{exp.company}</p>
                              <p className="text-sm" style={{ color: colors.textSecondary }}>{exp.location}</p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                              <Clock className="w-4 h-4" style={{ color: colors.primary }} />
                              <span>{exp.period}</span>
                            </div>
                            {exp.current && (
                              <span className="px-3 py-1 rounded-full text-white text-xs font-medium animate-pulse" style={{ backgroundColor: colors.primary }}>
                                En cours
                              </span>
                            )}
                            {exp.badge && (
                              <span className="px-3 py-1 rounded-full text-white text-xs font-medium flex items-center gap-1" style={{ backgroundColor: colors.secondary }}>
                                <TrendingDown className="w-3 h-3" />
                                {exp.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <ul className="space-y-2">
                          {exp.description.map((item, i) => (
                            <li key={i} className="flex items-start gap-3" style={{ 
                              color: colors.textSecondary,
                              animation: `fade-in 0.5s ease-out forwards`,
                              animationDelay: `${(index * 150) + (i * 50)}ms`,
                              opacity: 0
                            }}>
                              <span className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: colors.primary }} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => {
                return (
                  <div
                    key={skill.category}
                    className="rounded-xl p-6 hover:shadow-lg transition-all duration-300 group hover:-translate-y-2 hover:scale-105"
                    style={{ 
                      backgroundColor: colors.surface,
                      opacity: 0,
                      animation: `fade-in-up 0.6s ease-out forwards`,
                      animationDelay: `${index * 100}ms` 
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primary + '10' }}>
                        <skill.icon className="w-6 h-6" style={{ color: colors.primary }} />
                      </div>
                      <h3 className="text-lg font-bold" style={{ color: colors.text, transition: 'color 0.3s' }}>
                        {skill.category}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-sm rounded-full cursor-default hover:scale-110 transition-all duration-300"
                          style={{ 
                            opacity: 0,
                            animation: `fade-in 0.4s ease-out forwards`,
                            animationDelay: `${(index * 100) + (techIndex * 50)}ms`,
                            backgroundColor: colors.primary + '10',
                            color: colors.text
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
