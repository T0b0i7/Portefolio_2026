import { ArrowUpRight, FileText, Github, Linkedin, Mail, MapPin, Phone, Settings, ShieldCheck, Terminal } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTrackingConsent } from "@/hooks/use-tracking-consent";

export function Footer() {
  const { lang } = useLanguage();
  const { reset } = useTrackingConsent();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 pt-14 pb-8">
      <div
        className="pointer-events-none absolute -top-16 left-0 right-0 h-16"
        style={{ background: "linear-gradient(to bottom, transparent, rgb(2 6 23))" }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-accent to-blue-400 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                  <Terminal className="h-5 w-5 text-brand-accent" />
                </div>
              </div>
              <div>
                <p className="text-white font-black tracking-tight uppercase">TobiDev</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {lang("Developpeur Full-Stack", "Full-Stack Developer")}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {lang(
                "Je concois des produits web et IA fiables, lisibles et orientes impact metier.",
                "I design reliable web and AI products focused on business impact."
              )}
            </p>

            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-accent px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-600"
            >
              {lang("Demarrer un projet", "Start a project")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              {lang("Navigation", "Navigation")}
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#accueil" className="text-slate-300 transition-colors hover:text-white">{lang("Accueil", "Home")}</a>
              <a href="#apropos" className="text-slate-300 transition-colors hover:text-white">{lang("À propos", "About")}</a>
              <a href="#parcours" className="text-slate-300 transition-colors hover:text-white">{lang("Parcours", "Timeline")}</a>
              <a href="#projects" className="text-slate-300 transition-colors hover:text-white">{lang("Projets", "Projects")}</a>
              <a href="#services" className="text-slate-300 transition-colors hover:text-white">{lang("Services", "Services")}</a>
              <a href="#contact" className="text-slate-300 transition-colors hover:text-white">{lang("Contact", "Contact")}</a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              {lang("Contact", "Contact")}
            </p>
            <div className="space-y-3 text-sm">
              <a href="mailto:abattieucher@gmail.com" className="flex items-center gap-2 text-slate-300 transition-colors hover:text-white">
                <Mail className="h-4 w-4 text-brand-accent" />
                abattieucher@gmail.com
              </a>
              <a href="tel:+2290157002427" className="flex items-center gap-2 text-slate-300 transition-colors hover:text-white">
                <Phone className="h-4 w-4 text-brand-accent" />
                +229 0157002427
              </a>
              <p className="flex items-center gap-2 text-slate-400">
                <MapPin className="h-4 w-4 text-brand-accent" />
                Porto-Novo, Benin
              </p>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/T0b0i7/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-brand-accent/50 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/eucher-abatti-7a9472283"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-brand-accent/50 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              {lang("Legal", "Legal")}
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <Dialog>
                <DialogTrigger className="flex w-fit items-center gap-2 text-slate-300 transition-colors hover:text-white">
                  <FileText className="h-4 w-4 text-brand-accent" />
                  {lang("Mentions legales", "Legal notice")}
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto border-white/10 bg-slate-900 text-slate-300">
                  <DialogHeader>
                    <DialogTitle className="mb-3 text-2xl font-bold text-white">
                      {lang("Mentions legales", "Legal notice")}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>{lang("Editeur: TobiDev, Porto-Novo (Benin).", "Publisher: TobiDev, Porto-Novo (Benin).")}</p>
                    <p>{lang("Contact: abattieucher@gmail.com | +229 0157002427", "Contact: abattieucher@gmail.com | +229 0157002427")}</p>
                    <p>{lang("Hebergement: Netlify Inc. (USA).", "Hosting: Netlify Inc. (USA).")}</p>
                    <p>{lang("Contenus proteges par le droit d auteur.", "Content is protected by copyright law.")}</p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger className="flex w-fit items-center gap-2 text-slate-300 transition-colors hover:text-white">
                  <ShieldCheck className="h-4 w-4 text-brand-accent" />
                  {lang("Politique de confidentialite", "Privacy policy")}
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto border-white/10 bg-slate-900 text-slate-300">
                  <DialogHeader>
                    <DialogTitle className="mb-3 text-2xl font-bold text-white">
                      {lang("Politique de confidentialite", "Privacy policy")}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>{lang("Seules les donnees envoyees via le formulaire sont collectees.", "Only data sent through the contact form is collected.")}</p>
                    <p>{lang("Utilisation: reponse a vos demandes professionnelles.", "Usage: replying to your professional requests.")}</p>
                    <p>{lang("Aucune vente de donnees a des tiers.", "No sale of personal data to third parties.")}</p>
                    <p>{lang("Mesure d audience technique sans cookies publicitaires.", "Technical analytics without advertising cookies.")}</p>
                  </div>
                </DialogContent>
              </Dialog>

              <button
                type="button"
                onClick={reset}
                className="flex w-fit items-center gap-2 text-slate-300 transition-colors hover:text-white"
              >
                <Settings className="h-4 w-4 text-brand-accent" />
                {lang("Preferences de mesure", "Analytics preferences")}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            {`© ${currentYear} TobiDev. `}{lang("Tous droits reserves.", "All rights reserved.")}
          </p>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500">React + Tailwind + TypeScript</p>
        </div>
      </div>
    </footer>
  );
}
