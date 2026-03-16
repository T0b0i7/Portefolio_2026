import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";
import { useTechNews } from "@/hooks/useTechNews";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar 
} from "recharts";
import dayjs from "dayjs";

interface AlertItem {
  text: string;
  time: string;
}

interface ChartDataPoint {
  date: string;
  visits: number;
}

interface ProjectStat {
  name: string;
  views: number;
}

export function SecureSystem() {
  const { lang, language } = useLanguage();
  const { news, loading: newsLoading } = useTechNews();
  const [screenState, setScreenState] = useState<"startup" | "access-granted" | "terminal">("startup");
  const [activeTab, setActiveTab] = useState<"terminal" | "analytics" | "logs" | "news">("terminal");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [initProgress, setInitProgress] = useState(0);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [hackMessages, setHackMessages] = useState<string[]>([]);
  const [realtimeLogs, setRealtimeLogs] = useState<any[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [projectStats, setProjectStats] = useState<ProjectStat[]>([]);
  
  const [stats, setStats] = useState({
    networkSpeed: 12.4,
    cpuUsage: 34,
    memoryUsage: 7.2,
    threatCount: 3,
    temperature: 42,
    missionProgress: 30,
    uniqueVisitors: 0,
    totalClicks: 0,
    conversionRate: 0
  });

  const [systemTime, setSystemTime] = useState("");
  const [commandInput, setCommandInput] = useState("");
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<{ sender: string, text: string }[]>([
    {
      sender: "bot",
      text: lang(
        "Bonjour, je suis votre assistant IA CYBER-MATRIX.\nTapez 'help' pour voir les commandes disponibles.",
        "Hello, I am your AI assistant CYBER-MATRIX.\nType 'help' for available commands."
      )
    }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [cryptoInput, setCryptoInput] = useState("");
  const [cryptoResult, setCryptoResult] = useState("");

  const codeOutputRef = useRef<HTMLDivElement>(null);
  const aiMessagesRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef(0);
  const hackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const statsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- DATA FETCHING & REALTIME ---

  const fetchVisitorStats = async () => {
    try {
      const { count: total } = await supabase
        .from("visitor_events")
        .select("*", { count: "exact", head: true });

      const { data: sessions } = await supabase
        .from("visitor_events")
        .select("session_id");

      const uniqueSessions = new Set(sessions?.map((e) => e.session_id) ?? []).size;

      const { count: conversions } = await supabase
        .from("visitor_events")
        .select("*", { count: "exact", head: true })
        .eq("event_name", "contact-form-submit");

      const conversion = uniqueSessions > 0
        ? Math.round(((conversions ?? 0) / uniqueSessions) * 1000) / 10
        : 0;

      setStats((prev) => ({
        ...prev,
        uniqueVisitors: uniqueSessions,
        totalClicks: total ?? 0,
        conversionRate: conversion,
      }));
    } catch (e) { console.error(e); }
  };

  const fetchAnalyticsData = async () => {
    try {
      // Last 7 days chart data
      const sevenDaysAgo = dayjs().subtract(7, 'day').toISOString();
      const { data: events } = await supabase
        .from("visitor_events")
        .select("created_at, session_id")
        .gte("created_at", sevenDaysAgo);

      const dailyMap: Record<string, Set<string>> = {};
      for (let i = 0; i < 7; i++) {
        dailyMap[dayjs().subtract(i, 'day').format('DD/MM')] = new Set();
      }

      events?.forEach(event => {
        const dateKey = dayjs(event.created_at).format('DD/MM');
        if (dailyMap[dateKey]) dailyMap[dateKey].add(event.session_id);
      });

      const formattedData = Object.entries(dailyMap).map(([date, sessions]) => ({
        date,
        visits: sessions.size
      })).reverse();

      setChartData(formattedData);

      // Project popularity
      const { data: projectEvents } = await supabase
        .from("visitor_events")
        .select("metadata")
        .eq("event_name", "project-view");

      const projectMap: Record<string, number> = {};
      projectEvents?.forEach(e => {
        const title = e.metadata?.title || "Unknown";
        projectMap[title] = (projectMap[title] || 0) + 1;
      });

      const formattedProjects = Object.entries(projectMap)
        .map(([name, views]) => ({ name, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      setProjectStats(formattedProjects);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    if (screenState === "terminal") {
      fetchVisitorStats();
      fetchAnalyticsData();

      // Realtime subscription
      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'visitor_events' },
          (payload) => {
            setRealtimeLogs(prev => [payload.new, ...prev].slice(0, 50));
            fetchVisitorStats();
          }
        )
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    }
  }, [screenState]);

  // --- SYSTEM LOGIC ---

  const codeSnippets = [
    { prompt: "[root@cyber-matrix]# ", command: "whoami", output: "root" },
    { prompt: "[root@cyber-matrix]# ", command: "uname -a", output: "Linux cyber-matrix 5.15.0 #1 SMP Wed Nov 1 00:00:00 UTC 2024 x86_64 GNU/Linux" },
    { prompt: "[root@cyber-matrix]# ", command: "cat /proc/cpuinfo | grep 'model name' | head -1", output: "model name\t: Intel(R) Xeon(R) CPU E5-2699 v4 @ 2.20GHz" },
    { prompt: "[root@cyber-matrix]# ", command: "free -h", output: "Mem:           125G         24G         89G        1.2G         11G         99G" },
    { prompt: "[root@cyber-matrix]# ", command: "df -h /", output: "/dev/nvme0n1p2  2.0T  456G  1.5T  24% /" },
    { prompt: "[SYSTEM]# ", command: "SESSION_SECURE --status=ACTIVE --user=ROOT", output: lang("Système sécurisé. Aucune menace détectée.", "System secure. No threats detected.") }
  ];

  const hackMessagesList = [
    lang("⚠️ Surveillance du trafic réseau en cours", "⚠️ Monitoring network traffic"),
    lang("🔍 Analyse des journaux système", "🔍 System logs analysis"),
    lang("✓ Vérification de l'intégrité des fichiers", "✓ File integrity check"),
    lang("📊 Scan des processus actifs", "📊 Active processes scan"),
    lang("🛡️ Scan des vulnérabilités détecté", "🛡️ Vulnerability scan detected"),
  ];

  const aiResponses: { [key: string]: string | (() => string) } = {
    help: lang(
      "Commandes disponibles:\nstatus - Affiche le statut du système\nwhoami - Affiche l'utilisateur courant\ntime - Affiche l'heure système\nclear - Efface le terminal\nnews - Voir les actus tech",
      "Available commands:\nstatus - Display system status\nwhoami - Display current user\ntime - Display system time\nclear - Clear terminal\nnews - See tech news"
    ),
    status: () => lang(
      `Système: OPTIMAL\nCPU: ${stats.cpuUsage}%\nMémoire: ${stats.memoryUsage}/16 GB\nTempérature: ${stats.temperature}°C\nVisiteurs: ${stats.uniqueVisitors}`,
      `System: OPTIMAL\nCPU: ${stats.cpuUsage}%\nMemory: ${stats.memoryUsage}/16 GB\nTemperature: ${stats.temperature}°C\nVisitors: ${stats.uniqueVisitors}`
    ),
    whoami: lang("User: AGENT_NEO\nLevel: QUANTUM\nSession: ACTIVE", "User: AGENT_NEO\nLevel: QUANTUM\nSession: ACTIVE"),
    time: () => lang(`Heure système: ${systemTime}`, `System time: ${systemTime}`),
    news: () => { setActiveTab("news"); return lang("Transfert vers le module News...", "Transferring to News module..."); },
    default: lang("Commande non reconnue. Tapez 'help' pour l'aide.", "Command not recognized. Type 'help' for help.")
  };

  const checkPassword = () => {
    if (password === "Motdepasse") {
      setScreenState("access-granted");
      let width = 0;
      const interval = setInterval(() => {
        width += 4;
        setInitProgress(width);
        if (width >= 100) {
          clearInterval(interval);
          setTimeout(startTerminal, 500);
        }
      }, 30);
    } else {
      setErrorMessage(lang("ERREUR: Code d'accès incorrect", "ERROR: Incorrect access code"));
      setPassword("");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const startTerminal = () => {
    setScreenState("terminal");
    if (hackIntervalRef.current) clearInterval(hackIntervalRef.current);
    hackIntervalRef.current = setInterval(() => {
      const msg = hackMessagesList[Math.floor(Math.random() * hackMessagesList.length)];
      setHackMessages(prev => [...prev.slice(-4), msg]);
    }, 2000);

    if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
    statsIntervalRef.current = setInterval(() => {
      setStats(prev => ({
        ...prev,
        networkSpeed: parseFloat((Math.random() * 5 + 10).toFixed(1)),
        cpuUsage: Math.floor(Math.random() * 20 + 30),
        memoryUsage: parseFloat((Math.random() * 2 + 6).toFixed(1)),
        temperature: Math.floor(Math.random() * 10 + 38),
      }));
    }, 100);

    if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
    timeIntervalRef.current = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString('fr-FR', { hour12: false }));
    }, 1000);
    
    typeCode();
  };

  const typeCode = () => {
    if (currentLineRef.current >= codeSnippets.length) {
      currentLineRef.current = 0;
      return;
    }
    const snippet = codeSnippets[currentLineRef.current];
    setCodeLines(prev => [...prev, snippet.prompt + snippet.command, snippet.output]);
    currentLineRef.current++;
    setTimeout(typeCode, 2000);
  };

  const executeCommand = () => {
    if (!commandInput.trim()) return;
    const cmd = commandInput.toLowerCase().trim();
    let response = aiResponses[cmd] || aiResponses.default;
    if (typeof response === 'function') response = response();
    
    if (codeOutputRef.current) {
      const line = `<div style="color:#ff0">[root]# ${commandInput}</div><div style="color:#8f8;margin-bottom:8px">${response}</div>`;
      codeOutputRef.current.innerHTML += line;
      codeOutputRef.current.scrollTop = codeOutputRef.current.scrollHeight;
    }
    setCommandInput("");
  };

  // --- UI COMPONENTS ---

  const TabButton = ({ id, label }: { id: typeof activeTab, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
        activeTab === id ? "border-green-500 text-green-400 bg-green-500/10" : "border-transparent text-slate-500 hover:text-green-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full min-h-screen bg-black text-green-500 font-mono overflow-hidden relative">
      <style>{`
        .scanlines { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent 50%, rgba(0, 255, 0, 0.03) 50%); background-size: 100% 4px; pointer-events: none; z-index: 100; }
        .glass-panel { background: rgba(0, 20, 0, 0.8); border: 1px solid #0f0; border-radius: 4px; box-shadow: 0 0 15px rgba(0, 255, 0, 0.1); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0f0; }
      `}</style>
      <div className="scanlines" />

      {/* Startup & Access logic stays largely the same but faster */}
      {screenState === "startup" && (
        <div className="fixed inset-0 flex flex-col justify-center items-center gap-8 z-50 bg-black">
          <div className="w-24 h-24 border-2 border-green-500 animate-spin flex items-center justify-center">
            <div className="w-16 h-16 border border-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-white uppercase shadow-green-500">Cyber Matrix OS</h1>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && checkPassword()}
            className="bg-transparent border border-green-500 p-3 text-center outline-none text-cyan-400"
            placeholder="ACCESS CODE"
            autoFocus
          />
          {errorMessage && <div className="text-red-500 animate-pulse">{errorMessage}</div>}
        </div>
      )}

      {screenState === "access-granted" && (
        <div className="fixed inset-0 flex flex-col justify-center items-center gap-4 bg-black z-50">
          <div className="text-2xl font-bold text-green-500 uppercase">System Initializing...</div>
          <div className="w-64 h-1 bg-green-950 border border-green-500">
            <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${initProgress}%` }} />
          </div>
        </div>
      )}

      {/* --- MAIN DASHBOARD --- */}
      {screenState === "terminal" && (
        <div className="p-4 grid grid-rows-[auto_1fr] h-screen gap-4">
          
          {/* Header Stats */}
          <div className="grid grid-cols-5 gap-4">
            <div className="glass-panel p-3 border-cyan-900">
              <div className="text-[10px] text-green-700 uppercase">System Time</div>
              <div className="text-xl text-cyan-400">{systemTime}</div>
            </div>
            <div className="glass-panel p-3 border-green-900">
              <div className="text-[10px] text-green-700 uppercase">Live Visitors</div>
              <div className="text-xl text-green-400">{stats.uniqueVisitors} <span className="text-[8px] opacity-50">UNQ</span></div>
            </div>
            <div className="glass-panel p-3 border-green-900">
              <div className="text-[10px] text-green-700 uppercase">Total Interactions</div>
              <div className="text-xl text-green-400">{stats.totalClicks}</div>
            </div>
            <div className="glass-panel p-3 border-yellow-900">
              <div className="text-[10px] text-green-700 uppercase">Conversion Rate</div>
              <div className="text-xl text-yellow-500">{stats.conversionRate}%</div>
            </div>
            <div className="glass-panel p-3 border-red-900 overflow-hidden">
              <div className="text-[10px] text-red-700 uppercase">Network Load</div>
              <div className="text-sm text-red-400">{stats.networkSpeed} Gbps</div>
              <div className="h-1 bg-red-900/30 mt-1"><div className="h-full bg-red-500 transition-all" style={{ width: `${(stats.networkSpeed/20)*100}%` }} /></div>
            </div>
          </div>

          {/* Main Content View with Tabs */}
          <div className="grid grid-cols-[1fr_300px] gap-4 overflow-hidden">
            
            <div className="glass-panel flex flex-col overflow-hidden">
              <div className="flex bg-green-950/20 border-b border-green-500/30">
                <TabButton id="terminal" label="Terminal" />
                <TabButton id="analytics" label="Analytics" />
                <TabButton id="logs" label="Live Logs" />
                <TabButton id="news" label="Tech News" />
              </div>

              <div className="flex-1 p-4 overflow-hidden relative">
                
                {activeTab === "terminal" && (
                  <div className="h-full flex flex-col">
                    <div ref={codeOutputRef} className="flex-1 overflow-y-auto custom-scrollbar text-sm space-y-1 mb-4">
                      {codeLines.map((line, i) => <div key={i} className={i % 2 === 0 ? "text-cyan-700" : "text-green-500 mb-2"}>{line}</div>)}
                    </div>
                    <div className="flex gap-2 border-t border-green-500/30 pt-4">
                      <span className="text-yellow-500 font-bold">[root]#</span>
                      <input 
                        className="bg-transparent flex-1 outline-none text-green-400"
                        value={commandInput}
                        onChange={e => setCommandInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && executeCommand()}
                        autoFocus
                      />
                    </div>
                  </div>
                )}

                {activeTab === "analytics" && (
                  <div className="h-full grid grid-rows-2 gap-8">
                    <div>
                      <h4 className="text-xs font-bold text-green-700 uppercase mb-4 tracking-tighter">7-Day Visitor Velocity</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0f0" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#0f0" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#030" />
                          <XAxis dataKey="date" stroke="#060" fontSize={10} />
                          <YAxis stroke="#060" fontSize={10} />
                          <Tooltip contentStyle={{ background: '#000', border: '1px solid #0f0', fontSize: '10px' }} />
                          <Area type="monotone" dataKey="visits" stroke="#0f0" fillOpacity={1} fill="url(#colorVisits)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-green-700 uppercase mb-4 tracking-tighter">Top Projects Performance</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={projectStats} layout="vertical">
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" stroke="#0f0" fontSize={9} width={100} />
                          <Tooltip cursor={{fill: '#0f02'}} contentStyle={{ background: '#000', border: '1px solid #0f0', fontSize: '10px' }} />
                          <Bar dataKey="views" fill="#0f0" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {activeTab === "logs" && (
                  <div className="h-full overflow-y-auto custom-scrollbar space-y-2">
                    <h3 className="text-xs text-red-500 mb-4 animate-pulse uppercase font-black tracking-widest">--- Realtime Intelligence Stream ---</h3>
                    {realtimeLogs.length === 0 && <div className="text-slate-800 italic">Waiting for incoming telemetry...</div>}
                    {realtimeLogs.map((log, i) => (
                      <div key={i} className="text-[11px] border-l-2 border-green-900 pl-3 py-1 bg-green-500/5">
                        <span className="text-green-700">[{dayjs(log.created_at).format('HH:mm:ss')}]</span>
                        <span className="text-cyan-600 ml-2 uppercase">{log.event_type}</span>
                        <span className="text-slate-400 ml-2">→ {log.event_name}</span>
                        {log.metadata && <span className="text-[9px] text-slate-600 ml-2 truncate inline-block max-w-sm">{JSON.stringify(log.metadata)}</span>}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "news" && (
                  <div className="h-full flex flex-col">
                    <h3 className="text-xs text-blue-500 mb-4 uppercase font-black tracking-widest border-b border-blue-900/30 pb-2">Tech Intelligence Feed</h3>
                    {newsLoading ? (
                      <div className="flex-1 flex items-center justify-center animate-pulse text-blue-900 text-3xl font-black">SCANNING THE WEB...</div>
                    ) : (
                      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                        {news.map(item => (
                          <div key={item.id} className="group glass-panel p-3 border-blue-900/50 hover:border-blue-500 transition-all cursor-pointer" onClick={() => item.url && window.open(item.url, '_blank')}>
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-[8px] text-blue-700 bg-blue-500/5 px-2 py-0.5 rounded uppercase font-bold">Priority {Math.min(10, Math.floor(item.score/100))}</span>
                              <span className="text-[9px] text-slate-600">{dayjs.unix(item.time).format('DD MMM • HH:mm')}</span>
                            </div>
                            <h5 className="text-xs font-bold text-blue-400 group-hover:text-blue-200 transition-colors leading-relaxed">{item.title}</h5>
                            <div className="mt-2 text-[9px] text-slate-600 flex justify-between uppercase tracking-widest">
                              <span>Source: {item.by}</span>
                              <span className="group-hover:text-blue-500 transition-colors">Open Link _</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* Sidebar Alerts & Identity */}
            <div className="flex flex-col gap-4 overflow-hidden">
              <div className="glass-panel p-4 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border border-green-500 p-1 mb-2 bg-black relative">
                  <div className="absolute inset-0 bg-green-500/10 animate-pulse rounded-full" />
                  <img src="/profil.png" className="w-full h-full object-cover rounded-full grayscale" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-white uppercase tracking-tighter">Eucher Abatti</div>
                  <div className="text-[9px] text-green-700 uppercase">Quant Authority: lvl 9</div>
                </div>
              </div>

              <div className="glass-panel flex-1 p-3 overflow-hidden flex flex-col">
                <div className="text-[10px] text-red-500 font-bold uppercase mb-2 border-b border-red-900 pb-1">Anomalies & Status</div>
                <div className="flex-1 overflow-y-auto custom-scrollbar text-[10px] space-y-2">
                  {hackMessages.map((m, i) => <div key={i} className="text-green-800 italic">• {m}</div>)}
                  <div className="mt-4 pt-4 border-t border-green-900 flex justify-between items-center">
                    <span className="text-[8px] opacity-30">ENCRYPT: AES-256</span>
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setAiChatOpen(!aiChatOpen)}
                className="glass-panel p-3 text-xs font-bold uppercase hover:bg-green-500/20 transition-all text-cyan-500 border-cyan-500/50"
              >
                Access Neural AI
              </button>
            </div>

          </div>
        </div>
      )}

      {/* AI Modal - Aesthetic Upgrade */}
      {aiChatOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="w-full max-w-xl glass-panel border-cyan-500 shadow-cyan-500/20 flex flex-col h-[500px]">
             <div className="p-3 border-b border-cyan-500/50 flex justify-between items-center">
                <div className="text-cyan-400 font-bold text-sm tracking-widest">NEURAL NETWORK ASSISTANT</div>
                <button onClick={() => setAiChatOpen(false)} className="text-cyan-900 hover:text-red-500 font-black">X</button>
             </div>
             <div ref={aiMessagesRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {aiMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded text-xs ${
                      msg.sender === 'user' 
                        ? 'bg-cyan-500/10 border border-cyan-500/50 text-cyan-200' 
                        : 'bg-green-500/10 border border-green-500/50 text-green-300'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
             </div>
             <div className="p-4 border-t border-cyan-500/30 flex gap-2">
                <input 
                  className="bg-transparent flex-1 border border-cyan-900 p-2 text-xs text-cyan-400 outline-none focus:border-cyan-500"
                  value={aiInput}
                  onChange={e => setAiInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendAIMessage()}
                  placeholder="Ask the system..."
                />
                <button onClick={sendAIMessage} className="px-4 bg-cyan-500/20 text-cyan-400 border border-cyan-500">SEND</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
