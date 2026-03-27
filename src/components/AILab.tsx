import React from "react";
import { Brain, Cpu, Zap, Activity, Terminal, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProjects } from "@/data/projectsData";
import { ScrollAnimation } from "./ui/ScrollAnimation";
import { cn } from "@/lib/utils";

export function AILab() {
  const { lang } = useLanguage();
  const allProjects = getProjects(lang);
  
  // Filter for AI-related projects
  const aiProjects = allProjects.filter(p => 
    ["IA & ML", "Automatisation"].includes(p.category) && !p.locked
  );

  return (
    <section id="ai-lab" className="py-24 bg-slate-950 border-y border-white/5 relative">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Brain className="w-3 h-3" />
                {lang("Innovation IA", "AI Innovation")}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                {lang("Laboratoire", "AI")} <span className="text-emerald-500">IA & ML</span>
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-4 text-emerald-500/50 font-mono text-sm">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>PROCESSING_DATA</span>
              </div>
              <div className="w-24 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 animate-[progress_2s_ease-in-out_infinite]" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aiProjects.map((project, index) => (
            <ScrollAnimation key={project.id} animation={index % 2 === 0 ? "fade-right" : "fade-left"}>
              <div className="relative group">
                {/* Border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative bg-slate-900/80 border border-white/10 rounded-3xl p-6 md:p-8 h-full flex flex-col">
                  {/* Header: Terminal Style */}
                  <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Cpu className="w-5 h-5 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight">{project.title}</h3>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/20" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* AI Metadata */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase mb-1">
                        <Terminal className="w-3 h-3" />
                        {lang("Modèle", "Model")}
                      </div>
                      <div className="text-white text-xs font-mono truncate">{project.ai_model || "N/A"}</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="flex items-center gap-2 text-blue-400 text-[10px] font-bold uppercase mb-1">
                        <Zap className="w-3 h-3" />
                        {lang("Impact", "Impact")}
                      </div>
                      <div className="text-white text-xs font-mono">{project.automation_benefit || "N/A"}</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-emerald-500/5 text-emerald-500/70 border border-emerald-500/10 rounded text-[10px] font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Global Stats Banner */}
        <ScrollAnimation delay={200}>
          <div className="mt-16 p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex flex-wrap justify-center gap-12 text-center">
            <div className="space-y-1">
              <div className="text-3xl font-black text-emerald-500">99.9%</div>
              <div className="text-[10px] text-emerald-500/50 uppercase font-bold tracking-widest">{lang("Précision", "Accuracy")}</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-emerald-500">-40%</div>
              <div className="text-[10px] text-emerald-500/50 uppercase font-bold tracking-widest">{lang("Temps Manuel", "Manual Time")}</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-emerald-500">24/7</div>
              <div className="text-[10px] text-emerald-500/50 uppercase font-bold tracking-widest">{lang("Automation", "Automation")}</div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
      
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
