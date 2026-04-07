import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { LanguageProvider } from "./contexts/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { TrackingConsentBanner } from "./components/TrackingConsentBanner";

const App = () => (
  <ErrorBoundary>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[130] focus:bg-white focus:text-slate-950 focus:px-3 focus:py-2 focus:rounded-md focus:font-semibold"
        >
          Skip to content
        </a>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <TrackingConsentBanner />
      </TooltipProvider>
    </LanguageProvider>
  </ErrorBoundary>
);

export default App;
