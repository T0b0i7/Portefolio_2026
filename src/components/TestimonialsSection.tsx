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
    company: "SIAB",
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
    company: "Gang",
    text: "Les affiches promotionnelles étaient incroyables. Une vraie compréhension de ma vision artistique et un résultat qui a marqué les esprits. Travail exceptionnel!",
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
    }, 8000);
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
    <div className="py-24 md:py-40 bg-parchment text-near-black overflow-hidden border-t border-border-cream">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimation>
          <div className="max-w-3xl mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-6">
              <Quote className="w-5 h-5 text-terracotta" />
              <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-stone-gray">
                {lang("Témoignages & Éloges", "Testimonials & Praise")}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-medium leading-[1.15] mb-8">
              {lang("Ceux qui ont fait confiance à ma plume et mon code.", "Those who trusted my pen and my code.")}
            </h2>
          </div>
        </ScrollAnimation>

        <div className="relative">
          <ScrollAnimation animation="fade-up">
            <div className="relative min-h-[400px] flex flex-col justify-center">
              <div className="absolute -top-10 -left-10 text-[200px] font-serif text-terracotta/10 leading-none select-none">
                “
              </div>
              
              <div className="relative z-10 transition-all duration-700">
                <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif font-medium leading-tight mb-12 max-w-5xl">
                  {testimonials[activeIndex].text}
                </blockquote>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-12 border-t border-border-cream">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-warm-sand flex items-center justify-center font-serif text-2xl font-medium text-terracotta border border-border-cream">
                      {testimonials[activeIndex].name[0]}
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-medium text-near-black">{testimonials[activeIndex].name}</h4>
                      <p className="text-sm font-sans text-stone-gray uppercase tracking-widest mt-1">
                        {testimonials[activeIndex].role} — {testimonials[activeIndex].company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button 
                      onClick={goToPrev}
                      className="w-12 h-12 rounded-full border border-border-cream flex items-center justify-center hover:bg-near-black hover:text-ivory transition-all group"
                    >
                      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <div className="text-sm font-sans font-medium text-olive-gray tracking-widest">
                      {activeIndex + 1} / {testimonials.length}
                    </div>
                    <button 
                      onClick={goToNext}
                      className="w-12 h-12 rounded-full border border-border-cream flex items-center justify-center hover:bg-near-black hover:text-ivory transition-all group"
                    >
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}