import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techRows = [
  ["Python", "TensorFlow", "PyTorch", "YOLOv8", "OpenCV", "Scikit-learn", "Flask"],
  ["Streamlit", "NumPy", "Pandas", "TensorRT", "NLP", "Keras", "Docker"],
  ["Git", "Linux", "HTML/CSS", "Bootstrap", "SQL", "REST APIs", "Deep Learning"],
];

const TechStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-16">
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
            06 — Tech Stack
          </span>
          <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Tools I <span className="text-gradient">wield</span>
        </motion.h2>
      </div>

      {/* Scrolling rows */}
      <div className="space-y-4">
        {techRows.map((row, rowIdx) => (
          <div key={rowIdx} className="relative overflow-hidden py-2">
            <motion.div
              className="flex gap-4 whitespace-nowrap"
              style={{
                animation: `${rowIdx % 2 === 0 ? "marquee" : "marquee-reverse"} ${30 + rowIdx * 5}s linear infinite`,
              }}
            >
              {[...row, ...row, ...row, ...row].map((tech, i) => (
                <motion.div
                  key={`${tech}-${i}`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + (i % row.length) * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="px-6 py-3 rounded-full glass-card hover:border-primary/40 transition-all cursor-default group shrink-0"
                >
                  <span className="text-sm font-medium group-hover:text-primary transition-colors"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {tech}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
