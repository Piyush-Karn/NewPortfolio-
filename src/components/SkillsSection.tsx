import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Brain, Code, Sparkles } from "lucide-react";

const skillSets = [
  {
    icon: Brain,
    title: "AI/ML",
    subtitle: "DEVELOPER",
    tagline: "Building intelligent systems & AI solutions",
    description:
      "Developing AI agents and ML models with Python, TensorFlow & PyTorch. Deep learning, NLP, computer vision, and autonomous systems.",
    skills: ["TensorFlow", "PyTorch", "YOLOv8", "OpenCV", "NLP", "Scikit-learn", "TensorRT", "Keras", "NumPy", "Pandas"],
    accentColor: "primary",
  },
  {
    icon: Code,
    title: "SOFTWARE",
    subtitle: "DEVELOPER",
    tagline: "Modern development & scalable applications",
    description:
      "Building robust applications with Python, Flask & modern web tech. Clean architecture, REST APIs, and production-ready systems.",
    skills: ["Python", "HTML/CSS", "Flask", "Streamlit", "Git", "Bootstrap", "REST APIs", "SQL", "Docker", "Linux"],
    accentColor: "accent",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="skills" className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Large background text */}
      <motion.div
        className="absolute top-20 whitespace-nowrap pointer-events-none select-none"
        style={{ x: bgX }}
      >
        <span
          className="text-[14vw] font-bold tracking-[-0.04em] text-stroke opacity-20"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          SKILLS
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span
            className="text-xs tracking-[0.3em] uppercase text-primary font-medium"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            02 — What I Do
          </span>
          <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-20"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Skillset & <span className="text-gradient">expertise</span>
        </motion.h2>

        {/* Cards - stacked editorial layout */}
        <div className="space-y-8">
          {skillSets.map((set, i) => (
            <motion.div
              key={set.title}
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative rounded-3xl overflow-hidden glass-card hover:border-primary/30 transition-all duration-500"
            >
              {/* Hover gradient */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
                  i === 0
                    ? "bg-gradient-to-br from-primary/8 via-transparent to-accent/5"
                    : "bg-gradient-to-br from-accent/8 via-transparent to-primary/5"
                }`}
              />
              {/* Corner glow */}
              <div
                className={`absolute ${i === 0 ? "-top-24 -left-24" : "-top-24 -right-24"} w-48 h-48 rounded-full blur-3xl transition-all duration-700 ${
                  hoveredCard === i ? "bg-primary/15" : "bg-primary/5"
                }`}
              />

              <div className="relative z-10 grid md:grid-cols-12 gap-8 p-8 md:p-12">
                {/* Left: title block */}
                <div className="md:col-span-5 flex flex-col justify-between">
                  <div>
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/10 group-hover:border-primary/30 transition-colors"
                      animate={hoveredCard === i ? { rotate: [0, -8, 8, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <set.icon className="w-7 h-7 text-primary" />
                    </motion.div>

                    <div className="mb-4">
                      <h3
                        className="text-3xl md:text-4xl font-bold tracking-tight leading-none"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {set.title}
                      </h3>
                      <h3
                        className="text-3xl md:text-4xl font-bold tracking-tight leading-none text-gradient-static"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {set.subtitle}
                      </h3>
                    </div>

                    <p
                      className="text-xs tracking-[0.15em] uppercase text-primary/70 mb-4"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {set.tagline}
                    </p>

                    <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                      {set.description}
                    </p>
                  </div>

                  {/* Skill count badge */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.2 }}
                    className="hidden md:flex items-center gap-3 mt-8"
                  >
                    <span
                      className="text-4xl font-bold text-primary/30"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {set.skills.length}
                    </span>
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Core
                      <br />
                      Technologies
                    </span>
                  </motion.div>
                </div>

                {/* Right: skills cloud */}
                <div className="md:col-span-7 flex items-center">
                  <div className="flex flex-wrap gap-3">
                    {set.skills.map((skill, j) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{
                          delay: 0.5 + i * 0.15 + j * 0.05,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{
                          scale: 1.12,
                          y: -4,
                          transition: { duration: 0.2 },
                        }}
                        className="group/skill relative cursor-default"
                      >
                        <div className="px-5 py-3 rounded-2xl bg-secondary/60 border border-border hover:border-primary/40 hover:bg-primary/10 transition-all duration-300">
                          <span
                            className="text-sm font-medium text-foreground/70 group-hover/skill:text-primary transition-colors"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {skill}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom decorative line */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-accent to-transparent"
                initial={{ width: "0%" }}
                animate={hoveredCard === i ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
