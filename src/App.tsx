import { AlternativeBackground } from "./components/ui/AlternativeBackground";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { TooltipProvider } from "./components/ui/tooltip";
import { MotionLayout } from "./components/MotionLayout";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TrackingConsentBanner } from "./components/TrackingConsentBanner";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import AdminPage from "./pages/Admin";
import BackofficePage from "./pages/Backoffice";
import NotFound from "./pages/NotFound";
import { useTrackingConsent } from "./hooks/use-tracking-consent";
import { usePageTracking } from "./hooks/usePageTracking";
import { useGlobalClickTracking } from "./hooks/useGlobalClickTracking";
import { useSectionTracking } from "./hooks/useSectionTracking";

// inside App component
const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <MotionLayout>
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
              <RouteTransition />
            </BrowserRouter>
          </MotionLayout>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </ErrorBoundary>
);
const TrackingBridge = () => {
  const { canTrack } = useTrackingConsent();
  usePageTracking(canTrack);
  useGlobalClickTracking(canTrack);
  useSectionTracking(canTrack);
  return null;
};

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -20, filter: "blur(4px)" },
};

function RouteTransition() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/backoffice" element={<BackofficePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
