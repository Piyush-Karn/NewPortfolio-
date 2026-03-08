import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

type TransitionEffect = "slide-right" | "slide-left" | "flip-up" | "flip-left" | "zoom-rotate" | "curtain" | "swing" | "spiral";

interface SectionWrapperProps {
  children: ReactNode;
  effect: TransitionEffect;
  parallaxIntensity?: number; // 0-1, default 0.3
}

const SectionWrapper = ({ children, effect, parallaxIntensity = 0.3 }: SectionWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax depth layers
  const bgY = useTransform(scrollYProgress, [0, 1], [`${parallaxIntensity * 100}px`, `-${parallaxIntensity * 100}px`]);
  const fgY = useTransform(scrollYProgress, [0, 1], [`${parallaxIntensity * 50}px`, `-${parallaxIntensity * 50}px`]);

  // Progress from 0 (fully out below) to 1 (entered viewport)
  const entryProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const exitProgress = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  // Shared transforms
  const opacity = useTransform(entryProgress, [0, 1], [0, 1]);
  const exitOpacity = useTransform(exitProgress, [0, 1], [0.3, 1]);

  const getTransforms = () => {
    switch (effect) {
      case "slide-right":
        return {
          x: useTransform(entryProgress, [0, 1], [300, 0]),
          rotateY: useTransform(entryProgress, [0, 1], [8, 0]),
          scale: useTransform(entryProgress, [0, 1], [0.9, 1]),
        };
      case "slide-left":
        return {
          x: useTransform(entryProgress, [0, 1], [-300, 0]),
          rotateY: useTransform(entryProgress, [0, 1], [-8, 0]),
          scale: useTransform(entryProgress, [0, 1], [0.9, 1]),
        };
      case "flip-up":
        return {
          rotateX: useTransform(entryProgress, [0, 1], [45, 0]),
          y: useTransform(entryProgress, [0, 1], [120, 0]),
          scale: useTransform(entryProgress, [0, 1], [0.85, 1]),
        };
      case "flip-left":
        return {
          rotateY: useTransform(entryProgress, [0, 1], [-35, 0]),
          x: useTransform(entryProgress, [0, 1], [-100, 0]),
          scale: useTransform(entryProgress, [0, 1], [0.88, 1]),
        };
      case "zoom-rotate":
        return {
          scale: useTransform(entryProgress, [0, 1], [0.5, 1]),
          rotate: useTransform(entryProgress, [0, 1], [-8, 0]),
        };
      case "curtain":
        return {
          scaleY: useTransform(entryProgress, [0, 1], [0, 1]),
          y: useTransform(entryProgress, [0, 1], [80, 0]),
        };
      case "swing":
        return {
          rotateZ: useTransform(entryProgress, [0, 1], [6, 0]),
          x: useTransform(entryProgress, [0, 1], [150, 0]),
          scale: useTransform(entryProgress, [0, 1], [0.92, 1]),
        };
      case "spiral":
        return {
          rotate: useTransform(entryProgress, [0, 1], [15, 0]),
          scale: useTransform(entryProgress, [0, 1], [0.6, 1]),
          y: useTransform(entryProgress, [0, 1], [100, 0]),
        };
      default:
        return {};
    }
  };

  const transforms = getTransforms();

  return (
    <div ref={ref} className="relative" style={{ perspective: "1200px" }}>
      {/* Parallax background depth layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ y: bgY }}
      >
        <div className="absolute -inset-20 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 70% 80%, hsl(var(--accent) / 0.1) 0%, transparent 50%)`,
        }} />
      </motion.div>

      {/* Mid-depth parallax layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ y: fgY }}
      >
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(45deg, hsl(var(--primary) / 0.05) 25%, transparent 25%),
            linear-gradient(-45deg, hsl(var(--accent) / 0.05) 25%, transparent 25%)
          `,
          backgroundSize: "60px 60px",
        }} />
      </motion.div>

      {/* Content layer with entrance animation */}
      <motion.div
        className="relative z-10"
        style={{
          opacity,
          ...transforms,
          transformOrigin: effect === "curtain" ? "top center" : 
                          effect === "swing" ? "top left" : "center center",
        }}
      >
        <motion.div style={{ opacity: exitOpacity }}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper;
