import { useCallback, useEffect, useMemo, useState } from "react";
import projectsSeed from "../../projects_seed.json";
import { fetchProjectsFromCms } from "@/lib/cms-service";
import type { CmsProject } from "@/types/cms";

const fallbackProjects = projectsSeed as CmsProject[];

export function useCmsProjects() {
  const [projects, setProjects] = useState<CmsProject[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const remote = await fetchProjectsFromCms();
      if (remote.length > 0) setProjects(remote);
      else setProjects(fallbackProjects);
    } catch {
      // Fallback local seed.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects, refreshKey]);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  const hasRemoteData = useMemo(
    () => projects.length > 0 && projects !== fallbackProjects,
    [projects]
  );

  return { projects, loading, hasRemoteData, refresh };
}
