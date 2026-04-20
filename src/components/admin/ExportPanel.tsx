import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { exportVisitorsToCSV, exportJourneysToCSV } from "@/lib/exportUtils";
import { Button } from "@/components/ui/button";

export function ExportPanel() {
  const { visitors, loading } = useVisitorTracking();

  const handleExportVisitors = () => {
    exportVisitorsToCSV(visitors, "visitors");
  };

  const handleExportJourneys = () => {
    exportJourneysToCSV(visitors, "journeys");
  };

  if (loading) {
    return <div className="text-sm text-slate-500">Chargement...</div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <h3 className="font-semibold mb-4">Export des données</h3>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportVisitors}
          disabled={visitors.length === 0}
        >
          📊 CSV Visiteurs
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportJourneys}
          disabled={visitors.length === 0}
        >
          📜 CSV Parcours
        </Button>
      </div>
      <p className="text-xs text-slate-500 mt-2">
        {visitors.length} visiteurs exportables
      </p>
    </div>
  );
}