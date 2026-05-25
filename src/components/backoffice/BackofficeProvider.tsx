import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Overview {
  activeVisitors: number;
  pageViews24h: number;
  clicks24h: number;
  sectionViews24h: number;
  avgSessionDuration: number;
  bounceRate: number;
}

interface LiveEvent {
  id: string;
  type: "page_view" | "click" | "section_view";
  page_path: string;
  section_id?: string;
  element_text?: string;
  occurred_at: string;
  country?: string;
  city?: string;
  lat?: number;
  lng?: number;
}

interface VisitorData {
  id: string;
  country: string | null;
  city: string | null;
  lat: number | null;
  lng: number | null;
  lastSeenAt: string;
  pagesVisited: number;
  clicksCount: number;
  sectionsViewed: number;
  startedAt: string;
}

interface Stats {
  totalViews: number;
  uniqueVisitors: number;
  topReferrers: { source: string; count: number }[];
  topCountries: { country: string; count: number }[];
  hourlyTraffic: { hour: number; count: number }[];
}

interface BackofficeData {
  overview: Overview;
  events: LiveEvent[];
  visitors: VisitorData[];
  activeVisitors: VisitorData[];
  globePoints: { id: string; lat: number; lng: number; country?: string; city?: string }[];
  stats: Stats;
  loading: boolean;
}

const BackofficeContext = createContext<BackofficeData | null>(null);

export function useBackofficeData() {
  const context = useContext(BackofficeContext);
  if (!context) {
    throw new Error("useBackofficeData must be used within BackofficeProvider");
  }
  return context;
}

interface BackofficeProviderProps {
  children: React.ReactNode;
  period: "today" | "7days" | "30days";
}

