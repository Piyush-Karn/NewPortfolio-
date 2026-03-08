import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Brain, Code, ChevronRight, Zap, Layers, Sparkles } from "lucide-react";

const skillSets = [
  {
    icon: Brain,
    accentIcon: Zap,
    title: "AI/ML DEVELOPER",
    subtitle: "Building intelligent systems & AI solutions",
    description:
      "Developing AI agents, machine learning models using Python, TensorFlow, and PyTorch. Specializing in deep learning, NLP, computer vision, and autonomous systems.",
    skills: [
      { name: "TensorFlow", level: 90 },
      { name: "PyTorch", level: 85 },
      { name: "YOLOv8", level: 88 },
      { name: "OpenCV", level: 85 },
      { name: "NLP", level: 80 },
      { name: "Scikit-learn", level: 82 },
      { name: "TensorRT", level: 75 },
      { name: "Keras", level: 88 },
      { name: "NumPy", level: 90 },
      { name: "Pandas", level: 88 },
    ],
    gradient: "from-primary/10 via-transparent to-accent/5",
    borderHover: "hover:border-primary/40",
  },
  {
    icon: Code,
    accentIcon: Layers,
    title: "SOFTWARE DEVELOPER",
    subtitle: "Modern development & scalable applications",
    description:
      "Building robust applications using Python, Flask, and modern web technologies. Creating seamless experiences with clean architecture and best practices.",
    skills: [
      { name: "Python", level: 92 },
      { name: "HTML/CSS", level: 85 },
      { name: "Flask", level: 80 },
      { name: "Streamlit", level: 78 },
      { name: "Git", level: 85 },
      { name: "Bootstrap", level: 75 },
      { name: "REST APIs", level: 82 },
      { name: "SQL", level: 80 },
      { name: "Docker", level: 72 },
      { name: "Linux", level: 78 },
    ],
    gradient: "from-accent/10 via-transparent to-primary/5",
    borderHover: "hover:border-accent/40",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="skills" className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Large background text */}
      <motion.div
        className="absolute top-16 whitespace-nowrap pointer-events-none select-none"
        style={{ x: bgX }}
      >
        <span
          className="text-[12vw] font-bold tracking-[-0.04em] text-stroke opacity-20"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          SKILLSET
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
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Skillset & <span className="text-gradient">tools</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground max-w-lg mb-16 text-lg"
        >
          A deep toolkit spanning AI research and production-grade software engineering.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillSets.map((set, i) => (
            <motion.div
              key={set.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.7 }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative rounded-3xl overflow-hidden glass-card transition-all duration-500 ${set.borderHover}`}
            >
              {/* Gradient overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${set.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              {/* Decorative corner accent */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all duration-700" />

              <div className="relative z-10 p-8 md:p-10">
                {/* Header row */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/10 group-hover:border-primary/30 transition-colors"
                      animate={hoveredCard === i ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <set.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.2, type: "spring" }}
                      className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center"
                    >
                      <set.accentIcon className="w-4 h-4 text-accent" />
                    </motion.div>
                  </div>
                  <motion.div
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.div>
                </div>

                <h3
                  className="text-xl md:text-2xl font-bold mb-2 tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {set.title}
                </h3>
                <p className="text-sm text-primary/80 mb-3">{set.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{set.description}</p>

                {/* Skills with progress indicators */}
                <div className="space-y-3">
                  {set.skills.map((skill, j) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 + j * 0.05, duration: 0.4 }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="group/skill cursor-default"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-medium transition-colors duration-300 ${
                            hoveredSkill === skill.name ? "text-primary" : "text-foreground/70"
                          }`}
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {skill.name}
                        </span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={hoveredSkill === skill.name ? { opacity: 1 } : { opacity: 0 }}
                          className="text-[10px] text-primary/70"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="h-1 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ delay: 0.8 + i * 0.1 + j * 0.06, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
