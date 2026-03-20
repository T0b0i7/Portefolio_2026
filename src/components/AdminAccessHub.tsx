import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Terminal, Settings, Database, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminAccessHub() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/CTRL + SHIFT + M (Management)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'm') {
        navigate("/dashboard");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="fixed bottom-8 left-8 z-[9999] group flex flex-col items-start gap-4">
      {/* Tooltip */}
      <div className={cn(
        "bg-slate-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl transition-all duration-500 origin-bottom-left",
        isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-10 pointer-events-none"
      )}>
         <div className="text-[10px] font-black text-brand-accent uppercase tracking-widest mb-2 flex items-center gap-2">
            <Database size={12} /> Management Engine 
         </div>
         <div className="space-y-3">
            <button 
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-3 w-full p-2 hover:bg-white/5 rounded-xl transition-colors group/btn"
            >
               <Terminal size={14} className="text-slate-400 group-hover/btn:text-white" />
               <span className="text-xs font-bold text-slate-300 group-hover/btn:text-white">DASHBOARD</span>
               <span className="ml-auto text-[8px] font-mono text-slate-600 bg-white/5 px-1.5 py-0.5 rounded">CTRL+SHIFT+M</span>
            </button>
            <button 
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-3 w-full p-2 hover:bg-white/5 rounded-xl transition-colors group/btn"
            >
               <Brain size={14} className="text-slate-400 group-hover/btn:text-white" />
               <span className="text-xs font-bold text-slate-300 group-hover/btn:text-white">AI COPILOT</span>
            </button>
         </div>
      </div>

      {/* Main Trigger Button */}
      <button 
        onClick={() => setIsVisible(!isVisible)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
          isVisible 
            ? "bg-brand-accent text-white rotate-90 shadow-[0_0_30px_rgba(59,130,246,0.5)]" 
            : "bg-slate-900/50 backdrop-blur-md border border-white/10 text-slate-400 hover:text-white hover:border-brand-accent/50 hover:bg-slate-900"
        )}
      >
         <Settings size={20} className={cn("transition-transform duration-700", isVisible ? "rotate-180" : "group-hover:rotate-45")} />
      </button>

      {/* Hover indicator */}
      {!isVisible && showTooltip && (
         <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-slate-900 px-3 py-1.5 rounded-lg border border-white/10 shadow-xl pointer-events-none animate-in fade-in slide-in-from-left-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-white">Admin Hub</span>
         </div>
      )}
    </div>
  );
}
