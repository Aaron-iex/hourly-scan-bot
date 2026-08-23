import { useEffect, useState } from "react";
import { CheckCircle2, Copy, Flame, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRACKS } from "@/data/zeroth";

type Props = {
  open: boolean;
  onClose: () => void;
  initialTrack?: string;
};

const FIELD =
  "w-full border border-border bg-input/60 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";
const LABEL = "font-mono-tech text-[10px] tracking-[0.2em] text-muted-foreground";

import { submitRegistrationData } from "@/lib/registrations";

export function RegisterDialog({ open, onClose, initialTrack }: Props) {
  const [form, setForm] = useState({
    teamName: "",
    leaderName: "",
    email: "",
    phone: "",
    institution: "",
    track: initialTrack || TRACKS[0]!.title,
    teamSize: "4",
    brief: "",
  });
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open && initialTrack) setForm((f) => ({ ...f, track: initialTrack }));
  }, [open, initialTrack]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const id = await submitRegistrationData(form);
      setCode(id);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-background/85 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Squad enrollment protocol"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="panel-tactical mx-auto my-8 w-full max-w-2xl shadow-[var(--shadow-panel)]">
        <div className="flex items-center justify-between border-b border-primary/40 bg-primary/12 px-6 py-4">
          <div>
            <span className="font-mono-tech text-[10px] tracking-[0.22em] text-primary">
              DEFCON 1 // CLEARANCE REQUEST
            </span>
            <h2 className="font-display text-lg font-black uppercase">Squad enrollment protocol</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close registration"
            className="grid size-9 place-items-center border border-border text-muted-foreground hover:text-primary"
          >
            <X className="size-4" />
          </button>
        </div>

        {code ? (
          <div className="space-y-5 p-8 text-center">
            <CheckCircle2 className="mx-auto size-12 text-accent" aria-hidden />
            <h3 className="font-display text-2xl font-black uppercase">Clearance granted</h3>
            <p className="text-sm text-muted-foreground">
              Squad <span className="text-accent">{form.teamName || "UNNAMED"}</span> is queued for{" "}
              {form.track}. Confirmation dispatched to {form.email || "your inbox"}.
            </p>
            <div className="panel-tactical mx-auto max-w-sm p-5">
              <p className={LABEL}>DEFCON 1 CLEARANCE PASS</p>
              <p className="mt-2 font-display text-3xl font-black text-alert-gradient">{code}</p>
              <Button variant="tactical" size="sm" className="mt-4" onClick={copy}>
                <Copy className="size-3.5" aria-hidden />
                {copied ? "Copied" : "Copy code"}
              </Button>
            </div>
            <Button variant="alert" onClick={onClose}>
              Return to broadcast
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1.5">
                <span className={LABEL}>SQUAD NAME</span>
                <input
                  required
                  className={FIELD}
                  value={form.teamName}
                  onChange={set("teamName")}
                  placeholder="Fault Line Runners"
                />
              </label>
              <label className="space-y-1.5">
                <span className={LABEL}>SQUAD LEADER</span>
                <input
                  required
                  className={FIELD}
                  value={form.leaderName}
                  onChange={set("leaderName")}
                  placeholder="Full name"
                />
              </label>
              <label className="space-y-1.5">
                <span className={LABEL}>CONTACT EMAIL</span>
                <input
                  required
                  type="email"
                  className={FIELD}
                  value={form.email}
                  onChange={set("email")}
                  placeholder="operative@domain.org"
                />
              </label>
              <label className="space-y-1.5">
                <span className={LABEL}>MOBILE NUMBER</span>
                <input
                  required
                  type="tel"
                  className={FIELD}
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="+91 98765 43210"
                />
              </label>
              <label className="space-y-1.5 sm:col-span-2">
                <span className={LABEL}>INSTITUTION / ORG</span>
                <input
                  required
                  className={FIELD}
                  value={form.institution}
                  onChange={set("institution")}
                  placeholder="University or company"
                />
              </label>
              <label className="space-y-1.5">
                <span className={LABEL}>THREAT SECTOR</span>
                <select className={FIELD} value={form.track} onChange={set("track")}>
                  {TRACKS.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1.5">
                <span className={LABEL}>SQUAD SIZE</span>
                <select className={FIELD} value={form.teamSize} onChange={set("teamSize")}>
                  {["1", "2", "3", "4"].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === "1" ? "person" : "people"}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block space-y-1.5">
              <span className={LABEL}>MISSION BRIEF (OPTIONAL)</span>
              <textarea
                rows={3}
                className={FIELD}
                value={form.brief}
                onChange={set("brief")}
                placeholder="What are you building to keep people alive?"
              />
            </label>

            <div className="flex flex-col gap-2 rounded-md border border-accent/40 bg-accent/10 p-3">
              <p className="flex items-center gap-2 font-mono-tech text-[12px] tracking-[0.1em] text-accent font-bold">
                <ShieldCheck className="size-4" aria-hidden />
                REGISTRATION FEE: ₹200 PER SQUAD
              </p>
              <p className="text-xs text-muted-foreground ml-6">
                Includes high-speed Wi-Fi, Food & Beverages for the 5-hour buildathon duration.
              </p>
            </div>

            <Button type="submit" variant="alert" size="xl" className="w-full" disabled={isSubmitting}>
              <Flame className="size-4" aria-hidden />
              {isSubmitting ? "Transmitting..." : "Transmit enrollment"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
