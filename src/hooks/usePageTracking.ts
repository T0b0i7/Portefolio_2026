import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/tracker";

export function usePageTracking(canTrack: boolean) {
  const location = useLocation();

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
}

