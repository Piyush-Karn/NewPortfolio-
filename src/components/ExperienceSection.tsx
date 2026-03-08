import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, GraduationCap, ArrowRight, Sparkles, Calendar, MapPin, ExternalLink } from "lucide-react";

const timeline = [
  {
    type: "work" as const,
    icon: Briefcase,
    title: "Software Engineering Intern",
    org: "WandrAI",
    location: "Remote",
    period: "Oct 2025 — Nov 2025",
    description:
      "Worked on AI-powered solutions, contributing to software development and machine learning pipelines. Built and optimized REST APIs for intelligent data processing workflows.",
    highlights: [
      "Developed ML pipeline for data processing",
      "Built REST APIs with Python & Flask",
      "Collaborated on AI-powered product features",
    ],
    tags: ["AI/ML", "Python", "Flask", "APIs", "Deep Learning"],
  },
  {
    type: "education" as const,
    icon: GraduationCap,
    title: "B.Tech in Computer Science",
    org: "KCCITM",
    location: "India",
    period: "2023 — 2027",
    description:
      "Pursuing computer science with a specialization in AI/ML, deep learning, and software engineering. Active participant in hackathons and technical events.",
    highlights: [
      "Specialization in AI & Machine Learning",
      "National-level hackathon winner",
      "Active in coding competitions & research",
    ],
    tags: ["CS", "AI/ML", "Research", "Deep Learning", "Algorithms"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Large background parallax text */}
      <motion.div
        className="absolute top-20 whitespace-nowrap pointer-events-none select-none"
        style={{ x: bgX }}
      >
        <span
          className="text-[15vw] font-bold tracking-[-0.04em] text-stroke opacity-30"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          JOURNEY
        </span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12" ref={ref}>
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
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-20"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Experience & <span className="text-gradient">education</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-6 md:left-10 top-0 bottom-0 w-[2px] bg-border/40">
            <motion.div
              className="w-full rounded-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--accent)))",
              }}
            />
          </div>

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-16 md:pl-24"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Timeline node */}
                <div className="absolute left-0 md:left-4 top-8 z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 ${
                      hoveredIndex === i
                        ? "border-primary bg-primary/20 scale-110 shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                        : "border-border bg-background"
                    }`}
                    initial={{ scale: 0, rotate: -45 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.3, type: "spring", stiffness: 200 }}
                  >
                    <item.icon
                      className={`w-5 h-5 transition-colors duration-300 ${
                        hoveredIndex === i ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group relative rounded-2xl glass-card hover:border-primary/30 transition-all duration-500 overflow-hidden cursor-default"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top accent bar */}
                  <div
                    className={`h-1 transition-all duration-500 ${
                      hoveredIndex === i
                        ? "bg-gradient-to-r from-primary via-accent to-primary"
                        : "bg-border/30"
                    }`}
                  />

                  <div className="relative p-6 md:p-8">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase rounded-full font-semibold ${
                          item.type === "work"
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-accent/10 text-accent border border-accent/20"
                        }`}
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {item.type === "work" ? "Work" : "Education"}
                      </span>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {item.period}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {item.location}
                        </span>
                      </div>
                    </div>

                    {/* Title & org */}
                    <h3
                      className="text-xl md:text-2xl font-bold mb-1 group-hover:text-primary transition-colors duration-300"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-primary/80 font-medium mb-4">{item.org}</p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{item.description}</p>

                    {/* Highlights */}
                    <div className="space-y-2 mb-6">
                      {item.highlights.map((highlight, hi) => (
                        <motion.div
                          key={highlight}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.7 + i * 0.3 + hi * 0.1, duration: 0.5 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span className="text-sm text-foreground/70">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      {item.tags.map((tag, ti) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.8 + i * 0.3 + ti * 0.05, duration: 0.4 }}
                          className="px-3 py-1 text-xs rounded-full border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-all cursor-default"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                      <ArrowRight className="w-4 h-4 text-primary ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Timeline end marker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="absolute left-[18px] md:left-[34px] -bottom-4 flex flex-col items-center gap-1"
          >
            <div className="w-3 h-3 rounded-full border-2 border-primary/40 bg-background" />
            <div className="w-[2px] h-6 bg-gradient-to-b from-primary/40 to-transparent" />
          </motion.div>
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-20 flex items-center gap-4"
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
