import React, { useState } from "react";
import { Terminal, ShieldCheck, FileText, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { lang, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-start">

          {/* Column 1: Brand/Identity */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accent to-blue-400 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-brand-accent" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white tracking-tighter uppercase leading-none">
                  Eucher <span className="text-brand-accent">ABATTI</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500 mt-1">Full-Stack Architect & IA</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              {lang(
                "Conception d'expériences numériques innovantes alliant performance, esthétique et intelligence artificielle.",
                "Designing innovative digital experiences combining performance, aesthetics, and artificial intelligence."
              )}
            </p>
          </div>

          {/* Column 2: Legal Links & Content */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">{lang("Cadre Légal", "Legal Framework")}</h4>
            <div className="flex flex-col gap-3">
              {/* Mentions Légales Dialog */}
              <Dialog>
                <DialogTrigger className="flex items-center gap-2 text-sm text-slate-400 hover:text-brand-accent transition-colors w-fit">
                  <FileText className="w-4 h-4" />
                  {lang("Mentions légales", "Legal Notice")}
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-slate-900 border-white/10 text-slate-300 max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white mb-4">
                      {lang("Mentions Légales", "Legal Notice")}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <section>
                      <h5 className="text-white font-bold mb-2">{lang("1. Édition du site", "1. Site Edition")}</h5>
                      <p>{lang("Le présent site est édité par : Eucher ABATTI, entrepreneur individuel.", "This site is edited by: Eucher ABATTI, individual entrepreneur.")}</p>
                      <p>{lang("Domicilié à Porto-Novo, Bénin.", "Located in Porto-Novo, Benin.")}</p>
                      <p>{lang("Email : abattieucher@gmail.com", "Email: abattieucher@gmail.com")}</p>
                      <p>{lang("Téléphone : +229 0157002427", "Phone: +229 0157002427")}</p>
                    </section>
                    <section>
                      <h5 className="text-white font-bold mb-2">{lang("2. Hébergement", "2. Hosting")}</h5>
                      <p>{lang("Le site est hébergé par Netlify Inc., situé à San Francisco, Californie, USA.", "The site is hosted by Netlify Inc., located in San Francisco, California, USA.")}</p>
                    </section>
                    <section>
                      <h5 className="text-white font-bold mb-2">{lang("3. Propriété intellectuelle", "3. Intellectual Property")}</h5>
                      <p>{lang("L'ensemble de ce site (structure, textes, logos, images) relève de la législation sur le droit d'auteur. Toute reproduction totale ou partielle est interdite sans autorisation.", "This entire site (structure, texts, logos, images) is subject to copyright law. Total or partial reproduction is prohibited without authorization.")}</p>
                    </section>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Politique de Confidentialité Dialog */}
              <Dialog>
                <DialogTrigger className="flex items-center gap-2 text-sm text-slate-400 hover:text-brand-accent transition-colors w-fit">
                  <ShieldCheck className="w-4 h-4" />
                  {lang("Politique de confidentialité", "Privacy Policy")}
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-slate-900 border-white/10 text-slate-300 max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white mb-4">
                      {lang("Politique de Confidentialité", "Privacy Policy")}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <section>
                      <h5 className="text-white font-bold mb-2">{lang("1. Collecte des données", "1. Data Collection")}</h5>
                      <p>{lang("Les seules données personnelles collectées via ce site sont celles envoyées volontairement par l'utilisateur via le formulaire de contact (nom, email).", "The only personal data collected via this site are those voluntarily sent by the user via the contact form (name, email).")}</p>
                    </section>
                    <section>
                      <h5 className="text-white font-bold mb-2">{lang("2. Utilisation des données", "2. Use of Data")}</h5>
                      <p>{lang("Ces données sont utilisées uniquement pour répondre à vos demandes professionnelles. Elles ne sont jamais vendues ni transmises à des tiers.", "This data is used solely to respond to your professional requests. It is never sold or transmitted to third parties.")}</p>
                    </section>
                    <section>
                      <h5 className="text-white font-bold mb-2">{lang("3. Vos droits", "3. Your Rights")}</h5>
                      <p>{lang("Conformément à la réglementation relative à la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles sur simple demande par email.", "In accordance with data protection regulations, you have a right of access, rectification, and deletion of your personal data upon request by email.")}</p>
                    </section>
                    <section>
                      <h5 className="text-white font-bold mb-2">{lang("4. Cookies", "4. Cookies")}</h5>
                      <p>{lang("Ce site est conçu pour être respectueux de la vie privée et n'utilise pas de cookies publicitaires ou de traçage intrusif.", "This site is designed to be respectfull of privacy and does not use advertising or intrusive tracking cookies.")}</p>
                    </section>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Column 3: Tech Status */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">{lang("État du Système", "System Status")}</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
              <div className="w-3 h-3 bg-brand-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <div>
                <p className="text-xs font-mono text-white leading-none uppercase">Deploy: Online</p>
                <p className="text-[10px] text-slate-500 mt-1 font-mono">v1.2.4-stable | {language}:selected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-mono">
            © {currentYear} <span className="text-slate-400">Eucher ABATTI</span>. {lang("Tous droits réservés.", "All rights reserved.")}
          </p>
          <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono uppercase tracking-[0.2em]">
            <span>Build with</span>
            <span className="text-brand-accent">React</span>
            <span>+</span>
            <span className="text-blue-400">Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

