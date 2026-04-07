import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollAnimationProps {
    children: ReactNode;
    className?: string;
    animation?: "fade-up" | "fade-left" | "fade-right" | "scale-up";
    delay?: number;
    once?: boolean;
}

export function ScrollAnimation({
    children,
    className = "",
    animation = "fade-up",
    delay = 0,
    once = true
}: ScrollAnimationProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) {
                        observer.unobserve(entry.target);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -12% 0px"
            }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [once]);

    const getHiddenState = () => {
        switch (animation) {
            case "fade-up":
                return { opacity: 0, transform: "translate3d(0, 32px, 0) scale(0.99)", filter: "blur(6px)" };
            case "fade-left":
                return { opacity: 0, transform: "translate3d(-28px, 0, 0) scale(0.99)", filter: "blur(6px)" };
            case "fade-right":
                return { opacity: 0, transform: "translate3d(28px, 0, 0) scale(0.99)", filter: "blur(6px)" };
            case "scale-up":
                return { opacity: 0, transform: "translate3d(0, 20px, 0) scale(0.94)", filter: "blur(6px)" };
            default:
                return { opacity: 0, transform: "translate3d(0, 32px, 0) scale(0.99)", filter: "blur(6px)" };
        }
    };

    const visibleState = {
        opacity: 1,
        transform: "translate3d(0, 0, 0) scale(1)",
        filter: "blur(0px)",
    };

    return (
        <div
            ref={ref}
            className={`will-change-transform ${className}`}
            style={{
                ...(isVisible ? visibleState : getHiddenState()),
                transitionProperty: "opacity, transform, filter",
                transitionDuration: "760ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: `${delay}ms`,
            }}
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
        const node = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (node) {
            observer.observe(node);
        }

        return () => {
            if (node) {
                observer.unobserve(node);
            }
        };
    }, [threshold]);

    return { ref, isVisible };
}
