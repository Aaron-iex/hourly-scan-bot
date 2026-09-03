import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
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

const TITLE = "Zeroth Hour — 5-Hour Planetary Defence Makeathon";
const DESCRIPTION =
  "Jaya Engineering College Department of ECE presents Makeathon: Project Zeroth Hour. Join 500+ engineers for a 5-hour makeathon across five fronts of planetary defence. 22,000 INR overall prize cache.";

type Tab = "home" | "events" | "about";
const VALID_TABS: Tab[] = ["home", "events", "about"];

/** Read tab from URL hash (e.g. #events → "events"). Falls back to "home". */
function getTabFromHash(): Tab {
  if (typeof window === "undefined") return "home";
  const raw = window.location.hash.replace("#", "").toLowerCase();
  return VALID_TABS.includes(raw as Tab) ? (raw as Tab) : "home";
}

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

  /* ── Hash-synced tab state ──
   * Tab navigation is reflected in the URL hash so mobile back button
   * switches tabs dynamically instead of triggering a full page reload. */
  const [tab, setTabRaw] = useState<Tab>(getTabFromHash);

  /** Push a new history entry when the user actively navigates to a tab. */
  const setTab = useCallback((next: Tab) => {
    setTabRaw(next);
    const hash = next === "home" ? "" : `#${next}`;
    // Only push if the hash actually changed to avoid duplicate entries
    if (window.location.hash !== (hash || "#")) {
      window.history.pushState(null, "", hash || window.location.pathname);
    }
  }, []);

  /** Listen for the browser back/forward button (popstate) to update tab state. */
  useEffect(() => {
    const onPop = () => {
      setTabRaw(getTabFromHash());
      // Scroll to top when navigating back between tabs
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const openRegister = useCallback((selected = "") => {
    setTrack(selected);
    setOpen(true);
  }, []);

  const closeRegister = useCallback(() => setOpen(false), []);

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
      <RegisterDialog open={open} onClose={closeRegister} initialTrack={track} />
    </div>
  );
}
