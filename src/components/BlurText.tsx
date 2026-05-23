import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function BlurText({ text, className, style }: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.1em', ...style }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial={false}
          animate={
            isVisible
              ? {
                  filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                }
              : { filter: 'blur(10px)', opacity: 0, y: 50 }
          }
          transition={{
            duration: 0.7,
            delay: (i * 100) / 1000,
            times: [0, 0.5, 1],
            ease: 'easeOut',
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
