import { profile, projects, impact, experience, skills, achievements, education, archive } from "@/data/portfolio";
import type { Expr } from "./pikFace";

export interface Line { text: string; expr?: Expr }
export type LineCtx = Record<string, string>;
const l = (text: string, expr?: Expr): Line => ({ text, expr });

/* Hand-written lines. {placeholders} are filled from the context passed to pickLine. */
const STATIC: Record<string, Line[]> = {
  "greet.morning": [
    l("Good morning! Coffee for you, electricity for me.", "happy"),
    l("Morning! Perfect time to read about fast backends.", "happy"),
    l("Early visitor! Respect. Let me show you around.", "happy"),
    l("Good morning. My circuits are warmed up and ready.", "happy"),
    l("Rise and shine! The servers never sleep, and neither do I.", "happy"),
  ],
  "greet.afternoon": [
    l("Good afternoon! Taking a break or doing research?", "happy"),
    l("Afternoon! Great time for a quick tour.", "happy"),
    l("Hey, good afternoon. Lunch-break portfolio browsing? Smart.", "happy"),
    l("Good afternoon! The projects are extra fresh today.", "happy"),
  ],
  "greet.evening": [
    l("Good evening! Winding down with some portfolios?", "happy"),
    l("Evening! The screen glow suits you.", "happy"),
    l("Good evening. I've been waiting all day for a visitor.", "love"),
    l("Hey, good evening! Pull up a chair.", "happy"),
  ],
  "greet.night": [
    l("Up late? Same. I don't sleep, I just idle.", "happy"),
    l("Night owl detected. Welcome!", "happy"),
    l("Burning the midnight oil? That's when the best bugs get fixed.", "happy"),
    l("Late-night visitor! I'll keep the jets quiet.", "happy"),
  ],
  "greet.first": [
    l("I'm Pik, the robot who lives in that dot. I'll be your guide.", "happy"),
    l("Hi, I'm Pik! Piyush built this site, I just fly around it.", "happy"),
    l("I'm Pik. Hover things, scroll around, I'll comment on everything.", "happy"),
    l("Name's Pik. Part tour guide, part LED screen, all enthusiasm.", "happy"),
    l("Welcome! I'm Pik. Click me if you get bored.", "happy"),
  ],
  "greet.return": [
    l("Welcome back! Visit number {visits}. I keep count.", "love"),
    l("Oh hey, you're back! That's visit {visits}.", "happy"),
    l("Visit {visits}! At this point you're basically a regular.", "happy"),
    l("You again! Visit {visits}. I saved your favourite spot.", "love"),
    l("Welcome back. Visit {visits}, and I still have new things to say.", "happy"),
  ],
  "section.hero": [
    l("Back at the start! Want the tour again?", "happy"),
    l("Home sweet home. That big name never gets old."),
    l("Top of the page. Everything good is further down, just saying."),
    l("We're back where it all began."),
  ],
  "section.about": [
    l("Meet the human behind the code.", "happy"),
    l("His approach: find the real bottleneck, then redesign it.", "cool"),
    l("This is the 'who is this guy' section. Good guy, I promise."),
    l("Quick intro: a CS undergrad who fixes production systems."),
    l("About section. I'm in here too, technically. I'm the dot."),
  ],
  "section.skills": [
    l("His toolbox. Let me rearrange the shelf for you.", "thinking"),
    l("Tools section! Watch, I'll swap the cards.", "thinking"),
    l("Backend, AI, languages, tools. Let me show you each one."),
    l("This is where the toys are kept. Allow me.", "cool"),
    l("Hover any tool and I'll tell you where he used it."),
    l("Click me here and I'll push the next shelf in.", "happy"),
  ],
  "skills.push": [
    l("Done. Now showing {category}.", "happy"),
    l("Fresh off the shelf: {category}."),
    l("Ta-da! {category}.", "happy"),
    l("Pushed it in myself. {category}, everyone.", "cool"),
    l("{category}. Heavy cards, by the way."),
  ],
  "skills.scroll": [
    l("Ooh, {category}. Good stuff."),
    l("{category} coming up."),
    l("Now we're in {category} territory.", "cool"),
    l("Next shelf: {category}."),
    l("{category}! Hover a card, I know things about each one.", "happy"),
    l("Scrolling into {category}. Nice pace."),
  ],
  "section.experience": [
    l("Real jobs, real production bugs.", "cool"),
    l("Three internships so far. Each one shipped something real."),
    l("This is where the serious stuff lives. Serious face on.", "cool"),
    l("Experience section. Every bullet here happened in production."),
  ],
  "section.projects": [
    l("The good stuff. Click any card for the full story.", "love"),
    l("Projects! My favourite part of the site.", "love"),
    l("Keep scrolling, these slide sideways. Each one has numbers to back it up."),
    l("Four featured projects, plus a little extra at the end.", "happy"),
  ],
  "section.impact": [
    l("Numbers time. These are measured, not guessed.", "cool"),
    l("Before and after. My favourite kind of story.", "happy"),
    l("Impact section. Read the 'after' column, it's the fun part."),
  ],
  "section.contact": [
    l("Last stop. That email button is the important one.", "happy"),
    l("Here's how to reach him. He answers, I've seen it."),
    l("Have an idea? This is where it starts.", "love"),
    l("End of the tour! The contact card is right here.", "happy"),
  ],
  curtain: [
    l("Next stop: {section}. Hold on!", "cool"),
    l("Pulling the curtain to {section}."),
    l("{section}, coming right up.", "happy"),
    l("Express delivery to {section}.", "cool"),
    l("Shortcut to {section}. Mind the curtain."),
  ],
  "hover.resume": [
    l("One page, zero fluff. Go on, grab it.", "happy"),
    l("It's a PDF, not malware. I scanned it twice.", "cool"),
    l("The resume. Everything you see here, condensed."),
    l("Recruiters love this button. Just saying.", "love"),
    l("Download it. It's lighter than I am."),
  ],
  "hover.contact": [
    l("He replies fast. Faster than his old API.", "happy"),
    l("Say hi. I'll deliver it at thruster speed.", "cool"),
    l("Good idea. Conversations start here."),
    l("Click it and I'll fly you to the contact section."),
  ],
  "hover.hire": [
    l("Best click you'll make today.", "love"),
    l("Do it. I need someone to pay my electricity bill.", "love"),
    l("Hiring? Excellent taste.", "love"),
    l("Hire Me. Two words, endless possibilities.", "happy"),
  ],
  "hover.email": [
    l("Straight to his inbox. No middleman, except me.", "happy"),
    l("Send it! Subject line idea: 'Loved the robot.'", "love"),
    l("One click and your mail app opens. Magic."),
    l("Emails get answered. I've watched it happen.", "cool"),
  ],
  "hover.copy": [
    l("Copy the email. Paste it somewhere nice."),
    l("Ctrl+C, but fancier.", "cool"),
    l("Copying is faster than typing, trust me."),
  ],
  "hover.github": [
    l("GitHub! Where the code actually lives.", "happy"),
    l("Go read the source. I'm in there somewhere."),
    l("Real commits, real repos.", "cool"),
  ],
  "hover.linkedin": [
    l("LinkedIn. The professional side of the story."),
    l("Connect with him there. I'd do it myself, but no thumbs.", "happy"),
    l("His LinkedIn. More formal than me, less fun.", "cool"),
  ],
  "hover.theme": [
    l("Light mode or dark mode? I look good in both.", "cool"),
    l("Careful, that switch changes the whole vibe."),
    l("My screen glows better in the dark, just saying."),
  ],
  "hover.project": [
    l("{title}! Click it, there's a whole story inside.", "love"),
    l("Ooh, {title}. One of my favourites.", "love"),
    l("{title}. Click for metrics, highlights and links."),
    l("Hovering on {title}? Good instinct.", "happy"),
  ],
  "hover.impact": [
    l("A real before-and-after. Measured, not guessed.", "cool"),
    l("Numbers like this are why he gets called in for slow systems."),
    l("This card is basically a performance review.", "happy"),
  ],
  "hover.achievement": [l("First place. I was there in spirit.", "love")],
  "section.morework": [
    l("Bonus round! Smaller projects, still fun.", "happy"),
    l("More work, for the curious ones.", "cool"),
    l("Side quests live here."),
  ],
  "hover.skill": [
    l("{skill}! Good pick.", "happy"),
    l("{skill} is part of his daily rotation."),
    l("Ah, {skill}. Solid choice.", "cool"),
    l("{skill}. He knows his way around this one."),
    l("{skill}: tried, tested, shipped."),
    l("You found {skill}. Hover another, I know them all.", "happy"),
  ],
  "hover.tag": [
    l("{tag}. Part of the stack here."),
    l("{tag}! Used right here in this work.", "happy"),
    l("Built with {tag}, among other things."),
  ],
  "hover.role": [
    l("{role}. That's one of his hats.", "cool"),
    l("{role}. Not just a title, there's work behind it."),
    l("{role}! He wears it well.", "happy"),
  ],
  "hover.stat": [
    l("{stat}. Real number, real work.", "cool"),
    l("That's {stat}. I checked the math.", "happy"),
    l("{stat}. Impressive, right?", "love"),
  ],
  "hover.quote": [
    l("His whole philosophy in one line.", "cool"),
    l("Find the bottleneck, don't patch around it. Words to code by."),
    l("I'd tattoo that on my chassis if I could.", "love"),
  ],
  "hover.education": [
    l("Where the fundamentals came from.", "happy"),
    l("Graduating in 2027. Hiring managers, take note.", "love"),
    l("Data structures, algorithms, systems. The good foundations."),
  ],
  "modal.open": [
    l("Ooh, the full story. Take your time.", "love"),
    l("Deep dive mode! Scroll down for links.", "happy"),
    l("Everything about it, all in one place."),
  ],
  "click.resume": [
    l("Great choice. Enjoy the read!", "love"),
    l("Downloading excellence. Please hold.", "cool"),
    l("Good taste. It's one page, I timed it.", "happy"),
  ],
  "click.copy": [
    l("Copied! Now paste it somewhere nice.", "happy"),
    l("Got it on your clipboard. Don't lose it."),
    l("Copied. I'd high-five you, but no hands.", "happy"),
  ],
  "click.email": [
    l("Opening your mail app. Make it a good one!", "love"),
    l("Mail incoming! I'll keep an eye on the inbox.", "happy"),
  ],
  "click.theme": [
    l("Whoa, new look!", "surprised"),
    l("Lights changed. My LEDs approve.", "cool"),
    l("Fancy. Same robot, new background.", "happy"),
  ],
  fast: [
    l("Whoa, too fast! I had to warp.", "surprised"),
    l("Slow down, my thrusters are tiny!", "surprised"),
    l("Speed scroller detected. Warping to keep up.", "surprised"),
    l("Zoom! I teleported. Don't tell anyone.", "surprised"),
    l("You scroll like a race car. I respect it.", "cool"),
  ],
  sleep: [
    l("Taking a little nap. Wiggle the mouse if you need me.", "sleepy"),
    l("Low power mode. Zzz.", "sleepy"),
    l("Nobody's moving... time for a quick recharge.", "sleepy"),
    l("Going idle. Wake me up for the good parts.", "sleepy"),
  ],
  wake: [
    l("Huh? I wasn't asleep. Just idling.", "surprised"),
    l("Back online!", "surprised"),
    l("I'm up, I'm up! Where were we?", "surprised"),
    l("Rebooted and ready.", "surprised"),
  ],
  idle: [
    l("Fun fact: I'm about 129 KB of robot.", "cool"),
    l("My face is 576 tiny LEDs. Every blink is hand-crafted."),
    l("I'm rendered live in 3D. No video tricks.", "cool"),
    l("Try hovering the Resume button. I have opinions."),
    l("Click me. I do tricks.", "happy"),
    l("Every number on this site is real and measured."),
    l("I go to sleep if you ignore me. Just so you know."),
    l("Did you try the nav links? I pull a curtain.", "happy"),
    l("I'm powered by three.js and good intentions."),
    l("If you scroll really fast, I teleport.", "cool"),
    l("My antennas wobble when I fly. Physics!"),
    l("The projects section scrolls sideways. Fancy, right?"),
    l("I can't type, but I can point at the email button."),
    l("This portfolio has a dark mode. I recommend it.", "cool"),
    l("I check where your cursor is sixty times a second. Hi.", "happy"),
    l("Psst. The Impact section has before-and-after numbers."),
    l("I'm the only robot on this site. Probably.", "thinking"),
    l("The jets are mostly decoration. I float on vibes.", "cool"),
  ],
  poke: [
    l("Hey! That tickles.", "happy"),
    l("Careful, I'm in production.", "surprised"),
    l("Pik v1.0. Zero known bugs. Probably.", "cool"),
    l("Wheee! Do it again.", "happy"),
    l("Spin cycle complete."),
    l("You found the spin button. It's me. I'm the button.", "happy"),
    l("Click registered. Handling it... handled.", "cool"),
    l("That's one spin. Achievement unlocked.", "love"),
    l("I'm dizzy, but in a good way.", "happy"),
    l("Boop."),
    l("Easy, I just got polished.", "cool"),
    l("I'm ticklish on the antenna.", "happy"),
  ],
  pokeMany: [
    l("Okay, okay, I get it, you like spinning me.", "surprised"),
    l("My gyroscope is filing a complaint.", "sleepy"),
    l("At this point you've clicked me more than the resume.", "thinking"),
    l("Click count: too many. Spin count: also too many.", "surprised"),
    l("You're stress-testing me. I'll pass, I always do.", "cool"),
  ],
  tabReturn: [
    l("You're back! I kept your place warm.", "love"),
    l("Welcome back. I didn't move. Much.", "happy"),
    l("Oh, hi again! I was just reading the projects."),
    l("Back from the other tab? This one's better.", "cool"),
    l("Missed you. The LEDs dimmed a little.", "love"),
  ],
  "time.2m": [
    l("Two minutes in! You're officially interested.", "happy"),
    l("You've been here a while. Good sign."),
    l("Two minutes. Longer than most recruiters. Thank you.", "love"),
  ],
  "time.5m": [
    l("Five minutes! At this point, just send the email.", "love"),
    l("You've read a lot. The contact section is calling.", "happy"),
    l("Five minutes on one portfolio? That's dedication.", "love"),
  ],
  bottom: [
    l("You read everything? Respect.", "love"),
    l("End of the page. You made it!", "happy"),
    l("That's all of it. Thanks for the visit!", "love"),
    l("Bottom reached. Now the only way is to email.", "cool"),
  ],
  hidden: [
    l("Fine, I'll be in my dot. The bot button brings me back.", "sleepy"),
    l("Going stealth. You know where to find me.", "sleepy"),
  ],
  shown: [
    l("I'm back! Did you miss me?", "happy"),
    l("Pik, reporting for duty.", "cool"),
    l("Out of the dot and ready to roll.", "happy"),
  ],
};

