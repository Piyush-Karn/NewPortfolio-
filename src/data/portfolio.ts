export const profile = {
  name: "Piyush Kumar",
  firstName: "PIYUSH",
  lastName: "KUMAR",
  title: "Software Engineer",
  roles: ["Software Engineer", "Backend Engineer", "AI Systems Builder", "LLM Security"],
  tagline:
    "I build and debug production backend and AI systems — profiling down to the root cause, then redesigning what's slow or broken.",
  summary: [
    "Computer Science undergraduate who builds and debugs production backend and AI systems through root-cause profiling and redesign.",
    "Currently a Software Intern at AventIQ, building the backend of an AI-driven LinkedIn campaign platform. I fixed a critical authentication bypass in a production system and cut portal response time from 8–9 s to ~500 ms.",
  ],
  quote: "Find the real bottleneck, then redesign — don't patch.",
  email: "piyushkarn96@gmail.com",
  phone: "+91-9289084942", // not rendered publicly by default
  location: "Delhi, India",
  portfolio: "https://aiwithpiyush.netlify.app",
  linkedin: "https://www.linkedin.com/in/piyushkumar-ai/",
  linkedinHandle: "piyushkumar-ai",
  github: "https://github.com/Piyush-Karn",
  githubHandle: "Piyush-Karn",
  resume: "/Piyush-Kumar-Resume.pdf",
  availability: "Open to SDE, backend & AI engineering roles", // editable
};

export const heroStats = [
  { value: 3, prefix: "", suffix: "", label: "Internships" },
  { value: 97, prefix: "", suffix: "%", label: "Latency cut" },
  { value: 1, prefix: "#", suffix: "", label: "Hackwave '25" },
];

export const impact = [
  { label: "Production portal response time", from: "8–9 s", to: "~500 ms", delta: "~94% faster",
    note: "Restored a non-functioning Redis caching layer and rewrote the queries behind the slowest endpoints.", context: "AventIQ" },
  { label: "LLM gateway end-to-end latency", from: "13,000 ms", to: "372 ms", delta: "~97% faster",
    note: "Restructured a serial inspection pipeline into parallel stages; isolated each bottleneck through staged timing.", context: "IronGuard" },
  { label: "Adversarial attack detection accuracy", from: "64%", to: "84.8%", delta: "TPR 60% → 89.9%",
    note: "Measured on a 2,700-case adversarial test suite.", context: "IronGuard" },
  { label: "Critical auth bypass", from: "Open", to: "Closed", delta: "All accounts secured",
    note: "Identified and fixed an unauthorized-access path affecting all user accounts in a production employee-management portal.", context: "AventIQ" },
];

export const experience = [
  {
    role: "Software Intern",
    company: "AventIQ",
    org: "Mittal Software Labs Ltd",
    period: "Jul 2026 — Present",
    location: "Delhi",
    current: true,
    summary: "Backend of an AI-driven LinkedIn campaign platform that runs campaigns end to end — from idea generation to publishing posts with image, video, GIF and PDF content. Users only approve scheduled posts.",
    bullets: [
      "Designed and implemented the background job system, post scheduler and multi-step AI content workflow that generate and publish posts autonomously.",
      "Identified and fixed a critical authentication bypass in the production employee-management portal, closing an unauthorized-access path affecting all user accounts.",
      "Cut portal response time from 8–9 s to ~500 ms (~94%) by restoring a non-functioning Redis caching layer and rewriting the queries behind the slowest endpoints.",
    ],
    tags: ["Node.js", "Express", "MongoDB", "Redis", "Background Jobs", "AI Workflows"],
  },
  {
    role: "Frontend Developer Intern",
    company: "The Angaar Batch",
    org: "",
    period: "Apr 2026 — May 2026",
    location: "Remote",
    current: false,
    summary: "Edtech platform web portal serving live production traffic.",
    bullets: ["Delivered and improved responsive interfaces and pages for the web portal of an edtech platform serving live production traffic."],
    tags: ["Frontend", "Responsive UI", "Production"],
  },
  {
    role: "Frontend Development Intern",
    company: "Verso",
    org: "Wandrai",
    period: "Oct 2025 — Nov 2025",
    location: "Delhi",
    current: false,
    summary: "Owned the MVP frontend from scratch.",
    bullets: [
      "Owned the MVP frontend from scratch, including the landing page, auth flow and core application screens.",
      "Resolved dependency conflicts blocking integration with the existing codebase by migrating the build from Expo to React + Vite.",
      "Worked with the backend team on API integrations essential to the MVP launch.",
    ],
    tags: ["React", "Vite", "Auth Flow", "API Integration"],
  },
];

export const education = {
  degree: "B.Tech, Computer Science",
  school: "KCC Institute of Technology & Management",
  period: "2023 — 2027",
  location: "Greater Noida",
  cgpa: "7.87 / 10 (till 6th semester)",
  coursework: ["Data Structures", "Algorithms", "Operating Systems", "Computer Networks", "Database Systems", "Probability & Statistics"],
};

export const skills = [
  { id: "backend", label: "Backend & Systems", description: "Production APIs, jobs, caching & performance",
    items: ["Node.js", "Express", "MongoDB", "FastAPI", "Flask", "MERN", "REST APIs", "Background Jobs", "Scheduling", "Redis Caching", "Query Optimization", "AWS Lambda", "AWS Secrets Manager", "Docker", "Linux"] },
  { id: "ai", label: "AI / ML", description: "Detection, NLP & LLM systems",
    items: ["YOLOv8", "OpenCV", "Scikit-learn", "NLP", "LLM APIs", "LLM Security"] },
  { id: "languages", label: "Languages", description: "What I write in",
    items: ["Python", "JavaScript", "C++", "C", "SQL"] },
  { id: "tools", label: "Tools", description: "Daily workflow",
    items: ["Git", "GitHub", "Postman", "VS Code", "Jupyter", "Hugging Face Spaces", "Netlify"] },
];

