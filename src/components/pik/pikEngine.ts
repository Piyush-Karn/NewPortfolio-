import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { PikFace, type Expr } from "./pikFace";

export interface PikPose {
  lookX: number; lookY: number;   // -1..1, where Pik looks, relative to his position
  vx: number; vy: number;         // screen velocity in px per frame (banking, cable sway)
  expr: Expr;
  nod: boolean; hop: boolean;
  spin: number;                   // 0..1 progress of a spin, 0 = none
  sleepy: boolean; boost: number; pushing: boolean; towing: boolean;
  scale: number;                  // 0..1 pop in/out
  still: boolean;                 // reduced motion: no idle bobbing
}

const MODEL_HEIGHT = 3.4;
// Light intensities for three r155+ (physical units). Tune here if Pik looks too dark or bright.
const LIGHTS = { hemi: 1.6, key: 2.6, fill: 0.9, rim: 40 };
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function glowTex(rgb: string, elongated: boolean) {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = elongated ? 160 : 64;
  const x = c.getContext("2d")!;
  x.save();
  if (elongated) x.scale(1, 2.5);
  const cy = elongated ? 12 : 32;
  const g = x.createRadialGradient(32, cy, 0, 32, cy, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.22, `rgba(${rgb},0.95)`);
  g.addColorStop(0.55, `rgba(${rgb},0.35)`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  x.fillStyle = g;
  x.fillRect(0, 0, 64, 64);
  x.restore();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.minFilter = THREE.LinearFilter;
  t.generateMipmaps = false;
  return t;
}

const sprite = (map: THREE.Texture, opacity: number) =>
  new THREE.Sprite(new THREE.SpriteMaterial({
    map, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  }));

/** Rebuilds the screen's UVs from its camera-facing projection so the face always fills it upright. */
function remapUV(m: THREE.Mesh) {
  const g = m.geometry;
  const p = g.attributes.position;
  const n = p.count;
  const v = new THREE.Vector3();
  const xs = new Float32Array(n);
  const ys = new Float32Array(n);
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (let i = 0; i < n; i++) {
    v.fromBufferAttribute(p, i).applyMatrix4(m.matrixWorld);
    xs[i] = v.x; ys[i] = v.y;
    x0 = Math.min(x0, v.x); x1 = Math.max(x1, v.x); y0 = Math.min(y0, v.y); y1 = Math.max(y1, v.y);
  }
  const pad = 0.04;
  const uv = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    uv[i * 2] = pad + (1 - 2 * pad) * (xs[i] - x0) / (x1 - x0 || 1);
    uv[i * 2 + 1] = pad + (1 - 2 * pad) * (ys[i] - y0) / (y1 - y0 || 1);
  }
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
}

export class PikEngine {
  ready = false;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  private pivot = new THREE.Group();
  private face = new PikFace();
  private ledTex: THREE.CanvasTexture;
  private jets: THREE.Object3D[] = [];
  private wob: { g: THREE.Group; top: boolean; ph: number; rest: THREE.Quaternion }[] = [];
  private flames: { g: THREE.Sprite; f: THREE.Sprite; c: THREE.Sprite }[] = [];
  private textures: THREE.Texture[] = [];
  private st = { y: 0, p: 0, r: 0, blinkAt: 0, prevY: 0, prevYaw: 0, sw: 0, swV: 0 };
  private tmp = new THREE.Vector3();
  private camDir = new THREE.Vector3();
  private dirW = new THREE.Vector3();
  private q = new THREE.Quaternion();
  private eu = new THREE.Euler();

