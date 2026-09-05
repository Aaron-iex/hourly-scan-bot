import { useEffect, useState, useCallback, useRef } from "react";
import { CheckCircle2, Copy, Flame, ShieldCheck, X, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRACKS } from "@/data/zeroth";
import { submitRegistrationData, BACKUP_GOOGLE_FORM_URL, type SubmissionResult } from "@/lib/registrations";
import { loadState, saveState, clearState, debounce, STORAGE_KEYS } from "@/lib/state-persistence";

type Props = {
  open: boolean;
  onClose: () => void;
  initialTrack?: string;
};

type FormData = {
  teamName: string;
  leaderName: string;
  email: string;
  phone: string;
  institution: string;
  track: string;
  teamSize: string;
  brief: string;
};

const DEFAULT_FORM: FormData = {
  teamName: "",
  leaderName: "",
  email: "",
  phone: "",
  institution: "",
  track: TRACKS[0]!.title,
  teamSize: "4",
  brief: "",
};

const FIELD =
  "w-full border border-border bg-input/80 px-3 py-2.5 text-[16px] sm:text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 rounded-none appearance-none";
const LABEL = "font-mono-tech text-[10px] tracking-[0.18em] text-muted-foreground uppercase block mb-1";

export function RegisterDialog({ open, onClose, initialTrack }: Props) {
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);
  const [submission, setSubmission] = useState<SubmissionResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const [showSavedIndicator, setShowSavedIndicator] = useState(false);

  // Debounced auto-saver for form inputs
  const debouncedSaveRef = useRef(
    debounce((data: FormData) => {
      saveState(STORAGE_KEYS.REGISTRATION_DRAFT, data);
      setShowSavedIndicator(true);
      setTimeout(() => setShowSavedIndicator(false), 1800);
    }, 1000)
  );

  // On dialog opening: check for draft and handle history state
  useEffect(() => {
    if (!open) return;

    // 1. Check for saved draft
    const saved = loadState<FormData | null>(STORAGE_KEYS.REGISTRATION_DRAFT, null);
    if (saved && (saved.teamName || saved.leaderName || saved.email || saved.phone)) {
      setForm({
        ...saved,
        track: initialTrack || saved.track || TRACKS[0]!.title,
      });
      setDraftRestored(true);
    } else if (initialTrack) {
      setForm((f) => ({ ...f, track: initialTrack }));
    }

    // 2. Add history entry for dialog back-button closing
    if (window.location.hash !== "#register") {
      window.history.pushState({ modal: "register" }, "", "#register");
    }
  }, [open, initialTrack]);

  // Escape key and popstate handling
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onPopState = () => {
      if (window.location.hash !== "#register") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPopState);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPopState);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const set = (k: keyof FormData) => (e: { target: { value: string } }) => {
    const val = e.target.value;
    setForm((f) => {
      const next = { ...f, [k]: val };
      debouncedSaveRef.current(next);
      return next;
    });
  };

  const handleClearDraft = useCallback(() => {
    clearState(STORAGE_KEYS.REGISTRATION_DRAFT);
    setForm({
      ...DEFAULT_FORM,
      track: initialTrack || TRACKS[0]!.title,
    });
    setDraftRestored(false);
  }, [initialTrack]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await submitRegistrationData(form);
      setSubmission(res);
      // Clear auto-saved draft upon successful submission
      clearState(STORAGE_KEYS.REGISTRATION_DRAFT);
      setDraftRestored(false);
    } catch (err) {
      console.error(err);
      window.location.href = BACKUP_GOOGLE_FORM_URL;
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
                <div className="flex items-center gap-2">
                  <span className="font-mono-tech text-[9px] sm:text-[10px] tracking-[0.2em] text-primary font-bold block">
                    DEFCON 1 // CLEARANCE REQUEST
                  </span>
                  {showSavedIndicator && (
                    <span className="inline-flex items-center gap-1 font-mono-tech text-[9px] text-emerald-400 font-bold animate-pulse">
                      <Save className="size-3" /> Draft saved
                    </span>
                  )}
                </div>
                <h2 className="font-display text-sm sm:text-lg font-black uppercase text-foreground truncate">
                  Squad enrollment protocol
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close registration modal"
                className="grid size-8 sm:size-9 shrink-0 place-items-center border border-border bg-card/80 text-muted-foreground hover:border-primary hover:text-primary transition-colors touch-manipulation"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Restored Draft Notification Pill */}
            {draftRestored && !submission && (
              <div className="flex items-center justify-between bg-primary/10 border-b border-primary/30 px-4 py-2 text-xs font-mono-tech text-primary">
                <span>⚡ Restored previous unsaved registration draft</span>
                <button
                  type="button"
                  onClick={handleClearDraft}
                  className="flex items-center gap-1 hover:text-accent underline font-bold"
                >
                  <RotateCcw className="size-3" /> Reset form
                </button>
              </div>
            )}

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
                  <Button variant="tactical" size="sm" className="mt-3 w-full min-h-[44px]" onClick={copy}>
                    <Copy className="size-3.5" aria-hidden />
                    {copied ? "Copied to clipboard!" : "Copy clearance code"}
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                  <Button variant="alert" size="default" className="w-full sm:w-auto min-h-[44px]" onClick={onClose}>
                    Return to broadcast
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3.5 p-3.5 sm:p-6">
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
                  className="w-full h-12 sm:h-11 text-sm font-bold tracking-wider uppercase touch-manipulation min-h-[44px]"
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
