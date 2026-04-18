import { Brain, Code2, PenTool, Sparkles, Video, ArrowRight } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export function ServicesSection() {
  const { lang } = useLanguage();

  const services = [
    {
      icon: Code2,
      title: lang("Développement Web & Mobile", "Web & Mobile Development"),
      description: lang(
        "Architecture robuste et interfaces fluides pour vos plateformes numériques les plus ambitieuses.",
        "Robust architecture and smooth interfaces for your most ambitious digital platforms."
      ),
      skills: ["React, Next.js", "Node.js, Supabase", "API Design"],
    },
    {
      icon: PenTool,
      title: lang("Design & Identité Visuelle", "Design & Visual Identity"),
      description: lang(
        "Une approche esthétique guidée par la psychologie de l'utilisateur et la clarté visuelle.",
        "An aesthetic approach guided by user psychology and visual clarity."
      ),
      skills: ["UI/UX, Figma", "Brand Strategy", "Prototyping"],
    },
    {
      icon: Video,
      title: lang("Copywriting & Storytelling", "Copywriting & Storytelling"),
      description: lang(
        "Des mots qui captivent et convertissent vos visiteurs en clients fidèles.",
        "Words that captivate and convert your visitors into loyal customers."
      ),
      skills: ["Sales Copy", "Video Scripts", "Brand Voice"],
    },
    {
      icon: Brain,
      title: lang("Stratégie & Conseil IA", "AI Strategy & Consulting"),
      description: lang(
        "Optimisez vos flux de travail en intégrant les dernières avancées de l'intelligence artificielle.",
        "Optimize your workflows by integrating the latest advances in artificial intelligence."
      ),
      skills: ["AI Audit", "Workflow Automation", "LLM Integration"],
    },
    {
      icon: Sparkles,
      title: lang("Création de Contenu IA", "AI Content Creation"),
      description: lang(
        "Générez des visuels et des vidéos d'exception grâce à une direction artistique assistée par IA.",
        "Generate exceptional visuals and videos through AI-assisted art direction."
      ),
      skills: ["AI Visuals", "Advanced Prompting", "Creative Tech"],
    },
  ];

  return (
    <div className="py-24 md:py-40 bg-near-black text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimation>
          <div className="max-w-3xl mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-terracotta" />
              <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-stone-gray">
                {lang("Expertise & Services", "Expertise & Services")}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-medium leading-[1.15] mb-8 text-white">
              {lang("Une approche pluridisciplinaire au service de votre vision.", "A multidisciplinary approach serving your vision.")}
            </h2>
            <p className="text-lg md:text-xl text-stone-gray font-sans leading-relaxed">
              {lang(
                "De la première ligne de code au dernier mot du script, je m'assure que chaque élément de votre écosystème digital est parfaitement orchestré.",
                "From the first line of code to the last word of the script, I ensure every element of your digital ecosystem is perfectly orchestrated."
              )}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <ScrollAnimation key={service.title} animation="fade-up" delay={index * 100}>
              <div className="p-10 rounded-[32px] bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-terracotta/10 flex items-center justify-center mb-8 text-terracotta group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl font-serif font-medium mb-4 group-hover:text-terracotta transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-stone-gray font-sans leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {service.skills.map((skill) => (
                    <span key={skill} className="text-[10px] font-sans font-medium uppercase tracking-widest text-stone-gray">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Action Card */}
        <ScrollAnimation delay={400}>
          <div className="p-12 md:p-16 rounded-[40px] bg-terracotta/5 border border-terracotta/10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl md:text-5xl font-serif font-medium mb-6 text-white">
                {lang("Prêt à donner vie à votre prochain grand projet ?", "Ready to bring your next big project to life?")}
              </h3>
              <p className="text-lg text-white/80 font-sans leading-relaxed">
                {lang(
                  "Combinons technique, design et intelligence artificielle pour créer quelque chose de mémorable.",
                  "Let's combine tech, design, and AI to build something memorable."
                )}
              </p>
            </div>
            
            <a
              href="#contact"
              className="btn-primary !px-10 !py-5 !text-base"
            >
              {lang("Démarrer un projet", "Start a project")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
