"""
Portfolio Backend - FastAPI + WebSocket
API temps réel pour le backoffice avec suivi analytics et globe 3D
"""
import os
import asyncio
import json
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ============== Configuration ==============
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

# Initialize Supabase client
supabase: Optional[Client] = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("✅ Supabase client initialized")
    except Exception as e:
        print(f"⚠️  Supabase initialization failed: {e}")
        supabase = None
else:
    print("⚠️  Supabase credentials not found, using mock data")

# ============== Modèles de données ==============
class Skill(BaseModel):
    name: str
    level: int  # 1-5
    category: str
    color: str = "#c96442"
    icon: Optional[str] = None

class SkillCategory(BaseModel):
    id: str
    name_fr: str
    name_en: str
    color: str
    skills: List[Skill]

class AnalyticsData(BaseModel):
    visitors_online: int = 0
    views_today: int = 0
    views_week: int = 0
    views_month: int = 0
    top_pages: List[Dict[str, Any]] = []
    countries: Dict[str, int] = {}
    devices: Dict[str, int] = {"desktop": 60, "mobile": 35, "tablet": 5}
    recent_events: List[Dict[str, Any]] = []

class Project(BaseModel):
    id: Optional[int] = None
    title_fr: str
    title_en: str
    description_fr: str
    description_en: str
    tech_stack: List[str] = []
    image_url: Optional[str] = None
    project_url: Optional[str] = None
    repo_url: Optional[str] = None
    featured: bool = False
    category: str = "web"

class Experience(BaseModel):
    id: Optional[int] = None
    title: str
    company: str
    period: str
    location: str
    description: List[str]
    status: Optional[str] = None

# ============== WebSocket Manager ==============
class ConnectionManager:
    """Gestionnaire de connexions WebSocket"""
    
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.analytics_subscribers: List[WebSocket] = []
        self.globe_subscribers: List[WebSocket] = []
    
    async def connect(self, websocket: WebSocket, channel: str = "general"):
        await websocket.accept()
        self.active_connections.append(websocket)
        
        if channel == "analytics":
            self.analytics_subscribers.append(websocket)
        elif channel == "globe":
            self.globe_subscribers.append(websocket)
        
        print(f"Client connecté sur {channel}. Total: {len(self.active_connections)}")
    
    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        if websocket in self.analytics_subscribers:
            self.analytics_subscribers.remove(websocket)
        if websocket in self.globe_subscribers:
            self.globe_subscribers.remove(websocket)
        print(f"Client déconnecté. Total: {len(self.active_connections)}")
    
    async def send_personal_message(self, message: dict, websocket: WebSocket):
        await websocket.send_json(message)
    
    async def broadcast_analytics(self, message: dict):
        for connection in self.analytics_subscribers:
            try:
                await connection.send_json(message)
            except Exception as e:
                print(f"Erreur envoi analytics: {e}")
                self.disconnect(connection)
    
    async def broadcast_globe(self, message: dict):
        for connection in self.globe_subscribers:
            try:
                await connection.send_json(message)
            except Exception as e:
                print(f"Erreur envoi globe: {e}")
                self.disconnect(connection)

manager = ConnectionManager()

