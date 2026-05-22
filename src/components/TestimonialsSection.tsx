import { useState, useEffect, useRef } from "react";
import { Quote, ChevronLeft, ChevronRight, Sparkles, Pause, Play } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  stats?: string;
  impact?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Epiphane Koutangni",
    role: "Chef Service Informatique",
    company: "SIAB",
    text: "TobiDev a transformé nos processus internes avec une automatisation remarquable. Une réduction de 30% du temps de traitement, c'est exceptionnel. Un vrai professionnel à l'écoute.",
    rating: 5,
    stats: "-30%",
    impact: "Temps de traitement"
  },
  {
    id: 2,
    name: "Grace Branco",
    role: "Directrice",
    company: "CREACOM",
    text: "Un travail de qualité professionnelle. Mon portfolio est magnifique et attire davantage de clients. Le souci du détail est remarquable. Je recommande à 100%.",
    rating: 5,
    stats: "2x",
    impact: "Visibilité Client"
  },
  {
    id: 3,
    name: "Vano Baby",
    role: "Artiste Musicien",
    company: "Gang",
    text: "Les affiches promotionnelles étaient incroyables. Une vraie compréhension de ma vision artistique et un résultat qui a marqué les esprits. Travail exceptionnel!",
    rating: 5,
    stats: "100%",
    impact: "Satisfaction Artistique"
  },
];

export function TestimonialsSection() {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) {
      setProgress(0);
      return;
    }
    
    const duration = 12000; // 12s
    const step = 100;
    const increment = (step / duration) * 100;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setDirection(1);
          setActiveIndex((idx) => (idx + 1) % testimonials.length);
          return 0;
        }
        return prev + increment;
      });
    }, step);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeIndex]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      filter: "blur(10px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)"
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      filter: "blur(10px)"
    })
  };

  return (
    <div className="py-24 md:py-48 bg-parchment text-near-black overflow-hidden relative border-t border-border-cream">
      {/* Immersive Organic Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-warm-sand/30 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollAnimation>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 md:mb-32">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-terracotta flex items-center justify-center shadow-lg shadow-terracotta/20">
                  <Quote className="w-6 h-6 text-ivory fill-current" />
                </div>
                <span className="text-[12px] font-sans font-black uppercase tracking-[0.4em] text-stone-gray">
                  {lang("Témoignages & Éloges", "Testimonials & Praise")}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-medium leading-[1.05] tracking-tight text-near-black">
                {lang("Ceux qui ont fait confiance à ma plume et mon code.", "Those who trusted my pen and my code.")}
              </h2>
            </div>

            <div className="flex items-center gap-3">
               <button
                 onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                 className="w-14 h-14 rounded-3xl border border-border-cream flex items-center justify-center hover:bg-near-black hover:text-ivory transition-all duration-500 group bg-white/50 backdrop-blur-md"
                 aria-label={isAutoPlaying ? lang("Pause", "Pause") : lang("Lecture auto", "Auto-play")}
               >
                 {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
               </button>
               <button 
                 onClick={goToPrev}
                 className="w-14 h-14 rounded-3xl border border-border-cream flex items-center justify-center hover:bg-near-black hover:text-ivory transition-all duration-500 group bg-white/50 backdrop-blur-md"
               >
                 <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
               </button>
               <button 
                 onClick={goToNext}
                 className="w-14 h-14 rounded-3xl border border-border-cream flex items-center justify-center hover:bg-near-black hover:text-ivory transition-all duration-500 group bg-white/50 backdrop-blur-md"
               >
                 <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
             </div>
          </div>
        </ScrollAnimation>

        <div className="relative min-h-[550px] md:min-h-[500px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.6 },
                filter: { duration: 0.6 }
              }}
              className="w-full"
            >
              <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                <div className="lg:col-span-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif font-medium leading-[1.2] text-near-black italic relative">
                      <span className="absolute -top-20 -left-12 text-[180px] text-terracotta/5 not-italic pointer-events-none select-none">“</span>
                      {testimonials[activeIndex].text}
                    </blockquote>
                  </motion.div>
                  
                  <div className="mt-20 flex items-center gap-10">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-[2.5rem] bg-near-black flex items-center justify-center font-serif text-4xl font-bold text-ivory shadow-2xl rotate-3 overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-br from-terracotta/40 to-transparent" />
                         <span className="relative z-10">{testimonials[activeIndex].name[0]}</span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-terracotta flex items-center justify-center text-ivory shadow-lg border-4 border-parchment">
                        <Sparkles className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl md:text-4xl font-serif font-medium text-near-black leading-none">
                        {testimonials[activeIndex].name}
                      </h4>
                      <div className="flex items-center gap-4">
                        <p className="text-sm font-sans font-black text-stone-gray uppercase tracking-[0.2em]">
                          {testimonials[activeIndex].role}
                        </p>
                        <span className="w-2 h-2 rounded-full bg-terracotta" />
                        <p className="text-sm font-sans font-black text-terracotta uppercase tracking-[0.2em]">
                          {testimonials[activeIndex].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Side Card */}
                <div className="lg:col-span-4 hidden lg:block">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-12 rounded-[3.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl space-y-12 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                       <Quote className="w-24 h-24 rotate-180" />
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-sans font-black text-stone-gray uppercase tracking-[0.4em]">{lang("Performance Accordée", "Performance Granted")}</p>
                      <div className="flex gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6 + (i * 0.1) }}
                          >
                            <Quote className="w-6 h-6 text-terracotta fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                      <p className="text-[10px] font-sans font-black text-stone-gray uppercase tracking-[0.4em]">{lang("Impact Projet", "Project Impact")}</p>
                      <div className="flex flex-col">
                        <span className="text-5xl font-serif font-bold text-near-black leading-none tracking-tighter">
                          {testimonials[activeIndex].stats}
                        </span>
                        <span className="text-lg font-serif italic text-terracotta mt-2">
                          {testimonials[activeIndex].impact}
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-near-black/5">
                        <p className="text-xs text-olive-gray font-medium leading-relaxed italic">
                           {lang("Résultats vérifiés par nos systèmes internes.", "Results verified by our internal systems.")}
                        </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Luxury Progress Bar */}
          <div className="absolute -bottom-20 left-0 w-full h-1.5 bg-near-black/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-terracotta to-accent"
              style={{ width: `${progress}%` }}
              transition={{ type: "tween", ease: "linear" }}
            />
          </div>

          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={cn(
                  "h-2 transition-all duration-700 rounded-full",
                  activeIndex === idx ? "w-16 bg-near-black" : "w-4 bg-near-black/10 hover:bg-near-black/30"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}