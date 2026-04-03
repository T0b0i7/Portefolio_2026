import { Project } from "@/types/project";

export const getProjects = (lang: (fr: string, en: string) => string): Project[] => [
    {
        id: 14,
        title: "AfriEnhance AI",
        category: "Full-Stack",
        description: lang(
            "AfriEnhance AI est une plateforme de retouche d'image haute performance propulsée par l'intelligence artificielle (Gemini 2.5 Flash). Conçue avec une esthétique 'Bento Grid' moderne et technique, l'application vise à offrir des outils de restauration et de génération d'images de niveau professionnel avec une simplicité d'utilisation extrême.\n\n✨ Fonctionnalités Clés\n• Moteur IA Multimodal : Utilise les derniers modèles de vision pour analyser et transformer les images.\n• 4 Modes de Traitement Spécialisés :\n  - Restauration : Réduction du bruit (DnCNN) et mise à l'échelle (Upscaling).\n  - Génération : Remplissage génératif et extension d'image via des prompts textuels.\n  - Portrait : Retouche cutanée intelligente et mise en valeur des traits du visage.\n  - Document : Optimisation de la lisibilité et suppression des ombres pour les scans.\n• Contrôles Avancés : Ajustements précis de la luminosité, du contraste, de la netteté, et correction colorimétrique.\n• Système de Filigrane : Ajout de texte personnalisé avec choix de police pour protéger les créations.\n• Historique Local : Accès rapide aux 5 dernières versions traitées.\n\n🛠️ Architecture Technique\n• Frontend : React 18 avec TypeScript pour une robustesse maximale.\n• Design & Styles : Tailwind CSS pour une interface fluide et responsive, avec des animations sophistiquées via Motion.\n• Intégration IA : SDK @google/genai pour les appels directs au modèle gemini-2.5-flash-image.\n• Performance : Architecture SPA (Single Page Application) optimisée avec Vite, incluant un support PWA pour une installation sur mobile.\n\n🎨 Expérience Utilisateur (UX)\n• Interface Bento : Un design segmenté et élégant qui organise les fonctionnalités de manière intuitive.\n• Éditeur Dashboard : Une vue comparative 'Avant/Après' avec des indicateurs de statut en temps réel (ENGINE_V2_ACTIVE, 4K_READY).\n• Workflow Fluide : Système de glisser-déposer (Drag & Drop) et fonctions de réinitialisation (Reset) rapides pour itérer sans friction.\n• Feedback Visuel : Effets de particules (confettis) lors des succès et barres de progression animées.\n\nEn résumé, c'est un outil 'All-in-One' qui combine la puissance brute de l'IA générative avec une interface utilisateur digne des meilleurs logiciels de design actuels.",
            "AfriEnhance AI is a high-performance image editing platform powered by artificial intelligence (Gemini 2.5 Flash). Designed with a modern and technical 'Bento Grid' aesthetic, the application aims to offer professional-level image restoration and generation tools with extreme ease of use.\n\n✨ Key Features\n• Multimodal AI Engine: Uses the latest vision models to analyze and transform images.\n• 4 Specialized Processing Modes:\n  - Restoration: Noise reduction (DnCNN) and upscaling.\n  - Generation: Generative fill and image extension via text prompts.\n  - Portrait: Intelligent skin retouching and facial feature enhancement.\n  - Document: Readability optimization and shadow removal for scans.\n• Advanced Controls: Precise adjustments of brightness, contrast, sharpness, and color correction.\n• Watermark System: Custom text addition with font choice to protect creations.\n• Local History: Quick access to the last 5 processed versions.\n\n🛠️ Technical Architecture\n• Frontend: React 18 with TypeScript for maximum robustness.\n• Design & Styles: Tailwind CSS for smooth and responsive interface, with sophisticated animations via Motion.\n• AI Integration: @google/genai SDK for direct calls to the gemini-2.5-flash-image model.\n• Performance: SPA (Single Page Application) architecture optimized with Vite, including PWA support for mobile installation.\n\n🎨 User Experience (UX)\n• Bento Interface: A segmented and elegant design that organizes features intuitively.\n• Dashboard Editor: A comparative 'Before/After' view with real-time status indicators (ENGINE_V2_ACTIVE, 4K_READY).\n• Fluid Workflow: Drag & Drop system and quick Reset functions to iterate without friction.\n• Visual Feedback: Particle effects (confetti) on successes and animated progress bars.\n\nIn summary, it's an 'All-in-One' tool that combines the raw power of generative AI with a user interface worthy of the best current design software."
        ),
        tags: ["React", "TypeScript", "Tailwind CSS", "Gemini AI", "Vite", "PWA", "Motion"],
        metrics: { impact: lang("IA Générative", "Generative AI"), type: lang("Outil Créatif", "Creative Tool") },
        color: "primary",
        status: lang("Terminé", "Completed"),
        images: [
            "/design/AfriEnhance AI/AfriEnhance AI_1.PNG",
            "/design/AfriEnhance AI/AfriEnhance AI_2.PNG",
        ],
        featured: true,
        ai_model: "Gemini 2.5 Flash",
        automation_benefit: lang("Retouche d'image automatisée", "Automated image editing"),
    },
    {
        id: 1,
        title: lang("Système d'Automatisation SIAB", "SIAB Automation System"),
        category: "Automatisation",
        description: lang(
            "Informations confidentielles — pour en savoir plus, veuillez contacter la référence : Chef service Informatique, Mr EPIPHANE KOUTANGNI, +229 01 97 27 90 33.",
            "Confidential information — for more details, please contact: IT Service Manager, Mr. EPIPHANE KOUTANGNI, +229 01 97 27 90 33."
        ),
        tags: ["HTML", "Node.js", "SQL Server", lang("Automatisation", "Automation"), "CSS", "PHP"],
        metrics: { impact: lang("-30% temps", "-30% time"), type: lang("Productivité", "Productivity") },
        color: "primary",
        image: "/design/siab.png",
        locked: true,
        featured: true,
        ai_model: "Logiciel d'automatisation (Node.js)",
        automation_benefit: lang("Optimisation des flux ferroviaires", "Railway flow optimization"),
    },
    {
        id: 2,
        title: lang("Applications Internes INNOVTECH", "INNOVTECH Internal Apps"),
        category: "Full-Stack",
        description: lang(
            "Plateforme complète pour la gestion interne des processus métier, avec tableaux de bord interactifs et automatisation des tâches répétitives.",
            "Complete platform for internal business process management, with interactive dashboards and automation of repetitive tasks."
        ),
        tags: ["React", "Node.js", "MySQL", "Express", "TypeScript"],
        metrics: { impact: lang("+45% efficacité", "+45% efficiency"), type: lang("Entreprise", "Enterprise") },
        color: "secondary",
        status: lang("Terminé", "Completed"),
        image: "/design/gestiloc.PNG",
    },
    {
        id: 3,
        title: lang("Design Graphique DK", "DK Graphic Design"),
        category: "Design Graphique",
        description: lang(
            "Réalisation d'affiches, logos et supports visuels pour la communication digitale de diverses organisations.",
            "Creation of posters, logos and visual supports for digital communication for various organizations."
        ),
        tags: ["Figma", "Canva", "Branding", "Print"],
        metrics: { impact: lang("Multiple", "Multiple"), type: lang("Créatif", "Creative") },
        color: "warning",
        images: [
            "/design/DK (7).png",
            "/design/DK (6).png",
            "/design/DK (5).png",
            "/design/DK (4).png",
            "/design/DK (3).png",
            "/design/DK (2).png",
        ],
        design_aspect_ratio: "square",
        subcategory: lang("Branding & Logo", "Branding & Logo"),
    },
    {
        id: 4,
        title: lang("Plateforme E-commerce Haute Performance", "High Performance E-commerce Platform"),
        category: "Prototypage",
        description: lang(
            "Développement d'une plateforme e-commerce moderne avec paiement intégré et gestion d'inventaire en temps réel.",
            "Development of a modern e-commerce platform with integrated payment and real-time inventory management."
        ),
        tags: ["Next.js", "Stripe", "MongoDB", "Vercel"],
        metrics: { impact: "+100k users", type: "Startup" },
        color: "primary",
        status: lang("En cours", "In Progress"),
        images: [
            "/design/Luxe.PNG",
            "/design/Luxe1.PNG",
        ],
        subcategory: "E-commerce UI",
    },
    {
        id: 5,
        title: "Afrimemorie",
        category: "Web Design",
        description: lang(
            "La mémoire de nos noms, la voix de nos peuples. Plateforme dédiée à la préservation et à la transmission de l'héritage culturel africain.",
            "The memory of our names, the voice of our peoples. Platform dedicated to the preservation and transmission of African cultural heritage."
        ),
        tags: ["React", "Node.js", "MongoDB"],
        metrics: { impact: lang("Conservation culturelle", "Cultural preservation"), type: lang("Société", "Society") },
        color: "accent",
        image: "/design/Afrimemorie.PNG",
        url: "https://afri-memory.netlify.app/",
    },
    {
        id: 6,
        title: lang("Toile d'Hiver", "Winter Canvas"),
        category: "Landing Pages",
        description: lang(
            "Application web festive offrant une aventure personnalisée de Noël : entrez votre nom pour découvrir un voyage poétique.",
            "Festive web application offering a personalized Christmas adventure: enter your name to discover a poetic journey."
        ),
        tags: ["HTML", "CSS", "JavaScript"],
        metrics: { impact: lang("Expérience festive", "Festive experience"), type: lang("Loisir", "Leisure") },
        color: "primary",
        image: "/design/AnimNoel.jpg",
        url: "https://merry-chritmas.netlify.app/",
    },
    {
        id: 7,
        title: lang("UNO – Jeu de cartes", "UNO – Card Game"),
        category: "Gaming",
        description: lang(
            "Une version numérique du célèbre jeu de cartes UNO en 1v1 contre l'ordinateur.",
            "A digital version of the famous UNO card game in 1v1 against the computer."
        ),
        tags: ["HTML", "CSS", "JavaScript"],
        metrics: { impact: lang("Divertissement", "Entertainment"), type: lang("Jeu", "Game") },
        color: "secondary",
        image: "/design/uno.JPG",
        url: "https://unog-ame.netlify.app/",
    },
    {
        id: 8,
        title: "Portfolio 3D - Victoria Ahouéfa Camillia",
        category: "Portfolio",
        description: lang(
            "Portfolio 3D interactif pour une développeuse Full-stack spécialisée en IA, Cybersécurité et IoT.",
            "Interactive 3D portfolio for a Full-stack developer specialized in AI, Cybersecurity and IoT."
        ),
        tags: ["React", "CSS", "JavaScript", "HTML", "Three.js", "WebGL"],
        metrics: { impact: lang("Excellence technique", "Technical excellence"), type: "Portfolio 3D" },
        color: "primary",
        status: lang("Publié", "Published"),
        image: "/design/Portefolio_Victoria Ahouéfa Camillia.png",
        url: "https://portfoliovictoire.netlify.app/",
    },
    {
        id: 9,
        title: "Vigilance BJ",
        category: "Full-Stack",
        description: lang(
            "Plateforme citoyenne pour signaler anonymement arnaques, harcèlement et hameçonnage au Bénin.",
            "Citizen platform to anonymously report scams, harassment and phishing in Benin."
        ),
        tags: ["TypeScript", "Supabase", "HTML", "CSS"],
        metrics: { impact: lang("Sécurité civique", "Civic security"), type: "Civic Tech" },
        color: "primary",
        image: "/design/vigilancebj.jpg",
        url: "https://vigilance-bj.netlify.app/",
        ai_model: "Gemini API (Classification)",
        automation_benefit: lang("Modération automatique", "Automated moderation"),
    },
    {
        id: 10,
        title: lang("Portefeuille InnovTech", "InnovTech Portfolio"),
        category: "Prototypage",
        description: lang(
            "Vitrine numérique d'InnovTech SAS : développement web & mobile, UI/UX, conseil digital et maintenance IT.",
            "Digital showcase for InnovTech SAS: web & mobile development, UI/UX, digital consulting and IT maintenance."
        ),
        tags: ["React", "TypeScript", "Tailwind CSS"],
        metrics: { impact: lang("Agence", "Agency"), type: lang("Portefeuille", "Portfolio") },
        color: "accent",
        image: "/design/Pinnovetech.PNG",
        url: "https://innovtechportefolio01.netlify.app/",
        subcategory: "Web UI/UX",
    },
    {
        id: 11,
        title: "Emotilist",
        category: "Web Design",
        description: lang(
            "Application ToDoList interactive et festive : thèmes personnalisables, animations saisonnières.",
            "Interactive and festive ToDoList application: customizable themes, seasonal animations."
        ),
        tags: ["JavaScript", "HTML", "CSS"],
        metrics: { impact: lang("Productivité ludique", "Playful productivity"), type: "App" },
        color: "secondary",
        image: "/design/emotilist.PNG",
        url: "https://emotilist.netlify.app/",
    },
    {
        id: 13,
        title: "Communio",
        category: "Full-Stack",
        description: lang(
            "Application web et mobile pour la communauté chrétienne : géolocalisation des paroisses, Bible interactive.",
            "Web and mobile application for the Christian community: geolocation of parishes, interactive Bible."
        ),
        tags: ["TypeScript", "React Native", "Node.js"],
        metrics: { impact: lang("Communauté", "Community"), type: "Social" },
        color: "primary",
        image: "/design/communio.PNG",
        url: "https://communio-christian.netlify.app/",
        status: lang("En cours", "In Progress"),
    },
    {
        id: 14,
        title: "CREACOM",
        category: "Design Graphique",
        description: lang(
            "Portefolio professionnel CREACOM : vitrine digitale présentant les créations en communication visuelle.",
            "CREACOM professional portfolio: digital showcase presenting visual communication creations."
        ),
        tags: ["React", "TypeScript", "Tailwind CSS", "Design"],
        metrics: { impact: lang("Portefolio", "Portfolio"), type: lang("Professionnel", "Professional") },
        color: "accent",
        image: "/design/CREACOM.PNG",
        url: "https://grace-branco-portfolio.netlify.app/",
        subcategory: lang("Branding", "Branding"),
    },
    {
        id: 15,
        title: lang("Fête d'anniversaire de Peace Bloodness", "Peace Bloodness Birthday Party"),
        category: "Anniversaire",
        description: lang(
            "Une application web interactive et émotionnelle créée pour célébrer l'anniversaire de Peace Bloodness.",
            "An interactive and emotional web application created to celebrate Peace Bloodness's birthday."
        ),
        tags: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
        metrics: { impact: lang("Célébration interactive", "Interactive celebration"), type: lang("Anniversaire", "Birthday") },
        color: "primary",
        status: lang("Publié", "Published"),
        image: "/design/Fête d'anniversaire de Peace Bloodness.png",
        url: "https://peace-bloodnesshbd.netlify.app/",
    },
    {
        id: 16,
        title: lang("Site d'anniversaire pour Précieuse Empire", "Birthday Site for Precious Empire"),
        category: "Anniversaire",
        description: lang(
            "Ce site a été créé avec amour pour célébrer l'anniversaire de Précieuse.",
            "This site was created with love to celebrate Precious's birthday."
        ),
        tags: ["HTML", "CSS", "JavaScript"],
        metrics: { impact: lang("Expérience émotionnelle", "Emotional experience"), type: lang("Anniversaire", "Birthday") },
        color: "secondary",
        status: lang("Publié", "Published"),
        image: "/design/Site d'anniversaire pour Précieuse Empire .jpg",
        url: "https://precious-empire-hbd.netlify.app/",
    },
    {
        id: 17,
        title: lang("Joyeux Anniversaire Ursule", "Happy Birthday Ursule"),
        category: "Anniversaire",
        description: lang(
            "Une expérience web immersive et émotionnelle créée spécialement pour célébrer Ursule OWOLABI.",
            "An immersive and emotional web experience created specifically to celebrate Ursule OWOLABI."
        ),
        tags: ["React", "JavaScript", "CSS"],
        metrics: { impact: lang("Célébration personnalisée", "Personalized celebration"), type: lang("Anniversaire", "Birthday") },
        color: "primary",
        status: lang("Publié", "Published"),
        image: "/design/Owolabi.png",
        url: "https://ursulesowolabi-hbd.netlify.app/",
    },
    {
        id: 18,
        title: lang("Twin Blessings - Site d'Anniversaire des Jumelles", "Twin Blessings - Twins' Birthday Site"),
        category: "Anniversaire",
        description: lang(
            "Bienvenue sur le site d'anniversaire céleste pour les jumelles Lawani - Rahimath et Ramanath.",
            "Welcome to the celestial birthday site for the Lawani twins - Rahimath and Ramanath."
        ),
        tags: ["React", "JavaScript", "CSS", "HTML"],
        metrics: { impact: lang("Célébration spirituelle", "Spiritual celebration"), type: lang("Anniversaire", "Birthday") },
        color: "primary",
        status: lang("Publié", "Published"),
        image: "/design/Annif_jumelle3.png",
        url: "https://hbdjumelles-lawani.netlify.app/",
        design_aspect_ratio: "video",
    },
    {
        id: 19,
        title: lang("Huggy Love - Landing Page Saint-Valentin", "Huggy Love - Valentine's Day Landing Page"),
        category: "Landing Pages",
        description: lang(
            "Une landing page romantique et moderne pour offrir la peluche 'Étreinte Éternelle'.",
            "A romantic and modern landing page to offer the 'Eternal Embrace' plush."
        ),
        tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
        metrics: { impact: lang("Conversion émotionnelle", "Emotional conversion"), type: "E-commerce" },
        color: "primary",
        status: lang("Publié", "Published"),
        image: "/design/love1.png",
        url: "https://huggylove.netlify.app/",
    },
    {
        id: 20,
        title: "Savékari",
        category: "E-commerce",
        description: lang(
            "Fabriqués avec du pur beurre de karité béninois et des ingrédients naturels.",
            "Made with pure Beninese shea butter and natural ingredients."
        ),
        tags: ["HTML", "CSS", "JavaScript", "E-commerce"],
        metrics: { impact: lang("Produits naturels", "Natural products"), type: "E-commerce" },
        color: "primary",
        image: "/design/Savékari.PNG",
        url: "https://savekari.netlify.app/",
    },
    {
        id: 21,
        title: lang("Owofinance - Gestion Financière Mobile", "Owofinance - Mobile Financial Management"),
        category: "Mobile",
        description: lang(
            "Application mobile-first de gestion financière avec support multilingue et système de tontine.",
            "Mobile-first financial management application with multilingual support and tontine system."
        ),
        tags: ["React Native", "Node.js", "Supabase", lang("Multilingue", "Multilingual"), "Fintech"],
        metrics: { impact: lang("Finance inclusive", "Inclusive finance"), type: "Mobile App" },
        color: "primary",
        status: lang("Publié", "Published"),
        image: "/design/owo2.webp",
        url: "https://owofinance.netlify.app/",
    },
    {
        id: 22,
        title: "Portfolio.OS",
        category: "Prototypage",
        description: lang(
            "Portfolio.OS – Le Système d'Exploitation du Portfolio Authentique. Une plateforme next-gen permettant de voir 16 designs différents en temps réel pour une même expérience.",
            "Portfolio.OS – The Authentic Portfolio Operating System. A next-gen platform allowing to see 10 different designs in real-time for the same experience."
        ),
        tags: ["React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Vite", "IA"],
        metrics: { impact: lang("Innovation design", "Design innovation"), type: "Open Source" },
        color: "primary",
        status: lang("Terminé", "Completed"),
        url: "https://portefolio-os.netlify.app/",
        images: [
            "/design/P1.PNG",
            "/design/P2.PNG",
            "/design/P3.PNG",
            "/design/P4.PNG",
            "/design/P5.PNG",
            "/design/P6.PNG",
            "/design/P7.PNG",
            "/design/P8.PNG",
            "/design/P9.PNG",
            "/design/P10.PNG",
            "/design/P11.PNG",
        ],
        subcategory: "Design UI",
    },
    {
        id: 23,
        title: lang("Participation au challenge de création d’affiche – Concert “10 ans du Gang”", "Participation in the poster creation challenge – Concert “10 years of the Gang”"),
        category: "Design Graphique",
        description: lang(
            "Conception et réalisation de plusieurs affiches promotionnelles pour le concert anniversaire « 10 ans du Gang » de Vano Baby. Création de visuels destinés à la promotion sur les réseaux sociaux, en appliquant les principes de design graphique, typographie et communication visuelle.",
            "Design and creation of several promotional posters for the anniversary concert “10 years of the Gang” by Vano Baby. Creation of visuals intended for promotion on social networks, applying the principles of graphic design, typography and visual communication."
        ),
        tags: ["Figma", "Canva", "Affiche", "Promotion", "Concert"],
        metrics: { impact: lang("Challenge créatif", "Creative challenge"), type: lang("Design graphique", "Graphic design") },
        color: "warning",
        status: lang("Terminé", "Completed"),
        images: [
            "/design/Affiche 1.jpg",
            "/design/Affiche 2.jpg",
            "/design/Affiche 3 .jpg",
            "/design/Affiche 4.jpg",
            "/design/Affiche 5.jpg",
            "/design/Affiche 6.jpg",
            "/design/Affiche 7.jpg",
            "/design/Affiche 8.jpg",
            "/design/Affiche 9.jpg",
            "/design/Affiche 10.jpg",
            "/design/M (1).jpg",
            "/design/M (2).jpg",
            "/design/M (3).jpg",
            "/design/M (4).jpg",
            "/design/M (5).jpg",
        ],
        design_aspect_ratio: "portrait",
        subcategory: lang("Print & Affiches", "Print & Posters"),
    },
];
