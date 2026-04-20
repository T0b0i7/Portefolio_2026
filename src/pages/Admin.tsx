import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { CmsManager } from "@/components/admin/CmsManager";

type Tab = "analytics" | "cms";

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [tab, setTab] = useState<Tab>("analytics");

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-slate-100 p-10">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 border border-slate-200">
          <h1 className="text-2xl font-semibold mb-2">Backoffice non configuré</h1>
          <p className="text-sm text-slate-600">
            Ajoute `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans ton `.env.local`, puis relance le serveur.
          </p>
        </div>
      </div>
    );
  }

  if (!session) return <AdminLogin />;

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
          <button className="px-3 py-2 text-sm rounded-lg bg-rose-600 text-white" onClick={() => void supabase?.auth.signOut()}>
            Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">{tab === "analytics" ? <AnalyticsDashboard /> : <CmsManager />}</main>
    </div>
  );
}

