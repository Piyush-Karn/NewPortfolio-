import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Brain, Trophy, Target, Sparkles, Code2, Cpu, GraduationCap, MapPin } from "lucide-react";

const stats = [
  { icon: Brain, label: "AI/ML Focus", value: "2+", unit: "Years" },
  { icon: Trophy, label: "Hackathon", value: "1st", unit: "Place" },
  { icon: Target, label: "Model Accuracy", value: "95", unit: "%+" },
];

const interests = [
  { icon: Cpu, text: "Deep Learning" },
  { icon: Code2, text: "Full-Stack Dev" },
  { icon: Brain, text: "Computer Vision" },
  { icon: Target, text: "NLP Systems" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Large background text */}
      <motion.div
        className="absolute top-20 whitespace-nowrap pointer-events-none select-none"
        style={{ x }}
      >
        <span className="text-[15vw] font-bold tracking-[-0.04em] text-stroke opacity-30"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          ABOUT ME
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-16"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            01 — About
          </span>
          <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left column - main text */}
          <div className="lg:col-span-7 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Crafting intelligent
              <br />
              <span className="text-gradient">solutions</span> with AI
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 max-w-xl"
            >
              <p className="text-muted-foreground leading-relaxed text-lg">
                Passionate AI/ML Developer with expertise in building intelligent systems using 
                deep learning, computer vision, and natural language processing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently pursuing B.Tech in Computer Science at KCCITM, with hands-on experience in 
                real-time object detection, AI-powered resume analysis, and recommendation systems. 
                National-level hackathon winner with a drive for solving complex problems through AI.
              </p>
            </motion.div>

            {/* Info pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">B.Tech CSE — KCCITM</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">India</span>
              </div>
            </motion.div>

            {/* Interest tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="pt-4"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Focused On
              </p>
              <div className="flex flex-wrap gap-3">
                {interests.map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-primary/40 bg-secondary/50 transition-all cursor-default"
                  >
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-sm font-medium text-foreground/80">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column - stats + visual */}
          <div className="lg:col-span-5 space-y-5">
            {/* Stats cards */}
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                whileHover={{ x: -5, scale: 1.02 }}
                className="group relative p-6 rounded-2xl glass-card hover:border-primary/30 transition-all cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gradient" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {stat.value}
                      </span>
                      <span className="text-lg font-medium text-foreground/60">{stat.unit}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decorative quote card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.7 }}
              style={{ y: parallaxY }}
              className="relative p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 overflow-hidden"
            >
              <div className="absolute -top-2 -left-1 text-6xl font-bold text-primary/10 leading-none" style={{ fontFamily: "Georgia, serif" }}>"</div>
              <p className="text-sm text-foreground/70 italic leading-relaxed pl-4 relative z-10">
                I believe the best way to predict the future is to build it — one model, one algorithm, one system at a time.
              </p>
              <div className="mt-4 flex items-center gap-3 pl-4">
                <div className="w-8 h-[1px] bg-primary/40" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary/60"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Piyush Kumar
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
