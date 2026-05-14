# Spécifications Backoffice Portfolio

> Ce document définit l'architecture, les fonctionnalités et le design du backoffice pour gérer le portfolio professionnel.

---

## 1. État Actuel du Portfolio

### 1.1 Structure Identifiée

| Composant | Technologie |
|----------|-------------|
| Frontend | React 19 + TypeScript + Vite |
| Backend | Supabase (PostgreSQL) |
| Styles | TailwindCSS + animations Framer Motion |
| Tracking | Custom hooks (page views, clicks, scroll, sections) |
| CMS | Intégré via Supabase (projets, sections, liens, settings) |

### 1.2 Pages Existantes

- **Index.tsx** - Page principale avec sections: Hero, About, TechStack, Evolution, Featured Projects, Projects, Services, Testimonials, Contact, Footer
- **Admin.tsx** - Panneau d'administration avec authentification par mot de passe

### 1.3 Hooks d'Analytics Existants

- `useTracking` - Tracking personnalisé (consentement, géolocalisation)
- `useLiveAnalytics` - Analytics temps réel avec globe 3D
- `useVisitorTracking` - Suivi des visiteurs actifs
- `usePageTracking` - Tracking des pages vues
- `useScrollDepthTracking` - Profondeur de scroll
- `useSectionTracking` - Tracking des sections
- `useGlobalClickTracking` - Tracking des clics

---

## 2. Fonctionnalités du Backoffice

### 2.1 Module Analytics (Dashboard)

#### Fonctionnalités Actuelles ✓
- [x] Globe temps réel 3D (LiveGlobe)
- [x] Liste des visiteurs actifs avec ville/pays
- [x] Graphique des visites (periode: today/7days/30days)
- [x] Heatmap des sections les plus consultées
- [x] Détail d'un visiteur (parcours, pages, clics)

#### Améliorations Proposées

| # | Fonctionnalité | Priorité | Description |
|---|--------------|---------|------------|
| A1 | **Dashboard KPI** | Haute | Cartes de métriques rapides: taux de rebond, durée moyenne, pages/session, conversions |
| A2 | **Graphiques avancé** | Haute | Comparaison périodes,trafic par heure, top référents, top pays |
| A3 | **Export PDF/CSV** | Moyenne | Export des rapports analytics |
| A4 | **Alertes automatique** | Moyenne | Notifications seuils (pic trafic, erreur) |
| A5 | **Funnel conversion** | Bassse | Analyse entonnoir de conversion |
| A6 | **Cohortes utilisateurs** | Bassse | Analyse des cohortes par période |

### 2.2 Module CMS (Gestion Contenu)

#### Fonctionnalités Actuelles ✓
- [x] Gestion des projets (CRUD, reorder drag-drop)
- [x] Gestion des sections (CRUD)
- [x] Gestion des liens navigation (CRUD)
- [x] Theme settings (JSON editable)
- [x] Site settings (JSON editable)

#### Améliorations Proposées

| # | Fonctionnalité | Priorité | Description |
|---|--------------|---------|------------|
| C1 | **Éditeur WYSIWYG** | Haute | Éditeur riche pour descriptions (similar TipTap/Quill) |
| C2 | **Médiathèque** | Haute | Upload/gestion images, videos, fichiers |
| C3 | **Prévisualisation** | Haute | Preview avant publication |
| C4 | **Versionnage** | Moyenne | Historique des modifications |
| C5 | **Templates projets** | Moyenne | Modèles réutilisables |
| C6 | **Bulk edit** | Moyenne | Édition multiple |
| C7 | **Recherche globale** | Moyenne | Recherche跨 toutes les entités |
| C8 | **Import/Export JSON** | Bassse | Import/export données CMS |

### 2.3 Module Projets

| # | Fonctionnalité | Priorité | Description |
|---|--------------|---------|------------|
| P1 | **Galerie images** | Haute | Gestion gallery (order, alt, caption) |
| P2 | **Tags dynamiques** | Haute | Système tags伸缩自如 |
| P3 | **Métriques projet** | Moyenne | Views, clicks, durée visite par projet |
| P4 | **Intégrations URLs** | Moyenne | Links GitHub, live demo,case study |
| P5 | **Projet.featured avançés** | Bassse | Configuration extended featured section |

### 2.4 Module Settings

| # | Fonctionnalité | Priorité | Description |
|---|--------------|---------|------------|
| S1 | **SEO settings** | Haute | Meta titles, descriptions, OG images |
| S2 | **SEO sitemap** | Haute | Génération automatique |
| S3 | **Theme customization** | Moyenne | Personnalisation couleurs, typography |
| S4 | **Navigation editor** | Moyenne | Drag-drop menu builder |
| S5 | **Contact forms** | Moyenne | Config email, notifications |
| S6 | **Cookies/GDPR** | Bassse | Bannière consentements |
| S7 | **404 custom** | Bassse | Page 404 personnalisée |

