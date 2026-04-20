import { useState } from "react";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { LiveGlobe } from "@/components/admin/LiveGlobe";
import { VisitorDetailPanel } from "@/components/admin/VisitorDetailPanel";
import { VisitsChart } from "./VisitsChart";
import { HeatmapSections } from "./HeatmapSections";

type Period = "today" | "7days" | "30days";

export function AnalyticsDashboard() {
  const [period, setPeriod] = useState<Period>("7days");
  const {
    activeVisitors,
    globePoints,
    loading,
    selectedVisitor,
    setSelectedVisitor,
  } = useVisitorTracking();

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Chargement des analytics...</div>;
  }

  return (
    <div className="space-y-6 relative">
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Visiteurs actifs" value={activeVisitors.length} />
        <StatCard
          label="Pages vues (aujd)"
          value={activeVisitors.reduce((sum, v) => sum + v.pagesVisited, 0)}
        />
        <StatCard
          label="Clics (aujd)"
          value={activeVisitors.reduce((sum, v) => sum + v.clicksCount, 0)}
        />
        <StatCard
          label="Sections (aujd)"
          value={activeVisitors.reduce((sum, v) => sum + v.sectionsViewed, 0)}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Globe temps réel</h3>
            <span className="text-xs text-slate-500">
              {activeVisitors.length} visiteurs actifs
            </span>
          </div>
          <LiveGlobe
            points={globePoints}
            onPointClick={setSelectedVisitor}
            selectedPointId={selectedVisitor?.id}
          />
          <p className="text-xs text-slate-500 mt-2">
            Cliquez sur un point pour voir le parcours du visiteur
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <h3 className="font-semibold mb-3">Visiteurs actifs</h3>
          <div className="max-h-[320px] overflow-auto space-y-2 pr-2">
            {activeVisitors.map((visitor) => (
              <div
                key={visitor.id}
                onClick={() => setSelectedVisitor(visitor)}
                className={`text-xs border rounded-xl p-3 cursor-pointer transition-colors ${
                  selectedVisitor?.id === visitor.id
                    ? "border-rose-500 bg-rose-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    {visitor.city || visitor.country || "Inconnu"}
                  </div>
                  <div className="text-slate-500">
                    {visitor.pagesVisited} pages
                  </div>
                </div>
                <div className="text-slate-500 mt-1">
                  {visitor.country}
                </div>
                <div className="flex gap-3 mt-2 text-xs text-slate-400">
                  <span>👆 {visitor.clicksCount}</span>
                  <span>📑 {visitor.sectionsViewed}</span>
                  <span>🕐 {visitor.lastPage}</span>
                </div>
              </div>
            ))}
            {activeVisitors.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                Aucun visiteur actif pour le moment
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Visites</h3>
          <div className="flex gap-1">
            {(["today", "7days", "30days"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 text-xs rounded-lg ${
                  period === p
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {p === "today" ? "Aujourd'hui" : p === "7days" ? "7 jours" : "30 jours"}
              </button>
            ))}
          </div>
        </div>
        <VisitsChart period={period} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <h3 className="font-semibold mb-4">Sections les plus consultées</h3>
        <HeatmapSections />
      </div>

      <VisitorDetailPanel
        visitor={selectedVisitor}
        onClose={() => setSelectedVisitor(null)}
      />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}