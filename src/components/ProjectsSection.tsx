import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="projects" className="relative py-32 px-6 md:px-12" ref={containerRef}>
      {/* Background text */}
      <motion.div
        className="absolute top-32 right-0 whitespace-nowrap pointer-events-none select-none"
        style={{ x: bgX }}
      >
        <span className="text-[12vw] font-bold tracking-[-0.04em] text-stroke opacity-20"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          PROJECTS
        </span>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
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
            04 — Selected Work
          </span>
          <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-20"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Featured <span className="text-gradient">projects</span>
        </motion.h2>

        {/* Project cards */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.7 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-3xl overflow-hidden glass-card hover:border-primary/30 transition-all cursor-pointer"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8">
                {/* Number */}
                <motion.span
                  className="text-6xl md:text-8xl font-bold text-stroke-primary group-hover:text-gradient transition-all duration-500 shrink-0"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  whileHover={{ scale: 1.1 }}
                >
                  {project.num}
                </motion.span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                    <motion.div
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:border-primary/50"
                      whileHover={{ scale: 1.2 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-primary mb-3 font-medium">{project.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed max-w-xl">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag}
                        className="px-3 py-1 text-xs rounded-full border border-border text-muted-foreground group-hover:border-primary/20 group-hover:text-foreground/70 transition-colors"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
