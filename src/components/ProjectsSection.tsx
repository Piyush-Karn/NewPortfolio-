import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    num: "01",
    title: "VisionX",
    subtitle: "Real-Time Object Detection for Space Stations",
    description: "Advanced object detection system using YOLOv8 and TensorRT for real-time monitoring in space station environments. Optimized for edge deployment with OpenCV integration.",
    tags: ["YOLOv8", "OpenCV", "TensorRT", "Python"],
    gradient: "from-primary/20 to-accent/10",
  },
  {
    num: "02",
    title: "ResumeSnap",
    subtitle: "AI Resume Analyzer & Job Matching",
    description: "Intelligent resume parsing and job matching platform using NLP and OCR technologies. Built with Flask backend providing real-time analysis and recommendations.",
    tags: ["NLP", "OCR", "Flask", "Machine Learning"],
    gradient: "from-accent/20 to-primary/10",
  },
  {
    num: "03",
    title: "Movie Recommender",
    subtitle: "Content-Based Recommendation System",
    description: "Content-based movie recommendation engine using Scikit-learn for feature extraction and similarity computation. Deployed with an interactive Streamlit interface.",
    tags: ["Scikit-learn", "Streamlit", "Python", "ML"],
    gradient: "from-primary/15 via-accent/10 to-transparent",
  },
];

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 100}%`]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  return (
    <section id="projects" ref={containerRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
      {/* Sticky horizontal scroller */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background text */}
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

        {/* Header pinned top-left */}
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

        {/* Progress bar */}
        <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 z-20">
          <div className="h-[2px] bg-border/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {projects.map((p, i) => (
              <motion.span
                key={p.num}
                className="text-xs text-muted-foreground"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  opacity: useTransform(scrollYProgress, [i / projects.length, (i + 0.5) / projects.length], [0.3, 1]),
                }}
              >
                {p.num}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Horizontal cards */}
        <motion.div
          className="flex items-center h-full pt-24"
          style={{ x }}
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="min-w-[100vw] h-full flex items-center justify-center px-6 md:px-20"
            >
              <motion.div
                className="group relative w-full max-w-5xl rounded-3xl overflow-hidden glass-card hover:border-primary/30 transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row md:items-center gap-10">
                  {/* Number */}
                  <motion.span
                    className="text-8xl md:text-[10rem] font-bold text-stroke-primary group-hover:text-gradient transition-all duration-500 shrink-0 leading-none"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {project.num}
                  </motion.span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h3
                        className="text-3xl md:text-5xl font-bold tracking-tight"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {project.title}
                      </h3>
                      <motion.div
                        className="w-10 h-10 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:border-primary/50"
                        whileHover={{ scale: 1.2 }}
                      >
                        <ArrowUpRight className="w-5 h-5 text-primary" />
                      </motion.div>
                    </div>
                    <p className="text-base text-primary mb-4 font-medium">{project.subtitle}</p>
                    <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-1.5 text-sm rounded-full border border-border text-muted-foreground group-hover:border-primary/20 group-hover:text-foreground/70 transition-colors"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
