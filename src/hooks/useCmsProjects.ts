import { useEffect, useMemo, useState } from "react";
import projectsSeed from "../../projects_seed.json";
import { fetchProjectsFromCms } from "@/lib/cms-service";
import type { CmsProject } from "@/types/cms";

const fallbackProjects = projectsSeed as CmsProject[];

export function useCmsProjects() {
  const [projects, setProjects] = useState<CmsProject[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const remote = await fetchProjectsFromCms();
        if (!cancelled && remote.length > 0) setProjects(remote);
      } catch {
        // Fallback local seed.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const hasRemoteData = useMemo(
    () => projects.length > 0 && projects !== fallbackProjects,
    [projects]
  );

  return { projects, loading, hasRemoteData };
}

