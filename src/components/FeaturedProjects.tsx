import { useState } from "react";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Lock,
  Sparkles,
  Cpu,
  Zap,
  Globe,
  Layout,
  ShieldCheck,
  GraduationCap,
  FileText,
  Monitor,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Types
interface TechItem {
  name: string;
  icon?: string;
  color?: string;
}

interface FeaturedProjectData {
  id: number;
  title: string;
  title_fr?: string;
  title_en?: string;
  category: string;
  category_fr?: string;
  category_en?: string;
  description: string;
  description_fr?: string;
  description_en?: string;
  image: string;
  images?: string[];
  tags?: string[];
  techStack?: string[];
  frontendTech?: TechItem[];
  backendTech?: TechItem[];
  projectUrl?: string;
  repoUrl?: string;
  locked?: boolean;
  capabilities?: { icon: React.ElementType; label: string }[];
}

// Featured Projects Data
const getFeaturedProjects = (lang: (fr: string, en: string) => string): FeaturedProjectData[] => [
  {
    id: 1,
    title: "AfriEnhance AI",
    category: "Full-Stack",
    description: lang(
      "Plateforme de retouche d'image IA avec 4 modes spécialisés : Restauration, Génération, Portrait et Document.",
      "AI image editing platform with 4 specialized modes: Restoration, Generation, Portrait and Document."
    ),
    image: "/design/AfriEnhance AI/AfriEnhance AI_1.PNG",
    images: [
      "/design/AfriEnhance AI/AfriEnhance AI_1.PNG",
      "/design/AfriEnhance AI/AfriEnhance AI_2.PNG",
    ],
    tags: ["React", "TypeScript", "Gemini AI", "Tailwind"],
    techStack: ["React 18", "TypeScript", "Tailwind CSS", "Gemini 2.5 Flash", "Vite", "PWA"],
    frontendTech: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "TypeScript", icon: "📘", color: "#3178C6" },
      { name: "Tailwind", icon: "🎨", color: "#06B6D4" },
      { name: "Framer", icon: "✨", color: "#FF0055" },
    ],
    backendTech: [
      { name: "Vite", icon: "⚡", color: "#646CFF" },
      { name: "Gemini AI", icon: "🤖", color: "#10A37F" },
      { name: "PWA", icon: "📱", color: "#5A0FC8" },
    ],
    projectUrl: "https://afri-enhance.netlify.app/",
    capabilities: [
      { icon: Sparkles, label: "AI Powered" },
      { icon: Cpu, label: "4 Modes" },
      { icon: Zap, label: "Real-time" },
    ],
  },
  {
    id: 2,
    title: "Portfolio.OS",
    category: "Portfolio",
    description: lang(
      "Système d'exploitation du portfolio. 10+ thèmes, interface next-gen avec animations fluides.",
      "Portfolio operating system. 10+ themes, next-gen interface with smooth animations."
    ),
    image: "/design/Portfolio.Os/P1.PNG",
    images: [
      "/design/Portfolio.Os/P1.PNG",
      "/design/Portfolio.Os/P2.PNG",
      "/design/Portfolio.Os/P3.PNG",
      "/design/Portfolio.Os/P4.PNG",
      "/design/Portfolio.Os/P5.PNG",
      "/design/Portfolio.Os/P6.PNG",
    ],
    tags: ["React 19", "TypeScript", "Tailwind", "Motion"],
    techStack: ["React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Vite"],
    frontendTech: [
      { name: "React 19", icon: "⚛️", color: "#61DAFB" },
      { name: "TypeScript", icon: "📘", color: "#3178C6" },
      { name: "Tailwind", icon: "🎨", color: "#06B6D4" },
    ],
    backendTech: [
      { name: "Vite", icon: "⚡", color: "#646CFF" },
      { name: "Motion", icon: "✨", color: "#FF0055" },
    ],
    projectUrl: "https://portefolio-os.netlify.app/",
    repoUrl: "https://github.com/T0b0i7/Portefolio.OS",
    capabilities: [
      { icon: Sparkles, label: "10+ Themes" },
      { icon: Globe, label: "Multi-lang" },
      { icon: Zap, label: "Optimized" },
    ],
  },
  {
    id: 3,
    title: lang("SIAB Automation", "SIAB Automation"),
    category: "Automatisation",
    description: lang(
      "Système d'automatisation ferroviaire. Optimisation des flux et réduction de 30% du temps de traitement.",
      "Railway automation system. Flow optimization and 30% reduction in processing time."
    ),
    image: "/design/siab.png",
    tags: ["Node.js", "SQL Server", "HTML", "Automation"],
    techStack: ["Node.js", "SQL Server", "HTML", "CSS", "PHP", "Automation"],
    frontendTech: [
      { name: "HTML", icon: "📄", color: "#E34F26" },
      { name: "CSS", icon: "🎨", color: "#1572B6" },
      { name: "PHP", icon: "🐘", color: "#777BB4" },
    ],
    backendTech: [
      { name: "Node.js", icon: "🟢", color: "#339933" },
      { name: "SQL Server", icon: "🗄️", color: "#CC2927" },
    ],
    locked: true,
    capabilities: [
      { icon: Cpu, label: "Automated" },
      { icon: Zap, label: "-30% Time" },
      { icon: Lock, label: "Confidential" },
    ],
  },
  {
    id: 4,
    title: "CREACOM",
    category: "Design",
    description: lang(
      "Portfolio professionnel pour une experte en communication visuelle et branding.",
      "Professional portfolio for a visual communication and branding expert."
    ),
    image: "/design/CREACOM.PNG",
    tags: ["React", "TypeScript", "Tailwind", "Design"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    frontendTech: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "TypeScript", icon: "📘", color: "#3178C6" },
      { name: "Tailwind", icon: "🎨", color: "#06B6D4" },
    ],
    backendTech: [
      { name: "Motion", icon: "✨", color: "#FF0055" },
    ],
    projectUrl: "https://grace-branco-portfolio.netlify.app/",
    capabilities: [
      { icon: Sparkles, label: "Branding" },
      { icon: Globe, label: "Portfolio" },
      { icon: Zap, label: "Modern" },
    ],
  },
  {
    id: 5,
    title: "Afrimemorie",
    category: "Web Design",
    description: lang(
      "Préservation de l'héritage culturel africain. Mémoire de nos noms, voix de nos peuples.",
      "Preservation of African cultural heritage. Memory of our names, voice of our peoples."
    ),
    image: "/design/Afrimemorie.PNG",
    tags: ["React", "Node.js", "MongoDB"],
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    frontendTech: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "Node.js", icon: "🟢", color: "#339933" },
    ],
    backendTech: [
      { name: "MongoDB", icon: "🍃", color: "#47A248" },
      { name: "Express", icon: "🚂", color: "#000000" },
    ],
    projectUrl: "https://afri-memory.netlify.app/",
    capabilities: [
      { icon: Globe, label: "Culture" },
      { icon: Sparkles, label: "Heritage" },
      { icon: Zap, label: "Modern" },
    ],
  },
  {
    id: 6,
    title: "Communio",
    category: "Full-Stack",
    description: lang(
      "Application communautaire chrétienne avec géolocalisation des paroisses et Bible interactive.",
      "Christian community application with parish geolocation and interactive Bible."
    ),
    image: "/design/communio.PNG",
    tags: ["TypeScript", "React", "Node.js"],
    techStack: ["TypeScript", "React", "Node.js", "React Native"],
    frontendTech: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "TypeScript", icon: "📘", color: "#3178C6" },
      { name: "Native", icon: "📱", color: "#5A0FC8" },
    ],
    backendTech: [
      { name: "Node.js", icon: "🟢", color: "#339933" },
    ],
    projectUrl: "https://communio-christian.netlify.app/",
    capabilities: [
      { icon: Globe, label: "Geolocation" },
      { icon: Sparkles, label: "Community" },
      { icon: Zap, label: "Interactive" },
    ],
  },
  {
    id: 7,
    title: "Imona",
    category: "Full-Stack",
    description: lang(
      "Application béninoise de gestion locative simplifiée pour propriétaires. Gestion transparente et automatisée des biens.",
      "Simplified Beninese rental management app for property owners. Transparent and automated property management."
    ),
    image: "/design/Imona/I1.PNG",
    images: [
      "/design/Imona/I1.PNG",
      "/design/Imona/I2.PNG",
      "/design/Imona/I3.PNG",
      "/design/Imona/I4.PNG",
      "/design/Imona/I5.PNG",
      "/design/Imona/I6.PNG",
      "/design/Imona/I7.PNG",
    ],
    tags: ["Laravel", "TypeScript", "PHP", "Blade", "Docker"],
    techStack: ["Laravel", "TypeScript", "PHP", "Blade", "CSS", "Dockerfile", "HTML"],
    frontendTech: [
      { name: "Blade", icon: "🔪", color: "#FF2D20" },
      { name: "TypeScript", icon: "📘", color: "#3178C6" },
      { name: "CSS", icon: "🎨", color: "#1572B6" },
    ],
    backendTech: [
      { name: "Laravel", icon: "🟥", color: "#FF2D20" },
      { name: "PHP", icon: "🐘", color: "#777BB4" },
      { name: "Docker", icon: "🐳", color: "#2496ED" },
    ],
    projectUrl: "https://imona.app/",
    capabilities: [
      { icon: Layout, label: "Dashboard" },
      { icon: ShieldCheck, label: "Secure" },
      { icon: Zap, label: "Optimized" },
    ],
  },
  {
    id: 8,
    title: "IPPh",
    category: "Full-Stack",
    description: lang(
      "Plateforme web pour l'Institut Polytechnique Paul Hazoumé. Site vitrine + back-office complet.",
      "Web platform for Institut Polytechnique Paul Hazoumé. Showcase site + complete back-office."
    ),
    image: "/design/IUUP/1.PNG",
    images: [
      "/design/IUUP/1.PNG",
      "/design/IUUP/2.PNG",
      "/design/IUUP/3.PNG",
      "/design/IUUP/4.PNG",
    ],
    tags: ["TypeScript", "PHP", "Blade", "CSS", "Docker"],
    techStack: ["TypeScript", "PHP", "Blade", "CSS", "Dockerfile", "HTML"],
    frontendTech: [
      { name: "Blade", icon: "🔪", color: "#FF2D20" },
      { name: "TypeScript", icon: "📘", color: "#3178C6" },
      { name: "CSS", icon: "🎨", color: "#1572B6" },
    ],
    backendTech: [
      { name: "PHP", icon: "🐘", color: "#777BB4" },
      { name: "Docker", icon: "🐳", color: "#2496ED" },
    ],
    projectUrl: "https://ip-ph.netlify.app/",
    capabilities: [
      { icon: GraduationCap, label: "Academic" },
      { icon: FileText, label: "CMS" },
      { icon: Monitor, label: "Showcase" },
    ],
  },
];

