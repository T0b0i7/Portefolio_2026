import React, { useState } from 'react';
import { Palette, X, Check, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { themeConfigs } from '@/themes';

export function ThemeSwitcherFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center hover:scale-110 active:scale-95"
        aria-label="Changer le style"
      >
        <Palette className="w-6 h-6 text-white" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-3xl p-6 w-80 max-h-[70vh] overflow-y-auto border border-gray-700/50 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Portfolio OS</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-4">
              Choisissez un style pour votre portfolio
            </p>

            <div className="space-y-3">
              {Object.values(themeConfigs).map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    theme === t.id 
                      ? 'bg-gray-800 border-2 border-violet-500' 
                      : 'bg-gray-800/50 border-2 border-transparent hover:bg-gray-800'
                  }`}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${t.previewColors.primary} 0%, ${t.previewColors.secondary} 100%)` 
                    }}
                  >
                    {theme === t.id && (
                      <Check className="w-5 h-5 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <span className="text-white font-medium block">{t.name}</span>
                    <span className="text-gray-400 text-sm">{t.description}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700/50">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>Plus de styles a venir...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}