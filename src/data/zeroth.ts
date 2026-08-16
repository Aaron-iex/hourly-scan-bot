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
      "The Pacific Ring of Fire has reached critical instability. Build real-time AI seismic telemetry, automated coastal siren grids, ocean-bed hydrophone mesh networks, or anti-collapse dampening algorithms.",
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
    phase: "STAGE 1 // BRIEFING",
    time: "T-MINUS 14 DAYS",
    title: "Operative Onboarding & Squad Matching",
    location: "Virtual Command Center",
    stage: "prep",
    description:
      "Squad registration closes. Access classified crisis API keys, disaster datasets, and team formation channels.",
    status: "REGISTRATION OPEN",
  },
  {
    phase: "STAGE 1 // BRIEFING",
    time: "DAY 1 · 09:00",
    title: "Zeroth Hour Keynote: Planetary Survival Tech",
    location: "Main Auditorium & Live Broadcast",
    stage: "prep",
    description:
      "Opening address by crisis engineers and seismic researchers detailing real-world disaster dataset baselines.",
    status: "SCHEDULED",
  },
  {
    phase: "STAGE 2 // LOCKDOWN",
    time: "DAY 1 · 11:00",
    title: "DEFCON 1 Sprint Start",
    location: "Command Labs / Online Platform",
    stage: "hacking",
    description:
      "The 48-hour continuous build begins. Mentors deployed across drone robotics, sub-sea sensors, and off-grid radio.",
    status: "CRITICAL SPRINT",
  },
  {
    phase: "STAGE 2 // LOCKDOWN",
    time: "DAY 2 · 14:00",
    title: "Mid-Point Crisis Simulation",
    location: "War Room Mentor Sessions",
    stage: "hacking",
    description:
      "Live disaster injection test. Teams adapt prediction models to unexpected secondary shockwaves.",
    status: "SIMULATION EVENT",
  },
  {
    phase: "STAGE 3 // EVACUATION",
    time: "DAY 3 · 11:00",
    title: "Final Code Freeze & Repository Lock",
    location: "Platform Repo Lock",
    stage: "pitch",
    description:
      "Submissions locked. Demo videos, working prototypes, and architecture docs go to the judging panel.",
    status: "CODE FREEZE",
  },
  {
    phase: "STAGE 3 // EVACUATION",
    time: "DAY 3 · 16:00",
    title: "Grand Evacuation Pitch & Award Ceremony",
    location: "DEFCON Main Stage & Global Stream",
    stage: "pitch",
    description:
      "Top 10 finalists present live. $50,000 in cash prizes, incubator grants, and deployment funds awarded.",
    status: "GRAND FINALE",
  },
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
    a: "Official dates are being finalised with our broadcast partners and will be announced soon. Registered squads receive the calendar alert first.",
  },
  {
    q: "Who is allowed to enlist?",
    a: "University students, independent engineers, designers, and crisis researchers worldwide. Participation is free.",
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
  { label: "PRIZE CACHE", value: "$50,000+", desc: "Cash, grants & deployment funds" },
  { label: "OPERATIVES", value: "500+", desc: "Engineers, designers, researchers" },
  { label: "SPRINT WINDOW", value: "48 HRS", desc: "Continuous crisis build" },
  { label: "THREAT SECTORS", value: "05", desc: "Planetary defence tracks" },
];
