import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Facebook, ArrowRight, Mail, Phone, MapPin, HelpCircle, Brain, Terminal, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export function EnigmaSection() {
    const { lang } = useLanguage();
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState<"pnp" | "ia" | "triangle">("triangle");
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 60; // 60 degree range
        const y = ((e.clientY - top) / height - 0.5) * -60;
        setRotation({ x: y, y: x });
    };

    const resetRotation = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <section
            id="enigme"
            className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center bg-slate-950 border-t border-white/5"
        >
            {/* Deep Space Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 60 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full opacity-10 animate-pulse"
                        style={{
                            width: Math.random() * 2 + 'px',
                            height: Math.random() * 2 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDuration: Math.random() * 5 + 3 + 's',
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Content */}
                <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8">
                        <ShieldAlert className="w-3 h-3 animate-pulse" />
                        <span className="tracking-widest uppercase">{lang("Mystery Level: Critical", "Mystery Level: Critical")}</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-8 tracking-tighter text-white uppercase">
                        {lang("Le Mystère de", "The Mystery of")} <br />
                        <span className="text-blue-500">{lang("l'Architecture", "Architecture")}</span>
                    </h1>

                    <div className="flex flex-wrap gap-2 mb-8">
                        <button onClick={() => setActiveTab("triangle")} className={cn("px-4 py-2 rounded-lg text-xs font-bold border transition-all uppercase tracking-widest", activeTab === "triangle" ? "bg-blue-600 border-blue-400 text-white" : "bg-white/5 border-white/10 text-slate-500")}>
                            {lang("Le Triangle Pur", "The Pure Triangle")}
                        </button>
                        <button onClick={() => setActiveTab("pnp")} className={cn("px-4 py-2 rounded-lg text-xs font-bold border transition-all uppercase tracking-widest", activeTab === "pnp" ? "bg-blue-600 border-blue-400 text-white" : "bg-white/5 border-white/10 text-slate-500")}>
                            {lang("P vs NP", "P vs NP")}
                        </button>
                        <button onClick={() => setActiveTab("ia")} className={cn("px-4 py-2 rounded-lg text-xs font-bold border transition-all uppercase tracking-widest", activeTab === "ia" ? "bg-blue-600 border-blue-400 text-white" : "bg-white/5 border-white/10 text-slate-500")}>
                            {lang("IA & Boîte Noire", "AI & Black Box")}
                        </button>
                    </div>

                    <div className="relative min-h-[250px] text-slate-300">
                        {activeTab === "triangle" && (
                            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                                <p className="text-lg mb-4 italic">
                                    {lang(
                                        "\"Le triangle est la structure la plus stable et la plus mystérieuse de l'univers digital. Il représente la hiérarchie de l'intelligence.\"",
                                        "\"The triangle is the most stable and mysterious structure in the digital universe. It represents the hierarchy of intelligence.\""
                                    )}
                                </p>
                                <p className="text-sm text-slate-500">
                                    {lang(
                                        "Survolez et tournez la structure à droite pour explorer ses dimensions.",
                                        "Hover and rotate the structure on the right to explore its dimensions."
                                    )}
                                </p>
                            </div>
                        )}
                        {activeTab === "pnp" && (
                            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                                <p className="text-lg mb-4">
                                    {lang("La Question :", "The Question:")} <span className="text-white font-bold italic">
                                        {lang(
                                            "Est-ce que tout ce qui est facile à vérifier est forcément facile à résoudre ?",
                                            "Is everything that is easy to check necessarily easy to solve?"
                                        )}
                                    </span>
                                </p>
                                <p className="text-sm text-slate-400">
                                    {lang(
                                        "Si P = NP, alors tous les secrets du monde pourraient être cassés instantanément. Le triangle représente cette frontière invisible.",
                                        "If P = NP, then all the world's secrets could be broken instantly. The triangle represents this invisible boundary."
                                    )}
                                </p>
                            </div>
                        )}
                        {activeTab === "ia" && (
                            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                                <p className="text-lg mb-4">
                                    {lang("L'Interprétabilité :", "Interpretability:")} <span className="text-white font-bold italic">
                                        {lang("Le Problème de la Boîte Noire.", "The Black Box Problem.")}
                                    </span>
                                </p>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <p className="text-sm">
                                        {lang(
                                            "Nous créons des IA qui fonctionnent bien, mais nous sommes incapables de lire la \"pensée\" exacte qui circule entre les neurones.",
                                            "We create AIs that work well, but we are unable to read the exact \"thought\" circulating between neurons."
                                        )}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Content - Interactive 3D Enigma */}
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={resetRotation}
                    className="relative flex justify-center items-center h-[500px] cursor-grab active:cursor-grabbing"
                >
                    <div
                        className="cube-container transition-transform duration-200 ease-out"
                        style={{
                            transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <div className="cube interactive-cube">
                            {/* Logic Cube Faces */}
                            {["front", "back", "right", "left", "top", "bottom"].map((face) => (
                                <div key={face} className={cn("cube-face border-blue-500/40 opacity-40", `face-${face}`)}>
                                    <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-[4px] border border-white/10" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-full h-full border border-blue-400/20 m-4 rounded-sm flex items-center justify-center overflow-hidden">
                                            <div className="text-[14px] font-mono text-blue-300/20 select-none uppercase">
                                                {face} MATRIX
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* The Inner Triangle (Pyramid) */}
                            <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
                                <div className="pyramid-container scale-150">
                                    <div className="pyramid-face p-face-1 border-b-blue-500/90" />
                                    <div className="pyramid-face p-face-2 border-b-blue-600/90" />
                                    <div className="pyramid-face p-face-3 border-b-blue-400/90" />
                                    <div className="pyramid-face p-face-4 border-b-blue-700/60" />
                                </div>
                            </div>

                            {/* The Central Suspension Node */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="suspended-question text-white drop-shadow-[0_0_30px_#3b82f6] text-9xl">?</div>
                            </div>
                        </div>
                    </div>

                    {/* Subtle instructions */}
                    <div className="absolute bottom-4 text-slate-600 text-[10px] uppercase tracking-widest animate-pulse">
                        {lang("Tournez pour découvrir", "Rotate to discover")}
                    </div>
                </div>
            </div>
        </section>
    );
}

