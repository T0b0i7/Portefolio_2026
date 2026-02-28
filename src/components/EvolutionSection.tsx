import { Briefcase, GraduationCap, Award } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { getExperiences } from "@/data/experienceData";

export function EvolutionSection() {
  const { lang } = useLanguage();
  const timelineItems = getExperiences(lang);

  return (
    <section id="parcours" className="py-16 sm:py-20 md:py-24 bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollAnimation>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="text-brand-accent font-bold tracking-[0.2em] text-xs sm:text-sm uppercase">
              {lang("Mon Évolution", "My Evolution")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 sm:mt-4">
              {lang("Mon", "My")} <span className="text-brand-accent">{lang("Parcours", "Timeline")}</span>
            </h2>
            <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
              {lang(
                "Une chronologie de mes expériences professionnelles et académiques.",
                "A timeline of my professional and academic experiences."
              )}
            </p>
          </div>
        </ScrollAnimation>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Vertical Line - Left aligned on mobile, centered on desktop */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-accent via-slate-700 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const IsWork = item.type === "work";
              return (
                <ScrollAnimation
                  key={index}
                  animation={index % 2 === 0 ? "fade-left" : "fade-right"}
                  delay={index * 100}
                >
                  <div className={cn(
                    "relative flex flex-col md:flex-row items-start md:items-center",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}>

                    {/* Unique Animated Dot */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 md:top-auto z-20 flex items-center justify-center">
                      {/* Pulse effect */}
                      <div className={cn(
                        "absolute w-12 h-12 rounded-full animate-ping opacity-20",
                        IsWork ? "bg-brand-accent" : "bg-purple-500"
                      )} />
                      <div className={cn(
                        "relative w-8 h-8 rounded-full flex items-center justify-center border-2 border-brand-dark shadow-xl",
                        IsWork ? "bg-brand-accent text-white" : "bg-purple-600 text-white"
                      )}>
                        {IsWork ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={cn(
                      "w-full md:w-[45%] mt-10 md:mt-0 pl-12 md:pl-0",
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    )}>
                      <div className="glass-card p-5 rounded-2xl border border-white/5 transition-all duration-500 hover:border-brand-accent/30 hover:translate-y-[-5px] group">
                        {/* Header Area */}
                        <div className={cn(
                          "flex flex-col gap-2 mb-4",
                          index % 2 === 0 ? "md:items-end" : "md:items-start"
                        )}>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full w-fit">
                            {item.period}
                          </span>
                          <h3 className="text-lg font-bold text-slate-100 group-hover:text-brand-accent transition-colors">
                            {item.title}
                          </h3>
                        </div>

                        {/* Company & Location */}
                        <div className={cn(
                          "flex flex-col mb-4",
                          index % 2 === 0 ? "md:items-end" : "md:items-start"
                        )}>
                          <p className="text-sm font-bold text-slate-300">{item.company}</p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                            <Award className="w-3 h-3 text-brand-accent/50" />
                            <span>{item.location}</span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        {item.status && (
                          <div className={cn(
                            "mb-4 flex",
                            index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                          )}>
                            <span className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded-md",
                              item.status === lang("Terminé", "Completed") ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                            )}>
                              {item.status}
                            </span>
                          </div>
                        )}

                        {/* Description List */}
                        <ul className={cn(
                          "space-y-2 text-xs text-slate-400 border-t border-white/5 pt-4",
                          index % 2 === 0 ? "md:text-right" : "md:text-left"
                        )}>
                          {item.description.map((desc, i) => (
                            <li key={i} className="leading-relaxed">
                              {desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Empty Space for Desktop Centering */}
                    <div className="hidden md:block w-[45%]" />
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

