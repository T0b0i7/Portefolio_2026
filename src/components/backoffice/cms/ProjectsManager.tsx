import { useState } from "react";
import { useCmsProjects } from "@/hooks/useCmsProjects";
import { upsertProject, deleteProject } from "@/lib/cms-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  GripVertical,
  CheckCircle2,
  Archive,
  FileEdit,
  Globe,
  Tag,
  Image,
  Link,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import type { CmsProject } from "@/types/cms";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  published: { label: "Publié", color: "bg-green-100 text-green-700 border-green-200", icon: <CheckCircle2 className="w-3 h-3" /> },
  draft:     { label: "Brouillon", color: "bg-amber-100 text-amber-700 border-amber-200", icon: <FileEdit className="w-3 h-3" /> },
  archived:  { label: "Archivé", color: "bg-[#e6dfd8] text-[#6c6a64] border-[#e6dfd8]", icon: <Archive className="w-3 h-3" /> },
};

const CATEGORIES = ["Web", "Mobile", "UI/UX", "IA", "DevOps", "Data", "Autre"];

const emptyProject: Partial<CmsProject> = {
  title_fr: "",
  title_en: "",
  description_fr: "",
  description_en: "",
  category: "Web",
  tags: [],
  status: "draft",
  is_featured: false,
  image_url: "",
  project_url: "",
};

