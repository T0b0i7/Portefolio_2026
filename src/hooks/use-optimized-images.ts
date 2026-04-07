import { useEffect, useState } from "react";

interface OptimizedImage {
  original: string;
  webp: string;
  srcset: string;
  blurDataURL?: string;
}

let mappingCache: Record<string, OptimizedImage> | null = null;
let mappingPromise: Promise<Record<string, OptimizedImage>> | null = null;

export function useOptimizedImages() {
  const [imageMapping, setImageMapping] = useState<Record<string, OptimizedImage>>(mappingCache ?? {});
  const [loading, setLoading] = useState(!mappingCache);

  useEffect(() => {
    if (mappingCache) {
      setImageMapping(mappingCache);
      setLoading(false);
      return;
    }

    if (!mappingPromise) {
      mappingPromise = fetch("/design/optimized/image-mapping.json")
        .then((response) => response.json())
        .then((data: OptimizedImage[]) => {
          const mapping: Record<string, OptimizedImage> = {};
          data.forEach((item) => {
            mapping[item.original] = item;
          });
          mappingCache = mapping;
          return mapping;
        });
    }

    mappingPromise
      .then((mapping) => {
        setImageMapping(mapping);
        setLoading(false);
      })
      .catch((error) => {
        console.warn("Erreur lors du chargement du mapping des images optimisées:", error);
        setLoading(false);
      });
  }, []);

  const getOptimizedImage = (originalPath: string): OptimizedImage | null => {
    const withoutQuery = originalPath.split("?")[0];
    const filename = decodeURIComponent(withoutQuery.split("/").pop() || "");
    const optimized = imageMapping[filename];

    if (!optimized) return null;

    return {
      ...optimized,
      webp: `/design/optimized/${optimized.webp}`,
      srcset: optimized.srcset
        .split(", ")
        .map((entry) => {
          const [filePart, sizePart] = entry.split(" ");
          return filePart ? `/design/optimized/${filePart}${sizePart ? ` ${sizePart}` : ""}` : entry;
        })
        .join(", "),
    };
  };

  return { imageMapping, loading, getOptimizedImage };
}
