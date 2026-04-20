import { useLiveAnalytics } from "@/hooks/useLiveAnalytics";
import { LiveGlobe } from "@/components/admin/LiveGlobe";

export function AnalyticsDashboard() {
  const { overview, events, globePoints, loading } = useLiveAnalytics();

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Chargement des analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Visiteurs actifs" value={overview.activeVisitors} />
        <StatCard label="Pages vues (24h)" value={overview.pageViews24h} />
        <StatCard label="Clics (24h)" value={overview.clicks24h} />
        <StatCard label="Vues sections (24h)" value={overview.sectionViews24h} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <h3 className="font-semibold mb-3">Globe temps réel</h3>
          <LiveGlobe points={globePoints} />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <h3 className="font-semibold mb-3">Flux événements</h3>
          <div className="max-h-[320px] overflow-auto space-y-2 pr-2">
            {events.map((event) => (
              <div key={`${event.type}-${event.id}`} className="text-xs border border-slate-200 rounded-xl p-2">
                <div className="font-medium">
                  {event.type} - {event.page_path}
                </div>
                <div className="text-slate-500">
                  {event.city || "Ville inconnue"}, {event.country || "Pays inconnu"}
                </div>
                <div className="text-slate-500">{new Date(event.occurred_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
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

