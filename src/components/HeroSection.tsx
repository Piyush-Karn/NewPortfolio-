import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown, Download } from "lucide-react";

const roles = ["AI/ML Engineer", "Software Developer", "Deep Learning Enthusiast", "Computer Vision Specialist"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-[120px]"
        style={{ background: "hsl(var(--primary))" }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-15 blur-[120px]"
        style={{ background: "hsl(var(--accent))" }}
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-sm md:text-base text-muted-foreground mb-4 tracking-[0.3em] uppercase font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Hello! I'm
          </motion.p>

          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              PIYUSH
            </motion.span>
            <motion.span
              className="block text-gradient"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              KUMAR
            </motion.span>
          </h1>

          {/* Role cycling */}
          <div className="h-8 md:h-10 overflow-hidden mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-lg md:text-xl text-primary font-medium"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:shadow-lg hover:shadow-primary/25 transition-shadow"
            >
              Get in Touch
            </motion.a>
            <motion.a
              href="/Piyush-Kumar-Resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:border-primary/50 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Resume
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
