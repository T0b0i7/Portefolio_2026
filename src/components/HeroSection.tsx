import { useState } from "react";
import { ArrowDown, MapPin, Phone, Mail, Github, Linkedin, Facebook, Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Profile Image */}
          <div className="relative inline-block mb-8 animate-fade-in group">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-primary/50 glow-cyan">
              <AvatarImage src={profileImage || "/profil.png"} alt="Eucher ABATTI" className="object-cover" />
              <AvatarFallback className="bg-background text-4xl md:text-5xl font-display font-bold gradient-text">
                EA
              </AvatarFallback>
            </Avatar>
            
            {/* Upload Overlay */}
            <label 
              htmlFor="profile-upload" 
              className="absolute inset-0 flex items-center justify-center rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <div className="flex flex-col items-center gap-1">
                <Camera className="w-6 h-6 text-primary" />
                <span className="text-xs text-muted-foreground">Modifier</span>
              </div>
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            {/* Status Indicator */}
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-success rounded-full border-4 border-background animate-pulse" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Disponible pour de nouveaux projets
            </span>
          </div>

          {/* Name & Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Eucher</span>{" "}
            <span className="gradient-text">ABATTI</span>
          </h1>

          <div className="flex items-center justify-center gap-3 mb-8 animate-slide-up animation-delay-100">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
            <h2 className="text-xl md:text-2xl font-display text-muted-foreground">
              Développeur <span className="text-primary">Full-Stack</span> Web & Mobile
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up animation-delay-200">
            Je conçois des <span className="text-foreground">solutions sur mesure</span> axées sur la 
            digitalisation des processus métiers. Mon approche repose sur la compréhension des besoins 
            réels, la <span className="text-primary">rigueur dans l'exécution</span> et une recherche 
            constante d'<span className="text-secondary">efficacité et d'élégance</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up animation-delay-300">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan px-8 py-6 text-lg font-semibold"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Mail className="mr-2 h-5 w-5" />
              Démarrer un projet
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-muted-foreground/30 hover:border-primary hover:text-primary px-8 py-6 text-lg"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              Voir mes réalisations
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-slide-up animation-delay-400">
            <a
              href="tel:+22901570024277"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+229 0157002427</span>
            </a>
            <a
              href="mailto:abattieucher@gmail.com"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>abattieucher@gmail.com</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Porto-Novo, Bénin</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mt-8 animate-slide-up animation-delay-500">
            <a
              href="https://github.com/T0b0i7/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass hover:glow-cyan transition-all duration-300 hover:-translate-y-1"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/eucher-abatti-7a9472283"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass hover:glow-cyan transition-all duration-300 hover:-translate-y-1"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/bi.to.77235"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass hover:glow-cyan transition-all duration-300 hover:-translate-y-1"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => document.getElementById("parcours")?.scrollIntoView({ behavior: "smooth" })}
          className="p-3 rounded-full glass hover:glow-cyan transition-all duration-300 hover:text-primary"
        >
          <ArrowDown className="w-6 h-6 text-primary animate-pulse" />
        </button>
      </div>
    </section>
  );
}
