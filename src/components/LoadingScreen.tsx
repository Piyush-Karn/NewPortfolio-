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
        return Math.min(100, prev + 2 + Math.floor(Math.random() * 2));
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  const marqueeText = "AI/ML ENGINEER • SOFTWARE DEVELOPER • DEEP LEARNING • COMPUTER VISION • ";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        exit={{
          clipPath: "circle(0% at 50% 50%)",
        }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Single subtle marquee behind the loader */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none">
          <div
            className="whitespace-nowrap"
            style={{ animation: "marquee 25s linear infinite", width: "max-content" }}
          >
            <span
              className="text-[5vw] font-bold tracking-[-0.02em] text-foreground/[0.03] inline-block"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {marqueeText}{marqueeText}{marqueeText}{marqueeText}
            </span>
          </div>
        </div>

        {/* Center pill loader */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <div
            className="relative px-12 py-5 rounded-full overflow-hidden"
            style={{ background: "hsl(var(--card))" }}
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-full">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from ${progress * 3.6}deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))`,
                  opacity: 0.6,
                }}
              />
              <div className="absolute inset-[2px] rounded-full bg-card" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center gap-8">
              <span
                className="text-sm font-medium tracking-[0.2em] text-foreground/60"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                LOADING
              </span>
              <div className="w-[1px] h-5 bg-foreground/10" />
              <span
                className="text-sm font-bold tracking-wider text-gradient tabular-nums"
                style={{ fontFamily: "'JetBrains Mono', monospace", minWidth: "3ch" }}
              >
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Welcome text at 100% */}
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
