import experiencesData from "../../experiences_seed.json";

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

interface ExperienceRow {
  id: number;
  type: "work" | "education" | string;
  title_fr: string;
  title_en: string;
  company: string;
  company_fr?: string;
  company_en?: string;
  location: string;
  location_fr?: string;
  location_en?: string;
  period: string;
  period_fr: string;
  period_en: string;
  description_fr: string[] | null;
  description_en: string[] | null;
  status_fr: string | null;
  status_en: string | null;
}

export const experienceService = {
  getAllExperiences(lang: string): Experience[] {
    const isFrench = lang.toUpperCase() === "FR";
    const typedData = experiencesData as ExperienceRow[];

    return typedData.map((e) => ({
      id: e.id,
      type: e.type,
      title: isFrench ? e.title_fr : e.title_en,
      company: isFrench 
        ? (e.company_fr || e.company || "") 
        : (e.company_en || e.company || ""),
      location: isFrench 
        ? (e.location_fr || e.location || "") 
        : (e.location_en || e.location || ""),
      period: isFrench ? e.period_fr : e.period_en,
      description: isFrench
        ? (Array.isArray(e.description_fr) ? e.description_fr : [])
        : (Array.isArray(e.description_en) ? e.description_en : []),
      status: isFrench ? (e.status_fr || undefined) : (e.status_en || undefined),
    }));
  }
};