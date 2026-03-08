import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Calendar,
  MapPin,
  ChevronRight,
  Zap,
  Award,
  Code2,
  TrendingUp,
} from "lucide-react";

const timeline = [
  {
    type: "work" as const,
    icon: Briefcase,
    accentIcon: Zap,
    title: "Software Engineering Intern",
    org: "WandrAI",
    location: "Remote",
    period: "Oct 2025 — Nov 2025",
    duration: "2 months",
    description:
      "Worked on AI-powered solutions, contributing to software development and machine learning pipelines. Built and optimized REST APIs for intelligent data processing workflows.",
    highlights: [
      { text: "Developed ML pipeline for data processing", icon: Code2 },
      { text: "Built REST APIs with Python & Flask", icon: TrendingUp },
      { text: "Collaborated on AI-powered product features", icon: Zap },
    ],
    tags: ["AI/ML", "Python", "Flask", "APIs", "Deep Learning"],
    color: "primary" as const,
  },
  {
    type: "education" as const,
    icon: GraduationCap,
    accentIcon: Award,
    title: "B.Tech in Computer Science",
    org: "KCCITM",
    location: "India",
    period: "2023 — 2027",
    duration: "4 years",
    description:
      "Pursuing computer science with a specialization in AI/ML, deep learning, and software engineering. Active participant in hackathons and technical events.",
    highlights: [
      { text: "Specialization in AI & Machine Learning", icon: Code2 },
      { text: "National-level hackathon winner", icon: Award },
      { text: "Active in coding competitions & research", icon: TrendingUp },
    ],
    tags: ["CS", "AI/ML", "Research", "Deep Learning", "Algorithms"],
    color: "accent" as const,
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Large background parallax text */}
      <motion.div
        className="absolute top-16 whitespace-nowrap pointer-events-none select-none"
        style={{ x: bgX }}
      >
        <span
          className="text-[15vw] font-bold tracking-[-0.04em] text-stroke opacity-30"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          JOURNEY
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
            03 — Journey
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
          Experience & <span className="text-gradient">education</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground max-w-lg mb-16"
        >
          A timeline of my professional growth and academic milestones that shape who I am today.
        </motion.p>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Interactive timeline nav */}
          <div className="lg:col-span-5 relative">
            {/* Vertical animated line */}
            <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-border/30">
              <motion.div
                className="w-full rounded-full"
                style={{
                  height: lineHeight,
                  background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--accent)))",
                }}
              />
            </div>

            <div className="space-y-6">
              {timeline.map((item, i) => {
                const isExpanded = expandedIndex === i;
                const Icon = item.icon;
                const AccentIcon = item.accentIcon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative pl-16"
                  >
                    {/* Timeline node */}
                    <motion.div
                      className={`absolute left-0 top-4 w-12 h-12 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all duration-500 ${
                        isExpanded
                          ? "border-primary bg-primary/15 shadow-[0_0_25px_hsl(var(--primary)/0.25)]"
                          : "border-border/60 bg-background hover:border-primary/40"
                      }`}
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isExpanded ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </motion.div>

                    {/* Compact card */}
                    <motion.div
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                      className={`cursor-pointer rounded-2xl border transition-all duration-500 overflow-hidden ${
                        isExpanded
                          ? "glass-card border-primary/30 bg-primary/[0.03]"
                          : "border-transparent hover:border-border/60"
                      }`}
                    >
                      <div className="p-5">
                        {/* Type badge + period */}
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`px-2.5 py-0.5 text-[9px] tracking-[0.15em] uppercase rounded-full font-bold ${
                              item.type === "work"
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "bg-accent/10 text-accent border border-accent/20"
                            }`}
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {item.type === "work" ? "Work" : "Education"}
                          </span>
                          <span
                            className="text-[10px] text-muted-foreground"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {item.duration}
                          </span>
                        </div>

                        <h3
                          className={`text-lg font-bold mb-0.5 transition-colors duration-300 ${
                            isExpanded ? "text-primary" : "text-foreground"
                          }`}
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.org}</p>

                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span className="text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                              {item.period}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span className="text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                              {item.location}
                            </span>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 text-primary ml-auto transition-transform duration-300 ${
                              isExpanded ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Timeline end cap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
              className="absolute left-[18px] -bottom-6 flex flex-col items-center"
            >
              <div className="w-3 h-3 rounded-full border-2 border-primary/30 bg-background" />
              <div className="w-[2px] h-8 bg-gradient-to-b from-primary/30 to-transparent" />
            </motion.div>
          </div>

          {/* Right: Expanded detail panel */}
          <div className="lg:col-span-7">
            {expandedIndex !== null ? (
              <motion.div
                key={expandedIndex}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="sticky top-32"
              >
                <div className="rounded-3xl glass-card border-primary/20 overflow-hidden">
                  {/* Gradient header bar */}
                  <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

                  <div className="p-8 md:p-10">
                    {/* Icon + title block */}
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                        {(() => {
                          const Icon = timeline[expandedIndex].icon;
                          return <Icon className="w-7 h-7 text-primary" />;
                        })()}
                      </div>
                      <div>
                        <h3
                          className="text-2xl md:text-3xl font-bold text-foreground"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {timeline[expandedIndex].title}
                        </h3>
                        <p className="text-primary font-medium mt-1">{timeline[expandedIndex].org}</p>
                      </div>
                    </div>

                    {/* Meta pills */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {timeline[expandedIndex].period}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {timeline[expandedIndex].location}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {timeline[expandedIndex].description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-8">
                      <p
                        className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        Key Highlights
                      </p>
                      <div className="space-y-3">
                        {timeline[expandedIndex].highlights.map((highlight, hi) => {
                          const HIcon = highlight.icon;
                          return (
                            <motion.div
                              key={highlight.text}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + hi * 0.1, duration: 0.5 }}
                              className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                <HIcon className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-sm text-foreground/80">{highlight.text}</span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <p
                        className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {timeline[expandedIndex].tags.map((tag, ti) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + ti * 0.05 }}
                            className="px-3 py-1.5 text-xs rounded-full border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-all cursor-default"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="sticky top-32 flex items-center justify-center h-80 rounded-3xl border border-dashed border-border/40"
              >
                <div className="text-center">
                  <ChevronRight className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground/50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Select an item to view details
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-24 flex items-center gap-4"
        >
          <div className="h-[1px] flex-1 bg-border" />
          <span
            className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Building the future, one step at a time
          </span>
          <div className="h-[1px] flex-1 bg-border" />
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
