import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { themes, ThemeName, themeConfigs } from '../themes';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  applyTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>('default');

  const applyTheme = useCallback((themeName: ThemeName) => {
    const root = document.documentElement;
    root.style.transition = 'all 0.3s ease';
    
    // data-theme pour les surcharges CSS globales
    root.setAttribute('data-theme', themeName === 'default' ? '' : themeName);
    
    // Si on repasse au thème par défaut, on nettoie toutes les variables injectées
    if (themeName === 'default') {
      const allKeys = new Set([
        ...Object.keys(themes.airbnb || {}),
        ...Object.keys(themes.airtable || {}),
        ...Object.keys(themes.aetheris || {})
      ]);
      allKeys.forEach((key) => {
        root.style.removeProperty(key);
      });
    } else {
      const themeData = themes[themeName];
      Object.entries(themeData).forEach(([key, value]) => {
        root.style.setProperty(key, value as string);
      });
    }
  }, []);

  const setTheme = useCallback((themeName: ThemeName) => {
    setThemeState(themeName);
    applyTheme(themeName);
    localStorage.setItem('portfolio-theme', themeName);
  }, [applyTheme]);

  // Initialisation au montage
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('default');
    }
  }, [applyTheme]);

  const value = useMemo(() => ({ theme, setTheme, applyTheme }), [theme, setTheme, applyTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
