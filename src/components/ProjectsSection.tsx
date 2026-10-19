import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, X, Github, ExternalLink, ChevronRight, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { projects, archive } from "@/data/portfolio";

type Project = (typeof projects)[number];

const projectGradients = [
  "from-primary/20 to-accent/10",
  "from-accent/20 to-primary/10",
  "from-primary/15 via-accent/10 to-transparent",
  "from-accent/20 via-primary/15 to-accent/10",
];

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card border border-border/50"
        initial={{ scale: 0.85, y: 60 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>
        <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />
        <div className="p-8 md:p-12">
          {project.badge ? (
            <div className="mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 border border-primary/25 text-primary"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <Award className="w-3.5 h-3.5" />
                {project.badge}
              </span>
            </div>
          ) : null}

          <div className="flex items-start gap-6 mb-8">
            <span
              className="text-7xl md:text-8xl font-bold text-gradient leading-none shrink-0"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {project.num}
            </span>
            <div>
              {project.year ? (
                <span
                  className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {project.year}
                </span>
              ) : null}
              <h3
                className="text-3xl md:text-4xl font-bold tracking-tight mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {project.title}
              </h3>
              <p className="text-primary font-medium">{project.subtitle}</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8 text-base">{project.longDescription}</p>

          {/* Metric row in modal */}
          {project.metrics && project.metrics.length > 0 ? (
            <div className="mb-8">
              <h4
                className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Key Metrics
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="p-3.5 rounded-2xl glass-card border border-border/50 text-center">
                    <div
                      className="text-xl font-bold text-gradient"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {m.value}
                    </div>
                    <div
                      className="text-[10px] text-muted-foreground mt-1"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mb-8">
            <h4
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Key Highlights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/30">
                  <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground/80">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-xs rounded-full border border-primary/20 text-primary/80"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm text-foreground/80 hover:border-primary/50 hover:text-foreground transition-all"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <Github className="w-4 h-4" /> Source
                </a>
              ) : null}
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary hover:bg-primary/20 transition-all"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ArchiveRow = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center gap-3 mb-8">
        <span
          className="text-xs tracking-[0.3em] uppercase text-primary font-medium"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          More Work
        </span>
        <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {archive.map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-2xl glass-card border border-border/50 flex flex-col justify-between hover:border-primary/30 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4
                  className="text-lg font-bold tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.title}
                </h4>
                <div className="flex items-center gap-2">
                  {item.github ? (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                      title="Source Code"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                  {item.live ? (
                    <a
                      href={item.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-6 leading-relaxed">{item.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/30">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[10px] rounded-full bg-secondary/50 text-muted-foreground border border-border/40"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mobile: vertical project cards
const MobileProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <section id="projects" className="relative py-20 px-6" ref={ref}>
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs tracking-[0.3em] uppercase text-primary font-medium"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            04 — Selected Work
          </span>
          <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Featured <span className="text-gradient">projects</span>
        </h2>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 border border-border/50 active:border-primary/30 transition-all cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {project.badge ? (
                <div className="mb-3">
                  <span
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold bg-primary/10 border border-primary/25 text-primary"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <Award className="w-3 h-3" />
                    {project.badge}
                  </span>
                </div>
              ) : null}

              <div className="flex items-start gap-4 mb-4">
                <span
                  className="text-4xl font-bold text-gradient leading-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {project.num}
                </span>
                <div className="flex-1 min-w-0">
                  {project.year ? (
                    <span
                      className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-0.5"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {project.year}
                    </span>
                  ) : null}
                  <h3 className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-primary font-medium">{project.subtitle}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground shrink-0" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>

              {/* Metric row on mobile card */}
              {project.metrics && project.metrics.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="px-2.5 py-1 rounded-xl bg-secondary/50 border border-border/40 text-xs flex items-baseline gap-1.5"
                    >
                      <span
                        className="font-bold text-gradient text-xs"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {m.value}
                      </span>
                      <span
                        className="text-[10px] text-muted-foreground"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full border border-border text-muted-foreground"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <ArchiveRow />
      </section>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  );
};

// Desktop: horizontal scroll layout
const DesktopProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 100}%`]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  return (
    <>
      <section id="projects" className="relative">
        <div ref={containerRef} className="relative" style={{ height: `${projects.length * 130}vh` }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            <motion.div
              className="absolute top-20 right-0 whitespace-nowrap pointer-events-none select-none z-0"
              style={{ x: bgX }}
            >
              <span
                className="text-[15vw] font-bold tracking-[-0.04em] text-stroke opacity-20"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                PROJECTS
              </span>
            </motion.div>

            <div className="absolute top-8 left-6 md:left-12 z-20">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs tracking-[0.3em] uppercase text-primary font-medium"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  04 — Selected Work
                </span>
                <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Featured <span className="text-gradient">projects</span>
              </h2>
            </div>

            <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 z-20">
              <div className="h-[2px] bg-border/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                />
              </div>
              <div className="flex justify-between mt-2">
                {projects.map((p) => (
                  <span
                    key={p.num}
                    className="text-xs text-muted-foreground"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {p.num}
                  </span>
                ))}
              </div>
            </div>

            <motion.div className="flex items-center h-full pt-24" style={{ x }}>
              {projects.map((project, i) => (
                <div
                  key={project.title}
                  className="min-w-[100vw] h-full flex items-center justify-center px-6 md:px-20"
                >
                  <motion.div
                    className="group relative w-full max-w-5xl rounded-3xl overflow-hidden glass-card hover:border-primary/30 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        projectGradients[i % projectGradients.length]
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    />
                    <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row md:items-center gap-10">
                      <span
                        className="text-8xl md:text-[10rem] font-bold text-stroke-primary group-hover:text-gradient transition-all duration-500 shrink-0 leading-none"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {project.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        {project.badge ? (
                          <div className="mb-2">
                            <span
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/25 text-primary"
                              style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                              <Award className="w-3.5 h-3.5" />
                              {project.badge}
                            </span>
                          </div>
                        ) : null}

                        <div className="flex items-center gap-3 mb-2">
                          <div>
                            {project.year ? (
                              <span
                                className="text-xs uppercase tracking-widest text-muted-foreground block mb-0.5"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                              >
                                {project.year}
                              </span>
                            ) : null}
                            <h3
                              className="text-3xl md:text-5xl font-bold tracking-tight"
                              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                              {project.title}
                            </h3>
                          </div>
                          <motion.div
                            className="w-10 h-10 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:border-primary/50 ml-auto"
                            whileHover={{ scale: 1.2 }}
                          >
                            <ArrowUpRight className="w-5 h-5 text-primary" />
                          </motion.div>
                        </div>

                        <p className="text-base text-primary mb-3 font-medium">{project.subtitle}</p>
                        <p className="text-sm md:text-base text-muted-foreground mb-5 leading-relaxed max-w-xl">
                          {project.description}
                        </p>

                        {/* Metric row on desktop card */}
                        {project.metrics && project.metrics.length > 0 ? (
                          <div className="flex flex-wrap gap-2.5 mb-5">
                            {project.metrics.map((m) => (
                              <div
                                key={m.label}
                                className="px-3.5 py-1.5 rounded-xl bg-secondary/50 border border-border/50 flex items-baseline gap-2"
                              >
                                <span
                                  className="font-bold text-gradient text-sm md:text-base"
                                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                  {m.value}
                                </span>
                                <span
                                  className="text-[11px] text-muted-foreground"
                                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                >
                                  {m.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : null}

                        <div className="flex flex-wrap gap-2.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3.5 py-1.5 text-xs rounded-full border border-border text-muted-foreground group-hover:border-primary/20 group-hover:text-foreground/70 transition-colors"
                              style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div
                          className="mt-6 flex items-center gap-2 text-xs text-muted-foreground/50 group-hover:text-primary/60 transition-colors"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          <span className="w-4 h-[1px] bg-current" /> Click to explore
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Small "More work" row after featured projects */}
        <ArchiveRow />
      </section>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  );
};

const ProjectsSection = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileProjectsSection /> : <DesktopProjectsSection />;
};

export default ProjectsSection;