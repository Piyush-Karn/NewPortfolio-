import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Linkedin,
  Globe,
  ArrowUpRight,
  Send,
  Github,
  Sparkles,
  Heart,
  Zap,
  Copy,
  Check,
} from "lucide-react";
import { profile } from "@/data/portfolio";

const links = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: "LinkedIn", value: profile.linkedinHandle, href: profile.linkedin },
  { icon: Github, label: "GitHub", value: profile.githubHandle, href: profile.github },
  { icon: Globe, label: "Portfolio", value: profile.portfolio.replace(/^https?:\/\//, ""), href: profile.portfolio },
];

const ContactSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" data-pik-section="contact" className="relative py-32 px-6 md:px-12 overflow-hidden" ref={containerRef}>
      {/* Background parallax text — hidden on mobile */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none">
        <span
          className="text-[18vw] font-bold tracking-[-0.04em] text-stroke opacity-15"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          LET'S CONNECT
        </span>
      </div>

      {/* Ambient orbs — hidden on mobile */}
      <div
        className="hidden md:block absolute top-20 right-10 w-[400px] h-[400px] rounded-full blur-[60px] opacity-10 pointer-events-none"
        style={{ background: "hsl(var(--primary))" }}
      />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span
            className="text-xs tracking-[0.3em] uppercase text-primary font-medium"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            06 — Get In Touch
          </span>
          <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[0.95]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Have an idea?
          <br />
          <span className="text-gradient">Let's talk.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mb-16 leading-relaxed"
        >
          Whether it's production systems, backend infrastructure, or AI architecture — I'd love to hear from you.
        </motion.p>

        {/* Email highlight card — the main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative rounded-3xl glass-card overflow-hidden mb-12 group"
        >
          <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)] transition-all duration-500">
                <Mail className="w-9 h-9 text-primary" />
              </div>
              <div>
                <p
                  className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Drop me a line
                </p>
                <p
                  className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={copyEmail}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-pik-hover="copy"
                data-pik-click="copy"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 text-sm font-medium transition-all"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </motion.button>

              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-pik-hover="email"
                data-pik-click="email"
                className="group/btn relative flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Send className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                  Send Email
                </span>
                <div className="absolute inset-0 bg-accent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-400" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {/* Location & Availability card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative p-7 rounded-2xl glass-card overflow-hidden group md:row-span-2 flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <p
                className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Location
              </p>
              <p className="text-xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {profile.location}
              </p>
            </div>

            {/* Availability status */}
            <div className="relative z-10 mt-auto pt-4 border-t border-border/50">
              <div className="flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0 mt-1" />
                <span className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {profile.availability}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Social link cards */}
          {links.slice(1).map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-pik-hover={link.label.toLowerCase()}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative p-6 rounded-2xl glass-card hover:border-primary/30 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] transition-all duration-300">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <p
                  className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {link.label}
                </p>
                <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors duration-300">
                  {link.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="overflow-hidden rounded-2xl glass-card py-4 mb-16"
        >
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
            {Array(4).fill(null).map((_, idx) => (
              <span key={idx} className="flex items-center gap-6 mr-6">
                {profile.roles.map((role) => (
                  <span key={`${idx}-${role}`} className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-primary/50" />
                    <span
                      className="text-sm text-muted-foreground/50 tracking-wider uppercase"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {role}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="max-w-7xl mx-auto pt-8 border-t border-border"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-12">
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            © 2026 {profile.name}. Built with <Heart className="w-3.5 h-3.5 text-accent inline" /> & code
          </p>
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/50 hover:text-primary transition-colors"
                title={link.label}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 px-6 md:px-12">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <span
            className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/30"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Designed & Developed by {profile.name}
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <div className="mt-2 flex items-center justify-center gap-3 px-6 md:px-12 pb-8">
          <span
            className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/30"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Pik's 3D model by AUTHOR (Sketchfab, LICENSE)
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
