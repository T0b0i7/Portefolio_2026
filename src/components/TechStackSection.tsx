import { useRef, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, Search } from "lucide-react";

interface TechItem {
  name: string;
  icon: string;
  displayName: string;
}

const allTech: TechItem[] = [
  // Row 1 (12)
  { name: "Python", icon: "python", displayName: "Python" },
  { name: "JavaScript", icon: "javascript", displayName: "JS" },
  { name: "TypeScript", icon: "typescript", displayName: "TS" },
  { name: "C", icon: "c", displayName: "C" },
  { name: "C++", icon: "cplusplus", displayName: "C++" },
  { name: "Kotlin", icon: "kotlin", displayName: "Kotlin" },
  { name: "HTML5", icon: "html5", displayName: "HTML" },
  { name: "CSS3", icon: "/design/Tech/css.png", displayName: "CSS" },
  { name: "Flask", icon: "flask", displayName: "Flask" },
  { name: "React", icon: "react", displayName: "React" },
  { name: "Next.js", icon: "nextdotjs", displayName: "Next" },
  { name: "Bootstrap", icon: "bootstrap", displayName: "B-strap" },
  
  // Row 2 (10)
  { name: "Node.js", icon: "nodedotjs", displayName: "Node" },
  { name: "Django", icon: "django", displayName: "Django" },
  { name: "FastAPI", icon: "fastapi", displayName: "FastAPI" },
  { name: "TensorFlow", icon: "tensorflow", displayName: "Tensor" },
  { name: "PyTorch", icon: "pytorch", displayName: "Torch" },
  { name: "Scikit-learn", icon: "scikitlearn", displayName: "SK-Learn" },
  { name: "OpenCV", icon: "opencv", displayName: "OpenCV" },
  { name: "NumPy", icon: "numpy", displayName: "NumPy" },
  { name: "Tailwind CSS", icon: "tailwindcss", displayName: "Tailwind" },
  { name: "Pandas", icon: "pandas", displayName: "Pandas" },

  // Row 3 (8)
  { name: "MySQL", icon: "mysql", displayName: "MySQL" },
  { name: "PostgreSQL", icon: "postgresql", displayName: "Postgres" },
  { name: "MongoDB", icon: "mongodb", displayName: "Mongo" },
  { name: "Firebase", icon: "firebase", displayName: "Firebase" },
  { name: "Redis", icon: "redis", displayName: "Redis" },
  { name: "Docker", icon: "docker", displayName: "Docker" },
  { name: "Git", icon: "git", displayName: "Git" },
  { name: "GitHub", icon: "github", displayName: "GitHub" },

  // Row 4 (5)
  { name: "Linux", icon: "linux", displayName: "Linux" },
  { name: "VS Code", icon: "/design/Tech/vs.png", displayName: "VS Code" },
  { name: "Vercel", icon: "vercel", displayName: "Vercel" },
  { name: "Jupyter", icon: "jupyter", displayName: "Jupyter" },
  { name: "Figma", icon: "figma", displayName: "Figma" },

  // Row 5 (2)
  { name: "Postman", icon: "postman", displayName: "Postman" },
  { name: "Microsoft Office", icon: "/design/Tech/ofice.png", displayName: "Office" },
];

const Key = ({ tech, isMatch, activeKey, setActiveKey }: {
  tech: TechItem,
  isMatch: boolean,
  activeKey: string | null,
  setActiveKey: (key: string | null) => void,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const isTooltipVisible = activeKey === tech.name;
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const iconSrc = useMemo(() => {
    if (tech.icon.startsWith('/')) return tech.icon;
    return `https://cdn.simpleicons.org/${tech.icon}/${isMatch ? 'cc785c' : '6c6a64'}`;
  }, [tech.icon, isMatch]);

  return (
    <motion.div
      layout
      className="relative group perspective-1000"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isMatch ? 1 : 0.1,
        scale: isMatch ? 1 : 0.95,
      }}
      whileHover={{ scale: isMatch ? 1.05 : 1 }}
      onMouseEnter={() => { if (isMatch) setActiveKey(tech.name); }}
      onMouseLeave={() => { setActiveKey(null); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={(e) => {
        e.stopPropagation();
        if (!isMatch) return;
        setIsPressed(true);
        setActiveKey(tech.name);
        if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
        touchTimerRef.current = setTimeout(() => {
          setActiveKey(null);
          setIsPressed(false);
        }, 1200);
      }}
      onTouchEnd={() => setIsPressed(false)}
    >
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: -44, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{ translateZ: "100px", transformStyle: "preserve-3d" }}
            className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="relative bg-terracotta text-white text-[10px] md:text-xs font-sans font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg shadow-terracotta/20">
              {tech.name}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-terracotta rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ 
          y: isPressed ? 4 : 0,
          rotateX: isPressed ? 10 : 0
        }}
        className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 transform-style-3d transition-transform duration-150"
      >
        <div className={`absolute inset-0 bg-[#1e1e1e] border-2 ${isTooltipVisible ? 'border-terracotta/70 bg-terracotta/5' : isMatch ? 'border-white/10' : 'border-white/5'} rounded-lg flex flex-col items-center justify-center gap-0.5 md:gap-1 shadow-[0_4px_0_0_#0a0a0a] transition-all duration-200 translate-z-2`}>
          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center">
            <img 
              src={iconSrc}
              alt={tech.name}
              className={`w-full h-full object-contain transition-all duration-200 ${isTooltipVisible ? 'scale-110' : ''} ${tech.icon.startsWith('/') && !isMatch ? 'grayscale opacity-50' : ''}`}
            />
          </div>
          <span className={`text-[6px] sm:text-[7px] md:text-[8px] font-sans font-bold uppercase tracking-wider transition-colors truncate w-full px-1 text-center ${isTooltipVisible ? 'text-terracotta' : 'text-stone-gray'}`}>
            {tech.displayName}
          </span>
        </div>
        <div className="absolute inset-0 bg-[#0a0a0a] rounded-lg translate-y-1 -z-10" />
      </motion.div>
    </motion.div>
  );
};



