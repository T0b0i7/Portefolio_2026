import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type SectionData = {
  section_id: string;
  count: number;
  percentage: number;
};

export function HeatmapSections() {
  const [data, setData] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;

    const fetchData = async () => {
      const { data: events, error } = await supabase
        .from("section_events")
        .select("section_id");

      if (error || !events) {
        setLoading(false);
        return;
      }

      const grouped: Record<string, number> = {};

      events.forEach((e) => {
        if (e.section_id) {
          grouped[e.section_id] = (grouped[e.section_id] || 0) + 1;
        }
      });

      const total = Object.values(grouped).reduce((a, b) => a + b, 0);

      const sectionData = Object.entries(grouped)
        .map(([section_id, count]) => ({
          section_id,
          count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setData(sectionData);
      setLoading(false);
    };

    fetchData();

    const ch = supabase
      .channel("heatmap-sections")
      .on("postgres_changes", { event: "insert", schema: "public", table: "section_events" }, () => fetchData())
      .subscribe();

    return () => {
      void supabase.removeChannel(ch);
    };
  }, []);

  if (loading) {
    return <div className="text-sm text-slate-500">Chargement...</div>;
  }

  const maxPercentage = Math.max(...data.map((d) => d.percentage), 1);

  const sectionLabels: Record<string, string> = {
    hero: "Hero",
    projects: "Projets",
    services: "Services",
    testimonials: "Témoignages",
    evolution: "Parcours",
    faq: "FAQ",
    contact: "Contact",
    footer: "Footer",
  };

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.section_id} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-slate-700">
              {sectionLabels[item.section_id] || item.section_id}
            </span>
            <span className="text-slate-500">
              {item.count} ({item.percentage}%)
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-500"
              style={{ width: `${(item.percentage / maxPercentage) * 100}%` }}
            />
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <p className="text-sm text-slate-500">Aucune donnée disponible</p>
      )}
    </div>
  );
}