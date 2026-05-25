import type { CmsLink, CmsProject, CmsSection, SiteSetting, ThemeSetting, Testimonial, ServiceItem } from "@/types/cms";
import { supabase } from "@/integrations/supabase/client";

export async function fetchProjectsFromCms(): Promise<CmsProject[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  if (error) throw error;
  return (data || []) as CmsProject[];
}

export async function upsertProject(project: Partial<CmsProject>) {
  if (!supabase) throw new Error("Supabase non configuré");
  const { error } = await supabase.from("projects").upsert(project).select().single();
  if (error) throw error;
}

export async function deleteProject(id: number) {
  if (!supabase) throw new Error("Supabase non configuré");
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchSections(): Promise<CmsSection[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("sections").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return (data || []) as CmsSection[];
}

export async function upsertSection(section: Partial<CmsSection>) {
  if (!supabase) throw new Error("Supabase non configuré");
  const { error } = await supabase.from("sections").upsert(section).select().single();
  if (error) throw error;
}

export async function fetchLinks(): Promise<CmsLink[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("links").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return (data || []) as CmsLink[];
}

export async function upsertLink(link: Partial<CmsLink>) {
  if (!supabase) throw new Error("Supabase non configuré");
  const { error } = await supabase.from("links").upsert(link).select().single();
  if (error) throw error;
}

export async function fetchThemeSettings(): Promise<ThemeSetting[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("theme_settings").select("*").order("key");
  if (error) throw error;
  return (data || []) as ThemeSetting[];
}

export async function upsertThemeSetting(setting: ThemeSetting) {
  if (!supabase) throw new Error("Supabase non configuré");
  const { error } = await supabase.from("theme_settings").upsert(setting);
  if (error) throw error;
}

export async function fetchSiteSettings(): Promise<SiteSetting[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("site_settings").select("*").order("key");
  if (error) throw error;
  return (data || []) as SiteSetting[];
}

export async function upsertSiteSetting(setting: SiteSetting) {
  if (!supabase) throw new Error("Supabase non configuré");
  const { error } = await supabase.from("site_settings").upsert(setting);
  if (error) throw error;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("testimonials").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return (data || []) as Testimonial[];
}

export async function upsertTestimonial(testimonial: Partial<Testimonial>) {
  if (!supabase) throw new Error("Supabase non configuré");
  const { error } = await supabase.from("testimonials").upsert(testimonial).select().single();
  if (error) throw error;
}

export async function deleteTestimonial(id: number) {
  if (!supabase) throw new Error("Supabase non configuré");
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchServices(): Promise<ServiceItem[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return (data || []) as ServiceItem[];
}

export async function upsertService(service: Partial<ServiceItem>) {
  if (!supabase) throw new Error("Supabase non configuré");
  const { error } = await supabase.from("services").upsert(service).select().single();
  if (error) throw error;
}

export async function deleteService(id: number) {
  if (!supabase) throw new Error("Supabase non configuré");
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw error;
}

