import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Brain, Code, ChevronRight } from "lucide-react";

const skillSets = [
  {
    icon: Brain,
    title: "AI/ML DEVELOPER",
    subtitle: "Building intelligent systems & AI solutions",
    description: "Developing AI agents, machine learning models using Python, TensorFlow, and PyTorch. Specializing in deep learning, NLP, computer vision, and autonomous systems.",
    skills: ["TensorFlow", "PyTorch", "YOLOv8", "OpenCV", "NLP", "Scikit-learn", "TensorRT", "Keras", "NumPy", "Pandas"],
    color: "primary",
  },
  {
    icon: Code,
    title: "SOFTWARE DEVELOPER",
    subtitle: "Modern development & scalable applications",
    description: "Building robust applications using Python, Flask, and modern web technologies. Creating seamless experiences with clean architecture and best practices.",
    skills: ["Python", "HTML/CSS", "Flask", "Streamlit", "Git", "Bootstrap", "REST APIs", "SQL", "Docker", "Linux"],
    color: "accent",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="skills" className="relative py-32 px-6 md:px-12" ref={ref}>
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
            02 — What I Do
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
          Skillset & <span className="text-gradient">tools</span>
        </motion.h2>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillSets.map((set, i) => (
            <motion.div
              key={set.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.7 }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative rounded-3xl overflow-hidden glass-card transition-all duration-500 hover:border-primary/30"
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: i === 0
                    ? "radial-gradient(ellipse at top left, hsl(var(--primary) / 0.08), transparent 60%)"
                    : "radial-gradient(ellipse at top right, hsl(var(--accent) / 0.08), transparent 60%)",
                }}
              />

              <div className="relative z-10 p-8 md:p-10">
                {/* Header row */}
                <div className="flex items-start justify-between mb-8">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"
                    animate={hoveredCard === i ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <set.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <motion.div
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {set.title}
                </h3>
                <p className="text-sm text-primary mb-3">{set.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{set.description}</p>

                {/* Skills grid */}
                <div className="flex flex-wrap gap-2">
                  {set.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 + j * 0.04, duration: 0.4 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1.5 text-xs rounded-full bg-secondary/80 text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-all cursor-default border border-transparent hover:border-primary/20"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {skill}
                    </motion.span>
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
