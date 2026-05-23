import { useTheme } from '@/context/ThemeContext';
import { Palette } from 'lucide-react';
import { AetherisHero } from './AetherisHero';
import { AetherisCapabilities } from './AetherisCapabilities';

export function AetherisLayout() {
  const { setTheme } = useTheme();

  return (
    <div className="min-h-screen" style={{ background: '#000' }}>
      <a
        href="#aetheris-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:outline-none"
      >
        Skip to content
      </a>

      <main id="aetheris-main">
        <AetherisHero />
        <AetherisCapabilities />
      </main>

      <button
        onClick={() => setTheme('default')}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
        aria-label="Switch theme"
      >
        <Palette className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
