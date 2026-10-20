import { PikEngine } from "./pikEngine";
import type { Expr } from "./pikFace";
import { pickLine, registerVisit, type LineCtx } from "./pikLines";

type Token = { c: boolean };
interface Opts { docked: boolean; reduced: boolean; startHidden: boolean }

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const ease = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
const LABEL: Record<string, string> = {
  hero: "Home", about: "About", skills: "Skills", experience: "Experience",
  projects: "Projects", impact: "Impact", contact: "Contact", morework: "More Work",
};
const UNPROMPTED_GAP_MS = 7000;   // minimum gap before Pik speaks on his own again
const IDLE_CHAT_MS = 25000;       // chatter interval while the visitor is active
const SLEEP_AFTER_MS = 14000;

const BASE_SIZE = 180;
const DOCK_SIZE = 130;
const CONTENT_MAX = 1280; // the site's max-w-7xl content width

export class PikBrain {
  private root = document.createElement("div");
  private bot = document.createElement("div");
  private canvas = document.createElement("canvas");
  private bubble = document.createElement("div");
  private curtain = document.createElement("div");
  private curtainTitle = document.createElement("span");
  private engine: PikEngine;
  private renderSize: number;
  private heroMode: boolean;
  private cssScale = 1;
  private cssScaleTarget = 1;
  private heroSize: number;
  private vs = () => this.renderSize * this.cssScale; // Pik's visible box in px
  private modalOpen = false;
  private S = {
    x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0,
    anchor: null as null | { el: Element; ox: number; oy: number },
    expr: "happy" as Expr, exprUntil: 0, lookAt: null as Element | null,
    nodUntil: 0, hopUntil: 0, spinFrom: -1e9,
    sleeping: false, pushing: false, towing: false, boost: 1,
    cursor: null as null | { x: number; y: number }, lastInput: performance.now(),
    transit: false, pop: -1, popV: 0, popTarget: -1, hidden: true,
    lastTalk: 0, pokes: 0, pokeAt: 0,
  };
  private job = { prio: 0, tk: { c: true } as Token, done: true };
  private raf = 0;
  private last = 0;
  private zAt = 0;
  private destroyed = false;
  private startedAt = performance.now();
  private seen = new Set<string>();
  private current = "hero";
  private io?: IntersectionObserver;
  private mo?: MutationObserver;
  private observed = new WeakSet<Element>();
  private milestones = new Set<string>();
  private lastScrollY = window.scrollY;
  private lastScrollT = performance.now();
  private lastWarp = 0;
  private lastHover: Element | null = null;
  private lastHoverAt = 0;
  private skillLabel = "";
  private hiddenAt = 0;
  private typeTimer = 0;
  private hideTimer = 0;
  private bubbleW = 0;
  private bubbleH = 0;
  private cleanups: (() => void)[] = [];

  constructor(host: HTMLElement, private opts: Opts) {
    this.heroSize = Math.round(clamp(innerWidth * 0.22, 260, 440));
    this.heroMode = !opts.docked;
    this.renderSize = opts.docked ? DOCK_SIZE : this.heroSize;
    Object.assign(this.root.style, { position: "fixed", inset: "0", pointerEvents: "none", zIndex: "60", overflow: "hidden" });
    this.root.setAttribute("aria-hidden", "true");

    Object.assign(this.curtain.style, {
      position: "fixed", inset: "0", zIndex: "70", display: "flex", alignItems: "center", justifyContent: "center",
      background: "hsl(var(--card))", borderLeft: "2px solid hsl(var(--primary))", transform: "translateX(110vw)",
      pointerEvents: "none",
    });
    Object.assign(this.curtainTitle.style, {
      fontFamily: "'Space Grotesk', sans-serif", fontWeight: "700", fontSize: "clamp(40px, 8vw, 120px)",
      letterSpacing: "-0.04em", color: "hsl(var(--foreground))",
    });
    this.curtain.appendChild(this.curtainTitle);

    Object.assign(this.bubble.style, {
      position: "absolute", left: "0", top: "0", maxWidth: "260px", padding: "9px 13px", borderRadius: "14px",
      background: "hsl(var(--card) / 0.96)", border: "1px solid hsl(var(--primary) / 0.45)",
      color: "hsl(var(--foreground))", fontSize: "13px", lineHeight: "1.45", fontFamily: "'Syne', sans-serif",
      opacity: "0", transition: "opacity 0.18s ease", boxSizing: "border-box",
      boxShadow: "0 10px 30px -12px hsl(var(--primary) / 0.35)",
    });

    Object.assign(this.bot.style, {
      position: "absolute", left: "0", top: "0", width: `${this.renderSize}px`, height: `${this.renderSize}px`,
      pointerEvents: "auto", cursor: "pointer", willChange: "transform",
    });
    Object.assign(this.canvas.style, { width: `${this.renderSize}px`, height: `${this.renderSize}px`, display: "block" });
    this.bot.appendChild(this.canvas);
    this.root.append(this.bubble, this.bot);
    host.append(this.root, this.curtain);
    this.engine = new PikEngine(this.canvas, this.renderSize);
  }

