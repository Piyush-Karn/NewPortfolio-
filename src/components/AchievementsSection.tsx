import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Zap, ArrowRight, Activity, Award } from "lucide-react";
import { impact, achievements } from "@/data/portfolio";

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impact" data-pik-section="impact" className="cv-auto relative py-32 px-6 md:px-12 overflow-hidden" ref={ref}>
      {/* Background text — hidden on mobile */}
      <div className="hidden md:block absolute top-16 whitespace-nowrap pointer-events-none select-none">
        <span
          className="text-[15vw] font-bold tracking-[-0.04em] text-stroke opacity-20"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          IMPACT
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <Activity className="w-4 h-4 text-primary" />
          <span
            className="text-xs tracking-[0.3em] uppercase text-primary font-medium"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            05 — Impact
          </span>
          <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Measurable <span className="text-gradient">impact</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg mb-14 max-w-xl"
        >
          Real numbers, verified performance gains, and production improvements.
        </motion.p>

        {/* Impact cards grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {impact.map((item, i) => (
            <motion.div
              key={item.label}
              data-pik-hover={`impact:${i}`}
              data-pik-anchor={i === 0 ? "impact-card" : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group relative p-8 rounded-3xl glass-card border border-border/50 hover:border-primary/30 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-3 py-1 text-[10px] tracking-wider uppercase rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.context}
                  </span>
                  <span
                    className="px-3 py-1 text-xs font-bold rounded-full bg-accent/10 border border-accent/25 text-accent"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.delta}
                  </span>
                </div>

                <h3
                  className="text-xl font-bold tracking-tight mb-5"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.label}
                </h3>

                {/* Before -> After block */}
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border/50 mb-5 flex items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <span
                      className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-0.5"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Before
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground line-through decoration-destructive/60">
                      {item.from}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                  <div className="text-center sm:text-right">
                    <span
                      className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-0.5"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      After
                    </span>
                    <span
                      className="text-lg md:text-xl font-bold text-gradient"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.to}
                    </span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.note}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements header & cards */}
        {achievements.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="w-4 h-4 text-accent" />
              <span
                className="text-xs tracking-[0.3em] uppercase text-accent font-medium"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Honors & Recognition
              </span>
              <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
            </div>

            <div className="space-y-6">
              {achievements.map((ach, i) => (
                <motion.div
                  key={ach.title}
                  data-pik-hover="achievement"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.7 }}
                  whileHover={{ scale: 1.01 }}
                  className="relative rounded-3xl overflow-hidden glass-card border border-primary/20 glow-box"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
                  <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Trophy className="w-8 h-8 text-primary" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 border border-accent/25 text-accent"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          <Zap className="w-3.5 h-3.5" />
                          {ach.event}
                        </span>
                        <span
                          className="text-xs text-muted-foreground"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {ach.date}
                        </span>
                      </div>
                      <h3
                        className="text-2xl md:text-3xl font-bold mb-2 tracking-tight"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {ach.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AchievementsSection;
