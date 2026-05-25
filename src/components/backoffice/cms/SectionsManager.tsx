import { useState, useEffect, useCallback } from "react";
import { fetchSections, upsertSection } from "@/lib/cms-service";
import type { CmsSection } from "@/types/cms";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Save,
  GripVertical,
  FileText,
  Loader2,
  RefreshCw,
  ChevronRight,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";

const SECTION_ICONS: Record<string, string> = {
  hero: "Layout",
  about: "UserRound",
  arsenal: "Cpu",
  tech: "Cpu",
  projects: "Globe",
  services: "Mail",
  testimonials: "Quote",
  contact: "Mail",
  footer: "Copyright",
};

export function SectionsManager() {
  const [sections, setSections] = useState<CmsSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, Partial<CmsSection>>>({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchSections();
      setSections(data);
    } catch {
      toast.error("Erreur chargement sections");
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleEnabled = async (section: CmsSection) => {
    const updated = { ...section, is_enabled: !section.is_enabled };
    setSections(prev => prev.map(s => s.id === section.id ? { ...s, is_enabled: !s.is_enabled } : s));
    try {
      await upsertSection({ id: section.id, is_enabled: !section.is_enabled });
      toast.success(updated.is_enabled ? "Section activée" : "Section désactivée");
    } catch {
      setSections(prev => prev.map(s => s.id === section.id ? section : s));
      toast.error("Erreur");
    }
  };

  const moveSection = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;
    const reordered = [...sections];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    const updated = reordered.map((s, i) => ({ ...s, sort_order: i }));
    setSections(updated);
    try {
      for (const s of updated) {
        await upsertSection({ id: s.id, sort_order: s.sort_order });
      }
      toast.success("Ordre mis à jour");
    } catch {
      toast.error("Erreur réordonnancement");
      load();
    }
  };

  const saveEdit = async (id: string) => {
    const edit = edits[id];
    if (!edit) return;
    setSaving(true);
    try {
      await upsertSection({ id, ...edit });
      setSections(prev => prev.map(s => s.id === id ? { ...s, ...edit } : s));
      setEdits(prev => { const next = { ...prev }; delete next[id]; return next; });
      toast.success("Section sauvegardée");
    } catch {
      toast.error("Erreur sauvegarde");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <Card className="bg-white border-[#e6dfd8] p-12">
        <div className="flex flex-col items-center gap-3 text-[#6c6a64]">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p className="text-sm">Chargement des sections...</p>
        </div>
      </Card>
    );
  }

  if (sections.length === 0) {
    return (
      <Card className="bg-white border-[#e6dfd8] p-12">
        <div className="text-center">
          <FileText className="w-8 h-8 mx-auto text-[#8e8b82] mb-3" />
          <p className="text-[#8e8b82] text-sm">Aucune section trouvée</p>
          <Button onClick={load} variant="outline" size="sm" className="mt-4">
            <RefreshCw className="w-3 h-3 mr-2" /> Recharger
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#6c6a64]">{sections.length} section{sections.length > 1 ? "s" : ""}</p>
        <Button onClick={load} variant="ghost" size="sm" className="text-[#8e8b82]">
          <RefreshCw className="w-3 h-3 mr-1" /> Recharger
        </Button>
      </div>

      {sections.map((section, index) => {
        const isExpanded = expandedId === section.id;
        const edit = edits[section.id] || {};
        const iconName = section.icon_name || SECTION_ICONS[section.id] || "FileText";

        return (
          <Card
            key={section.id}
            className={`bg-white border-[#e6dfd8] transition-all ${section.is_enabled ? "" : "opacity-60"}`}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="text-[#8e8b82] cursor-grab active:cursor-grabbing">
                <GripVertical className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#8e8b82] bg-[#faf9f5] px-1.5 py-0.5 rounded">
                    {section.id}
                  </span>
                  <span className="font-medium text-sm text-[#141413] truncate">
                    {section.title_fr}
                  </span>
                </div>
                <p className="text-xs text-[#8e8b82] truncate mt-0.5">
                  Ordre: {section.sort_order}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveSection(index, "up")}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg hover:bg-[#faf9f5] text-[#8e8b82] hover:text-[#141413] disabled:opacity-30"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveSection(index, "down")}
                  disabled={index === sections.length - 1}
                  className="p-1.5 rounded-lg hover:bg-[#faf9f5] text-[#8e8b82] hover:text-[#141413] disabled:opacity-30"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>

                <button
                  onClick={() => toggleEnabled(section)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    section.is_enabled
                      ? "text-green-600 hover:bg-green-50"
                      : "text-[#8e8b82] hover:bg-[#faf9f5]"
                  }`}
                  title={section.is_enabled ? "Désactiver" : "Activer"}
                >
                  {section.is_enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : section.id)}
                  className="p-1.5 rounded-lg hover:bg-[#faf9f5] text-[#8e8b82]"
                >
                  {isExpanded ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-[#e6dfd8] px-4 py-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">
                      Titre (FR)
                    </label>
                    <Input
                      defaultValue={section.title_fr}
                      onChange={(e) => setEdits(prev => ({
                        ...prev,
                        [section.id]: { ...prev[section.id], title_fr: e.target.value }
                      }))}
                      className="border-[#e6dfd8] text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">
                      Titre (EN)
                    </label>
                    <Input
                      defaultValue={section.title_en}
                      onChange={(e) => setEdits(prev => ({
                        ...prev,
                        [section.id]: { ...prev[section.id], title_en: e.target.value }
                      }))}
                      className="border-[#e6dfd8] text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">
                      Description (FR)
                    </label>
                    <Input
                      defaultValue={section.description_fr || ""}
                      onChange={(e) => setEdits(prev => ({
                        ...prev,
                        [section.id]: { ...prev[section.id], description_fr: e.target.value }
                      }))}
                      className="border-[#e6dfd8] text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">
                      Description (EN)
                    </label>
                    <Input
                      defaultValue={section.description_en || ""}
                      onChange={(e) => setEdits(prev => ({
                        ...prev,
                        [section.id]: { ...prev[section.id], description_en: e.target.value }
                      }))}
                      className="border-[#e6dfd8] text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => saveEdit(section.id)}
                    disabled={saving || !edits[section.id]}
                    className="bg-[#cc785c] hover:bg-[#a9583e] text-white"
                    size="sm"
                  >
                    {saving ? (
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    ) : (
                      <Save className="w-3 h-3 mr-1" />
                    )}
                    Sauvegarder
                  </Button>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