### 2.5 Module Tracking

| # | Fonctionnalité | Priorité | Description |
|---|--------------|---------|------------|
| T1 | **Tracking dashboard** | Haute | Tableau de bord tracking |
| T2 | **Event tracking custom** | Moyenne | Événements personnalisés |
| T3 | **UTM parameters** | Moyenne | Gestion UTM, sources |
| T4 | **Heatmaps clic** | Bassse | Heatmaps des zones de clic |
| T5 | **Session replay** | Bassse | Replay sessions (DPA!) |

---

## 3. Design Backoffice (Recommandations Claude AI)

### 3.1 Philosophy

```
Dark-first, Data-dense, Action-oriented
- Contraste élevé pour lisibilité analytics
- Compact pour maximiser données écran
- Accents цветов pour guider actions
```

### 3.2 Palette Couleurs

| Role | Couleur | Usage |
|------|--------|-------|
| Background | `#0F172A` (slate-950) | Main bg |
| Surface | `#1E293B` (slate-800) | Cards, panels |
| Surface elevated | `#334155` (slate-700) | Hover, focus |
| Border | `#475569` (slate-600) | Borders |
| Text primary | `#F8FAFC` (slate-50) | Titles, values |
| Text secondary | `#94A3B8` (slate-400) | Labels |
| Accent primary | `#F97316` (orange-500) | Actions principales |
| Accent success | `#22C55E` (green-500) | Success, live |
| Accent warning | `#EAB308` (yellow-500) | Warnings |
| Accent danger | `#EF4444` (red-500) | Errors, delete |

### 3.3 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Page title | Inter | 24px | 700 |
| Section title | Inter | 18px | 600 |
| Card title | Inter | 16px | 600 |
| Body | Inter | 14px | 400 |
| Label | Inter | 12px | 500 |
| Data value | JetBrains Mono | 14px | 500 |
| Caption | Inter | 11px | 400 |

### 3.4 Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (56px)                                                │
│ [Logo] [Search] [Notifications] [Quick A] [Profile]          │
├────────────┬────────────────────────────────────────────────┤
│ SIDEBAR   │ MAIN CONTENT                                    │
│ (240px)   │                                                │
│           │ ┌──────────────────────────────────────────────┐  │
│ [Nav]     │ │ TOOLBAR (actions)                           │  │
│ - Home    │ └──────────────────────────────────────────────┘  │
│ - Analytics│                                            │
│ - CMS     │                                              │
│ - Projects│  [Content Area - scrollable]                │
│ - Settings│                                            │
│ - Tracking│                                            │
│           │                                              │
│           │                                              │
│ [Footer] │                                              │
└────────────┴────────────────────────────────────────────────┘
```

### 3.5 Composants UI

#### CardsKPIs
```
┌─────────────────────────────────────┐
│ [Icon]                         [↗]  │
│                                     │
│ +12,458                             │
│ Pages vues                          │
│ ████████░░ +8% vs hier             │
└─────────────────────────────────────┘
```
- Background: surface
- Border radius: 12px
- Padding: 16px
- Icon: opacity 0.6

#### Sidebar Item
```
[Icon] Label
         [Badge?]
```
- Height: 40px
- Padding: 12px horizontal
- Active: bg accent +10%, left border 3px accent
- Hover: bg surface-elevated

#### Data Table
```
┌────────────────────────────────────────────────────────────┐
│ [Checkbox] Title    Status    Views    Date     Actions    │
├────────────────────────────────────────────────────────────┤
│ ○           Project A   ●pub     1,234    2024-01  [⋮]     │
│ ○           Project B   ○drft    567     2024-02  [⋮]     │
└────────────────────────────────────────────────────────────┘
```
- Striped rows: alternate surface/surface+5%
- Hover row: surface-elevated
- Selection: checkbox + row highlight

#### Charts
- Noir/gris pour fond
- Accent colors pour données
- Grid lines: slate-700
- Labels: text-secondary

### 3.6 Animations

| Action | Animation | Duration |
|--------|-----------|----------|
| Page transition | Fade + slide up | 200ms |
| Modal open | Scale 0.95→1 + fade | 150ms |
| Card hover | translateY(-2px) + shadow | 150ms |
| Sidebar expand | width 64→240 | 200ms |
| Toast | slide in from right | 300ms |
| Loading skeleton | shimmer gradient | 1500ms |

---

## 4. Architecture Technique

### 4.1 Structure Fichiers

```
src/
├── components/
│   └── backoffice/
│       ├── layout/
│       │   ├── BackofficeLayout.tsx
│       │   ├── Sidebar.tsx
│       │   ├── Header.tsx
│       │   └── Menu.tsx
│       ├── dashboard/
│       │   ├── KPICards.tsx
│       │   ├── TrafficChart.tsx
│       │   ├── GeoMap.tsx
│       │   └── ActivityFeed.tsx
│       ├── analytics/
│       │   ├── StatsOverview.tsx
│       │   ├── VisitorsTable.tsx
│       │   ├── SessionsList.tsx
│       │   └── ConversionsFunnel.tsx
│       ├── cms/
│       │   ├── ProjectsManager.tsx
│       │   ├── ProjectEditor.tsx
│       │   ├── MediaLibrary.tsx
│       │   ├── RichTextEditor.tsx
│       │   └── PreviewPanel.tsx
│       ├── settings/
│       │   ├── SEOSettings.tsx
│       │   ├── ThemeCustomizer.tsx
│       │   ├── NavigationEditor.tsx
│       │   └── ContactConfig.tsx
│       └── common/
│           ├── DataTable.tsx
│           ├── SearchBar.tsx
│           ├── ExportButton.tsx
│           └── EmptyState.tsx
├── hooks/
│   └── useBackoffice.ts
├── services/
│   └── backoffice-api.ts
└── types/
    └── backoffice.ts
