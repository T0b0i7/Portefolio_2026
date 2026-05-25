import { useState, useCallback, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BackofficeLayout } from "@/components/backoffice/layout/BackofficeLayout";
import { BackofficeProvider, useBackofficeData } from "@/components/backoffice/BackofficeProvider";
import { KPICards } from "@/components/backoffice/dashboard/KPICards";
import { TrafficChart, TopReferrers, TopCountries } from "@/components/backoffice/dashboard/TrafficChart";
import { ActivityFeed } from "@/components/backoffice/dashboard/ActivityFeed";
import { GeoMap } from "@/components/backoffice/dashboard/GeoMap";
import { ExportButton } from "@/components/backoffice/common/ExportButton";
import { RichTextEditor } from "@/components/backoffice/cms/RichTextEditor";
import { MediaLibrary } from "@/components/backoffice/cms/MediaLibrary";
import { SectionsManager } from "@/components/backoffice/cms/SectionsManager";
import { TestimonialsManager } from "@/components/backoffice/cms/TestimonialsManager";
import { SEOSettings } from "@/components/backoffice/settings/SEOSettings";
import { NavigationEditor } from "@/components/backoffice/settings/NavigationEditor";
import { ProjectsManager } from "@/components/backoffice/cms/ProjectsManager";
import type { BackofficeTab } from "@/types/backoffice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Calendar, ExternalLink, Eye, Users, MousePointer, FileText, TrendingUp, Target } from "lucide-react";

export default function BackofficePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeBackofficeTab, setActiveBackofficeTab] = useState<BackofficeTab>("dashboard");
  const [period, setPeriod] = useState<"today" | "7days" | "30days">("7days");

  const verifyPassword = useCallback(async (pwd: string) => {
    if (!supabase) return;
    setLoading(true);
    setError(null);

    const { data, error: verifyError } = await supabase.rpc("verify_admin_password", {
      input_password: pwd
    });

    if (verifyError) {
      setError("Erreur de vérification");
      setLoading(false);
      return;
    }

    if (data === true) {
      setIsAuthenticated(true);
      setShowPasswordDialog(false);
      setPassword("");
    } else {
      setError("Mot de passe incorrect");
    }
    setLoading(false);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "m") {
      event.preventDefault();
      if (!isAuthenticated) {
        setShowPasswordDialog(true);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f5] p-4">
        <div className="text-center w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-normal tracking-[-0.5px] text-[#141413] mb-2">Backoffice</h1>
            <p className="text-sm text-[#6c6a64]">Portfolio Manager</p>
          </div>
          <p className="text-xs text-[#8e8b82] mb-6 hidden md:block">Appuie sur Ctrl+M pour accéder</p>
          <Button 
            onClick={() => setShowPasswordDialog(true)} 
            className="bg-[#cc785c] hover:bg-[#a9583e] text-white font-medium px-8 py-3 rounded-md w-full md:w-auto"
          >
            Ouvrir le panneau
          </Button>
        </div>

        <div className={`fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 ${showPasswordDialog ? '' : 'hidden'}`}>
          <div className="bg-[#faf9f5] p-6 md:p-8 rounded-xl border border-[#e6dfd8] w-full max-w-sm shadow-lg">
            <h2 className="text-xl font-serif font-normal tracking-[-0.3px] text-[#141413] mb-6">Mot de passe administrateur</h2>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    verifyPassword(password);
                  }
                }}
                className="w-full px-4 py-3 bg-white border border-[#e6dfd8] rounded-md text-[#141413] placeholder:text-[#6c6a64] text-base"
                autoFocus
              />
              {error && <p className="text-sm text-[#c64545]">{error}</p>}
              <Button 
                onClick={() => verifyPassword(password)} 
                disabled={loading || !password}
                className="w-full bg-[#cc785c] hover:bg-[#a9583e] text-white font-medium"
              >
                {loading ? "Vérification..." : "Valider"}
              </Button>
              <button
                onClick={() => setShowPasswordDialog(false)}
                className="w-full text-xs text-[#8e8b82] hover:text-[#6c6a64] transition-colors py-1"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeBackofficeTab) {
      case "dashboard":
        return <DashboardContent period={period} setPeriod={setPeriod} />;
      case "analytics":
        return <AnalyticsContent period={period} setPeriod={setPeriod} />;
      case "cms":
        return <CmsView />;
      case "projects":
        return <ProjectsView />;
      case "settings":
        return <SettingsView />;
      case "tracking":
        return <TrackingContent />;
      default:
        return <DashboardContent period={period} setPeriod={setPeriod} />;
    }
  };

  return (
    <BackofficeLayout
      activeTab={activeBackofficeTab}
      onTabChange={setActiveBackofficeTab}
      onLogout={() => setIsAuthenticated(false)}
    >
      <BackofficeProvider period={period}>
        <div className="text-slate-200">
          {renderContent()}
        </div>
      </BackofficeProvider>
    </BackofficeLayout>
  );
}

