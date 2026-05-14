import { airbnbTheme } from './airbnb';
import { airtableTheme } from './airtable';

// Un objet de configuration global pour exporter nom, objet de variables, couleurs d'aperçu FAB
export const themeConfigs = {
  default: {
    id: 'default',
    name: 'Default',
    description: 'Style par defaut',
    variables: {}, // Aucune variable, on laisse index.css par défaut
    previewColors: { primary: '#c96442', secondary: '#e8e6dc' },
  },
  airbnb: {
    id: 'airbnb',
    name: 'Airbnb',
    description: 'Moderne, arrondi & rouge',
    variables: airbnbTheme,
    previewColors: { primary: '#ff385c', secondary: '#e00b41' },
  },
  airtable: {
    id: 'airtable',
    name: 'Airtable',
    description: 'Swiss-precision & bleu',
    variables: airtableTheme,
    previewColors: { primary: '#1b61c9', secondary: '#254fad' },
  },
} as const;

export type ThemeName = keyof typeof themeConfigs;

export const themes = {
  default: themeConfigs.default.variables,
  airbnb: themeConfigs.airbnb.variables,
  airtable: themeConfigs.airtable.variables,
};