// Tech Icon Component
const TechIcon = ({ tech }: { tech: TechItem }) => (
  <div className="flex flex-col items-center gap-1 group cursor-default">
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg
        bg-white/5 border border-white/10 group-hover:border-white/20 
        group-hover:bg-white/10 transition-all duration-300"
      style={{ boxShadow: `0 0 15px ${tech.color}15` }}
    >
      <span className="group-hover:scale-110 transition-transform duration-300">
        {tech.icon}
      </span>
    </div>
    <span className="text-[9px] font-sans font-medium text-stone-gray group-hover:text-ivory/80 transition-colors">
      {tech.name}
    </span>
  </div>
);

// Tech Dock Component
const TechDock = ({ title, items }: { title: string; items: TechItem[] }) => (
  <div className="flex flex-col items-start gap-2">
    <span className="text-[9px] uppercase tracking-[0.15em] text-stone-gray font-medium">
      {title}
    </span>
    <div className="flex items-center gap-2">
      {items.map((tech, i) => (
        <TechIcon key={i} tech={tech} />
      ))}
    </div>
  </div>
);

// Project Card Component
const ProjectCard = ({
  project,
  onOpen,
  index,
}: {
  project: FeaturedProjectData;
  onOpen: (project: FeaturedProjectData) => void;
  index: number;
}) => {
  const { lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={() => onOpen(project)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-warm-sand/5">
        <motion.img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Category Badge */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="absolute top-3 left-3 px-3 py-1 bg-near-black/60 backdrop-blur-md rounded-full text-[9px] font-sans font-bold uppercase tracking-widest text-ivory border border-white/10"
        >
          {project.category}
        </motion.div>

        {/* Locked Badge */}
        {project.locked && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-red-500/60 backdrop-blur-md rounded-full text-[9px] font-sans font-bold uppercase tracking-widest text-white border border-white/10 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            {lang("Privé", "Private")}
          </div>
        )}

        {/* CTA on hover - Desktop only */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            initial={false}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 bg-terracotta rounded-full text-white text-sm font-medium flex items-center gap-2 shadow-lg shadow-terracotta/20"
          >
            <ArrowUpRight className="w-4 h-4" />
            {lang("Voir détails", "View details")}
          </motion.div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-serif font-medium text-ivory mb-1 group-hover:text-terracotta transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-stone-gray line-clamp-2 group-hover:text-ivory/70 transition-colors duration-300 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Tags Row - Always visible */}
      <div className="flex flex-wrap gap-1.5 mt-3 px-1">
        {project.tags?.slice(0, 4).map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.4 + i * 0.05 }}
            className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/8 text-[9px] sm:text-[10px] font-sans font-medium text-stone-gray"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Capabilities Bar */}
      {project.capabilities && (
        <div className="flex gap-2 mt-3 px-1">
          {project.capabilities.slice(0, 3).map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.5 + i * 0.08, type: "spring", stiffness: 300 }}
              className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/[0.03] border border-white/8"
            >
              <cap.icon className="w-3 h-3 text-terracotta" />
              <span className="text-[8px] font-sans font-medium uppercase tracking-wider text-stone-gray">
                {cap.label}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// Project Modal Component
const ProjectModal = ({
  project,
  isOpen,
  onClose,
}: {
  project: FeaturedProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const [activeIndex, setActiveIndex] = useState(0);

  if (!project) return null;

  const images = project.images || [project.image];
  const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleVisit = (e: React.MouseEvent) => {
    if (project.locked) {
      e.preventDefault();
      toast({
        title: lang("Projet Privé", "Private Project"),
        description: lang(
          "Ce projet est confidentiel. Contactez-moi pour plus d'informations.",
          "This project is confidential. Contact me for more information."
        ),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 border-white/10 bg-near-black overflow-hidden max-h-[90vh]">
        <div className="flex flex-col h-full">
          {/* Sticky Header */}
          <div className="shrink-0 border-b border-white/10 bg-near-black/95 backdrop-blur-sm px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <h4 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-ivory tracking-tight truncate">
                  {project.title}
                </h4>
                <span className="hidden sm:inline shrink-0 text-[9px] sm:text-[10px] uppercase tracking-widest text-stone-gray border border-white/10 rounded-full px-2 sm:px-3 py-1">
                  {project.category}
                </span>
              </div>
              <div className="shrink-0 flex items-center gap-2 sm:gap-3">
                {project.repoUrl && !project.locked && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-stone-gray hover:text-terracotta transition-colors flex items-center gap-1"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{lang("Source", "Source")}</span>
                  </a>
                )}
                <a
                  href={project.projectUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleVisit}
                  className={cn(
                    "group flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors",
                    project.locked
                      ? "bg-stone-gray/50 text-ivory/50 cursor-not-allowed"
                      : "bg-terracotta text-white hover:bg-terracotta/80"
                  )}
                >
                  {project.locked ? (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{lang("Privé", "Private")}</span>
                    </>
                  ) : (
                    <>
                      {lang("Visiter", "Visit")}
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </a>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="flex-1">
            {/* Hidden title for accessibility */}
            <DialogTitle className="sr-only">{project.title} - {project.category}</DialogTitle>
            <DialogDescription className="sr-only">
              {project.description}
            </DialogDescription>
            <div className="px-4 sm:px-6 py-6">
              {/* Tech Stack */}
              {(project.frontendTech || project.backendTech) && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-8"
                >
                  {project.frontendTech && (
                    <TechDock title={lang("Frontend", "Frontend")} items={project.frontendTech} />
                  )}
                  {project.backendTech && (
                    <TechDock title={lang("Backend", "Backend")} items={project.backendTech} />
                  )}
                </motion.div>
              )}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

              {/* Gallery */}
              {images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="relative group">
                    <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-warm-sand/5 shadow-2xl">
                      <AnimatePresence mode="sync">
                        <motion.img
                          key={activeIndex}
                          src={images[activeIndex]}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0 w-full h-full object-cover"
                          alt={`Screenshot ${activeIndex + 1}`}
                        />
                      </AnimatePresence>

                      {/* Controls */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-near-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-terracotta transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-near-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-terracotta transition-colors"
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </>
                      )}

                      {/* Badge */}
                      {images.length > 1 && (
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 sm:py-1.5 bg-near-black/70 backdrop-blur-md rounded-full text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-widest text-white border border-white/10">
                          {activeIndex + 1} / {images.length}
                        </div>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                      <div className="mt-3 sm:mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={cn(
                              "relative flex-shrink-0 w-16 sm:w-20 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all",
                              activeIndex === idx
                                ? "border-terracotta shadow-lg"
                                : "border-transparent opacity-50 hover:opacity-80"
                            )}
                          >
                            <img src={img} className="w-full h-full object-cover" alt="" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Description & Tags */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-sm sm:text-base text-ivory/80 leading-relaxed mb-6">
                  {project.description}
                </p>

                {project.tags && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-sans font-medium text-ivory/90 hover:bg-white/10 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Capabilities */}
              {project.capabilities && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  {project.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <cap.icon className="w-4 h-4 text-terracotta" />
                      <span className="text-xs font-sans font-medium uppercase tracking-wider text-stone-gray">
                        {cap.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main Component
export function FeaturedProjects() {
  const { lang } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<FeaturedProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const projects = getFeaturedProjects(lang);
  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const currentProjects = projects.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const paginate = (newPage: number) => {
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
  };

  const handleOpenProject = (project: FeaturedProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-near-black text-ivory overflow-hidden relative">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Terracotta glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-8 mb-6 sm:mb-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-terracotta" />
              <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-stone-gray font-bold">
                {lang("Projets Vedettes", "Featured Projects")}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight text-white"
            >
              {lang("Sélection de", "Selected")}{" "}
              <span className="text-terracotta">{lang("Travaux", "Works")}</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start sm:items-end gap-3"
          >
            <p className="text-sm sm:text-base text-stone-gray font-sans leading-relaxed max-w-md">
              {lang(
                "Une collection de projets reflétant mon expertise en développement full-stack et IA.",
                "A collection of projects reflecting my expertise in full-stack development and AI."
              )}
            </p>
            {/* Project counter */}
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-terracotta/60">
              {projects.length} {lang("projets", "projects")}
            </span>
          </motion.div>
        </div>

        {/* Gradient divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10 sm:mb-14" />

        {/* Paginated Grid with animated transitions */}
        <div className="relative min-h-[420px] sm:min-h-[480px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.25 },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {currentProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={handleOpenProject}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-6 mt-12 sm:mt-16"
        >
          {/* Previous Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className={cn(
              "w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300",
              currentPage === 0
                ? "border-white/5 text-white/15 cursor-not-allowed"
                : "border-white/15 text-ivory hover:border-terracotta hover:text-terracotta hover:bg-terracotta/5"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => paginate(i)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.85 }}
                className="relative p-1"
              >
                <motion.div
                  animate={{
                    width: currentPage === i ? 32 : 8,
                    backgroundColor: currentPage === i ? "rgb(201, 100, 66)" : "rgba(255,255,255,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className="h-2 rounded-full"
                />
                {/* Active glow */}
                {currentPage === i && (
                  <motion.div
                    layoutId="pageGlow"
                    className="absolute inset-0 rounded-full bg-terracotta/20 blur-md -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Next Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            className={cn(
              "w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300",
              currentPage === totalPages - 1
                ? "border-white/5 text-white/15 cursor-not-allowed"
                : "border-white/15 text-ivory hover:border-terracotta hover:text-terracotta hover:bg-terracotta/5"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Progress bar */}
        <div className="mt-6 max-w-xs mx-auto">
          <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full bg-gradient-to-r from-terracotta/60 to-terracotta rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-stone-gray/40">
              {String(currentPage + 1).padStart(2, '0')}
            </span>
            <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-stone-gray/40">
              {String(totalPages).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
