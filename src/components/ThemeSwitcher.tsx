import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ThemeName } from '../themes';
import { Palette, ChevronDown, Check } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themeOptions: { value: ThemeName; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'airbnb', label: 'Airbnb' },
    { value: 'airtable', label: 'Airtable' },
    { value: 'aetheris', label: 'Aetheris' },
  ];

  // Ferme le menu en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-cream hover:bg-warm-sand/30 transition-all text-xs font-medium text-charcoal-warm capitalize"
        aria-label="Sélectionner un thème"
      >
        <Palette className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{themeOptions.find(t => t.value === theme)?.label || theme}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-ivory border border-border-cream rounded-xl shadow-whisper overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setTheme(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  theme === option.value
                    ? 'bg-warm-sand/50 text-near-black font-medium'
                    : 'text-olive-gray hover:bg-warm-sand/30 hover:text-near-black'
                }`}
              >
                {option.label}
                {theme === option.value && <Check className="w-4 h-4 text-terracotta" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
