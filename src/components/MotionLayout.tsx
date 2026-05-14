import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface MotionLayoutProps {
  children: React.ReactNode;
}

export const MotionLayout = ({ children }: MotionLayoutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-200, 200], [15, -15]),
    { stiffness: 120, damping: 30 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-200, 200], [-15, 15]),
    { stiffness: 120, damping: 30 }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1200px",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
};
