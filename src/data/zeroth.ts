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
      "Build and innovate technology to help protect communities, forecast seismic disruptions, and coordinate immediate responses to tsunamis and earthquakes.",
    stack: [],
  },
  {
    id: "wildfire",
    code: "SECTOR 02",
    title: "Wildfire Suppression Tech",
    icon: "flame",
    threat: "HEAT INDEX 61°C",
    brief:
      "Unprecedented heatwaves ignite mega-blazes worldwide. Ship autonomous drone-swarm retardant coordination, satellite infrared trajectory models, or live evacuation routing for trapped citizens.",
    stack: [],
  },
  {
    id: "offworld",
    code: "SECTOR 03",
    title: "Off-World Habitat (Mars / Moon)",
    icon: "rocket",
    threat: "ATMOS COLLAPSE",
    brief:
      "When Earth's atmosphere fails, humanity looks outward. Create habitat life-support telemetry, solar-flare radiation monitors, regolith 3D-printing controllers, or Martian oxygen generation networks.",
    stack: [],
  },
  {
    id: "oceanic",
    code: "SECTOR 04",
    title: "Oceanic Civilizations",
    icon: "anchor",
    threat: "SEA LEVEL +4.2M",
    brief:
      "Rising seas swallow coastal megacities. Design submerged modular habitats, deep-current energy harvesting arrays, acoustic underwater data protocols, or marine food-security systems.",
    stack: [],
  },
  {
    id: "open",
    code: "SECTOR 05",
    title: "Open Innovation (Doomsday Tech)",
    icon: "zap",
    threat: "UNCLASSIFIED",
    brief:
      "No rules, pure survival ingenuity. Off-grid P2P radio messaging, EMP surge defence, automated triage medkits, or post-collapse resource distribution algorithms.",
    stack: [],
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
    phase: "STAGE 1 // REPORTING",
    time: "08:00 AM",
    title: "Event Registration & Squad Check-in",
    location: "Jaya Auditorium",
    stage: "prep",
    description:
      "Squad check-in, clearance badge verification, kit allocation, and preliminary briefing.",
    status: "REGISTRATION DESK ACTIVE",
  },
  {
    phase: "STAGE 2 // KICKOFF",
    time: "11:00 AM",
    title: "Makeathon Official Start — 5-Hour Build Sprint",
    location: "Jaya Auditorium",
    stage: "hacking",
    description:
      "5-hour intense continuous sprint begins. Squads start prototyping hardware, firmware, and planetary defense solutions.",
    status: "SPRINT ACTIVE",
  },
  {
    phase: "STAGE 2 // REVIEW",
    time: "01:00 PM",
    title: "Mid-Point Progress Inspection & Lunch Break",
    location: "Jaya Auditorium",
    stage: "hacking",
    description:
      "Milestone evaluation by faculty mentors and refreshment lunch break for all operatives.",
    status: "MID-EVALUATION & LUNCH",
  },
  {
    phase: "STAGE 3 // FREEZE",
    time: "04:00 PM",
    title: "Finish of 5-Hour Makeathon & Final Project Lock",
    location: "Jaya Auditorium",
    stage: "pitch",
    description:
      "5 hours of sprint concluded. Final hardware demo submissions and project evaluation by the jury.",
    status: "SUBMISSION LOCKDOWN",
  },
  {
    phase: "STAGE 3 // AWARDS",
    time: "04:30 PM",
    title: "Announcement of Winners & Valedictory Ceremony",
    location: "Jaya Auditorium",
    stage: "pitch",
    description:
      "Grand announcement of overall champions (1st ₹10k, 2nd ₹7k, 3rd ₹5k), certificate distribution, and closing ceremony.",
    status: "PRIZE CACHE DISTRIBUTION",
  },
];

export const MENTORS = [
  {
    name: "Dr. A. Saravanan",
    role: "Head of Department, ECE",
    org: "Faculty Mentor",
    specialty: "Signal Processing & VLSI",
  },
  {
    name: "Faculty Coordinator I",
    role: "Faculty Coordinator",
    org: "Department of ECE",
    specialty: "Embedded Systems",
  },
  {
    name: "Faculty Coordinator II",
    role: "Faculty Coordinator",
    org: "Department of ECE",
    specialty: "RF & Wireless",
  },
  {
    name: "Student Event Head",
    role: "Event Head",
    org: "Student Coordinator",
    specialty: "Overall Operations",
  },
];

export const FAQS = [
  {
    q: "When is the makeathon?",
    a: "Confirmed for Sept 17 — a 5-hour makeathon. The detailed timeline will be released to registered squads before lockdown.",
  },
  {
    q: "Who is allowed to enlist?",
    a: "Students, independent engineers, designers, and researchers worldwide. Participation is 200 INR per team.",
  },
  {
    q: "How large can a squad be?",
    a: "Between 1 and 4 members. Solo applicants are welcome to participate as well.",
  },
  {
    q: "Do I need hardware to compete?",
    a: "No. Software-only submissions compete on equal footing. Hardware teams get a dedicated lab bench and component budget.",
  },
  {
    q: "What is actually judged?",
    a: "Engineering depth, hardware-software integration, resilience under the mid-point constraint injection, and clarity of the final pitch.",
  },
];

export const STATS = [
  { label: "PRIZE CACHE", value: "22,000 INR", desc: "1st 10k · 2nd 7k · 3rd 5k overall" },
  { label: "OPERATIVES", value: "500+", desc: "Engineers, designers, researchers" },
  { label: "SPRINT WINDOW", value: "5 HOURS", desc: "Continuous build" },
  { label: "THREAT SECTORS", value: "05", desc: "Planetary defence tracks" },
];