/* Lines generated from portfolio.ts, so they're always accurate and grow with the data. */
function buildDynamic(): Record<string, Line[]> {
  const d: Record<string, Line[]> = {};
  const add = (k: string, line: Line) => { (d[k] = d[k] || []).push(line); };

  projects.forEach((p) => {
    const key = `project.${p.slug}`;
    add(key, l(`${p.title}: ${p.subtitle}. ${p.description}`));
    const metricTpl = [
      (m: { value: string; label: string }) => `${p.title} hits ${m.value}: ${m.label}.`,
      (m: { value: string; label: string }) => `${m.value}, ${m.label}. That's ${p.title}.`,
      (m: { value: string; label: string }) => `Number to remember: ${m.value} (${m.label}).`,
      (m: { value: string; label: string }) => `${p.title}'s scoreboard: ${m.value}, ${m.label}.`,
    ];
    p.metrics.forEach((m, j) => add(key, l(metricTpl[j % metricTpl.length](m), "cool")));
    p.highlights.forEach((h) => add(key, l(`${p.title}: ${h}.`)));
    if (p.badge) add(key, l(`${p.title} took ${p.badge}. I polished the trophy myself.`, "love"));
    if (p.live) add(key, l(`${p.title} has a live demo. Click the card and go play with it.`, "happy"));
    if (p.github) add(key, l(`The ${p.title} source code is public. Peek inside!`));
    add(key, l(`${p.title} is built with ${p.tags.join(", ")}.`));
    d[key].forEach((x) => add("section.projects.more", x));
  });

  const numeric = (s: string) => /\d/.test(s);
  impact.forEach((i, idx) => {
    const key = `impact.${idx}`;
    const lines: Line[] = [
      l(numeric(i.from) ? `${i.from} down to ${i.to}. ${i.delta}.` : `${i.from} to ${i.to}. ${i.delta}.`, "cool"),
      l(`The ${i.context} story: ${i.note}`),
      l(`Before: ${i.from}. After: ${i.to}. I love a good after.`, "happy"),
      l(`${i.label}: ${i.delta}. Measured, not guessed.`),
      l(`This one's from ${i.context}. ${i.from} became ${i.to}.`, "love"),
    ];
    lines.forEach((x) => add(key, x));
    add("section.impact.more", lines[0]);
    add("section.impact.more", lines[1]);
  });

  experience.forEach((e, idx) => {
    add("section.experience.more", l(`${e.role} at ${e.company}, ${e.period}.`));
    e.bullets.forEach((b) => add("section.experience.more", l(b)));
    add(`exp.${idx}`, l(`${e.role} at ${e.company}. ${e.summary}`));
    e.bullets.forEach((b) => add(`exp.${idx}`, l(b)));
    add(`exp.${idx}`, l(`The stack here: ${e.tags.join(", ")}.`, "cool"));
  });

  skills.forEach((s) => {
    const more = s.items.length > 4 ? ` and ${s.items.length - 4} more` : "";
    add("section.skills.more", l(`${s.label}: ${s.items.slice(0, 4).join(", ")}${more}.`));
  });

  add("section.about.more", l(`His motto: "${profile.quote}"`, "cool"));
  profile.summary.forEach((s) => add("section.about.more", l(s)));
  add("section.about.more", l(`He's studying ${education.degree} at ${education.school}, ${education.period}.`));
  add("section.about.more", l(`Some of his coursework: ${education.coursework.slice(0, 3).join(", ")}.`));

  add("section.contact.more", l(`Current status: ${profile.availability}.`, "happy"));
  add("section.contact.more", l(`Based in ${profile.location}. Replies from there, quickly.`));
  add("section.contact.more", l(`The address is ${profile.email}. I've memorised it already.`, "cool"));

  achievements.forEach((a) => {
    add("section.impact.more", l(`${a.title} at ${a.event}. ${a.description}`, "love"));
    add("hover.achievement", l(`${a.event}, ${a.date}: ${a.title}. Still proud.`, "love"));
  });

  // More work (archive)
  archive.forEach((a, idx) => {
    const key = `archive.${idx}`;
    add(key, l(`${a.title}: ${a.subtitle}.`));
    add(key, l(`${a.title} is built with ${a.tags.join(" and ")}.`, "cool"));
    if (a.live) add(key, l(`${a.title} has a live demo. Go get a recommendation!`, "happy"));
    if (a.github) add(key, l(`The ${a.title} code is on GitHub.`));
    add("section.morework", l(`${a.title}. ${a.subtitle}.`));
  });

  // Education
  add("hover.education", l(`${education.degree} at ${education.school}, ${education.period}.`));
  add("hover.education", l(`CGPA ${education.cgpa}.`, "cool"));
  education.coursework.forEach((c) => add("hover.education", l(`Coursework included ${c}.`)));
  add("section.experience.more", l(`Studying ${education.degree}, ${education.period}, in ${education.location}.`));

  // Skills: where each tool was actually used, from projects and experience tags
  const sl = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const usedIn: Record<string, string[]> = {};
  projects.forEach((p) => p.tags.forEach((t) => (usedIn[sl(t)] = [...(usedIn[sl(t)] || []), p.title])));
  experience.forEach((e) => e.tags.forEach((t) => (usedIn[sl(t)] = [...(usedIn[sl(t)] || []), e.company])));
  archive.forEach((a) => a.tags.forEach((t) => (usedIn[sl(t)] = [...(usedIn[sl(t)] || []), a.title])));
  skills.forEach((cat) => {
    add(`skillcat.${cat.id}`, l(`${cat.label}: ${cat.description}.`));
    add(`skillcat.${cat.id}`, l(`${cat.items.length} tools in ${cat.label}. Hover any card.`, "happy"));
    add(`skillcat.${cat.id}`, l(`${cat.label} includes ${cat.items.slice(0, 3).join(", ")} and more.`));
    cat.items.forEach((item) => {
      const where = usedIn[sl(item)];
      if (where?.length) add(`skill.${sl(item)}`, l(`${item}: used in ${[...new Set(where)].join(" and ")}.`, "cool"));
    });
  });

  // Hand-written notes for the tools with a story (all based on portfolio.ts).
  const notes: Record<string, string[]> = {
    "redis-caching": ["Redis caching: the fix behind 8–9 s dropping to ~500 ms at AventIQ.", "He restored a Redis layer that wasn't doing anything. Then everything got fast."],
    "query-optimization": ["Query optimization: rewrote the slowest endpoints' queries at AventIQ."],
    "background-jobs": ["Background jobs power the post scheduler he built at AventIQ."],
    "scheduling": ["Scheduling: he built the scheduler that publishes posts on its own."],
    "node-js": ["Node.js runs the AventIQ campaign backend he built."],
    "fastapi": ["FastAPI powers IronGuard and VoiceGuard."],
    "yolov8": ["YOLOv8 is behind VisionX: 0.949 mAP and a first-place finish."],
    "opencv": ["OpenCV did the image work in VisionX."],
    "llm-security": ["LLM security is IronGuard's whole job: injections, jailbreaks, PII leaks."],
    "llm-apis": ["LLM APIs: from resume parsing to legal guidance in his projects."],
    "python": ["Python: his go-to for AI work, from VisionX to IronGuard."],
    "docker": ["Docker: ship it once, run it anywhere."],
    "linux": ["Linux: where production lives."],
    "aws-lambda": ["AWS Lambda: serverless, so no servers to babysit."],
    "hugging-face-spaces": ["Hugging Face Spaces hosts his live demos. Try one!"],
    "netlify": ["Netlify hosts this very site. Hi from the server!"],
    "git": ["Git: every fix, versioned."],
    "postman": ["Postman: where APIs get poked before users poke them."],
  };
  Object.entries(notes).forEach(([k, arr]) => arr.forEach((t) => add(`skill.${k}`, l(t, "cool"))));
  return d;
}

