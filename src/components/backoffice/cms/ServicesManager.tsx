import { useState, useEffect, useCallback } from "react";
import { fetchServices, upsertService, deleteService } from "@/lib/cms-service";
import type { ServiceItem } from "@/types/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Loader2,
  RefreshCw,
  Save,
  X,
  Code2,
  Palette,
  Database,
  Globe,
  Smartphone,
  Server,
  BarChart,
  Shield,
  Cpu,
} from "lucide-react";

const ICON_OPTIONS = [
  { value: "Code2", label: "Code", icon: Code2 },
  { value: "Palette", label: "Design", icon: Palette },
  { value: "Database", label: "Base de données", icon: Database },
  { value: "Globe", label: "Web", icon: Globe },
  { value: "Smartphone", label: "Mobile", icon: Smartphone },
  { value: "Server", label: "Serveur", icon: Server },
  { value: "BarChart", label: "Analytics", icon: BarChart },
  { value: "Shield", label: "Sécurité", icon: Shield },
  { value: "Cpu", label: "Tech", icon: Cpu },
] as const;

const emptyService: Partial<ServiceItem> = {
  icon_name: "Code2",
  title_fr: "",
  title_en: "",
  description_fr: "",
  description_en: "",
  skills: [],
  is_active: true,
  sort_order: 0,
};