# ============== Données mock (à remplacer par Supabase) ==============
SKILLS_DATA: List[SkillCategory] = [
    {
        "id": "frontend",
        "name_fr": "Front-end",
        "name_en": "Front-end",
        "color": "#c96442",
        "skills": [
            {"name": "React", "level": 5, "category": "frontend", "color": "#61DAFB"},
            {"name": "TypeScript", "level": 5, "category": "frontend", "color": "#3178C6"},
            {"name": "Next.js", "level": 4, "category": "frontend", "color": "#000000"},
            {"name": "Tailwind CSS", "level": 5, "category": "frontend", "color": "#06B6D4"},
            {"name": "Vue.js", "level": 3, "category": "frontend", "color": "#4FC08D"},
            {"name": "HTML/CSS", "level": 5, "category": "frontend", "color": "#E34F26"},
        ]
    },
    {
        "id": "backend",
        "name_fr": "Back-end",
        "name_en": "Back-end",
        "color": "#10B981",
        "skills": [
            {"name": "Node.js", "level": 4, "category": "backend", "color": "#339933"},
            {"name": "Python", "level": 4, "category": "backend", "color": "#3776AB"},
            {"name": "Express", "level": 4, "category": "backend", "color": "#000000"},
            {"name": "Laravel", "level": 4, "category": "backend", "color": "#FF2D20"},
            {"name": "PHP", "level": 4, "category": "backend", "color": "#777BB4"},
        ]
    },
    {
        "id": "database",
        "name_fr": "Base de données",
        "name_en": "Database",
        "color": "#8B5CF6",
        "skills": [
            {"name": "PostgreSQL", "level": 4, "category": "database", "color": "#336791"},
            {"name": "MySQL", "level": 4, "category": "database", "color": "#4479A1"},
            {"name": "MongoDB", "level": 3, "category": "database", "color": "#47A248"},
            {"name": "Supabase", "level": 4, "category": "database", "color": "#3ECF8E"},
        ]
    },
    {
        "id": "tools",
        "name_fr": "Outils & Design",
        "name_en": "Tools & Design",
        "color": "#F59E0B",
        "skills": [
            {"name": "Figma", "level": 5, "category": "tools", "color": "#F24E1E"},
            {"name": "Git", "level": 5, "category": "tools", "color": "#F05032"},
            {"name": "Docker", "level": 3, "category": "tools", "color": "#2496ED"},
            {"name": "VS Code", "level": 5, "category": "tools", "color": "#007ACC"},
            {"name": "Adobe XD", "level": 4, "category": "tools", "color": "#FF61F6"},
        ]
    },
    {
        "id": "softskills",
        "name_fr": "Soft Skills",
        "name_en": "Soft Skills",
        "color": "#EC4899",
        "skills": [
            {"name": "Leadership", "level": 4, "category": "softskills", "color": "#EC4899"},
            {"name": "Communication", "level": 5, "category": "softskills", "color": "#EC4899"},
            {"name": "Résolution de problèmes", "level": 5, "category": "softskills", "color": "#EC4899"},
            {"name": "Travail d'équipe", "level": 5, "category": "softskills", "color": "#EC4899"},
        ]
    }
]

# ============== FastAPI App ==============
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Démarrage
    print("🚀 Portfolio Backend démarré")
    print("📡 WebSocket disponible sur /ws")
    
    # Tâche background pour les analytics temps réel
    asyncio.create_task(analytics_broadcast_loop())
    asyncio.create_task(globe_animation_loop())
    
    yield
    # Arrêt
    print("🛑 Portfolio Backend arrêté")