function DashboardContent({ period, setPeriod }: { period: "today" | "7days" | "30days"; setPeriod: (p: "today" | "7days" | "30days") => void }) {
  const { overview, activeVisitors, globePoints, stats, events, loading } = useBackofficeData();

  const kpis = useMemo(() => [
    { icon: <Eye className="w-5 h-5" />, label: "Pages vues (24h)", value: overview.pageViews24h.toLocaleString(), change: 5.2, trend: "up" as const },
    { icon: <Users className="w-5 h-5" />, label: "Visiteurs actifs", value: activeVisitors.length.toString(), change: 12, trend: "up" as const },
    { icon: <MousePointer className="w-5 h-5" />, label: "Clics (24h)", value: overview.clicks24h.toLocaleString(), change: -2.4, trend: "down" as const },
    { icon: <FileText className="w-5 h-5" />, label: "Sections vues", value: overview.sectionViews24h.toLocaleString(), change: 8.1, trend: "up" as const },
    { icon: <TrendingUp className="w-5 h-5" />, label: "Taux de rebond", value: "32%", change: -5, trend: "down" as const },
    { icon: <Target className="w-5 h-5" />, label: "Pages/session", value: stats.totalViews && stats.uniqueVisitors ? (stats.totalViews / stats.uniqueVisitors).toFixed(1) : "2.4", change: 0.2, trend: "up" as const },
  ], [overview, activeVisitors.length, stats]);

  const recentEvents = useMemo(() => 
    events.slice(0, 20).map(e => ({
      id: e.id,
      type: e.type === "page_view" ? "visit" as const : e.type === "click" ? "click" as const : "visit" as const,
      message: `${e.type === "page_view" ? "Page vue" : e.type === "click" ? "Clic" : "Section"}: ${e.page_path} ${e.city ? `(${e.city})` : ""}`,
      timestamp: new Date(e.occurred_at),
    })), [events]);

  if (loading) {
    return <div className="text-[#6c6a64] p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#141413]">Dashboard</h2>
          <p className="text-sm text-[#6c6a64]">Vue d'ensemble de votre portfolio</p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(["today", "7days", "30days"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-2.5 py-1.5 text-xs rounded-lg flex items-center gap-1.5 ${
                period === p
                  ? "bg-[#cc785c] text-white"
                  : "bg-[#efe9de] text-[#6c6a64] hover:bg-[#e6dfd8]"
              }`}
            >
              <Calendar className="w-3 h-3" />
              {p === "today" ? "Auj." : p === "7days" ? "7j" : "30j"}
            </button>
          ))}
        </div>
      </div>

      <KPICards data={kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <TrafficChart data={stats.hourlyTraffic} />
        <TopReferrers referrers={stats.topReferrers} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <GeoMap 
          data={globePoints.map(p => ({
            country: p.country || "",
            city: p.city || "",
            count: 1,
            lat: p.lat,
            lng: p.lng,
          }))} 
        />
        <TopCountries countries={stats.topCountries} />
        <ActivityFeed activities={recentEvents} />
      </div>
    </div>
  );
}

function AnalyticsContent({ period, setPeriod }: { period: "today" | "7days" | "30days"; setPeriod: (p: "today" | "7days" | "30days") => void }) {
  const { overview, stats, events, loading } = useBackofficeData();

  const kpis = [
    { icon: "👁", label: "Pages vues", value: stats.totalViews.toLocaleString(), change: 0, trend: "neutral" as const },
    { icon: "👤", label: "Visiteurs uniques", value: stats.uniqueVisitors.toLocaleString(), change: 0, trend: "neutral" as const },
    { icon: "⏱", label: "Clics", value: overview.clicks24h.toLocaleString(), change: 0, trend: "neutral" as const },
    { icon: "↩", label: "Sections", value: overview.sectionViews24h.toLocaleString(), change: 0, trend: "neutral" as const },
    { icon: "📄", label: "Pages/session", value: stats.totalViews && stats.uniqueVisitors ? (stats.totalViews / stats.uniqueVisitors).toFixed(1) : "N/A", change: 0, trend: "neutral" as const },
    { icon: "🎯", label: "Événements", value: events.length.toString(), change: 0, trend: "neutral" as const },
  ];

  const exportData = useMemo(() => {
    return stats.topCountries.map(c => ({ type: "country", ...c }));
  }, [stats]);

  if (loading) {
    return <div className="text-[#6c6a64] p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#141413]">Analytics</h2>
          <p className="text-sm text-[#6c6a64]">Analyse approfondie du trafic</p>
        </div>
        <div className="flex gap-1.5 flex-wrap items-center">
          {(["today", "7days", "30days"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-2.5 py-1.5 text-xs rounded-lg ${
                period === p
                  ? "bg-[#cc785c] text-white"
                  : "bg-[#efe9de] text-[#6c6a64] hover:bg-[#e6dfd8]"
              }`}
            >
              {p === "today" ? "Auj." : p === "7days" ? "7j" : "30j"}
            </button>
          ))}
          <ExportButton onExport={() => {}} data={exportData} />
        </div>
      </div>

      <KPICards data={kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <TrafficChart data={stats.hourlyTraffic} />
        <TopReferrers referrers={stats.topReferrers} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <TopCountries countries={stats.topCountries} />
        <ActivityFeed activities={events.slice(0, 10).map(e => ({
          id: e.id,
          type: e.type === "page_view" ? "visit" as const : e.type === "click" ? "click" as const : "visit" as const,
          message: `${e.type}: ${e.page_path}`,
          timestamp: new Date(e.occurred_at),
        }))} />
      </div>
    </div>
  );
}

