import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTrackingConsent } from "@/hooks/use-tracking-consent";

export function TrackingConsentBanner() {
  const { lang } = useLanguage();
  const { status, accept, decline } = useTrackingConsent();

  if (status !== "unknown") return null;

  return (
    <aside
      className="fixed bottom-4 left-4 right-4 z-[120] md:left-auto md:w-[440px] rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl p-4 shadow-2xl"
      role="dialog"
      aria-live="polite"
      aria-label={lang("Préférences de mesure", "Analytics preferences")}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 w-9 h-9 rounded-xl bg-brand-accent/15 text-brand-accent flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white">
            {lang("Mesure d'audience respectueuse", "Privacy-friendly analytics")}
          </p>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            {lang(
              "J'utilise une mesure technique anonymisée pour améliorer ce portfolio. Aucun cookie publicitaire n'est déposé.",
              "I use anonymous technical analytics to improve this portfolio. No advertising cookie is used."
            )}
          </p>
          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={accept}
              className="px-4 py-2 rounded-lg bg-brand-accent text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors"
            >
              {lang("Accepter", "Accept")}
            </button>
            <button
              type="button"
              onClick={decline}
              className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-slate-200 text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              {lang("Refuser", "Decline")}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
