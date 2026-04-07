import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutSection() {
  const { lang } = useLanguage();
  const revealRef = useRef<HTMLDivElement | null>(null);
  const [startReveal, setStartReveal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  const audienceQuestions = useMemo(
    () => [
      lang("Vous en avez assez de tout faire à la main ?", "Are you tired of doing everything manually?"),
      lang("Vous souhaitez automatiser vos tâches récurrentes ?", "Do you want to automate recurring tasks?"),
      lang("Vous voulez augmenter vos revenus mensuels et annuels ?", "Do you want to increase your monthly and yearly revenue?"),
      lang("Vous voulez mieux vous positionner sur le marché digital ?", "Do you want a stronger position in the digital market?"),
      lang("Vous souhaitez rester dans la course à l'innovation ?", "Do you want to stay ahead in innovation?")
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
    }, 260);

    return () => clearTimeout(timer);
  }, [startReveal, visibleCount, audienceQuestions.length]);

  return (
    <section id="apropos" className="relative overflow-hidden bg-slate-950 py-12 sm:py-14 md:py-16">
      <div className="pointer-events-none absolute -left-20 top-10 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollAnimation>
          <div className="mb-8 text-center sm:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-300 sm:text-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {lang("À propos", "About")}
            </span>
            <h2 className="mt-3 text-2xl font-semibold text-slate-100 sm:text-3xl md:text-4xl">
              {lang("Pourquoi travailler avec moi ?", "Why work with me?")}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {lang(
                "Cette section est conçue pour capter votre attention et vous offrir une direction claire : passer de l'effort constant à des résultats mesurables.",
                "This section is designed to capture your attention and offer a clear direction: moving from constant effort to measurable results."
              )}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-center">
          <ScrollAnimation animation="fade-right" delay={80}>
            <div className="relative overflow-hidden rounded-2xl border border-blue-400/25 bg-slate-900/70 p-2 shadow-[0_0_50px_rgba(37,99,235,0.14)]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-300/10" />
              <img
                src="/profil.png"
                alt="TobiDev"
                className="h-72 w-full rounded-xl object-cover sm:h-80"
                loading="lazy"
                decoding="async"
              />
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-left" delay={140}>
            <div
              ref={revealRef}
              className="rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/12 via-slate-900/90 to-slate-900 p-5 sm:p-6 md:p-7"
            >
              <h3 className="mb-4 text-2xl font-semibold text-white sm:text-3xl">
                {lang("Et si nous parlions de vos objectifs ?", "What about your goals?")}
              </h3>

              <div className="mb-5 space-y-2.5">
                {audienceQuestions.map((question, index) => {
                  const isVisible = index < visibleCount;
                  return (
                    <p
                      key={question}
                      className={`rounded-xl border px-3 py-2.5 text-sm transition-all duration-500 ${
                        isVisible
                          ? "translate-x-0 border-blue-300/30 bg-blue-500/15 text-blue-100 opacity-100"
                          : "translate-x-4 border-blue-300/10 bg-blue-500/5 text-blue-200/40 opacity-0"
                      }`}
                    >
                      {question}
                    </p>
                  );
                })}
              </div>

              <p className="mb-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                {lang(
                  "Alors oui : je peux être la solution. Mon rôle est de transformer vos objectifs en un système concret, lisible et performant.",
                  "Then yes: I can be the solution. My role is to turn your goals into a concrete, clear, and high-performing system."
                )}
              </p>
              <p className="mb-6 text-sm leading-relaxed text-slate-300 sm:text-base">
                {lang(
                  "Avec moi, vous gagnez une direction stratégique, une exécution professionnelle et une présence digitale qui vous différencie réellement.",
                  "With me, you get strategic direction, professional execution, and a digital presence that truly sets you apart."
                )}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-600"
                >
                  {lang("Je veux évoluer", "I want to grow")}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-xl border border-blue-300/20 bg-blue-500/5 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-100 transition-all hover:border-blue-300/50 hover:bg-blue-500/10"
                >
                  {lang("Voir mes réalisations", "See my work")}
                </a>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
