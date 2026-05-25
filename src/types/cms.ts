export type CmsProject = {
  id: number;
  title_fr: string;
  title_en: string;
  category: string;
  description_fr: string;
  description_en: string;
  tags: string[];
  impact?: string | null;
  metrics_type?: string | null;
  color?: string | null;
  image_url?: string | null;
  gallery_urls?: string[] | null;
  project_url?: string | null;
  is_locked?: boolean;
  is_featured?: boolean;
  status_fr?: string | null;
  status_en?: string | null;
  sort_order?: number;
  status?: "draft" | "published" | "archived";
};

export type CmsSection = {
  id: string;
  title_fr: string;
  title_en: string;
  content_fr?: string | null;
  content_en?: string | null;
  description_fr?: string | null;
  description_en?: string | null;
  icon_name?: string | null;
  is_enabled: boolean;
  sort_order: number;
  status?: "draft" | "published" | "archived";
};

export type Testimonial = {
  id: number;
  name: string;
  role?: string | null;
  company?: string | null;
  text: string;
  rating: number;
  avatar_url?: string | null;
  stats?: string | null;
  impact?: string | null;
  sort_order: number;
  is_active: boolean;
};

export type ServiceItem = {
  id: number;
  icon_name: string;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  skills: string[];
  sort_order: number;
  is_active: boolean;
};

export type CmsLink = {
  id: string;
  slug?: string | null;
  label: string;
  href: string;
  section_id?: string | null;
  is_external: boolean;
  is_enabled: boolean;
  sort_order: number;
};

export type ThemeSetting = {
  key: string;
  value: Record<string, unknown>;
};

export type SiteSetting = {
  key: string;
  value: Record<string, unknown>;
};

export type TrackingEventType = "page_view" | "click" | "section_view";

export type LiveEvent = {
  id: string;
  type: TrackingEventType;
  page_path: string;
  section_id?: string | null;
  element_text?: string | null;
  occurred_at: string;
  country?: string | null;
  city?: string | null;
  lat?: number | null;
  lng?: number | null;
};