app = FastAPI(
    title="Portfolio Backend API",
    description="API temps réel pour le backoffice - Analytics, CMS, Globe 3D",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============== Routes API ==============

@app.get("/")
async def root():
    return {
        "name": "Portfolio Backend API",
        "version": "1.0.0",
        "status": "online",
        "endpoints": {
            "analytics": "/api/analytics",
            "skills": "/api/skills",
            "projects": "/api/projects",
            "experiences": "/api/experiences",
            "websocket": "/ws/{channel}"
        }
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# --- Analytics ---
@app.get("/api/analytics")
async def get_analytics():
    """Récupère les données analytics"""
    return {
        "visitors_online": 42,
        "views_today": 1250,
        "views_week": 8750,
        "views_month": 35000,
        "top_pages": [
            {"path": "/", "views": 450},
            {"path": "/projects", "views": 320},
            {"path": "/about", "views": 280},
            {"path": "/contact", "views": 150},
            {"path": "/services", "views": 50}
        ],
        "countries": {"FR": 45, "BJ": 30, "US": 15, "CA": 5, "DE": 5},
        "devices": {"desktop": 60, "mobile": 35, "tablet": 5},
        "recent_events": [
            {"type": "page_view", "path": "/", "country": "FR", "time": "now"},
            {"type": "page_view", "path": "/projects", "country": "BJ", "time": "now"},
            {"type": "contact", "email": "test@example.com", "time": "5m ago"}
        ]
    }

@app.get("/api/analytics/history")
async def get_analytics_history(days: int = Query(7, ge=1, le=30)):
    """Historique analytics sur N jours"""
    history = []
    for i in range(days):
        date = datetime.now() - timedelta(days=i)
        history.append({
            "date": date.strftime("%Y-%m-%d"),
            "views": 1000 + (i * 50),
            "visitors": 200 + (i * 10)
        })
    return {"history": history[::-1]}

# --- Skills ---
@app.get("/api/skills")
async def get_skills():
    """Récupère toutes les compétences"""
    return {"categories": SKILLS_DATA}

@app.get("/api/skills/{category_id}")
async def get_skills_by_category(category_id: str):
    """Récupère les compétences d'une catégorie"""
    for category in SKILLS_DATA:
        if category["id"] == category_id:
            return category
    raise HTTPException(status_code=404, detail="Catégorie non trouvée")

# --- Projects ---
@app.get("/api/projects")
async def get_projects():
    """Récupère les projets"""
    return {
        "projects": [
            {
                "id": 1,
                "title_fr": "Portfolio OS",
                "title_en": "Portfolio OS",
                "description_fr": "Mon portfolio personnel",
                "description_en": "My personal portfolio",
                "tech_stack": ["React", "TypeScript", "Tailwind"],
                "featured": True,
                "category": "web"
            },
            {
                "id": 2,
                "title_fr": "Imona",
                "title_en": "Imona",
                "description_fr": "Application de gestion locative",
                "description_en": "Rental management application",
                "tech_stack": ["Laravel", "PHP", "MySQL"],
                "featured": True,
                "category": "web"
            }
        ]
    }

# --- Experiences ---
@app.get("/api/experiences")
async def get_experiences():
    """Récupère les expériences professionnelles"""
    return {
        "experiences": [
            {
                "id": 1,
                "title": "Développeur Full-Stack",
                "company": "Freelance",
                "period": "2021 - Present",
                "location": "Cotonou, Benin",
                "description": [
                    "Développement d'applications web modernes",
                    " Conception d'interfaces UI/UX"
                ],
                "status": "current"
            }
        ]
    }

# ============== WebSocket Routes ==============

@app.websocket("/ws/{channel}")
async def websocket_endpoint(websocket: WebSocket, channel: str):
    """Endpoint WebSocket pour temps réel"""
    await manager.connect(websocket, channel)
    
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Traiter les messages reçus
            if message.get("type") == "ping":
                await manager.send_personal_message({"type": "pong"}, websocket)
            elif message.get("type") == "subscribe":
                # Gérer les abonnements spécifiques
                await manager.send_personal_message({
                    "type": "subscribed",
                    "channel": message.get("channel", channel)
                }, websocket)
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print(f"Client déconnecté du channel {channel}")

# ============== Tâches Background ==============

async def analytics_broadcast_loop():
    """Envoie les données analytics toutes les X secondes"""
    while True:
        try:
            # Simuler des données analytics dynamiques
            import random
            
            analytics_data = {
                "type": "analytics_update",
                "timestamp": datetime.now().isoformat(),
                "visitors_online": random.randint(10, 80),
                "views_today": random.randint(1000, 1500),
                "top_pages": [
                    {"path": "/", "views": random.randint(400, 500)},
                    {"path": "/projects", "views": random.randint(250, 350)},
                    {"path": "/about", "views": random.randint(200, 300)},
                ],
                "countries": {
                    "FR": random.randint(30, 50),
                    "BJ": random.randint(20, 40),
                    "US": random.randint(10, 25),
                    "CA": random.randint(5, 15)
                }
            }
            
            await manager.broadcast_analytics(analytics_data)
            await asyncio.sleep(3)  # Mise à jour toutes les 3 secondes
            
        except Exception as e:
            print(f"Erreur dans analytics_broadcast_loop: {e}")
            await asyncio.sleep(5)

async def globe_animation_loop():
    """Animation du globe - mise à jour des positions/états"""
    while True:
        try:
            import random
            from math import sin, cos
            
            # Générer des positions animées pour le globe
            globe_data = {
                "type": "globe_update",
                "timestamp": datetime.now().isoformat(),
                "rotation": random.uniform(0, 360),
                "pulse": random.uniform(0.8, 1.2),
                "skills": [
                    {
                        "name": skill["name"],
                        "level": skill["level"],
                        "category": skill["category"],
                        "color": skill["color"],
                        "active": random.choice([True, False])
                    }
                    for category in SKILLS_DATA
                    for skill in category["skills"]
                ]
            }
            
            await manager.broadcast_globe(globe_data)
            await asyncio.sleep(2)  # Mise à jour toutes les 2 secondes
            
        except Exception as e:
            print(f"Erreur dans globe_animation_loop: {e}")
            await asyncio.sleep(5)

# ============== Point d'entrée ==============
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)