export function TechStackSection() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [25, 5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || window.innerWidth <= 768) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rows = [
    allTech.slice(0, 12),
    allTech.slice(12, 22),
    allTech.slice(22, 30),
    allTech.slice(30, 35),
    allTech.slice(35, 37),
  ];

  return (
    <div className="pt-32 pb-32 md:pt-48 md:pb-48 bg-near-black relative overflow-hidden min-h-screen flex flex-col items-center">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-terracotta/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-sans font-black uppercase tracking-[0.2em] text-terracotta mb-6"
          >
            <Sparkles className="w-3 h-3" />
            {lang("Expertise Technique", "Technical Expertise")}
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-serif font-medium text-ivory tracking-tight mb-8">
            {lang("Mon Arsenal", "My Arsenal")}
          </h2>

          <div className="max-w-md mx-auto relative group">
            <div className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-xl group-focus-within:border-terracotta/40 transition-all duration-300">
              <Search className="w-5 h-5 text-stone-gray mr-4 group-focus-within:text-terracotta" />
              <input 
                type="text"
                placeholder={lang("Rechercher une techno...", "Search tech...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-ivory font-sans text-base w-full placeholder:text-stone-gray/40"
              />
            </div>
          </div>
        </div>

        {/* 3D Keyboard Perspective Container */}
        <div 
          className="relative w-full flex justify-center px-2"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            ref={containerRef}
            style={{ 
              perspective: "2000px",
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            className="flex flex-col items-center gap-2 md:gap-4 p-4 md:p-12 bg-[#121212] border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] w-full max-w-fit"
          >
            {rows.map((row, rowIndex) => (
              <div 
                key={rowIndex} 
                className="flex flex-wrap justify-center items-center gap-1.5 md:gap-3"
                style={{ 
                  paddingLeft: typeof window !== 'undefined' && window.innerWidth > 768 ? `${rowIndex * 10}px` : '0px',
                  transform: "translateZ(20px)"
                }}
              >
                {row.map((tech) => (
                  <Key 
                    key={tech.name} 
                    tech={tech} 
                    isMatch={searchQuery === "" || tech.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || tech.name.toLowerCase().includes(searchQuery.toLowerCase())}
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                  />
                ))}
              </div>
            ))}

            {/* Spacebar Row */}
            <div className="flex items-center gap-2 md:gap-3 mt-4" style={{ transform: "translateZ(20px)" }}>
              <div className="hidden sm:block w-12 h-10 md:w-20 md:h-14 bg-[#1e1e1e] border border-white/10 rounded-lg shadow-[0_4px_0_0_#0a0a0a]" />
              <div className="w-40 h-10 md:w-80 md:h-14 bg-[#1e1e1e] border border-terracotta/20 rounded-lg shadow-[0_6px_0_0_#0a0a0a] flex items-center justify-center overflow-hidden group/space relative">
                 <motion.div 
                   animate={{ x: ["-100%", "100%"] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 bg-gradient-to-r from-transparent via-terracotta/10 to-transparent w-full h-full"
                 />
                 <span className="relative z-10 text-[7px] md:text-[10px] font-sans font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-stone-gray/40">Full-Stack Expertise</span>
              </div>
              <div className="hidden sm:block w-12 h-10 md:w-20 md:h-14 bg-[#1e1e1e] border border-white/10 rounded-lg shadow-[0_4px_0_0_#0a0a0a]" />
            </div>
          </motion.div>
        </div>

        <p className="mt-20 text-stone-gray text-xs font-sans tracking-widest uppercase text-center max-w-lg leading-relaxed opacity-50">
          {lang(
            "Chaque touche représente une brique de mon expertise, assemblée pour créer des expériences numériques sans compromis.",
            "Each key represents a brick of my expertise, assembled to create uncompromising digital experiences."
          )}
        </p>
      </div>
    </div>
  );
}
