export type Track = {
  id: string;
  code: string;
  title: string;
  icon: "waves" | "flame" | "rocket" | "anchor" | "zap";
  brief: string;
  stack: string[];
};

export const TRACKS: Track[] = [
  { id: "embedded", code: "DOMAIN 01", title: "Embedded Systems", icon: "zap", brief: "Design intelligent, reliable hardware that senses, computes, and responds in the real world.", stack: ["Microcontrollers", "RTOS", "PCB Design", "Edge AI"] },
  { id: "vlsi", code: "DOMAIN 02", title: "VLSI & Digital Design", icon: "zap", brief: "Explore digital logic, chip architecture, verification, and efficient hardware acceleration.", stack: ["Verilog", "FPGA", "ASIC", "Verification"] },
  { id: "communication", code: "DOMAIN 03", title: "Communication Networks", icon: "waves", brief: "Build the connected future through RF systems, wireless networks, antennas, and signal integrity.", stack: ["5G / 6G", "RF Systems", "Optical Fiber", "Antennas"] },
  { id: "iot", code: "DOMAIN 04", title: "IoT & Robotics", icon: "rocket", brief: "Connect sensors, cloud platforms, and autonomous machines to solve practical campus and community needs.", stack: ["IoT", "Robotics", "Cloud", "Automation"] },
  { id: "signals", code: "DOMAIN 05", title: "Signal Processing", icon: "anchor", brief: "Turn complex signals into meaningful insight with audio, image, biomedical, and machine-learning systems.", stack: ["DSP", "Computer Vision", "MATLAB", "ML"] },
];

export type Stage = "prep" | "hacking" | "pitch";
export type TimelineEvent = { phase: string; time: string; title: string; location: string; stage: Stage; description: string; status: string };
export const TIMELINE: TimelineEvent[] = [
  { phase: "T-0 // BRIEFING", time: "09:00", title: "Team briefing & challenge reveal", location: "ECE Innovation Lab", stage: "prep", description: "Understand the problem statement, form teams, and receive the technical challenge brief.", status: "REGISTRATION OPEN" },
  { phase: "T+0.5 // LOCKDOWN", time: "09:30", title: "Five-hour hackathon begins", location: "ECE Innovation Lab", stage: "hacking", description: "The build sprint starts. Teams prototype, test, and iterate with support from faculty coordinators.", status: "SPRINT START" },
  { phase: "T+2.5 // MIDPOINT", time: "11:30", title: "Midpoint review & mentor check-in", location: "Project Review Zone", stage: "hacking", description: "Share your progress, validate your approach, and sharpen the working prototype with guided feedback.", status: "REVIEW WINDOW" },
  { phase: "T+4.5 // CODE FREEZE", time: "13:30", title: "Final submission & demo preparation", location: "Submission Desk", stage: "pitch", description: "Lock your code, submit documentation, and prepare a clear demonstration for the judging panel.", status: "SUBMISSION LOCK" },
  { phase: "T+5 // AWARDS", time: "14:00", title: "Project demos & award ceremony", location: "ECE Seminar Hall", stage: "pitch", description: "Teams present their solutions. The top three overall projects receive the prize pool and certificates.", status: "GRAND FINALE" },
];

export const LEADERSHIP = {
  hod: { name: "Dr. A. Saravanan", role: "Head of the Department", org: "Department of Electronics and Communication Engineering" },
  faculty: [
    { name: "Faculty Coordinator 01", role: "Faculty Coordinator", org: "Name to be updated" },
    { name: "Faculty Coordinator 02", role: "Faculty Coordinator", org: "Name to be updated" },
  ],
  students: [
    { name: "Student Event Head", role: "Student Event Head", org: "Name to be updated" },
    { name: "Student Event Coordinator", role: "Student Event Coordinator", org: "Name to be updated" },
    { name: "Documentation Head", role: "Documentation Head", org: "Name to be updated" },
    { name: "Documentation Staff", role: "Documentation Staff", org: "Name to be updated" },
  ],
};
export const SPONSORS = [{ name: "Cooper Elevators", image: "/images/sponsors/image.png" }];
export const FAQS = [
  { q: "When is the ECE hackathon?", a: "The five-hour hackathon is scheduled for September 9. Detailed challenge information will be shared with registered teams." },
  { q: "What is the registration fee?", a: "Registration is opening soon. The participation fee is ₹200 per team." },
  { q: "Who can participate?", a: "ECE students and interdisciplinary student teams interested in electronics, communication, embedded systems, and innovation are welcome." },
  { q: "What are the prizes?", a: "The overall prize pool is ₹15,000: ₹10,000 for first place, ₹3,000 for second place, and ₹2,000 for third place." },
];
export const STATS = [
  { label: "PRIZE POOL", value: "₹15,000", desc: "Top three projects overall" },
  { label: "EVENT DATE", value: "SEPT 09", desc: "Registration opening soon" },
  { label: "SPRINT WINDOW", value: "5 HOURS", desc: "Build, review, present" },
  { label: "DOMAINS", value: "05", desc: "ECE innovation areas" },
];
export const PRIZES = [
  { place: "01", label: "First Prize", amount: "₹10,000" },
  { place: "02", label: "Second Prize", amount: "₹3,000" },
  { place: "03", label: "Third Prize", amount: "₹2,000" },
];

export const EVENT_DETAILS = { date: "September 9", fee: "₹200 per team", status: "Registration opening soon", duration: "Five-hour hackathon" };
