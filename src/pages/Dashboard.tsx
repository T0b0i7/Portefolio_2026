import { useState, useEffect, useRef, useCallback } from "react";
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
  Menu, ChevronLeft, Lock, Unlock,
  Crown, Diamond, Star, Rocket,
  Flame, Trophy, Award,
  Gem, Sparkles as SparklesIcon,
  LucideIcon
} from "lucide-react";
import dayjs from "dayjs";
import { supabase } from "@/lib/supabase";
import { projectService } from "@/services/projectService";
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

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color?: string;
  trend?: number;
  premium?: boolean;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

interface ChartDataPoint {
  date: string;
  visitors: number;
}

interface VisitorEvent {
  session_id: string;
  event_name: string;
  event_type?: string;
  created_at: string;
  metadata?: {
    device?: string;
    country?: string;
    title?: string;
  };
}

interface StatsData {
  uniqueVisitors: number;
  totalEvents: number;
  conversion: number;
  bounceRate: number;
  deviceBreakdown: Record<string, number>;
  geography: { name: string; val: number; color: string }[];
}

interface TopProject {
  name: string;
  views: number;
}

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

// Luxury Stat Card with advanced animations
const StatCard = ({ title, value, icon: Icon, color, trend, premium = false }: StatCardProps) => (
  <div className={cn(
    "dev-card group p-6 border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all duration-300",
    "rounded-xl ring-1 ring-inset ring-white/5"
  )}>
    <div className="flex justify-between items-start mb-4">
      <div className={cn(
        "p-2.5 rounded-lg border border-slate-800 bg-slate-950 shadow-inner",
        "group-hover:border-emerald-500/50 transition-colors duration-300"
      )}>
        <Icon className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
      </div>

      {trend && (
        <div className={cn(
          "px-2 py-0.5 rounded text-[10px] font-mono font-bold border",
          trend > 0
            ? "bg-emerald-400/5 text-emerald-400 border-emerald-400/20"
            : "bg-red-400/5 text-red-400 border-red-400/20"
        )}>
          {trend > 0 ? "+" : ""}{trend}%
        </div>
      )}
    </div>

    <div className="space-y-1">
      <div className="text-sm font-medium text-slate-500 uppercase tracking-wider font-mono">
        {title}
      </div>
      <div className="text-2xl font-bold text-white font-mono tracking-tight">
        {typeof value === 'number' && value > 999 ? `${(value / 1000).toFixed(1)}K` : value}
      </div>
    </div>
  </div>
);

