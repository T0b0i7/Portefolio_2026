import { useState, useRef } from "react";
import { Mail, MapPin, Github, Linkedin, Send, Phone, ArrowRight, AlertCircle } from "lucide-react";
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
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MIN_SECONDS_BETWEEN_SUBMISSIONS = 45;

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    switch (name) {
      case 'name':
        if (!value.trim()) newErrors.name = lang("Le nom est requis", "Name is required");
        else if (value.trim().length < 2) newErrors.name = lang("Minimum 2 caractères", "Minimum 2 characters");
        else delete newErrors.name;
        break;
      case 'email':
        if (!value.trim()) newErrors.email = lang("L'email est requis", "Email is required");
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = lang("Email invalide", "Invalid email");
        else delete newErrors.email;
        break;
      case 'subject':
        if (!value.trim()) newErrors.subject = lang("Le sujet est requis", "Subject is required");
        else if (value.trim().length < 3) newErrors.subject = lang("Minimum 3 caractères", "Minimum 3 characters");
        else delete newErrors.subject;
        break;
      case 'message':
        if (!value.trim()) newErrors.message = lang("Le message est requis", "Message is required");
        else if (value.trim().length < 10) newErrors.message = lang("Minimum 10 caractères", "Minimum 10 characters");
        else if (value.length > 2000) newErrors.message = lang("Maximum 2000 caractères", "Maximum 2000 characters");
        else delete newErrors.message;
        break;
    }
    setErrors(newErrors);
  };

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
      value: "+229 0157002427",
      href: "tel:+2290157002427",
    },
    {
      icon: MapPin,
      label: lang("Localisation", "Location"),
      value: "Porto-Novo, Bénin",
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/eucher-abatti-7a9472283" },
    { icon: Github, href: "https://github.com/T0b0i7/" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields synchronously
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = lang("Le nom est requis", "Name is required");
    if (!formData.email.trim()) newErrors.email = lang("L'email est requis", "Email is required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = lang("Email invalide", "Invalid email");
    if (!formData.subject.trim()) newErrors.subject = lang("Le sujet est requis", "Subject is required");
    if (!formData.message.trim()) newErrors.message = lang("Le message est requis", "Message is required");
    else if (formData.message.length > 2000) newErrors.message = lang("Maximum 2000 caractères", "Maximum 2000 characters");

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      if (formData.website.trim()) {
        setIsSubmitting(false);
        return;
      }

      const now = Date.now();
      const lastSubmission = Number(localStorage.getItem("contact_last_submit_at") ?? "0");
      if (lastSubmission && now - lastSubmission < MIN_SECONDS_BETWEEN_SUBMISSIONS * 1000) {
        toast.error(lang("Envoi trop rapproché", "Too many requests"), {
          description: lang(
            `Merci de patienter ${MIN_SECONDS_BETWEEN_SUBMISSIONS} secondes avant un nouvel envoi.`,
            `Please wait ${MIN_SECONDS_BETWEEN_SUBMISSIONS} seconds before sending another message.`
          ),
        });
        setIsSubmitting(false);
        return;
      }

      const { error } = await new Promise<{ error: Error | null }>((resolve) => 
        setTimeout(() => resolve({ error: null }), 1000)
      );

      if (error) throw error;
      localStorage.setItem("contact_last_submit_at", String(now));

      toast.success(lang("Message envoyé avec succès!", "Message sent successfully!"), {
        description: lang("Je vous répondrai dans les plus brefs délais.", "I will get back to you as soon as possible."),
      });

      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (error: unknown) {
      console.error("Error submitting contact form:", error);
      toast.error(lang("Erreur lors de l'envoi", "Error while sending"), {
        description: lang("Veuillez réessayer plus tard.", "Please try again later."),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    validateField(e.target.name, e.target.value);
  };

  return (
    <div className="py-24 md:py-40 bg-near-black text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <ScrollAnimation>
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-stone-gray">
                    {lang("Contact & Collaboration", "Contact & Collaboration")}
                  </span>
                </div>
                <h2 className="text-4xl md:text-7xl font-serif font-medium leading-tight text-white italic">
                  {lang("Initions une", "Let's start a")} <br />
                  <span className="text-terracotta not-italic">{lang("conversation.", "conversation.")}</span>
                </h2>
                <p className="text-xl text-stone-gray font-sans leading-relaxed max-w-lg">
                  {lang(
                    "Une idée, un besoin technique ou simplement l'envie de discuter d'une vision ? Ma boîte de réception est toujours ouverte.",
                    "An idea, a technical need, or simply a desire to discuss a vision? My inbox is always open."
                  )}
                </p>
              </div>

              <div className="space-y-8">
                {contactInfo.map((info) => (
                  <div key={info.label} className="group">
                    <p className="text-[10px] font-sans font-medium uppercase tracking-widest text-stone-gray mb-2">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a href={info.href} className="text-2xl font-serif font-medium text-white hover:text-terracotta transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-2xl font-serif font-medium text-white">{info.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-8">
                 <p className="text-[10px] font-sans font-medium uppercase tracking-widest text-stone-gray mb-6">
                  {lang("Suivez mon travail", "Follow my work")}
                </p>
                <div className="flex gap-6">
                  {socialLinks.map((social, i) => (
                    <a 
                      key={i} 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-stone-gray hover:text-terracotta transition-colors"
                      aria-label={`${social.icon === Github ? 'GitHub' : 'LinkedIn'} (nouvelle fenêtre / new window)`}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Form Side */}
          <ScrollAnimation delay={200}>
            <div className="bg-white/[0.03] border border-white/5 rounded-[40px] p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <input type="text" name="website" value={formData.website} onChange={handleChange} className="hidden" />
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-[10px] font-sans font-medium uppercase tracking-widest text-stone-gray">
                      {lang("Votre Nom", "Your Name")}
                    </Label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full bg-transparent border-b py-3 text-ivory focus:outline-none transition-colors font-sans ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-terracotta'}`}
                      placeholder="Jean Dupont"
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-[10px] font-sans font-medium uppercase tracking-widest text-stone-gray">
                      {lang("Votre Email", "Your Email")}
                    </Label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full bg-transparent border-b py-3 text-ivory focus:outline-none transition-colors font-sans ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-terracotta'}`}
                      placeholder="jean@exemple.com"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="subject" className="text-[10px] font-sans font-medium uppercase tracking-widest text-stone-gray">
                    {lang("Sujet du Message", "Subject")}
                  </Label>
                  <input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full bg-transparent border-b py-3 text-ivory focus:outline-none transition-colors font-sans ${errors.subject ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-terracotta'}`}
                    placeholder={lang("Une opportunité de projet", "A project opportunity")}
                  />
                  {errors.subject && (
                    <span className="text-[10px] text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-[10px] font-sans font-medium uppercase tracking-widest text-stone-gray">
                    {lang("Votre Message", "Message")}
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    maxLength={2000}
                    className={`w-full bg-transparent border rounded-2xl p-6 text-ivory focus:outline-none transition-colors font-sans resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-terracotta'}`}
                    placeholder={lang("Décrivez votre vision...", "Tell me about your vision...")}
                  />
                  <div className="flex items-center justify-between">
                    {errors.message ? (
                      <span className="text-[10px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className={`text-[10px] font-sans ${formData.message.length > 1800 ? 'text-amber-400' : 'text-stone-gray'}`}>
                      {formData.message.length}/2000
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center !py-5"
                >
                  {isSubmitting ? lang("Envoi en cours...", "Sending...") : lang("Envoyer le message", "Send message")}
                  {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                </button>
              </form>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}
