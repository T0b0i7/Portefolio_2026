import { useState, useEffect } from "react";
import { Home, Briefcase, Folder, Wrench, Mail, User, Zap } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "hero", label: "Accueil", icon: Home },
  { id: "parcours", label: "Parcours", icon: Briefcase },
  { id: "projects", label: "Projets", icon: Folder },
  { id: "services", label: "Services", icon: Wrench },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "secure-system", label: "Animation", icon: Zap, isExternal: true },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const current = sections.find((section) => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed left-4 top-1/2 -translate-y-1/2 z-50 glass rounded-2xl transition-all duration-300",
        isExpanded ? "w-48 opacity-100" : "w-14 opacity-40 hover:opacity-100"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-3 space-y-2">
        {/* Profile Avatar */}
        <button
          onClick={() => scrollToSection("hero")}
          className={cn(
            "flex items-center justify-center w-full p-2 rounded-xl transition-all duration-300 mb-2",
            activeSection === "hero"
              ? "bg-primary/20 glow-cyan"
              : "hover:bg-muted/50"
          )}
        >
          <Avatar className="w-8 h-8 border-2 border-primary/50">
            <AvatarImage src="/profil.png" alt="Eucher ABATTI" className="object-cover" />
            <AvatarFallback className="text-xs font-bold bg-primary/20 text-primary">
              EA
            </AvatarFallback>
          </Avatar>
        </button>

        <div className="h-px bg-border/30" />

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          if (item.isExternal) {
            return (
              <a
                key={item.id}
                href="/secure-system"
                className={cn(
                  "flex items-center gap-3 w-full p-2 rounded-xl transition-all duration-300",
                  "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:text-yellow-400 hover:glow-cyan"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span
                  className={cn(
                    "text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                    isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                  )}
                >
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "flex items-center gap-3 w-full p-2 rounded-xl transition-all duration-300",
                isActive
                  ? "bg-primary/20 text-primary glow-cyan"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary")} />
              <span
                className={cn(
                  "text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                  isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                )}
              >
                {item.label}
              </span>
              {isActive && !isExpanded && (
                <span className="absolute right-0 w-1 h-6 bg-primary rounded-l-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
