import { useEffect, useState, useCallback } from "react";
import {
  deleteProject,
  fetchLinks,
  fetchProjectsFromCms,
  fetchSections,
  fetchSiteSettings,
  fetchThemeSettings,
  upsertLink,
  upsertProject,
  upsertSection,
  upsertSiteSetting,
  upsertThemeSetting,
} from "@/lib/cms-service";
import type { CmsLink, CmsProject, CmsSection, SiteSetting, ThemeSetting } from "@/types/cms";
import { Button } from "@/components/ui/button";

export function CmsManager() {
  const [projects, setProjects] = useState<CmsProject[]>([]);
  const [sections, setSections] = useState<CmsSection[]>([]);
  const [links, setLinks] = useState<CmsLink[]>([]);
  const [themeSettings, setThemeSettings] = useState<ThemeSetting[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"projects" | "sections" | "links" | "settings">("projects");
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const refresh = async () => {
    setLoading(true);
    const [p, s, l, t, ss] = await Promise.all([
      fetchProjectsFromCms(),
      fetchSections(),
      fetchLinks(),
      fetchThemeSettings(),
      fetchSiteSettings(),
    ]);
    setProjects(p);
    setSections(s);
    setLinks(l);
    setThemeSettings(t);
    setSiteSettings(ss);
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const handleDragStart = useCallback((idx: number) => {
    setDraggedIdx(idx);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;

    const newProjects = [...projects];
    const [dragged] = newProjects.splice(draggedIdx, 1);
    newProjects.splice(idx, 0, dragged);
    setProjects(newProjects);
    setDraggedIdx(idx);
  }, [draggedIdx, projects]);

  const handleDragEnd = useCallback(async () => {
    if (draggedIdx === null) return;

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      if (project.sort_order !== i) {
        await upsertProject({ ...project, sort_order: i });
      }
    }
    setDraggedIdx(null);
    void refresh();
  }, [draggedIdx, projects]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleDragEnd();
  }, [handleDragEnd]);

  if (loading) return <div className="text-sm text-slate-500">Chargement CMS...</div>;

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        {(["projects", "sections", "links", "settings"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm rounded-lg ${
              activeTab === tab ? "bg-slate-900 text-white" : "bg-slate-100"
            }`}
          >
            {tab === "projects" ? "Projets" : tab === "sections" ? "Sections" : tab === "links" ? "Liens" : "Settings"}
          </button>
        ))}
      </div>

      {activeTab === "projects" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Projets ({projects.length})</h3>
            <p className="text-xs text-slate-500">Glissez pour réordonner</p>
          </div>
          <div
            className="space-y-2"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {projects
              .slice()
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((project, idx) => (
                <div
                  key={project.id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  className={`bg-white rounded-xl border border-slate-200 p-4 cursor-move transition-all ${
                    draggedIdx === idx ? "opacity-50 scale-95" : "hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl text-slate-300">☰</div>
                    <div className="flex-1">
                      <div className="font-medium">{project.title_fr || project.title_en}</div>
                      <div className="text-xs text-slate-500">{project.category}</div>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-0.5 text-xs rounded ${
                          project.status === "published" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                        }`}>
                          {project.status}
                        </span>
                        {project.is_featured && (
                          <span className="px-2 py-0.5 text-xs rounded bg-amber-100 text-amber-700">
                            Featured
                          </span>
                        )}
                        {project.is_locked && (
                          <span className="px-2 py-0.5 text-xs rounded bg-red-100 text-red-700">
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">Ordre: {project.sort_order}</div>
                  </div>
                </div>
              ))}
          </div>
          <Button
            variant="outline"
            onClick={async () => {
              const newProject: Partial<CmsProject> = {
                title_fr: "Nouveau projet",
                title_en: "New project",
                category: "Web",
                description_fr: "Description",
                description_en: "Description",
                status: "draft",
                sort_order: projects.length,
              };
              await upsertProject(newProject);
              void refresh();
            }}
          >
            + Ajouter un projet
          </Button>
        </div>
      )}

      {activeTab === "sections" && (
        <CrudTable
          title="Sections"
          columns={["id", "title_fr", "is_enabled", "sort_order", "status"]}
          rows={sections as unknown as Record<string, unknown>[]}
          onSave={async (row) => {
            await upsertSection(row as Partial<CmsSection>);
            void refresh();
          }}
        />
      )}

      {activeTab === "links" && (
        <CrudTable
          title="Liens"
          columns={["id", "label", "href", "section_id", "is_enabled"]}
          rows={links as unknown as Record<string, unknown>[]}
          onSave={async (row) => {
            await upsertLink(row as Partial<CmsLink>);
            void refresh();
          }}
        />
      )}

      {activeTab === "settings" && (
        <div className="space-y-6">
          <CrudTable
            title="Theme Settings"
            columns={["key", "value"]}
            rows={themeSettings as unknown as Record<string, unknown>[]}
            onSave={async (row) => {
              await upsertThemeSetting({
                key: String(row.key),
                value: typeof row.value === "string" ? JSON.parse(row.value) : (row.value as Record<string, unknown>),
              });
              void refresh();
            }}
          />
          <CrudTable
            title="Site Settings"
            columns={["key", "value"]}
            rows={siteSettings as unknown as Record<string, unknown>[]}
            onSave={async (row) => {
              await upsertSiteSetting({
                key: String(row.key),
                value: typeof row.value === "string" ? JSON.parse(row.value) : (row.value as Record<string, unknown>),
              });
              void refresh();
            }}
          />
        </div>
      )}
    </div>
  );
}

function CrudTable({
  title,
  columns,
  rows,
  onSave,
  onDelete,
}: {
  title: string;
  columns: string[];
  rows: Record<string, unknown>[];
  onSave: (row: Record<string, unknown>) => Promise<void>;
  onDelete?: (id: string | number) => Promise<void>;
}) {
  const [draft, setDraft] = useState<Record<string, unknown>[]>([]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="overflow-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c} className="text-left p-2 bg-slate-50 border-b border-slate-200">
                  {c}
                </th>
              ))}
              <th className="text-left p-2 bg-slate-50 border-b border-slate-200">actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={`${title}-${idx}`} className="border-b border-slate-100">
                {columns.map((col) => (
                  <td key={col} className="p-2 align-top">
                    <textarea
                      rows={2}
                      className="w-full rounded border border-slate-200 p-1"
                      value={String((draft[idx]?.[col] ?? row[col] ?? "") as string)}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          [idx]: { ...prev[idx], ...row, [col]: e.target.value },
                        }))
                      }
                    />
                  </td>
                ))}
                <td className="p-2">
                  <button
                    className="px-2 py-1 rounded bg-slate-900 text-white"
                    onClick={() => void onSave((draft[idx] || row) as Record<string, unknown>)}
                  >
                    save
                  </button>
                  {onDelete && row.id != null && (
                    <button
                      className="ml-2 px-2 py-1 rounded bg-rose-600 text-white"
                      onClick={() => void onDelete(row.id as string | number)}
                    >
                      delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}