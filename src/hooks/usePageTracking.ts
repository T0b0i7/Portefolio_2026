import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/tracker";

const THRESHOLDS = [25, 50, 75, 90, 100];

export function usePageTracking(canTrack: boolean) {
  const location = useLocation();
  const maxScrollRef = useRef(0);
  const lastScrollEventRef = useRef<string | null>(null);

  const handleScroll = useCallback(() => {
    if (!canTrack) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

    if (scrollPercent <= maxScrollRef.current) return;

    const newMax = maxScrollRef.current;
    for (const threshold of THRESHOLDS) {
      if (newMax < threshold && scrollPercent >= threshold) {
        const eventKey = `${location.pathname}-${threshold}`;
        if (lastScrollEventRef.current !== eventKey) {
          lastScrollEventRef.current = eventKey;
          void trackEvent(
            "scroll_depth",
            {
              pagePath: `${location.pathname}${location.search}`,
              sectionId: `scroll_${threshold}`,
            },
            canTrack
          );
        }
      }
    }

    maxScrollRef.current = Math.max(maxScrollRef.current, scrollPercent);
  }, [canTrack, location.pathname, location.search]);

  useEffect(() => {
    void trackEvent(
      "page_view",
      {
        pagePath: `${location.pathname}${location.search}`,
        pageTitle: document.title,
      },
      canTrack
    );
  }, [location.pathname, location.search, canTrack]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    maxScrollRef.current = 0;
    lastScrollEventRef.current = null;
  }, [location.pathname]);
}