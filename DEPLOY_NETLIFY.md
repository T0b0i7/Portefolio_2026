Déploiement sur Netlify
======================

Options rapides:

- Via l'interface web (recommandé si tu as un dépôt GitHub/GitLab/Bitbucket):
  1. Pousse ton projet sur GitHub.
  2. Va sur https://app.netlify.com/ → "New site" → connecte ton repo.
  3. Netlify détecte le framework. Si besoin, mets la commande de build: `npm run build` et le dossier de publication: `dist`.
  4. Déploie.

- Via Netlify CLI (déploiement direct depuis ta machine):
  1. Installer la CLI: `npm install -g netlify-cli` (ou `pnpm add -g netlify-cli`).
  2. Construire le projet: `npm run build`.
  3. Déployer: `netlify deploy --dir=dist --prod`.

Notes importantes:
- Le fichier `netlify.toml` présent configure la commande de build et le dossier `dist`.
- Le fichier `public/_redirects` force Netlify à renvoyer `index.html` pour toutes les routes (utile pour les SPA avec `react-router`).
