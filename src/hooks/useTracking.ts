import { useCallback, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Generate a stable session ID for the current browser tab
function getSessionId(): string {
  const key = "portfolio_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export function useTracking() {
  const sessionId = useRef(getSessionId());

  // Function to get geo info via free API
  const getGeoInfo = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        city: data.city,
        country: data.country_name,
        device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop"
      };
    } catch {
      return { city: "Unknown", country: "Unknown", device: "Desktop" };
    }
  };

  const trackEvent = useCallback(
    async (eventName: string, metadata?: Record<string, unknown>) => {
      try {
        const geo = await getGeoInfo();
        await supabase.from("visitor_events").insert({
          event_type: "custom",
          event_name: eventName,
          metadata: { ...metadata, ...geo },
          session_id: sessionId.current,
        });
      } catch {
        // Don't crash the app if tracking fails
      }
    },
    []
  );

  const trackPageView = useCallback(async (pageName: string) => {
    try {
      const geo = await getGeoInfo();
      await supabase.from("visitor_events").insert({
        event_type: "page_view",
        event_name: pageName,
        metadata: geo,
        session_id: sessionId.current,
      });
    } catch {
      // Silently fail
    }
  }, []);

  return { trackEvent, trackPageView };
}