export type ProjectVisual = "shield" | "detection" | "scan" | "waveform" | "graph";

export const projects = [
  {
    num: "01", slug: "ironguard", title: "IronGuard", subtitle: "LLM Security Gateway", year: "",
    description: "A multi-layer gateway that inspects LLM requests in real time for prompt injection, jailbreaks and PII leaks.",
    longDescription: "IronGuard sits in front of an LLM and inspects every request in real time. A hybrid scoring engine runs a deterministic rule-based fast path ahead of an expensive semantic layer, so obvious attacks are stopped cheaply and only ambiguous traffic pays for deep inspection. Latency was cut from 13 s to 372 ms by restructuring a serial inspection pipeline into parallel stages and removing redundant blocking calls, with each bottleneck isolated through staged timing.",
    metrics: [
      { value: "372 ms", label: "from 13,000 ms" },
      { value: "84.8%", label: "detection accuracy (from 64%)" },
      { value: "89.9%", label: "true-positive rate (from 60%)" },
      { value: "2,700", label: "adversarial test cases" },
    ],
    highlights: ["Prompt-injection, jailbreak & PII-leak detection", "Parallel staged inspection pipeline", "Rule-based fast path ahead of semantic layer", "Bottlenecks isolated via staged timing"],
    tags: ["Python", "FastAPI", "Vector DB", "NLP"],
    github: "", // TODO: add link
    live: "",
    visual: "shield" as ProjectVisual,
    badge: "",
  },
  {
    num: "02", slug: "visionx", title: "VisionX", subtitle: "Safety-Critical Object Detection", year: "2025",
    description: "YOLOv8s detector trained on synthetic space-station data to identify fire extinguishers, toolboxes and oxygen tanks.",
    longDescription: "VisionX detects safety-critical equipment in space-station environments. Trained on synthetic data, it uses mosaic and low-light augmentation for robustness to occlusion and poor lighting. I implemented the full pipeline: data loading, training, evaluation and annotated prediction export.",
    metrics: [
      { value: "0.949", label: "mAP@0.5" },
      { value: "0.91", label: "precision" },
      { value: "0.86", label: "recall" },
      { value: "21.5 ms", label: "per image on T4" },
    ],
    highlights: ["Mosaic & low-light augmentation", "Robust to occlusion", "End-to-end train → eval → export pipeline", "Live demo on Hugging Face Spaces"],
    tags: ["Python", "YOLOv8", "OpenCV"],
    github: "https://github.com/Piyush-Karn/Visionx",
    live: "https://piyushkarn-visionx.hf.space/",
    visual: "detection" as ProjectVisual,
    badge: "Hackwave 2025 · 1st place (Duality AI Track)",
  },
  {
    num: "03", slug: "resumesnap", title: "ResumeSnap", subtitle: "Resume Analysis & Job Matching", year: "2024",
    description: "OCR + LLM extraction pipeline that turns unstructured resumes into structured records and ranks them against job descriptions.",
    longDescription: "ResumeSnap converts unstructured resumes into structured records using OCR and LLM extraction, then ranks them against job descriptions with cosine similarity across a 5,000-record dataset — cutting matching time from ~15 minutes of manual review to under 10 seconds per resume.",
    metrics: [
      { value: "<10 s", label: "per resume (from ~15 min)" },
      { value: "5,000", label: "record dataset" },
    ],
    highlights: ["OCR for scanned documents", "LLM-based structured extraction", "Cosine-similarity ranking", "Interactive Streamlit UI"],
    tags: ["Python", "Gemini API", "OCR", "Scikit-learn", "Streamlit"],
    github: "https://github.com/Piyush-Karn/resumesnap",
    live: "https://piyushkarn-resumesnap.hf.space/",
    visual: "scan" as ProjectVisual,
    badge: "",
  },
  {
    num: "04", slug: "voiceguard", title: "VoiceGuard", subtitle: "AI-Powered Domestic Violence Detection", year: "2024",
    description: "Privacy-first system for real-time distress detection with stealth intervention and RAG-powered legal assistance.",
    longDescription: "VoiceGuard analyzes real-time audio to identify patterns of distress and aggression without compromising privacy. It features emergency SOS alerts, encrypted evidence logging, and a RAG-powered legal chatbot that provides Indian legal context and FIR drafting.",
    metrics: [],
    highlights: ["Real-time audio threat detection", "RAG-powered legal guidance", "SOS & secure evidence locker", "Stealth mode, multilingual"],
    tags: ["FastAPI", "Whisper", "Llama 3.3", "ChromaDB"],
    github: "https://github.com/Piyush-Karn/voiceguard",
    live: "https://piyushkarn-voiceguard-new.hf.space/",
    visual: "waveform" as ProjectVisual,
    badge: "",
  },
];

export const archive = [
  { title: "Movie Recommender", subtitle: "Content-based recommendations · TF-IDF + cosine similarity", tags: ["Scikit-learn", "Streamlit"],
    github: "https://github.com/Piyush-Karn/Movie-Recommendation-System", live: "https://smartpicks-movie-recommender.streamlit.app/" },
];

export const achievements = [
  { title: "1st Place — Duality AI Track", event: "Hackwave 2025", date: "Apr 2025",
    description: "VisionX: object detection for space-station safety." },
];

export const sections = ["About", "Skills", "Experience", "Projects", "Impact", "Contact"] as const;
