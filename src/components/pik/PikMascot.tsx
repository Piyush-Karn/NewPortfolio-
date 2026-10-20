import { useEffect, useRef, useState } from "react";
import { Bot } from "lucide-react";
import { PikBrain } from "./pikBrain";

const HIDDEN_KEY = "pik.hidden";

function webglOk() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

const PikMascot = () => {
  const [hidden, setHidden] = useState(() => {
    try { return localStorage.getItem(HIDDEN_KEY) === "1"; } catch { return false; }
  });
  const [available] = useState(webglOk);
  const brainRef = useRef<PikBrain | null>(null);
  const hiddenRef = useRef(hidden);

  useEffect(() => {
    if (!available) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const docked = reduced || window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      const brain = new PikBrain(document.body, { docked, reduced, startHidden: hiddenRef.current });
      brainRef.current = brain;
      brain.start().catch((err) => {
        console.warn("[Pik] could not start", err);
        brain.destroy();
        brainRef.current = null;
      });
    };
    // Start when the browser is idle so Pik never competes with the page loading.
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const handle = w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 2500 }) : window.setTimeout(start, 1200);
    return () => {
      cancelled = true;
      if (w.cancelIdleCallback) w.cancelIdleCallback(handle); else window.clearTimeout(handle);
      brainRef.current?.destroy();
      brainRef.current = null;
    };
  }, [available]);

  useEffect(() => {
    hiddenRef.current = hidden;
    brainRef.current?.setHidden(hidden);
    try { localStorage.setItem(HIDDEN_KEY, hidden ? "1" : "0"); } catch { /* ignore */ }
  }, [hidden]);

  if (!available) return null;
  return (
    <button
      type="button"
      onClick={() => setHidden((h) => !h)}
      aria-label={hidden ? "Show Pik, the robot guide" : "Hide Pik, the robot guide"}
      title={hidden ? "Show Pik" : "Hide Pik"}
      className="fixed bottom-4 left-4 z-[61] w-9 h-9 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
    >
      <Bot className="w-4 h-4" />
    </button>
  );
};

export default PikMascot;