function CmsView() {
  const [activeSubTab, setActiveSubTab] = useState<"sections" | "testimonials" | "media">("sections");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#141413]">CMS</h2>
          <p className="text-sm text-[#6c6a64]">Gestion du contenu</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-[#e6dfd8] pb-2 overflow-x-auto scrollbar-hide">
        {(["sections", "testimonials", "media"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-3 py-2 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-lg transition-all whitespace-nowrap ${
              activeSubTab === tab
                ? "bg-[#cc785c] text-white"
                : "bg-white text-[#6c6a64] border border-[#e6dfd8] hover:bg-[#faf9f5]"
            }`}
          >
            {tab === "sections" ? "Sections" : tab === "testimonials" ? "Témoignages" : "Médiathèque"}
          </button>
        ))}
      </div>

      {activeSubTab === "sections" && (
        <div className="space-y-4">
          <Card className="bg-white border-[#e6dfd8] p-6">
            <h3 className="text-[#141413] font-serif font-normal text-lg mb-4">Sections du site</h3>
            <p className="text-[#6c6a64] text-sm mb-6">Activez/désactivez, réordonnez et modifiez le contenu des sections.</p>
            <SectionsManager />
          </Card>
        </div>
      )}

      {activeSubTab === "testimonials" && <TestimonialsManager />}

      {activeSubTab === "media" && <MediaLibrary />}
    </div>
  );
}

function ProjectsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#141413]">Projets</h2>
          <p className="text-sm text-[#6c6a64]">Gestion de votre portfolio de réalisations</p>
        </div>
      </div>

      <ProjectsManager />
    </div>
  );
}

function SettingsView() {
  const [activeSubTab, setActiveSubTab] = useState<"seo" | "theme" | "navigation" | "contact">("seo");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#141413]">Settings</h2>
        <p className="text-sm text-[#6c6a64]">Configuration du site</p>
      </div>

      <div className="flex gap-1.5 border-b border-[#e6dfd8] pb-2 overflow-x-auto scrollbar-hide">
        {(["seo", "theme", "navigation", "contact"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-3 py-2 text-xs sm:text-sm rounded-lg whitespace-nowrap font-medium ${
              activeSubTab === tab
                ? "bg-[#cc785c] text-white"
                : "bg-[#efe9de] text-[#6c6a64] hover:bg-[#e6dfd8]"
            }`}
          >
            {tab === "seo" ? "SEO" : tab === "theme" ? "Thème" : tab === "navigation" ? "Navigation" : "Contact"}
          </button>
        ))}
      </div>

      {activeSubTab === "seo" && <SEOSettings />}
      {activeSubTab === "theme" && (
        <div className="bg-[#faf9f5] rounded-xl p-6 border border-[#e6dfd8]">
          <p className="text-[#6c6a64] text-sm">Paramètres du thème (couleurs, typographie)</p>
        </div>
      )}
      {activeSubTab === "navigation" && <NavigationEditor />}
      {activeSubTab === "contact" && (
        <div className="bg-[#faf9f5] rounded-xl p-6 border border-[#e6dfd8]">
          <p className="text-[#6c6a64] text-sm">Configuration du formulaire de contact</p>
        </div>
      )}
    </div>
  );
}

function TrackingContent() {
  const { overview, activeVisitors, events } = useBackofficeData();

  const kpis = [
    { icon: "👁", label: "Pages vues (24h)", value: overview.pageViews24h.toLocaleString(), change: 0, trend: "neutral" as const },
    { icon: "👤", label: "Visiteurs actifs", value: activeVisitors.length.toString(), change: 0, trend: "neutral" as const },
    { icon: "👆", label: "Clics (24h)", value: overview.clicks24h.toLocaleString(), change: 0, trend: "neutral" as const },
    { icon: "📑", label: "Sections vues", value: overview.sectionViews24h.toLocaleString(), change: 0, trend: "neutral" as const },
    { icon: "⏱", label: "Événements", value: events.length.toString(), change: 0, trend: "neutral" as const },
    { icon: "🎯", label: "Temps réel", value: "●", change: 0, trend: "up" as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#141413]">Tracking Live</h2>
        <p className="text-sm text-[#6c6a64]">Suivi des événements en temps réel</p>
      </div>

      <KPICards data={kpis} />

      <ActivityFeed activities={events.slice(0, 20).map(e => ({
        id: e.id,
        type: e.type === "page_view" ? "visit" as const : e.type === "click" ? "click" as const : "visit" as const,
        message: `${e.type === "page_view" ? "Page vue" : e.type === "click" ? "Clic" : "Section"} — ${e.page_path} (${e.city || e.country || "Inconnu"})`,
        timestamp: new Date(e.occurred_at),
        city: e.city || undefined,
        country: e.country || undefined,
      }))} />
    </div>
  );
}