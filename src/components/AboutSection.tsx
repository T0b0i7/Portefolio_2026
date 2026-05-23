import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useMemo } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const questionVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.25, ease: [0.16, 1, 0.3, 1] },
  }),
};

const avatarVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.15, type: "spring", stiffness: 200, damping: 15 },
  }),
};

export function AboutSection() {
  const { lang } = useLanguage();

  const audienceQuestions = useMemo(
    () => [
      lang("Lassé des processus manuels qui freinent votre croissance ?", "Tired of manual processes slowing your growth?"),
      lang("Besoin d'automatiser vos tâches pour regagner du temps ?", "Need to automate tasks to win back your time?"),
      lang("Envie d'une présence digitale qui reflète vraiment votre excellence ?", "Want a digital presence that truly reflects your excellence?"),
      lang("Vous cherchez à transformer vos visiteurs en ambassadeurs ?", "Looking to turn your visitors into ambassadors?"),
    ],
    [lang]
  );

  const avatars = [
    { icon: Sparkles, bg: "bg-terracotta/20", text: "text-terracotta" },
    { icon: Users, bg: "bg-warm-sand", text: "text-near-black" },
    { icon: Zap, bg: "bg-ivory/10", text: "text-ivory" },
  ];

  return (
    <div className="py-24 md:py-40 px-6 bg-near-black text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            <motion.div variants={fadeLeft} className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-stone-gray">
              {lang("Philosophie", "Philosophy")}
            </motion.div>

            <motion.h2 variants={fadeLeft} className="text-4xl md:text-6xl font-serif font-medium leading-[1.15]">
              {lang(
                "« Les programmes doivent être écrits pour être lus par des humains, et seulement accessoirement pour être exécutés par des machines. »",
                "“Programs must be written for people to read, and only incidentally for machines to execute.”"
              )}
              <span className="block mt-4 text-2xl text-stone-gray">— Harold Abelson</span>
            </motion.h2>

            <motion.p variants={fadeLeft} className="text-lg md:text-xl text-stone-gray font-sans leading-relaxed max-w-xl">
              {lang(
                "Je ne construis pas seulement des sites web. Je crée des environnements numériques où chaque pixel et chaque ligne de code respirent la clarté, l'intention et le goût.",
                "I don't just build websites. I create digital environments where every pixel and line of code breathes clarity, intention, and taste."
              )}
            </motion.p>

            <motion.div variants={fadeLeft} className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {avatars.map((avatar, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={avatarVariants}
                    className={`w-12 h-12 rounded-full border-2 border-near-black ${avatar.bg} ${avatar.text} flex items-center justify-center shadow-lg hover:translate-y-[-2px] transition-transform`}
                    whileHover={{ y: -4, scale: 1.1 }}
                  >
                    <avatar.icon className="w-5 h-5" />
                  </motion.div>
                ))}
              </div>
              <div className="text-sm font-sans text-stone-gray leading-tight uppercase tracking-wider font-medium">
                {lang("Rejoint par des visionnaires", "Joined by visionaries")}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-ivory/[0.03] border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-serif font-medium mb-8">
                {lang("Et si nous parlions de vos objectifs ?", "What about your goals?")}
              </h3>

              <div className="space-y-4 mb-10">
                {audienceQuestions.map((question, index) => (
                  <motion.p
                    key={question}
                    custom={index}
                    variants={questionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`text-lg md:text-xl font-sans transition-colors duration-700 ${
                      index < audienceQuestions.length - 1 ? "text-stone-gray" : "text-ivory"
                    }`}
                  >
                    — {question}
                  </motion.p>
                ))}
              </div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-stone-gray leading-relaxed">
                  {lang(
                    "Ma mission est de transformer ces interrogations en un système concret, lisible et performant qui propulse votre activité au niveau supérieur.",
                    "My mission is to turn these questions into a concrete, clear, and high-performing system that propels your business to the next level."
                  )}
                </p>

                <div className="pt-4">
                  <motion.a
                    href="#contact"
                    className="btn-primary"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {lang("Commencer la conversation", "Start the conversation")}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Decorative detail */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
