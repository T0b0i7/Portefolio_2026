import { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Sparkles, X } from "lucide-react";

interface TechItem {
  name: string;
  icon: string;
  displayName: string;
}

const allTech: TechItem[] = [
  // Row 1 (12)
  { name: "Python", icon: "python", displayName: "Python" },
  { name: "JavaScript", icon: "javascript", displayName: "JavaScript" },
  { name: "TypeScript", icon: "typescript", displayName: "TypeScript" },
  { name: "C", icon: "c", displayName: "C" },
  { name: "C++", icon: "cplusplus", displayName: "C++" },
  { name: "Kotlin", icon: "kotlin", displayName: "Kotlin" },
  { name: "HTML5", icon: "html5", displayName: "HTML" },
  { name: "CSS3", icon: "/design/Tech/css.png", displayName: "CSS" },
  { name: "Flask", icon: "flask", displayName: "Flask" },
  { name: "React", icon: "react", displayName: "React" },
  { name: "Next.js", icon: "nextdotjs", displayName: "Next.js" },
  { name: "Bootstrap", icon: "bootstrap", displayName: "Bootstrap" },
  
  // Row 2 (10)
  { name: "Node.js", icon: "nodedotjs", displayName: "Node.js" },
  { name: "Django", icon: "django", displayName: "Django" },
  { name: "FastAPI", icon: "fastapi", displayName: "FastAPI" },
  { name: "TensorFlow", icon: "tensorflow", displayName: "TensorFlow" },
  { name: "PyTorch", icon: "pytorch", displayName: "PyTorch" },
  { name: "Scikit-learn", icon: "scikitlearn", displayName: "Scikit-learn" },
  { name: "OpenCV", icon: "opencv", displayName: "OpenCV" },
  { name: "NumPy", icon: "numpy", displayName: "NumPy" },
  { name: "Tailwind CSS", icon: "tailwindcss", displayName: "Tailwind" },
  { name: "Pandas", icon: "pandas", displayName: "Pandas" },

  // Row 3 (8)
  { name: "MySQL", icon: "mysql", displayName: "MySQL" },
  { name: "PostgreSQL", icon: "postgresql", displayName: "PostgreSQL" },
  { name: "MongoDB", icon: "mongodb", displayName: "MongoDB" },
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

export function TechStackSection() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  
  const rows = [
    allTech.slice(0, 12),
    allTech.slice(12, 22),
    allTech.slice(22, 30),
    allTech.slice(30, 35),
    allTech.slice(35, 37),
  ];

  return (
    <div className="pt-32 pb-32 md:pt-48 md:pb-48 bg-near-black relative overflow-hidden min-h-screen flex flex-col items-center">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(201,100,66,0.05)_0%,transparent_50%)]"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-sans font-black uppercase tracking-[0.2em] text-terracotta mb-4"
          >
            <Sparkles className="w-3 h-3" />
            {lang("L'Arsenal Invisible", "The Invisible Arsenal")}
          </motion.div>
          <h2 className="text-3xl md:text-6xl font-serif font-medium text-ivory tracking-tight mb-8">
            {lang("Expertise Technique", "Technical Expertise")}
          </h2>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative group">
            <div className="relative flex items-center bg-ivory/[0.02] border border-white/10 rounded-xl px-5 py-3 backdrop-blur-xl group-focus-within:border-terracotta/40 transition-all duration-300">
              <Search className="w-4 h-4 text-stone-gray mr-3 group-focus-within:text-terracotta" />
              <input 
                type="text"
                placeholder={lang("Rechercher...", "Search...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-ivory font-sans text-sm w-full placeholder:text-stone-gray/40"
              />
            </div>
          </div>
        </div>

        {/* The Inverted Pyramid */}
        <div className="flex flex-col items-center gap-3 md:gap-4">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-center gap-2 md:gap-3">
              {row.map((tech) => {
                const isMatch = tech.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                tech.name.toLowerCase().includes(searchQuery.toLowerCase());
                return (
                  <motion.div
                    key={tech.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: isMatch || searchQuery === "" ? 1 : 0.1,
                      scale: isMatch || searchQuery === "" ? 1 : 0.95,
                    }}
                    whileHover={(isMatch || searchQuery === "") ? { 
                      scale: 1.05, 
                      y: -5,
                      backgroundColor: "rgba(255, 255, 255, 0.05)"
                    } : {}}
                    className={`flex flex-col items-center justify-center gap-2 p-2 md:p-4 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 backdrop-blur-sm min-w-[75px] md:min-w-[100px] aspect-square group ${
                      isMatch && searchQuery !== "" ? "border-terracotta/40 bg-terracotta/5" : ""
                    }`}
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center relative">
                      <img 
                        src={tech.icon.startsWith('/') ? tech.icon : `https://cdn.simpleicons.org/${tech.icon}`} 
                        alt={tech.name} 
                        className="w-full h-full object-contain relative z-10 transition-all group-hover:scale-110"
                        onLoad={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          if (!target.src.includes('color=') && !target.src.startsWith('/')) {
                             target.src = `https://cdn.simpleicons.org/${tech.name.toLowerCase().replace(/\s+/g, '')}`;
                          }
                        }}
                      />
                    </div>
                    <span className={`text-[8px] md:text-[9px] font-sans font-bold uppercase tracking-wider text-center transition-colors ${
                      isMatch && searchQuery !== "" ? "text-ivory" : "text-stone-gray group-hover:text-ivory"
                    }`}>
                      {tech.displayName}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