  async start() {
    await this.engine.load("/models/pik.glb");
    if (this.destroyed) return;
    this.bind();
    this.raf = requestAnimationFrame(this.loop);
    if (this.opts.startHidden) { this.bot.style.pointerEvents = "none"; return; }
    this.intro();
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
    this.job.tk.c = true;
    this.cleanups.forEach((f) => f());
    this.io?.disconnect();
    this.mo?.disconnect();
    clearInterval(this.typeTimer);
    clearTimeout(this.hideTimer);
    document.querySelector("[data-pik-out]")?.removeAttribute("data-pik-out");
    this.root.remove();
    this.curtain.remove();
    this.engine.dispose();
  }

  setHidden(h: boolean) {
    const S = this.S;
    if (h === S.hidden) return;
    if (h) {
      this.say("hidden", {}, { force: true });
      window.setTimeout(() => {
        S.hidden = true; S.popTarget = -1;
        this.bot.style.pointerEvents = "none";
        this.bubble.style.opacity = "0";
      }, 1400);
    } else {
      S.hidden = false; S.popTarget = 0;
      this.bot.style.pointerEvents = "auto";
      const p = this.home(); S.x = S.tx = p.x; S.y = S.ty = p.y;
      this.say("shown", {}, { force: true });
    }
  }

  /* ---------- helpers ---------- */
  private gutter() { return (innerWidth - CONTENT_MAX) / 2; }
  private heroSpot() { return { x: innerWidth * 0.75, y: innerHeight * 0.52 }; }
  private home() {
    if (this.opts.docked) return { x: innerWidth - this.vs() * 0.45, y: innerHeight - this.vs() * 0.5 };
    if (this.heroMode) return this.heroSpot();
    const g = this.gutter();
    return { x: g > this.vs() * 0.75 ? innerWidth - g / 2 : innerWidth * 0.82, y: innerHeight * 0.42 };
  }
  /** Leaves the big hero pose and shrinks to normal size. */
  private endHero() {
    if (!this.heroMode) return;
    this.heroMode = false;
    this.cssScaleTarget = BASE_SIZE / this.heroSize;
    if (this.job.done && !this.S.anchor) { const h = this.home(); this.S.tx = h.x; this.S.ty = h.y; }
  }
  /** A spot beside an element, never on top of it: right, left, then above or below the card. */
  private spotNear(el: Element) {
    const r = el.getBoundingClientRect();
    const m = this.vs() * 0.38;
    const cy = clamp(r.top + Math.min(r.height / 2, 120), 110, innerHeight - m);
    const cands = [
      { x: r.right + m, y: cy },
      { x: r.left - m, y: cy },
      { x: r.right - m, y: r.top - m },
      { x: r.right - m, y: r.bottom + m },
    ];
    const ok = (p: { x: number; y: number }) => p.x >= m && p.x <= innerWidth - m && p.y >= 100 && p.y <= innerHeight - m;
    return cands.find(ok) || { x: clamp(r.right + m, m, innerWidth - m), y: clamp(r.top - m, 110, innerHeight - m) };
  }

