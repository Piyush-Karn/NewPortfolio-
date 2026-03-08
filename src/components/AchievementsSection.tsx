import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Star } from "lucide-react";

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm text-primary font-mono tracking-widest mb-3">05 — ACHIEVEMENTS</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Milestones <span className="text-gradient">unlocked</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative p-10 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 glow-box"
        >
          <div className="absolute -top-4 -right-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Star className="w-8 h-8 text-primary fill-primary/20" />
            </motion.div>
          </div>

          <div className="flex items-start gap-6">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy className="w-8 h-8 text-primary" />
            </motion.div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                National-Level Hackathon Winner
              </h3>
              <p className="text-muted-foreground">
                Won a national-level hackathon showcasing innovative AI/ML solutions, 
                competing against top engineering talent from across the country.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
