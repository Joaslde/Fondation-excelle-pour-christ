import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

type AnimationType = "fade-up" | "fade-left" | "fade-right" | "scale" | "bounce";

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  threshold?: number;
}

const animations = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  bounce: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
  threshold = 0.1,
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView({ threshold, once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animations[animation]}
      transition={{
        duration: 0.6,
        delay,
        type: animation === "bounce" ? "spring" : "tween",
        stiffness: animation === "bounce" ? 260 : undefined,
        damping: animation === "bounce" ? 20 : undefined,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
