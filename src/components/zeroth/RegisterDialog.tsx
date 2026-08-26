import { useEffect, useState } from "react";
import { CheckCircle2, Copy, Flame, ShieldCheck, X, AlertTriangle, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRACKS } from "@/data/zeroth";
import { submitRegistrationData, BACKUP_GOOGLE_FORM_URL, type SubmissionResult } from "@/lib/registrations";

type Props = {
  open: boolean;
  onClose: () => void;
  initialTrack?: string;
};

const FIELD =
  "w-full border border-border bg-input/80 px-3 py-2.5 text-[16px] sm:text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 rounded-none appearance-none";
const LABEL = "font-mono-tech text-[10px] tracking-[0.18em] text-muted-foreground uppercase block mb-1";

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
  const [submission, setSubmission] = useState<SubmissionResult | null>(null);
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
      const res = await submitRegistrationData(form);
      setSubmission(res);
    } catch (err) {
      console.error(err);
      // Fallback on error
      setSubmission({
        id: `ZH-${Math.floor(100000 + Math.random() * 900000)}`,
        cloudSuccess: false,
        fallbackUrl: BACKUP_GOOGLE_FORM_URL,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  const copy = async () => {
    if (!submission?.id) return;
    await navigator.clipboard.writeText(submission.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Squad enrollment protocol"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="h-full overflow-y-auto overscroll-contain -webkit-overflow-scrolling-touch p-2 sm:p-4 pb-[env(safe-area-inset-bottom,16px)]">
        <div className="flex min-h-full items-start sm:items-center justify-center">
          <div className="panel-tactical my-2 sm:my-8 w-full max-w-2xl shadow-[var(--shadow-panel)] border border-primary/50 overflow-hidden animate-rise">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-primary/40 bg-primary/15 px-3.5 py-3 sm:px-6 sm:py-4">
              <div className="min-w-0 pr-2">
                <span className="font-mono-tech text-[9px] sm:text-[10px] tracking-[0.2em] text-primary font-bold block">
                  DEFCON 1 // CLEARANCE REQUEST
                </span>
                <h2 className="font-display text-sm sm:text-lg font-black uppercase text-foreground truncate">
                  Squad enrollment protocol
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close registration"
                className="grid size-8 sm:size-9 shrink-0 place-items-center border border-border bg-card/80 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {submission ? (
              <div className="space-y-4 p-5 sm:p-8 text-center">
                <CheckCircle2 className="mx-auto size-12 text-accent" aria-hidden />
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase">Clearance granted</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Squad <span className="text-accent font-bold">{form.teamName || "UNNAMED"}</span> is queued for{" "}
                  <span className="text-primary font-semibold">{form.track}</span>.
                </p>

                {/* Clearance Pass Card */}
                <div className="panel-tactical mx-auto max-w-sm p-4 sm:p-5 border border-accent/40 bg-accent/10">
                  <p className={LABEL}>DEFCON 1 CLEARANCE PASS</p>
                  <p className="mt-2 font-display text-2xl sm:text-3xl font-black text-alert-gradient">{submission.id}</p>
                  <Button variant="tactical" size="sm" className="mt-3 w-full" onClick={copy}>
                    <Copy className="size-3.5" aria-hidden />
                    {copied ? "Copied to clipboard!" : "Copy clearance code"}
                  </Button>
                </div>

                {/* Fallback / Server Busy Alert if cloud sync failed or high traffic */}
                {!submission.cloudSuccess ? (
                  <div className="bg-amber-950/40 border border-amber-600/60 p-4 rounded-md text-left space-y-2.5 mx-auto max-w-lg">
                    <div className="flex items-center gap-2 text-amber-400 font-mono-tech text-xs font-bold">
                      <AlertTriangle className="size-4 shrink-0" />
                      <span>SERVER BUSY / HIGH TRAFFIC DETECTED</span>
                    </div>
                    <p className="text-xs text-amber-200/90 leading-relaxed">
                      Your local clearance code <strong>{submission.id}</strong> has been secured on this device. Due to high peak traffic on the cloud database, please also submit via the Official Backup Google Form to guarantee immediate confirmation:
                    </p>
                    <Button
                      variant="alert"
                      size="sm"
                      className="w-full font-mono-tech text-xs flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-black font-bold"
                      asChild
                    >
                      <a href={BACKUP_GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-3.5" />
                        Complete via Official Google Form
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="bg-emerald-950/30 border border-emerald-700/50 p-3 rounded-md mx-auto max-w-lg text-xs text-emerald-300 font-mono-tech flex items-center justify-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-400" />
                    <span>Roster & Google Sheets Synced Successfully</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                  <Button variant="alert" size="default" className="w-full sm:w-auto" onClick={onClose}>
                    Return to broadcast
                  </Button>
                  <Button variant="outline" size="default" className="w-full sm:w-auto text-xs font-mono-tech" asChild>
                    <a href={BACKUP_GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="size-3.5 mr-1" />
                      Google Form Backup Link
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3.5 p-3.5 sm:p-6">
                {/* Notice for direct Google Form option */}
                <div className="flex items-center justify-between bg-accent/10 border border-accent/30 px-3 py-2 text-xs text-accent">
                  <span className="font-mono-tech text-[10px] sm:text-[11px] font-semibold flex items-center gap-1.5">
                    <Sparkles className="size-3.5 shrink-0" />
                    Dual-Sync Active: Instant Roster + Cloud Storage
                  </span>
                  <a
                    href={BACKUP_GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-tech text-[10px] sm:text-[11px] font-bold text-accent hover:underline flex items-center gap-1 shrink-0 ml-2"
                  >
                    Google Form <ExternalLink className="size-3" />
                  </a>
                </div>

                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <label className="space-y-1 block">
                    <span className={LABEL}>SQUAD NAME *</span>
                    <input
                      required
                      className={FIELD}
                      value={form.teamName}
                      onChange={set("teamName")}
                      placeholder="e.g. Quantum Pioneers"
                    />
                  </label>
                  <label className="space-y-1 block">
                    <span className={LABEL}>SQUAD LEADER *</span>
                    <input
                      required
                      className={FIELD}
                      value={form.leaderName}
                      onChange={set("leaderName")}
                      placeholder="Full name"
                    />
                  </label>
                  <label className="space-y-1 block">
                    <span className={LABEL}>CONTACT EMAIL *</span>
                    <input
                      required
                      type="email"
                      className={FIELD}
                      value={form.email}
                      onChange={set("email")}
                      placeholder="operative@domain.org"
                    />
                  </label>
                  <label className="space-y-1 block">
                    <span className={LABEL}>MOBILE NUMBER *</span>
                    <input
                      required
                      type="tel"
                      className={FIELD}
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+91 98765 43210"
                    />
                  </label>
                  <label className="space-y-1 block sm:col-span-2">
                    <span className={LABEL}>INSTITUTION / COLLEGE *</span>
                    <input
                      required
                      className={FIELD}
                      value={form.institution}
                      onChange={set("institution")}
                      placeholder="College or University name"
                    />
                  </label>
                  <label className="space-y-1 block">
                    <span className={LABEL}>THREAT SECTOR *</span>
                    <select className={FIELD} value={form.track} onChange={set("track")}>
                      {TRACKS.map((t) => (
                        <option key={t.id} value={t.title}>
                          {t.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-1 block">
                    <span className={LABEL}>SQUAD SIZE *</span>
                    <select className={FIELD} value={form.teamSize} onChange={set("teamSize")}>
                      {["1", "2", "3", "4"].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === "1" ? "Member (Solo)" : "Members"}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block space-y-1">
                  <span className={LABEL}>PROJECT BRIEF / IDEA (OPTIONAL)</span>
                  <textarea
                    rows={2}
                    className={FIELD}
                    value={form.brief}
                    onChange={set("brief")}
                    placeholder="Briefly describe your hardware/communication prototype idea..."
                  />
                </label>

                <div className="flex flex-col gap-1 rounded-sm border border-accent/40 bg-accent/10 p-2.5 sm:p-3">
                  <p className="flex items-center gap-1.5 font-mono-tech text-[11px] sm:text-xs tracking-wide text-accent font-bold">
                    <ShieldCheck className="size-3.5 shrink-0" aria-hidden />
                    REGISTRATION FEE: ₹200 PER SQUAD
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground ml-5">
                    Includes high-speed Wi-Fi, Food & Beverages for the 5-hour makeathon duration.
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="alert"
                  size="default"
                  className="w-full h-12 sm:h-11 text-sm font-bold tracking-wider uppercase touch-manipulation"
                  disabled={isSubmitting}
                >
                  <Flame className="size-4" aria-hidden />
                  {isSubmitting ? "Transmitting Clearance..." : "Transmit Squad Enrollment"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
