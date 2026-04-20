import { useEffect } from "react";
import { trackEvent } from "@/lib/tracker";

export function useSectionTracking(canTrack: boolean) {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]")) as HTMLElement[];
    if (!sections.length) return;

    const observed = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).id;
          if (!id || observed.has(id)) continue;
          observed.add(id);
          void trackEvent(
            "section_view",
            {
              pagePath: `${window.location.pathname}${window.location.search}`,
              sectionId: id,
            },
            canTrack
          );
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [canTrack]);
}

