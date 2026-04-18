import { useCallback, useEffect, useMemo, useState } from "react";
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
              <div className="space-y-12 md:space-y-24">
                {timelineItems.map((item, index) => (
                  <ScrollAnimation key={item.id ?? index} delay={index * 100}>
                    <div className="grid md:grid-cols-12 gap-6 md:gap-12 group">
                      <div className="md:col-span-3">
                        <span className="text-sm font-sans font-medium text-stone-gray uppercase tracking-widest bg-warm-sand/40 px-3 py-1 rounded-full">
                          {item.period}
                        </span>
                      </div>
                      
                      <div className="md:col-span-6 space-y-4">
                        <h3 className="text-2xl md:text-3xl font-serif font-medium text-near-black group-hover:text-terracotta transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-sans font-medium text-olive-gray uppercase tracking-wider">
                          <span>{item.company}</span>
                          <span className="text-stone-gray">— {item.location}</span>
                        </div>
                        <div className="space-y-4 pt-4 border-l border-border-cream pl-6">
                          {item.description.map((desc, i) => (
                            <p key={i} className="text-olive-gray leading-relaxed">
                              {desc}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-3 flex justify-end items-start">
                        {item.status && (
                          <span className="text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-border-cream text-stone-gray">
                            {item.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    </div>
  );
}
