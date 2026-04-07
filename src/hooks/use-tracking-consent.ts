import { useCallback, useEffect, useState } from "react";

export type TrackingConsentStatus = "unknown" | "granted" | "denied";

const CONSENT_STORAGE_KEY = "portfolio_tracking_consent";
const CONSENT_EVENT = "portfolio:tracking-consent-change";

export function readTrackingConsent(): TrackingConsentStatus {
  if (typeof window === "undefined") return "unknown";

  if (navigator.doNotTrack === "1") {
    return "denied";
  }

  const value = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (value === "granted" || value === "denied") {
    return value;
  }

  return "unknown";
}

export function writeTrackingConsent(status: Exclude<TrackingConsentStatus, "unknown">) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_STORAGE_KEY, status);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: status }));
}

export function clearTrackingConsent() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONSENT_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: "unknown" }));
}

export function useTrackingConsent() {
  const [status, setStatus] = useState<TrackingConsentStatus>(() => readTrackingConsent());

  useEffect(() => {
    const onChange = () => {
      setStatus(readTrackingConsent());
    };

    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const accept = useCallback(() => {
    writeTrackingConsent("granted");
    setStatus("granted");
  }, []);

  const decline = useCallback(() => {
    writeTrackingConsent("denied");
    setStatus("denied");
  }, []);

  const reset = useCallback(() => {
    clearTrackingConsent();
    setStatus("unknown");
  }, []);

  return {
    status,
    canTrack: status === "granted",
    accept,
    decline,
    reset,
  };
}
