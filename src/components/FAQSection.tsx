import { HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export function FAQSection() {
  const { lang } = useLanguage();

  const faqs = [
    {
      question: lang("Quels services propose TobiDev ?", "What services does TobiDev offer?"),
      answer: lang(
        "Je propose le developpement web/mobile, le design UI/UX, le copywriting, les scripts video, le conseil IA et la creation d images/videos optimisees avec l IA.",
        "I provide web/mobile development, UI/UX design, copywriting, video scripts, AI consulting, and AI-optimized image/video creation."
      ),
    },
    {
      question: lang("Peux-tu gerer un projet complet de A a Z ?", "Can you handle a full project end-to-end?"),
      answer: lang(
        "Oui. Je peux couvrir la strategie, la conception, la production, le deploiement et l optimisation continue.",
        "Yes. I can cover strategy, design, production, deployment, and ongoing optimization."
      ),
    },
    {
      question: lang("Travailles-tu avec des entreprises et des particuliers ?", "Do you work with businesses and individuals?"),
      answer: lang(
        "Oui, j accompagne aussi bien les entrepreneurs, les PME que les equipes internes sur des missions ponctuelles ou long terme.",
        "Yes, I support entrepreneurs, SMEs, and internal teams for both short-term and long-term missions."
      ),
    },
    {
      question: lang("Quel est ton delai moyen de reponse ?", "What is your typical response time?"),
      answer: lang(
        "En general, je reponds sous 24h avec un cadrage initial et une proposition de plan d action.",
        "Usually within 24h, with an initial scope and a proposed action plan."
      ),
    },
  ];

  return (
    <section id="faq" className="bg-slate-950 py-12 sm:py-14 md:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <ScrollAnimation>
          <div className="mb-8 text-center sm:mb-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-accent/25 bg-brand-accent/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-accent">
              <HelpCircle className="h-3.5 w-3.5" />
              FAQ
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              {lang("Questions frequentes", "Frequently Asked Questions")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
              {lang(
                "Tout ce qu il faut savoir avant de lancer votre projet avec TobiDev.",
                "Everything you need to know before starting your project with TobiDev."
              )}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={120}>
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur sm:p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-sm font-semibold text-white hover:no-underline sm:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-slate-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
