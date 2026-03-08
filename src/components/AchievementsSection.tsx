import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Zap } from "lucide-react";

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 md:px-12" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            05 — Achievements
          </span>
          <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-16"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Milestones <span className="text-gradient">unlocked</span>
        </motion.h2>

        {/* Achievement card - big and bold */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          whileHover={{ scale: 1.02 }}
          className="relative rounded-3xl overflow-hidden glass-card glow-box"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
          
          {/* Floating decorative elements — hidden on mobile */}
          <div
            className="hidden md:block absolute -top-6 -right-6 w-32 h-32 rounded-full blur-[30px]"
            style={{ background: "hsl(var(--primary) / 0.2)", opacity: 0.5 }}
          />
          <div
            className="hidden md:block absolute bottom-0 left-0 w-24 h-24 rounded-full blur-[20px]"
            style={{ background: "hsl(var(--accent) / 0.15)" }}
          />

          <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-start gap-8">
            <div
              className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0"
            >
              <Trophy className="w-10 h-10 text-primary" />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-accent" />
                <span className="text-xs tracking-[0.2em] uppercase text-accent font-medium"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Top Achievement
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                National-Level Hackathon
                <span className="text-gradient"> Winner</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xl text-lg">
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
