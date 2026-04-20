# Backoffice Portfolio (Supabase)

## 1) Variables d'environnement

Créer `.env.local` :

```bash
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon_key>
```

## 2) Migration SQL

Exécuter le contenu de `supabase/migrations/20260420_backoffice_init.sql` dans l'éditeur SQL Supabase.

## 3) Seed projets (optionnel)

```bash
npm run supabase:seed:projects
```

Puis exécuter `supabase/seed_projects.sql` dans Supabase.

## 4) Créer un admin

1. Créer un utilisateur dans Supabase Auth.
2. Insérer son profil en admin :

```sql
insert into public.profiles (id, email, role)
values ('<auth_user_uuid>', '<email>', 'admin')
on conflict (id) do update set role = 'admin';
```

## 5) Déployer la fonction track-event (optionnel)

Si vous utilisez Supabase Edge Functions :

```bash
supabase functions deploy track-event
```

## 6) RLS smoke tests

Exécuter `supabase/tests/rls_smoke_tests.sql` pour vérifier les politiques.

## 7) Accès backoffice

Lancer l'app et ouvrir `/admin`.

