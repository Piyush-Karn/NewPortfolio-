import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techs = [
  "Python", "TensorFlow", "PyTorch", "YOLOv8", "OpenCV",
  "Scikit-learn", "Flask", "Streamlit", "NumPy", "Pandas",
  "TensorRT", "NLP", "Git", "Docker", "Linux",
  "HTML/CSS", "Bootstrap", "SQL", "REST APIs", "Keras",
];

const TechStackSection = () => {
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
          <p className="text-sm text-primary font-mono tracking-widest mb-3">06 — TECH STACK</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Tools I <span className="text-gradient">use</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {techs.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all text-center group cursor-default"
            >
              <p className="text-sm font-medium group-hover:text-primary transition-colors">{tech}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
