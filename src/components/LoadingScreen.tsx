import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("reveal");
          setTimeout(onComplete, 500);
          return 100;
        }
        // Accelerate progress — larger jumps
        return Math.min(100, prev + 2 + Math.floor(Math.random() * 2));
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  const marqueeText = "AI/ML ENGINEER  •  SOFTWARE DEVELOPER  •  DEEP LEARNING  •  COMPUTER VISION  •  ";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background noise-overlay"
        exit={{ 
          clipPath: "circle(0% at 50% 50%)",
        }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Ambient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[80px] opacity-20"
            style={{ background: "hsl(var(--primary))", top: "20%", left: "-10%" }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full blur-[60px] opacity-15"
            style={{ background: "hsl(var(--accent))", bottom: "10%", right: "-5%" }}
          />
        </div>

        {/* Top marquee row */}
        <div className="absolute w-[200vw] overflow-hidden" style={{ top: "35%" }}>
          <motion.div
            className="whitespace-nowrap flex"
            style={{ animation: "marquee 20s linear infinite" }}
          >
            <span
              className="text-[8vw] font-bold tracking-[-0.04em] text-foreground/[0.06]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {marqueeText.repeat(4)}
            </span>
            <span
              className="text-[8vw] font-bold tracking-[-0.04em] text-foreground/[0.06]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {marqueeText.repeat(4)}
            </span>
          </motion.div>
        </div>

        {/* Bottom marquee row */}
        <div className="absolute w-[200vw] overflow-hidden" style={{ top: "55%" }}>
          <motion.div
            className="whitespace-nowrap flex"
            style={{ animation: "marquee-reverse 25s linear infinite" }}
          >
            <span
              className="text-[8vw] font-bold tracking-[-0.04em] text-foreground/[0.06]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {marqueeText.repeat(4)}
            </span>
            <span
              className="text-[8vw] font-bold tracking-[-0.04em] text-foreground/[0.06]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {marqueeText.repeat(4)}
            </span>
          </motion.div>
        </div>

        {/* Center pill loader — inspired by reference */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          {/* Outer pill with gradient border */}
          <div className="relative px-12 py-5 rounded-full overflow-hidden" 
            style={{ background: "hsl(var(--card))" }}
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-full p-[2px]">
              <div className="absolute inset-0 rounded-full" style={{
                background: `conic-gradient(from ${progress * 3.6}deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))`,
                opacity: 0.6,
              }} />
              <div className="absolute inset-[2px] rounded-full bg-card" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center gap-8">
              <motion.span 
                className="text-sm font-medium tracking-[0.2em] text-foreground/60"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                LOADING
              </motion.span>
              <div className="w-[1px] h-5 bg-foreground/10" />
              <motion.span 
                className="text-sm font-bold tracking-wider text-gradient tabular-nums"
                style={{ fontFamily: "'JetBrains Mono', monospace", minWidth: "3ch" }}
              >
                {progress}%
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Welcome text that appears at 100% */}
        <AnimatePresence>
          {phase === "reveal" && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-[30%] text-sm tracking-[0.5em] uppercase text-primary font-medium"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Welcome
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
