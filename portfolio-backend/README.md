# Portfolio Backend 🌍

API temps réel pour le backoffice avec suivi analytics et globe 3D interactif.

## 🚀 Fonctionnalités

- **API REST** : Analytics, Skills, Projects, Experiences
- **WebSocket temps réel** : 
  - `/ws/analytics` - Suivi en direct des visiteurs
  - `/ws/globe` - Animation live du globe de compétences
- **Globe 3D** : Visualisation interactive des compétences
- **Données mockées** : Prêt à utiliser, connectable à Supabase

## 🛠️ Installation

```bash
# Créer l'environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Installer les dépendances
pip install -r requirements.txt

# Copier la configuration
cp .env.example .env
# (Optionnel) Modifier les valeurs dans .env

# Lancer le serveur
python main.py
```

Le serveur sera disponible sur `http://localhost:8000`

## 📡 Endpoints API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/` | Info API |
| GET | `/api/health` | Health check |
| GET | `/api/analytics` | Données analytics |
| GET | `/api/analytics/history` | Historique (days param) |
| GET | `/api/skills` | Toutes les compétences |
| GET | `/api/skills/{id}` | Compétences par catégorie |
| GET | `/api/projects` | Liste des projets |
| GET | `/api/experiences` | Expériences professionnelles |

## 🔌 WebSocket

### Connexion
```javascript
const ws = new WebSocket('ws://localhost:8000/ws/analytics');
```

### Messages entrants
```json
{"type": "ping"}
{"type": "subscribe", "channel": "analytics"}
```

### Messages sortants (analytics)
```json
{
  "type": "analytics_update",
  "timestamp": "2026-04-27T10:00:00",
  "visitors_online": 42,
  "views_today": 1250,
  "top_pages": [...],
  "countries": {"FR": 45, "BJ": 30}
}
```

### Messages sortants (globe)
```json
{
  "type": "globe_update",
  "timestamp": "2026-04-27T10:00:00",
  "rotation": 45.5,
  "pulse": 1.1,
  "skills": [...]
}
```

## 🌍 Déploiement

### Render ( gratuit)
```yaml
# render.yaml
services:
  - type: web
    name: portfolio-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: python main.py
    envVars:
      - key: PORT
        value: 8000
```

### Railway
```bash
railway init
railway up
```

### Fly.io
```bash
fly launch
fly deploy
```

## 📁 Structure

```
portfolio-backend/
├── main.py              # Application FastAPI
├── requirements.txt     # Dépendances Python
├── .env.example         # Exemple de configuration
└── README.md           # Ce fichier
```

## 🔧 Configuration Supabase (optionnel)

Pour utiliser vos vraies données Supabase :

1. Créez un projet Supabase
2. Récupérez les credentials dans Settings > API
3. Mettez à jour le fichier `.env` :
   ```
   SUPABASE_URL=https://votre-projet.supabase.co
   SUPABASE_KEY=votre-cle-anon
   ```
4. Modifiez `main.py` pour utiliser Supabase au lieu des données mockées

## 📝 License

MIT - Feel free to use!