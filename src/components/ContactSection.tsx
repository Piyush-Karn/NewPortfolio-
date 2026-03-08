import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Linkedin, Globe, ArrowUpRight, Send } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", value: "piyushkarn96@gmail.com", href: "mailto:piyushkarn96@gmail.com" },
  { icon: MapPin, label: "Location", value: "Noida, India", href: null },
  { icon: Linkedin, label: "LinkedIn", value: "piyushkumar-ai", href: "https://linkedin.com/in/piyushkumar-ai/" },
  { icon: Globe, label: "Portfolio", value: "aiwithpiyush.netlify.app", href: "https://aiwithpiyush.netlify.app" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 px-6 md:px-12" ref={ref}>
      {/* Background decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-bold tracking-[-0.04em] text-stroke opacity-10"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          SAY HI
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            07 — Contact
          </span>
          <span className="flex-1 h-[1px] bg-border max-w-[200px]" />
        </motion.div>

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
          className="text-lg text-muted-foreground max-w-lg mb-16"
        >
          I'm always open to new opportunities and collaborations. 
          Feel free to reach out!
        </motion.p>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mb-16">
          {links.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -3, x: 3 }}
            >
              {link.href ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl glass-card hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {link.label}
                    </p>
                    <p className="text-sm font-medium truncate">{link.value}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </a>
              ) : (
                <div className="flex items-center gap-4 p-5 rounded-2xl glass-card">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {link.label}
                    </p>
                    <p className="text-sm font-medium">{link.value}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="mailto:piyushkarn96@gmail.com"
            whileHover={{ scale: 1.05, boxShadow: "0 0 60px hsl(var(--primary) / 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:shadow-2xl transition-all group"
          >
            <Send className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Say Hello
          </motion.a>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="max-w-6xl mx-auto mt-32 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="text-sm text-muted-foreground">
          © 2026 Piyush Kumar. Built with passion & code
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <p className="text-sm text-muted-foreground"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Open to opportunities
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
