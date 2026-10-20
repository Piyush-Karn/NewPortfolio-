/**
 * Pauses infinite CSS animations while their element is off-screen.
 * Visible elements are untouched, so nothing looks different.
 */
const SELECTOR = ".text-gradient, .animate-pulse, [data-anim-loop]";

export function startPauseOffscreen() {
  const root = document.getElementById("root");
  if (!root || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) (e.target as HTMLElement).toggleAttribute("data-offscreen", !e.isIntersecting);
    },
    { rootMargin: "200px 0px" },
  );
  const seen = new WeakSet<Element>();
  const scan = () =>
    root.querySelectorAll(SELECTOR).forEach((el) => {
      if (!seen.has(el)) { seen.add(el); io.observe(el); }
    });
  let pending = 0;
  new MutationObserver(() => {
    if (!pending) pending = requestAnimationFrame(() => { pending = 0; scan(); });
  }).observe(root, { childList: true, subtree: true });
  scan();
}