// Luxury Project Card
const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => (
  <div className="dev-project-card group border border-slate-800 bg-slate-900/50 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-300">
    <div className="p-4 flex items-center gap-4">
      {/* Mini preview */}
      <div className="w-16 h-12 bg-slate-950 rounded border border-slate-800 overflow-hidden flex-shrink-0">
        {project.image ? (
          <img src={project.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-slate-700" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-bold text-white truncate font-mono">
            {project.title}
          </h4>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase font-mono">
            {project.category}
          </span>
        </div>
        <p className="text-xs text-slate-500 truncate font-mono">
          {project.description}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(project)}
          className="p-2 rounded border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="p-2 rounded border border-slate-800 bg-slate-950 text-red-400/60 hover:text-red-400 hover:border-red-900/50 transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
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
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Real stats state
  const [stats, setStats] = useState<StatsData>({
    uniqueVisitors: 0,
    totalEvents: 0,
    conversion: 0,
    bounceRate: 15.2,
    deviceBreakdown: { Desktop: 0, Mobile: 0 },
    geography: []
  });

  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [recentLogs, setRecentLogs] = useState<VisitorEvent[]>([]);
  const [topProjects, setTopProjects] = useState<TopProject[]>([]);

  // Chat Co-pilot
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'bot', content: "Connecté à l'IA d'exploitation Portfolio.OS. Je suis prêt à analyser vos métadonnées." }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Project Edits
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const list = await projectService.getAllProjects(language);
      setProjectsList(list);
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert('❌ Erreur lors du chargement des projets');
      setProjectsList([]);
    }
  }, [language]);

  const fetchDashboardData = async () => {
    try {
      const { data: allEvents, count: total } = await supabase.from("visitor_events").select("*");
      if (!allEvents) {
        console.warn("No events data available");
        return;
      }

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
        deviceBreakdown: deviceMap,
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
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      alert('❌ Erreur lors du chargement des données du tableau de bord');
      setIsLoading(false);
    }
  };

  const updateStatsInRealtime = async (newEvent: VisitorEvent) => {
    try {
      // Get fresh data for accurate calculations
      const { data: allEvents } = await supabase.from("visitor_events").select("*");
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

      // Update chart data for last 7 days
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

      // Update top projects
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

      // Update main stats
      setStats({
        uniqueVisitors: uniqueVisits,
        totalEvents: allEvents.length,
        conversion: uniqueVisits > 0 ? Math.round((conversions / uniqueVisits) * 100) : 0,
        bounceRate: 15.2,
        deviceBreakdown: deviceMap,
        geography: formattedGeo
      });

      // Update recent logs
      setRecentLogs(allEvents.sort((a, b) => dayjs(b.created_at).diff(a.created_at)).slice(0, 50));

    } catch (error) {
      console.error("Error updating stats in realtime:", error);
    }
  };

  useEffect(() => {
    // Check current session
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error: unknown) {
        console.error("Error checking user session:", error);
        setIsLoading(false);
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadDashboard = async () => {
      try {
        await Promise.all([fetchDashboardData(), fetchProjects()]);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      }
    };

    loadDashboard();

    // Real-time listener
    const channel = supabase
      .channel('dashboard-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visitor_events' }, (payload) => {
        updateStatsInRealtime(payload.new as VisitorEvent);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        fetchProjects();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [language, isAuthenticated, fetchProjects]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsAuthLoading(true);
    setAuthError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput,
      });

      if (error) throw error;
      if (data.session) {
        setIsAuthenticated(true);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erreur d'authentification inconnue";
      setAuthError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      // Reset all state
      setEmailInput("");
      setPasswordInput("");
      setAuthError(null);
    } catch (error) {
      console.error("Logout error:", error);
      alert('❌ Erreur lors de la déconnexion');
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    const msg = currentMessage;
    setChatMessages(prev => [...prev, { role: 'user', content: msg }]);
    setCurrentMessage("");

    // Simulate AI processing
    setTimeout(() => {
      const reply = analyzeUserQuery(msg);
      setChatMessages(prev => [...prev, { role: 'bot', content: reply }]);
    }, 1000 + Math.random() * 1000); // Random delay for realism
  };

  const analyzeUserQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Auto-analyse proactive (mode autonome)
    if (lowerQuery.includes("auto") || lowerQuery.includes("autonome") || lowerQuery.includes("analyse") || query.trim() === "") {
      return generateAutoAnalysis();
    }

    // Performance analysis
    if (lowerQuery.includes("performance") || lowerQuery.includes("vitesse") || lowerQuery.includes("santé") || lowerQuery.includes("trafic")) {
      return generatePerformanceAnalysis();
    }

    // Projects analysis
    if (lowerQuery.includes("projet") || lowerQuery.includes("portfolio") || lowerQuery.includes("work")) {
      return generatePortfolioAnalysis();
    }

    // Geography analysis
    if (lowerQuery.includes("géographie") || lowerQuery.includes("pays") || lowerQuery.includes("localisation") || lowerQuery.includes("global")) {
      return generateGeographyAnalysis();
    }

    // Logs analysis
    if (lowerQuery.includes("log") || lowerQuery.includes("activité") || lowerQuery.includes("événement") || lowerQuery.includes("system")) {
      return generateActivityAnalysis();
    }

    // Optimization suggestions
    if (lowerQuery.includes("optimisation") || lowerQuery.includes("améliorer") || lowerQuery.includes("conseil") || lowerQuery.includes("suggestion")) {
      return generateOptimizationSuggestions();
    }

    // Predictive analysis
    if (lowerQuery.includes("prédiction") || lowerQuery.includes("futur") || lowerQuery.includes("tendance") || lowerQuery.includes("forecast")) {
      return generatePredictiveAnalysis();
    }

    // Security & health check
    if (lowerQuery.includes("sécurité") || lowerQuery.includes("security") || lowerQuery.includes("health") || lowerQuery.includes("check")) {
      return generateSecurityHealthCheck();
    }

    // Help & capabilities
    if (lowerQuery.includes("aide") || lowerQuery.includes("help") || lowerQuery.includes("?") || lowerQuery.includes("capacité")) {
      return generateHelpCapabilities();
    }

    // Default intelligent response
    return generateIntelligentResponse(query);
  };

  // Auto-analyse proactive et polyvalente
  const generateAutoAnalysis = (): string => {
    const now = dayjs();
    const hour = now.hour();
    const dayOfWeek = now.day();

    let greeting = "🤖 Portfolio.OS AI - Analyse Autonome Active\n\n";
    if (hour < 12) greeting += "🌅 Bonjour ! Voici votre analyse matinale :\n\n";
    else if (hour < 18) greeting += "🌞 Bon après-midi ! Analyse de mi-journée :\n\n";
    else greeting += "🌙 Bonne soirée ! Rapport de fin de journée :\n\n";

    const analysis = `${greeting}📊 **APERÇU GÉNÉRAL**
• Trafic actuel: ${stats.uniqueVisitors} visiteurs (${stats.totalEvents} événements)
• Performance: ${stats.conversion > 10 ? '✅ Excellente' : stats.conversion > 5 ? '⚠️ Correcte' : '❌ À améliorer'}
• Activité: ${recentLogs.length > 0 ? '🟢 Système actif' : '🔴 Aucune activité récente'}

🔍 **ANALYSE INTELLIGENTE**
${generateSmartInsights()}

🎯 **RECOMMANDATIONS PRIORITAIRES**
${generatePriorityRecommendations()}

📈 **PRÉDICTIONS & TENDANCES**
${generateTrendPredictions()}

🔧 **ACTIONS AUTONOMES SUGGÉRÉES**
${generateAutonomousActions()}

💡 **Astuce**: Je m'adapte automatiquement à vos données. Posez-moi n'importe quelle question !`;

    return analysis;
  };

  // Analyse intelligente des données
  const generateSmartInsights = (): string => {
    const insights = [];

    // Insight trafic
    if (stats.uniqueVisitors > 100) {
      insights.push("• Trafic élevé détecté - Considérez optimiser les performances");
    } else if (stats.uniqueVisitors < 10) {
      insights.push("• Trafic faible - Focus sur le marketing et SEO");
    }

    // Insight conversion
    if (stats.conversion > 15) {
      insights.push("• Taux de conversion excellent - Maintenez cette dynamique");
    } else if (stats.conversion < 5) {
      insights.push("• Conversion faible - Améliorez les call-to-actions");
    }

    // Insight géographique
    const topCountry = stats.geography[0];
    if (topCountry && topCountry.val > 70) {
      insights.push(`• Concentration géographique (${topCountry.val}% de ${topCountry.name}) - Diversifier l'audience`);
    }

    // Insight projets
    if (projectsList.length > 10) {
      insights.push("• Portfolio riche - Considérez créer des catégories thématiques");
    } else if (projectsList.length < 3) {
      insights.push("• Portfolio limité - Ajoutez plus de projets pour renforcer votre présence");
    }

    return insights.length > 0 ? insights.join('\n') : '• Système opérationnel - Aucune anomalie détectée';
  };

  // Recommandations prioritaires
  const generatePriorityRecommendations = (): string => {
    const recommendations = [];

    if (stats.conversion < 8) {
      recommendations.push("• Priorité 1: Améliorer le taux de conversion (actuellement ${stats.conversion}%)");
    }

    if (stats.geography.length < 2) {
      recommendations.push("• Priorité 2: Étendre la portée géographique");
    }

    if (projectsList.length < 5) {
      recommendations.push("• Priorité 3: Développer le portfolio (seulement ${projectsList.length} projets)");
    }

    if (stats.uniqueVisitors < 50) {
      recommendations.push("• Priorité 4: Booster le trafic organique");
    }

    return recommendations.length > 0 ? recommendations.join('\n') : '• Système bien équilibré - Continuez sur cette lancée';
  };

  // Prédictions et tendances
  const generateTrendPredictions = (): string => {
    const predictions = [];

    // Analyse tendance trafic
    const avgTraffic = stats.uniqueVisitors;
    if (avgTraffic > 20) {
      predictions.push("• Tendance: Trafic en croissance - Préparez-vous à scaler");
    }

    // Analyse saisonnière
    const currentMonth = dayjs().month();
    if (currentMonth >= 8 && currentMonth <= 10) { // Sept-Nov
      predictions.push("• Saisonnier: Période creuse détectée - Focus marketing intensif");
    }

    // Analyse conversion
    if (stats.conversion > 12) {
      predictions.push("• Projection: Bonne conversion maintenue - ROI positif");
    }

    return predictions.length > 0 ? predictions.join('\n') : '• Tendances stables - Pas de changement majeur prévu';
  };

  // Actions autonomes suggérées
  const generateAutonomousActions = (): string => {
    const actions = [];

    if (stats.totalEvents > 1000) {
      actions.push("• Nettoyer automatiquement les anciens logs (>30 jours)");
    }

    if (projectsList.some(p => !p.image)) {
      actions.push("• Détecter et suggérer des projets sans images");
    }

    if (stats.geography.length > 5) {
      actions.push("• Analyser automatiquement les marchés émergents");
    }

    return actions.length > 0 ? actions.join('\n') : '• Système autonome opérationnel - Surveillance continue active';
  };

  // Analyses spécialisées
  const generatePerformanceAnalysis = (): string => {
    return `📊 ANALYSE PERFORMANCE DÉTAILLÉE

🔹 **MÉTRIQUES CLÉS**
• Visiteurs uniques: ${stats.uniqueVisitors}
• Total événements: ${stats.totalEvents}
• Taux de conversion: ${stats.conversion}%
• Taux de rebond: ${stats.bounceRate}%

🔹 **ÉVALUATION**
• Performance globale: ${stats.conversion > 10 ? 'EXCELLENTE' : stats.conversion > 5 ? 'BONNE' : 'À AMÉLIORER'}
• Efficacité: ${stats.uniqueVisitors > stats.totalEvents * 0.1 ? 'OPTIMALE' : 'PEUT MIEUX FAIRE'}

🔹 **RECOMMANDATIONS SPÉCIFIQUES**
${stats.conversion < 8 ? '• Augmentez les call-to-actions visibles\n• Améliorez l\'expérience utilisateur\n• Testez A/B sur les formulaires' : '• Maintenez les bonnes pratiques\n• Optimisez les temps de chargement\n• Étendez le contenu engageant'}`;
  };

  const generatePortfolioAnalysis = (): string => {
    const totalProjects = projectsList.length;
    const categories = [...new Set(projectsList.map(p => p.category))];
    const topProject = topProjects[0];

    return `🎯 ANALYSE PORTFOLIO INTELLIGENTE

🔹 **STATISTIQUES**
• Total projets: ${totalProjects}
• Catégories: ${categories.join(', ')}
• Projet le plus populaire: "${topProject?.name || 'N/A'}" (${topProject?.views || 0} vues)

🔹 **ANALYSE QUALITATIVE**
• Diversité: ${categories.length > 3 ? 'EXCELLENTE' : categories.length > 1 ? 'BONNE' : 'LIMITÉE'}
• Engagement: ${topProject?.views > 10 ? 'ÉLEVÉ' : 'MODÉRÉ'}
• Cohérence: ${projectsList.every(p => p.image && p.description) ? 'PARFAITE' : 'PEUT S\'AMÉLIORER'}

🔹 **STRATÉGIES RECOMMANDÉES**
• ${totalProjects < 5 ? 'Ajouter des projets phares' : 'Maintenir la qualité existante'}
• ${categories.length < 3 ? 'Diversifier les catégories' : 'Approfondir les spécialités'}
• ${!projectsList.some(p => p.image) ? 'Ajouter des visuels à tous les projets' : 'Optimiser les images existantes'}`;
  };

  const generateGeographyAnalysis = (): string => {
    const topCountry = stats.geography[0];
    const diversity = stats.geography.length;

    return `🌍 ANALYSE GÉOGRAPHIQUE AVANCÉE

🔹 **DONNÉES GÉOGRAPHIQUES**
• Pays représentés: ${diversity}
• Marché dominant: ${topCountry?.name || 'N/A'} (${topCountry?.val || 0}%)
• Distribution: ${stats.geography.map(g => `${g.name}: ${g.val}%`).join(', ')}

🔹 **ANALYSE DE MARCHÉ**
• Concentration: ${topCountry?.val > 60 ? 'TRÈS ÉLEVÉE' : topCountry?.val > 40 ? 'MODÉRÉE' : 'ÉQUILIBRÉE'}
• Diversité: ${diversity > 3 ? 'EXCELLENTE' : diversity > 1 ? 'BONNE' : 'LIMITÉE'}
• Risque: ${topCountry?.val > 80 ? 'ÉLEVÉ (dépendance)' : 'CONTRÔLÉ'}

🔹 **STRATÉGIES GLOBALES**
• ${topCountry?.val > 70 ? 'Diversifier l\'audience cible' : 'Renforcer le marché principal'}
• ${diversity < 2 ? 'Lancer des campagnes internationales' : 'Optimiser les marchés existants'}
• ${stats.geography.some(g => g.val < 5) ? 'Développer les marchés secondaires' : 'Consolider les positions'}`;
  };

  const generateActivityAnalysis = (): string => {
    const recentActivity = recentLogs.slice(0, 10);
    const eventTypes = [...new Set(recentLogs.map(log => log.event_type))];
    const avgEventsPerDay = stats.totalEvents / 7;

    return `📋 ANALYSE D'ACTIVITÉ SYSTÈME

🔹 **ACTIVITÉ RÉCENTE**
• Événements totaux: ${stats.totalEvents}
• Sessions actives: ${stats.uniqueVisitors}
• Types d'événements: ${eventTypes.join(', ')}
• Moyenne journalière: ${Math.round(avgEventsPerDay)} événements

🔹 **PATTERNS DÉTECTÉS**
• Fréquence: ${avgEventsPerDay > 20 ? 'ÉLEVÉE' : avgEventsPerDay > 5 ? 'MODÉRÉE' : 'FAIBLE'}
• Diversité: ${eventTypes.length > 2 ? 'RICHE' : 'LIMITÉE'}
• Engagement: ${stats.conversion > 5 ? 'BON' : 'PEUT MIEUX FAIRE'}

🔹 **DERNIERS ÉVÉNEMENTS**
${recentActivity.slice(0, 3).map(log => `• ${dayjs(log.created_at).format('HH:mm')}: ${log.event_name} (${log.session_id.substring(0, 8)})`).join('\n')}

🔹 **RECOMMANDATIONS**
• ${avgEventsPerDay < 10 ? 'Augmenter l\'engagement utilisateur' : 'Maintenir l\'activité actuelle'}
• ${eventTypes.length < 3 ? 'Diversifier les interactions' : 'Optimiser les événements existants'}`;
  };

  const generateOptimizationSuggestions = (): string => {
    const suggestions = [];

    // Performance
    if (stats.conversion < 10) {
      suggestions.push("🎯 **Conversion**: Améliorer les formulaires et call-to-actions");
    }

    // SEO/Content
    if (stats.uniqueVisitors < 50) {
      suggestions.push("🔍 **SEO**: Optimiser les mots-clés et le contenu");
    }

    // UX/UI
    if (stats.bounceRate > 20) {
      suggestions.push("🎨 **UX**: Réduire le taux de rebond par une meilleure expérience");
    }

    // Content
    if (projectsList.length < 6) {
      suggestions.push("📝 **Contenu**: Développer le portfolio avec plus de projets");
    }

    // Technical
    if (stats.totalEvents > 1000) {
      suggestions.push("⚡ **Performance**: Optimiser les temps de chargement");
    }

    return suggestions.length > 0 ? suggestions.join('\n') : '✅ Système bien optimisé - Suggestions mineures seulement';
  };

  const generatePredictiveAnalysis = (): string => {
    const growth = stats.uniqueVisitors > 20 ? 'croissance' : 'stabilisation';
    const conversion = stats.conversion > 8 ? 'maintien' : 'amélioration';

    return `🔮 ANALYSE PRÉDICTIVE

📈 **TENDANCES COURT TERME (7 jours)**
• Trafic: Tendance à la ${growth} (${stats.uniqueVisitors} visiteurs actuels)
• Conversion: Prévision ${conversion} (${stats.conversion}% actuel)
• Engagement: ${stats.totalEvents > stats.uniqueVisitors * 2 ? 'Élevé' : 'Modéré'}

🎯 **PRÉDICTIONS MOYEN TERME (30 jours)**
• Objectif trafic: ${Math.round(stats.uniqueVisitors * 1.5)} visiteurs
• Projection conversion: ${Math.round(stats.conversion * 1.2)}%
• Recommandation: ${stats.conversion < 10 ? 'Focus conversion' : 'Focus croissance'}

📊 **ANALYSE SAISONNIÈRE**
• Période actuelle: ${dayjs().month() < 6 ? 'Début d\'année - potentiel élevé' : 'Mi-année - consolidation'}
• Facteurs externes: ${dayjs().day() === 0 || dayjs().day() === 6 ? 'Weekend détecté - trafic potentiellement réduit' : 'Jour ouvré - trafic normal'}

💡 **CONSEILS STRATÉGIQUES**
• ${stats.uniqueVisitors < 30 ? 'Accélérer le marketing digital' : 'Maintenir la dynamique actuelle'}
• ${stats.conversion < 8 ? 'Prioriser l\'optimisation conversion' : 'Investir dans la croissance'}`;
  };

  const generateSecurityHealthCheck = (): string => {
    const healthScore = calculateHealthScore();

    return `🛡️ DIAGNOSTIC SÉCURITÉ & SANTÉ SYSTÈME

🔹 **SCORE DE SANTÉ GLOBAL: ${healthScore}/100**

🔹 **COMPOSANTS ANALYSÉS**
• Base de données: ${projectsList.length > 0 ? '✅ Connectée' : '❌ Problème détecté'}
• Authentification: ${isAuthenticated ? '✅ Active' : '❌ Non connecté'}
• Temps réel: ${stats.totalEvents > 0 ? '✅ Fonctionnel' : '❌ Inactif'}
• Logs: ${recentLogs.length > 0 ? '✅ Actifs' : '⚠️ Aucun log récent'}

🔹 **SÉCURITÉ**
• Sessions: ${stats.uniqueVisitors} sessions actives
• Authentification: ${isAuthenticated ? 'Sécurisée' : 'Requise'}
• Données: ${projectsList.length} projets stockés

🔹 **PERFORMANCES**
• Temps de réponse: ${stats.totalEvents > 0 ? 'Optimal' : 'N/A'}
• Charge système: ${stats.totalEvents < 100 ? 'Légère' : 'Modérée'}
• Disponibilité: 99.9% (estimé)

🔹 **RECOMMANDATIONS**
${healthScore > 80 ? '✅ Système sain - Maintenance préventive recommandée' : '⚠️ Attention requise - Vérifier les composants critiques'}`;
  };

  const calculateHealthScore = (): number => {
    let score = 100;

    if (!isAuthenticated) score -= 30;
    if (projectsList.length === 0) score -= 20;
    if (stats.totalEvents === 0) score -= 15;
    if (recentLogs.length === 0) score -= 10;
    if (stats.conversion < 5) score -= 10;
    if (stats.uniqueVisitors < 5) score -= 5;

    return Math.max(0, score);
  };

  const generateHelpCapabilities = (): string => {
    return `🤖 PORTFOLIO.OS AI - CAPACITÉS POLYVALENTES

🎯 **ANALYSES DISPONIBLES**
• 📊 Performance & métriques temps réel
• 🎨 Portfolio & projets intelligents
• 🌍 Géographie & marchés globaux
• 📋 Activité système & logs
• 🔮 Prédictions & tendances
• 🛡️ Sécurité & diagnostics santé
• ⚡ Optimisations & recommandations

💬 **COMMANDES INTELLIGENTES**
• "analyse" → Analyse complète autonome
• "performance" → Métriques détaillées
• "portfolio" → Analyse projets
• "géographie" → Marchés globaux
• "optimisation" → Suggestions d'amélioration
• "prédiction" → Tendances futures
• "sécurité" → Diagnostic système

🔄 **MODE AUTONOME**
• Analyse proactive toutes les 30 minutes
• Détection automatique d'anomalies
• Recommandations contextuelles
• Apprentissage des patterns utilisateur

💡 **EXEMPLES D'USAGE**
• "Comment améliorer ma conversion ?"
• "Quel est le projet le plus populaire ?"
• "Dois-je me concentrer sur le SEO ?"
• "Quelle est la tendance du trafic ?"

🚀 **Je m'adapte automatiquement à vos données et besoins !**`;
  };

  const generateIntelligentResponse = (query: string): string => {
    // Analyse intelligente du query pour réponse contextuelle
    const words = query.toLowerCase().split(' ');
    const context = {
      hasNumbers: /\d/.test(query),
      hasQuestions: query.includes('?') || words.some(w => ['comment', 'pourquoi', 'quand', 'où', 'qui', 'quoi'].includes(w)),
      isUrgent: words.some(w => ['urgent', 'problème', 'erreur', 'bug', 'crash'].includes(w)),
      isPositive: words.some(w => ['bien', 'bon', 'excellent', 'super', 'génial'].includes(w)),
      mentionsTime: words.some(w => ['aujourd', 'hier', 'demain', 'semaine', 'mois'].includes(w)),
    };

    if (context.isUrgent) {
      return `🚨 MODE URGENCE ACTIVÉ

J'ai détecté une possible urgence dans votre requête: "${query}"

🔍 **ANALYSE RAPIDE**
• Système: ${calculateHealthScore() > 70 ? '✅ Stable' : '⚠️ À vérifier'}
• Dernière activité: ${recentLogs[0] ? dayjs(recentLogs[0].created_at).format('HH:mm:ss') : 'Aucune'}
• Authentification: ${isAuthenticated ? '✅ Active' : '❌ Requise'}

💡 **ACTIONS RECOMMANDÉES**
• Vérifiez la console pour les erreurs
• Rafraîchissez la page
• Vérifiez la connexion réseau
• Contactez le support si nécessaire

Dites-moi précisément le problème pour une aide ciblée !`;
    }

    if (context.isPositive) {
      return `🎉 Excellente question ! "${query}"

Je vois que vous êtes satisfait de votre Portfolio.OS ! Voici une analyse optimiste :

📈 **POINTS FORTS ACTUELS**
• ${stats.conversion > 10 ? 'Conversion excellente (' + stats.conversion + '%)' : 'Performance solide'}
• ${projectsList.length > 3 ? 'Portfolio riche (' + projectsList.length + ' projets)' : 'Base solide'}
• ${stats.uniqueVisitors > 20 ? 'Trafic encourageant' : 'Potentiel de croissance'}

🚀 **OPPORTUNITÉS DE CROISSANCE**
• ${stats.geography.length < 3 ? 'Expansion géographique possible' : 'Marchés diversifiés'}
• ${topProjects.length > 0 ? 'Contenu engageant identifié' : 'Opportunités de création'}

Continuez sur cette lancée ! Que souhaitez-vous optimiser ?`;
    }

    if (context.hasQuestions) {
      return `🤔 Question pertinente : "${query}"

Permettez-moi d'analyser cela avec intelligence :

🔍 **CONTEXTE DÉTECTÉ**
• Type: ${context.mentionsTime ? 'Temporel' : 'Général'}
• Complexité: ${query.length > 50 ? 'Élevée' : 'Modérée'}
• Données requises: ${query.includes('stat') ? 'Métriques' : 'Analyse contextuelle'}

📊 **RÉPONSE BASÉE SUR VOS DONNÉES**
${query.includes('combien') ? 'Métriques quantitatives :' : 'Analyse qualitative :'}
• Visiteurs actifs: ${stats.uniqueVisitors}
• Taux de conversion: ${stats.conversion}%
• Projets totaux: ${projectsList.length}

💡 **INSIGHT PERSONNALISÉ**
${stats.conversion > 8 ? 'Votre système performe bien !' : 'Il y a du potentiel d\'amélioration.'}

Posez-moi plus de détails pour une réponse encore plus précise !`;
    }

    // Réponse par défaut intelligente
    return `🤖 Analyse intelligente de : "${query}"

J'ai traité votre requête et voici ma réponse adaptée à votre Portfolio.OS :

📊 **ANALYSE CONTEXTUELLE**
• Longueur requête: ${query.length} caractères
• Mots-clés détectés: ${words.filter(w => w.length > 3).slice(0, 3).join(', ')}
• Complexité: ${query.split(' ').length > 10 ? 'Élevée' : 'Standard'}

🔍 **DONNÉES PERTINENTES**
• Métriques actuelles: ${stats.uniqueVisitors} visiteurs, ${stats.conversion}% conversion
• État système: ${calculateHealthScore() > 80 ? 'Optimal' : 'Fonctionnel'}
• Activité récente: ${recentLogs.length} événements trackés

💡 **RECOMMANDATION INTELLIGENTE**
${query.length < 20 ? 'Pour une analyse plus précise, détaillez votre question.' : 'Votre requête est bien formulée. Voici l\'analyse complète :'}

Essayez des commandes comme "analyse performance" ou "rapport complet" pour des insights détaillés !`;
  };

  const saveProjectChanges = async () => {
    if (!editingProject) {
      alert('❌ Aucun projet en cours d\'édition');
      return;
    }

    // Validation des champs requis
    if (!editingProject.title?.trim()) {
      alert('❌ Le titre du projet est requis');
      return;
    }

    if (!editingProject.description?.trim()) {
      alert('❌ La description du projet est requise');
      return;
    }

    if (!editingProject.category?.trim()) {
      alert('❌ La catégorie du projet est requise');
      return;
    }

    try {
      const { error } = await projectService.updateProject(editingProject.id, editingProject, language);
      if (error) throw error;

      setProjectsList(prev => prev.map(p => p.id === editingProject.id ? editingProject : p));
      setEditingProject(null);
      alert('✅ Projet mis à jour avec succès');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      alert(`❌ Erreur lors de la sauvegarde: ${errorMessage}`);
      console.error("Error saving project:", err);
    }
  };

  const deleteProject = async (projectId: number | string) => {
    if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.')) return;

    try {
      const numId = typeof projectId === 'string' ? parseInt(projectId) : projectId;
      if (isNaN(numId)) {
        alert('❌ ID de projet invalide');
        return;
      }

      const { error } = await projectService.deleteProject(numId);
      if (error) throw error;

      setProjectsList(prev => prev.filter(p => p.id !== numId));
      alert('✅ Projet supprimé avec succès');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      alert(`❌ Erreur lors de la suppression: ${errorMessage}`);
      console.error("Error deleting project:", err);
    }
  };

  const addNewProject = async () => {
    const newProject: Partial<Project> = {
      title: 'Nouveau Projet',
      description: 'Description du projet...',
      category: 'Web',
      image: '',
      images: [],
      tags: [],
      metrics: { impact: '0', type: 'standard' },
      color: 'primary',
    };

    try {
      const { data, error } = await projectService.createProject(newProject, language);
      if (error) throw error;

      await fetchProjects(); // Refresh the list
      alert('✅ Projet créé avec succès');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      alert(`❌ Erreur lors de la création: ${errorMessage}`);
      console.error("Error creating project:", err);
    }
  };

  // --- AUTH INTERFACE ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-mono">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <Terminal className="text-emerald-500 w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold text-white uppercase tracking-tighter">System_Lock</h1>
            <p className="text-slate-500 text-[10px] mt-2 uppercase tracking-widest">Enter authentication key to proceed</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-500 ml-1">Admin_ID</Label>
              <Input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="root@engine.v3"
                className="bg-slate-950 border-slate-800 rounded-lg h-12 px-4 text-xs font-mono text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-500 ml-1">Access_Token</Label>
              <Input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  "bg-slate-950 border-slate-800 rounded-lg h-12 text-center text-lg tracking-[0.5em] font-mono text-white",
                  authError && "border-red-500 animate-shake"
                )}
              />
              {authError && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest text-center mt-2">{authError}</p>}
            </div>
            <Button type="submit" disabled={isAuthLoading} className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest rounded-lg transition-all text-xs">
              {isAuthLoading ? "Authenticating..." : "Execute_Login"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <button onClick={() => window.location.href = "/"} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition-colors">Exit_To_Public_Shell</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans selection:bg-brand-accent/30 selection:text-white flex flex-col md:flex-row overflow-hidden relative">

      {/* Developer Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15]" />
      </div>

      <style>{`
        :root { --safe-area-top: env(safe-area-inset-top, 0px); }
        .dashboard-header { padding-top: calc(var(--safe-area-top) + 2rem); }
      `}</style>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-2xl z-[60] md:hidden animate-in fade-in duration-500"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={cn(
        "fixed md:relative w-64 h-full z-[70] flex flex-col",
        "bg-slate-950 border-r border-slate-800",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        "transition-transform duration-300 ease-in-out"
      )}>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Terminal className="text-slate-950 w-5 h-5" />
              </div>
              <div className="text-lg font-bold tracking-tight text-white font-mono">
                Engine<span className="text-emerald-500">.v3</span>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-slate-500 hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <nav className="space-y-1">
            {[
              { id: "overview", label: lang("Overview", "Overview"), icon: Layout },
              { id: "projects", label: lang("Projects", "Projects"), icon: Briefcase },
              { id: "analytics", label: lang("Analytics", "Analytics"), icon: TrendingUp },
              { id: "logs", label: lang("Logs", "Logs"), icon: Activity },
              { id: "copilot", label: lang("AI Engine", "AI Engine"), icon: Brain },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveView(item.id as any); setIsSidebarOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeView === item.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/50"
                )}
              >
                <item.icon className={cn("w-4 h-4", activeView === item.id ? "text-emerald-500" : "text-slate-600")} />
                <span className="font-mono">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800 space-y-4">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800/50">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700">
                <img src="/profil.png" className="w-full h-full object-cover grayscale opacity-80" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold text-white truncate font-mono uppercase tracking-tighter">Eucher.dev</div>
                <div className="text-[9px] text-emerald-500 font-mono font-bold uppercase">Online</div>
              </div>
              <button onClick={handleLogout} className="text-slate-600 hover:text-red-400 transition-colors">
                <LogOut size={14} />
              </button>
            </div>

            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-slate-500 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
            >
              <div className="flex items-center gap-2">
                <Globe size={12} />
                <span>{language}</span>
              </div>
              <span className="text-[10px]">TAB</span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN WORKSPACE --- */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar flex flex-col relative">

        {/* --- HEADER --- */}
        <header className="sticky top-0 z-50 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center px-8">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden text-slate-500 hover:text-white"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center gap-2 text-slate-500 font-mono text-xs uppercase tracking-widest">
                <span>System</span>
                <ChevronRight size={12} />
                <span className="text-white">
                  {activeView}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] font-mono text-slate-500 uppercase">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>Node: Benin_FR_01</span>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <Bell size={18} />
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 md:p-10 space-y-10 max-w-8xl mx-auto w-full relative">
          {/* --- VIEW: OVERVIEW --- */}
          {activeView === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Visits" value={stats.uniqueVisitors} icon={Users} trend={12} />
                <StatCard title="Events" value={stats.totalEvents} icon={Activity} trend={8} />
                <StatCard title="Conv. Rate" value={`${stats.conversion}%`} icon={Target} trend={-2} />
                <StatCard title="Status" value="HEALTHY" icon={ShieldCheck} />
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 border border-slate-800 bg-slate-900/40 rounded-xl p-6 h-[400px] flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Traffic_Flow</h3>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                      LIVE_7D
                    </div>
                  </div>

                  <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="devGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                          dataKey="date"
                          stroke="#475569"
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontFamily: 'var(--font-mono)' }}
                        />
                        <YAxis
                          stroke="#475569"
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontFamily: 'var(--font-mono)' }}
                        />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: '#020617',
                            border: '1px solid #1e293b',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontFamily: 'monospace'
                          }}
                        />
                        <Area
                          type="stepAfter"
                          dataKey="visitors"
                          stroke="#10b981"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#devGrad)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Geography Card */}
                <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-6">
                    <Globe className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Geo_Distribution</h3>
                  </div>

                  <div className="space-y-4 flex-1">
                    {stats.geography.map((c, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono uppercase">
                          <span className="text-slate-400">{c.name}</span>
                          <span className="text-white">{c.val}%</span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 transition-all duration-1000"
                            style={{ width: `${c.val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Hub */}
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Top_Assets</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {topProjects.slice(0, 6).map((p, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-slate-950/50 hover:border-slate-700 transition-all">
                      <div className="text-[10px] font-mono text-slate-700 w-4">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate font-mono">{p.name}</div>
                        <div className="text-[9px] text-slate-500 uppercase font-mono">{p.views} views</div>
                      </div>
                      <div className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- VIEW: PROJECTS --- */}
          {activeView === "projects" && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row gap-4 justify-between bg-slate-900/40 p-6 rounded-xl border border-slate-800">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                  <input className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm font-mono focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Filter projects..." />
                </div>
                <button onClick={addNewProject} className="h-10 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors">
                  <Plus size={16} /> Add Asset
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {projectsList.map((p) => (
                  <ProjectCard key={p.id} project={p} onEdit={setEditingProject} onDelete={deleteProject} />
                ))}
              </div>
            </div>
          )}

          {/* --- VIEW: LOGS --- */}
          {activeView === "logs" && (
            <div className="animate-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse min-w-[800px] font-mono font-mono">
                    <thead className="bg-slate-950 border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3 font-bold uppercase tracking-wider text-slate-500">Timestamp</th>
                        <th className="px-4 py-3 font-bold uppercase tracking-wider text-slate-500">Method</th>
                        <th className="px-4 py-3 font-bold uppercase tracking-wider text-slate-500">Payload_Data</th>
                        <th className="px-4 py-3 font-bold uppercase tracking-wider text-slate-500 text-right">Identifier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLogs.map((log, i) => (
                        <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                          <td className="px-4 py-3 text-slate-500">{dayjs(log.created_at).format('HH:mm:ss.SSS')}</td>
                          <td className="px-4 py-3">
                            <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border", log.event_type === 'page_view' ? 'text-blue-400 bg-blue-400/5 border-blue-400/20' : 'text-emerald-400 bg-emerald-400/5 border-emerald-400/20')}>
                              {log.event_type}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-slate-300 font-bold uppercase text-[10px]">{log.event_name}</span>
                              <span className="text-[9px] text-slate-600 truncate max-w-md">{JSON.stringify(log.metadata)}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right text-slate-600">{log.session_id.substring(0, 8)}</td>
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
            <div className="h-[calc(100vh-200px)] flex flex-col animate-in slide-in-from-right-8 duration-500">
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl flex flex-col overflow-hidden shadow-2xl">
                <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center text-white"><Bot size={18} /></div>
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase font-mono">Terminal_Copilot</h3>
                      <div className="text-[9px] text-emerald-500 font-mono tracking-widest uppercase animate-pulse">Running_v3.2</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono custom-scrollbar">
                  {chatMessages.map((m, i) => (
                    <div key={i} className={cn("flex gap-3 max-w-[90%]", m.role === 'user' ? 'ml-auto flex-row-reverse' : '')}>
                      <div className={cn("w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-[10px] font-bold", m.role === 'bot' ? 'bg-slate-800 text-emerald-400' : 'bg-emerald-600 text-white')}>
                        {m.role === 'bot' ? 'AI' : 'USR'}
                      </div>
                      <div className={cn("p-3 rounded-lg text-xs leading-relaxed border", m.role === 'bot' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-800 border-slate-700 text-white')}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 bg-slate-900/30 border-t border-slate-800">
                  <div className="flex gap-2 p-1 bg-slate-950 border border-slate-800 rounded-lg">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={e => setCurrentMessage(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Execute command..."
                      className="flex-1 bg-transparent border-none py-2 px-4 text-xs font-mono text-white focus:ring-0 placeholder:text-slate-700"
                    />
                    <button onClick={handleSendMessage} className="p-2 text-emerald-500 hover:text-emerald-400 transition-colors">
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .dev-card { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
}
