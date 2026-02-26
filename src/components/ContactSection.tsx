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
  MessageSquare,
  Zap,
  Globe,
  Code,
  Users,
  Target,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

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
    value: "Porto-Novo, Bénin",
    subValue: "Disponible pour missions internationales",
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
    color: "hover:bg-gray-800",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/eucher-abatti-7a9472283",
    color: "hover:bg-blue-600",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/bi.to.77235",
    color: "hover:bg-blue-500",
  },
];

const services = [
  {
    icon: Code,
    title: "Développement Web",
    description: "Applications modernes et performantes",
    color: "text-cyan-500",
  },
  {
    icon: Globe,
    title: "Applications Mobile",
    description: "Solutions natives et cross-platform",
    color: "text-blue-500",
  },
  {
    icon: Zap,
    title: "UI/UX Design",
    description: "Interfaces intuitives et élégantes",
    color: "text-purple-500",
  },
  {
    icon: Target,
    title: "Consulting Tech",
    description: "Architecture et optimisation",
    color: "text-green-500",
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { colors, theme } = useTheme();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi du formulaire
    setTimeout(() => {
      toast.success("Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        projectType: "",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section id="contact" className="py-20" style={{ backgroundColor: colors.background }}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: colors.primary + '10', color: colors.primary }}>
            <MessageSquare className="w-4 h-4" />
            Contact
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Démarrons <span style={{ color: colors.primary }}>votre projet</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
            Une idée ? Un projet ? Je suis là pour le concrétiser avec vous.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="rounded-2xl p-8 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
                <Send className="w-6 h-6" style={{ color: colors.primary }} />
                Envoyez un message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" style={{ color: colors.text }}>Nom complet</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Votre nom"
                      required
                      style={{ backgroundColor: colors.primary + '10', borderColor: colors.border, color: colors.text }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" style={{ color: colors.text }}>Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                      required
                      style={{ backgroundColor: colors.primary + '10', borderColor: colors.border, color: colors.text }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" style={{ color: colors.text }}>Sujet</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Site web, Application..."
                    required
                    style={{ backgroundColor: colors.primary + '10', borderColor: colors.border, color: colors.text }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" style={{ color: colors.text }}>Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Décrivez votre projet, vos objectifs et vos attentes..."
                    required
                    rows={6}
                    className="resize-none"
                    style={{ backgroundColor: colors.primary + '10', borderColor: colors.border, color: colors.text }}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                  className="w-full text-white font-medium"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="rounded-2xl p-8 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Informations de contact</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: colors.primary + '10' }}>
                      <info.icon className="w-5 h-5" style={{ color: colors.primary }} />
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: colors.text }}>{info.label}</div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="hover:underline"
                          style={{ color: colors.textSecondary }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div style={{ color: colors.textSecondary }}>{info.value}</div>
                      )}
                      {info.subValue && (
                        <div className="text-sm" style={{ color: colors.textSecondary }}>{info.subValue}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="rounded-2xl p-8 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Services proposés</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primary + '10' }}>
                      <service.icon className={cn("w-5 h-5", service.color)} />
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: colors.text }}>{service.title}</div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>{service.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-2xl p-8 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Réseaux sociaux</h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg flex items-center justify-center border"
                    style={{ backgroundColor: colors.primary + '10', borderColor: colors.border }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '20'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '10'; }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" style={{ color: colors.primary }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
