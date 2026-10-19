import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Only enable Lenis smooth scroll on non-touch (desktop) devices
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  import("lenis").then(({ default: Lenis }) => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });
}

createRoot(document.getElementById("root")!).render(<App />);
