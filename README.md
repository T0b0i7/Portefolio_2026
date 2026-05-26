# Portfolio.OS 2026 — Site Vitrine

> Portfolio professionnel nouvelle génération — Développement Web & Mobile, Design UI/UX, IA & Automation

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_ID/deploy-status)](https://portefolio-os.netlify.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.x-3ECF8E?logo=supabase)](https://supabase.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer)](https://framer.com/motion/)
[![License](https://img.shields.io/badge/Licence-MIT-green.svg)](LICENSE)

---

## Demo Live

**▶️ [portefolio-os.netlify.app](https://portefolio-os.netlify.app/)**

---

## Table des matieres

1. [Presentation generale](#-presentation-generale)
2. [Pages & Routes](#-pages--routes)
3. [Sections du portfolio](#-sections-du-portfolio)
4. [Fonctionnalites](#-fonctionnalites)
5. [Systeme de themes](#-systeme-de-themes)
6. [Stack technique](#-stack-technique)
7. [Architecture du projet](#-architecture-du-projet)
8. [Backoffice & CMS](#-backoffice--cms)
9. [Analytics & Tracking](#-analytics--tracking)
10. [Installation](#-installation)
11. [Configuration](#-configuration)
12. [Scripts disponibles](#-scripts-disponibles)
13. [Deploiement](#-deploiement)
14. [Auteur](#-auteur)

---

## Presentation generale

**Portfolio.OS** est un site vitrine professionnel de nouvelle generation, concu pour presenter un ensemble de competences et realisations dans les domaines du **developpement web full-stack**, du **design UI/UX**, du **mobile**, de l'**intelligence artificielle** et de l'**automatisation**.

Le site se distingue par son approche **modulaire et themisable** : il embarque 4 themes visuels complets (Default, Airbnb, Airtable, Aetheris) qui transforment integralement l'apparence du portfolio.

### Technologies principales

| Technologie | Utilisation |
|---|---|
| **React 19** | Framework UI |
| **TypeScript** | Typage statique |
| **Vite 5** | Build tool & HMR |
| **Tailwind CSS 3** | Styling utilitaire |
| **Framer Motion 12** | Animations fluides |
| **react-router-dom 6** | Routage client-side |
| **Supabase** | Backend, BDD, Auth, CMS |
| **TanStack React Query** | Data fetching & cache |
| **Radix UI / shadcn/ui** | Composants headless accessibles |
| **Three.js / React Three Fiber** | Visualisations 3D |
| **Recharts** | Graphiques analytics |
| **react-simple-maps / d3-geo** | Cartographie interactive |
| **Lucide React** | Icones |
| **Embla Carousel** | Carousel haute perf |
| **Zod + react-hook-form** | Validation formulaires |
| **Sonner** | Notifications toast |
| **Netlify** | Hebergement & deploiement |

---

## Pages & Routes

Le site utilise un routage client-side avec `react-router-dom` v6 et des transitions de page animees via Framer Motion (`AnimatePresence`).

| Route | Page | Description |
|---|---|---|
| `/` | `Index.tsx` | **Page principale** — portfolio en single-page scrollable avec 8 sections |
| `/admin` | `Admin.tsx` | **Panneau d'administration** — analytics + gestion CMS (protege par mot de passe) |
| `/backoffice` | `Backoffice.tsx` | **Backoffice complet** — dashboard, analytics, CMS, projets, settings, tracking en temps reel |
| `*` | `NotFound.tsx` | **Page 404** — message bilingue (FR/EN) |

### Transitions de pages

Chaque navigation declenche une animation de transition avec opacite, decalage vertical et flou, rendant la navigation fluide et immersive.

---

## Sections du portfolio

La page d'accueil (`/`) est une single-page application scrollable. Voici le detail de chaque section :

### 1. Accueil — Hero Section (`AnimatedHeroSection`)

- **Badge** : "Available for hire" / "Disponible"
- **Titre anime** : animation mot-par-mot avec effet de fondu
- **Sous-titre** : "Full-Stack Developer & UI/UX Designer"
- **CTAs** :
  - "Explore my work" → ancre vers `#projects`
  - "Get in touch" → ancre vers `#contact`
- **Liens sociaux** : GitHub, LinkedIn, Facebook (animations hover)
- **Carousel d'images** : photos de profil en rotation automatique
- **Badge d'experience** : "5+ Years of dev experience"
- **Orbes flottants** : elements decoratifs en arriere-plan

### 2. A propos — About Section (`AboutSection`)

- **Badge** : "Philosophy"
- **Citation** : Harold Abelson sur la programmation
- **Proposition de valeur** : presentation des competences et de l'approche
- **Questions audience** : 4 questions-interpellations sur l'automatisation, la presence digitale, etc.
- **CTA** : "Start the conversation"
- **Elements decoratifs** : avatars flottants avec icones (Sparkles, Users, Zap)

### 3. Arsenal — Tech Stack (`TechStackSection`)

- **Badge** : "Technical Expertise"
- **Titre** : "My Arsenal"
- **Barre de recherche** : filtre dynamique des technologies
- **Grille interactive 3D** : 37 technologies presentees comme un clavier avec 5 rangees
  - Rangees : Python / JS TS React Next.js / Node.js Django Docker Linux / et plus
  - Barre espace avec "Full-Stack Expertise"
- **Effets** : perspective 3D au survol, animation de pression au clic, tooltips au survol
- **Icones** : SimpleIcons CDN pour chaque technologie
- **Technologies couvertes** : Python, JavaScript, TypeScript, React, Next.js, Node.js, Django, Docker, Linux, Git, Tailwind CSS, PostgreSQL, Supabase, MongoDB, Redis, GraphQL, REST APIs, Three.js, Framer Motion, Figma, Adobe XD, Photoshop, Illustrator, After Effects, Premiere Pro, Blender, Unity, C++, C#, Flutter, Kotlin, Swift, AWS, GCP, Firebase, Nginx, CI/CD

### 4. Projets phares — Featured Projects (`FeaturedProjects`)


- **Grille paginee** : 3 projets par page
- **Projets presentes** : AfriEnhance AI, Portfolio.OS, SIAB Automation, CREACOM, Afrimemorie, Communio, Imona, IPPh
- **Carte projet** : image miniature, badge categorie, titre, description, tags, capacites
- **Modal de detail** :
  - Galerie d'images avec navigation (precedent/suivant)
  - Technologies frontend et backend
  - Description complete
  - Tags et capacites
  - Liens "Visit" et "Source"
- **Projets prives** : affichent un badge "Private" avec acces restreint

### 5. Projets — Projects Section (`ProjectsSection`)

- **Source de donnees** : dynamique via Supabase CMS (fallback vers donnees statiques locales)
- **Filtres par categorie** : All, Full-Stack, Web Design, Mobile, Automation, E-commerce, Gaming, Portfolio
- **Filtre croise par technologie** : selection multiple
- **Recherche textuelle** : input de recherche
- **Pagination** : numerotee + bouton "Load all"
- **Carte projet** : image, badge categorie, titre, description, note (etoiles), tags
- **Dialog de detail** : layout splitte avec galerie + infos projet, role, type, statut, tech stack, notes, boutons visit/message/request access

### 6. Services (`ServicesSection`)

5 cartes de services proposees :

1. **Web & Mobile Development** : React, Next.js, Node.js, Supabase, API Design
2. **Design & Visual Identity** : UI/UX, Figma, Brand Strategy, Prototyping
3. **Copywriting & Storytelling** : Sales Copy, Video Scripts, Brand Voice
4. **AI Strategy & Consulting** : AI Audit, Workflow Automation, LLM Integration
5. **AI Content Creation** : AI Visuals, Advanced Prompting, Creative Tech

**CTA final** : "Ready to bring your next big project to life?" → "Start a project"

### 7. Temoignages — Testimonials (`TestimonialsSection`)

- **Carousel automatique** : rotation toutes les 12 secondes
- **3 temoignages** : Epiphane Koutangni (SIAB), Grace Branco (CREACOM), Vano Baby (Gang)
- **Chaque slide** : citation, auteur, role, entreprise, carte d'impact avec statistiques (ex: "-30% processing time")
- **Controles** : play/pause, navigation prev/next, barre de progression, indicateurs a points
- **Elements decoratifs** : blobs et guillemets flottants

### 8. Contact (`ContactSection`)

- **Layout splitte** :
  - **Gauche** : informations de contact (email, telephone, localisation), liens sociaux
  - **Droite** : formulaire de contact
- **Champs** : nom, email, sujet, message + champ honeypot cache (anti-spam)
- **Validation** : temps reel avec messages d'erreur
- **Rate limiting** : 45 secondes entre deux envois
- **Compteur de caracteres** : max 2000
- **Notifications** : toasts de succes/erreur via `sonner`
- **Backend** : mock (precedemment Formspree, desormais mailto)

### 9. Navigation rapide (Quick Navigation Dots)

Barre fixe sur le cote droit avec des points cliquables pour chaque section : Accueil, A propos, Arsenal, Projects, Services, Temoignages, Contact.

### 10. Bouton Scroll to Top

Apparait apres 600px de scroll, animation spring fluide.

---

## Fonctionnalites

### Design & Theming
- **4 themes complets** interchangeables (voir section themes ci-dessous)
- **Mode sombre** via classe CSS `dark`
- **Design responsive** : mobile-first, adaptatif
- **Animations riches** : framer-motion partout (page transitions, scroll-reveal, word-by-word, spring physics)
- **Effets 3D** : perspective tilt sur la grille tech, orbes flottants

### Multilingue (FR/EN)
- **`LanguageContext`** : fournit une fonction `lang(fr, en)` utilisee dans tous les composants
- **Toggle** : bouton dans la navigation pour basculer Francais/Anglais
- **Traductions** : champs de formulaire, erreurs, sections, contenu statique, SEO

### Backoffice & CMS
- Acces securise par mot de passe (raccourci `Ctrl+M`)
- **Dashboard** : KPIs, trafic, referents, carte geographique, flux d'activite
- **Analytics** : graphiques, export de donnees
- **CMS** : gestion des sections, services, temoignages, medias
- **Gestion de projets** : CRUD complet
- **Settings** : SEO, theme, navigation, contact
- **Live tracking** : evenements en temps reel
- **Roles** : acces admin restreint

### Analytics & Tracking
- Moteur d'analytics custom base sur Supabase
- **Evenements suivis** : pages vues, clics, sections vues, profondeur de scroll (25/50/75/90/100%)
- **Sessions visiteurs** : geolocalisation (ipapi.co), navigateur, appareil
- **Banniere de consentement** : obligatoire avant activation (RGPD compliant)
- **Tableaux Supabase** : `visitor_sessions`, `page_views`, `click_events`, `section_events`, `scroll_events`

### SEO & Performance
- **Meta-donnees** : OG tags, Twitter cards, description, keywords
- **JSON-LD** : structured data (Person schema)
- **Sitemap XML** et **robots.txt**
- **Code splitting** : chunks Vite optimises (react-vendor, radix-vendor, icons-vendor, charts, animation, supabase)
- **Images optimisees** : WebP, lazy loading
- **Build** : esbuild minification

### PWA
- **Manifest.json** : configuration progressive web app
- **Service worker** : cache et offline (Netlify)

### Accessibilite
- ARIA labels complets
- Contraste WCAG AA
- Navigation au clavier
- Composants Radix UI accessibles
- Respect de `prefers-reduced-motion`

### Securite
- Protection anti-spam (honeypot)
- Rate limiting formulaire (45s)
- Validation cote client (Zod) et serveur
- Variables d'environnement pour les cles API
- Sessions password-protected pour l'admin

---

## Systeme de themes

Le portfolio embarque un systeme de theming avance via `ThemeContext` qui injecte dynamiquement des variables CSS personnalisees.

| Theme | Style | Palette |
|---|---|---|
| **Default** | Design epure, chaleureux | Terracotta, Warm Sand, Olive Gray, Parchment, Ivory |
| **Airbnb** | Inspire d'Airbnb, arrondi, dynamique | Rose/Rouge, coins arrondis, typographie moderne |
| **Airtable** | Inspire d'Airtable, precis, professionnel | Bleu, grille precise, propreté |
| **Aetheris** | Theme "Voyage", luxe, sombre & or | Noir/Blanc/Or, glassmorphism, typographie elegante |

Le `ThemeSwitcher` (dropdown dans la navigation) et le `ThemeSwitcherFAB` (bouton flottant) permettent de basculer entre les themes en un clic.

---

## Architecture du projet

```
Portefolio_2026/
│
├── index.html                       # Entree HTML (lang=fr, SEO, JSON-LD)
├── package.json                     # Dependances & scripts
├── vite.config.ts                   # Configuration Vite (alias @/, code splitting)
├── tailwind.config.ts               # Configuration Tailwind (couleurs, fonts, animations)
├── tsconfig.json / tsconfig.*.json  # Configuration TypeScript
├── components.json                  # Configuration shadcn/ui
├── netlify.toml                     # Deploiement Netlify
├── eslint.config.js                 # ESLint flat config
├── .stylelintrc.json                # Stylelint
├── .env.example / .env.local        # Variables d'environnement
│
├── public/
│   ├── manifest.json                # PWA manifest
│   ├── robots.txt / sitemap.xml     # SEO
│   ├── _redirects                   # Netlify redirects
│   ├── profil.png / profil1.png     # Photos de profil
│   └── design/                      # ~70 images projets (Tech, Portfolio.Os, AfriEnhance AI, Imona, IPPh...)
│
├── src/
│   ├── main.tsx                     # Point d'entree
│   ├── App.tsx                      # Composant racine (ThemeProvider + LanguageProvider + Router)
│   ├── App.css / index.css          # Styles globaux + variables CSS + Tailwind
│   │
│   ├── pages/                       # Pages
│   │   ├── Index.tsx                # Page principale (8 sections)
│   │   ├── Admin.tsx                # Panneau admin
│   │   ├── Backoffice.tsx           # Backoffice complet
│   │   └── NotFound.tsx             # Page 404
│   │
│   ├── components/                  # Composants UI
│   │   ├── AnimatedHeroSection.tsx   # Hero anime (mot-par-mot, carousel, orbes)
│   │   ├── AboutSection.tsx         # Section philosophie
│   │   ├── Navigation.tsx           # Barre de navigation (scroll, mobile, themes, langue)
│   │   ├── Footer.tsx               # Pied de page 4 colonnes
│   │   ├── HeroSection.tsx          # Hero legacy
│   │   ├── TechStackSection.tsx     # Grille clavier 3D (37 technos)
│   │   ├── FeaturedProjects.tsx     # Projets phares pagines
│   │   ├── ProjectsSection.tsx      # Galerie complete avec filtres
│   │   ├── ServicesSection.tsx      # 5 cartes services
│   │   ├── TestimonialsSection.tsx  # Carousel temoignages
│   │   ├── ContactSection.tsx       # Formulaire de contact
│   │   ├── ExperienceTimeline.tsx   # Timeline experiences
│   │   ├── ThemeSwitcher.tsx        # Dropdown themes
│   │   ├── ThemeSwitcherFAB.tsx     # Bouton flottant themes
│   │   ├── AutoImageCarousel.tsx    # Carousel images automatique
│   │   ├── MotionLayout.tsx         # Layout 3D parallax (souris)
│   │   ├── DesignGallery.tsx        # Galerie design
│   │   ├── SkillsOrb.tsx            # Orbe 3D competences
│   │   ├── TechBadge.tsx            # Badge technologie
│   │   ├── ProjectRating.tsx        # Rating etoiles
│   │   ├── BlurText.tsx            # Texte avec animation de flou
│   │   ├── FadingVideo.tsx          # Video avec fondu
│   │   ├── TrackingConsentBanner.tsx # Banniere consentement RGPD
│   │   ├── WhatsAppFloatButton.tsx  # Bouton WhatsApp flottant
│   │   ├── ErrorBoundary.tsx        # Gestion erreurs React
│   │   ├── AetherisCapabilities.tsx # Capacites theme Aetheris
│   │   ├── AetherisHero.tsx         # Hero theme Aetheris
│   │   ├── AetherisLayout.tsx       # Layout theme Aetheris
│   │   ├── AILab.tsx                # Section AI Lab
│   │   ├── EnigmaSection.tsx        # Section enigme
│   │   ├── EvolutionSection.tsx     # Timeline evolution
│   │   ├── FAQSection.tsx           # FAQ accordeon
│   │   ├── NavLink.tsx             # Lien navigation
│   │   │
│   │   ├── ui/                      # 50+ composants shadcn/ui
│   │   │   ├── button.tsx, card.tsx, dialog.tsx, input.tsx,
│   │   │   ├── accordion.tsx, alert.tsx, avatar.tsx, badge.tsx,
│   │   │   ├── carousel.tsx, chart.tsx, checkbox.tsx,
│   │   │   ├── dropdown-menu.tsx, form.tsx, hover-card.tsx,
│   │   │   ├── navigation-menu.tsx, pagination.tsx, popover.tsx,
│   │   │   ├── select.tsx, sheet.tsx, sidebar.tsx, skeleton.tsx,
│   │   │   ├── table.tsx, tabs.tsx, textarea.tsx, toast.tsx,
│   │   │   ├── toggle.tsx, tooltip.tsx, scroll-area.tsx, etc.
│   │   │   └── ScrollAnimation.tsx, AlternativeBackground.tsx
│   │   │
│   │   ├── admin/                   # Composants admin panel
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   ├── CmsManager.tsx
│   │   │   ├── ExportPanel.tsx, HeatmapSections.tsx
│   │   │   ├── LiveGlobe.tsx, RichTextEditor.tsx
│   │   │   ├── VisitorDetailPanel.tsx, VisitsChart.tsx
│   │   │
│   │   └── backoffice/              # Composants backoffice
│   │       ├── BackofficeProvider.tsx
│   │       ├── layout/Header.tsx, Sidebar.tsx, BackofficeLayout.tsx
│   │       ├── dashboard/KPICards.tsx, TrafficChart.tsx,
│   │       │              ActivityFeed.tsx, GeoMap.tsx
│   │       ├── cms/MediaLibrary.tsx, ProjectsManager.tsx,
│   │       │      RichTextEditor.tsx, SectionsManager.tsx,
│   │       │      ServicesManager.tsx, TestimonialsManager.tsx
│   │       ├── common/ExportButton.tsx
│   │       └── settings/SEOSettings.tsx, NavigationEditor.tsx
│   │
│   ├── context/
│   │   └── ThemeContext.tsx         # Gestion des 4 themes
│   ├── contexts/
│   │   └── LanguageContext.tsx      # Gestion FR/EN
│   │
│   ├── hooks/                       # Hooks custom
│   │   ├── use-mobile.tsx           # Detection mobile
│   │   ├── use-toast.ts            # Notifications
│   │   ├── use-tracking-consent.ts  # Consentement tracking
│   │   ├── use-optimized-images.ts  # Optimisation images
│   │   ├── useCmsProjects.ts       # Fetch projets CMS
│   │   ├── useGlobalClickTracking.ts
│   │   ├── useLiveAnalytics.ts     # Analytics temps reel
│   │   ├── usePageTracking.ts      # Tracking pages vues
│   │   ├── useScrollDepthTracking.ts
│   │   ├── useSectionTracking.ts   # Tracking sections
│   │   ├── useTechNews.ts          # Fil actualites tech
│   │   ├── useTracking.ts          # Utilitaires tracking
│   │   └── useVisitorTracking.ts   # Sessions visiteurs
│   │
│   ├── data/
│   │   ├── experienceData.ts       # Donnees experiences (fallback)
│   │   └── projectsData.ts         # Donnees projets (24+ projets)
│   │
│   ├── services/
│   │   ├── experienceService.ts    # Service API experiences
│   │   └── projectService.ts       # Service API projets
│   │
│   ├── lib/
│   │   ├── utils.ts                # cn() (clsx + tailwind-merge)
│   │   ├── cms-service.ts          # CRUD Supabase (projets, sections, liens, temoignages, services, settings)
│   │   ├── contact-utils.ts        # Integration Formspree
│   │   ├── emailjs-config.ts       # EmailJS (stub, utilise mailto)
│   │   ├── exportUtils.ts          # Export donnees
│   │   └── tracker.ts              # Moteur analytics (page_views, clicks, sections, scrolls)
│   │
│   ├── types/
│   │   ├── cms.ts                  # Types CMS
│   │   ├── project.ts              # Type Projet
│   │   └── backoffice.ts           # Types Backoffice
│   │
│   ├── themes/                     # Registre des themes
│   │   ├── index.ts                # Export tous les themes
│   │   ├── airbnb.ts               # Theme Airbnb (rose/rouge)
│   │   ├── airtable.ts             # Theme Airtable (bleu)
│   │   └── aetheris.ts             # Theme Aetheris (noir/or)
│   │
│   ├── integrations/supabase/
│   │   └── client.ts               # Client Supabase
│   │
│   └── styles/
│       └── animations.css          # Animations CSS custom
│
├── supabase/
│   ├── migrations/                 # Migrations SQL (7 fichiers : backoffice, admin, analytics, etc.)
│   ├── functions/                  # Edge Functions
│   └── tests/rls_smoke_tests.sql   # Tests RLS
│
└── scripts/
    ├── optimize-images.js          # Optimisation PNG/JPG → WebP
    └── generate-supabase-project-seed.js
```

## Backoffice & CMS

Le backoffice est accessible via `/backoffice` ou le raccourci clavier `Ctrl+M`.

### Tabs du Backoffice

| Tab | Contenu |
|---|---|
| **Dashboard** | KPIs (visiteurs, pages vues, taux rebond, duree session), graphique trafic, referents top, carte geographique, flux activite |
| **Analytics** | Graphiques detailles, export CSV/JSON, heatmap sections |
| **CMS** | Gestion sections (hero, about, services, etc.), gestion services, gestion temoignages, bibliotheque medias |
| **Projects** | CRUD complet des projets, upload images, statut (publie/prive/brouillon) |
| **Settings** | SEO (titre, description, mots-cles), theme (couleurs, polices), navigation (ordre, visibilite), contact (email, telephone, adresse) |
| **Tracking** | Flux evenements en temps reel, sessions visiteurs, geo-data |

### Base de donnees Supabase

Tables principales :
- `cms_projects` : projets du portfolio
- `cms_sections` : sections personnalisables
- `cms_testimonials` : temoignages
- `cms_services` : services
- `cms_links` : liens navigation
- `cms_site_settings` : parametres generaux
- `cms_theme_settings` : parametres theme
- `visitor_sessions` : sessions visiteurs
- `page_views` : vues de pages
- `click_events` : evenements clics
- `section_events` : evenements sections
- `scroll_events` : evenements scroll

---

## Analytics & Tracking

Le moteur d'analytics custom (`src/lib/tracker.ts`) envoie les donnees vers Supabase.

### Types d'evenements suivis

- **Page views** : chaque navigation de page
- **Clicks** : clics sur boutons, liens, elements interactifs
- **Sections** : entree/sortie des sections au scroll (Intersection Observer)
- **Scroll depth** : profondeurs 25%, 50%, 75%, 90%, 100%

### Integration visiteurs

- **Geolocalisation** : via ipapi.co
- **User-Agent** : detection navigateur, appareil, OS
- **Session** : duree, pages visitees, evenements
- **Consentement** : banniere RGPD avant activation

### Visualisation

- Dashboard temps reel dans le backoffice
- Graphiques d'evolution (Recharts)
- Carte du monde (react-simple-maps)
- Heatmap des sections les plus vues

---

## Installation

### Prerequis

- **Node.js** 18.x ou superieur
- **npm** 9.x+ (ou **bun** 1.x+)

### Etapes

```bash
# 1. Cloner le depot
git clone https://github.com/T0b0i7/Portefolio_2026.git
cd Portefolio_2026

# 2. Installer les dependances
npm install

# 3. Creer le fichier .env.local
cp .env.example .env.local

# 4. Demarrer le serveur de developpement
npm run dev
```

L'application sera accessible sur **http://localhost:5173**.

---

## Configuration

### Variables d'environnement

```env
# Supabase
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-anonyme

# Analytics (optionnel)
VITE_ENABLE_ANALYTICS=true

# Contact
VITE_CONTACT_EMAIL=votre@email.com
```

---

## Scripts disponibles

```bash
npm run dev                # Demarrer en developpement (HMR)
npm run build              # Build de production
npm run preview            # Previsualiser le build
npm run lint               # Verifier le code (ESLint)
npm run optimize-images    # Optimiser les images (PNG/JPG → WebP)
```

---

## Deploiement

### Netlify (recommande)

```bash
# Via CLI
netlify deploy --prod

# Ou connexion Git : build npm run build, publish dist/
```

Configuration dans `netlify.toml` :
- Build command : `npm run build`
- Publish directory : `dist`
- Node version : 18

---

## Auteur

**Tobi** — Developpeur Full-Stack | Designer UI/UX | IA Enthusiast

- Portfolio : https://portefolio-os.netlify.app/
- GitHub : https://github.com/T0b0i7
- LinkedIn : https://linkedin.com/in/tobias

---

<div align="center">

**Construit avec React 19, TypeScript, Tailwind CSS, Vite, Supabase & Framer Motion**

© 2026 — Tous droits reserves

</div>
