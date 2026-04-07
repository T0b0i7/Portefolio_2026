import { supabase } from "@/lib/supabase";

export interface Experience {
  id: number;
  type: "work" | "education" | string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  status?: string;
  color?: string;
}

interface ExperienceDbRow {
  id: number;
  type: "work" | "education" | string;
  title_fr: string;
  title_en: string;
  company: string;
  location: string;
  period: string;
  description_fr: string[] | null;
  description_en: string[] | null;
  status_fr: string | null;
  status_en: string | null;
}

export const experienceService = {
  async getAllExperiences(lang: string): Promise<Experience[]> {
    const isFrench = lang.toUpperCase() === "FR";
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching experiences:", error);
      return [];
    }

    return ((data as ExperienceDbRow[] | null) ?? []).map((e) => ({
      id: e.id,
      type: e.type,
      title: isFrench ? e.title_fr : e.title_en,
      company: e.company,
      location: e.location,
      period: e.period,
      description: isFrench
        ? (Array.isArray(e.description_fr) ? e.description_fr : [])
        : (Array.isArray(e.description_en) ? e.description_en : []),
      status: isFrench ? (e.status_fr ?? undefined) : (e.status_en ?? undefined),
    }));
  }
};
