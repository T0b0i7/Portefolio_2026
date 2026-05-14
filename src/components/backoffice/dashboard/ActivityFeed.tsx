import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MousePointer, CheckCircle, AlertCircle, Clock, MapPin } from "lucide-react";

interface Activity {
  id: string;
  type: "visit" | "click" | "conversion" | "error";
  message: string;
  timestamp: Date;
  visitorId?: string;
  city?: string;
  country?: string;
}

interface ActivityFeedProps {
  activities?: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const items = activities || [];

  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "visit": return <User className="w-3.5 h-3.5" />;
      case "click": return <MousePointer className="w-3.5 h-3.5" />;
      case "conversion": return <CheckCircle className="w-3.5 h-3.5" />;
      case "error": return <AlertCircle className="w-3.5 h-3.5" />;
      default: return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const getColors = (type: Activity["type"]) => {
    switch (type) {
      case "visit": return "bg-blue-50 text-blue-600 border-blue-100";
      case "click": return "bg-slate-50 text-slate-600 border-slate-100";
      case "conversion": return "bg-green-50 text-green-600 border-green-100";
      case "error": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "maintenant";
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="bg-white border border-[#e6dfd8] rounded-xl shadow-sm overflow-hidden">
      <CardHeader className="pb-4 px-6 pt-6 border-b border-[#e6dfd8]">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-serif font-normal tracking-[-0.3px] text-[#141413]">Flux d'activité</CardTitle>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">En direct</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {items.length === 0 ? (
          <div className="py-12 text-center text-[#6c6a64] text-sm">
            En attente de nouveaux événements...
          </div>
        ) : (
          <div className="divide-y divide-[#e6dfd8] max-h-[400px] overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="p-4 hover:bg-[#faf9f5] transition-colors flex items-start gap-4">
                <div className={`mt-1 p-1.5 rounded-full border ${getColors(item.type)}`}>
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-[#141413] font-medium truncate">{item.message}</p>
                    <span className="text-[10px] text-[#8e8b82] font-mono whitespace-nowrap">{formatTime(item.timestamp)}</span>
                  </div>
                  {(item.city || item.country) && (
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-[#8e8b82]">
                      <MapPin className="w-3 h-3" />
                      <span>{item.city || "Inconnu"}, {item.country || "Inconnu"}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="p-4 border-t border-[#e6dfd8] bg-[#faf9f5] text-center">
          <button className="text-[11px] font-bold text-[#cc785c] hover:text-[#a9583e] uppercase tracking-wider transition-colors">
            Voir tout l'historique
          </button>
        </div>
      </CardContent>
    </Card>
  );
}