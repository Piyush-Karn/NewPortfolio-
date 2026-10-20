import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Download, ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { profile, heroStats } from "@/data/portfolio";

const socialLinks = [
  { icon: Github, href: profile.github, label: "GitHub" },
  { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgTextX = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profile.roles.length);
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

  const firstName = profile.firstName;
  const lastName = profile.lastName;

  return (
    <section ref={containerRef} data-pik-section="hero" className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />

      {/* Large background text */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
        style={{ x: bgTextX, opacity: 0.03, fontFamily: "'Space Grotesk', sans-serif", willChange: "transform" }}
      >
        <span className="text-[20vw] font-bold tracking-[-0.05em] text-foreground">
          ENGINEER • CREATOR • BUILDER
        </span>
      </motion.div>

      {/* Floating orbs — hidden on mobile for performance */}
      <motion.div
        className="hidden md:block absolute w-[500px] h-[500px] rounded-full blur-[80px]"
        style={{ background: "hsl(var(--primary) / 0.15)", top: "10%", right: "5%", y: nameY, willChange: "transform" }}
      />
      <div
        className="hidden md:block absolute w-[300px] h-[300px] rounded-full blur-[60px]"
        style={{ background: "hsl(var(--accent) / 0.1)", bottom: "20%", left: "10%" }}
      />
      <div
        className="hidden md:block absolute w-[200px] h-[200px] rounded-full blur-[40px]"
        style={{ background: "hsl(var(--neon) / 0.08)", top: "40%", left: "50%" }}
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

      {/* Side social links - desktop */}
      <motion.div
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-5 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{ opacity }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-primary/30" />
        {socialLinks.map((social, i) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            data-pik-hover={social.label.toLowerCase()}
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full border border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 + i * 0.1 }}
          >
            <social.icon className="w-4 h-4" />
          </motion.a>
        ))}
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary/30 to-transparent" />
      </motion.div>

      <motion.div className="relative z-10 w-full px-6 md:px-12 lg:px-24" style={{ y: nameY, opacity, willChange: "transform, opacity" }}>
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

        {/* Name */}
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

        <div className="overflow-hidden mb-6">
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
                      {profile.roles[roleIndex]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Brief tagline */}
        <motion.p
          className="max-w-xl text-muted-foreground text-sm md:text-base leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs + Stats row */}
        <motion.div
          className="flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(var(--primary) / 0.3)" }}
            whileTap={{ scale: 0.95 }}
            data-pik-hover="contact"
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
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-pik-hover="resume"
            data-pik-click="resume"
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-primary/50 transition-all text-sm font-medium"
          >
            <Download className="w-4 h-4 text-primary group-hover:animate-bounce" />
            <span>Resume</span>
          </motion.a>

          {/* Stats divider + stats */}
          <div className="hidden md:flex items-center gap-8 ml-6 pl-8 border-l border-border/50">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-xl md:text-2xl font-bold text-gradient-static" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {stat.prefix}{stat.value}{stat.suffix}
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      {/* Decorative rotating text — CSS animation instead of JS */}
      <motion.div
        className="hidden lg:block absolute right-0 bottom-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <div data-anim-loop style={{ animation: "spin 20s linear infinite", willChange: "transform" }}>
          <svg width="120" height="120" viewBox="0 0 100 100" className="text-muted-foreground/20">
            <path id="textCircle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
            <text fontSize="10" fill="currentColor" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <textPath href="#textCircle">
                SCROLL DOWN • EXPLORE MORE • SCROLL DOWN •
              </textPath>
            </text>
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ExternalLink className="w-4 h-4 text-muted-foreground/30" />
        </div>
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
