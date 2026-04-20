import { supabase } from "@/integrations/supabase/client";

export type TrackerEventType = "page_view" | "click" | "section_view" | "scroll_depth";

type BasePayload = {
  pagePath: string;
  pageTitle?: string;
  sectionId?: string;
  linkId?: string;
  elementText?: string;
  elementHref?: string;
};

const TRACKING_SESSION_KEY = "portfolio_tracking_session_token";
const GEO_CACHE_KEY = "portfolio_geo_cache_v1";

function getSessionToken() {
  const existing = localStorage.getItem(TRACKING_SESSION_KEY);
  if (existing) return existing;
  const token = crypto.randomUUID();
  localStorage.setItem(TRACKING_SESSION_KEY, token);
  return token;
}

function parseUserAgent() {
  const ua = navigator.userAgent;
  const browser = /Chrome/.test(ua)
    ? "Chrome"
    : /Safari/.test(ua)
    ? "Safari"
    : /Firefox/.test(ua)
    ? "Firefox"
    : "Other";
  const os = /Windows/.test(ua)
    ? "Windows"
    : /Mac OS/.test(ua)
    ? "macOS"
    : /Android/.test(ua)
    ? "Android"
    : /iPhone|iPad/.test(ua)
    ? "iOS"
    : "Other";

  return {
    browser,
    os,
    device: /Mobi|Android|iPhone/.test(ua) ? "mobile" : "desktop",
  };
}

async function getGeo() {
  const cached = localStorage.getItem(GEO_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // Ignore malformed cache.
    }
  }

  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return null;
    const data = await res.json();
    const geo = {
      country: data.country_name as string | undefined,
      city: data.city as string | undefined,
      lat: data.latitude as number | undefined,
      lng: data.longitude as number | undefined,
    };
    localStorage.setItem(GEO_CACHE_KEY, JSON.stringify(geo));
    return geo;
  } catch {
    return null;
  }
}

async function insertEventDirect(eventType: TrackerEventType, payload: BasePayload) {
  if (!supabase) return;
  const sessionToken = getSessionToken();
  const ua = parseUserAgent();
  const geo = await getGeo();

  const { data: existingSession } = await supabase
    .from("visitor_sessions")
    .select("id")
    .eq("session_token", sessionToken)
    .maybeSingle();

  let sessionId = existingSession?.id as string | undefined;

  if (!sessionId) {
    const { data } = await supabase
      .from("visitor_sessions")
      .insert({
        session_token: sessionToken,
        ...ua,
        language: navigator.language,
        referrer: document.referrer || null,
        ...geo,
      })
      .select("id")
      .single();
    sessionId = data?.id as string;
  } else {
    await supabase
      .from("visitor_sessions")
      .update({
        last_seen_at: new Date().toISOString(),
      })
      .eq("id", sessionId);
  }

  if (!sessionId) return;

  if (eventType === "page_view") {
    await supabase.from("page_views").insert({
      session_id: sessionId,
      page_path: payload.pagePath,
      page_title: payload.pageTitle || document.title,
    });
  }

  if (eventType === "click") {
    await supabase.from("click_events").insert({
      session_id: sessionId,
      page_path: payload.pagePath,
      section_id: payload.sectionId || null,
      link_id: payload.linkId || null,
      element_text: payload.elementText || null,
      element_href: payload.elementHref || null,
    });
  }

  if (eventType === "section_view" && payload.sectionId) {
    await supabase.from("section_events").insert({
      session_id: sessionId,
      page_path: payload.pagePath,
      section_id: payload.sectionId,
    });
  }

  if (eventType === "scroll_depth" && payload.sectionId) {
    await supabase.from("scroll_events").insert({
      session_id: sessionId,
      page_path: payload.pagePath,
      scroll_depth: parseInt(payload.sectionId.replace("scroll_", ""), 10),
    });
  }
}

export async function trackEvent(eventType: TrackerEventType, payload: BasePayload, canTrack: boolean) {
  if (!canTrack || typeof window === "undefined" || !supabase) return;
  try {
    await insertEventDirect(eventType, payload);
  } catch {
    // Tracking errors should never break UX.
  }
}

