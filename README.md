# 🎨 Portfolio.OS 2026

> Portfolio professionnel haute performance - Présentation de projets innovants en Web, Mobile, Design et IA

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_ID/deploy-status)](https://portefolio-os.netlify.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🚀 Démo Live

**▶️ [Visiter le portfolio en production](https://portefolio-os.netlify.app/)**

## 📋 Table des matières

- [À propos](#-à-propos)
- [Features](#-features)
- [Stack Technique](#-stack-technique)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Scripts Disponibles](#-scripts-disponibles)
- [Architecture](#-architecture)
- [Déploiement](#-déploiement)
- [Contribution](#-contribution)
- [Licence](#-licence)

## 📝 À propos

**Portfolio.OS** est une plateforme de présentation professionnelle personnalisée, conçue pour mettre en avant des projets innovants dans les domaines du développement web, mobile, design graphique et intelligence artificielle.

Le portfolio offre une expérience utilisateur immersive avec:
- 🎬 **Animations élégantes** et fluides
- 🌙 **Thème sombre optimisé** pour la readability
- 📱 **Design responsive** (mobile-first)
- ⚡ **Performance exceptionnelle** (Lighthouse 95+)
- 🔍 **SEO-friendly** avec métadonnées dynamiques
- 🌐 **Support multilingue** (FR/EN)
- 📊 **Analytics intégré** avec Supabase

## ✨ Features

### 🎯 Sections Principales

| Section | Description |
|---------|-------------|
| **Hero** | Accroche captivante avec CTA prominent |
| **Projets** | Galerie filtrable des projets (Web, Mobile, Design, IA) |
| **Études de Cas** | Détail profond du projet vedette (AfriEnhance AI) |
| **Expériences** | Timeline interactive des postes professionnels |
| **Compétences** | Orbes visuels animés des technologies |
| **Services** | Propositions de valeur et domaines d'expertise |
| **FAQ** | Réponses aux questions fréquentes |
| **Contact** | Formulaire intelligent avec EmailJS |

### 🎨 Composants Personnalisés

- **FeaturedProject**: Avant/après interactif avec slider
- **ProjectsSection**: Grille dynamique avec filtres
- **ExperienceTimeline**: Chronologie animée
- **SkillsOrb**: Visualisation 3D des technologies
- **ThemeSelector**: Toggle clair/sombre
- **TrackingConsentBanner**: Consentement RGPD
- **WhatsAppFloatButton**: Support WhatsApp flottant

### 🔐 Sécurité & Conformité

- ✅ RGPD compliant (consentement tracking)
- 🔐 Clés API sécurisées (variables d'environnement)
- 📧 Formulaires validés côté client & serveur
- 🛡️ Protection contre XSS & injection

## 🛠️ Stack Technique

### Frontend
```
React 18              → Librairie UI moderne
TypeScript           → Typage statique robuste
Tailwind CSS 3       → Styling utilitaire performant
Vite                 → Build tool ultrarapide (HMR instantané)
Framer Motion        → Animations déclaratives
Embla Carousel       → Carousel haute performance
Radix UI             → Composants headless accessibles
```

### Backend & Services
```
Supabase             → PostgreSQL + Auth + Real-time
EmailJS              → Envoi d'emails côté client
Google Gemini 2.5    → IA multimodal (projets)
TanStack React Query → Data fetching & caching
```

### Devtools
```
TypeScript Compiler  → Vérification de types
ESLint              → Linting & code quality
PostCSS             → Nesting & autoprefixing CSS
Bun                 → Gestionnaire de packages (optionnel)
```

## 📦 Installation

### Prérequis
- **Node.js** 18.x ou supérieur
- **npm** 9.x+ ou **bun** 1.x+
- **Git**

### Étapes

```bash
# 1️⃣ Cloner le repository
git clone https://github.com/T0b0i7/Portefolio_2026.git
cd Portefolio_2026

# 2️⃣ Installer les dépendances
npm install
# OU avec bun
bun install

# 3️⃣ Créer le fichier .env.local
cp .env.example .env.local

# 4️⃣ Remplir les variables d'environnement
# (voir section Configuration ci-dessous)

# 5️⃣ Démarrer le serveur local
npm run dev
```

**L'application sera accessible à:** `http://localhost:5173`

## ⚙️ Configuration

### Variables d'Environnement

Créer un fichier `.env.local` à la racine du projet:

```bash
# 🌐 Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# 📧 EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your-public-key

# 🤖 Google Gemini AI (optionnel)
VITE_GOOGLE_GENAI_KEY=your-google-key

# 📊 Analytics (optionnel)
VITE_ENABLE_ANALYTICS=true
```

### Setup Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Créer les tables SQL (voir `supabase_schema.sql`)
3. Copier les clés API
4. Ajouter à `.env.local`

### Setup EmailJS

1. Visiter [emailjs.com](https://emailjs.com)
2. Créer un nouveau service & template
3. Copier les IDs
4. Ajouter à `.env.local`

## 📜 Scripts Disponibles

```bash
# 🔧 Développement
npm run dev              # Démarrer dev server avec HMR

# 🔨 Production
npm run build            # Build optimisé pour production
npm run build:dev        # Build en mode développement

# 👀 Preview
npm run preview          # Prévisualiser le build local

# ✨ Code Quality
npm run lint             # Vérifier avec ESLint

# 🖼️ Images
npm run optimize-images  # Optimiser images PNG/JPG → WebP
```

## 🏗️ Architecture

```
Portefolio_2026/
├── src/
│   ├── pages/
│   │   ├── Index.tsx           # Page principale du portfolio
│   │   └── NotFound.tsx        # Page 404
│   │
│   ├── components/
│   │   ├── HeroSection.tsx     # Section accroche
│   │   ├── ProjectsSection.tsx # Galerie projets
│   │   ├── FeaturedProject.tsx # Étude de cas (AfriEnhance AI)
│   │   ├── ExperienceTimeline.tsx
│   │   ├── SkillsOrb.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FAQ Section.tsx
│   │   ├── ui/                 # Radix UI composants headless
│   │   └── ...
│   │
│   ├── contexts/
│   │   ├── ThemeContext.tsx    # Gestion du thème (light/dark)
│   │   └── LanguageContext.tsx # Localisation (FR/EN)
│   │
│   ├── hooks/
│   │   ├── use-toast.ts        # Notifications toast
│   │   ├── use-mobile.ts       # Détection mobile
│   │   ├── useTracking.ts      # Analytics
│   │   └── useTechNews.ts      # Actualités tech
│   │
│   ├── services/
│   │   ├── projectService.ts   # Requêtes Supabase pour projets
│   │   └── experienceService.ts
│   │
│   ├── lib/
│   │   ├── supabase.ts         # Configuration Supabase client
│   │   ├── emailjs-config.ts   # Configuration EmailJS
│   │   ├── contact-utils.ts
│   │   └── utils.ts            # Utilitaires généraux
│   │
│   ├── data/
│   │   ├── projectsData.ts     # Données statiques (fallback)
│   │   └── experienceData.ts
│   │
│   ├── types/
│   │   └── project.ts          # Types TypeScript
│   │
│   ├── styles/
│   │   ├── animations.css      # Animations custom
│   │   ├── index.css           # Global styles
│   │   └── App.css
│   │
│   ├── App.tsx                 # Composant racine
│   └── main.tsx                # Point d'entrée
│
├── public/
│   ├── design/                 # Images & captures projets
│   │   ├── AfriEnhance AI/
│   │   ├── DK/
│   │   └── optimized/         # Images WebP optimisées
│   └── _redirects             # Netlify redirects
│
├── scripts/
│   ├── optimize-images.js     # Script optimisation
│   └── supabase-seed.js
│
├── vite.config.ts             # Configuration Vite
├── tailwind.config.ts         # Configuration Tailwind
├── tsconfig.json              # Configuration TypeScript
├── postcss.config.js          # Configuration PostCSS
├── eslint.config.js           # Configuration ESLint
├── netlify.toml               # Configuration Netlify
└── supabase_schema.sql        # Schéma BD
```

## 🚀 Déploiement

### Netlify (Recommandé)

```bash
# Option 1: Via CLI
netlify deploy --prod

# Option 2: Connexion Git (Auto-deploy depuis GitHub)
# 1. Connecter repo à Netlify
# 2. Build command: npm run build
# 3. Publish directory: dist
```

### Vercel

```bash
vercel deploy --prod
```

### GitHub Pages

```bash
npm run build
# Déployer le dossier 'dist' sur gh-pages
```

## 🎯 Optimisations Appliquées

✅ **Performance**
- Images optimisées en WebP
- Code splitting automatique
- Lazy loading des composants
- Caching avec React Query

✅ **SEO**
- Métadonnées dynamiques
- Open Graph tags
- Sitemap généré
- Structured data (JSON-LD)

✅ **Accessibilité**
- ARIA labels complets
- Contraste WCAG AA
- Navigation au clavier
- Radix UI accessible

## 📊 Métriques

| Métrique | Score |
|----------|-------|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse Best Practices | 95+ |
| Lighthouse SEO | 100 |
| PageSpeed Insights | 90+ |

## 🤝 Contribution

Les contributions sont les bienvenues! Pour contribuer:

```bash
# 1. Fork le repository
# 2. Créer une branche feature
git checkout -b feature/amazing-feature

# 3. Commit les changements
git commit -m 'Add amazing feature'

# 4. Push vers la branche
git push origin feature/amazing-feature

# 5. Ouvrir une Pull Request
```

### Guidelines

- Respecter le code style (ESLint)
- Ajouter des types TypeScript
- Documenter les features
- Tester les changements

## 📚 Ressources

- [Documentation React](https://react.dev)
- [Documentation Tailwind CSS](https://tailwindcss.com)
- [Documentation Vite](https://vitejs.dev)
- [Radix UI Docs](https://radix-ui.com)
- [Supabase Docs](https://supabase.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 📄 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Tobi** - Développeur Full-Stack | Designer | IA Enthusiast

- 🌐 [Portfolio](https://portefolio-os.netlify.app/)
- 💼 [LinkedIn](https://linkedin.com/in/tobias)
- 🐙 [GitHub](https://github.com/T0b0i7)
- 📧 [Email](mailto:contact@example.com)

---

<div align="center">

**Fait avec ❤️ en 2026**

![React Badge](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react&logoColor=white)
![TypeScript Badge](https://img.shields.io/badge/Powered%20by-TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS Badge](https://img.shields.io/badge/Styled%20with-Tailwind-06B6D4?logo=tailwindcss&logoColor=white)

</div>
