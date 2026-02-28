import { useState } from "react";
import { Mail, MapPin, Github, Linkedin, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export function ContactSection() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "abattieucher@gmail.com",
      href: "mailto:abattieucher@gmail.com",
    },
    {
      icon: Phone,
      label: lang("Téléphone", "Phone"),
      value: "+229 0157002427 / 0143171448",
      href: "tel:+2290157002427",
    },
    {
      icon: MapPin,
      label: lang("Localisation", "Location"),
      value: "Dowa Dédomin, Porto-Novo",
      subValue: lang("Bénin", "Benin"),
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/eucher-abatti-7a9472283",
    },
    {
      icon: Github,
      href: "https://github.com/ton-T0b0i7/",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success(lang("Message envoyé avec succès!", "Message sent successfully!"), {
      description: lang("Je vous répondrai dans les plus brefs délais.", "I will get back to you as soon as possible."),
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <ScrollAnimation>
            <div>
              <span className="text-brand-accent font-bold tracking-[0.2em] text-sm uppercase">
                Contact
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-8 uppercase">
                {lang("Commençons une", "Start a")} <span className="text-brand-accent">{lang("Collaboration", "Collaboration")}</span>
              </h2>
              <p className="text-muted-foreground mb-12 max-w-md">
                {lang(
                  "Une idée ? Un projet ? Je suis à votre écoute pour concrétiser vos besoins technologiques.",
                  "An idea? A project? I am at your service to materialize your technological needs."
                )}
              </p>

              {/* Contact Details */}
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-3 sm:gap-6 group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-secondary rounded-xl sm:rounded-2xl flex items-center justify-center text-brand-accent border border-white/5 transition-all duration-300 group-hover:bg-brand-accent group-hover:text-white flex-shrink-0">
                      <info.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase font-bold">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-bold hover:text-brand-accent transition-colors text-sm sm:text-base block truncate"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-bold text-sm sm:text-base truncate">{info.value}</p>
                      )}
                      {info.subValue && (
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {info.subValue}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <p className="text-sm font-bold text-muted-foreground mb-4">
                  {lang("SUIVEZ-MOI", "FOLLOW ME")}
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-brand-secondary border border-white/5 flex items-center justify-center hover:bg-brand-accent transition-all duration-300 hover:scale-110"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Contact Form */}
          <ScrollAnimation delay={200}>
            <div className="glass-card p-6 sm:p-8 md:p-10 rounded-3xl border border-white/5">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground tracking-widest">
                      {lang("Nom complet", "Full Name")}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-brand-dark/50 border-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:border-brand-accent focus:ring-0 transition-all placeholder:text-slate-600 text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground tracking-widest">
                      {lang("Adresse Email", "Email Address")}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-brand-dark/50 border-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:border-brand-accent focus:ring-0 transition-all placeholder:text-slate-600 text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground tracking-widest">
                    {lang("Sujet", "Subject")}
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={lang("Collaboration Web", "Web Collaboration")}
                    required
                    className="bg-brand-dark/50 border-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:border-brand-accent focus:ring-0 transition-all placeholder:text-slate-600 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground tracking-widest">
                    {lang("Votre message", "Your message")}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={lang("Décrivez votre projet...", "Describe your project...")}
                    rows={4}
                    required
                    className="bg-brand-dark/50 border-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:border-brand-accent focus:ring-0 transition-all placeholder:text-slate-600 resize-none text-sm sm:text-base"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-accent py-3 sm:py-5 rounded-xl font-bold hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-brand-accent/20 hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base uppercase tracking-widest"
                >
                  {isSubmitting ? lang("Envoi en cours...", "Sending...") : lang("Envoyer le message", "Send message")}
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </form>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

