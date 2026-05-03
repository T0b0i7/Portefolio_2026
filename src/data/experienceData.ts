import { Monitor, Palette, Code, Layers, Bot, Cpu } from "lucide-react";

export const getExperiences = (lang: (fr: string, en: string) => string) => [
    {
        id: 6,
        type: "work",
        title: lang("Expertise & Innovation en IA", "AI Expertise & Innovation"),
        company: lang("Expertise", "Expertise"),
        location: lang("Bénin (Remote)", "Benin (Remote)"),
        period: "2026",
        current: true,
        status: lang("Futur", "Future"),
        description: [
            lang(
                "Approfondissement des systèmes d’IA avancés, recherche et développement de solutions innovantes.",
                "Deepening of advanced AI systems, research and development of innovative solutions."
            ),
            lang(
                "Objectif : concevoir des technologies intelligentes performantes et à forte valeur ajoutée.",
                "Goal: to design high-performance intelligent technologies with high added value."
            )
        ],
        icon: Cpu,
        color: "primary",
    },
    {
        id: 5,
        type: "work",
        title: lang("Ingénieur en IA & Prompt Engineer", "AI Engineer & Prompt Engineer"),
        company: lang("Spécialisation", "Specialization"),
        location: lang("Bénin", "Benin"),
        period: "2025",
        current: true,
        status: lang("Actuel", "Current"),
        description: [
            lang(
                "Spécialisation en intelligence artificielle : création de chatbots, agents intelligents et assistants conversationnels.",
                "Specialization in artificial intelligence: creation of chatbots, intelligent agents, and conversational assistants."
            ),
            lang(
                "Maîtrise du prompt engineering pour optimiser les performances des modèles d’IA.",
                "Mastery of prompt engineering to optimize AI model performance."
            )
        ],
        icon: Bot,
        color: "accent",
    },
    {
        id: 4,
        type: "work",
        title: lang("Développeur Full-Stack (Indépendant)", "Full-Stack Developer (Freelance)"),
        company: lang("Indépendant", "Freelance"),
        location: lang("Bénin", "Benin"),
        period: "2024",
        current: false,
        status: lang("Réalisé", "Completed"),
        description: [
            lang(
                "Développement d’applications web complètes (frontend & backend), création d’API et conception de solutions digitales adaptées aux besoins de différents projets.",
                "Development of complete web applications (frontend & backend), API creation, and design of digital solutions adapted to the needs of different projects."
            )
        ],
        icon: Layers,
        color: "secondary",
    },
    {
        id: 3,
        type: "work",
        title: lang("Développeur Python (Autodidacte & Projets)", "Python Developer (Self-taught & Projects)"),
        company: lang("Autodidacte", "Self-taught"),
        location: lang("Apprentissage", "Learning"),
        period: "2023",
        current: false,
        description: [
            lang(
                "Apprentissage de la programmation avec Python : scripts, automatisation et bots.",
                "Learning programming with Python: scripts, automation, and bots."
            ),
            lang(
                "Renforcement des bases en logique, développement logiciel et résolution de problèmes.",
                "Strengthening foundations in logic, software development, and problem-solving."
            )
        ],
        icon: Code,
        color: "primary",
    },
    {
        id: 2,
        type: "work",
        title: lang("Graphiste (Freelance)", "Graphic Designer (Freelance)"),
        company: lang("Freelance", "Freelance"),
        location: lang("Digital Studio", "Digital Studio"),
        period: "2022",
        current: false,
        description: [
            lang(
                "Début dans la création visuelle : conception de logos, bannières et contenus graphiques.",
                "Start in visual creation: design of logos, banners, and graphic content."
            ),
            lang(
                "Utilisation d’outils modernes comme Canva, combinés à l’intelligence artificielle et au prompt engineering pour produire des visuels créatifs, rapides et efficaces.",
                "Use of modern tools like Canva, combined with artificial intelligence and prompt engineering to produce creative, fast, and efficient visuals."
            )
        ],
        icon: Palette,
        color: "secondary",
    },
    {
        id: 1,
        type: "education",
        title: lang("Microsoft Office (Initiation)", "Microsoft Office (Initiation)"),
        company: lang("Formation", "Training"),
        location: lang("Bénin", "Benin"),
        period: "2021",
        current: false,
        description: [
            lang(
                "Découverte du monde numérique à travers l’apprentissage des outils Microsoft Office. Cette étape pose les bases de l’utilisation des ordinateurs et développe une première aisance digitale.",
                "Discovery of the digital world through learning Microsoft Office tools. This step lays the foundations for computer use and develops initial digital fluency."
            )
        ],
        icon: Monitor,
        color: "accent",
    },
];
