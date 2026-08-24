import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EmergencyTicker } from "@/components/zeroth/EmergencyTicker";
import { SiteNav } from "@/components/zeroth/SiteNav";
import { Hero } from "@/components/zeroth/Hero";
import { Sectors } from "@/components/zeroth/Sectors";
import { Roadmap } from "@/components/zeroth/Roadmap";
import { Intel } from "@/components/zeroth/Intel";
import { SiteFooter } from "@/components/zeroth/SiteFooter";
import { Sponsors } from "@/components/zeroth/Sponsors";
import { RegisterDialog } from "@/components/zeroth/RegisterDialog";
import { SabotageQuiz } from "@/components/zeroth/SabotageQuiz";

import { Reveal } from "@/components/zeroth/Reveal";

const TITLE = "Zeroth Hour — 5-Hour Planetary Defence Makeathon";
const DESCRIPTION =
  "Jaya Engineering College Department of ECE presents Makeathon: Project Zeroth Hour. Join 500+ engineers for a 5-hour makeathon across five fronts of planetary defence. 22,000 INR overall prize cache.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
  const [track, setTrack] = useState("");
  const [tab, setTab] = useState<"home" | "events" | "about">("home");

  const openRegister = (selected = "") => {
    setTrack(selected);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <EmergencyTicker />
      <SiteNav onRegister={() => openRegister()} activeTab={tab} onTabChange={setTab} />
      <main>
        {tab === "home" && (
          <>
            <Hero onRegister={() => openRegister()} />
            <Reveal><Sponsors /></Reveal>
            <Reveal><Sectors onRegister={openRegister} /></Reveal>
            <Reveal><SabotageQuiz /></Reveal>
            <Reveal><Roadmap onRegister={() => openRegister()} preview onExpand={() => setTab("events")} /></Reveal>
            <Reveal><Intel preview onExpand={() => setTab("about")} /></Reveal>
          </>
        )}
        {tab === "events" && (
          <>
            <Roadmap onRegister={() => openRegister()} />
            <Reveal><SabotageQuiz /></Reveal>
          </>
        )}
        {tab === "about" && <Intel />}
      </main>
      <SiteFooter />
      <RegisterDialog open={open} onClose={() => setOpen(false)} initialTrack={track} />
    </div>
  );
}
