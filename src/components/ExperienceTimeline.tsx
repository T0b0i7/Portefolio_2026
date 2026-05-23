import { Building2, Briefcase, GraduationCap, Rocket, Clock, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { getExperiences } from "@/data/experienceData";
import { motion } from "framer-motion";

const colorStyles = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    text: "text-primary",
    dot: "bg-primary",
    glow: "glow-cyan",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary/30",
    text: "text-secondary",
    dot: "bg-secondary",
    glow: "glow-orange",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent/30",
    text: "text-accent",
    dot: "bg-accent",
    glow: "glow-violet",
  },
  success: {
    bg: "bg-success/10",
    border: "border-success/30",
    text: "text-success",
    dot: "bg-success",
    glow: "",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -40 : 40,
    scale: 0.95,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const descriptionItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: "easeOut" },
  }),
};

export function ExperienceTimeline() {
  const { lang } = useLanguage();
  const experiences = getExperiences(lang);

  return (
    <div className="relative">
      <motion.div
        className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-accent via-blue-500 to-emerald-500 opacity-30 origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-8"
      >
        {experiences.map((exp, index) => {
          const Icon = exp.icon;
          const styles = colorStyles[exp.color as keyof typeof colorStyles];

          return (
            <motion.div
              key={exp.id}
              custom={index}
              variants={cardVariants}
              className="relative pl-20"
            >
              {/* Timeline Dot */}
              <motion.div
                className={cn(
                  "absolute left-6 w-5 h-5 rounded-full border-4 border-slate-950 transition-all duration-300 z-10",
                  styles.dot,
                  exp.current && "pulse-glow animate-glow-pulse shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                )}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200, damping: 12 }}
              />

              {/* Card */}
              <div
                className={cn(
                  "glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] card-hover group relative",
                  styles.border
                )}
              >
                {/* Glow Effect Background */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-2xl -z-10",
                    exp.color === "primary" && "bg-primary",
                    exp.color === "secondary" && "bg-secondary",
                    exp.color === "accent" && "bg-accent",
                    exp.color === "success" && "bg-success"
                  )}
                />

                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={cn("p-3 rounded-xl transition-all duration-300 group-hover:scale-110", styles.bg)}
                      whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.4 } }}
                    >
                      <Icon className={cn("w-6 h-6", styles.text)} />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-display font-semibold mb-1 group-hover:text-white transition-colors duration-300 text-white">
                        {exp.title}
                      </h3>
                      <p className={cn("font-medium", styles.text)}>{exp.company}</p>
                      <p className="text-sm text-slate-500">{exp.location}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500 transition-all duration-300 group-hover:text-brand-accent">
                      <Clock className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    {exp.current && (
                      <span className="px-3 py-1 rounded-full bg-success/20 text-success text-[10px] font-bold uppercase tracking-wider animate-pulse border border-success/30">
                        {lang("En cours", "In Progress")}
                      </span>
                    )}
                    {exp.badge && (
                      <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:bg-secondary/20 transition-colors duration-300 border border-secondary/20">
                        <TrendingDown className="w-3 h-3" />
                        {exp.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {exp.description.length > 0 && (
                  <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        custom={i}
                        variants={descriptionItemVariants}
                        className="flex items-start gap-3 text-slate-400 group-hover:text-slate-300 transition-colors duration-300"
                      >
                        <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0 opacity-40 group-hover:opacity-100", styles.dot)} />
                        <span className="text-sm leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
