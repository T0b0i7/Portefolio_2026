import { supabase } from "@/lib/supabase";
import { Project } from "@/types/project";

interface ProjectDbRow {
  id: number;
  title_fr: string;
  title_en: string;
  category: string;
  description_fr: string;
  description_en: string;
  tags: string[] | null;
  impact: string | null;
  metrics_type: string | null;
  color: Project["color"] | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  project_url: string | null;
  status_fr: string | null;
  status_en: string | null;
  is_locked: boolean | null;
  is_featured: boolean | null;
}

interface ProjectDbUpdates {
  title_fr?: string;
  title_en?: string;
  description_fr?: string;
  description_en?: string;
  category?: string;
  tags?: string[];
  impact?: string;
  metrics_type?: string;
  color?: Project["color"];
  image_url?: string;
  gallery_urls?: string[];
  project_url?: string;
}

export const projectService = {
  async getAllProjects(lang: string): Promise<Project[]> {
    const isFrench = lang.toUpperCase() === "FR";
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    return ((data as ProjectDbRow[] | null) ?? []).map((p) => ({
      id: p.id,
      title: isFrench ? p.title_fr : p.title_en,
      category: p.category,
      description: isFrench ? p.description_fr : p.description_en,
      tags: Array.isArray(p.tags) ? p.tags : [],
      metrics: {
        impact: p.impact ?? "",
        type: p.metrics_type ?? "",
      },
      color: p.color ?? "primary",
      image: p.image_url ?? undefined,
      images: Array.isArray(p.gallery_urls) ? p.gallery_urls : undefined,
      url: p.project_url ?? undefined,
      status: isFrench ? (p.status_fr ?? undefined) : (p.status_en ?? undefined),
      locked: p.is_locked ?? false,
      featured: p.is_featured ?? false,
    }));
  },

  async updateProject(id: number, updates: Partial<Project>, lang: string) {
    const isFrench = lang.toUpperCase() === "FR";
    // Map Project type back to DB columns
    const dbUpdates: ProjectDbUpdates = {};
    if (updates.title) {
        if (isFrench) dbUpdates.title_fr = updates.title;
        else dbUpdates.title_en = updates.title;
    }
    if (updates.description) {
        if (isFrench) dbUpdates.description_fr = updates.description;
        else dbUpdates.description_en = updates.description;
    }
    if (updates.category) dbUpdates.category = updates.category;
    if (updates.tags) dbUpdates.tags = updates.tags;
    if (updates.metrics) {
        dbUpdates.impact = updates.metrics.impact;
        dbUpdates.metrics_type = updates.metrics.type;
    }
    if (updates.color) dbUpdates.color = updates.color;
    if (updates.image) dbUpdates.image_url = updates.image;
    if (updates.images) dbUpdates.gallery_urls = updates.images;
    if (updates.url) dbUpdates.project_url = updates.url;
    
    const { data, error } = await supabase
      .from("projects")
      .update(dbUpdates)
      .eq("id", id)
      .select();

    return { data, error };
  },

  async createProject(project: Partial<Project>, lang: string) {
      // Similar mapping as update...
      // Simplified for now
      const { data, error } = await supabase
        .from("projects")
        .insert([{
            title_fr: project.title,
            title_en: project.title,
            description_fr: project.description,
            description_en: project.description,
            category: project.category || "Uncategorized",
            tags: project.tags || [],
            impact: project.metrics?.impact,
            metrics_type: project.metrics?.type,
            color: project.color || "primary"
        }]);
      return { data, error };
  },

  async deleteProject(id: number) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    return { error };
  }
};
