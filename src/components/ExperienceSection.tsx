import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Calendar,
  MapPin,
  Code2,
  TrendingUp,
  Zap,
  Award,
  BookOpen,
  Rocket,
} from "lucide-react";

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const containerRef = useRef(null);

  return (
    <section id="experience" className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Background parallax text */}
      <motion.div className="absolute top-16 whitespace-nowrap pointer-events-none select-none" style={{ x: bgX }}>
        <span className="text-[15vw] font-bold tracking-[-0.04em] text-stroke opacity-30" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          JOURNEY
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="flex items-center gap-3 mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>03 — Journey</span>
          <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Experience & <span className="text-gradient">education</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="text-muted-foreground max-w-lg mb-16 text-lg">
          Milestones that shape my craft as a developer and engineer.
        </motion.p>

        {/* Bento grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* ===== WORK CARD ===== */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-3xl glass-card border-primary/10 hover:border-primary/30 transition-all duration-700 overflow-hidden"
          >
            {/* Top gradient strip */}
            <div className="h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent" />

            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative p-8 md:p-10">
              {/* Icon + badge row */}
              <div className="flex items-center justify-between mb-8">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] transition-all duration-500"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <Briefcase className="w-7 h-7 text-primary" />
                </motion.div>
                <span className="px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase rounded-full font-bold bg-primary/10 text-primary border border-primary/20" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Work Experience
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Software Engineering Intern
              </h3>
              <p className="text-lg text-primary/80 font-semibold mb-5">WandrAI</p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/60 text-muted-foreground text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <Calendar className="w-3.5 h-3.5" /> Oct 2025 — Nov 2025
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/60 text-muted-foreground text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <MapPin className="w-3.5 h-3.5" /> Remote
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                Built AI-powered solutions and optimized ML pipelines for intelligent data processing. Contributed to production-grade REST APIs and collaborated with cross-functional teams on AI product features.
              </p>

              {/* Highlights with icons */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: Code2, text: "Developed ML pipeline for data processing" },
                  { icon: Rocket, text: "Built REST APIs with Python & Flask" },
                  { icon: Zap, text: "Shipped AI-powered product features" },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/80">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {["AI/ML", "Python", "Flask", "APIs", "Deep Learning"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.05 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-1.5 text-xs rounded-full border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-all cursor-default"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ===== EDUCATION CARD ===== */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-3xl glass-card border-accent/10 hover:border-accent/30 transition-all duration-700 overflow-hidden"
          >
            {/* Top gradient strip */}
            <div className="h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent" />

            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative p-8 md:p-10">
              {/* Icon + badge row */}
              <div className="flex items-center justify-between mb-8">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/15 group-hover:shadow-[0_0_30px_hsl(var(--accent)/0.15)] transition-all duration-500"
                  whileHover={{ rotate: -5, scale: 1.05 }}
                >
                  <GraduationCap className="w-7 h-7 text-accent" />
                </motion.div>
                <span className="px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase rounded-full font-bold bg-accent/10 text-accent border border-accent/20" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Education
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-accent transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                B.Tech in Computer Science
              </h3>
              <p className="text-lg text-accent/80 font-semibold mb-5">KCCITM</p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/60 text-muted-foreground text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <Calendar className="w-3.5 h-3.5" /> 2023 — 2027
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/60 text-muted-foreground text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <MapPin className="w-3.5 h-3.5" /> India
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                Specializing in AI/ML and deep learning with hands-on project experience. Active hackathon participant and coding competition enthusiast pushing the boundaries of what's possible with AI.
              </p>

              {/* Highlights with icons */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: BookOpen, text: "Specialization in AI & Machine Learning" },
                  { icon: Award, text: "National-level hackathon winner — 1st Place" },
                  { icon: TrendingUp, text: "Active in competitions & research projects" },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm text-foreground/80">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {["CS", "AI/ML", "Research", "Deep Learning", "Algorithms"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1 + i * 0.05 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-1.5 text-xs rounded-full border border-border hover:border-accent/40 text-muted-foreground hover:text-accent transition-all cursor-default"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom connector line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex items-center gap-4"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-card">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Currently pursuing B.Tech — Expected 2027
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
