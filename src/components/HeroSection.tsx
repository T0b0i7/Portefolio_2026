import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Github, 
  Linkedin, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  Download,
  ArrowRight,
  Code,
  Sparkles,
  Zap,
  Globe,
  Database,
  Cpu,
  Terminal,
  Camera,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const techStack = [
  { name: "React", icon: Code, color: "text-cyan-500" },
  { name: "TypeScript", icon: Terminal, color: "text-blue-500" },
  { name: "Node.js", icon: Zap, color: "text-green-500" },
  { name: "Tailwind CSS", icon: Sparkles, color: "text-purple-500" },
  { name: "MongoDB", icon: Database, color: "text-emerald-500" },
  { name: "Next.js", icon: Globe, color: "text-gray-800" },
  { name: "PostgreSQL", icon: Database, color: "text-blue-600" },
  { name: "Figma", icon: Sparkles, color: "text-pink-500" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/T0b0i7/", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/eucher-abatti-7a9472283", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/bi.to.77235", label: "Facebook" },
];

export function HeroSection() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { colors, theme, toggleTheme } = useTheme();

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Rotate tech stack
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % techStack.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getPrimaryColor = () => {
    const colorMap = {
      light: 'bg-blue-600 hover:bg-blue-700',
      dark: 'bg-blue-500 hover:bg-blue-600'
    };
    return colorMap[theme];
  };

  const getTextColor = () => {
    const colorMap = {
      light: 'text-blue-600',
      dark: 'text-blue-400'
    };
    return colorMap[theme];
  };

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden" style={{ backgroundColor: colors.background }}>
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${colors.primary} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Header Navigation */}
      <header className={`relative z-20 px-6 py-4 backdrop-blur-sm border transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            style={{ backgroundColor: colors.surface + '80', borderColor: colors.border }}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold" style={{ color: colors.text }}>Eucher ABATTI</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#hero" className="transition-colors" style={{ color: colors.textSecondary }} onMouseEnter={(e) => e.currentTarget.style.color = colors.text} onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}>Accueil</a>
            <a href="#evolution" className="transition-colors" style={{ color: colors.textSecondary }} onMouseEnter={(e) => e.currentTarget.style.color = colors.text} onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}>Parcours</a>
            <a href="#projects" className="transition-colors" style={{ color: colors.textSecondary }} onMouseEnter={(e) => e.currentTarget.style.color = colors.text} onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}>Projets</a>
            <a href="#services" className="transition-colors" style={{ color: colors.textSecondary }} onMouseEnter={(e) => e.currentTarget.style.color = colors.text} onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}>Services</a>
            <a href="#contact" className="transition-colors" style={{ color: colors.textSecondary }} onMouseEnter={(e) => e.currentTarget.style.color = colors.text} onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}>Contact</a>
            
            {/* Theme Toggle in Menu */}
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: theme === 'dark' ? colors.border : colors.textSecondary + '30' }}
            >
              <span className="sr-only">Toggle theme</span>
              <span
                className={cn(
                  'inline-block h-6 w-6 transform rounded-full shadow-lg transition-transform',
                  theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                )}
                style={{ backgroundColor: colors.surface }}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-yellow-500 m-1" />
                ) : (
                  <Moon className="h-4 w-4 text-blue-400 m-1" />
                )}
              </span>
            </button>
          </nav>

          <div className="flex items-center gap-4">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="md:hidden relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: theme === 'dark' ? colors.border : colors.textSecondary + '30' }}
            >
              <span className="sr-only">Toggle theme</span>
              <span
                className={cn(
                  'inline-block h-6 w-6 transform rounded-full shadow-lg transition-transform',
                  theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                )}
                style={{ backgroundColor: colors.surface }}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-yellow-500 m-1" />
                ) : (
                  <Moon className="h-4 w-4 text-blue-400 m-1" />
                )}
              </span>
            </button>
            
            <Button className={getPrimaryColor()}>
              <Download className="w-4 h-4 mr-2" />
              CV
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Left Side - Profile Image */}
          <div className={`relative transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group">
              {/* Profile Image Container */}
              <div className="relative rounded-2xl p-8 shadow-lg border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
                <div className="relative">
                  <Avatar className="w-64 h-64 mx-auto">
                    <AvatarImage 
                      src={profileImage || "/profil.png"} 
                      alt="Eucher ABATTI"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-white text-4xl font-bold" style={{ backgroundColor: colors.primary }}>
                      EA
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Upload Button */}
                  <label 
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-lg"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Camera className="w-5 h-5 text-white" />
                  </label>
                </div>
              </div>

              {/* Floating Elements */}
              <div 
                className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Cpu className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.surface === '#ffffff' ? '#f3f4f6' : '#374151' }}>
                <Terminal className="w-6 h-6" style={{ color: colors.textSecondary }} />
              </div>
            </div>

            {/* Social Links */}
            <div className={`flex justify-center gap-4 mt-8 transition-all duration-1000 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border hover:scale-110"
                  style={{ 
                    backgroundColor: colors.surface, 
                    borderColor: colors.border,
                    transitionDelay: `${350 + index * 100}ms`
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primary + '10'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.surface}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" style={{ color: colors.textSecondary }} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8" style={{ color: colors.text }}>
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{ backgroundColor: colors.primary + '10' }}
            >
              <Sparkles className="w-4 h-4" style={{ color: colors.primary }} />
              <span className="text-sm font-medium" style={{ color: colors.text }}>Développeur Full-Stack & UI/UX Designer</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className={`text-5xl lg:text-6xl font-bold leading-tight transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: '200ms' }}>
                <span>
                  Créateur de
                </span>
                <br />
                <span className={getTextColor()}>
                  Solutions Digitales
                </span>
              </h1>
              
              <p className={`text-xl leading-relaxed transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                 style={{ 
                   color: colors.textSecondary,
                   transitionDelay: '400ms'
                 }}>
                Je transforme vos idées en expériences web modernes, performantes et mémorables. 
                Spécialisé en React, TypeScript et Node.js, je crée des applications qui 
                allient design élégant et fonctionnalité robuste.
              </p>
            </div>

            {/* Current Tech Display */}
            <div className={`rounded-xl p-6 border transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                 style={{ 
                   backgroundColor: colors.surface, 
                   borderColor: colors.border,
                   transitionDelay: '600ms'
                 }}>
              <div className="flex items-center gap-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: colors.primary + '10' }}
                >
                  {React.createElement(techStack[currentTechIndex].icon, { 
                    className: cn("w-6 h-6", techStack[currentTechIndex].color) 
                  })}
                </div>
                <div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>Technologie actuelle</div>
                  <div className="text-xl font-bold" style={{ color: colors.text }}>{techStack[currentTechIndex].name}</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                 style={{ transitionDelay: '800ms' }}>
              <Button 
                size="lg" 
                className={cn("text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105", getPrimaryColor())}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                Voir mes projets
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{ borderColor: colors.border, color: colors.text }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '10'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Me contacter
              </Button>
            </div>

            {/* Contact Info */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                 style={{ transitionDelay: '1000ms' }}>
              <div className="flex items-center gap-3" style={{ color: colors.textSecondary }}>
                <Mail className="w-5 h-5" style={{ color: colors.primary }} />
                <span className="text-sm">abattieucher@gmail.com</span>
              </div>
              <div className="flex items-center gap-3" style={{ color: colors.textSecondary }}>
                <Phone className="w-5 h-5" style={{ color: colors.primary }} />
                <span className="text-sm">+229 0157002427</span>
              </div>
              <div className="flex items-center gap-3" style={{ color: colors.textSecondary }}>
                <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
                <span className="text-sm">Porto-Novo, Bénin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0 animate-bounce' : 'opacity-0 translate-y-4'}`}
           style={{ 
             color: colors.textSecondary,
             transitionDelay: '1200ms'
           }}>
        <ArrowRight className="w-5 h-5 rotate-90" />
      </div>
    </section>
  );
}
