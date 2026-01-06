import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Facebook,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "+229 0157002427",
    href: "tel:+22901570024277",
    subValue: "+229 0143171448",
  },
  {
    icon: Mail,
    label: "Email",
    value: "abattieucher@gmail.com",
    href: "mailto:abattieucher@gmail.com",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "Dowa Dédomin, Porto-Novo",
    subValue: "Bénin",
  },
  {
    icon: Clock,
    label: "Disponibilité",
    value: "Lun - Sam",
    subValue: "08:00 - 20:00 GMT+1",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/T0b0i7/",
    color: "hover:text-foreground",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/eucher-abatti-7a9472283",
    color: "hover:text-primary",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/bi.to.77235",
    color: "hover:text-blue-600",
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message envoyé avec succès!", {
      description: "Je vous répondrai dans les plus brefs délais.",
    });

    setFormData({ name: "", email: "", subject: "", budget: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-secondary/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-4">
            <Mail className="w-4 h-4 text-primary" />
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Construisons <span className="gradient-text-warm">Ensemble</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prêt à transformer votre vision en réalité ? Discutons de votre projet
            et créons quelque chose d'extraordinaire.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;

                return (
                  <div key={info.label} className="glass rounded-xl p-4 card-hover">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium">{info.value}</p>
                        )}
                        {info.subValue && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {info.subValue}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Retrouvez-moi sur les réseaux
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-4 glass rounded-xl transition-all duration-300 hover:-translate-y-1",
                        social.color
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass rounded-xl p-6">
              <h4 className="font-display font-semibold mb-4">Garanties</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Réponse sous 24h
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Devis gratuit et sans engagement
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Suivi personnalisé de projet
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Support post-livraison inclus
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Site web, Application..."
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget estimé</Label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full h-10 px-3 py-2 rounded-md bg-background/50 border border-border/50 focus:border-primary text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="< 500K">Moins de 500K FCFA</option>
                    <option value="500K - 1M">500K - 1M FCFA</option>
                    <option value="1M - 2M">1M - 2M FCFA</option>
                    <option value="> 2M">Plus de 2M FCFA</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet, vos objectifs et vos attentes..."
                  required
                  rows={6}
                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
