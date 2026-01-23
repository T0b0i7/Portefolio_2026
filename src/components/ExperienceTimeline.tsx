import { Building2, Briefcase, GraduationCap, Rocket, Clock, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  },
  {
    id: 4,
    type: "education",
    title: "Licence Professionnelle en Système Informatique Logiciel (SIL)",
    company: "HECM - Haute École de Commerce et de Management",
    location: "Porto Novo,Bénin",
    period: "Terminé",
    current: false,
    description: [
      "Spécialisation en développement logiciel et systèmes d'information",
    ],
    badge: "Terminé",
    icon: GraduationCap,
    color: "success",
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
  },
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

export function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-success opacity-30" />

      <div className="space-y-8">
        {experiences.map((exp, index) => {
          const Icon = exp.icon;
          const styles = colorStyles[exp.color as keyof typeof colorStyles];

          return (
            <div
              key={exp.id}
              className="relative pl-20"
              style={{ 
                animationDelay: `${index * 150}ms`,
                opacity: 0,
                animation: `curtain-reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Timeline Dot */}
              <div
                className={cn(
                  "absolute left-6 w-5 h-5 rounded-full border-4 border-background transition-all duration-300",
                  styles.dot,
                  exp.current && "pulse-glow animate-glow-pulse"
                )}
              />

              {/* Card */}
              <div
                className={cn(
                  "glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-105 card-hover group",
                  styles.border
                )}
              >
                {/* Glow Effect Background */}
                <div 
                  className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl -z-10",
                    styles.color === "primary" && "bg-primary",
                    styles.color === "secondary" && "bg-secondary",
                    styles.color === "accent" && "bg-accent",
                    styles.color === "success" && "bg-success"
                  )}
                />

                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className={cn("p-3 rounded-xl transition-all duration-300 group-hover:scale-110", styles.bg)}>
                      <Icon className={cn("w-6 h-6", styles.text)} />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <p className={cn("font-medium", styles.text)}>{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 group-hover:text-primary">
                      <Clock className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    {exp.current && (
                      <span className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-medium animate-pulse">
                        En cours
                      </span>
                    )}
                    {exp.badge && (
                      <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium flex items-center gap-1 group-hover:bg-secondary/40 transition-colors duration-300">
                        <TrendingDown className="w-3 h-3" />
                        {exp.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground group-hover:text-foreground transition-colors duration-300" style={{
                      animation: `fade-in 0.5s ease-out forwards`,
                      animationDelay: `${(index * 150) + (i * 50)}ms`,
                      opacity: 0
                    }}>
                      <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", styles.dot)} />
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
  );
}

