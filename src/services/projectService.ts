import { supabase } from "@/lib/supabase";
import { Project } from "@/types/project";

export const projectService = {
  async getAllProjects(lang: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    return data.map((p: any) => ({
      id: p.id,
      title: lang === "fr" ? p.title_fr : p.title_en,
      category: p.category,
      description: lang === "fr" ? p.description_fr : p.description_en,
      tags: p.tags,
      metrics: { impact: p.impact, type: p.metrics_type },
      color: p.color,
      image: p.image_url,
      images: p.gallery_urls,
      url: p.project_url,
      status: lang === "fr" ? p.status_fr : p.status_en,
      locked: p.is_locked,
      featured: p.is_featured,
    }));
  },

  async updateProject(id: number, updates: Partial<Project>, lang: string) {
    // Map Project type back to DB columns
    const dbUpdates: any = {};
    if (updates.title) {
        if (lang === "fr") dbUpdates.title_fr = updates.title;
        else dbUpdates.title_en = updates.title;
    }
    if (updates.description) {
        if (lang === "fr") dbUpdates.description_fr = updates.description;
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
