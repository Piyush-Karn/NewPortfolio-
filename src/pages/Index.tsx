import { useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

// Lazy load below-fold sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const TechStackSection = lazy(() => import("@/components/TechStackSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const AchievementsSection = lazy(() => import("@/components/AchievementsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const PikMascot = lazy(() => import("@/components/pik/PikMascot"));

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="noise-overlay">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Navbar />
            <HeroSection />

            <Suspense fallback={null}>
              <AboutSection />
              <TechStackSection />
              <ExperienceSection />
              <ProjectsSection />
              <AchievementsSection />
              <ContactSection />
            </Suspense>
            <Suspense fallback={null}><PikMascot /></Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
