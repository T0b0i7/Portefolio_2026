import { useEffect } from "react";
import { trackEvent } from "@/lib/tracker";

function closestSectionId(el: HTMLElement | null) {
  const section = el?.closest("section[id]") as HTMLElement | null;
  return section?.id || undefined;
}

export function useGlobalClickTracking(canTrack: boolean) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a") as HTMLAnchorElement | null;
      const button = target.closest("button") as HTMLButtonElement | null;
      const clickable = anchor || button;
      if (!clickable) return;

      const label = clickable.textContent?.trim().slice(0, 180) || "";
      const href = anchor?.href || undefined;

      void trackEvent(
        "click",
        {
          pagePath: `${window.location.pathname}${window.location.search}`,
          sectionId: closestSectionId(target),
          elementText: label,
          elementHref: href,
        },
        canTrack
      );
    };

    window.addEventListener("click", onClick, { capture: true });
    return () => window.removeEventListener("click", onClick, { capture: true });
  }, [canTrack]);
}

