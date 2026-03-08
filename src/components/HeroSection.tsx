import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Download, ArrowDown } from "lucide-react";

const roles = ["AI/ML Engineer", "Software Developer", "Deep Learning Enthusiast", "Computer Vision Specialist"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const letterVariants = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: (i: number) => ({
      y: 0, opacity: 1, rotateX: 0,
      transition: { delay: 0.5 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }),
  };

  const firstName = "PIYUSH";
  const lastName = "KUMAR";

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[200px]"
        style={{ background: "hsl(var(--primary) / 0.15)", top: "10%", right: "5%", y: nameY }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-[150px]"
        style={{ background: "hsl(var(--accent) / 0.1)", bottom: "20%", left: "10%" }}
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Decorative lines */}
      <motion.div
        className="absolute top-0 left-[15%] w-[1px] h-full"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.1), transparent)", opacity }}
      />
      <motion.div
        className="absolute top-0 right-[15%] w-[1px] h-full"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--accent) / 0.08), transparent)", opacity }}
      />

      <motion.div className="relative z-10 w-full px-6 md:px-12 lg:px-20" style={{ y: nameY, opacity }}>
        {/* Greeting */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-3">
            <span className="w-12 h-[1px] bg-primary" />
            <span className="text-sm tracking-[0.3em] uppercase text-primary font-medium"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Hello! I'm
            </span>
          </span>
        </motion.div>

        {/* Name - massive typography */}
        <div className="overflow-hidden mb-2">
          <div className="flex flex-wrap" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {firstName.split("").map((letter, i) => (
              <motion.span
                key={`first-${i}`}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="text-[12vw] md:text-[10vw] lg:text-[9vw] font-bold leading-[0.9] tracking-[-0.04em] inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden mb-8">
          <div className="flex flex-wrap items-end gap-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {lastName.split("").map((letter, i) => (
              <motion.span
                key={`last-${i}`}
                custom={i + firstName.length}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="text-[12vw] md:text-[10vw] lg:text-[9vw] font-bold leading-[0.9] tracking-[-0.04em] text-gradient inline-block"
              >
                {letter}
              </motion.span>
            ))}

            {/* Role badge inline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-[1.5vw] ml-2"
            >
              <div className="h-10 md:h-14 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="px-5 py-2 md:px-6 md:py-3 rounded-full glass-card"
                  >
                    <span className="text-xs md:text-sm font-medium text-primary whitespace-nowrap"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {roles[roleIndex]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom row - CTAs + decorative */}
        <motion.div
          className="flex flex-wrap items-center gap-6 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(var(--primary) / 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm overflow-hidden"
          >
            <span className="relative z-10">Get in Touch</span>
            <motion.div
              className="absolute inset-0 bg-accent"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="/Piyush-Kumar-Resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-primary/50 transition-all text-sm font-medium"
          >
            <Download className="w-4 h-4 text-primary group-hover:animate-bounce" />
            <span>Resume</span>
          </motion.a>

          {/* Decorative rotating text */}
          <motion.div
            className="hidden lg:block ml-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100" className="text-muted-foreground/30">
              <path id="textCircle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text fontSize="10" fill="currentColor" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <textPath href="#textCircle">
                  SCROLL DOWN • EXPLORE MORE • SCROLL DOWN •
                </textPath>
              </text>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity }}
      >
        <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
