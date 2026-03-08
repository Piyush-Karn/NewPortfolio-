import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, ArrowRight } from "lucide-react";

const timeline = [
  {
    type: "work",
    icon: Briefcase,
    title: "Software Engineering Intern",
    org: "WandrAI",
    period: "Oct 2025 — Nov 2025",
    description: "Worked on AI-powered solutions, contributing to software development and machine learning pipelines.",
    tags: ["AI/ML", "Python", "APIs"],
  },
  {
    type: "education",
    icon: GraduationCap,
    title: "B.Tech in Computer Science",
    org: "KCCITM",
    period: "2023 — 2027",
    description: "Pursuing computer science with focus on AI/ML, deep learning, and software engineering.",
    tags: ["CS", "AI/ML", "Research"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-32 px-6 md:px-12" ref={containerRef}>
      <div className="max-w-6xl mx-auto" ref={ref}>
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
            03 — Journey
          </span>
          <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-20"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Experience & <span className="text-gradient">education</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[2px] bg-border">
            <motion.div
              className="w-full rounded-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--accent)))",
              }}
            />
          </div>

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.25, duration: 0.7 }}
                className="relative pl-20 md:pl-28 group"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-[22px] md:left-[38px] top-8 w-5 h-5 rounded-full border-2 border-primary bg-background z-10 group-hover:bg-primary group-hover:scale-125 transition-all"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.25, type: "spring" }}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="p-8 rounded-2xl glass-card hover:border-primary/30 transition-all group cursor-default"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {item.title}
                        </h3>
                        <p className="text-sm text-primary font-medium">{item.org}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-secondary"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>

                  <div className="flex flex-wrap items-center gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs rounded-full border border-border text-muted-foreground"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {tag}
                      </span>
                    ))}
                    <ArrowRight className="w-4 h-4 text-primary ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
