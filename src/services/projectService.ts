import projectsData from "../../projects_seed.json";
import { Project } from "@/types/project";

interface ProjectRow {
  id: number;
  title_fr: string;
  title_en: string;
  category: string;
  description_fr: string;
  description_en: string;
  tags: string[];
  impact?: string;
  metrics_type?: string;
  color?: string;
  image_url?: string;
  gallery_urls?: string[];
  project_url?: string;
  is_locked?: boolean;
  is_featured?: boolean;
  status_fr?: string;
  status_en?: string;
}

export const projectService = {
  getAllProjects(lang: string): Project[] {
    const isFrench = lang.toUpperCase() === "FR";
    const typedData = projectsData as ProjectRow[];

    return typedData.map((p) => ({
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

  updateProject(_id: number, _updates: Partial<Project>, _lang: string) {
    return { data: null, error: null };
  },

  createProject(_project: Partial<Project>, _lang: string) {
    return { data: null, error: null };
  },

  deleteProject(_id: number) {
    return { error: null };
  }
};