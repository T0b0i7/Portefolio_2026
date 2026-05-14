export type Permission =
  | 'view_analytics'
  | 'edit_analytics'
  | 'view_cms'
  | 'edit_cms'
  | 'delete_cms'
  | 'view_projects'
  | 'edit_projects'
  | 'view_settings'
  | 'edit_settings'
  | 'view_tracking'
  | 'edit_tracking';

export interface Role {
  name: string;
  permissions: Permission[];
}

export const ROLES: Role[] = [
  { name: 'admin', permissions: ['*'] },
  { name: 'editor', permissions: ['view_cms', 'edit_cms', 'view_projects', 'edit_projects'] },
  { name: 'viewer', permissions: ['view_analytics', 'view_cms', 'view_projects'] },
];

export interface BackofficeStats {
  totalViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  bounceRate: number;
  pagesPerSession: number;
  conversions: number;
  topReferrers: { source: string; count: number }[];
  topCountries: { country: string; count: number }[];
  hourlyTraffic: { hour: number; count: number }[];
  viewsChange: number;
  visitorsChange: number;
  durationChange: number;
  bounceChange: number;
}

export interface ExportFormat {
  type: 'pdf' | 'csv' | 'json';
  period: 'today' | '7days' | '30days' | 'custom';
  dateRange?: { start: Date; end: Date };
}

export interface SeoSettings {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  noIndex: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  order: number;
  isEnabled: boolean;
  sectionId?: string;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  uploadedAt: Date;
  alt?: string;
  caption?: string;
}

export interface TrackingEvent {
  id: string;
  type: 'page_view' | 'click' | 'scroll' | 'custom';
  name?: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
  visitorId: string;
}

export interface ConversionFunnel {
  step: string;
  count: number;
  percentage: number;
}

export type BackofficeTab = 
  | 'dashboard'
  | 'analytics'
  | 'cms'
  | 'projects'
  | 'settings'
  | 'tracking';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  read: boolean;
}