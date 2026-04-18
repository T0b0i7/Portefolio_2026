import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutSection() {
  const { lang } = useLanguage();
  const revealRef = useRef<HTMLDivElement | null>(null);
  const [startReveal, setStartReveal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  const audienceQuestions = useMemo(
    () => [
      lang("Lassé des processus manuels qui freinent votre croissance ?", "Tired of manual processes slowing your growth?"),
      lang("Besoin d'automatiser vos tâches pour regagner du temps ?", "Need to automate tasks to win back your time?"),
      lang("Envie d'une présence digitale qui reflète vraiment votre excellence ?", "Want a digital presence that truly reflects your excellence?"),
      lang("Vous cherchez à transformer vos visiteurs en ambassadeurs ?", "Looking to turn your visitors into ambassadors?"),
    ],
    [lang]
  );

  useEffect(() => {
    const target = revealRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStartReveal(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startReveal) return;
    if (visibleCount >= audienceQuestions.length) return;

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, 400);

    return () => clearTimeout(timer);
  }, [startReveal, visibleCount, audienceQuestions.length]);

  return (
    <div className="py-24 md:py-40 px-6 bg-near-black text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <ScrollAnimation animation="fade-right">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-stone-gray">
                {lang("Philosophie", "Philosophy")}
              </div>
              
              <h2 className="text-4xl md:text-6xl font-serif font-medium leading-[1.15]">
                {lang("Un salon littéraire réimaginé pour le web moderne.", "A literary salon reimagined for the modern web.")}
              </h2>
              
              <p className="text-lg md:text-xl text-stone-gray font-sans leading-relaxed max-w-xl">
                {lang(
                  "Je ne construis pas seulement des sites web. Je crée des environnements numériques où chaque pixel et chaque ligne de code respirent la clarté, l'intention et le goût.",
                  "I don't just build websites. I create digital environments where every pixel and line of code breathes clarity, intention, and taste."
                )}
              </p>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-near-black bg-warm-sand/20" />
                  ))}
                </div>
                <div className="text-sm font-sans text-stone-gray leading-tight uppercase tracking-wider">
                   {lang("Rejoint par des visionnaires", "Joined by visionaries")}
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-left">
            <div 
              ref={revealRef}
              className="bg-ivory/[0.03] border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-medium mb-8">
                  {lang("Et si nous parlions de vos objectifs ?", "What about your goals?")}
                </h3>

                <div className="space-y-4 mb-10">
                  {audienceQuestions.map((question, index) => {
                    const isVisible = index < visibleCount;
                    return (
                      <p
                        key={question}
                        className={`text-lg md:text-xl font-sans transition-all duration-700 ${
                          isVisible
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-4"
                        } ${index < visibleCount - 1 ? "text-stone-gray" : "text-ivory"}`}
                      >
                        — {question}
                      </p>
                    );
                  })}
                </div>

                <div className="space-y-6">
                  <p className="text-stone-gray leading-relaxed">
                    {lang(
                      "Ma mission est de transformer ces interrogations en un système concret, lisible et performant qui propulse votre activité au niveau supérieur.",
                      "My mission is to turn these questions into a concrete, clear, and high-performing system that propels your business to the next level."
                    )}
                  </p>
                  
                  <div className="pt-4">
                    <a
                      href="#contact"
                      className="btn-primary"
                    >
                      {lang("Commencer la conversation", "Start the conversation")}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative detail */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}
