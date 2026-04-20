import type { VisitorWithJourney } from "@/hooks/useVisitorTracking";
import { Button } from "@/components/ui/button";

type Props = {
  visitor: VisitorWithJourney | null;
  onClose: () => void;
};

const typeIcons: Record<string, string> = {
  page_view: "👁️",
  click: "👆",
  section_view: "📑",
};

const typeLabels: Record<string, string> = {
  page_view: "Page vue",
  click: "Clic",
  section_view: "Section",
};

export function VisitorDetailPanel({ visitor, onClose }: Props) {
  if (!visitor) return null;

  const duration = new Date(visitor.lastSeenAt).getTime() - new Date(visitor.startedAt).getTime();
  const durationMins = Math.floor(duration / 60000);
  const durationSecs = Math.floor((duration % 60000) / 1000);

  const timeAgo = (date: string) => {
    const mins = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
    if (mins < 1) return "à l'instant";
    if (mins < 60) return `il y a ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `il y a ${hours}h`;
    return new Date(date).toLocaleDateString("fr-FR");
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-slate-200 shadow-2xl z-50 overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="font-semibold">Parcours du visiteur</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold">
              {visitor.country?.[0] || "?"}
            </div>
            <div>
              <div className="font-semibold text-sm">
                {visitor.city || visitor.country || "Inconnu"}
              </div>
              <div className="text-xs text-slate-500">
                {visitor.country}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-white rounded-lg p-2 text-center">
              <div className="font-bold text-rose-600">{visitor.pagesVisited}</div>
              <div className="text-slate-500">Pages</div>
            </div>
            <div className="bg-white rounded-lg p-2 text-center">
              <div className="font-bold text-violet-600">{visitor.clicksCount}</div>
              <div className="text-slate-500">Clics</div>
            </div>
            <div className="bg-white rounded-lg p-2 text-center">
              <div className="font-bold text-cyan-600">{visitor.sectionsViewed}</div>
              <div className="text-slate-500">Sections</div>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-slate-100">
          <div className="text-xs text-slate-500 mb-2">APPAREIL</div>
          <div className="text-sm">
            {visitor.browser} • {visitor.os} • {visitor.device}
          </div>
        </div>

        <div className="p-4 border-b border-slate-100">
          <div className="text-xs text-slate-500 mb-2">DURÉE</div>
          <div className="text-sm">
            {durationMins > 0 ? `${durationMins} min ` : ""}
            {durationSecs} sec
          </div>
        </div>

        {visitor.referrer && (
          <div className="p-4 border-b border-slate-100">
            <div className="text-xs text-slate-500 mb-2">REFERENT</div>
            <div className="text-sm truncate">{visitor.referrer}</div>
          </div>
        )}

        <div className="flex-1 overflow-auto p-4">
          <div className="text-xs text-slate-500 mb-3">CHRONOLOGIE</div>
          <div className="space-y-3">
            {visitor.journey.map((event, idx) => (
              <div key={event.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="text-lg">{typeIcons[event.type]}</div>
                  {idx < visitor.journey.length - 1 && (
                    <div className="w-px h-8 bg-slate-200 mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-3">
                  <div className="text-xs text-slate-500">
                    {typeLabels[event.type]} • {timeAgo(event.occurredAt)}
                  </div>
                  <div className="text-sm font-medium mt-0.5">{event.pagePath}</div>
                  {event.sectionId && (
                    <div className="text-xs text-slate-500">
                      Section: {event.sectionId}
                    </div>
                  )}
                  {event.elementText && (
                    <div className="text-xs text-slate-500">
                      Élément: {event.elementText}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="text-xs text-slate-500">
            Première vue: {visitor.firstPage}
          </div>
          <div className="text-xs text-slate-500">
            Dernière vue: {visitor.lastPage}
          </div>
        </div>
      </div>
    </div>
  );
}