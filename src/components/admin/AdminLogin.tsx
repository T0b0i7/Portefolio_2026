import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError(signInError.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-near-black text-ivory flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">Admin Portfolio</h1>
        <p className="text-sm text-white/70">Connexion administrateur Supabase</p>
        <input
          className="w-full rounded-lg px-3 py-2 bg-black/20 border border-white/20"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded-lg px-3 py-2 bg-black/20 border border-white/20"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-sm text-red-300">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
    </div>
  );
}

