import { useState, useEffect, useRef } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  AreaChart, Area, LineChart, Line, PieChart, Pie, Cell 
} from "recharts";
import { 
  Users, Eye, MousePointer2, Target, 
  Terminal, Globe, Cpu, Layout, 
  Briefcase, Mail, ChevronRight, 
  TrendingUp, Activity, Bell, Settings,
  LogOut, Plus, Search, Filter,
  ExternalLink, Trash2, Edit3, Save, X,
  ShieldCheck, Brain, Sparkles, Database,
  MessageSquare, Send, Bot, Zap,
  Smartphone, Monitor, Tablet, Map,
  Menu, ChevronLeft, Lock, Unlock
} from "lucide-react";
import dayjs from "dayjs";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProjects } from "@/data/projectsData";
import { Project } from "@/types/project";
import { useTechNews } from "@/hooks/useTechNews";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Real-world dashboard components
const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="glass-card p-4 md:p-6 border border-white/10 rounded-3xl group hover:border-brand-accent/50 transition-all duration-500 hover:translate-y-[-4px]">
    <div className="flex justify-between items-start mb-4">
      <div className={cn("p-2.5 md:p-3 rounded-2xl", color)}>
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </div>
      {trend && (
        <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full", trend > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400")}>
          {trend > 0 ? "+" : ""}{trend}%
        </span>
      )}
    </div>
    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-medium">{title}</div>
  </div>
);

