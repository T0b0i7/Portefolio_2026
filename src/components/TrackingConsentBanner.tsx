import { useState, useEffect } from "react";
import { useTrackingConsent } from "@/hooks/use-tracking-consent";
import { Button } from "./ui/button";

export function TrackingConsentBanner() {
  const { status, accept, decline } = useTrackingConsent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (status === "unknown") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [status]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:w-96 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl z-50 border border-slate-700">
      <p className="text-sm mb-4">
        J'utilise des cookies analytiques pour améliorer mon site. Acceptez-vous le tracking anonyme ?
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={decline}
          className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          Refuser
        </Button>
        <Button size="sm" onClick={accept} className="flex-1 bg-rose-500 hover:bg-rose-600">
          Accepter
        </Button>
      </div>
    </div>
  );
}
