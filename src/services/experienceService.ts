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

export const experienceService = {
  async getAllExperiences(lang: string): Promise<Experience[]> {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching experiences:", error);
      return [];
    }

    return data.map((e: any) => ({
      id: e.id,
      type: e.type,
      title: lang === "fr" ? e.title_fr : e.title_en,
      company: e.company,
      location: e.location,
      period: e.period,
      description: lang === "fr" ? e.description_fr : e.description_en,
      status: lang === "fr" ? e.status_fr : e.status_en,
    }));
  }
};