export function ProjectsManager() {
  const { projects, loading, hasRemoteData, refresh } = useCmsProjects();
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft" | "archived">("all");
  const [editingProject, setEditingProject] = useState<Partial<CmsProject> | null>(null);
  const [saving, setSaving] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; title: string } | null>(null);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      (p.title_fr?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (p.title_en?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (p.description_fr?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (p.category?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openCreate = () => {
    setEditingProject({ ...emptyProject, sort_order: projects.length });
    setTagsInput("");
  };

  const openEdit = (project: CmsProject) => {
    setEditingProject({ ...project });
    setTagsInput((project.tags || []).join(", "));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    if (!editingProject.title_fr?.trim()) {
      toast.error("Le titre (FR) est obligatoire");
      return;
    }

    setSaving(true);
    try {
      const tags = tagsInput
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);

      await upsertProject({ ...editingProject, tags });
      toast.success(editingProject.id ? "Projet mis à jour ✓" : "Projet créé avec succès ✓");
      setEditingProject(null);
      refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement. Vérifiez la connexion Supabase.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteProject(deleteConfirm.id);
      toast.success("Projet supprimé");
      setDeleteConfirm(null);
      refresh();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleStatusChange = async (project: CmsProject, status: "published" | "draft" | "archived") => {
    try {
      await upsertProject({ ...project, status });
      toast.success(`Statut changé : ${STATUS_CONFIG[status].label}`);
      refresh();
    } catch {
      toast.error("Erreur lors du changement de statut");
    }
  };

  const counts = {
    all: projects.length,
    published: projects.filter(p => p.status === "published").length,
    draft: projects.filter(p => p.status === "draft").length,
    archived: projects.filter(p => p.status === "archived").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-[#6c6a64] gap-3">
        <Loader2 className="w-5 h-5 animate-spin text-[#cc785c]" />
        <span className="text-sm">Chargement des projets...</span>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8b82]" />
          <Input 
            placeholder="Rechercher un projet..." 
            className="pl-10 bg-white border-[#e6dfd8] focus:border-[#cc785c] focus:ring-[#cc785c]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={refresh}
            className="p-2 rounded-lg border border-[#e6dfd8] bg-white text-[#8e8b82] hover:text-[#cc785c] hover:border-[#cc785c]/30 transition-colors"
            title="Rafraîchir"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Button 
            onClick={openCreate}
            className="bg-[#cc785c] hover:bg-[#a9583e] text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nouveau Projet</span>
            <span className="sm:hidden">Créer</span>
          </Button>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {(["all", "published", "draft", "archived"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
              filterStatus === s
                ? "bg-[#cc785c] text-white border-[#cc785c]"
                : "bg-white text-[#6c6a64] border-[#e6dfd8] hover:border-[#cc785c]/40"
            }`}
          >
            {s === "all" ? "Tous" : STATUS_CONFIG[s].label}
            <span className={`text-[10px] px-1 py-0.5 rounded-full ${filterStatus === s ? "bg-white/20" : "bg-[#faf9f5]"}`}>
              {counts[s]}
            </span>
          </button>
        ))}
      </div>

      {/* Info banner */}
      {!hasRemoteData && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
          <span>Mode Lecture Seule : Données locales (seed). Connectez Supabase pour modifier et publier.</span>
        </div>
      )}

      {/* Projects list */}
      {filteredProjects.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-[#e6dfd8] rounded-xl">
          <FileEdit className="w-8 h-8 mx-auto text-[#c9c4bc] mb-3" />
          <p className="text-[#8e8b82] text-sm">Aucun projet trouvé</p>
          <button onClick={openCreate} className="mt-3 text-[#cc785c] text-xs font-bold hover:underline">
            + Créer le premier projet
          </button>
        </div>
      ) : (
        <div className="grid gap-2.5">
          {filteredProjects.map((project) => {
            const st = STATUS_CONFIG[project.status || "draft"];
            return (
              <Card key={project.id} className="bg-white border border-[#e6dfd8] hover:border-[#cc785c]/30 hover:shadow-sm transition-all group overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center p-3 md:p-4 gap-3">
                    {/* Drag handle */}
                    <div className="cursor-grab active:cursor-grabbing text-[#e6dfd8] hover:text-[#8e8b82] shrink-0">
                      <GripVertical className="w-4 h-4" />
                    </div>

                    {/* Thumbnail */}
                    <div className="w-12 h-10 md:w-16 md:h-12 rounded-lg bg-[#faf9f5] flex items-center justify-center overflow-hidden border border-[#e6dfd8] shrink-0">
                      {project.image_url ? (
                        <img src={project.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Image className="w-4 h-4 text-[#c9c4bc]" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold text-[#141413] truncate">{project.title_fr || "Sans titre"}</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#faf9f5] border border-[#e6dfd8] text-[#6c6a64] shrink-0">
                          {project.category}
                        </span>
                        {project.is_featured && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#cc785c]/10 border border-[#cc785c]/20 text-[#cc785c] shrink-0">
                            ★ Vedette
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#6c6a64] truncate mt-0.5">{project.description_fr || "—"}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-medium ${st.color}`}>
                          {st.icon}
                          {st.label}
                        </span>
                        {project.tags && project.tags.length > 0 && (
                          <div className="hidden md:flex items-center gap-1">
                            <Tag className="w-3 h-3 text-[#c9c4bc]" />
                            <span className="text-[10px] text-[#8e8b82]">{project.tags.slice(0, 3).join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden md:flex p-1.5 rounded-lg text-[#8e8b82] hover:text-[#cc785c] hover:bg-[#faf9f5] transition-colors"
                          title="Voir le projet"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#8e8b82] hover:text-[#141413]">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border-[#e6dfd8] w-48">
                          <DropdownMenuItem onClick={() => openEdit(project)} className="gap-2 cursor-pointer">
                            <Edit2 className="w-4 h-4" /> Éditer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-[#e6dfd8]" />
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(project, "published")} 
                            className="gap-2 cursor-pointer text-green-700"
                            disabled={project.status === "published"}
                          >
                            <CheckCircle2 className="w-4 h-4" /> Publier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(project, "draft")} 
                            className="gap-2 cursor-pointer text-amber-700"
                            disabled={project.status === "draft"}
                          >
                            <FileEdit className="w-4 h-4" /> Passer en brouillon
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(project, "archived")} 
                            className="gap-2 cursor-pointer text-[#6c6a64]"
                            disabled={project.status === "archived"}
                          >
                            <Archive className="w-4 h-4" /> Archiver
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-[#e6dfd8]" />
                          <DropdownMenuItem 
                            className="gap-2 text-[#c64545] cursor-pointer" 
                            onClick={() => setDeleteConfirm({ id: project.id!, title: project.title_fr || "ce projet" })}
                          >
                            <Trash2 className="w-4 h-4" /> Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <ChevronRight className="w-4 h-4 text-[#e6dfd8] hidden sm:block" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <Card className="w-full max-w-2xl bg-white border-none shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom sm:zoom-in duration-200 rounded-t-2xl sm:rounded-xl max-h-[95dvh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 md:p-6 border-b border-[#e6dfd8] flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-lg font-serif font-normal text-[#141413]">
                  {editingProject.id ? "Modifier le projet" : "Nouveau projet"}
                </h3>
                <p className="text-xs text-[#8e8b82] mt-0.5">
                  {editingProject.id ? `ID: ${editingProject.id}` : "Sera enregistré dans Supabase"}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setEditingProject(null)} className="text-[#8e8b82] rounded-full">
                <Plus className="rotate-45 w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col min-h-0 flex-1">
              <div className="p-4 md:p-6 space-y-4 overflow-y-auto flex-1">
                
                {/* Titres */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Titre FR <span className="text-[#c64545]">*</span>
                    </label>
                    <Input 
                      required
                      value={editingProject.title_fr || ""} 
                      onChange={(e) => setEditingProject({...editingProject, title_fr: e.target.value})}
                      placeholder="Ex: Application E-commerce"
                      className="border-[#e6dfd8] focus:border-[#cc785c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Titre EN
                    </label>
                    <Input 
                      value={editingProject.title_en || ""} 
                      onChange={(e) => setEditingProject({...editingProject, title_en: e.target.value})}
                      placeholder="Ex: E-commerce App"
                      className="border-[#e6dfd8] focus:border-[#cc785c]"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider">Description FR</label>
                  <textarea
                    value={editingProject.description_fr || ""} 
                    onChange={(e) => setEditingProject({...editingProject, description_fr: e.target.value})}
                    placeholder="Décrivez votre projet en français..."
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-[#e6dfd8] rounded-md bg-white text-[#141413] placeholder:text-[#8e8b82] focus:outline-none focus:border-[#cc785c] resize-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider">Description EN</label>
                  <textarea
                    value={editingProject.description_en || ""} 
                    onChange={(e) => setEditingProject({...editingProject, description_en: e.target.value})}
                    placeholder="Describe your project in english..."
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-[#e6dfd8] rounded-md bg-white text-[#141413] placeholder:text-[#8e8b82] focus:outline-none focus:border-[#cc785c] resize-none"
                  />
                </div>

                {/* Catégorie + Statut */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider">Catégorie</label>
                    <select
                      value={editingProject.category || "Web"}
                      onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-[#e6dfd8] rounded-md bg-white text-[#141413] focus:outline-none focus:border-[#cc785c]"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider">Statut</label>
                    <select
                      value={editingProject.status || "draft"}
                      onChange={(e) => setEditingProject({...editingProject, status: e.target.value as "draft" | "published" | "archived"})}
                      className="w-full px-3 py-2 text-sm border border-[#e6dfd8] rounded-md bg-white text-[#141413] focus:outline-none focus:border-[#cc785c]"
                    >
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Tags (séparés par des virgules)
                  </label>
                  <Input
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="React, TypeScript, Supabase..."
                    className="border-[#e6dfd8] focus:border-[#cc785c]"
                  />
                  {tagsInput && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tagsInput.split(",").map(t => t.trim()).filter(Boolean).map((tag, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-[#cc785c]/10 text-[#cc785c] border border-[#cc785c]/20">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider flex items-center gap-1">
                      <Image className="w-3 h-3" /> URL Image
                    </label>
                    <Input 
                      value={editingProject.image_url || ""} 
                      onChange={(e) => setEditingProject({...editingProject, image_url: e.target.value})}
                      placeholder="https://..."
                      className="border-[#e6dfd8] focus:border-[#cc785c]"
                    />
                    {editingProject.image_url && (
                      <img 
                        src={editingProject.image_url} 
                        alt="preview" 
                        className="w-full h-20 object-cover rounded-md border border-[#e6dfd8] mt-1"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#6c6a64] uppercase tracking-wider flex items-center gap-1">
                      <Link className="w-3 h-3" /> URL Projet
                    </label>
                    <Input 
                      value={editingProject.project_url || ""} 
                      onChange={(e) => setEditingProject({...editingProject, project_url: e.target.value})}
                      placeholder="https://..."
                      className="border-[#e6dfd8] focus:border-[#cc785c]"
                    />
                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center gap-3 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div
                      onClick={() => setEditingProject({...editingProject, is_featured: !editingProject.is_featured})}
                      className={`w-9 h-5 rounded-full transition-colors ${editingProject.is_featured ? "bg-[#cc785c]" : "bg-[#e6dfd8]"} relative`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${editingProject.is_featured ? "translate-x-4" : ""}`} />
                    </div>
                    <span className="text-xs font-medium text-[#6c6a64] group-hover:text-[#141413] transition-colors">Projet en vedette</span>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 md:p-5 bg-[#faf9f5] border-t border-[#e6dfd8] flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 shrink-0">
                <Button 
                  variant="ghost" 
                  type="button" 
                  onClick={() => setEditingProject(null)}
                  className="w-full sm:w-auto"
                  disabled={saving}
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#cc785c] hover:bg-[#a9583e] text-white px-8 w-full sm:w-auto gap-2"
                  disabled={saving}
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? "Enregistrement..." : editingProject.id ? "Mettre à jour" : "Créer le projet"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent className="bg-white border-[#e6dfd8] rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-[#141413]">
              {lang("Confirmer la suppression", "Confirm deletion")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#6c6a64] text-sm">
              {lang(
                `Êtes-vous sûr de vouloir supprimer "${deleteConfirm?.title}" ? Cette action est irréversible.`,
                `Are you sure you want to delete "${deleteConfirm?.title}"? This action cannot be undone.`
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#e6dfd8] text-[#141413]">
              {lang("Annuler", "Cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              {lang("Supprimer", "Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
