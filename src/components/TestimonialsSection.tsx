import { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Epiphane Koutangni",
    role: "Chef Service Informatique",
    company: "SIAB - Société Industrielle d'Acier du Benin",
    text: "TobiDev a transformé nos processus internes avec une automatisation remarquable. Une réduction de 30% du temps de traitement, c'est exceptionnel. Un vrai professionnel à l'écoute.",
    rating: 5,
  },
  {
    id: 2,
    name: "Grace Branco",
    role: "Directrice",
    company: "CREACOM",
    text: "Un travail de qualité professionnelle. Mon portfolio est magnifique et attire davantage de clients. Le souci du détail est remarquable. Je recommande à 100%.",
    rating: 5,
  },
  {
    id: 3,
    name: "Vano Baby",
    role: "Artiste Musicien",
    company: "Concert 10 ans du Gang",
    text: "Les affiches promotionnelles étaient incroyables. Une vraie compréhension de ma vision artistique et un résultat qui a marqué les esprits. Travail exceptionnel!",
    rating: 5,
  },
  {
    id: 4,
    name: "InnovTech SAS",
    role: "Agence Digitale",
    company: "Entreprise",
    text: "Collaboration excellente. TobiDev comprend vite les besoins et livre toujours dans les délais. Un partenaire de confiance pour tous nos projets web.",
    rating: 5,
  },
  {
    id: 5,
    name: "Ahouéfa Camillia",
    role: "Développeuse Full-Stack",
    company: "Portfolio 3D",
    text: "Mon portfolio 3D est devenu une vraie œuvre d'art. Les visiteurs sont impressionnés par la qualité et l'originalité du design. Exactement ce que je voulais !",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="temoignages" className="py-14 sm:py-16 md:py-20 bg-slate-950 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 rounded-full bg-brand-accent/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
              <Quote className="h-3.5 w-3.5" />
              {lang("Témoignages", "Testimonials")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              {lang("Témoignages clients", "Client Testimonials")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
              {lang(
                "Retours authentiques de clients satisfaits par mes réalisations numériques.",
                "Authentic feedback from clients who are satisfied with my digital work."
              )}
            </p>
          </div>
        </ScrollAnimation>

        <div className="relative max-w-5xl mx-auto">
          <ScrollAnimation delay={100}>
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex justify-start mb-6">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-lg sm:text-xl md:text-2xl text-slate-200 leading-relaxed font-medium min-h-[80px]">
                  "{testimonials[activeIndex].text}"
                </blockquote>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-accent to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-accent/20">
                    {testimonials[activeIndex].name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-lg">{testimonials[activeIndex].name}</p>
                    <p className="text-sm text-slate-400">
                      {testimonials[activeIndex].role} {lang("chez", "at")} <span className="text-brand-accent">{testimonials[activeIndex].company}</span>
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={goToPrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                aria-label={lang("Témoignage précédent", "Previous testimonial")}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                aria-label={lang("Témoignage suivant", "Next testimonial")}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </ScrollAnimation>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-8 bg-brand-accent"
                    : "w-2 bg-slate-700 hover:bg-slate-600"
                )}
                aria-label={`${lang("Témoignage", "Testimonial")} ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-6">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300",
                  index === activeIndex
                    ? "bg-brand-accent/10 border-brand-accent/30"
                    : "bg-transparent border-white/5 hover:border-white/20"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                  index === activeIndex
                    ? "bg-brand-accent text-white"
                    : "bg-slate-800 text-slate-400"
                )}>
                  {testimonial.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="text-left hidden sm:block">
                  <p className={cn(
                    "text-sm font-medium",
                    index === activeIndex ? "text-white" : "text-slate-400"
                  )}>
                    {testimonial.name.split(" ")[0]}
                  </p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className={cn(
                        "w-3 h-3",
                        index === activeIndex ? "fill-yellow-400 text-yellow-400" : "fill-slate-600 text-slate-600"
                      )} />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}