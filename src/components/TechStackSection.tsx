import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles, Terminal, Database, Cpu, Wrench } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import { skills } from "@/data/portfolio";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  backend: Database,
  ai: Cpu,
  languages: Terminal,
  tools: Wrench,
};

const techCategories = skills.map((cat) => ({
  ...cat,
  icon: categoryIcons[cat.id] || Terminal,
}));

const TechStackSection = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(innerRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(0);
  const manualUntil = useRef(0);

  // Tell Pik which category is showing.
  useEffect(() => {
    const cat = techCategories[activeCategory];
    window.dispatchEvent(new CustomEvent("pik:skills-change", { detail: { index: activeCategory, id: cat.id, label: cat.label } }));
  }, [activeCategory]);

  // Pik pushes the next category in; scroll mapping pauses briefly so it doesn't snap back.
  useEffect(() => {
    const next = () => {
      manualUntil.current = performance.now() + 3000;
      setActiveCategory((i) => (i + 1) % techCategories.length);
    };
    window.addEventListener("pik:skills-next", next);
    return () => window.removeEventListener("pik:skills-next", next);
  }, []);

  // Only use scroll-driven logic on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (performance.now() < manualUntil.current) return;
    if (isMobile) return; // Skip on mobile
    const usable = Math.max(0, Math.min(1, (latest - 0.05) / 0.85));
    const index = Math.min(techCategories.length - 1, Math.floor(usable * techCategories.length));
    if (index >= 0) setActiveCategory(index);
  });

  // Mobile: simple vertical layout
  if (isMobile) {
    return (
      <section id="skills" data-pik-section="skills" className="relative py-20 px-6">
        <div ref={innerRef}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              02 — Skills & Tools
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight mb-10"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Tools I <span className="text-gradient">wield</span>
          </motion.h2>

          {/* All categories stacked */}
          <div className="space-y-8">
            {techCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{cat.label}</h3>
                      <p className="text-[10px] text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{cat.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((tech) => (
                      <span
                        key={tech}
                        data-pik-hover={`skill:${tech}`}
                        className="px-3 py-1.5 text-xs rounded-xl bg-secondary/60 border border-border text-foreground/80"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: original sticky scroll-driven layout
  return (
    <section id="skills" data-pik-section="skills" ref={containerRef} className="relative" style={{ height: `${100 + techCategories.length * 60}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          className="absolute top-16 whitespace-nowrap pointer-events-none select-none"
          style={{ x: bgX, willChange: "transform" }}
        >
          <span className="text-[15vw] font-bold tracking-[-0.04em] text-stroke opacity-30" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            TOOLS & SKILLS
          </span>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full" ref={innerRef}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              02 — Skills & Tools
            </span>
            <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-12"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Tools I <span className="text-gradient">wield</span>
          </motion.h2>

          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4 space-y-3">
              {techCategories.map((cat, i) => {
                const Icon = cat.icon;
                const isActive = activeCategory === i;
                return (
                  <motion.button
                    key={cat.label}
                    data-pik-hover={`skillcat:${cat.id}`}
                    data-pik-title={cat.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    onClick={() => setActiveCategory(i)}
                    className={`w-full group flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-400 border ${
                      isActive ? "glass-solid border-primary/30 bg-primary/5" : "border-transparent hover:border-border hover:bg-secondary/30"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? "bg-primary/20" : "bg-secondary/60 group-hover:bg-secondary"}`}>
                      <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm font-semibold transition-colors block ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {cat.label}
                      </span>
                      <p className="text-[10px] text-muted-foreground mt-0.5 truncate" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {cat.items.length} tools
                      </p>
                    </div>
                    {isActive && (
                      <motion.div layoutId="activeTab" className="ml-auto w-1.5 h-8 rounded-full bg-primary shrink-0" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="md:col-span-8">
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
                data-pik-anchor="skills-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {techCategories[activeCategory].items.map((tech, i) => (
                  <motion.div
                    key={tech}
                    data-pik-hover={`skill:${tech}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.4, type: "spring" }}
                    whileHover={{ scale: 1.06, y: -4 }}
                    className="group relative p-5 rounded-2xl glass-solid hover:border-primary/40 cursor-default transition-all duration-300 overflow-hidden text-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-[1px] flex-1 bg-border" />
                <div className="flex gap-2">
                  {techCategories.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeCategory ? "bg-primary w-6" : i < activeCategory ? "bg-primary/40" : "bg-border"}`} />
                  ))}
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground ml-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {activeCategory + 1}/{techCategories.length}
                </span>
                <div className="h-[1px] flex-1 bg-border" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;