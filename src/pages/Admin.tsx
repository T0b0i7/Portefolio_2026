import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { CmsManager } from "@/components/admin/CmsManager";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Tab = "analytics" | "cms";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("analytics");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const verifyPassword = useCallback(async (pwd: string) => {
    if (!supabase) return;
    setLoading(true);
    setError(null);

    const { data, error: verifyError } = await supabase.rpc("verify_admin_password", {
      input_password: pwd
    });

    if (verifyError) {
      setError("Erreur de vérification");
      setLoading(false);
      return;
    }

    if (data === true) {
      setIsAuthenticated(true);
      setShowPasswordDialog(false);
      setPassword("");
    } else {
      setError("Mot de passe incorrect");
    }
    setLoading(false);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "m") {
      event.preventDefault();
      if (!isAuthenticated) {
        setShowPasswordDialog(true);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center p-6">
          <h1 className="text-2xl font-semibold mb-2">Backoffice Portfolio</h1>
          <p className="text-sm text-slate-600 mb-4">Appuie sur Ctrl+M pour accéder</p>
          <Button onClick={() => setShowPasswordDialog(true)}>
            Ouvrir le panneau
          </Button>
        </div>

        <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mot de passe administrateur</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    verifyPassword(password);
                  }
                }}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button 
                onClick={() => verifyPassword(password)} 
                disabled={loading || !password}
                className="w-full"
              >
                {loading ? "Vérification..." : "Valider"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Backoffice Portfolio</h1>
          <p className="text-xs text-slate-500">CMS + tracking temps réel</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-2 text-sm rounded-lg ${tab === "analytics" ? "bg-slate-900 text-white" : "bg-slate-200"}`}
            onClick={() => setTab("analytics")}
          >
            Analytics
          </button>
          <button
            className={`px-3 py-2 text-sm rounded-lg ${tab === "cms" ? "bg-slate-900 text-white" : "bg-slate-200"}`}
            onClick={() => setTab("cms")}
          >
            CMS
          </button>
          <button 
            className="px-3 py-2 text-sm rounded-lg bg-rose-600 text-white" 
            onClick={() => setIsAuthenticated(false)}
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">{tab === "analytics" ? <AnalyticsDashboard /> : <CmsManager />}</main>
    </div>
  );
}