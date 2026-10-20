export type Expr = "idle" | "happy" | "cool" | "surprised" | "love" | "thinking" | "sleepy";

const PAT: Record<string, string[]> = {
  pill: [".###.", "#####", "#####", "#####", "#####", "#####", "#####", ".###."],
  pillHalf: [".###.", "#####", "#####", ".###."],
  pillShut: [".###."],
  pillSquint: [".###.", "#####", "#####", "#####", ".###."],
  pillBig: [".###.", "#####", "#####", "#####", "#####", "#####", "#####", "#####", "#####", ".###."],
  lid: ["#####", "#####", ".###."],
  happy: [".###.", "#####", "##.##", "#...#"],
  heart: [".##.##.", "#######", "#######", ".#####.", "..###..", "...#..."],
  cool: ["########.########", "########.########", ".######...######.", "..####.....####.."],
  brow: ["...##", ".##..", "#...."],
  browFlip: ["##...", "..##.", "....#"],
  mSmile: ["#.....#", ".#####."],
  mBig: ["#.......#", "##.....##", ".#######."],
  mSmirk: ["......#", "######."],
  mO: [".##.", "#..#", "#..#", ".##."],
  mFlat: [".###."],
  mSmall: [".###."],
};

const GW = 24;
const GH = 24;
const CELL = 20;

/** Draws the 24×24 dot-matrix face into a canvas. Redraws only when something changes. */
export class PikFace {
  readonly canvas: HTMLCanvasElement;
  dirty = false;
  private ctx: CanvasRenderingContext2D;
  private key = "";

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = GW * CELL;
    this.canvas.height = GH * CELL;
    this.ctx = this.canvas.getContext("2d")!;
  }

  draw(ex: Expr, dx: number, dy: number, blink: number, t: number) {
    const tP = ex === "thinking" ? Math.floor(t / 170) % 4 : 0;
    const tS = ex === "thinking" ? (Math.floor(t / 1700) % 2 ? 1 : -1) : 0;
    const k = [ex, dx, dy, blink, tP, tS].join();
    if (k === this.key) return;
    this.key = k;
    this.dirty = true;

    const on = new Set<string>();
    const put = (p: string[], cx: number, cy: number) => {
      const h = p.length;
      const w = p[0].length;
      const x0 = Math.round(cx - w / 2);
      const y0 = Math.round(cy - h / 2);
      p.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === "#") on.add(`${x0 + x},${y0 + y}`); }));
    };

    if (ex === "thinking") {
      const lx = 7.5 + tS;
      const rx = 16.5 + tS;
      const sq = tS > 0;
      put(blink === 2 ? PAT.pillShut : sq ? PAT.pillSquint : PAT.pill, lx, 8 + (sq ? 1.5 : 0));
      put(blink === 2 ? PAT.pillShut : !sq ? PAT.pillSquint : PAT.pill, rx, 8 + (!sq ? 1.5 : 0));
      if (sq) put(PAT.brow, rx + 0.5, 3); else put(PAT.browFlip, lx - 0.5, 3);
      [-2, 0, 2].forEach((o, i) => on.add(`${12 + o + (sq ? 1 : -1)},${18 - (tP === i ? 1 : 0)}`));
    } else {
      let eye = PAT.pill;
      let mouth = PAT.mSmile;
      let ey = 9.5;
      let my = 17.5;
      if (ex === "happy") { eye = PAT.happy; mouth = PAT.mBig; ey = 9; }
      if (ex === "surprised") { eye = PAT.pillBig; mouth = PAT.mO; ey = 9; my = 18; }
      if (ex === "sleepy") { eye = PAT.lid; mouth = PAT.mFlat; ey = 11; }
      if (ex === "love") { eye = PAT.heart; mouth = PAT.mSmall; }
      if (ex === "cool") mouth = PAT.mSmirk;
      if ((ex === "idle" || ex === "surprised") && blink) eye = blink === 2 ? PAT.pillShut : PAT.pillHalf;
      if (ex === "cool") put(PAT.cool, 12, 10);
      else { put(eye, 7.5 + dx, ey + dy); put(eye, 16.5 + dx, ey + dy); }
      put(mouth, 12 + Math.round(dx / 2), my);
    }

    const c = this.ctx;
    c.fillStyle = "#06050a";
    c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (let y = 0; y < GH; y++) {
      for (let x = 0; x < GW; x++) {
        const lit = on.has(`${x},${y}`);
        c.beginPath();
        c.arc(x * CELL + CELL / 2, y * CELL + CELL / 2, lit ? 8 : 5.2, 0, Math.PI * 2);
        if (lit) { c.shadowColor = "#3B82F6"; c.shadowBlur = 18; c.fillStyle = "#E0ECFF"; }
        else { c.shadowBlur = 0; c.fillStyle = "#13121c"; }
        c.fill();
      }
    }
    c.shadowBlur = 0;
  }
}
