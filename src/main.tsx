import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { startPauseOffscreen } from "@/lib/pauseOffscreen";

// Only enable Lenis smooth scroll on non-touch (desktop) devices
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  Promise.all([import("lenis"), import("framer-motion")]).then(([{ default: Lenis }, { frame }]) => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });
    // Drive Lenis from framer-motion's frame loop, so scroll and scroll-linked animations
    // update in the same frame. Same settings, so the scroll feels identical.
    frame.update(({ timestamp }) => lenis.raf(timestamp), true);
  });
}

createRoot(document.getElementById("root")!).render(<App />);

const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
if (idle) idle(startPauseOffscreen); else window.setTimeout(startPauseOffscreen, 1000);

