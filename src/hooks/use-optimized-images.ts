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
    return imageMapping[filename];
  };

  return { imageMapping, loading, getOptimizedImage };
}