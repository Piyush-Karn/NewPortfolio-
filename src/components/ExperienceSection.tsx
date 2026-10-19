import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Calendar,
  MapPin,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { experience, education } from "@/data/portfolio";

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const containerRef = useRef(null);

  return (
    <section id="experience" className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Background text — hidden on mobile */}
      <div className="hidden md:block absolute top-16 whitespace-nowrap pointer-events-none select-none">
        <span className="text-[15vw] font-bold tracking-[-0.04em] text-stroke opacity-30" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          JOURNEY
        </span>
      </div>

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
          {experience.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl glass-card border-primary/10 hover:border-primary/30 transition-all duration-700 overflow-hidden flex flex-col justify-between"
            >
              {/* Top gradient strip */}
              <div className={`h-1 bg-gradient-to-r ${exp.current ? "from-primary via-accent to-transparent" : "from-primary/60 via-primary/30 to-transparent"}`} />

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative p-8 md:p-10 flex flex-col h-full">
                {/* Icon + badge row */}
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] transition-all duration-500"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <Briefcase className="w-6 h-6 text-primary" />
                  </motion.div>
                  <span className={`px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase rounded-full font-bold border ${exp.current ? "bg-primary/15 text-primary border-primary/30" : "bg-secondary/60 text-muted-foreground border-border"}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {exp.current ? "Current Role" : "Work Experience"}
                  </span>
                </div>

                {/* Title & Company */}
                <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {exp.role}
                </h3>
                <p className="text-base text-primary/90 font-semibold mb-4">
                  {exp.company}
                  {exp.org ? <span className="text-muted-foreground font-normal text-sm"> · {exp.org}</span> : null}
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/60 text-muted-foreground text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    <Calendar className="w-3.5 h-3.5" /> {exp.period}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/60 text-muted-foreground text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    <MapPin className="w-3.5 h-3.5" /> {exp.location}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                  {exp.summary}
                </p>

                {/* Bullets */}
                <div className="space-y-2.5 mb-6 flex-1">
                  {exp.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-foreground/80 leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40 mt-auto">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-all cursor-default"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* ===== EDUCATION CARD ===== */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 + experience.length * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-3xl glass-card border-accent/10 hover:border-accent/30 transition-all duration-700 overflow-hidden flex flex-col justify-between"
          >
            {/* Top gradient strip */}
            <div className="h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent" />

            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative p-8 md:p-10 flex flex-col h-full">
              {/* Icon + badge row */}
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/15 group-hover:shadow-[0_0_30px_hsl(var(--accent)/0.15)] transition-all duration-500"
                  whileHover={{ rotate: -5, scale: 1.05 }}
                >
                  <GraduationCap className="w-6 h-6 text-accent" />
                </motion.div>
                <span className="px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase rounded-full font-bold bg-accent/10 text-accent border border-accent/20" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Education
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-1 group-hover:text-accent transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {education.degree}
              </h3>
              <p className="text-base text-accent/90 font-semibold mb-4">{education.school}</p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-3 mb-5">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/60 text-muted-foreground text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <Calendar className="w-3.5 h-3.5" /> {education.period}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/60 text-muted-foreground text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <MapPin className="w-3.5 h-3.5" /> {education.location}
                </div>
              </div>

              {/* CGPA badge */}
              <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 mb-6 flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Academic Record</p>
                  <p className="text-sm font-semibold text-foreground">CGPA: {education.cgpa}</p>
                </div>
              </div>

              {/* Coursework */}
              <div className="mb-6 flex-1">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Key Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {education.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1.5 text-xs rounded-xl bg-secondary/60 border border-border text-foreground/80"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech/Field tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40 mt-auto">
                {["Computer Science", "Engineering", "Algorithms", "Systems"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full border border-border hover:border-accent/40 text-muted-foreground hover:text-accent transition-all cursor-default"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {tag}
                  </span>
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
              {education.degree} · {education.school} ({education.period})
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
