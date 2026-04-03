import { useState, useEffect } from 'react';

interface OptimizedImage {
  original: string;
  webp: string;
  srcset: string;
}

export function useOptimizedImages() {
  const [imageMapping, setImageMapping] = useState<Record<string, OptimizedImage>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/design/optimized/image-mapping.json')
      .then(response => response.json())
      .then((data: OptimizedImage[]) => {
        const mapping: Record<string, OptimizedImage> = {};
        data.forEach(item => {
          mapping[item.original] = item;
        });
        setImageMapping(mapping);
        setLoading(false);
      })
      .catch(error => {
        console.warn('Erreur lors du chargement du mapping des images optimisées:', error);
        setLoading(false);
      });
  }, []);

  const getOptimizedImage = (originalPath: string) => {
    // Extraire le nom du fichier du chemin
    const filename = originalPath.split('/').pop() || '';
    const optimized = imageMapping[filename];
    if (optimized) {
      return {
        ...optimized,
        webp: `/design/optimized/${optimized.webp}`,
        srcset: optimized.srcset.split(', ').map(src => {
          const [filename] = src.split(' ');
          return filename ? `/design/optimized/${filename}` + (src.includes(' ') ? ' ' + src.split(' ')[1] : '') : src;
        }).join(', ')
      };
    }
    return null;
  };

  return { imageMapping, loading, getOptimizedImage };
}