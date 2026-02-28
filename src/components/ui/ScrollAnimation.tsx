import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollAnimationProps {
    children: ReactNode;
    className?: string;
    animation?: "fade-up" | "fade-left" | "fade-right" | "scale-up";
    delay?: number;
}

export function ScrollAnimation({
    children,
    className = "",
    animation = "fade-up",
    delay = 0
}: ScrollAnimationProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [delay]);

    const getAnimationClass = () => {
        if (!isVisible) {
            switch (animation) {
                case "fade-up":
                    return "opacity-0 translate-y-10";
                case "fade-left":
                    return "opacity-0 -translate-x-10";
                case "fade-right":
                    return "opacity-0 translate-x-10";
                case "scale-up":
                    return "opacity-0 scale-95";
                default:
                    return "opacity-0 translate-y-10";
            }
        }
        return "opacity-100 translate-y-0 translate-x-0 scale-100";
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}
        >
            {children}
        </div>
    );
}

// Hook pour l'animation au défilement
export function useScrollAnimation(threshold = 0.1) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return { ref, isVisible };
}
