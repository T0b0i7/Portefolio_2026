import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeSelector() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-20 right-6 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Thème</span>
        <button
          onClick={toggleTheme}
          className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200 dark:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <span className="sr-only">Toggle theme</span>
          <span
            className={cn(
              'inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform',
              theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
            )}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-yellow-500 m-1" />
            ) : (
              <Moon className="h-4 w-4 text-blue-400 m-1" />
            )}
          </span>
        </button>
      </div>
      
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        {theme === 'dark' ? (
          <>
            <Moon className="w-3 h-3" />
            <span>Mode sombre</span>
          </>
        ) : (
          <>
            <Moon className="w-3 h-3" />
            <span>Mode sombre</span>
          </>
        )}
      </div>
    </div>
  );
}

// Helper function for conditional classes
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
