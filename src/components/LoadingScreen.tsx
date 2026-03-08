import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  const marqueeText = "AI/ML ENGINEER • SOFTWARE DEVELOPER • DEEP LEARNING • COMPUTER VISION • ";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Marquee */}
        <div className="absolute top-1/3 w-full overflow-hidden opacity-10">
          <motion.div
            className="whitespace-nowrap text-6xl md:text-8xl font-bold tracking-tighter"
            animate={{ x: [0, -2000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {marqueeText.repeat(5)}
          </motion.div>
        </div>

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-8"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tighter"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-gradient">PK</span>
          </motion.h1>

          {/* Progress bar */}
          <div className="w-64 md:w-80">
            <div className="flex justify-between mb-2 text-xs text-muted-foreground font-mono">
              <span>LOADING</span>
              <span>{progress}%</span>
            </div>
            <div className="h-[2px] w-full bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))`,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom marquee */}
        <div className="absolute bottom-1/3 w-full overflow-hidden opacity-10">
          <motion.div
            className="whitespace-nowrap text-6xl md:text-8xl font-bold tracking-tighter"
            animate={{ x: [-2000, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {marqueeText.repeat(5)}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
