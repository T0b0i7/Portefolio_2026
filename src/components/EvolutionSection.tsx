import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, History } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(true);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
    if (saved === "0") {
      setIsOpen(false);
    }
  }, []);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setIsOpen(nextOpen);
    localStorage.setItem(PARCOURS_PREF_KEY, nextOpen ? "1" : "0");
  }, []);

  return (
    <div className="py-24 md:py-40 bg-parchment text-near-black">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimation>
          <div className="max-w-3xl mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-5 h-5 text-terracotta" />
              <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-olive-gray">
                {lang("Histoire & Parcours", "History & Timeline")}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-medium leading-[1.15] mb-8">
              {lang("Une trajectoire dévolue à l'excellence numérique.", "A trajectory dedicated to digital excellence.")}
            </h2>
            <p className="text-lg md:text-xl text-olive-gray font-sans leading-relaxed">
              {lang(
                "De mes premières lignes de code à la conception de systèmes complexes, chaque étape a été guidée par une passion pour la clarté et la performance.",
                "From my first lines of code to designing complex systems, every step has been guided by a passion for clarity and performance."
              )}
            </p>
          </div>
        </ScrollAnimation>

        <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
          <div className="border-t border-border-cream pt-12">
            <CollapsibleTrigger asChild>
              <button className="flex items-center gap-2 text-sm font-sans font-medium text-olive-gray hover:text-near-black transition-colors mb-12">
                <span>{isOpen ? lang("Masquer le détail", "Hide details") : lang("Voir le détail du parcours", "View timeline details")}</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isOpen && "rotate-180")} />
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div ref={timelineRef} className="relative">
                {/* Dynamic Scroll Progress Line */}
                <div className="absolute left-0 md:left-[12.5%] top-0 bottom-0 w-px bg-border-cream hidden md:block" />
                <motion.div
                  className="absolute left-0 md:left-[12.5%] top-0 w-px bg-terracotta z-20 hidden md:block origin-top"
                  style={{ scaleY }}
                />

                <div className="space-y-12 md:space-y-32 relative">
                  {timelineItems.map((item, index) => {
                    const Icon = (item as any).icon || History;
                    return (
                      <ScrollAnimation key={item.id ?? index} delay={index * 150} animation="fade-up">
                        <div className="grid md:grid-cols-12 gap-8 md:gap-16 group relative">
                          {/* Period & Dot */}
                          <div className="md:col-span-3 relative flex items-start md:justify-end">
                            <div className="flex flex-col items-start md:items-end gap-3">
                              <span className="text-sm font-sans font-bold text-terracotta uppercase tracking-[0.2em] bg-terracotta/5 px-4 py-1.5 rounded-full border border-terracotta/10">
                                {item.period}
                              </span>
                            </div>

                            {/* Timeline Dot with Icon */}
                            <div className="absolute top-2 right-0 translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-parchment border border-border-cream z-30 group-hover:border-terracotta group-hover:scale-110 transition-all duration-500 shadow-whisper">
                              <Icon className="w-5 h-5 text-olive-gray group-hover:text-terracotta transition-colors" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="md:col-span-7 space-y-6">
                            <div className="space-y-2">
                              <h3 className="text-3xl md:text-5xl font-serif font-medium text-near-black group-hover:text-terracotta transition-colors duration-500 leading-tight">
                                {item.title}
                              </h3>
                              <div className="flex items-center gap-3 text-sm font-sans font-bold text-olive-gray uppercase tracking-[0.2em]">
                                <span>{item.company}</span>
                                <span className="w-1 h-1 rounded-full bg-border-cream" />
                                <span className="text-stone-gray">{item.location}</span>
                              </div>
                            </div>

                            <div className="space-y-5 pt-4">
                              {item.description.map((desc, i) => (
                                <p key={i} className="text-lg md:text-xl text-olive-gray font-sans leading-relaxed max-w-2xl">
                                  {desc}
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="md:col-span-2 flex justify-start md:justify-end items-start pt-2">
                            {item.status && (
                              <span className={cn(
                                "text-[10px] font-sans font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-border-cream text-stone-gray",
                                item.status === "Actuel" || item.status === "Current" ? "bg-terracotta/10 text-terracotta border-terracotta/20" : ""
                              )}>
                                {item.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </ScrollAnimation>
                    );
                  })}
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    </div>
  );
}
