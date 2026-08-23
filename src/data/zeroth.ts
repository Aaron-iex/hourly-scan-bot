export type Track = {
  id: string;
  code: string;
  title: string;
  icon: "waves" | "flame" | "rocket" | "anchor" | "zap";
  threat: string;
  brief: string;
  stack: string[];
};

export const TRACKS: Track[] = [
  {
    id: "seismic",
    code: "SECTOR 01",
    title: "Tsunami & Earthquake Mitigation",
    icon: "waves",
    threat: "RICHTER 8.9",
    brief:
      "The campus communication grid is entering a critical signal window. Build real-time AI telemetry, intelligent embedded systems, next-generation wireless networks, or resilient electronics that keep people connected when every second matters.",
    stack: ["Sensor Fusion", "Edge AI", "GIS", "Early Warning"],
  },
  {
    id: "wildfire",
    code: "SECTOR 02",
    title: "Wildfire Suppression Tech",
    icon: "flame",
    threat: "HEAT INDEX 61°C",
    brief:
      "Unprecedented heatwaves ignite mega-blazes worldwide. Ship autonomous drone-swarm retardant coordination, satellite infrared trajectory models, or live evacuation routing for trapped citizens.",
    stack: ["Drone Swarms", "Computer Vision", "Routing", "Satellite IR"],
  },
  {
    id: "offworld",
    code: "SECTOR 03",
    title: "Off-World Habitat (Mars / Moon)",
    icon: "rocket",
    threat: "ATMOS COLLAPSE",
    brief:
      "When Earth's atmosphere fails, humanity looks outward. Create habitat life-support telemetry, solar-flare radiation monitors, regolith 3D-printing controllers, or Martian oxygen generation networks.",
    stack: ["Life Support", "Telemetry", "Robotics", "ISRU"],
  },
  {
    id: "oceanic",
    code: "SECTOR 04",
    title: "Oceanic Civilizations",
    icon: "anchor",
    threat: "SEA LEVEL +4.2M",
    brief:
      "Rising seas swallow coastal megacities. Design submerged modular habitats, deep-current energy harvesting arrays, acoustic underwater data protocols, or marine food-security systems.",
    stack: ["Hydro Power", "Acoustics", "Structures", "Aquaculture"],
  },
  {
    id: "open",
    code: "SECTOR 05",
    title: "Open Innovation (Doomsday Tech)",
    icon: "zap",
    threat: "UNCLASSIFIED",
    brief:
      "No rules, pure survival ingenuity. Off-grid P2P radio messaging, EMP surge defence, automated triage medkits, or post-collapse resource distribution algorithms.",
    stack: ["Mesh Radio", "Hardware", "Crypto", "Logistics"],
  },
];

export type Stage = "prep" | "hacking" | "pitch";

export type TimelineEvent = {
  phase: string;
  time: string;
  title: string;
  location: string;
  stage: Stage;
  description: string;
  status: string;
};

export const TIMELINE: TimelineEvent[] = [
  {
    phase: "T-0 HRS // BRIEFING",
    time: "09:00",
    title: "Operative Onboarding & Track Selection",
    location: "Virtual Command Center",
    stage: "prep",
    description:
      "Squad registration closes. Access classified crisis API keys, disaster datasets, and team formation channels.",
    status: "REGISTRATION OPEN",
  },
  {
    phase: "T+0.5 HRS // LOCKDOWN",
    time: "09:30",
    title: "DEFCON 1 Sprint Start — 5-Hour Hackathon Begins",
    location: "Command Labs / Online Platform",
    stage: "hacking",
    description:
      "The 5-hour continuous build begins. Mentors deployed across drone robotics, sub-sea sensors, and off-grid radio.",
    status: "CRITICAL SPRINT",
  },
  {
    phase: "T+2.5 HRS // MID-POINT",
    time: "11:30",
    title: "Mid-Point Crisis Injection & Status Check",
    location: "War Room Mentor Sessions",
    stage: "hacking",
    description:
      "Live disaster injection test. Teams adapt prediction models to unexpected secondary shockwaves.",
    status: "SIMULATION EVENT",
  },
  {
    phase: "T+4.5 HRS // CODE FREEZE",
    time: "13:30",
    title: "Final Code Freeze & Repository Lock",
    location: "Platform Repo Lock",
    stage: "pitch",
    description:
      "Submissions locked. Demo videos, working prototypes, and architecture docs go to the judging panel.",
    status: "CODE FREEZE",
  },
  {
    phase: "T+5 HRS // EVACUATION",
    time: "14:00",
    title: "Lightning Pitches & Prize Award Ceremony",
    location: "DEFCON Main Stage & Global Stream",
    stage: "pitch",
    description:
      "Top finalists present live. Prizes of ₹10,000, ₹7,000, and ₹5,000 are awarded to the top three teams.",
    status: "GRAND FINALE",
  },
];

