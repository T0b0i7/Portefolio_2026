import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark';

interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  gradient: string;
}

const themes: Record<Theme, ThemeColors> = {
  dark: {
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    primaryLight: '#60a5fa',
    secondary: '#06b6d4',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    border: '#334155',
    gradient: 'from-blue-500 to-cyan-400'
  }
};

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Always force dark theme - light theme disabled
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
      setTheme('dark');
    } else {
      // Force dark theme and save to localStorage
      localStorage.setItem('portfolio-theme', 'dark');
      setTheme('dark');
    }
  }, []);

  const setThemeWithStorage = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  const toggleTheme = () => {
    // Theme switching disabled - always dark
    return;
  };

  const colors = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme: setThemeWithStorage, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
