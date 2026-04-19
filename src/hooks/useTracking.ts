import { useCallback, useEffect, useRef, useState } from "react";
import { readTrackingConsent } from "@/hooks/use-tracking-consent";

interface GeoInfo {
  city: string;
  country: string;
  device: "Mobile" | "Desktop";
}

const GEO_CACHE_KEY = "portfolio_geo_info";
let geoInfoPromise: Promise<GeoInfo> | null = null;

function getSessionId(): string {
  if (typeof window === "undefined") return "server-session";

  const key = "portfolio_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

async function fetchGeoInfo(): Promise<GeoInfo> {
  if (typeof window === "undefined") {
    return { city: "Unknown", country: "Unknown", device: "Desktop" };
  }

  const fromSession = sessionStorage.getItem(GEO_CACHE_KEY);
  if (fromSession) {
    try {
      return JSON.parse(fromSession) as GeoInfo;
    } catch {
      // ignore malformed cache
    }
  }

  if (!geoInfoPromise) {
    geoInfoPromise = (async () => {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 1600);

      try {
        const response = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("geo fetch failed");
        }

        const data = await response.json();
        const info: GeoInfo = {
          city: data.city || "Unknown",
          country: data.country_name || "Unknown",
          device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
        };

        sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify(info));
        return info;
      } catch {
        return {
          city: "Unknown",
          country: "Unknown",
          device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
        };
      } finally {
        clearTimeout(timeout);
      }
    })();
  }

  return geoInfoPromise;
}

export function useTracking() {
  const sessionId = useRef(getSessionId());
  const [canTrack, setCanTrack] = useState(() => readTrackingConsent() === "granted");

  useEffect(() => {
    const onConsentChange = () => {
      setCanTrack(readTrackingConsent() === "granted");
    };

    window.addEventListener("portfolio:tracking-consent-change", onConsentChange);
    return () => window.removeEventListener("portfolio:tracking-consent-change", onConsentChange);
  }, []);

  const trackEvent = useCallback(
    async (_eventName: string, _metadata?: Record<string, unknown>) => {
      if (!canTrack) return;

      try {
        const geo = await fetchGeoInfo();
        const eventData = {
          event_type: "custom",
          event_name: _eventName,
          metadata: { ..._metadata, ...geo },
          session_id: sessionId.current,
          timestamp: new Date().toISOString(),
        };
        const stored = JSON.parse(localStorage.getItem("portfolio_events") || "[]");
        stored.push(eventData);
        localStorage.setItem("portfolio_events", JSON.stringify(stored.slice(-100)));
      } catch {
        // Don't crash the app if tracking fails
      }
    },
    [canTrack]
  );

  const trackPageView = useCallback(
    async (pageName: string) => {
      if (!canTrack) return;

      try {
        const geo = await fetchGeoInfo();
        const eventData = {
          event_type: "page_view",
          event_name: pageName,
          metadata: geo,
          session_id: sessionId.current,
          timestamp: new Date().toISOString(),
        };
        const stored = JSON.parse(localStorage.getItem("portfolio_events") || "[]");
        stored.push(eventData);
        localStorage.setItem("portfolio_events", JSON.stringify(stored.slice(-100)));
      } catch {
        // Silently fail
      }
    },
    [canTrack]
  );

  return { trackEvent, trackPageView };
}