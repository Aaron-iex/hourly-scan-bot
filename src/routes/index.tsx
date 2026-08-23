import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EmergencyTicker } from "@/components/zeroth/EmergencyTicker";
import { SiteNav } from "@/components/zeroth/SiteNav";
import { Hero } from "@/components/zeroth/Hero";
import { Sectors } from "@/components/zeroth/Sectors";
import { Roadmap } from "@/components/zeroth/Roadmap";
import { Intel } from "@/components/zeroth/Intel";
import { SiteFooter } from "@/components/zeroth/SiteFooter";
import { RegisterDialog } from "@/components/zeroth/RegisterDialog";

const TITLE = "Project Zeroth Hour — 5-Hour Disaster Tech Hackathon";
const DESCRIPTION =
  "Project Zeroth Hour is a five-hour ECE hackathon for building practical communication, embedded, and resilient electronics solutions. Entry is ₹200 per team; Wi-Fi and lunch will be provided. Prize pool: ₹22,000 total — ₹10,000, ₹7,000, and ₹5,000 for the top three teams.";

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
            <Sectors onRegister={openRegister} />
            <Roadmap onRegister={() => openRegister()} preview onExpand={() => setTab("events")} />
            <Intel preview onExpand={() => setTab("about")} />
          </>
        )}
        {tab === "events" && <Roadmap onRegister={() => openRegister()} />}
        {tab === "about" && <Intel />}
      </main>
      <SiteFooter />
      <RegisterDialog open={open} onClose={() => setOpen(false)} initialTrack={track} />
    </div>
  );
}
