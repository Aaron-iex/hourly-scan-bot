export type Track = {
  id: string;
  code: string;
  title: string;
  category: "PREDICTION" | "PREVENTION" | "MITIGATION" | "OPEN INNOVATION";
  icon: "waves" | "flame" | "rocket" | "anchor" | "zap";
  threat: string;
  brief: string;
  featured?: boolean;
  stack: string[];
};

export const TRACKS: Track[] = [
  {
    id: "prediction",
    code: "SECTOR 01",
    title: "Disaster Prediction & Early Warning",
    category: "PREDICTION",
    icon: "waves",
    threat: "PREDICTION TECH",
    brief:
      "Build early-warning systems, seismic sensor alarms, flood prediction models, weather monitoring IoT, or real-time alert apps to notify citizens before disasters hit.",
    stack: [],
  },
  {
    id: "prevention",
    code: "SECTOR 02",
    title: "Hazard Prevention & Safety Tech",
    category: "PREVENTION",
    icon: "flame",
    threat: "PREVENTION TECH",
    brief:
      "Design smart hazard detection tools, gas/fire automated shutoff circuits, thermal monitoring nodes, or preventive safety systems that stop disasters before they escalate.",
    stack: [],
  },
  {
    id: "mitigation",
    code: "SECTOR 03",
    title: "Emergency Mitigation & Rescue Tech",
    category: "MITIGATION",
    icon: "anchor",
    threat: "MITIGATION TECH",
    brief:
      "Develop offline SOS radio transmitters, emergency mesh networks, smart medical triage assistants, or post-impact resource distribution apps for fast disaster recovery.",
    stack: [],
  },
  {
    id: "habitat",
    code: "SECTOR 04",
    title: "Environmental & Habitat Protection",
    category: "PREVENTION",
    icon: "rocket",
    threat: "PROTECTION TECH",
    brief:
      "Create climate telemetry monitors, water-level safety devices, solar/renewable back-up power nodes, or smart environmental controllers for vulnerable habitats.",
    stack: [],
  },
  {
    id: "open",
    code: "SECTOR 05 // FEATURED",
    title: "Open Innovation (Any Tech Project)",
    category: "OPEN INNOVATION",
    icon: "zap",
    featured: true,
    threat: "ANY PROJECT ALLOWED",
    brief:
      "★ MOST POPULAR — Bring your own idea! Open for any hardware prototype, software app, IoT system, AI model, or engineering innovation. Zero restrictions!",
    stack: [],
  },
];

export const STATS = [
  { label: "PRIZE CACHE", val: "₹22K INR" },
  { label: "SPRINT DURATION", val: "5 HOURS" },
  { label: "THREAT SECTORS", val: "5 TRACKS" },
  { label: "CLEARANCE RATE", val: "LIMITED" },
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
      "5-hour intense continuous sprint begins. Squads start prototyping hardware, firmware, and student engineering solutions.",
    status: "SPRINT ACTIVE",
  },
  {
    phase: "STAGE 2 // REVIEW",
    time: "01:00 PM",
    title: "Mid-Point Progress Inspection & Lunch Break",
    location: "Jaya Auditorium",
    stage: "hacking",
    description:
      "Mentors visit tables for prototype reviews, technical feedback, and troubleshooting support.",
    status: "MENTOR ROUND ACTIVE",
  },
  {
    phase: "STAGE 2 // FINAL SPRINT",
    time: "03:30 PM",
    title: "Project Freeze & Code Lockdown",
    location: "Jaya Auditorium",
    stage: "hacking",
    description:
      "Stop work command. Prototypes and presentations locked for jury evaluation.",
    status: "CODE LOCKDOWN",
  },
  {
    phase: "STAGE 3 // EVALUATION",
    time: "04:00 PM",
    title: "Jury Demonstrations & Award Ceremony",
    location: "Jaya Auditorium",
    stage: "pitch",
    description:
      "3-minute live prototype demonstrations before jury, followed by announcement of winners and prize distribution.",
    status: "JURY DEMOS ACTIVE",
  },
];

export const FAQS = [
  {
    q: "When is the makeathon?",
    a: "Confirmed for Sept 17 — a 5-hour makeathon. The detailed timeline will be released to registered squads before lockdown.",
  },
  {
    q: "Who is allowed to enlist?",
    a: "Students from all engineering disciplines, polytechnic colleges, and universities. Registration is ₹200 INR per team.",
  },
  {
    q: "How large can a squad be?",
    a: "Between 1 and 4 members per squad. Solo participants are also welcome!",
  },
  {
    q: "Can I bring my own project or idea (Open Innovation)?",
    a: "Yes! Sector 05 (Open Innovation) allows any software app, hardware prototype, IoT project, or AI model. All creative ideas are welcome.",
  },
];
