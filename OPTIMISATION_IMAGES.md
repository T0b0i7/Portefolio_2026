# Optimisation des Images

Ce projet utilise un système d'optimisation automatique des images pour améliorer les performances de chargement.

## Fonctionnalités

- **Conversion automatique en WebP** : Toutes les images sont converties au format WebP pour une meilleure compression
- **Génération de srcset** : Création de plusieurs tailles d'images pour le responsive design
- **Lazy loading** : Chargement différé des images hors de la zone visible
- **Décodage asynchrone** : Amélioration des performances de rendu

## Utilisation

### 1. Optimiser les images

Pour optimiser toutes les images du dossier `public/design/` :

```bash
npm run optimize-images
```

Cette commande :
- Convertit toutes les images (JPG, PNG, GIF) en WebP
- Génère 4 tailles différentes : 400w, 800w, 1200w, 1600w
- Crée un fichier `image-mapping.json` avec les correspondances

### 2. Structure des fichiers générés

```
public/design/optimized/
├── image-mapping.json          # Mapping des images
├── image1.webp                 # Version originale optimisée
├── image1-400w.webp           # Version 400px
├── image1-800w.webp           # Version 800px
├── image1-1200w.webp          # Version 1200px
└── image1-1600w.webp          # Version 1600px
```

### 3. Hook React

Le hook `useOptimizedImages` charge automatiquement le mapping et fournit :

```typescript
const { getOptimizedImage } = useOptimizedImages();

const optimized = getOptimizedImage('/design/original.jpg');
// Retourne : { original, webp, srcset }
```

### 4. Utilisation dans les composants

Les images utilisent automatiquement les versions optimisées avec `srcset` :

```jsx
<img
  src={optimized ? `/design/optimized/${optimized.webp}` : fallback}
  srcSet={optimized ? optimized.srcset.split(', ').map(src => `/design/optimized/${src}`).join(', ') : undefined}
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
  loading="lazy"
  decoding="async"
  alt="Description"
/>
```

## Avantages

- **Performance** : Images 25-35% plus légères en WebP
- **SEO** : Meilleurs Core Web Vitals (LCP, CLS)
- **Responsive** : Images adaptées à la taille d'écran
- **Compatibilité** : Fallback automatique vers les formats originaux

## Maintenance

- Réexécutez `npm run optimize-images` après avoir ajouté de nouvelles images
- Le système détecte automatiquement les nouvelles images et les optimise
- Les anciennes versions sont conservées pour éviter les liens brisés