  constructor(canvas: HTMLCanvasElement, size: number) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: window.devicePixelRatio < 1.5, alpha: true, powerPreference: "low-power" });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    this.renderer.setSize(size, size, false);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.cam.position.set(0, 0.4, 13);
    this.cam.lookAt(0, -0.2, 0);
    this.scene.add(new THREE.HemisphereLight(0xf0eeff, 0x221d30, LIGHTS.hemi));
    const key = new THREE.DirectionalLight(0xffffff, LIGHTS.key); key.position.set(3, 4, 6); this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xc9c4ff, LIGHTS.fill); fill.position.set(-4, 1, 3); this.scene.add(fill);
    const rim = new THREE.PointLight(0x8b5cf6, LIGHTS.rim, 16, 2); rim.position.set(-3, 2.5, -2.5); this.scene.add(rim);
    this.scene.add(this.pivot);

    this.ledTex = new THREE.CanvasTexture(this.face.canvas);
    this.ledTex.colorSpace = THREE.SRGBColorSpace;
    this.ledTex.minFilter = THREE.LinearFilter;
    this.ledTex.generateMipmaps = false;

    const flameTex = glowTex("147,197,253", true);
    const dotTex = glowTex("147,197,253", false);
    this.textures.push(this.ledTex, flameTex, dotTex);
    for (let i = 0; i < 2; i++) {
      const g = sprite(dotTex, 0.5), f = sprite(flameTex, 0.95), c = sprite(dotTex, 1);
      f.center.set(0.5, 0.92);
      [g, f, c].forEach((s) => { s.visible = false; this.scene.add(s); });
      this.flames.push({ g, f, c });
    }
  }

  async load(url: string) {
    const draco = new DRACOLoader();
    draco.setDecoderPath("/draco/gltf/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);
    const gltf = await loader.loadAsync(url);
    draco.dispose();

    const holder = new THREE.Group();
    const inner = new THREE.Group();
    holder.add(inner);
    inner.add(gltf.scene);
    this.pivot.add(holder);

    const meshes: THREE.Mesh[] = [];
    gltf.scene.traverse((o) => { if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh); });
    const nm = (m: THREE.Object3D) => `${m.name} ${m.parent ? m.parent.name : ""}`;

    // Face the camera: the screen must be on the +Z side.
    const screen = meshes.find((m) => /screen|plane.?001/i.test(nm(m)));
    holder.updateMatrixWorld(true);
    let box = new THREE.Box3().setFromObject(inner);
    const c0 = box.getCenter(new THREE.Vector3());
    if (screen) {
      const sc = new THREE.Box3().setFromObject(screen).getCenter(new THREE.Vector3());
      if (sc.z < c0.z) inner.rotation.y = Math.PI;
    }

    // Centre and size.
    holder.updateMatrixWorld(true);
    box = new THREE.Box3().setFromObject(inner);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const k = MODEL_HEIGHT / size.y;
    holder.scale.setScalar(k);
    holder.position.copy(center).multiplyScalar(-k);
    holder.updateMatrixWorld(true);

    // LED face on the screen.
    if (screen) {
      screen.geometry = screen.geometry.clone();
      remapUV(screen);
      screen.material = new THREE.MeshBasicMaterial({ map: this.ledTex, toneMapped: false });
    }

    // Jet points: back face of the left and right thruster vertex clusters.
    const thr = meshes.filter((m) => /thruster|cylinder.?0(08|09|10|11)/i.test(nm(m)));
    const clusters: THREE.Vector3[][] = [[], []];
    const v = new THREE.Vector3();
    thr.forEach((m) => {
      const p = m.geometry.attributes.position;
      for (let i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i).applyMatrix4(m.matrixWorld);
        clusters[v.x < 0 ? 0 : 1].push(v.clone());
      }
    });
    clusters.forEach((pts) => {
      if (!pts.length) return;
      let minZ = Infinity;
      for (const p of pts) if (p.z < minZ) minZ = p.z;
      const near = pts.filter((p) => p.z < minZ + 0.06 * MODEL_HEIGHT);
      const cx = near.reduce((a, p) => a + p.x, 0) / near.length;
      const cy = near.reduce((a, p) => a + p.y, 0) / near.length;
      const o = new THREE.Object3D();
      holder.add(o);
      o.position.copy(holder.worldToLocal(new THREE.Vector3(cx, cy, minZ)));
      this.jets.push(o);
    });

    // Antennas wobble from their base, cables swing from their top.
    const wob = (re: RegExp, top: boolean) => meshes.filter((m) => re.test(nm(m))).forEach((m) => {
      const bb = new THREE.Box3().setFromObject(m);
      const bc = bb.getCenter(new THREE.Vector3());
      const g = new THREE.Group();
      g.position.copy(holder.worldToLocal(new THREE.Vector3(bc.x, top ? bb.min.y : bb.max.y, bc.z)));
      holder.add(g);
      g.updateMatrixWorld(true);
      g.attach(m);
      this.wob.push({ g, top, ph: Math.random() * 6, rest: g.quaternion.clone() });
    });
    wob(/antennatop|cylinder.?01(2|3)/i, true);
    wob(/cable|bezier|antenna(a|b)\b/i, false);

    this.ready = true;
  }

  render(t: number, dt: number, p: PikPose) {
    if (!this.ready) return;
    const k = dt / 16;
    const st = this.st;
    const s = p.still ? 0 : 1;

    let ty = p.sleepy ? 0 : p.lookX * 0.55;
    let tp = p.sleepy ? 0.35 : p.lookY * 0.25;
    let tr = clamp(-p.vx * 0.03, -0.35, 0.35);
    if (p.pushing) { ty = -0.75; tp = 0.1; }
    if (p.towing) ty = -0.6;
    if (p.nod) tp += Math.sin(t / 110) * 0.22 * s;
    if (p.expr === "thinking" && !p.pushing) {
      const sd = Math.floor(t / 1700) % 2 ? 1 : -1;
      ty = sd * 0.25; tp = -0.14; tr -= sd * 0.1;
    }
    st.y += (ty - st.y) * 0.1 * k;
    st.p += (tp - st.p) * 0.1 * k;
    st.r += (tr - st.r) * 0.1 * k;

    const spin = p.spin * Math.PI * 2;
    this.pivot.scale.setScalar(Math.max(0.001, p.scale));
    this.pivot.position.y = s * (Math.sin(t / (p.sleepy ? 1100 : 650)) * 0.12 + (p.hop ? Math.abs(Math.sin(t / 170)) * 0.3 : 0)) - (p.sleepy ? 0.2 : 0);
    this.pivot.rotation.set(st.p, st.y + spin, st.r + s * Math.sin(t / 1100) * 0.03);

    const vy = p.vy * 0.01 + this.pivot.position.y - st.prevY;
    const vyaw = st.y + spin - st.prevYaw;
    st.prevY = this.pivot.position.y;
    st.prevYaw = st.y + spin;
    st.swV += (-st.sw * 0.08 - vy * 3 - vyaw * 2 - p.vx * 0.004) * k;
    st.swV *= 0.9;
    st.sw += st.swV * 0.12 * k;
    for (const w of this.wob) {
      const a = w.top ? s * Math.sin(t / 430 + w.ph) * 0.1 + st.sw * 0.35 : s * Math.sin(t / 700 + w.ph) * 0.12 + st.sw * 0.6;
      this.eu.set(w.top ? st.sw * 0.2 : a * 0.6, 0, w.top ? a : a * 0.5 + (p.sleepy ? 0.15 : 0));
      this.q.setFromEuler(this.eu);
      w.g.quaternion.copy(w.rest).multiply(this.q);
    }

    if (t > st.blinkAt) st.blinkAt = t + 2200 + Math.random() * 2600;
    const bt = st.blinkAt - t;
    const blink = bt < 170 ? (bt > 120 || bt < 40 ? 1 : 2) : 0;
    this.face.draw(p.expr, Math.round(p.lookX * 2), Math.round(p.lookY * 1.5), blink, p.still ? 0 : t);
    if (this.face.dirty) { this.ledTex.needsUpdate = true; this.face.dirty = false; }

    this.pivot.updateMatrixWorld(true);
    this.cam.getWorldDirection(this.camDir);
    this.dirW.set(0, -0.25, -1).normalize().applyQuaternion(this.pivot.quaternion);
    const speed = Math.hypot(p.vx, p.vy);
    this.flames.forEach((f, i) => {
      const o = this.jets[i];
      const vis = !!o && p.scale > 0.05;
      f.g.visible = f.f.visible = f.c.visible = vis;
      if (!vis) return;
      o.getWorldPosition(this.tmp);
      const pa = this.tmp.clone().project(this.cam);
      const pb = this.tmp.clone().add(this.dirW).project(this.cam);
      const ang = Math.atan2(pb.y - pa.y, pb.x - pa.x);
      const fore = Math.sqrt(Math.max(0.1, 1 - Math.pow(this.dirW.dot(this.camDir), 2)));
      const flk = (p.sleepy ? 0.4 : p.boost * (1 + Math.min(0.5, speed * 0.04))) * (p.still ? 1 : 0.82 + Math.random() * 0.3);
      const w = 0.18 * p.scale;
      f.g.position.copy(this.tmp); f.f.position.copy(this.tmp); f.c.position.copy(this.tmp);
      (f.f.material as THREE.SpriteMaterial).rotation = ang + Math.PI / 2;
      f.f.scale.set(w, w * 4 * fore * flk, 1);
      f.g.scale.setScalar(w * 2 * (p.sleepy ? 0.6 : 1));
      f.c.scale.setScalar(w * 0.7);
    });

    this.renderer.render(this.scene, this.cam);
  }

  /** Changes the render resolution (Pik's on-screen size is set by the brain). */
  resize(size: number) {
    this.renderer.setSize(size, size, false);
  }

  dispose() {
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose?.();
      const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
      mats.forEach((mt) => mt.dispose());
    });
    this.textures.forEach((t) => t.dispose());
    this.renderer.dispose();
  }
}
