import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { LiveEvent } from "@/types/cms";

type Overview = {
  activeVisitors: number;
  pageViews24h: number;
  clicks24h: number;
  sectionViews24h: number;
};

type SessionLocation = {
  country?: string | null;
  city?: string | null;
  lat?: number | null;
  lng?: number | null;
};

type PageViewRow = {
  id: string;
  page_path: string;
  occurred_at: string;
  visitor_sessions?: SessionLocation | null;
};

type ClickRow = {
  id: string;
  page_path: string;
  section_id?: string | null;
  element_text?: string | null;
  occurred_at: string;
  visitor_sessions?: SessionLocation | null;
};

type SectionRow = {
  id: string;
  page_path: string;
  section_id: string;
  occurred_at: string;
  visitor_sessions?: SessionLocation | null;
};

const initialOverview: Overview = {
  activeVisitors: 0,
  pageViews24h: 0,
  clicks24h: 0,
  sectionViews24h: 0,
};

export function useLiveAnalytics() {
  const [overview, setOverview] = useState<Overview>(initialOverview);
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;
    const load = async () => {
      const [{ count: sessionsCount }, { count: pageViewsCount }, { count: clicksCount }, { count: sectionViewsCount }] =
        await Promise.all([
          supabase
            .from("visitor_sessions")
            .select("id", { count: "exact", head: true })
            .gt("last_seen_at", new Date(Date.now() - 5 * 60 * 1000).toISOString()),
          supabase
            .from("page_views")
            .select("id", { count: "exact", head: true })
            .gt("occurred_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
          supabase
            .from("click_events")
            .select("id", { count: "exact", head: true })
            .gt("occurred_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
          supabase
            .from("section_events")
            .select("id", { count: "exact", head: true })
            .gt("occurred_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
        ]);

      const [{ data: recentPageViews }, { data: recentClicks }, { data: recentSections }] = await Promise.all([
        supabase
          .from("page_views")
          .select("id,page_path,occurred_at,visitor_sessions(country,city,lat,lng)")
          .order("occurred_at", { ascending: false })
          .limit(30),
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

      const packed: LiveEvent[] = [
        ...((recentPageViews || []) as PageViewRow[]).map((item) => ({
          id: item.id,
          type: "page_view" as const,
          page_path: item.page_path,
          occurred_at: item.occurred_at,
          country: item.visitor_sessions?.country,
          city: item.visitor_sessions?.city,
          lat: item.visitor_sessions?.lat,
          lng: item.visitor_sessions?.lng,
        })),
        ...((recentClicks || []) as ClickRow[]).map((item) => ({
          id: item.id,
          type: "click" as const,
          page_path: item.page_path,
          section_id: item.section_id,
          element_text: item.element_text,
          occurred_at: item.occurred_at,
          country: item.visitor_sessions?.country,
          city: item.visitor_sessions?.city,
          lat: item.visitor_sessions?.lat,
          lng: item.visitor_sessions?.lng,
        })),
        ...((recentSections || []) as SectionRow[]).map((item) => ({
          id: item.id,
          type: "section_view" as const,
          page_path: item.page_path,
          section_id: item.section_id,
          occurred_at: item.occurred_at,
          country: item.visitor_sessions?.country,
          city: item.visitor_sessions?.city,
          lat: item.visitor_sessions?.lat,
          lng: item.visitor_sessions?.lng,
        })),
      ].sort((a, b) => +new Date(b.occurred_at) - +new Date(a.occurred_at));

      if (!active) return;
      setOverview({
        activeVisitors: sessionsCount ?? 0,
        pageViews24h: pageViewsCount ?? 0,
        clicks24h: clicksCount ?? 0,
        sectionViews24h: sectionViewsCount ?? 0,
      });
      setEvents(packed.slice(0, 40));
      setLoading(false);
    };

    void load();

    const channelRef = useRef<string | null>(null);
    if (channelRef.current) return;
    channelRef.current = "subscribed";

    const ch = supabase
      .channel("analytics-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "page_views" }, () => void load())
      .on("postgres_changes", { event: "*", schema: "public", table: "click_events" }, () => void load())
      .on("postgres_changes", { event: "*", schema: "public", table: "section_events" }, () => void load())
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(ch);
      channelRef.current = null;
    };
  }, []);

  const globePoints = useMemo(
    () => events.filter((e) => typeof e.lat === "number" && typeof e.lng === "number"),
    [events]
  );

  return { overview, events, globePoints, loading };
}

