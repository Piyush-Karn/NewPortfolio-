import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Trophy, Target } from "lucide-react";

const stats = [
  { icon: Brain, label: "AI/ML Focus", value: "2+ Years" },
  { icon: Trophy, label: "Hackathon", value: "Winner" },
  { icon: Target, label: "Model Accuracy", value: "95%+" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm text-primary font-mono tracking-widest mb-3">01 — ABOUT</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Crafting intelligent<br />
            <span className="text-gradient">solutions with AI</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed">
              Passionate AI/ML Developer with expertise in building intelligent systems using deep learning, 
              computer vision, and natural language processing. Skilled in developing and deploying machine 
              learning models with frameworks like TensorFlow, PyTorch, and YOLOv8.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently pursuing B.Tech in Computer Science at KCCITM, with hands-on experience in 
              real-time object detection, AI-powered resume analysis, and recommendation systems. 
              National-level hackathon winner with a drive for solving complex problems through AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