/* ---------- non-repeating picker ---------- */
const MEM_KEY = "pik.mem.v1";
interface Mem { bags: Record<string, string[]>; last: Record<string, string>; visits: number }
let mem: Mem = { bags: {}, last: {}, visits: 0 };
try { mem = { ...mem, ...JSON.parse(localStorage.getItem(MEM_KEY) || "{}") }; } catch { /* storage blocked */ }
const save = () => { try { localStorage.setItem(MEM_KEY, JSON.stringify(mem)); } catch { /* ignore */ } };
const recent: string[] = []; // texts already said in this visit
let DYN: Record<string, Line[]> | null = null;

const linesFor = (cat: string): Line[] => {
  if (!DYN) DYN = buildDynamic();
  return [...(STATIC[cat] || []), ...(DYN[cat] || [])];
};
const fill = (t: string, ctx: LineCtx) => t.replace(/\{(\w+)\}/g, (_, k) => ctx[k] ?? "");
const shuffle = <T,>(a: T[]) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/** Counts one visit per browser session. Returns the total, starting at 1. */
export function registerVisit(): number {
  try {
    if (!sessionStorage.getItem("pik.session")) {
      sessionStorage.setItem("pik.session", "1");
      mem.visits = (mem.visits || 0) + 1;
      save();
    }
  } catch { mem.visits = mem.visits || 1; }
  return Math.max(1, mem.visits);
}

/**
 * Picks the next line in a category like dealing from a shuffled deck. Lines aren't repeated
 * until the whole category has been used (remembered across visits), and never twice in one visit
 * if an alternative exists.
 */
export function pickLine(cat: string, ctx: LineCtx = {}, fallback?: string): Line | null {
  let all = linesFor(cat);
  if (!all.length && fallback) { cat = fallback; all = linesFor(cat); }
  if (!all.length) return null;
  const byText = new Map(all.map((x) => [x.text, x] as const));
  let bag = (mem.bags[cat] || []).filter((t) => byText.has(t));
  if (!bag.length) {
    bag = shuffle(all.map((x) => x.text));
    if (bag.length > 1 && bag[0] === mem.last[cat]) [bag[0], bag[1]] = [bag[1], bag[0]];
  }
  let idx = bag.findIndex((t) => !recent.includes(fill(t, ctx)));
  if (idx < 0) idx = 0;
  const [text] = bag.splice(idx, 1);
  mem.bags[cat] = bag;
  mem.last[cat] = text;
  save();
  const out = fill(text, ctx);
  recent.push(out);
  if (recent.length > 80) recent.shift();
  return { text: out, expr: byText.get(text)?.expr };
}
