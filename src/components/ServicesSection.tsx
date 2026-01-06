import { useState } from "react";
import {
  Palette,
  Code,
  Smartphone,
  Sparkles,
  Bot,
  Workflow,
  Database,
  Globe,
  ArrowRight,
  Star,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Service {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  topSale?: boolean;
  roi?: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  icon: typeof Palette;
  gradient: string;
  services: Service[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "design",
    name: "Design Valley",
    icon: Palette,
    gradient: "from-secondary to-warning",
    services: [
      {
        name: "Branding & Identité",
        price: "350K - 600K",
        description: "Logo, charte graphique, supports visuels complets",
        features: ["Logo professionnel", "Charte graphique", "Templates réseaux sociaux"],
      },
      {
        name: "UI/UX Design Pro",
        price: "550K - 850K",
        popular: true,
        description: "Interfaces utilisateur élégantes et intuitives",
        features: ["Wireframes", "Maquettes Figma", "Prototypes interactifs", "Tests utilisateurs"],
        roi: "+40% conversion",
      },
      {
        name: "Motion Graphics",
        price: "250K - 400K",
        description: "Animations et vidéos promotionnelles",
        features: ["Animations logo", "Vidéos courtes", "Stories animées"],
      },
    ],
  },
  {
    id: "dev",
    name: "Dev City",
    icon: Code,
    gradient: "from-primary to-accent",
    services: [
      {
        name: "Site Web Premium",
        price: "650K - 1.2M",
        description: "Sites vitrines modernes et performants",
        features: ["Design responsive", "SEO optimisé", "CMS intégré", "Performance A+"],
      },
      {
        name: "Application Mobile",
        price: "1.2M - 2.5M",
        topSale: true,
        description: "Apps iOS/Android sur mesure",
        features: ["Cross-platform", "UI/UX native", "Backend intégré", "Maintenance incluse"],
        roi: "Expansion marché x3",
      },
      {
        name: "Plateforme SaaS",
        price: "1.5M - 3.5M",
        description: "Solutions cloud évolutives",
        features: ["Architecture scalable", "Dashboard admin", "API REST", "Analytics"],
      },
      {
        name: "Intégration API",
        price: "400K - 800K",
        description: "Connexion de systèmes et automatisation",
        features: ["APIs tierces", "Webhooks", "Synchronisation", "Documentation"],
      },
    ],
  },
  {
    id: "ai",
    name: "AI Zone",
    icon: Bot,
    gradient: "from-accent to-purple",
    services: [
      {
        name: "Solutions IA",
        price: "750K - 1.5M",
        description: "Intégration d'intelligence artificielle",
        features: ["Chatbots IA", "Analyse prédictive", "Génération contenu", "NLP"],
      },
      {
        name: "Automatisation Workflow",
        price: "300K - 600K",
        description: "Automatisation des processus métiers",
        features: ["Zapier/Make", "Scripts custom", "Intégrations", "Monitoring"],
        roi: "-30% temps opérationnel",
      },
      {
        name: "Data Intelligence",
        price: "500K - 1M",
        description: "Tableaux de bord et analytics",
        features: ["Dashboards", "Rapports auto", "KPIs temps réel", "Exports"],
      },
    ],
  },
];

const packs = [
  {
    name: "Startup Essential",
    price: "2 250 000",
    savings: "450K (-16%)",
    features: [
      "Identité visuelle complète",
      "Site web vitrine premium (5 pages)",
      "UI/UX design sur mesure",
      "6 mois maintenance Pro",
    ],
    icon: Zap,
    color: "primary",
  },
  {
    name: "Scale-Up Pro",
    price: "4 800 000",
    savings: "1.2M (-20%)",
    featured: true,
    features: [
      "Audit stratégique complet",
      "Application web SaaS",
      "Système d'automatisation",
      "Gestion de projet 3 mois",
      "12 mois maintenance Enterprise",
    ],
    icon: TrendingUp,
    color: "secondary",
  },
];

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("design");

  const activeServices =
    serviceCategories.find((c) => c.id === activeCategory)?.services || [];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            Solutions & Services
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">Silicon Valley</span> Virtuelle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explorez les quartiers de ma ville numérique. Chaque district offre des
            solutions spécialisées pour transformer votre vision en réalité.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300",
                  isActive
                    ? `bg-gradient-to-r ${category.gradient} text-foreground shadow-lg`
                    : "glass text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {activeServices.map((service, index) => (
            <div
              key={service.name}
              className={cn(
                "glass rounded-2xl p-6 transition-all duration-300 card-hover relative overflow-hidden",
                service.popular && "border-primary/50",
                service.topSale && "border-secondary/50"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Badges */}
              {service.popular && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                  <Star className="w-3 h-3" />
                  Populaire
                </div>
              )}
              {service.topSale && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                  <Zap className="w-3 h-3" />
                  Top Vente
                </div>
              )}

              {/* Content */}
              <h3 className="text-xl font-display font-semibold mb-2">{service.name}</h3>
              <p className="text-2xl font-bold gradient-text mb-3">
                {service.price} <span className="text-sm text-muted-foreground">FCFA</span>
              </p>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* ROI Badge */}
              {service.roi && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  {service.roi}
                </div>
              )}

              {/* CTA */}
              <Button
                variant="ghost"
                className="w-full mt-4 hover:bg-primary/10 hover:text-primary"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Demander un devis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Packs Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Packs <span className="gradient-text-warm">Pré-configurés</span>
          </h3>
          <p className="text-muted-foreground">
            Solutions complètes à prix avantageux
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packs.map((pack) => {
            const Icon = pack.icon;

            return (
              <div
                key={pack.name}
                className={cn(
                  "glass rounded-2xl p-8 transition-all duration-300 card-hover",
                  pack.featured && "border-secondary/50 scale-105"
                )}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={cn(
                      "p-3 rounded-xl",
                      pack.color === "primary" ? "bg-primary/20" : "bg-secondary/20"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-6 h-6",
                        pack.color === "primary" ? "text-primary" : "text-secondary"
                      )}
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-bold">{pack.name}</h4>
                    <p className="text-success text-sm font-medium">
                      Économie : {pack.savings}
                    </p>
                  </div>
                </div>

                <p className="text-3xl font-bold gradient-text mb-6">
                  {pack.price} <span className="text-lg text-muted-foreground">FCFA</span>
                </p>

                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-success"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full",
                    pack.color === "primary"
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  )}
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Choisir ce pack
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
