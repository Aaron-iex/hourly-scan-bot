import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
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
import { loadState, saveState, STORAGE_KEYS } from "@/lib/state-persistence";

const TITLE = "Zeroth Hour — 5-Hour Planetary Defence Makeathon";
const DESCRIPTION =
  "Jaya Engineering College Department of ECE presents Makeathon: Project Zeroth Hour. Join 500+ engineers for a 5-hour makeathon across five fronts of planetary defence. 22,000 INR overall prize cache.";

type Tab = "home" | "events" | "about";
const VALID_TABS: Tab[] = ["home", "events", "about"];

/** Read tab from URL hash or persisted storage. Falls back to "home". */
function getInitialTab(): Tab {
  if (typeof window === "undefined") return "home";
  const rawHash = window.location.hash.replace("#", "").toLowerCase();
  if (VALID_TABS.includes(rawHash as Tab)) {
    return rawHash as Tab;
  }
  return loadState<Tab>(STORAGE_KEYS.ACTIVE_TAB, "home");
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

  const [tab, setTabRaw] = useState<Tab>(getInitialTab);
  const scrollPositionsRef = useRef<Record<Tab, number>>(
    loadState<Record<Tab, number>>(STORAGE_KEYS.TAB_SCROLLS, { home: 0, events: 0, about: 0 })
  );

  /** Save current scroll position before switching tabs or unloading */
  const saveCurrentScroll = useCallback((currentTab: Tab) => {
    if (typeof window === "undefined") return;
    scrollPositionsRef.current[currentTab] = window.scrollY;
    saveState(STORAGE_KEYS.TAB_SCROLLS, scrollPositionsRef.current);
  }, []);

  /** Change tab with smooth URL hash, persistent state, and scroll restoration */
  const setTab = useCallback(
    (next: Tab) => {
      saveCurrentScroll(tab);
      setTabRaw(next);
      saveState(STORAGE_KEYS.ACTIVE_TAB, next);

      const hash = next === "home" ? "" : `#${next}`;
      if (window.location.hash !== (hash || "#")) {
        window.history.pushState(null, "", hash || window.location.pathname);
      }

      // Restore target tab's scroll position with brief DOM settling delay
      setTimeout(() => {
        const targetScroll = scrollPositionsRef.current[next] || 0;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }, 80);
    },
    [tab, saveCurrentScroll]
  );

  /** Listen for browser Back/Forward (popstate) to synchronize active tab & scroll position */
  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      const nextTab = VALID_TABS.includes(hash as Tab) ? (hash as Tab) : "home";
      setTabRaw(nextTab);
      saveState(STORAGE_KEYS.ACTIVE_TAB, nextTab);

      setTimeout(() => {
        const targetScroll = scrollPositionsRef.current[nextTab] || 0;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }, 80);
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  /** Save scroll positions periodically and on unload */
  useEffect(() => {
    const onUnload = () => saveCurrentScroll(tab);
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [tab, saveCurrentScroll]);

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
