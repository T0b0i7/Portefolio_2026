import { useCallback, useRef } from "react";
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

  const trackEvent = useCallback(
    async (eventName: string, metadata?: Record<string, unknown>) => {
      try {
        await supabase.from("visitor_events").insert({
          event_type: "custom",
          event_name: eventName,
          metadata: metadata ?? null,
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
      await supabase.from("visitor_events").insert({
        event_type: "page_view",
        event_name: pageName,
        metadata: null,
        session_id: sessionId.current,
      });
    } catch {
      // Silently fail
    }
  }, []);

  return { trackEvent, trackPageView };
}
