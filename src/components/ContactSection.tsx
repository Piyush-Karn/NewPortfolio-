import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Linkedin, Globe, ArrowUpRight } from "lucide-react";

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
    <section id="contact" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-primary font-mono tracking-widest mb-3">07 — CONTACT</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Let's work <span className="text-gradient">together</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
          {links.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              {link.href ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{link.label}</p>
                    <p className="text-sm font-medium">{link.value}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ) : (
                <div className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{link.label}</p>
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
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <motion.a
            href="mailto:piyushkarn96@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:shadow-lg hover:shadow-primary/25 transition-shadow"
          >
            <Mail className="w-5 h-5" />
            Say Hello
          </motion.a>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="max-w-5xl mx-auto mt-32 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="text-sm text-muted-foreground">
          © 2026 Piyush Kumar. Built with ❤️
        </p>
        <p className="text-sm text-muted-foreground font-mono">
          piyushkumar.dev
        </p>
      </motion.div>
    </section>
  );
};

export default ContactSection;
