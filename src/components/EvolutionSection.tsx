import { useCallback, useEffect, useMemo, useState } from "react";
import { Award, Briefcase, ChevronDown, GraduationCap } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { getExperiences } from "@/data/experienceData";
import { experienceService, Experience } from "@/services/experienceService";

const PARCOURS_PREF_KEY = "portfolio_parcours_open";

export function EvolutionSection() {
  const { lang, language } = useLanguage();
  const [timelineItems, setTimelineItems] = useState<Experience[]>(getExperiences(lang) as Experience[]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimelineItems(getExperiences(lang) as Experience[]);

    const fetchDBExperiences = async () => {
      const dbExps = await experienceService.getAllExperiences(language);
      if (dbExps && dbExps.length > 0) {
        setTimelineItems(dbExps);
      }
    };
    fetchDBExperiences();
  }, [language, lang]);

  useEffect(() => {
    const saved = localStorage.getItem(PARCOURS_PREF_KEY);
    if (saved === "1") {
      setIsOpen(true);
      return;
    }

    if (window.location.hash === "#parcours") {
      setIsOpen(true);
      return;
    }

    // Show parcours by default for better UX
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === "#parcours") {
        setIsOpen(true);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setIsOpen(nextOpen);
    localStorage.setItem(PARCOURS_PREF_KEY, nextOpen ? "1" : "0");
  }, []);

  const workCount = useMemo(() => timelineItems.filter((item) => item.type === "work").length, [timelineItems]);
  const educationCount = useMemo(() => timelineItems.filter((item) => item.type === "education").length, [timelineItems]);

  return (
    <section id="parcours" className="py-12 sm:py-14 md:py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollAnimation>
          <div className="text-center mb-7 sm:mb-8">
            <span className="text-brand-accent font-bold tracking-[0.2em] text-xs sm:text-sm uppercase">
              {lang("Mon Evolution", "My Evolution")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 sm:mt-4">
              {lang("Mon", "My")} <span className="text-brand-accent">{lang("Parcours", "Timeline")}</span>
            </h2>
            <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
              {lang(
                "Une chronologie de mes experiences professionnelles et academiques.",
                "A timeline of my professional and academic experiences."
              )}
            </p>
          </div>
        </ScrollAnimation>

        <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
          <ScrollAnimation delay={100}>
            <div className="max-w-3xl mx-auto mb-6">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-white text-lg font-bold">
                      {lang("Voulez-vous voir mon parcours ?", "Would you like to see my timeline?")}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      {lang(
                        "Vue detaillee de mes experiences, stages et formation.",
                        "Detailed view of my experience, internships and education."
                      )}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="px-2.5 py-1 rounded-md bg-brand-accent/15 border border-brand-accent/25 text-brand-accent text-[11px] font-bold uppercase tracking-wider">
                        {workCount} {lang("roles pro", "work roles")}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-400/25 text-blue-300 text-[11px] font-bold uppercase tracking-wider">
                        {educationCount} {lang("formations", "education items")}
                      </span>
                    </div>
                  </div>

                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-accent text-white font-bold text-sm uppercase tracking-wider hover:bg-blue-600 transition-colors"
                    >
                      {isOpen ? lang("Masquer", "Hide") : lang("Voir mon parcours", "View my timeline")}
                      <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
                    </button>
                  </CollapsibleTrigger>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <CollapsibleContent>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-accent via-slate-700 to-transparent md:-translate-x-1/2" />

              <div className="space-y-8 sm:space-y-10">
                {timelineItems.map((item, index) => {
                  const isWork = item.type === "work";
                  const isCompletedStatus = /term|complet|completed/i.test(item.status ?? "");
                  return (
                    <ScrollAnimation
                      key={item.id ?? index}
                      animation={index % 2 === 0 ? "fade-left" : "fade-right"}
                      delay={index * 80}
                    >
                      <div
                        className={cn(
                          "relative flex flex-col md:flex-row items-start md:items-center",
                          index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        )}
                      >
                        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 md:top-auto z-20 flex items-center justify-center">
                          <div
                            className={cn(
                              "absolute w-12 h-12 rounded-full animate-ping opacity-20",
                              isWork ? "bg-brand-accent" : "bg-blue-400"
                            )}
                          />
                          <div
                            className={cn(
                              "relative w-8 h-8 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-xl",
                              isWork ? "bg-brand-accent text-white" : "bg-blue-500 text-white"
                            )}
                          >
                            {isWork ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                          </div>
                        </div>

                        <div
                          className={cn(
                            "w-full md:w-[45%] mt-10 md:mt-0 pl-12 md:pl-0",
                            index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                          )}
                        >
                          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/5 transition-all duration-500 hover:border-brand-accent/30 hover:translate-y-[-5px] group">
                            <div
                              className={cn(
                                "flex flex-col gap-2 mb-4",
                                index % 2 === 0 ? "md:items-end" : "md:items-start"
                              )}
                            >
                              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full w-fit">
                                {item.period}
                              </span>
                              <h3 className="text-lg font-bold text-slate-100 group-hover:text-brand-accent transition-colors">
                                {item.title}
                              </h3>
                            </div>

                            <div
                              className={cn(
                                "flex flex-col mb-4",
                                index % 2 === 0 ? "md:items-end" : "md:items-start"
                              )}
                            >
                              <p className="text-sm font-bold text-slate-300">{item.company}</p>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                <Award className="w-3 h-3 text-brand-accent/50" />
                                <span>{item.location}</span>
                              </div>
                            </div>

                            {item.status ? (
                              <div className={cn("mb-4 flex", index % 2 === 0 ? "md:justify-end" : "md:justify-start")}>
                                <span
                                  className={cn(
                                    "text-[10px] font-bold px-2 py-0.5 rounded-md",
                                    isCompletedStatus
                                      ? "bg-emerald-500/10 text-emerald-400"
                                      : "bg-blue-500/10 text-blue-300"
                                  )}
                                >
                                  {item.status}
                                </span>
                              </div>
                            ) : null}

                            <ul
                              className={cn(
                                "space-y-2 text-xs text-slate-400 border-t border-white/5 pt-4",
                                index % 2 === 0 ? "md:text-right" : "md:text-left"
                              )}
                            >
                              {item.description.map((desc, i) => (
                                <li key={i} className="leading-relaxed">
                                  {desc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="hidden md:block w-[45%]" />
                      </div>
                    </ScrollAnimation>
                  );
                })}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
}
