import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    num: "01",
    title: "VisionX",
    subtitle: "Real-Time Object Detection for Space Stations",
    description: "Advanced object detection system using YOLOv8 and TensorRT for real-time monitoring in space station environments. Optimized for edge deployment with OpenCV integration.",
    tags: ["YOLOv8", "OpenCV", "TensorRT", "Python"],
  },
  {
    num: "02",
    title: "ResumeSnap",
    subtitle: "AI Resume Analyzer & Job Matching",
    description: "Intelligent resume parsing and job matching platform using NLP and OCR technologies. Built with Flask backend providing real-time analysis and recommendations.",
    tags: ["NLP", "OCR", "Flask", "Machine Learning"],
  },
  {
    num: "03",
    title: "Movie Recommender",
    subtitle: "Content-Based Recommendation System",
    description: "Content-based movie recommendation engine using Scikit-learn for feature extraction and similarity computation. Deployed with an interactive Streamlit interface.",
    tags: ["Scikit-learn", "Streamlit", "Python", "ML"],
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm text-primary font-mono tracking-widest mb-3">04 — PROJECTS</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Selected <span className="text-gradient">work</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              whileHover={{ x: 10 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                <span
                  className="text-5xl md:text-7xl font-bold text-muted/30 group-hover:text-primary/20 transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {project.num}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {project.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-primary mb-2">{project.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-4 max-w-xl">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
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
