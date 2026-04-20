import { useEffect, useState } from "react";
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

export function CmsManager() {
  const [projects, setProjects] = useState<CmsProject[]>([]);
  const [sections, setSections] = useState<CmsSection[]>([]);
  const [links, setLinks] = useState<CmsLink[]>([]);
  const [themeSettings, setThemeSettings] = useState<ThemeSetting[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="text-sm text-slate-500">Chargement CMS...</div>;

  return (
    <div className="space-y-8">
      <CrudTable
        title="Projets"
        columns={["id", "title_fr", "category", "status"]}
        rows={projects as unknown as Record<string, unknown>[]}
        onDelete={async (id) => {
          await deleteProject(Number(id));
          await refresh();
        }}
        onSave={async (row) => {
          await upsertProject(row as Partial<CmsProject>);
          await refresh();
        }}
      />
      <CrudTable
        title="Sections"
        columns={["id", "title_fr", "is_enabled", "sort_order"]}
        rows={sections as unknown as Record<string, unknown>[]}
        onSave={async (row) => {
          await upsertSection(row as Partial<CmsSection>);
          await refresh();
        }}
      />
      <CrudTable
        title="Liens"
        columns={["id", "label", "href", "section_id", "is_enabled"]}
        rows={links as unknown as Record<string, unknown>[]}
        onSave={async (row) => {
          await upsertLink(row as Partial<CmsLink>);
          await refresh();
        }}
      />
      <CrudTable
        title="Theme Settings"
        columns={["key", "value"]}
        rows={themeSettings as unknown as Record<string, unknown>[]}
        onSave={async (row) => {
          await upsertThemeSetting({
            key: String(row.key),
            value: typeof row.value === "string" ? JSON.parse(row.value) : (row.value as Record<string, unknown>),
          });
          await refresh();
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
          await refresh();
        }}
      />
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
  const [draft, setDraft] = useState<Record<string, unknown>>({});

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
                          [idx]: { ...row, ...(prev[idx] || {}), [col]: e.target.value },
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

