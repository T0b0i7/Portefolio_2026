import { useState, useEffect, useCallback } from "react";
import { fetchTestimonials, upsertTestimonial, deleteTestimonial } from "@/lib/cms-service";
import type { Testimonial } from "@/types/cms";
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
  Star,
  Quote,
  Loader2,
  RefreshCw,
  Save,
  X,
} from "lucide-react";

const emptyTestimonial: Partial<Testimonial> = {
  name: "",
  role: "",
  company: "",
  text: "",
  rating: 5,
  stats: "",
  impact: "",
  is_active: true,
  sort_order: 0,
};

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTestimonials();
      setTestimonials(data);
    } catch {
      toast.error("Erreur chargement témoignages");
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!editing || !editing.name?.trim() || !editing.text?.trim()) {
      toast.error("Nom et texte requis");
      return;
    }
    setSaving(true);
    try {
      await upsertTestimonial(editing);
      toast.success(editing.id ? "Témoignage mis à jour" : "Témoignage ajouté");
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
      await deleteTestimonial(deleteConfirm);
      toast.success("Témoignage supprimé");
      setDeleteConfirm(null);
      load();
    } catch {
      toast.error("Erreur suppression");
    }
  };

  const move = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= testimonials.length) return;
    const reordered = [...testimonials];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    const updated = reordered.map((t, i) => ({ ...t, sort_order: i }));
    setTestimonials(updated);
    try {
      for (const t of updated) {
        await upsertTestimonial({ id: t.id, sort_order: t.sort_order });
      }
      toast.success("Ordre mis à jour");
    } catch {
      toast.error("Erreur réordonnancement");
      load();
    }
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setShowForm(true);
  };

  const openNew = () => {
    setEditing({ ...emptyTestimonial, sort_order: testimonials.length });
    setShowForm(true);
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
        <p className="text-sm text-[#6c6a64]">{testimonials.length} témoignage{testimonials.length > 1 ? "s" : ""}</p>
        <div className="flex gap-2">
          <Button onClick={load} variant="ghost" size="sm" className="text-[#8e8b82]">
            <RefreshCw className="w-3 h-3 mr-1" /> Recharger
          </Button>
          <Button onClick={openNew} className="bg-[#cc785c] hover:bg-[#a9583e] text-white" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Ajouter
          </Button>
        </div>
      </div>

      {testimonials.length === 0 && !showForm && (
        <Card className="bg-white border-[#e6dfd8] p-12">
          <div className="text-center">
            <Quote className="w-8 h-8 mx-auto text-[#8e8b82] mb-3" />
            <p className="text-[#8e8b82] text-sm mb-4">Aucun témoignage</p>
            <Button onClick={openNew} className="bg-[#cc785c] hover:bg-[#a9583e] text-white" size="sm">
              <Plus className="w-4 h-4 mr-1" /> Ajouter un témoignage
            </Button>
          </div>
        </Card>
      )}

      {showForm && editing && (
        <Card className="bg-white border-[#cc785c]/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-sm text-[#141413]">
              {editing.id ? "Modifier le témoignage" : "Nouveau témoignage"}
            </h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="p-1 rounded hover:bg-[#faf9f5] text-[#8e8b82]">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">Nom *</label>
              <Input value={editing.name || ""} onChange={(e) => setEditing(p => ({ ...p, name: e.target.value }))} className="border-[#e6dfd8] text-sm" placeholder="Jean Dupont" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">Rôle</label>
              <Input value={editing.role || ""} onChange={(e) => setEditing(p => ({ ...p, role: e.target.value }))} className="border-[#e6dfd8] text-sm" placeholder="CEO" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">Entreprise</label>
              <Input value={editing.company || ""} onChange={(e) => setEditing(p => ({ ...p, company: e.target.value }))} className="border-[#e6dfd8] text-sm" placeholder="Société" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">Note /5</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setEditing(p => ({ ...p, rating: star }))}
                    className={`p-1 rounded ${(editing.rating || 0) >= star ? "text-amber-400" : "text-[#e6dfd8]"}`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">Témoignage *</label>
              <textarea
                value={editing.text || ""}
                onChange={(e) => setEditing(p => ({ ...p, text: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-[#e6dfd8] rounded-md text-sm text-[#141413] placeholder:text-[#8e8b82] min-h-[100px] resize-y"
                placeholder="Super travail !"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">Stats (ex: -30%)</label>
              <Input value={editing.stats || ""} onChange={(e) => setEditing(p => ({ ...p, stats: e.target.value }))} className="border-[#e6dfd8] text-sm" placeholder="-30%" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider mb-1 block">Impact (ex: Temps traitement)</label>
              <Input value={editing.impact || ""} onChange={(e) => setEditing(p => ({ ...p, impact: e.target.value }))} className="border-[#e6dfd8] text-sm" placeholder="Temps de traitement" />
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
        {testimonials.map((t, index) => (
          <Card key={t.id} className={`bg-white border-[#e6dfd8] ${t.is_active ? "" : "opacity-50"}`}>
            <div className="flex items-start gap-4 p-4">
              <div className="flex flex-col gap-1 pt-1">
                <button onClick={() => move(index, "up")} disabled={index === 0} className="p-1 rounded hover:bg-[#faf9f5] text-[#8e8b82] disabled:opacity-30">
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => move(index, "down")} disabled={index === testimonials.length - 1} className="p-1 rounded hover:bg-[#faf9f5] text-[#8e8b82] disabled:opacity-30">
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-[#141413]">{t.name}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                    ))}
                  </div>
                </div>
                {(t.role || t.company) && (
                  <p className="text-xs text-[#8e8b82] mb-2">{t.role}{t.role && t.company ? " — " : ""}{t.company}</p>
                )}
                <p className="text-sm text-[#6c6a64] line-clamp-2">{t.text}</p>
                {(t.stats || t.impact) && (
                  <p className="text-xs text-[#cc785c] mt-1 font-medium">{t.stats} {t.impact}</p>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-[#faf9f5] text-[#8e8b82] hover:text-[#141413]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={() => setDeleteConfirm(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-[#8e8b82] hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteConfirm !== null} onOpenChange={(o) => !o && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le témoignage</AlertDialogTitle>
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