export const LEADERSHIP = [
  { name: "Dr. A. Saravanan", role: "HOD OF ECE", org: "Department of Electronics & Communication Engineering", specialty: "Department Leadership" },
  { name: "Faculty Coordinator 01", role: "FACULTY COORDINATOR", org: "ECE Department", specialty: "Event Operations" },
  { name: "Faculty Coordinator 02", role: "FACULTY COORDINATOR", org: "ECE Department", specialty: "Technical Review" },
  { name: "Student Event Head", role: "STUDENT EVENT HEAD", org: "ECE Student Community", specialty: "Event Command" },
  { name: "Student Coordinator", role: "STUDENT COORDINATOR", org: "ECE Student Community", specialty: "Team Coordination" },
  { name: "Documentation Head", role: "DOCUMENTATION HEAD", org: "ECE Student Community", specialty: "Media & Records" },
  { name: "Documentation Staff", role: "DOCUMENTATION STAFF", org: "ECE Student Community", specialty: "Content Support" },
];

export const MENTORS = [
  {
    name: "Dr. Evelyn Vance",
    role: "Chief Seismic Telemetry Lead",
    org: "Pacific Fault Monitoring Institute",
    specialty: "Seismic AI & Hydrophones",
  },
  {
    name: "Cmdr. Marcus Vance",
    role: "Autonomous Drone Robotics Director",
    org: "AeroShield Wildfire Containment",
    specialty: "Swarm Robotics & GIS",
  },
  {
    name: "Dr. Astra Lin",
    role: "Exoplanet Life Support Architect",
    org: "Mars Habitat Foundation",
    specialty: "Lunar & Martian Life Support",
  },
  {
    name: "Kaelen Thorne",
    role: "Post-Collapse Mesh Communications",
    org: "Open EMP Grid Alliance",
    specialty: "Off-grid LoRa Protocols",
  },
];

export const FAQS = [
  {
    q: "When exactly does Zeroth Hour run?",
    a: "Confirmed for Sept 9 — a 5-hour hackathon. The detailed timeline will be released to registered squads before lockdown.",
  },
  {
    q: "Who is allowed to enlist?",
    a: "University students and independent builders can participate. Entry is ₹200 per team. Wi-Fi and lunch will be provided at the venue.",
  },
  {
    q: "How large can a squad be?",
    a: "Between 2 and 5 operatives. Solo applicants are matched into squads during the briefing stage.",
  },
  {
    q: "Do I need hardware to compete?",
    a: "No. Software-only submissions compete on equal footing. Hardware teams get a dedicated lab bench and component budget.",
  },
  {
    q: "What is actually judged?",
    a: "Real-world disaster impact, technical depth, resilience under the mid-point crisis simulation, and clarity of the evacuation pitch.",
  },
];

export const STATS = [
  { label: "PRIZE POOL", value: "₹22,000", desc: "1st ₹10k · 2nd ₹7k · 3rd ₹5k" },
  { label: "TEAM FORMAT", value: "ECE", desc: "Student teams and builders" },
  { label: "SPRINT WINDOW", value: "5 HOURS", desc: "Continuous crisis build" },
  { label: "THREAT SECTORS", value: "05", desc: "Planetary defence tracks" },
];
