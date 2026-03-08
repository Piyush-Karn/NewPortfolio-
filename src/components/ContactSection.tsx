import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Linkedin, Globe, ArrowUpRight, Send, Github, Sparkles, Clock, Coffee } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", value: "piyushkarn96@gmail.com", href: "mailto:piyushkarn96@gmail.com", color: "primary" },
  { icon: Linkedin, label: "LinkedIn", value: "piyushkumar-ai", href: "https://linkedin.com/in/piyushkumar-ai/", color: "primary" },
  { icon: Github, label: "GitHub", value: "github.com/piyush", href: "https://github.com/", color: "primary" },
  { icon: Globe, label: "Portfolio", value: "aiwithpiyush.netlify.app", href: "https://aiwithpiyush.netlify.app", color: "accent" },
];

const availability = [
  { icon: Coffee, text: "Open to freelance projects" },
  { icon: Clock, text: "Available for full-time roles" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 overflow-hidden" ref={ref}>
      {/* Background decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="text-[20vw] font-bold tracking-[-0.04em] text-stroke opacity-10"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          SAY HI
        </span>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)), hsl(var(--accent)), transparent)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span
            className="text-xs tracking-[0.3em] uppercase text-primary font-medium"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            06 — Contact
          </span>
          <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left: headline + CTA */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Let's build
              <br />
              <span className="text-gradient">something amazing</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-md mb-10 leading-relaxed"
            >
              I'm always open to new opportunities, collaborations, and interesting conversations about AI & tech.
            </motion.p>

            {/* Availability badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {availability.map((item, i) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-card text-sm"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Big CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="mailto:piyushkarn96@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-primary-foreground font-semibold text-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Send className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Say Hello
                </span>
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.a>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="mt-4 text-xs text-muted-foreground/60"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Typically responds within 24 hours
              </motion.p>
            </motion.div>
          </div>

          {/* Right: contact cards + location */}
          <div className="space-y-4">
            {/* Location card — large hero card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="relative p-8 rounded-3xl glass-card border-primary/10 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p
                    className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Based in
                  </p>
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Noida, India
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Open to remote & hybrid roles worldwide</p>
                </div>
              </div>
            </motion.div>

            {/* Contact link cards */}
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                whileHover={{ x: 6 }}
                className="group flex items-center gap-4 p-5 rounded-2xl glass-card hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] transition-all duration-300">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-0.5"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {link.label}
                  </p>
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors duration-300">
                    {link.value}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="max-w-6xl mx-auto mt-32 pt-8 border-t border-border"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Piyush Kumar. Built with passion & code
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p
                className="text-sm text-muted-foreground"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Open to opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <span
            className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/40"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Designed & Developed by Piyush
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
