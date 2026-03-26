import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, X, Github, ExternalLink, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const projects = [
  {
    num: "01",
    title: "VisionX",
    subtitle: "Real-Time Object Detection for Space Stations",
    description: "Advanced object detection system using YOLOv8 and TensorRT for real-time monitoring in space station environments. Optimized for edge deployment with OpenCV integration.",
    longDescription: "VisionX leverages state-of-the-art computer vision to provide real-time object detection and tracking in space station environments. The system processes multiple camera feeds simultaneously, identifying anomalies, tracking crew movements, and monitoring equipment status. Built with a focus on edge deployment, it achieves 60+ FPS inference on NVIDIA Jetson devices while maintaining high accuracy across diverse lighting conditions.",
    tags: ["YOLOv8", "OpenCV", "TensorRT", "Python"],
    highlights: ["60+ FPS real-time inference", "Multi-camera feed processing", "Edge-optimized deployment", "Custom-trained on space station datasets"],
    gradient: "from-primary/20 to-accent/10",
    github: "https://github.com/Piyush-Karn/Visionx",
    live: "https://drive.google.com/file/d/1rEJLyOR0bcBAR9EdYqOND9v9tzY8BO5y/view",
    year: "2024",
  },
  {
    num: "02",
    title: "ResumeSnap",
    subtitle: "AI Resume Analyzer & Job Matching",
    description: "Intelligent resume parsing and job matching platform using NLP and OCR technologies. Built with Flask backend providing real-time analysis and recommendations.",
    longDescription: "ResumeSnap is an end-to-end AI-powered platform that transforms how job seekers optimize their resumes. Using advanced NLP techniques, it extracts key information from uploaded resumes, scores them against job descriptions, and provides actionable improvement suggestions. The OCR pipeline handles scanned documents and images, while the matching algorithm uses semantic similarity to find the best-fit positions.",
    tags: ["NLP", "OCR", "Flask", "Machine Learning"],
    highlights: ["Semantic job matching algorithm", "OCR for scanned documents", "ATS compatibility scoring", "Real-time improvement suggestions"],
    gradient: "from-accent/20 to-primary/10",
    github: "https://github.com/Piyush-Karn/resumesnap",
    live: "https://resumesnap.vercel.app/",
    year: "2024",
  },
  {
    num: "03",
    title: "Movie Recommender",
    subtitle: "Content-Based Recommendation System",
    description: "Content-based movie recommendation engine using Scikit-learn for feature extraction and similarity computation. Deployed with an interactive Streamlit interface.",
    longDescription: "A sophisticated recommendation engine that analyzes movie metadata including genres, cast, crew, keywords, and plot summaries to generate personalized suggestions. The system uses TF-IDF vectorization and cosine similarity to find movies with similar content profiles. Features an intuitive Streamlit interface where users can explore recommendations, view similarity scores, and discover new films based on their preferences.",
    tags: ["Scikit-learn", "Streamlit", "Python", "ML"],
    highlights: ["TF-IDF feature extraction", "Cosine similarity matching", "5000+ movie database", "Interactive exploration UI"],
    gradient: "from-primary/15 via-accent/10 to-transparent",
    github: "https://github.com/Piyush-Karn/Movie-Recommendation-System",
    live: "https://smartpicks-movie-recommender.streamlit.app/",
    year: "2023",
  },
];

type Project = typeof projects[number];

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card border border-border/50"
        initial={{ scale: 0.85, y: 60 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all">
          <X className="w-4 h-4 text-foreground" />
        </button>
        <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />
        <div className="p-8 md:p-12">
          <div className="flex items-start gap-6 mb-8">
            <span className="text-7xl md:text-8xl font-bold text-gradient leading-none shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.num}</span>
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{project.year}</span>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h3>
              <p className="text-primary font-medium">{project.subtitle}</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-10 text-base">{project.longDescription}</p>
          <div className="mb-10">
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Key Highlights</h4>
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
                <span key={tag} className="px-4 py-1.5 text-xs rounded-full border border-primary/20 text-primary/80" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{tag}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm text-foreground/80 hover:border-primary/50 hover:text-foreground transition-all" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <Github className="w-4 h-4" /> Source
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary hover:bg-primary/20 transition-all" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
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
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            04 — Selected Work
          </span>
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
              className="glass-card rounded-2xl p-6 border border-border/50 active:border-primary/30 transition-all"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl font-bold text-gradient leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.num}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h3>
                  <p className="text-sm text-primary font-medium">{project.subtitle}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground shrink-0" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full border border-border text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  );
};

// Desktop: original horizontal scroll layout
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
      <section id="projects" ref={containerRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div className="absolute top-20 right-0 whitespace-nowrap pointer-events-none select-none z-0" style={{ x: bgX }}>
            <span className="text-[15vw] font-bold tracking-[-0.04em] text-stroke opacity-20" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>PROJECTS</span>
          </motion.div>

          <div className="absolute top-8 left-6 md:left-12 z-20">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>04 — Selected Work</span>
              <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Featured <span className="text-gradient">projects</span>
            </h2>
          </div>

          <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 z-20">
            <div className="h-[2px] bg-border/30 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ scaleX: scrollYProgress, transformOrigin: "left" }} />
            </div>
            <div className="flex justify-between mt-2">
              {projects.map((p) => (
                <span key={p.num} className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.num}</span>
              ))}
            </div>
          </div>

          <motion.div className="flex items-center h-full pt-24" style={{ x }}>
            {projects.map((project) => (
              <div key={project.title} className="min-w-[100vw] h-full flex items-center justify-center px-6 md:px-20">
                <motion.div
                  className="group relative w-full max-w-5xl rounded-3xl overflow-hidden glass-card hover:border-primary/30 transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row md:items-center gap-10">
                    <span className="text-8xl md:text-[10rem] font-bold text-stroke-primary group-hover:text-gradient transition-all duration-500 shrink-0 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.num}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h3>
                        <motion.div className="w-10 h-10 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:border-primary/50" whileHover={{ scale: 1.2 }}>
                          <ArrowUpRight className="w-5 h-5 text-primary" />
                        </motion.div>
                      </div>
                      <p className="text-base text-primary mb-4 font-medium">{project.subtitle}</p>
                      <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-xl">{project.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-4 py-1.5 text-sm rounded-full border border-border text-muted-foreground group-hover:border-primary/20 group-hover:text-foreground/70 transition-colors" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{tag}</span>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground/50 group-hover:text-primary/60 transition-colors" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <span className="w-4 h-[1px] bg-current" /> Click to explore
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
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