export function ServicesManager() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Partial<ServiceItem> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [skillInput, setSkillInput] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchServices();
      setServices(data);
    } catch {
      toast.error("Erreur chargement services");
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!editing || !editing.title_fr?.trim() || !editing.title_en?.trim()) {
      toast.error("Titres FR et EN requis");
      return;
    }
    setSaving(true);
    try {
      await upsertService(editing);
      toast.success(editing.id ? "Service mis à jour" : "Service ajouté");
      setShowForm(false);
      setEditing(null);
      load();
    } catch {
      toast.error("Erreur sauvegarde");
    }
    setSaving(false);
  };

  const remove = async () => {
    if (deleteConfirm === null) return;
    try {
      await deleteService(deleteConfirm);
      toast.success("Service supprimé");
      setDeleteConfirm(null);
      load();
    } catch {
      toast.error("Erreur suppression");
    }
  };

  const move = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= services.length) return;
    const reordered = [...services];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    const updated = reordered.map((t, i) => ({ ...t, sort_order: i }));
    setServices(updated);
    try {
      for (const t of updated) {
        await upsertService({ id: t.id, sort_order: t.sort_order });
      }
      toast.success("Ordre mis à jour");
    } catch {
      toast.error("Erreur réordonnancement");
      load();
    }
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    if ((editing?.skills || []).includes(trimmed)) {
      toast.error("Compétence déjà présente");
      return;
    }
    setEditing(p => ({ ...p, skills: [...(p?.skills || []), trimmed] }));
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setEditing(p => ({ ...p, skills: (p?.skills || []).filter(s => s !== skill) }));
  };

  const openEdit = (s: ServiceItem) => {
    setEditing(s);
    setShowForm(true);
  };

  const openNew = () => {
    setEditing({ ...emptyService, sort_order: services.length });
    setShowForm(true);
  };

  const IconComponent = ({ iconName, className }: { iconName: string; className?: string }) => {
    const found = ICON_OPTIONS.find(i => i.value === iconName);
    if (found) {
      const Icon = found.icon;
      return <Icon className={className} />;
    }
    return <Code2 className={className} />;
  };

  if (loading) {
    return (
      <Card className="bg-white border-[#e6dfd8] p-12">
        <div className="flex flex-col items-center gap-3 text-[#6c6a64]">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p className="text-sm">Chargement...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#6c6a64]">{services.length} service{services.length > 1 ? "s" : ""}</p>
        <div className="flex gap-2">
          <Button onClick={load} variant="ghost" size="sm" className="text-[#8e8b82]">
            <RefreshCw className="w-3 h-3 mr-1" /> Recharger
          </Button>
          <Button onClick={openNew} className="bg-[#cc785c] hover:bg-[#a9583e] text-white" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Ajouter
          </Button>
        </div>
      </div>

      {services.length === 0 && !showForm && (
        <Card className="bg-white border-[#e6dfd8] p-12">
          <div className="text-center">
            <Code2 className="w-8 h-8 mx-auto text-[#8e8b82] mb-3" />
            <p className="text-[#8e8b82] text-sm mb-4">Aucun service</p>
            <Button onClick={openNew} className="bg-[#cc785c] hover:bg-[#a9583e] text-white" size="sm">
              <Plus className="w-4 h-4 mr-1" /> Ajouter un service
            </Button>
          </div>
        </Card>
      )}

      {showForm && editing && (
        <Card className="bg-white border-[#cc785c]/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-sm text-[#141413]">
              {editing.id ? "Modifier le service" : "Nouveau service"}
            </h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="p-1 rounded hover:bg-[#faf9f5] text-[#8e8b82]">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">Icône</label>
              <div className="flex flex-wrap gap-1.5">
                {ICON_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setEditing(p => ({ ...p, icon_name: opt.value }))}
                      className={`p-2 rounded-lg border text-[#6c6a64] ${
                        editing.icon_name === opt.value
                          ? "border-[#cc785c] bg-[#cc785c]/10 text-[#cc785c]"
                          : "border-[#e6dfd8] hover:bg-[#faf9f5]"
                      }`}
                      title={opt.label}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">Titre FR *</label>
                <Input value={editing.title_fr || ""} onChange={(e) => setEditing(p => ({ ...p, title_fr: e.target.value }))} className="border-[#e6dfd8] text-sm" placeholder="Développement Web" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">Titre EN *</label>
                <Input value={editing.title_en || ""} onChange={(e) => setEditing(p => ({ ...p, title_en: e.target.value }))} className="border-[#e6dfd8] text-sm" placeholder="Web Development" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">Description FR</label>
              <textarea
                value={editing.description_fr || ""}
                onChange={(e) => setEditing(p => ({ ...p, description_fr: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-[#e6dfd8] rounded-md text-sm text-[#141413] placeholder:text-[#8e8b82] min-h-[80px] resize-y"
                placeholder="Description en français"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">Description EN</label>
              <textarea
                value={editing.description_en || ""}
                onChange={(e) => setEditing(p => ({ ...p, description_en: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-[#e6dfd8] rounded-md text-sm text-[#141413] placeholder:text-[#8e8b82] min-h-[80px] resize-y"
                placeholder="Description in English"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">Compétences</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {(editing.skills || []).map((skill) => (
                  <span key={skill} className="inline-flex items-center gap-1 bg-[#f5f0e8] text-[#141413] px-2 py-1 rounded text-xs">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="text-[#8e8b82] hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                  placeholder="Ajouter une compétence..."
                  className="border-[#e6dfd8] text-sm flex-1"
                />
                <Button onClick={addSkill} variant="outline" size="sm" className="border-[#e6dfd8] text-[#141413] shrink-0">
                  Ajouter
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => { setShowForm(false); setEditing(null); }}>
              Annuler
            </Button>
            <Button onClick={save} disabled={saving} className="bg-[#cc785c] hover:bg-[#a9583e] text-white" size="sm">
              {saving ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Save className="w-3 h-3 mr-1" />}
              {editing.id ? "Mettre à jour" : "Ajouter"}
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {services.map((s, index) => {
          const Icon = ICON_OPTIONS.find(i => i.value === s.icon_name)?.icon || Code2;
          return (
            <Card key={s.id} className={`bg-white border-[#e6dfd8] ${s.is_active ? "" : "opacity-50"}`}>
              <div className="flex items-start gap-4 p-4">
                <div className="flex flex-col gap-1 pt-1">
                  <button onClick={() => move(index, "up")} disabled={index === 0} className="p-1 rounded hover:bg-[#faf9f5] text-[#8e8b82] disabled:opacity-30">
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => move(index, "down")} disabled={index === services.length - 1} className="p-1 rounded hover:bg-[#faf9f5] text-[#8e8b82] disabled:opacity-30">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-2 rounded-lg bg-[#f5f0e8] shrink-0">
                  <Icon className="w-5 h-5 text-[#cc785c]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-[#141413]">{s.title_fr}</span>
                    <span className="text-xs text-[#8e8b82]">/ {s.title_en}</span>
                  </div>
                  {s.description_fr && (
                    <p className="text-sm text-[#6c6a64] line-clamp-2 mb-1">{s.description_fr}</p>
                  )}
                  {s.skills && s.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {s.skills.map((skill) => (
                        <span key={skill} className="text-xs bg-[#f5f0e8] text-[#6c6a64] px-1.5 py-0.5 rounded">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-[#faf9f5] text-[#8e8b82] hover:text-[#141413]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => setDeleteConfirm(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-[#8e8b82] hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <AlertDialog open={deleteConfirm !== null} onOpenChange={(o) => !o && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le service</AlertDialogTitle>
            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={remove} className="bg-red-500 hover:bg-red-600 text-white">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
