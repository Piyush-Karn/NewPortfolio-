import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code } from "lucide-react";

const skillSets = [
  {
    icon: Brain,
    title: "AI/ML Developer",
    description: "Building intelligent systems with deep learning & computer vision",
    skills: ["TensorFlow", "PyTorch", "YOLOv8", "OpenCV", "NLP", "Scikit-learn", "TensorRT", "Keras", "NumPy", "Pandas"],
  },
  {
    icon: Code,
    title: "Software Developer",
    description: "Full-stack development with modern tools & frameworks",
    skills: ["Python", "HTML/CSS", "Flask", "Streamlit", "Git", "Bootstrap", "REST APIs", "SQL", "Docker", "Linux"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm text-primary font-mono tracking-widest mb-3">02 — SKILLS</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            What I <span className="text-gradient">do</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillSets.map((set, i) => (
            <motion.div
              key={set.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group glow-box"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <set.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{set.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{set.description}</p>
              <div className="flex flex-wrap gap-2">
                {set.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 + j * 0.05 }}
                    className="px-3 py-1.5 text-xs rounded-full bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