export default function Dashboard() {
  const { lang, language, toggleLanguage } = useLanguage();
  const { news, loading: newsLoading } = useTechNews();
  const [activeView, setActiveView] = useState<"overview" | "projects" | "analytics" | "logs" | "copilot">("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

  // Real stats state
  const [stats, setStats] = useState({
    uniqueVisitors: 0,
    totalEvents: 0,
    conversion: 0,
    bounceRate: 15.2,
    deviceBreakdown: { Desktop: 0, Mobile: 0 },
    geography: [] as { name: string, val: number, color: string }[]
  });
  
  const [chartData, setChartData] = useState<any[]>([]);
  const [projectsList, setProjectsList] = useState(getProjects(lang));
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [topProjects, setTopProjects] = useState<any[]>([]);
  
  // Chat Co-pilot
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', content: "Connecté à l'IA d'exploitation Portfolio.OS. Je suis prêt à analyser vos métadonnées." }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Project Edits
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    // Check session storage for auth
    const auth = sessionStorage.getItem("dashboard_auth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchDashboardData();
    
    // Real-time listener
    const channel = supabase
      .channel('dashboard-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visitor_events' }, (payload) => {
        setRecentLogs(prev => [payload.new, ...prev].slice(0, 50));
        updateStatsInRealtime(payload.new);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [language, isAuthenticated]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    // Default password for the user
    if (passwordInput === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("dashboard_auth", "true");
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const { data: allEvents, count: total } = await supabase.from("visitor_events").select("*");
      if (!allEvents) return;

      const sessionSet = new Set(allEvents.map(e => e.session_id));
      const uniqueVisits = sessionSet.size;
      const conversions = allEvents.filter(e => e.event_name === "contact-form-submit").length;
      
      const deviceMap: Record<string, number> = { Desktop: 0, Mobile: 0 };
      const countryMap: Record<string, number> = {};

      allEvents.forEach(e => {
        if (e.metadata?.device) deviceMap[e.metadata.device as keyof typeof deviceMap]++;
        if (e.metadata?.country) {
          countryMap[e.metadata.country] = (countryMap[e.metadata.country] || 0) + 1;
        }
      });

      const formattedGeo = Object.entries(countryMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([name, val], i) => ({
          name,
          val: Math.round((val / allEvents.length) * 100),
          color: ["bg-blue-500", "bg-emerald-500", "bg-red-500", "bg-purple-500"][i] || "bg-slate-500"
        }));

      setStats({
        uniqueVisitors: uniqueVisits,
        totalEvents: total ?? allEvents.length,
        conversion: uniqueVisits > 0 ? Math.round((conversions / uniqueVisits) * 100) : 0,
        bounceRate: 15.2,
        deviceBreakdown: deviceMap as any,
        geography: formattedGeo
      });

      const sevenDaysAgo = dayjs().subtract(7, 'day').startOf('day').toISOString();
      const dailyMap: Record<string, Set<string>> = {};
      for (let i = 0; i < 7; i++) {
        const d = dayjs().subtract(i, 'day').format('DD/MM');
        dailyMap[d] = new Set();
      }

      allEvents.filter(e => dayjs(e.created_at).isAfter(sevenDaysAgo)).forEach(e => {
        const d = dayjs(e.created_at).format('DD/MM');
        if (dailyMap[d]) dailyMap[d].add(e.session_id);
      });

      setChartData(Object.entries(dailyMap).map(([date, sessions]) => ({
        date,
        visitors: sessions.size
      })).reverse());

      const projViewsMap: Record<string, number> = {};
      allEvents.filter(e => e.event_name === "project-view").forEach(e => {
        const title = e.metadata?.title || "Unknown";
        projViewsMap[title] = (projViewsMap[title] || 0) + 1;
      });

      setTopProjects(Object.entries(projViewsMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, views]) => ({ name, views }))
      );

      setRecentLogs(allEvents.sort((a, b) => dayjs(b.created_at).diff(a.created_at)).slice(0, 50));
      setIsLoading(false);
    } catch (e) { console.error(e); }
  };

  const updateStatsInRealtime = (newEvent: any) => {
    setStats(prev => ({ ...prev, totalEvents: prev.totalEvents + 1 }));
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    const msg = currentMessage;
    setChatMessages(prev => [...prev, { role: 'user', content: msg }]);
    setCurrentMessage("");

    setTimeout(() => {
      let reply = "Requête reçue. Analyse de l'OS en cours...";
      if (msg.toLowerCase().includes("vitesse") || msg.toLowerCase().includes("santé")) {
         reply = `Trafic Actuel: ${stats.uniqueVisitors} sessions. Taux de rebond stable à 15%. Système nominal.`;
      } else if (msg.toLowerCase().includes("projets")) {
         reply = `Le projet "${topProjects[0]?.name}" domine avec un taux de clic élevé.`;
      } else {
         reply = "Analyse terminée: Tout est opérationnel. Vos visiteurs viennent principalement de " + (stats.geography[0]?.name || "N/A") + ".";
      }
      setChatMessages(prev => [...prev, { role: 'bot', content: reply }]);
    }, 1000);
  };

  const saveProjectChanges = () => {
    if (!editingProject) return;
    const updatedList = projectsList.map(p => p.id === editingProject.id ? editingProject : p);
    setProjectsList(updatedList);
    localStorage.setItem("portfolio_projects_cache", JSON.stringify(updatedList));
    setEditingProject(null);
  };

  // --- AUTH INTERFACE ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md glass-card p-10 rounded-[40px] border border-white/5 shadow-2xl animate-in fade-in zoom-in-95 duration-700">
           <div className="flex flex-col items-center text-center mb-10">
              <div className="w-20 h-20 rounded-3xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6 shadow-2xl shadow-brand-accent/20">
                 <Lock className="text-brand-accent w-10 h-10" />
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Accès Restreint</h1>
              <p className="text-slate-500 text-sm mt-2">Veuillez entrer votre clé d'accès Portfolio.OS</p>
           </div>
           
           <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                 <Label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Clé d'accès Admin</Label>
                 <Input 
                   type="password" 
                   value={passwordInput}
                   onChange={(e) => setPasswordInput(e.target.value)}
                   placeholder="••••••••" 
                   className={cn(
                     "bg-white/5 border-white/10 rounded-2xl h-14 text-center text-lg tracking-[0.5em]",
                     authError && "border-red-500 animate-shake"
                   )}
                 />
                 {authError && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest text-center mt-2">Clé Incorrecte - Accès Refusé</p>}
              </div>
              <Button type="submit" className="w-full h-14 bg-brand-accent text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:glow-cyan transition-all">
                 Déverrouiller
              </Button>
           </form>

           <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <button onClick={() => window.location.href = "/"} className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors">Retour au Site Public</button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-brand-accent/30 selection:text-white flex flex-col md:flex-row overflow-hidden relative">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60] md:hidden animate-in fade-in duration-300" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={cn(
        "fixed md:relative w-72 h-full bg-[#03081a] border-r border-white/5 transition-transform duration-500 z-[70] flex flex-col",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center shadow-lg shadow-brand-accent/30">
                <Terminal className="text-white w-6 h-6" />
              </div>
              <div>
                <div className="text-lg font-black tracking-tighter text-white uppercase">Portfolio<span className="text-brand-accent">.OS</span></div>
                <div className="text-[10px] text-slate-500 uppercase font-mono mt-1 pt-1 border-t border-white/5">Engine v2</div>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-500">
               <ChevronLeft size={24} />
            </button>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "overview", label: lang("Système Central", "Central System"), icon: Layout },
              { id: "projects", label: lang("Projets", "Projects"), icon: Briefcase },
              { id: "analytics", label: lang("Analyses", "Analytics"), icon: TrendingUp },
              { id: "logs", label: lang("Télémétrie", "Logs"), icon: Activity },
              { id: "copilot", label: lang("Copilot AI", "AI Pilot"), icon: Brain },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveView(item.id as any); setIsSidebarOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300",
                  activeView === item.id 
                    ? "bg-brand-accent text-white shadow-xl shadow-brand-accent/20" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-white/5">
             <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3 px-2">Settings</div>
             <button onClick={toggleLanguage} className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-brand-accent/50 transition-all group">
                <div className="flex items-center gap-3">
                   <Globe size={14} className="text-brand-accent" />
                   <span className="text-xs font-bold text-white uppercase">{language}</span>
                </div>
                <div className="text-[10px] text-slate-500">Toggle</div>
             </button>
          </div>
        </div>

        <div className="mt-auto p-8 pt-0 border-t border-white/5 md:border-none">
          <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/5 mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-brand-accent/30 overflow-hidden shadow-lg">
               <img src="/profil.png" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-xs font-black text-white uppercase leading-none mb-1">Eucher A.</div>
              <div className="text-[8px] text-brand-accent font-black uppercase tracking-widest flex items-center gap-1">
                 <ShieldCheck size={8} /> Admin
              </div>
            </div>
          </div>
          <button onClick={() => { sessionStorage.removeItem("dashboard_auth"); setIsAuthenticated(false); }} className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 hover:text-red-400 transition-all border border-white/5">
            <LogOut size={14} /> Exit System
          </button>
        </div>
      </aside>

      {/* --- MAIN WORKSPACE --- */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar flex flex-col">
        
        {/* Header - Sticky on Mobile */}
        <header className="sticky top-0 bg-[#020617]/80 backdrop-blur-xl z-50 p-6 md:p-8 flex items-center justify-between border-b border-white/5">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400"
              >
                 <Menu size={20} />
              </button>
              <div>
                 <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <Activity size={10} className="text-emerald-500 animate-pulse" /> Live Telemetry
                 </div>
                 <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter truncate">
                    {activeView === "overview" && "Dashboard"}
                    {activeView === "projects" && "Projects"}
                    {activeView === "analytics" && "Analytics"}
                    {activeView === "logs" && "System Logs"}
                    {activeView === "copilot" && "Copilot"}
                 </h1>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <div className="hidden lg:flex px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold text-slate-400 gap-3 items-center">
                 <Globe size={14} className="text-brand-accent" /> Node: Benin/FR
              </div>
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <Bell size={18} />
              </button>
           </div>
        </header>

        <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
           {/* --- VIEW: OVERVIEW --- */}
           {activeView === "overview" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <StatCard title="Visiters" value={stats.uniqueVisitors} icon={Users} color="bg-blue-600" trend={12} />
                    <StatCard title="Events" value={stats.totalEvents} icon={Activity} color="bg-secondary" trend={8} />
                    <StatCard title="CR" value={`${stats.conversion}%`} icon={Target} color="bg-emerald-600" trend={-2} />
                    <StatCard title="Status" value="OK" icon={ShieldCheck} color="bg-purple-600" />
                 </div>

                 <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="lg:col-span-2 glass-card p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/5 h-[350px] md:h-[450px]">
                       <h3 className="text-sm md:text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                         <TrendingUp className="text-brand-accent w-4 h-4 md:w-5 md:h-5" /> Analytics Flow
                       </h3>
                       <div className="h-[250px] md:h-[320px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={chartData}>
                                <defs>
                                   <linearGradient id="valGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                                <XAxis dataKey="date" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                                <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                                <RechartsTooltip contentStyle={{ background: '#020617', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '16px', fontSize: '10px' }} />
                                <Area type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#valGrad)" />
                             </AreaChart>
                          </ResponsiveContainer>
                       </div>
                    </div>

                    <div className="glass-card p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/5">
                       <h3 className="text-sm md:text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                          <Globe className="text-brand-accent w-4 h-4 md:w-5 md:h-5" /> Geography
                       </h3>
                       <div className="space-y-6">
                          {stats.geography.map((c, i) => (
                             <div key={i}>
                                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase mb-2">
                                   <span>{c.name}</span><span>{c.val}%</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                   <div className={cn("h-full", c.color)} style={{ width: `${c.val}%` }} />
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Top Projects Hub */}
                 <div className="glass-card p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/5">
                    <h3 className="text-sm md:text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                       <Sparkles className="text-yellow-500 w-4 h-4 md:w-5 md:h-5" /> Top Performer Assets
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                       {topProjects.map((p, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/5 group hover:border-brand-accent/30 transition-all">
                             <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center font-black text-slate-500 group-hover:text-brand-accent">0{i+1}</div>
                             <div className="flex-1 truncate">
                                <div className="text-sm font-bold text-white truncate group-hover:text-brand-accent transition-colors">{p.name}</div>
                                <div className="text-[10px] text-slate-500 uppercase">{p.views} interactions</div>
                             </div>
                             <ChevronRight className="w-4 h-4 text-slate-700" />
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           )}

           {/* --- VIEW: PROJECTS --- */}
           {activeView === "projects" && (
              <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-500">
                 <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white/5 p-4 md:p-6 rounded-[32px] border border-white/5">
                    <div className="relative flex-1">
                       <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                       <input className="w-full bg-slate-950 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-accent" placeholder="Search asset catalog..." />
                    </div>
                    <button className="h-14 px-8 rounded-2xl bg-brand-accent text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 justify-center">
                      <Plus size={18} /> Add New
                    </button>
                 </div>

                 <div className="grid grid-cols-1 gap-4">
                    {projectsList.map((p) => (
                       <div key={p.id} className="glass-card p-4 rounded-[32px] border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row items-center gap-6">
                          <div className="w-full sm:w-32 h-24 bg-slate-900 rounded-2xl overflow-hidden flex-shrink-0 relative border border-white/10">
                             <img src={p.image || (p.images && p.images[0])} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                             <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
                                <h4 className="text-lg font-black text-white uppercase tracking-tight">{p.title}</h4>
                                <span className="text-[8px] font-black bg-white/5 border border-white/5 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-widest">{p.category}</span>
                             </div>
                             <p className="text-xs text-slate-500 line-clamp-1 truncate max-w-sm mx-auto sm:mx-0">{p.description}</p>
                          </div>
                          <div className="flex gap-2">
                             <Dialog>
                                <DialogTrigger asChild>
                                   <button onClick={() => setEditingProject(p)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 hover:bg-brand-accent text-slate-500 hover:text-white transition-all flex items-center justify-center"><Edit3 size={18} /></button>
                                </DialogTrigger>
                                <DialogContent className="bg-slate-950 border-white/10 rounded-[40px] max-w-2xl text-white">
                                   <DialogHeader><DialogTitle className="text-2xl font-black flex gap-3 uppercase"><Edit3 className="text-brand-accent" /> Editor Hub</DialogTitle></DialogHeader>
                                   <div className="space-y-6 pt-6">
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                         <div className="space-y-2"><Label className="text-[10px] uppercase font-black text-slate-500">Asset Title</Label><Input value={editingProject?.title} onChange={e => setEditingProject(prev => prev ? {...prev, title: e.target.value} : null)} className="bg-white/5 border-white/10 rounded-xl" /></div>
                                         <div className="space-y-2"><Label className="text-[10px] uppercase font-black text-slate-500">Category Tag</Label><Input value={editingProject?.category} onChange={e => setEditingProject(prev => prev ? {...prev, category: e.target.value} : null)} className="bg-white/5 border-white/10 rounded-xl" /></div>
                                      </div>
                                      <div className="space-y-2"><Label className="text-[10px] uppercase font-black text-slate-500">Asset Data Point</Label><Textarea value={editingProject?.description} onChange={e => setEditingProject(prev => prev ? {...prev, description: e.target.value} : null)} className="bg-white/5 border-white/10 rounded-xl min-h-[100px]" /></div>
                                   </div>
                                   <DialogFooter className="mt-8 flex gap-4"><Button variant="ghost" onClick={() => setEditingProject(null)}>Cancel</Button><Button onClick={saveProjectChanges} className="bg-brand-accent text-white px-10 rounded-xl font-black">SAVE_CORE</Button></DialogFooter>
                                </DialogContent>
                             </Dialog>
                             <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 hover:bg-red-500 text-slate-500 hover:text-white transition-all flex items-center justify-center"><Trash2 size={18} /></button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}

           {/* --- VIEW: LOGS --- */}
           {activeView === "logs" && (
              <div className="animate-in slide-in-from-right-6 duration-500">
                 <div className="bg-slate-900/50 border border-white/10 rounded-[32px] overflow-hidden">
                    <div className="overflow-x-auto custom-scrollbar">
                       <table className="w-full text-left text-[10px] border-collapse min-w-[800px]">
                          <thead className="bg-[#03081a] border-b border-white/5">
                             <tr>
                                <th className="px-6 py-5 font-black uppercase tracking-widest text-slate-500">Time Index</th>
                                <th className="px-6 py-5 font-black uppercase tracking-widest text-slate-500">Signal Class</th>
                                <th className="px-6 py-5 font-black uppercase tracking-widest text-slate-500">Vector Payload</th>
                                <th className="px-6 py-5 font-black uppercase tracking-widest text-slate-500 text-right">Node ID</th>
                             </tr>
                          </thead>
                          <tbody className="font-mono">
                             {recentLogs.map((log, i) => (
                                <tr key={i} className="border-b border-white/[0.02] hover:bg-brand-accent/[0.03] transition-colors">
                                   <td className="px-6 py-4 text-slate-500">{dayjs(log.created_at).format('HH:mm:ss.SS')}</td>
                                   <td className="px-6 py-4">
                                      <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest", log.event_type === 'page_view' ? 'text-blue-400 bg-blue-400/5 border border-blue-400/10' : 'text-emerald-400 bg-emerald-400/5 border border-emerald-400/10')}>
                                         {log.event_type}
                                      </span>
                                   </td>
                                   <td className="px-6 py-4">
                                      <div className="flex flex-col gap-0.5">
                                         <span className="text-slate-200 font-bold uppercase">{log.event_name}</span>
                                         <span className="text-[9px] text-slate-600 truncate max-w-xs">{JSON.stringify(log.metadata)}</span>
                                      </div>
                                   </td>
                                   <td className="px-6 py-4 text-right text-slate-600">{log.session_id.substring(0, 12)}</td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
              </div>
           )}

           {/* --- VIEW: COPILOT --- */}
           {activeView === "copilot" && (
              <div className="h-[calc(100vh-250px)] flex flex-col animate-in slide-in-from-right-12 duration-500">
                 <div className="flex-1 glass-card border border-white/5 rounded-[40px] flex flex-col overflow-hidden shadow-2xl">
                    <div className="p-6 md:p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-brand-accent flex items-center justify-center"><Bot size={24} className="text-white" /></div>
                          <div><h3 className="font-black uppercase text-white tracking-tighter">Neural AI Copilot</h3><div className="text-[9px] text-emerald-500 font-bold uppercase">Ready to Sync</div></div>
                       </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
                       {chatMessages.map((m, i) => (
                          <div key={i} className={cn("flex gap-4 max-w-[85%]", m.role === 'user' ? 'ml-auto flex-row-reverse' : '')}>
                             <div className={cn("w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg", m.role === 'bot' ? 'bg-slate-900 text-brand-accent' : 'bg-brand-accent text-white')}><Bot size={16} /></div>
                             <div className={cn("p-4 rounded-[24px] text-sm leading-relaxed border", m.role === 'bot' ? 'bg-white/[0.03] border-white/5 text-slate-300' : 'bg-white/5 border-white/10 text-white')}>
                                {m.content}
                             </div>
                       </div>))}
                       <div ref={chatEndRef} />
                    </div>
                    <div className="p-6 md:p-8 border-t border-white/5 bg-slate-950/40">
                       <div className="flex gap-3">
                          <input type="text" value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Command the AI..." className="flex-1 bg-slate-950 border-2 border-white/5 rounded-[20px] h-12 px-6 text-sm focus:outline-none focus:border-brand-accent transition-all placholder:text-slate-800"
                           />
                          <button onClick={handleSendMessage} className="w-12 h-12 rounded-[20px] bg-brand-accent flex items-center justify-center text-white active:scale-95 transition-all"><Send size={18} /></button>
                       </div>
                    </div>
                 </div>
              </div>
           )}
        </div>
      </main>

      <style>{`
        .glass-card { background: rgba(2, 6, 23, 0.4); backdrop-filter: blur(40px); }
        .glow-cyan { box-shadow: 0 0 40px rgba(59, 130, 246, 0.15); }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.15); border-radius: 10px; }
      `}</style>
    </div>
  );
}
