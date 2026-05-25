import { motion } from "framer-motion";
import { AutoImageCarousel } from "./AutoImageCarousel";
import { Github, Linkedin, Facebook, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { icon: Github, href: "https://github.com/T0b0i7/", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/eucher-abatti-7a9472283", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/bi.to.77235", label: "Facebook" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemSlideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.85, rotate: -3 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const wordReveal = {
  hidden: { opacity: 0, y: 50, rotateX: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const badgeFloat = {
  hidden: { opacity: 0, x: 50, y: 30 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export function AnimatedHeroSection() {
  const { lang } = useLanguage();
  const titleWords = lang("Bénissez votre présence numérique", "Elevate your digital presence").split(" ");

  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      {/* Continuous floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-terracotta/10"
          animate={{
            x: [0, 40, -10, 20, 0],
            y: [0, -30, 20, 10, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-20 w-[30rem] h-[30rem] rounded-full bg-warm-sand/40"
          animate={{
            x: [0, -30, 20, 40, 0],
            y: [0, 30, -15, -20, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col"
        >
          {/* Badge */}
          <motion.div variants={itemSlideUp}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-warm-sand text-[11px] font-sans font-medium uppercase tracking-widest text-charcoal-warm border border-border-cream mb-8">
              {lang("Disponible pour missions", "Available for hire")}
            </span>
          </motion.div>

          {/* Title - word by word */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-near-black leading-[1.1] mb-6 perspective-1000">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="inline-block mr-[0.3em]"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word === "présence" || word === "digital" ? (
                  <span className="text-terracotta">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={itemSlideUp}
            className="text-xl md:text-2xl text-charcoal-warm font-sans leading-relaxed mb-10 max-w-xl"
          >
            {lang(
              "Développeur Full-Stack & Designer UI/UX. Je conçois des interfaces élégantes et des systèmes robustes qui racontent votre histoire.",
              "Full-Stack Developer & UI/UX Designer. I craft elegant interfaces and robust systems that tell your story."
            )}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemSlideUp}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              className="btn-primary group"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {lang("Explorer mon travail", "Explore my work")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-secondary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {lang("Me contacter", "Get in touch")}
            </motion.a>
          </motion.div>

          {/* Social */}
          <motion.div
            variants={itemFadeIn}
            className="flex items-center gap-8"
          >
            <span className="text-sm font-sans text-charcoal-warm uppercase tracking-widest font-medium">
              {lang("Suivez-moi", "Follow me")}
            </span>
            <div className="flex gap-5">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-gray hover:text-terracotta transition-colors p-2 -m-2"
                  aria-label={`${social.label} (nouvelle fenêtre / new window)`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 + i * 0.15, duration: 0.4 }}
                  whileHover={{ scale: 1.25, color: "#c96442" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          variants={imageReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          <div className="relative w-full max-w-[520px] aspect-square mx-auto flex flex-col items-center justify-center">
            {/* Rotating backdrops */}
            <motion.div
              className="absolute inset-0 bg-terracotta/5 rounded-[48px] pointer-events-none"
              animate={{ rotate: [6, 8, 4, 6] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 bg-warm-sand/40 rounded-[48px] pointer-events-none"
              animate={{ rotate: [-3, -1, -5, -3] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="relative w-full max-w-[280px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[500px] aspect-square rounded-[32px] overflow-hidden border border-border-cream shadow-whisper z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <AutoImageCarousel
                images={[
                  { src: "/profil.png", alt: "TobiDev" },
                  { src: "/profil1.png", alt: "TobiDev couleur" },
                ]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/20 to-transparent pointer-events-none" />
            </motion.div>

            {/* Badge */}
            <motion.div
              className="absolute bottom-2 right-2 md:bottom-6 md:right-6 bg-near-black p-5 rounded-2xl border border-white/10 shadow-whisper max-w-[180px] z-20"
              variants={badgeFloat}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, rotate: 2 }}
            >
              <div className="text-ivory font-serif text-2xl md:text-3xl font-medium mb-1">5+</div>
              <div className="text-xs font-sans text-ivory/80 leading-tight uppercase tracking-wider font-medium">
                {lang("Années d'expérience en dev", "Years of dev experience")}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
