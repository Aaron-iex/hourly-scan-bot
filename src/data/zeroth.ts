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
    id: "embedded",
    code: "TRACK 01",
    title: "Embedded & IoT Systems",
    icon: "zap",
    threat: "REAL-TIME CRITICAL",
    brief:
      "Build firmware-driven solutions for real-world hardware. Think smart-grid monitors, wearable health telemetry, sensor-fusion boards, or low-power edge nodes that survive where the cloud cannot.",
    stack: ["RTOS", "ARM Cortex", "Sensors", "Edge AI"],
  },
  {
    id: "signal",
    code: "TRACK 02",
    title: "Signal & Image Processing",
    icon: "waves",
    threat: "NOISE FLOOR 92 dB",
    brief:
      "Extract meaning from noise. Ship adaptive filters, biomedical signal classifiers, radar return processors, or computer-vision pipelines that run on constrained hardware.",
    stack: ["DSP", "FFT", "OpenCV", "MATLAB"],
  },
  {
    id: "rf",
    code: "TRACK 03",
    title: "RF, Antennas & 5G/6G",
    icon: "anchor",
    threat: "SPECTRUM OVERLOAD",
    brief:
      "Own the airwaves. Design microstrip antennas, software-defined radio stacks, beamforming arrays, or low-latency modulation schemes for next-generation wireless links.",
    stack: ["SDR", "Antenna Design", "Beamforming", "MIMO"],
  },
  {
    id: "vlsi",
    code: "TRACK 04",
    title: "VLSI & Semiconductor Design",
    icon: "flame",
    threat: "DENSITY 5NM",
    brief:
      "Push silicon to its limit. Create low-power digital ASIC blocks, analog front-end layouts, or FPGA-accelerated inference engines that prove ideas before tape-out.",
    stack: ["Verilog", "FPGA", "ASIC", "Low Power"],
  },
  {
    id: "open",
    code: "TRACK 05",
    title: "Open ECE Innovation",
    icon: "rocket",
    threat: "UNCLASSIFIED",
    brief:
      "No rules, pure electronics ingenuity. Off-grid power harvesters, LiDAR rangefinders, acoustic levitation rigs, or any hardware idea that does not fit a single track.",
    stack: ["Hardware", "Robotics", "Power", "Mixed-Signal"],
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
    location: "ECE Labs / Virtual Command Center",
    stage: "prep",
    description:
      "Squad registration closes. Access hardware kits, component inventory, datasheets, and team formation channels.",
    status: "REGISTRATION OPEN",
  },
  {
    phase: "T+0.5 HRS // LOCKDOWN",
    time: "09:30",
    title: "Sprint Start — 5-Hour Build Begins",
    location: "ECE Project Labs / Online Platform",
    stage: "hacking",
    description:
      "The 5-hour continuous build begins. Mentors deployed across embedded systems, DSP, RF, and VLSI tracks.",
    status: "CRITICAL SPRINT",
  },
  {
    phase: "T+2.5 HRS // MID-POINT",
    time: "11:30",
    title: "Mid-Point Constraint Injection & Status Check",
    location: "War Room Mentor Sessions",
    stage: "hacking",
    description:
      "Live constraint injection test. Teams adapt to unexpected power, noise, or bandwidth limits on their prototypes.",
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
    phase: "T+5 HRS // DEBRIEF",
    time: "14:00",
    title: "Lightning Pitches & Award Ceremony",
    location: "ECE Main Stage & Global Stream",
    stage: "pitch",
    description:
      "Top finalists present live. Cash prizes, certificates, and deployment funds awarded across all tracks.",
    status: "GRAND FINALE",
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
    q: "When exactly does Zeroth Hour run?",
    a: "Confirmed for Sept 11 — a 5-hour hackathon. The detailed timeline will be released to registered squads before lockdown.",
  },
  {
    q: "Who is allowed to enlist?",
    a: "ECE students, independent engineers, designers, and researchers worldwide. Participation is 200 INR per team.",
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
    a: "Engineering depth, hardware-software integration, resilience under the mid-point constraint injection, and clarity of the final pitch.",
  },
];

export const STATS = [
  { label: "PRIZE CACHE", value: "22,000 INR", desc: "1st 10k · 2nd 7k · 3rd 5k overall" },
  { label: "OPERATIVES", value: "500+", desc: "Engineers, designers, researchers" },
  { label: "SPRINT WINDOW", value: "5 HOURS", desc: "Continuous build" },
  { label: "ECE TRACKS", value: "05", desc: "Electronics & communication" },
];