  private setExpr(e: Expr, ms = 0) { this.S.expr = e; this.S.exprUntil = ms ? performance.now() + ms : 0; }
  private wait(ms: number, tk: Token) {
    return new Promise<void>((res, rej) => window.setTimeout(() => (tk.c ? rej(0) : res()), this.opts.reduced ? Math.min(ms, 60) : ms));
  }
  private run(prio: number, fn: (tk: Token) => Promise<void>) {
    if (!this.engine.ready || this.S.hidden) return false;
    if (!this.job.done && this.job.prio > prio) return false;
    this.job.tk.c = true;
    const tk: Token = { c: false };
    const job = { prio, tk, done: false };
    this.job = job;
    fn(tk).catch(() => {}).finally(() => {
      job.done = true;
      if (this.job === job) {
        const S = this.S;
        S.pushing = false; S.towing = false; S.boost = 1; S.lookAt = null;
        if (S.transit) { S.transit = false; this.curtain.style.transform = "translateX(110vw)"; }
      }
    });
    return true;
  }
  private flyTo(x: number, y: number, tk: Token, el?: Element | null) {
    const S = this.S;
    const m = this.vs() * 0.45;
    S.tx = clamp(x, m, innerWidth - m);
    S.ty = clamp(y, 96, innerHeight - m);
    if (el) { const r = el.getBoundingClientRect(); S.anchor = { el, ox: S.tx - r.left, oy: S.ty - r.top }; }
    else S.anchor = null;
    if (this.opts.docked) return Promise.resolve();
    if (this.opts.reduced) { S.x = S.tx; S.y = S.ty; return Promise.resolve(); }
    return new Promise<void>((res, rej) => {
      const chk = () => {
        if (tk.c) return rej(0);
        if (Math.hypot(S.tx - S.x, S.ty - S.y) < 4 && Math.hypot(S.vx, S.vy) < 0.7) return res();
        requestAnimationFrame(chk);
      };
      chk();
    });
  }
  private tween(ms: number, fn: (p: number) => void, tk: Token) {
    return new Promise<void>((res, rej) => {
      const t0 = performance.now();
      const step = (t: number) => {
        if (tk.c) return rej(0);
        const p = Math.min(1, (t - t0) / (this.opts.reduced ? 1 : ms));
        fn(p);
        if (p < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
  }

  private sayOr(cat: string, fallback: string | undefined, ctx: LineCtx) {
    const line = pickLine(cat, ctx, fallback);
    if (!line) return;
    this.showLine(line);
  }

  private showLine(line: { text: string; expr?: Expr }) {
    this.S.lastTalk = performance.now();
    if (line.expr) this.setExpr(line.expr, 3200);
    const b = this.bubble;
    clearInterval(this.typeTimer);
    clearTimeout(this.hideTimer);
    b.style.width = "";
    b.textContent = line.text;
    this.bubbleW = Math.min(260, b.scrollWidth + 28);
    b.style.width = `${this.bubbleW}px`;
    this.bubbleH = b.offsetHeight;
    b.style.opacity = "1";
    if (this.opts.reduced) b.textContent = line.text;
    else {
      let i = 0;
      b.textContent = "";
      this.typeTimer = window.setInterval(() => {
        i += 2;
        b.textContent = line.text.slice(0, i);
        if (i >= line.text.length) clearInterval(this.typeTimer);
      }, 26);
    }
    this.hideTimer = window.setTimeout(() => { b.style.opacity = "0"; }, Math.max(3000, line.text.length * 65));
  }

  /** Shows a line from a category. Unprompted lines respect a minimum gap; forced lines don't. */
  private say(cat: string, ctx: LineCtx = {}, o: { force?: boolean } = {}) {
    const now = performance.now();
    if (!o.force && now - this.S.lastTalk < UNPROMPTED_GAP_MS) return false;
    const line = pickLine(cat, ctx);
    if (!line) return false;
    this.showLine(line);
    return true;
  }
  private particle(x: number, y: number, text: string | null, anim: Keyframe[], ms: number) {
    const p = document.createElement("div");
    Object.assign(p.style, {
      position: "absolute", left: `${x}px`, top: `${y}px`, pointerEvents: "none",
      ...(text
        ? { font: "500 13px 'JetBrains Mono', monospace", color: "hsl(var(--primary))" }
        : { width: "6px", height: "6px", borderRadius: "50%", background: "hsl(var(--primary))" }),
    });
    if (text) p.textContent = text;
    this.root.appendChild(p);
    p.animate(anim, { duration: ms, easing: "cubic-bezier(.2,.8,.2,1)" }).onfinish = () => p.remove();
  }
  private poof(x: number, y: number, n = 10) {
    if (this.opts.reduced) return;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 24 + Math.random() * 30;
      this.particle(x - 3, y - 3, null, [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: `translate(${Math.cos(a) * r}px,${Math.sin(a) * r}px) scale(.2)`, opacity: 0 },
      ], 540);
    }
  }

  /* ---------- intro ---------- */
  private intro() {
    const S = this.S;
    const dot = document.querySelector('[data-pik="logo-dot"]') as HTMLElement | null;
    S.hidden = false;
    S.popTarget = 0;
    this.setExpr("happy");
    if (this.opts.docked || !dot) {
      const p = this.home(); S.x = S.tx = p.x; S.y = S.ty = p.y;
      this.greet();
      return;
    }
    const r = dot.getBoundingClientRect();
    S.x = S.tx = r.left + r.width / 2;
    S.y = S.ty = r.top + r.height / 2;
    dot.setAttribute("data-pik-out", "");
    this.poof(S.x, S.y, 10);
    this.run(1, async (tk) => {
      this.setExpr("happy");
      const h = this.home();
      await this.flyTo(h.x, h.y, tk);
      S.nodUntil = performance.now() + 900;
      this.greet();
    });
  }
  private greet() {
    this.setExpr("happy", 5000);
    const h = new Date().getHours();
    const part = h < 5 ? "night" : h < 12 ? "morning" : h < 17 ? "afternoon" : h < 22 ? "evening" : "night";
    this.say(`greet.${part}`, {}, { force: true });
    const v = registerVisit();
    window.setTimeout(() => {
      if (!this.destroyed && !this.S.hidden) this.say(v > 1 ? "greet.return" : "greet.first", { visits: String(v) }, { force: true });
    }, 3800);
  }

  /* ---------- events ---------- */
  private bind() {
    const on = (t: EventTarget, ev: string, fn: EventListener, o?: AddEventListenerOptions | boolean) => {
      t.addEventListener(ev, fn, o);
      this.cleanups.push(() => t.removeEventListener(ev, fn, o));
    };
    on(window, "pointermove", this.onMove as EventListener, { passive: true });
    on(document, "pointerover", this.onOver as EventListener, { passive: true });
    on(document, "click", this.onClickAny as EventListener, true);
    on(window, "scroll", this.onScroll, { passive: true });
    on(document, "visibilitychange", this.onVis);
    on(window, "pik:navigate", this.onNavigate as EventListener);
    on(window, "pik:skills-change", this.onSkills as EventListener);
    on(window, "pik:modal", this.onModal as EventListener);
    on(this.bot, "click", this.onPoke);
    this.observeSections();
  }

  private observeSections() {
    this.io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) this.onSection((en.target as HTMLElement).dataset.pikSection || "hero");
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    const scan = () => document.querySelectorAll("[data-pik-section]").forEach((el) => {
      if (!this.observed.has(el)) { this.observed.add(el); this.io!.observe(el); }
    });
    scan();
    // Sections are lazy-loaded, so watch for new ones.
    this.mo = new MutationObserver(scan);
    this.mo.observe(document.body, { childList: true, subtree: true });
  }

  private onMove = (e: PointerEvent) => {
    this.S.cursor = { x: e.clientX, y: e.clientY };
    this.S.lastInput = performance.now();
    if (this.S.sleeping) this.wake();
  };

  private onOver = (e: PointerEvent) => {
    const el = (e.target as Element)?.closest?.("[data-pik-hover]");
    if (!el || this.S.hidden || !this.engine.ready) return;
    this.endHero();
    const now = performance.now();
    if (el === this.lastHover && now - this.lastHoverAt < 6000) return;
    this.lastHover = el;
    this.lastHoverAt = now;
    const key = el.getAttribute("data-pik-hover") || "";
    const title = el.getAttribute("data-pik-title") || "";
    const sl = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    let cat = `hover.${key}`;
    let fallback: string | undefined;
    const ctx: LineCtx = {};
    let light = false; // small items: look and talk, don't fly over
    if (key.startsWith("project:")) { ctx.title = title || key.slice(8); cat = Math.random() < 0.55 ? `project.${key.slice(8)}` : "hover.project"; fallback = "hover.project"; }
    else if (key.startsWith("impact:")) { cat = Math.random() < 0.8 ? `impact.${key.slice(7)}` : "hover.impact"; fallback = "hover.impact"; }
    else if (key.startsWith("exp:")) cat = `exp.${key.slice(4)}`;
    else if (key.startsWith("archive:")) { cat = `archive.${key.slice(8)}`; fallback = "section.morework"; }
    else if (key.startsWith("skillcat:")) { ctx.category = title; cat = `skillcat.${key.slice(9)}`; light = true; }
    else if (key.startsWith("skill:")) { ctx.skill = key.slice(6); cat = Math.random() < 0.65 ? `skill.${sl(ctx.skill)}` : "hover.skill"; fallback = "hover.skill"; light = true; }
    else if (key.startsWith("tag:")) { ctx.tag = key.slice(4); ctx.skill = ctx.tag; cat = `skill.${sl(ctx.tag)}`; fallback = "hover.tag"; light = true; }
    else if (key.startsWith("role:")) { ctx.role = key.slice(5); cat = "hover.role"; light = true; }
    else if (key.startsWith("stat:")) { ctx.stat = title; cat = "hover.stat"; light = true; }
    const expr: Expr = key === "hire" || key === "email" ? "love" : "happy";

    if (this.opts.docked || light || this.modalOpen) {
      if (light && now - this.S.lastTalk < 2500) return;
      this.S.lookAt = el;
      window.setTimeout(() => { if (this.S.lookAt === el && this.job.done) this.S.lookAt = null; }, 2600);
      this.setExpr(expr, 2600);
      this.sayOr(cat, fallback, ctx);
      return;
    }
    this.run(2, async (tk) => {
      this.S.sleeping = false;
      const p = this.spotNear(el);
      await this.flyTo(p.x, p.y, tk, el);
      this.S.lookAt = el;
      this.S.nodUntil = performance.now() + 800;
      this.setExpr(expr, 2800);
      this.sayOr(cat, fallback, ctx);
      await this.wait(2600, tk);
    });
  };

  private onClickAny = (e: MouseEvent) => {
    const el = (e.target as Element)?.closest?.("[data-pik-click]");
    if (!el || this.S.hidden) return;
    this.endHero();
    const key = el.getAttribute("data-pik-click") || "";
    const expr: Expr = key === "theme" ? "surprised" : key === "copy" ? "happy" : "love";
    this.setExpr(expr, 2600);
    this.say(`click.${key}`, {}, { force: true });
  };

  private onScroll = () => {
    const now = performance.now();
    const v = Math.abs(window.scrollY - this.lastScrollY) / Math.max(1, now - this.lastScrollT);
    this.lastScrollY = window.scrollY;
    this.lastScrollT = now;
    if (window.scrollY > 40) this.endHero();
    this.S.lastInput = now;
    if (this.S.sleeping) this.wake();
    if (!this.milestones.has("bottom") && innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300) {
      this.milestones.add("bottom");
      this.say("bottom");
    }
    if (this.S.transit || this.opts.docked || this.S.hidden) return;
    if (v > 4.5 && now - this.lastWarp > 6000) {
      this.lastWarp = now;
      this.run(3, async (tk) => {
        const S = this.S;
        S.sleeping = false;
        S.anchor = null;
        this.poof(S.x, S.y, 12);
        S.popTarget = -1;
        await this.wait(240, tk);
        const h = this.home();
        S.x = S.tx = h.x; S.y = S.ty = h.y; S.vx = S.vy = 0;
        this.poof(S.x, S.y, 12);
        S.popTarget = 0;
        this.setExpr("surprised", 1400);
        this.say("fast", {}, { force: true });
        await this.wait(900, tk);
      });
    }
  };

  private onVis = () => {
    const now = performance.now();
    if (document.hidden) { this.hiddenAt = now; return; }
    this.last = 0;
    if (this.hiddenAt && now - this.hiddenAt > 20000 && !this.S.hidden) this.say("tabReturn", {}, { force: true });
  };

  private onNavigate = (e: CustomEvent<{ id: string; label?: string }>) => {
    if (this.opts.docked || this.opts.reduced || !this.engine.ready || this.S.hidden) return;
    const { id } = e.detail;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault(); // Pik takes over the scroll
    this.endHero();
    const label = e.detail.label || LABEL[id] || id;
    this.run(4, async (tk) => {
      const S = this.S;
      S.transit = true; S.sleeping = false; S.anchor = null;
      this.curtainTitle.textContent = label;
      this.curtain.style.transform = `translateX(${innerWidth + 20}px)`;
      S.x = S.tx = innerWidth + 110; S.y = S.ty = innerHeight * 0.5; S.vx = S.vy = 0;
      S.towing = true; S.boost = 1.6;
      this.setExpr("cool");
      this.say("curtain", { section: label }, { force: true });
      try {
        await this.tween(950, (p) => { const k = 1 - Math.pow(1 - p, 2); S.x = S.tx = innerWidth + 110 - (innerWidth + 50) * k; }, tk);
      } finally { S.towing = false; S.boost = 1; }
      this.curtain.style.transform = "translateX(0)";
      target.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
      this.setExpr("happy", 1200);
      await this.wait(420, tk);
      const a = this.curtain.animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(${-innerWidth - 20}px)` }],
        { duration: 460, easing: "cubic-bezier(.6,0,.4,1)", fill: "forwards" },
      );
      await this.wait(470, tk);
      a.cancel();
      this.curtain.style.transform = "translateX(110vw)";
      S.transit = false;
      this.current = id;
      const first = !this.seen.has(id);
      this.seen.add(id);
      if (first) await this.sectionScript(id)(tk);
      else { const h = this.home(); await this.flyTo(h.x, h.y, tk); }
    });
  };

  private onSkills = (e: CustomEvent<{ index: number; id: string; label: string }>) => {
    this.skillLabel = e.detail.label;
    if (this.opts.docked || this.current !== "skills" || !this.job.done || this.S.pushing || this.S.hidden) return;
    // Visitor scrolled to a new category: a small nudge, and sometimes a comment.
    this.S.pushing = true;
    window.setTimeout(() => { this.S.pushing = false; }, 450);
    if (Math.random() < 0.75) this.say("skills.scroll", { category: e.detail.label }, { force: performance.now() - this.S.lastTalk > 2500 });
  };

  private onModal = (e: CustomEvent<{ open: boolean; slug: string; title: string }>) => {
    this.modalOpen = e.detail.open;
    if (!e.detail.open || this.S.hidden) return;
    this.endHero();
    this.run(3, async (tk) => {
      await this.wait(350, tk); // let the popup animate in
      const panel = document.querySelector('[data-pik-anchor="project-modal"]');
      if (panel && !this.opts.docked) { const p = this.spotNear(panel); await this.flyTo(p.x, p.y, tk); }
      this.setExpr("love", 3000);
      this.sayOr(`project.${e.detail.slug}`, "modal.open", { title: e.detail.title });
    });
  };

  private onPoke = () => {
    const S = this.S;
    const now = performance.now();
    S.lastInput = now;
    S.pokes = now - S.pokeAt < 10000 ? S.pokes + 1 : 1;
    S.pokeAt = now;
    if (!this.opts.docked && this.current === "skills") { this.run(2, (tk) => this.pushCards(tk)); return; }
    S.sleeping = false;
    S.spinFrom = now;
    this.say(S.pokes >= 5 ? "pokeMany" : "poke", {}, { force: true });
  };

  private wake() {
    const S = this.S;
    S.sleeping = false;
    S.lastInput = performance.now();
    this.setExpr("surprised", 1200);
    this.say("wake", {}, { force: true });
    S.vy = -9;
  }

  /* ---------- sections ---------- */
  private onSection(id: string) {
    if (this.modalOpen) return;
    this.current = id;
    if (this.S.transit || this.S.hidden || !this.engine.ready) return;
    const first = !this.seen.has(id);
    this.seen.add(id);
    if (id === "hero" && first) return; // the intro covers the hero
    if (this.opts.docked) {
      if (first) this.say(`section.${id}`);
      else if (Math.random() < 0.3) this.say(`section.${id}.more`);
      return;
    }
    if (first) this.run(1, this.sectionScript(id));
    else if (Math.random() < 0.4) this.say(`section.${id}.more`);
  }

  private sectionScript(id: string): (tk: Token) => Promise<void> {
    const q = (sel: string) => document.querySelector(sel) as HTMLElement | null;
    const near = async (el: HTMLElement | null, tk: Token) => {
      if (!el) return;
      const p = this.spotNear(el);
      await this.flyTo(p.x, p.y, tk, el);
    };
    switch (id) {
      case "about":
        return async (tk) => { await near(q('[data-pik-anchor="about-stats"]'), tk); this.say("section.about", {}, { force: true }); };
      case "skills":
        return async (tk) => { this.say("section.skills", {}, { force: true }); await this.wait(1200, tk); await this.pushCards(tk); };
      case "experience":
        return async (tk) => { await near(q('[data-pik-anchor="exp-card"]'), tk); this.setExpr("cool", 3000); this.say("section.experience", {}, { force: true }); };
      case "projects":
        return async (tk) => { const h = this.home(); await this.flyTo(h.x, innerHeight * 0.3, tk); this.S.hopUntil = performance.now() + 1200; this.say("section.projects", {}, { force: true }); };
      case "impact":
        return async (tk) => { await near(q('[data-pik-anchor="impact-card"]'), tk); this.say("section.impact", {}, { force: true }); };
      case "morework":
        return async (tk) => { await near(q('[data-pik-hover^="archive:"]'), tk); this.say("section.morework", {}, { force: true }); };
      case "contact":
        return async (tk) => {
          const b = q('[data-pik-hover="email"]');
          if (b) { const r = b.getBoundingClientRect(); await this.flyTo(r.left - 90, r.top + r.height / 2, tk, b); this.S.lookAt = b; }
          this.say("section.contact", {}, { force: true });
          await this.wait(2600, tk);
        };
      default:
        return async (tk) => { const h = this.home(); await this.flyTo(h.x, h.y, tk); this.say("section.hero", {}, { force: true }); };
    }
  }

  private async pushCards(tk: Token) {
    if (this.opts.docked) return;
    const grid = document.querySelector('[data-pik-anchor="skills-grid"]') as HTMLElement | null;
    if (!grid) return;
    const r = grid.getBoundingClientRect();
    if (r.bottom < 80 || r.top > innerHeight - 80) return;
    const S = this.S;
    this.setExpr("thinking");
    await this.flyTo(Math.min(r.right + 70, innerWidth - 90), r.top + Math.min(r.height / 2, 140), tk, grid);
    this.setExpr("cool");
    S.pushing = true;
    S.boost = 1.6;
    await this.wait(250, tk);
    const x0 = S.tx;
    await this.tween(1100, (p) => {
      S.tx = x0 - 140 * ease(p);
      if (S.anchor) S.anchor.ox = S.tx - S.anchor.el.getBoundingClientRect().left;
    }, tk);
    S.pushing = false;
    S.boost = 1;
    window.dispatchEvent(new CustomEvent("pik:skills-next"));
    S.hopUntil = performance.now() + 700;
    await this.wait(300, tk); // let the section report the new category
    this.setExpr("happy", 2000);
    this.say("skills.push", { category: this.skillLabel || "the next set" }, { force: true });
    await this.flyTo(x0, S.ty, tk, grid);
  }

  /* ---------- frame loop ---------- */
  private loop = (t: number) => {
    if (this.destroyed) return;
    this.raf = requestAnimationFrame(this.loop);
    if (document.hidden) { this.last = t; return; }
    const dt = Math.min(40, t - (this.last || t));
    const k = dt / 16;
    this.last = t;
    const S = this.S;

    if (S.exprUntil && t > S.exprUntil) { S.expr = "idle"; S.exprUntil = 0; }

    if (S.anchor && !S.transit) {
      const r = S.anchor.el.getBoundingClientRect();
      if (r.bottom < 60 || r.top > innerHeight - 40) {
        S.anchor = null;
        if (this.job.done) { const h = this.home(); S.tx = h.x; S.ty = h.y; }
      } else { S.tx = r.left + S.anchor.ox; S.ty = r.top + S.anchor.oy; }
    }

    const idle = this.job.done && !S.anchor && !S.transit && !S.hidden;
    if (this.opts.docked) { const d = this.home(); S.tx = d.x; S.ty = d.y; }
    else if (idle) {
      if (this.heroMode) { const h = this.heroSpot(); S.tx = h.x; S.ty = h.y; }
      else if (this.modalOpen) { /* stay beside the popup */ }
      else if (S.sleeping) S.ty = innerHeight - this.vs() * 0.45;
      else if (S.cursor && t - S.lastInput < 6000) {
        const g = this.gutter();
        const m = this.vs() * 0.45;
        if (g > this.vs() * 0.75) { S.tx = innerWidth - g / 2; S.ty = clamp(S.cursor.y - 40, 110, innerHeight - m); }
        else {
          const side = S.cursor.x > innerWidth - 260 ? -1 : 1;
          S.tx = clamp(S.cursor.x + side * 150, m, innerWidth - m);
          S.ty = clamp(S.cursor.y - 40, 110, innerHeight - m);
        }
      }
    }
    if (idle && !S.sleeping && t - S.lastInput > SLEEP_AFTER_MS) { S.sleeping = true; this.say("sleep", {}, { force: true }); }
    if (idle && !S.sleeping && t - S.lastTalk > IDLE_CHAT_MS && t - S.lastInput < 8000) {
      this.say(Math.random() < 0.5 ? `section.${this.current}.more` : "idle") || this.say("idle");
    }

    const onPage = t - this.startedAt;
    if (onPage > 120000 && !this.milestones.has("2m")) { this.milestones.add("2m"); this.say("time.2m"); }
    if (onPage > 300000 && !this.milestones.has("5m")) { this.milestones.add("5m"); this.say("time.5m"); }

    if (this.opts.reduced) { S.x = S.tx; S.y = S.ty; S.vx = S.vy = 0; }
    else {
      S.vx = (S.vx + (S.tx - S.x) * 0.05 * k) * Math.pow(0.82, k);
      S.vy = (S.vy + (S.ty - S.y) * 0.05 * k) * Math.pow(0.82, k);
      S.x += S.vx * k;
      S.y += S.vy * k;
    }
    S.popV += (S.popTarget - S.pop) * 0.25;
    S.popV *= 0.62;
    S.pop += S.popV;
    if (S.towing) this.curtain.style.transform = `translateX(${Math.max(0, S.x + 55)}px)`;

    if (S.sleeping && t > this.zAt && !this.opts.reduced) {
      this.zAt = t + 1100;
      this.particle(S.x + 34, S.y - 50, "z", [
        { transform: "translate(0,0) scale(.7)", opacity: 0 },
        { opacity: 1, offset: 0.3 },
        { transform: "translate(16px,-30px) scale(1.2)", opacity: 0 },
      ], 1600);
    }

    this.cssScale += (this.cssScaleTarget - this.cssScale) * (this.opts.reduced ? 1 : Math.min(1, 0.12 * k));
    if (!this.heroMode && !this.opts.docked && this.renderSize !== BASE_SIZE && Math.abs(this.cssScale - this.cssScaleTarget) < 0.01) {
      this.engine.resize(BASE_SIZE);
      this.renderSize = BASE_SIZE;
      this.cssScale = this.cssScaleTarget = 1;
      [this.bot, this.canvas].forEach((n) => { n.style.width = n.style.height = `${BASE_SIZE}px`; });
    }

    this.bot.style.transform = `translate3d(${S.x - this.renderSize / 2}px,${S.y - this.renderSize / 2}px,0) scale(${this.cssScale})`;
    if (this.bubble.style.opacity === "1") {
      const left = clamp(S.x - this.bubbleW / 2, 8, innerWidth - this.bubbleW - 8);
      let top = S.y - this.vs() * 0.36 - this.bubbleH;
      if (top < 72) top = S.y + this.vs() * 0.38;
      this.bubble.style.transform = `translate3d(${left}px,${top}px,0)`;
    }

    if (S.hidden && S.pop < -0.98) return; // fully hidden: skip rendering

    let lx = 0, ly = 0;
    let target: { x: number; y: number } | null = S.cursor;
    if (S.lookAt) { const r = S.lookAt.getBoundingClientRect(); target = { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
    if (target) { lx = clamp((target.x - S.x) / 260, -1, 1); ly = clamp((target.y - S.y) / 260, -1, 1); }
    const spinP = t - S.spinFrom < 900 && !this.opts.reduced ? (t - S.spinFrom) / 900 : 0;
    this.engine.render(t, dt, {
      lookX: lx, lookY: ly, vx: S.vx, vy: S.vy,
      expr: S.sleeping ? "sleepy" : S.expr,
      nod: t < S.nodUntil, hop: t < S.hopUntil, spin: spinP,
      sleepy: S.sleeping, boost: S.boost, pushing: S.pushing, towing: S.towing,
      scale: Math.max(0.001, 1 + S.pop), still: this.opts.reduced,
    });
  };
}
