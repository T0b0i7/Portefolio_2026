import { ArrowRight, FileText, Github, Linkedin, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const barVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Footer() {
  const { lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ivory py-24 border-t border-border-cream">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12"
        >
          {/* Brand */}
          <motion.div variants={columnVariants} className="space-y-6">
            <a href="#accueil" className="text-3xl font-serif font-medium text-near-black">
              Tobi<span className="text-terracotta">Dev</span>
            </a>
            <p className="text-charcoal-warm font-sans leading-relaxed max-w-xs">
              {lang(
                "Conception numérique alliant clarté éditoriale et performance technologique.",
                "Digital design combining editorial clarity and technical performance."
              )}
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/T0b0i7/"
                target="_blank"
                rel="noopener noreferrer"
                title={lang("GitHub (nouvelle fenêtre)", "GitHub (new window)")}
                className="text-stone-gray hover:text-terracotta transition-colors"
                whileHover={{ scale: 1.2, color: "#c96442" }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/eucher-abatti-7a9472283"
                target="_blank"
                rel="noopener noreferrer"
                title={lang("LinkedIn (nouvelle fenêtre)", "LinkedIn (new window)")}
                className="text-stone-gray hover:text-terracotta transition-colors"
                whileHover={{ scale: 1.2, color: "#c96442" }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={columnVariants}>
            <h4 className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-stone-gray mb-8">
              {lang("Navigation", "Navigation")}
            </h4>
            <ul className="space-y-4 font-sans text-sm text-charcoal-warm">
              <li><a href="#accueil" className="hover:text-terracotta transition-colors">{lang("Accueil", "Home")}</a></li>
              <li><a href="#apropos" className="hover:text-terracotta transition-colors">{lang("À propos", "About")}</a></li>
              <li><a href="#arsenal" className="hover:text-terracotta transition-colors">{lang("Arsenal", "Arsenal")}</a></li>
              <li><a href="#projects" className="hover:text-terracotta transition-colors">{lang("Projets", "Projects")}</a></li>
              <li><a href="#services" className="hover:text-terracotta transition-colors">{lang("Services", "Services")}</a></li>
              <li><a href="#temoignages" className="hover:text-terracotta transition-colors">{lang("Témoignages", "Testimonials")}</a></li>
              <li><a href="#contact" className="hover:text-terracotta transition-colors">{lang("Contact", "Contact")}</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={columnVariants}>
            <h4 className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-stone-gray mb-8">
              {lang("Contact", "Direct Line")}
            </h4>
            <ul className="space-y-4 font-sans text-sm text-charcoal-warm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-terracotta" />
                <a href="mailto:abattieucher@gmail.com" className="hover:text-terracotta transition-colors">abattieucher@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-terracotta" />
                <a href="tel:+2290157002427" className="hover:text-terracotta transition-colors">+229 0157002427</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-terracotta" />
                <span>Porto-Novo, Bénin</span>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={columnVariants}>
            <h4 className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-stone-gray mb-8">
              {lang("Légal & Plus", "Legal & More")}
            </h4>
            <div className="flex flex-col gap-4 font-sans text-sm text-charcoal-warm">
              <Dialog>
                <DialogTrigger className="text-left hover:text-terracotta transition-colors flex items-center gap-2">
                  <FileText size={16} />
                  {lang("Mentions légales", "Legal Notice")}
                </DialogTrigger>
                <DialogContent className="bg-ivory border-border-cream text-near-black rounded-3xl p-10">
                  <DialogHeader><DialogTitle className="font-serif text-3xl mb-4">{lang("Mentions Légales", "Legal Notice")}</DialogTitle></DialogHeader>
                  <p className="font-sans leading-relaxed text-charcoal-warm">
                    TobiDev — Porto-Novo, Bénin. <br />
                    Propulsé par la passion et la technologie.
                  </p>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger className="text-left hover:text-terracotta transition-colors flex items-center gap-2">
                  <ShieldCheck size={16} />
                  {lang("Confidentialité", "Privacy Policy")}
                </DialogTrigger>
                <DialogContent className="bg-ivory border-border-cream text-near-black rounded-3xl p-10">
                  <DialogHeader><DialogTitle className="font-serif text-3xl mb-4">{lang("Confidentialité", "Privacy Policy")}</DialogTitle></DialogHeader>
                  <p className="font-sans leading-relaxed text-charcoal-warm">
                    Vos données sont traitées avec le plus grand respect du secret professionnel.
                  </p>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={barVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-border-cream flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-xs font-sans text-charcoal-warm tracking-widest uppercase">
            © {currentYear} TobiDev Studio — {lang("Tous droits réservés", "All rights reserved")}
          </p>
          <div className="flex items-center gap-4 text-[10px] font-sans font-medium text-charcoal-warm tracking-widest uppercase">
            <span>React</span>
            <span className="w-1 h-1 rounded-full bg-border-cream" />
            <span>Tailwind</span>
            <span className="w-1 h-1 rounded-full bg-border-cream" />
            <span>Claude AI Style</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
