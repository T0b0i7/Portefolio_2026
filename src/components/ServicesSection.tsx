import { Code, Server, Palette, Brain, Database } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export function ServicesSection() {
  const { lang } = useLanguage();

  const services = [
    {
      icon: Code,
      title: lang("Frontend & UX", "Frontend & UX"),
      color: "blue",
      skills: [
        "React, Next.js",
        "JavaScript (ES6+), HTML5, CSS3",
        "Tailwind CSS, Bootstrap",
        "Figma, Canva",
        lang("Responsive Design, UI/UX, WCAG", "Responsive Design, UI/UX, WCAG"),
      ],
    },
    {
      icon: Server,
      title: lang("Backend & API", "Backend & API"),
      color: "green",
      skills: [
        "Node.js, PHP",
        lang("Laravel, Symfony (En apprentissage)", "Laravel, Symfony (Learning)"),
        lang("API REST, Architecture MVC", "REST API, MVC Architecture"),
        lang("JWT, Authentification", "JWT, Authentication"),
        "MySQL, PostgreSQL, SQL Server",
      ],
    },
    {
      icon: Database,
      title: lang("Base de données", "Database"),
      color: "purple",
      skills: [
        "MySQL, PostgreSQL, SQL Server",
        "Supabase (BaaS)",
        "Airtable",
        "phpMyAdmin, Adminer",
        lang("Requêtes complexes, Migrations", "Complex Queries, Migrations"),
      ],
    },
    {
      icon: Brain,
      title: lang("IA & Automation", "AI & Automation"),
      color: "orange",
      skills: [
        "ChatGPT, DALL·E, Leonardo AI",
        "Suno, Runway",
        "Zapier, Make",
        "Python Scripts",
        "Webflow, Notion, Uizard",
      ],
    },
  ];

  const colors = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-500",
      border: "border-t-blue-500",
      dot: "bg-blue-500",
    },
    green: {
      bg: "bg-green-500/10",
      text: "text-green-500",
      border: "border-t-green-500",
      dot: "bg-green-500",
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-500",
      border: "border-t-purple-500",
      dot: "bg-purple-500",
    },
    orange: {
      bg: "bg-orange-500/10",
      text: "text-orange-500",
      border: "border-t-orange-500",
      dot: "bg-orange-500",
    },
  };

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <ScrollAnimation>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="text-brand-accent font-bold tracking-[0.2em] text-xs sm:text-sm uppercase">
              {lang("Mon Expertise", "My Expertise")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 sm:mt-4">
              {lang("Compétences &", "Skills &")} <span className="text-brand-accent">{lang("Services", "Services")}</span>
            </h2>
            <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
              {lang(
                "Des compétences techniques approfondies pour répondre à tous vos besoins de développement.",
                "Deep technical skills to meet all your development needs."
              )}
            </p>
          </div>
        </ScrollAnimation>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
          {services.map((service, index) => {
            const color = colors[service.color as keyof typeof colors];
            return (
              <ScrollAnimation
                key={service.title}
                animation="fade-up"
                delay={index * 100}
              >
                <div
                  className={`glass-card p-6 rounded-3xl border-t-4 ${color.border} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 ${color.bg} rounded-xl flex items-center justify-center ${color.text} mb-4 transition-transform duration-300 hover:scale-110`}
                  >
                    <service.icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-lg mb-4">{service.title}</h4>

                  {/* Skills */}
                  <ul className="text-muted-foreground text-xs sm:text-sm space-y-1.5 sm:space-y-2">
                    {service.skills.map((skill) => (
                      <li key={skill} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${color.dot} mt-1.5 sm:mt-2 flex-shrink-0`} />
                        <span className="line-clamp-2">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* CTA Banner */}
        <ScrollAnimation delay={400}>
          <div className="bg-gradient-to-r from-brand-accent/20 to-blue-600/20 border border-brand-accent/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                {lang("Prêt à donner vie à votre projet ?", "Ready to bring your project to life?")}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                {lang(
                  "Disponible pour de nouvelles opportunités en freelance ou CDI.",
                  "Available for new freelance or full-time opportunities."
                )}
              </p>
            </div>
            <a
              href="#contact"
              className="bg-brand-accent whitespace-nowrap px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-brand-accent/20 hover:shadow-2xl hover:scale-105 w-full sm:w-auto text-center uppercase tracking-wider text-sm"
            >
              {lang("Démarrer un projet", "Start a project")}
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

