export const airbnbTheme = {
  // Tokens Airbnb natifs demandés
  '--color-brand': '#ff385c',
  '--color-brand-dark': '#e00b41',
  '--color-text-primary': '#222222',
  '--color-text-secondary': '#6a6a6a',
  '--color-text-disabled': 'rgba(0,0,0,0.24)',
  '--color-text-link': '#428bff',
  '--color-background': '#ffffff',
  '--color-surface': '#f2f2f2',
  '--color-border': '#c1c1c1',
  '--font-family': "'Airbnb Cereal VF', Circular, -apple-system, system-ui, Roboto, 'Helvetica Neue', sans-serif",
  '--font-weight-regular': '500',
  '--font-weight-semibold': '600',
  '--font-weight-bold': '700',
  '--radius-sm': '4px',
  '--radius-md': '8px',
  '--radius-badge': '14px',
  '--radius-card': '20px',
  '--radius-lg': '32px',
  '--radius-circle': '50%',
  '--shadow-card': 'rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px',
  '--shadow-hover': 'rgba(0,0,0,0.08) 0px 4px 12px',
  '--spacing-base': '8px',
  '--color-premium-luxe': '#460479',
  '--color-premium-plus': '#92174d',

  // Surcharges (overrides) des variables Tailwind HSL existantes du portfolio
  // pour que le changement de thème soit "visiblement" répercuté sans modifier les composants
  '--background': '0 0% 100%',     /* #ffffff */
  '--foreground': '0 0% 13%',      /* #222222 */
  '--primary': '349 100% 61%',     /* #ff385c */
  '--primary-foreground': '0 0% 100%',
  '--secondary': '0 0% 95%',       /* #f2f2f2 */
  '--secondary-foreground': '0 0% 13%',
  '--card': '0 0% 100%',
  '--card-foreground': '0 0% 13%',
  '--border': '0 0% 76%',          /* #c1c1c1 */
  '--muted': '0 0% 42%',           /* #6a6a6a */
  '--muted-foreground': '0 0% 13%',
  '--ring': '349 100% 61%',
  '--ring-color': '#ff385c',       /* Utilisé par certaines classes custom */

  // Variables natives rgb pour Tailwind (support de l'opacité)
  '--color-parchment-rgb': '255 255 255',
  '--color-parchment-dark-rgb': '242 242 242',
  '--color-ivory-rgb': '255 255 255',
  '--color-near-black-rgb': '34 34 34',
  '--color-terracotta-rgb': '255 56 92',
  '--color-terracotta-light-rgb': '224 11 65',
  '--color-olive-gray-rgb': '106 106 106',
  '--color-warm-sand-rgb': '242 242 242',
  '--color-border-cream-rgb': '193 193 193',
  '--color-charcoal-warm-rgb': '106 106 106',
  '--color-destructive-rgb': '224 11 65',
  '--color-border-dark-rgb': '193 193 193',
};
