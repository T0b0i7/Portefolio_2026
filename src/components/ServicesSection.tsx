import { Brain, Code2, PenTool, Sparkles, Video } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export function ServicesSection() {
  const { lang } = useLanguage();

  const services = [
    {
      icon: Code2,
      title: lang("Developpement Web & Mobile", "Web & Mobile Development"),
      color: "blue",
      skills: [
        "React, Next.js, TypeScript",
        "Node.js, API REST, Supabase",
        lang("Applications performantes et responsives", "High-performance responsive apps"),
        lang("Architecture claire et evolutive", "Clear and scalable architecture"),
      ],
    },
    {
      icon: PenTool,
      title: lang("Design & Identite Visuelle", "Design & Visual Identity"),
      color: "purple",
      skills: [
        "UI/UX Design, Wireframes",
        "Figma, Canva, Prototypage",
        lang("Design social media et supports marketing", "Social media and marketing creatives"),
        lang("Direction artistique orientee conversion", "Conversion-focused art direction"),
      ],
    },
    {
      icon: Video,
      title: lang("Copywriting & Scripts Video", "Copywriting & Video Scripts"),
      color: "orange",
      skills: [
        lang("Copywriting pour pages de vente", "Copywriting for sales pages"),
        lang("Scripts Reels, Shorts et YouTube", "Reels, Shorts and YouTube scripts"),
        lang("Storytelling, hook, CTA", "Storytelling, hook, CTA"),
        lang("Messages de marque percutants", "High-impact brand messaging"),
      ],
    },
    {
      icon: Brain,
      title: lang("Consultant IA", "AI Consulting"),
      color: "green",
      skills: [
        lang("Audit des besoins IA", "AI needs assessment"),
        lang("Strategie d integration IA", "AI integration strategy"),
        lang("Automatisation des workflows", "Workflow automation"),
        lang("Optimisation productivite et couts", "Productivity and cost optimization"),
      ],
    },
    {
      icon: Sparkles,
      title: lang("Creation Image & Video IA", "AI Image & Video Creation"),
      color: "pink",
      skills: [
        lang("Generation d images optimisee par IA", "AI-optimized image generation"),
        lang("Creation de videos optimisees avec l IA", "AI-optimized video creation"),
        lang("Prompts avances et direction creative", "Advanced prompting and creative direction"),
        lang("Contenus visuels pour ads et reseaux", "Visual assets for ads and social media"),
      ],
    },
  ];

  const colors = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-t-blue-500",
      badgeBorder: "border-blue-500/25",
    },
    green: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-t-emerald-500",
      badgeBorder: "border-emerald-500/25",
    },
    purple: {
      bg: "bg-violet-500/10",
      text: "text-violet-300",
      border: "border-t-violet-500",
      badgeBorder: "border-violet-500/25",
    },
    orange: {
      bg: "bg-orange-500/10",
      text: "text-orange-300",
      border: "border-t-orange-500",
      badgeBorder: "border-orange-500/25",
    },
    pink: {
      bg: "bg-pink-500/10",
      text: "text-pink-300",
      border: "border-t-pink-500",
      badgeBorder: "border-pink-500/25",
    },
  } as const;

  return (
    <section id="services" className="relative bg-slate-950 py-12 sm:py-14 md:py-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollAnimation>
          <div className="mb-8 text-center sm:mb-10 md:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent sm:text-sm">
              {lang("Mon Expertise", "My Expertise")}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold sm:mt-4 sm:text-4xl md:text-5xl">
              {lang("Competences &", "Skills &")} <span className="text-brand-accent">{lang("Services", "Services")}</span>
            </h2>
          </div>
        </ScrollAnimation>

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:mb-12 xl:grid-cols-5">
          {services.map((service, index) => {
            const color = colors[service.color as keyof typeof colors];
            return (
              <ScrollAnimation key={service.title} animation="fade-up" delay={index * 80}>
                <div
                  className={`glass-card flex h-full flex-col rounded-2xl border-t-4 p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${color.border}`}
                >
                  <div
                    className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 hover:scale-110 ${color.bg} ${color.text}`}
                  >
                    <service.icon className="h-6 w-6" />
                  </div>

                  <h4 className="mb-3 text-lg font-bold">{service.title}</h4>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {service.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-tight ${color.bg} ${color.text} ${color.badgeBorder}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>

        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4 xl:mb-12">
          {[
            { label: lang("Projets livres", "Projects Delivered"), value: "30+", sub: "Build" },
            { label: lang("Scripts et contenus", "Scripts and Content"), value: "120+", sub: "Media" },
            { label: lang("Automatisations IA", "AI Automations"), value: "40+", sub: "Workflow" },
            { label: lang("Temps de reponse", "Response Time"), value: "24h", sub: "Contact" },
          ].map((stat, i) => (
            <ScrollAnimation key={stat.label} delay={i * 100} animation="fade-up">
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition-colors hover:border-brand-accent/50 sm:p-5">
                <div className="mb-1 text-2xl font-black text-white transition-transform group-hover:scale-110 sm:text-3xl">{stat.value}</div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-brand-accent">{stat.label}</div>
                <div className="text-[8px] uppercase text-slate-500">{stat.sub}</div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation delay={400}>
          <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-brand-accent/30 bg-gradient-to-r from-brand-accent/20 to-blue-600/20 p-5 sm:gap-6 sm:rounded-3xl sm:p-6 md:flex-row md:p-8">
            <div className="text-center md:text-left">
              <h3 className="mb-2 text-2xl font-bold sm:text-3xl">
                {lang("Pret a booster votre projet ?", "Ready to boost your project?")}
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                {lang(
                  "Design, contenu et IA reunis pour livrer un rendu pro et performant.",
                  "Design, content, and AI combined to deliver a professional high-performance result."
                )}
              </p>
            </div>
            <a
              href="#contact"
              className="w-full whitespace-nowrap rounded-xl bg-brand-accent px-6 py-3 text-center text-sm font-bold uppercase tracking-wider shadow-xl shadow-brand-accent/20 transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-2xl sm:w-auto sm:px-8 sm:py-4"
            >
              {lang("Demarrer un projet", "Start a project")}
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
