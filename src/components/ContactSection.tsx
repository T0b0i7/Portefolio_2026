import { useState } from "react";
import { Mail, MapPin, Github, Linkedin, Send, Phone, ArrowRight } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MIN_SECONDS_BETWEEN_SUBMISSIONS = 45;

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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
                      className="text-stone-gray hover:text-terracotta transition-colors"
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
                      required
                      className="w-full bg-transparent border-b border-white/10 py-3 text-ivory focus:outline-none focus:border-terracotta transition-colors font-sans"
                      placeholder="Jean Dupont"
                    />
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
                      required
                      className="w-full bg-transparent border-b border-white/10 py-3 text-ivory focus:outline-none focus:border-terracotta transition-colors font-sans"
                      placeholder="jean@exemple.com"
                    />
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
                    required
                    className="w-full bg-transparent border-b border-white/10 py-3 text-ivory focus:outline-none focus:border-terracotta transition-colors font-sans"
                    placeholder={lang("Une opportunité de projet", "A project opportunity")}
                  />
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
                    required
                    className="w-full bg-transparent border border-white/10 rounded-2xl p-6 text-ivory focus:outline-none focus:border-terracotta transition-colors font-sans resize-none"
                    placeholder={lang("Décrivez votre vision...", "Tell me about your vision...")}
                  />
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
