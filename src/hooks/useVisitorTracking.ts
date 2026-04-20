import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Visitor {
  id: string;
  sessionToken: string;
  country: string | null;
  city: string | null;
  lat: number | null;
  lng: number | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  referrer: string | null;
  startedAt: string;
  lastSeenAt: string;
}

export interface VisitorEvent {
  id: string;
  type: "page_view" | "click" | "section_view";
  pagePath: string;
  sectionId: string | null;
  elementText: string | null;
  occurredAt: string;
}

export interface VisitorWithJourney extends Visitor {
  journey: VisitorEvent[];
  firstPage: string;
  lastPage: string;
  pagesVisited: number;
  clicksCount: number;
  sectionsViewed: number;
}

export function useVisitorTracking() {
  const [visitors, setVisitors] = useState<VisitorWithJourney[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorWithJourney | null>(null);

  const fetchVisitors = async () => {
    if (!supabase) return;

    const { data: sessions } = await supabase
      .from("visitor_sessions")
      .select("*")
      .gt("last_seen_at", new Date(Date.now() - 30 * 60 * 1000).toISOString())
      .order("last_seen_at", { ascending: false });

    if (!sessions || sessions.length === 0) {
      setLoading(false);
      return;
    }

    const sessionIds = sessions.map((s) => s.id);

    const [{ data: pageViews }, { data: clicks }, { data: sectionViews }] = await Promise.all([
      supabase
        .from("page_views")
        .select("id,session_id,page_path,occurred_at")
        .in("session_id", sessionIds)
        .order("occurred_at", { ascending: true }),
      supabase
        .from("click_events")
        .select("id,session_id,page_path,section_id,element_text,occurred_at")
        .in("session_id", sessionIds)
        .order("occurred_at", { ascending: true }),
      supabase
        .from("section_events")
        .select("id,session_id,page_path,section_id,occurred_at")
        .in("session_id", sessionIds)
        .order("occurred_at", { ascending: true }),
    ]);

    const eventsBySession: Record<string, VisitorEvent[]> = {};

    pageViews?.forEach((e) => {
      if (!eventsBySession[e.session_id]) eventsBySession[e.session_id] = [];
      eventsBySession[e.session_id].push({
        id: e.id,
        type: "page_view",
        pagePath: e.page_path,
        sectionId: null,
        elementText: null,
        occurredAt: e.occurred_at,
      });
    });

    clicks?.forEach((e) => {
      if (!eventsBySession[e.session_id]) eventsBySession[e.session_id] = [];
      eventsBySession[e.session_id].push({
        id: e.id,
        type: "click",
        pagePath: e.page_path,
        sectionId: e.section_id,
        elementText: e.element_text,
        occurredAt: e.occurred_at,
      });
    });

    sectionViews?.forEach((e) => {
      if (!eventsBySession[e.session_id]) eventsBySession[e.session_id] = [];
      eventsBySession[e.session_id].push({
        id: e.id,
        type: "section_view",
        pagePath: e.page_path,
        sectionId: e.section_id,
        elementText: null,
        occurredAt: e.occurred_at,
      });
    });

    const visitorsWithJourney: VisitorWithJourney[] = sessions.map((session) => {
      const journey = eventsBySession[session.id] || [];
      const pageViewsInJourney = journey.filter((e) => e.type === "page_view");
      return {
        id: session.id,
        sessionToken: session.session_token,
        country: session.country,
        city: session.city,
        lat: session.lat,
        lng: session.lng,
        device: session.device,
        browser: session.browser,
        os: session.os,
        referrer: session.referrer,
        startedAt: session.started_at,
        lastSeenAt: session.last_seen_at,
        journey: journey.sort(
          (a, b) => new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime()
        ),
        firstPage: pageViewsInJourney[0]?.pagePath || "/",
        lastPage: pageViewsInJourney[pageViewsInJourney.length - 1]?.pagePath || "/",
        pagesVisited: pageViewsInJourney.length,
        clicksCount: journey.filter((e) => e.type === "click").length,
        sectionsViewed: journey.filter((e) => e.type === "section_view").length,
      };
    });

    setVisitors(visitorsWithJourney);
    setLoading(false);
  };

  useEffect(() => {
    void fetchVisitors();

    if (!supabase) return;

    const ch = supabase
      .channel("visitor-tracking")
      .on("postgres_changes", { event: "*", schema: "public", table: "visitor_sessions" }, () => void fetchVisitors())
      .on("postgres_changes", { event: "*", schema: "public", table: "page_views" }, () => void fetchVisitors())
      .on("postgres_changes", { event: "*", schema: "public", table: "click_events" }, () => void fetchVisitors())
      .on("postgres_changes", { event: "*", schema: "public", table: "section_events" }, () => void fetchVisitors())
      .subscribe();

    return () => {
      void supabase.removeChannel(ch);
    };
  }, []);

  const activeVisitors = useMemo(
    () => visitors.filter((v) => new Date(v.lastSeenAt).getTime() > Date.now() - 5 * 60 * 1000),
    [visitors]
  );

  const globePoints = useMemo(
    () =>
      visitors
        .filter((v) => typeof v.lat === "number" && typeof v.lng === "number")
        .map((v) => ({
          id: v.id,
          lat: v.lat!,
          lng: v.lng!,
          country: v.country,
          city: v.city,
        })),
    [visitors]
  );

  return {
    visitors,
    activeVisitors,
    globePoints,
    loading,
    selectedVisitor,
    setSelectedVisitor,
    refresh: fetchVisitors,
  };
}