export function BackofficeProvider({ children, period }: BackofficeProviderProps) {
  const [overview, setOverview] = useState<Overview>({
    activeVisitors: 0,
    pageViews24h: 0,
    clicks24h: 0,
    sectionViews24h: 0,
  });
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalViews: 0,
    uniqueVisitors: 0,
    topReferrers: [],
    topCountries: [],
    hourlyTraffic: [],
  });

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const now = new Date();
      let startDate: Date;
      
      switch (period) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case "7days":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "30days":
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
      }

      const [
        { data: sessions, count: sessionsCount },
        { data: pageViewsData, count: pageViewsCount },
        { data: clicksData, count: clicksCount },
        { data: sectionData, count: sectionViewsCount },
        { data: recentPageViews },
        { data: recentClicks },
        { data: recentSections },
      ] = await Promise.all([
        supabase
          .from("visitor_sessions")
          .select("*", { count: "exact" })
          .gte("started_at", startDate.toISOString()),
        supabase
          .from("page_views")
          .select("occurred_at", { count: "exact" })
          .gte("occurred_at", startDate.toISOString()),
        supabase
          .from("click_events")
          .select("id", { count: "exact" })
          .gte("occurred_at", startDate.toISOString()),
        supabase
          .from("section_events")
          .select("id", { count: "exact" })
          .gte("occurred_at", startDate.toISOString()),
        supabase
          .from("page_views")
          .select("id,page_path,occurred_at,visitor_sessions(country,city,lat,lng)")
          .order("occurred_at", { ascending: false })
          .limit(50),
        supabase
          .from("click_events")
          .select("id,page_path,section_id,element_text,occurred_at,visitor_sessions(country,city,lat,lng)")
          .order("occurred_at", { ascending: false })
          .limit(30),
        supabase
          .from("section_events")
          .select("id,page_path,section_id,occurred_at,visitor_sessions(country,city,lat,lng)")
          .order("occurred_at", { ascending: false })
          .limit(30),
      ]);

      const durations = visitorData
        .map(v => new Date(v.lastSeenAt).getTime() - new Date(v.startedAt).getTime())
        .filter(d => d > 0 && d < 3600000);
      const avgDuration = durations.length > 0
        ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length / 1000)
        : 0;

      let bounceCount = 0;
      (sessions || []).forEach((s: Record<string, unknown>) => {
        const lastSeen = new Date(s.last_seen_at as string).getTime();
        const started = new Date(s.started_at as string).getTime();
        if (lastSeen - started < 15000) bounceCount++;
      });
      const bounceRate = (sessions?.length || 0) > 0
        ? Math.round((bounceCount / (sessions?.length || 1)) * 100)
        : 0;

      setOverview({
        activeVisitors: sessionsCount || 0,
        pageViews24h: pageViewsCount || 0,
        clicks24h: clicksCount || 0,
        sectionViews24h: sectionViewsCount || 0,
        avgSessionDuration: avgDuration,
        bounceRate,
      });

      const packedEvents: LiveEvent[] = [
        ...(recentPageViews || []).map((item: Record<string, unknown>) => ({
          id: item.id as string,
          type: "page_view" as const,
          page_path: item.page_path as string,
          occurred_at: item.occurred_at as string,
          country: (item.visitor_sessions as Record<string, unknown>)?.country as string | undefined,
          city: (item.visitor_sessions as Record<string, unknown>)?.city as string | undefined,
          lat: (item.visitor_sessions as Record<string, unknown>)?.lat as number | undefined,
          lng: (item.visitor_sessions as Record<string, unknown>)?.lng as number | undefined,
        })),
        ...(recentClicks || []).map((item: Record<string, unknown>) => ({
          id: item.id as string,
          type: "click" as const,
          page_path: item.page_path as string,
          section_id: item.section_id as string | undefined,
          element_text: item.element_text as string | undefined,
          occurred_at: item.occurred_at as string,
          country: (item.visitor_sessions as Record<string, unknown>)?.country as string | undefined,
          city: (item.visitor_sessions as Record<string, unknown>)?.city as string | undefined,
          lat: (item.visitor_sessions as Record<string, unknown>)?.lat as number | undefined,
          lng: (item.visitor_sessions as Record<string, unknown>)?.lng as number | undefined,
        })),
        ...(recentSections || []).map((item: Record<string, unknown>) => ({
          id: item.id as string,
          type: "section_view" as const,
          page_path: item.page_path as string,
          section_id: item.section_id as string | undefined,
          occurred_at: item.occurred_at as string,
          country: (item.visitor_sessions as Record<string, unknown>)?.country as string | undefined,
          city: (item.visitor_sessions as Record<string, unknown>)?.city as string | undefined,
          lat: (item.visitor_sessions as Record<string, unknown>)?.lat as number | undefined,
          lng: (item.visitor_sessions as Record<string, unknown>)?.lng as number | undefined,
        })),
      ].sort((a, b) => +new Date(b.occurred_at) - +new Date(a.occurred_at));

      setEvents(packedEvents);

      const visitorData: VisitorData[] = (sessions || []).map((s: Record<string, unknown>) => ({
        id: s.id as string,
        country: s.country as string | null,
        city: s.city as string | null,
        lat: s.lat as number | null,
        lng: s.lng as number | null,
        lastSeenAt: s.last_seen_at as string,
        startedAt: s.started_at as string,
        pagesVisited: 0,
        clicksCount: 0,
        sectionsViewed: 0,
      }));

      setVisitors(visitorData);

      const activeNow = visitorData.filter(v => 
        new Date(v.lastSeenAt).getTime() > Date.now() - 5 * 60 * 1000
      );
      
      const referrerCount: Record<string, number> = {};
      const countryCount: Record<string, number> = {};
      const hourlyCount: Record<number, number> = {};

      (sessions || []).forEach((s: Record<string, unknown>) => {
        if (s.referrer) {
          try {
            const source = new URL(s.referrer as string).hostname;
            referrerCount[source] = (referrerCount[source] || 0) + 1;
          } catch {
            referrerCount["direct"] = (referrerCount["direct"] || 0) + 1;
          }
        }
        if (s.country) {
          countryCount[s.country as string] = (countryCount[s.country as string] || 0) + 1;
        }
      });

      (pageViewsData || []).forEach((p: Record<string, unknown>) => {
        const hour = new Date(p.occurred_at as string).getHours();
        hourlyCount[hour] = (hourlyCount[hour] || 0) + 1;
      });

      setStats({
        totalViews: pageViewsCount || 0,
        uniqueVisitors: new Set((sessions || []).map((s: Record<string, unknown>) => s.id)).size,
        topReferrers: Object.entries(referrerCount)
          .map(([source, count]) => ({ source, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5),
        topCountries: Object.entries(countryCount)
          .map(([country, count]) => ({ country, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5),
        hourlyTraffic: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          count: hourlyCount[i] || 0,
        })),
      });

      setLoading(false);
    };

    void fetchData();

    const ch = supabase
      .channel("backoffice-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "page_views" }, () => void fetchData())
      .on("postgres_changes", { event: "*", schema: "public", table: "click_events" }, () => void fetchData())
      .on("postgres_changes", { event: "*", schema: "public", table: "visitor_sessions" }, () => void fetchData())
      .subscribe();

    return () => {
      void supabase.removeChannel(ch);
    };
  }, [period]);

  const activeVisitors = useMemo(() => 
    visitors.filter(v => new Date(v.lastSeenAt).getTime() > Date.now() - 5 * 60 * 1000),
    [visitors]
  );

  const globePoints = useMemo(() => 
    visitors
      .filter(v => typeof v.lat === "number" && typeof v.lng === "number")
      .map(v => ({
        id: v.id,
        lat: v.lat!,
        lng: v.lng!,
        country: v.country || undefined,
        city: v.city || undefined,
      })),
    [visitors]
  );

  const value = useMemo(() => ({
    overview,
    events,
    visitors,
    activeVisitors,
    globePoints,
    stats,
    loading,
  }), [overview, events, visitors, activeVisitors, globePoints, stats, loading]);

  return (
    <BackofficeContext.Provider value={value}>
      {children}
    </BackofficeContext.Provider>
  );
}