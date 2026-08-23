import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EmergencyTicker } from "@/components/zeroth/EmergencyTicker";
import { SiteNav } from "@/components/zeroth/SiteNav";
import { Hero } from "@/components/zeroth/Hero";
import { Sectors } from "@/components/zeroth/Sectors";
import { Roadmap } from "@/components/zeroth/Roadmap";
import { Intel } from "@/components/zeroth/Intel";
import { Sponsors } from "@/components/zeroth/Sponsors";
import { SiteFooter } from "@/components/zeroth/SiteFooter";
import { RegisterDialog } from "@/components/zeroth/RegisterDialog";
const TITLE="ECE Department | Electronics & Communication Engineering";
const DESCRIPTION="Explore the ECE department, student leadership, innovation domains, and the September 9 five-hour hackathon.";
export const Route=createFileRoute("/")({head:()=>({meta:[{title:TITLE},{name:"description",content:DESCRIPTION},{property:"og:title",content:TITLE},{property:"og:description",content:DESCRIPTION},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),component:Index});
function Index(){const[open,setOpen]=useState(false);const[track,setTrack]=useState("");const[tab,setTab]=useState<"home"|"events"|"about">("home");const register=(selected="")=>{setTrack(selected);setOpen(true)};return <div className="min-h-screen bg-background"><EmergencyTicker/><SiteNav onRegister={()=>register()} activeTab={tab} onTabChange={setTab}/><main>{tab==="home"&&<><Hero onRegister={()=>register()}/><Sectors onRegister={register}/><Roadmap onRegister={()=>register()} preview onExpand={()=>setTab("events")}/><Intel preview onExpand={()=>setTab("about")}/><Sponsors/></>}{tab==="events"&&<Roadmap onRegister={()=>register()}/>} {tab==="about"&&<><Intel/><Sponsors/></>}</main><SiteFooter/><RegisterDialog open={open} onClose={()=>setOpen(false)} initialTrack={track}/></div>}
