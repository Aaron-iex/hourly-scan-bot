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

const TITLE = "Zeroth Hour — 5-Hour Planetary Defence Buildathon";
const DESCRIPTION =
  "Join 500+ engineers for a 5-hour buildathon across five fronts of planetary defence: tsunami, earthquake, wildfire suppression, oceanic habitats, off-world habitation, and doomsday tech. 22,000 INR overall prize cache.";

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
            <Sponsors />
            <Sectors onRegister={openRegister} />
            <SabotageQuiz />
            <Roadmap onRegister={() => openRegister()} preview onExpand={() => setTab("events")} />
            <Intel preview onExpand={() => setTab("about")} />
          </>
        )}
        {tab === "events" && (
          <>
            <Roadmap onRegister={() => openRegister()} />
            <SabotageQuiz />
          </>
        )}
        {tab === "about" && <Intel />}
      </main>
      <SiteFooter />
      <RegisterDialog open={open} onClose={() => setOpen(false)} initialTrack={track} />
    </div>
  );
}
