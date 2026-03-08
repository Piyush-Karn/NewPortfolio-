import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles } from "lucide-react";

const techCategories = [
  {
    label: "AI / ML",
    items: ["TensorFlow", "PyTorch", "YOLOv8", "OpenCV", "Scikit-learn", "Keras", "TensorRT"],
  },
  {
    label: "Data & Analysis",
    items: ["NumPy", "Pandas", "NLP", "Deep Learning", "Computer Vision"],
  },
  {
    label: "Development",
    items: ["Python", "Flask", "Streamlit", "HTML/CSS", "Bootstrap", "REST APIs", "SQL"],
  },
  {
    label: "DevOps & Tools",
    items: ["Git", "Docker", "Linux"],
  },
];

const allTech = techCategories.flatMap((c) => c.items);

const marqueeRow1 = [...allTech.slice(0, 10), ...allTech.slice(0, 10)];
const marqueeRow2 = [...allTech.slice(10), ...allTech.slice(10)];

const TechStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const getActiveItems = activeCategory
    ? techCategories.find((c) => c.label === activeCategory)?.items ?? []
    : allTech;

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
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
            06 — Tech Stack
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
          Tools I <span className="text-gradient">wield</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground max-w-lg mb-12 text-lg"
        >
          From model training to deployment — the ecosystem I work with daily.
        </motion.p>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${
              !activeCategory
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            All
          </motion.button>
          {techCategories.map((cat) => (
            <motion.button
              key={cat.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                activeCategory === cat.label
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid view */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {getActiveItems.map((tech, i) => (
            <motion.div
              key={tech}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
              whileHover={{ scale: 1.08, y: -4 }}
              className={`relative p-4 rounded-2xl glass-card text-center cursor-default transition-all duration-300 group overflow-hidden ${
                hoveredTech === tech ? "border-primary/40" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span
                className="relative z-10 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {tech}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="mt-16 space-y-4 opacity-40">
        {[marqueeRow1, marqueeRow2].map((row, rowIdx) => (
          <div key={rowIdx} className="relative overflow-hidden py-2">
            <div
              className="flex gap-4 whitespace-nowrap"
              style={{
                animation: `${rowIdx % 2 === 0 ? "marquee" : "marquee-reverse"} ${35 + rowIdx * 5}s linear infinite`,
              }}
            >
              {row.map((tech, i) => (
                <div
                  key={`${tech}-${i}`}
                  className="px-5 py-2.5 rounded-full border border-border/30 text-xs text-muted-foreground shrink-0"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
