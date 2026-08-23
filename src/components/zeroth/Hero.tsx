import { Calendar, ChevronRight, CircuitBoard, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EVENT_DETAILS } from "@/data/zeroth";

export function Hero({ onRegister }: { onRegister: () => void }) {
  return <section id="top" className="relative isolate overflow-hidden border-b border-border grid-tactical">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_32%)]" />
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-end lg:px-8 lg:py-28">
      <div className="max-w-4xl"><p className="font-mono-tech text-xs tracking-[0.3em] text-primary">ECE // ELECTRONICS & COMMUNICATION ENGINEERING</p>
        <h1 className="mt-6 font-display text-5xl font-black uppercase leading-[0.98] sm:text-7xl">Build the <span className="text-alert-gradient">connected</span><br />future.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">A student-led platform for circuits, code, communication, and bold ideas. Explore the ECE department and join our flagship five-hour innovation sprint.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button variant="alert" size="xl" onClick={onRegister}><CircuitBoard /> Register your team <ChevronRight /></Button><Button variant="tactical" size="xl" asChild><a href="#domains"><Clock /> Explore ECE domains</a></Button></div>
      </div>
      <div className="panel-tactical w-full max-w-sm shrink-0 p-6"><p className="font-mono-tech text-xs tracking-[0.22em] text-accent">UPCOMING EVENT</p><h2 className="mt-3 font-display text-2xl font-black uppercase">ECE Innovation Sprint</h2><div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground"><span className="flex items-center gap-3"><Calendar className="text-primary" />{EVENT_DETAILS.date} · {EVENT_DETAILS.duration}</span><span className="flex items-center gap-3"><Users className="text-primary" />{EVENT_DETAILS.fee} · {EVENT_DETAILS.status}</span></div></div>
    </div>
  </section>;
}