```

### 4.2 Routes

| Route | Component | Accès |
|------|-----------|------|
| `/backoffice` | Redirect → dashboard | Admin |
| `/backoffice/dashboard` | Dashboard | Admin |
| `/backoffice/analytics` | Analytics | Admin |
| `/backoffice/cms` | CMS Projects | Admin |
| `/backoffice/cms/sections` | CMS Sections | Admin |
| `/backoffice/cms/media` | Media Library | Admin |
| `/backoffice/projects` | Projects List | Admin |
| `/backoffice/settings` | Settings | Admin |
| `/backoffice/settings/seo` | SEO | Admin |
| `/backoffice/tracking` | Tracking | Admin |

### 4.3 Permissions

```typescript
type Permission = 
  | 'view_analytics'
  | 'edit_analytics'
  | 'view_cms'
  | 'edit_cms'
  | 'delete_cms'
  | 'view_projects'
  | 'edit_projects'
  | 'view_settings'
  | 'edit_settings'
  | 'view_tracking'
  | 'edit_tracking';

type Role = {
  name: string;
  permissions: Permission[];
};

const ROLES: Role[] = [
  { name: 'admin', permissions: ['*'] },
  { name: 'editor', permissions: ['view_cms', 'edit_cms', 'view_projects', 'edit_projects'] },
  { name: 'viewer', permissions: ['view_analytics', 'view_cms', 'view_projects'] },
];
```

---

## 5. Intégrations

### 5.1 Services Existants à Conserver

| Service | Usage |
|---------|-------|
| Supabase | Database, Auth, Realtime |
| EmailJS | Formulaire contact |
| ipapi.co | Géolocalisation tracking |

### 5.2 Nouvelles Intégrations Possibles

| Service | Fonctionnalité |
|---------|----------------|
| Cloudinary | Media hosting, transformations |
| Sentry | Error tracking |
| Hotjar | Session recordings |
| Mailchimp | Newsletter |

---

## 6. Roadmap

### Phase 1: MVP (Semaine 1-2)
- [ ] Refonte design backoffice (dark theme)
- [ ] Amélioration CMS (WYSIWYG, préview)
- [ ] Dashboard KPIs avancées
- [ ] Export données

### Phase 2: Extensions (Semaine 3-4)
- [ ] Médiathèque
- [ ] Settings SEO
- [ ] Navigation editor
- [ ] Versionnage CMS

### Phase 3: Avancé (Semaine 5-6)
- [ ] Funnel conversion
- [ ] Cohortes
- [ ] Alertes automatisées
- [ ] Session replay (optionnel)

---

## 7. Checklist Audit

### Analytics
- [x] Globe temps réel
- [x] Visiteurs actifs
- [x] Graphique visites
- [x] Heatmap sections
- [ ] KPIs avancés
- [ ] Comparaison périodes
- [ ] Export rapports

### CMS
- [x] Projets CRUD
- [x] Sections CRUD
- [x] Liens CRUD
- [x] Settings JSON
- [ ] WYSIWYG editor
- [ ] Médiathèque
- [ ] Prévisualisation
- [ ] Versionnage

### Tracking
- [x] Page views
- [x] Clics
- [x] Scroll depth
- [x] Sections views
- [ ] Events custom
- [ ] UTM tracking

### Settings
- [x] Theme settings
- [x] Site settings
- [ ] SEO settings
- [ ] Navigation editor
- [ ] Contact forms

---

## 8. Notes Techniques

### Performance
- Pagination pour les listes longues (>50 items)
- Debounce搜索 (300ms)
- Virtual scrolling pour tables >100 rows
- Lazy load composants lourds (charts, maps)

### Sécurité
- Rate limiting sur API
- Sanitization inputs
- CSRF tokens
- Audit logs actions admin

### Accessibilité
- ARIA labels
- Keyboard navigation
- Focus management
- Color contrast WCAG AA

---

*Document généré automatiquement - last updated: 2026-05-03*