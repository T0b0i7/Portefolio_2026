import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "FR" | "EN";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    lang: (fr: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("FR");

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "FR" ? "EN" : "FR"));
    };

    const lang = (fr: string, en: string) => {
        return language === "FR" ? fr : en;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, lang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
