import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const timeline = [
  {
    type: "work",
    icon: Briefcase,
    title: "Software Engineering Intern",
    org: "WandrAI",
    period: "Oct 2025 — Nov 2025",
    description: "Worked on AI-powered solutions, contributing to software development and machine learning pipelines.",
  },
  {
    type: "education",
    icon: GraduationCap,
    title: "B.Tech in Computer Science",
    org: "KCCITM",
    period: "2023 — 2027",
    description: "Pursuing computer science with focus on AI/ML, deep learning, and software engineering.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm text-primary font-mono tracking-widest mb-3">03 — EXPERIENCE</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            My <span className="text-gradient">journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px]"
            style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--primary)), transparent)" }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {timeline.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.3, duration: 0.6 }}
              className={`relative flex items-start mb-16 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-row`}
            >
              {/* Dot */}
              <motion.div
                className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary z-10 mt-6"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.3 }}
              />

              {/* Content */}
              <div className={`ml-14 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{item.period}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                  <p className="text-sm text-primary mb-2">{item.org}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
