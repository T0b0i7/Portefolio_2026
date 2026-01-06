import { Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Eucher ABATTI.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1">
              Fait avec <Heart className="w-4 h-4 text-secondary fill-secondary" /> au Bénin
            </span>
          </div>

          {/* Tagline */}
          <p className="text-sm font-display gradient-text">
            Développons ensemble le futur
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-2 glass rounded-full hover:glow-cyan transition-all duration-300 hover:-translate-y-1"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
