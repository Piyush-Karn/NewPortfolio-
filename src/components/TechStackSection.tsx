import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Terminal, Database, Cpu, Wrench, Brain, Code } from "lucide-react";

const techCategories = [
  {
    label: "AI / ML",
    icon: Cpu,
    description: "Building intelligent systems & AI solutions",
    items: ["TensorFlow", "PyTorch", "YOLOv8", "OpenCV", "Scikit-learn", "Keras", "TensorRT", "Deep Learning"],
  },
  {
    label: "Data Science",
    icon: Database,
    description: "Processing & analyzing complex datasets",
    items: ["NumPy", "Pandas", "NLP", "Computer Vision", "Data Analysis", "Feature Engineering"],
  },
  {
    label: "Development",
    icon: Terminal,
    description: "Modern development & scalable applications",
    items: ["Python", "Flask", "Streamlit", "HTML/CSS", "Bootstrap", "REST APIs", "SQL"],
  },
  {
    label: "DevOps & Tools",
    icon: Wrench,
    description: "Infrastructure & deployment pipelines",
    items: ["Git", "Docker", "Linux", "VS Code", "Jupyter"],
  },
];

const TechStackSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);

  return (
    <section id="skills" className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Large background parallax text */}
      <motion.div
        className="absolute top-20 whitespace-nowrap pointer-events-none select-none"
        style={{ x: bgX }}
      >
        <span
          className="text-[15vw] font-bold tracking-[-0.04em] text-stroke opacity-30"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          TOOLS & SKILLS
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
            02 — Skills & Tools
          </span>
          <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Tools I <span className="text-gradient">wield</span>
        </motion.h2>

        {/* Category tabs + content */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left: category tabs */}
          <div className="md:col-span-4 space-y-3">
            {techCategories.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = activeCategory === i;
              return (
                <motion.button
                  key={cat.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  onClick={() => setActiveCategory(i)}
                  className={`w-full group flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-400 border ${
                    isActive
                      ? "glass-card border-primary/30 bg-primary/5"
                      : "border-transparent hover:border-border hover:bg-secondary/30"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? "bg-primary/20" : "bg-secondary/60 group-hover:bg-secondary"
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-sm font-semibold transition-colors block ${
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {cat.label}
                    </span>
                    <p
                      className="text-[10px] text-muted-foreground mt-0.5 truncate"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {cat.items.length} tools
                    </p>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="ml-auto w-1.5 h-8 rounded-full bg-primary shrink-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right: active items */}
          <div className="md:col-span-8">
            {/* Category description */}
            <motion.p
              key={`desc-${activeCategory}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-muted-foreground mb-6"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {techCategories[activeCategory].description}
            </motion.p>

            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {techCategories[activeCategory].items.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.4, type: "spring" }}
                  whileHover={{ scale: 1.06, y: -4 }}
                  className="group relative p-6 rounded-2xl glass-card hover:border-primary/40 cursor-default transition-all duration-300 overflow-hidden text-center"
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

            {/* Total count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="h-[1px] flex-1 bg-border" />
              <span
                className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {techCategories.reduce((acc, c) => acc + c.items.length, 0)} technologies total
              </span>
              <div className="h-[1px] flex-1 bg-border" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background marquee */}
      <div className="mt-20 space-y-3 opacity-20 pointer-events-none">
        {[0, 1].map((rowIdx) => {
          const allItems = techCategories.flatMap((c) => c.items);
          const row = rowIdx === 0 ? allItems.slice(0, 14) : allItems.slice(14);
          const doubled = [...row, ...row, ...row];
          return (
            <div key={rowIdx} className="overflow-hidden py-1">
              <div
                className="flex gap-4 whitespace-nowrap"
                style={{
                  animation: `${rowIdx === 0 ? "marquee" : "marquee-reverse"} ${40 + rowIdx * 8}s linear infinite`,
                }}
              >
                {doubled.map((tech, i) => (
                  <span
                    key={`${tech}-${i}`}
                    className="px-4 py-2 rounded-full border border-border/20 text-xs text-muted-foreground shrink-0"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TechStackSection;
