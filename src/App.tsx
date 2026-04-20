import { AlternativeBackground } from "./components/ui/AlternativeBackground";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/Admin";

import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { BackgroundScene } from "./components/ui/BackgroundScene";
import { useTrackingConsent } from "./hooks/use-tracking-consent";
import { usePageTracking } from "./hooks/usePageTracking";
import { useGlobalClickTracking } from "./hooks/useGlobalClickTracking";
import { useSectionTracking } from "./hooks/useSectionTracking";
import { TrackingConsentBanner } from "./components/TrackingConsentBanner";

const TrackingBridge = () => {
  const { canTrack } = useTrackingConsent();
  usePageTracking(canTrack);
  useGlobalClickTracking(canTrack);
  useSectionTracking(canTrack);
  return null;
};

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
<AlternativeBackground />
            <TrackingConsentBanner />
            {/* <BackgroundScene /> - Three.js version causing crash */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[130] focus:bg-white focus:text-slate-950 focus:px-3 focus:py-2 focus:rounded-md focus:font-semibold"
          >
            Skip to content
          </a>
          <BrowserRouter>
            <TrackingBridge />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
