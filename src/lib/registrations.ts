export interface Registration {
  id: string;
  teamName: string;
  leaderName: string;
  email: string;
  phone: string;
  institution: string;
  track: string;
  teamSize: string;
  brief?: string;
  timestamp: string;
  checkedIn?: boolean;
  status?: "confirmed" | "pending" | "waitlist";
}

export interface SubmissionResult {
  id: string;
  cloudSuccess: boolean;
  fallbackUrl?: string;
}

const STORAGE_KEY = "zeroth_hour_registrations";
const SHEETS_URL_KEY = "zeroth_hour_sheets_url";

export const BACKUP_GOOGLE_FORM_URL = "https://forms.gle/KcaYWjfFFGJZgWBR6";

export const DEFAULT_SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbycYaGTT0ppofK5v8Fg15OCN7_gkKiMo9vMKKc9vtXezbenKvO2RCwA2v_shoTup8e2/exec";

export function getStoredRegistrations(): Registration[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading registrations:", e);
    return [];
  }
}

export function saveAllRegistrations(list: Registration[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event("zeroth_registration_updated"));
  } catch (e) {
    console.error("Error saving registrations:", e);
  }
}

export function saveRegistrationLocally(reg: Registration): void {
  if (typeof window === "undefined") return;
  const current = getStoredRegistrations();
  const existingIdx = current.findIndex((r) => r.id === reg.id);
  if (existingIdx >= 0) {
    current[existingIdx] = { ...current[existingIdx], ...reg };
  } else {
    current.unshift(reg);
  }
  saveAllRegistrations(current);
}

export function deleteRegistrationLocally(id: string): void {
  if (typeof window === "undefined") return;
  const current = getStoredRegistrations();
  const filtered = current.filter((r) => r.id !== id);
  saveAllRegistrations(filtered);
}

export function getGoogleSheetsWebhookUrl(): string {
  if (typeof window === "undefined") return DEFAULT_SHEETS_WEBHOOK_URL;
  return localStorage.getItem(SHEETS_URL_KEY) || DEFAULT_SHEETS_WEBHOOK_URL;
}

export function setGoogleSheetsWebhookUrl(url: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SHEETS_URL_KEY, url.trim());
}

/**
 * Syncs check-in status to Google Sheets
 */
export async function syncCheckInToRemote(id: string, checkedIn: boolean): Promise<boolean> {
  const url = getGoogleSheetsWebhookUrl();
  if (!url) return false;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "updateCheckIn",
        id,
        checkedIn,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);
    return true;
  } catch (err) {
    console.warn("Could not sync check-in to Google Sheets:", err);
    return false;
  }
}

/**
 * Syncs deletion to Google Sheets
 */
export async function syncDeleteToRemote(id: string): Promise<boolean> {
  const url = getGoogleSheetsWebhookUrl();
  if (!url) return false;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "delete",
        id,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);
    return true;
  } catch (err) {
    console.warn("Could not sync deletion to Google Sheets:", err);
    return false;
  }
}

/**
 * Attempt to pull registrations live from the Google Sheet
 */
export async function fetchRemoteRegistrations(
  urlOverride?: string
): Promise<{ success: boolean; data: Registration[]; message?: string }> {
  const url = (urlOverride || getGoogleSheetsWebhookUrl()).trim();
  if (!url) {
    return { success: false, data: [], message: "No Google Sheets webhook URL configured." };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${url}${url.includes("?") ? "&" : "?"}_t=${Date.now()}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();
    if (Array.isArray(json)) {
      const parsed: Registration[] = json.map((item: any) => ({
        id: String(item.id || item.ID || item["Pass ID"] || `ZH-${Math.floor(100000 + Math.random() * 900000)}`),
        teamName: String(item.teamName || item["Team Name"] || "Unnamed Squad"),
        leaderName: String(item.leaderName || item["Leader Name"] || "Unknown"),
        email: String(item.email || item.Email || ""),
        phone: String(item.phone || item.Phone || item["Mobile Number"] || ""),
        institution: String(item.institution || item.Institution || item["Institution / College"] || ""),
        track: String(item.track || item.Track || item["Threat Sector"] || "General"),
        teamSize: String(item.teamSize || item["Team Size"] || item["Squad Size"] || "4"),
        brief: item.brief || item.Brief || item["Mission Brief"] || "",
        timestamp: item.timestamp || item.Timestamp || item["Registered At"] || new Date().toISOString(),
        checkedIn: Boolean(
          item.checkedIn ||
            item.CheckedIn ||
            String(item["Checked In"] || "").toUpperCase() === "YES"
        ),
        status: item.status || "confirmed",
      }));

      // Merge with local records
      const local = getStoredRegistrations();
      const map = new Map<string, Registration>();
      // Put remote first
      parsed.forEach((r) => map.set(r.id, r));
      // Overwrite/add with local so fresh submissions aren't erased
      local.forEach((r) => {
        if (!map.has(r.id)) {
          map.set(r.id, r);
        }
      });

      const merged = Array.from(map.values()).sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      saveAllRegistrations(merged);
      return { success: true, data: merged };
    }

    return { success: true, data: getStoredRegistrations(), message: "Remote replied, but no array found." };
  } catch (err) {
    console.warn("Could not fetch remote registrations directly:", err);
    return {
      success: false,
      data: getStoredRegistrations(),
      message: err instanceof Error ? err.message : "Fetch timed out or failed",
    };
  }
}

export async function submitRegistrationData(
  formData: Omit<Registration, "id" | "timestamp">
): Promise<SubmissionResult> {
  const uniqueNum = Math.floor(100000 + Math.random() * 900000);
  const id = `ZH-${uniqueNum}`;
  const timestamp = new Date().toISOString();

  const newReg: Registration = {
    ...formData,
    id,
    timestamp,
    status: "confirmed",
    checkedIn: false,
  };

  // 1. Save locally so it's instantly available in the admin panel and survives refreshes
  saveRegistrationLocally(newReg);

  // 2. Dispatch event for open admin tabs
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("zeroth_registration_updated"));
  }

  // 3. Push to Google Sheets (with timeout detection)
  let cloudSuccess = false;
  const sheetsUrl = getGoogleSheetsWebhookUrl();

  if (sheetsUrl) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 5000);

      await fetch(sheetsUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReg),
        signal: controller.signal,
      });

      clearTimeout(timer);
      cloudSuccess = true;
    } catch (err) {
      console.warn("Google Sheets cloud sync timed out / failed:", err);
      cloudSuccess = false;
    }
  }

  return {
    id,
    cloudSuccess,
    fallbackUrl: !cloudSuccess ? BACKUP_GOOGLE_FORM_URL : undefined,
  };
}

export function exportRegistrationsToCsv(registrations: Registration[]): void {
  if (!registrations.length) {
    throw new Error("No registrations found to export.");
  }

  const headers = [
    "Pass ID",
    "Team Name",
    "Leader Name",
    "Email",
    "Mobile Number",
    "Institution",
    "Threat Sector",
    "Squad Size",
    "Mission Brief",
    "Registered At",
    "Checked In",
  ];

  const rows = registrations.map((r) => [
    r.id,
    `"${(r.teamName || "").replace(/"/g, '""')}"`,
    `"${(r.leaderName || "").replace(/"/g, '""')}"`,
    `"${(r.email || "").replace(/"/g, '""')}"`,
    `"${(r.phone || "").replace(/"/g, '""')}"`,
    `"${(r.institution || "").replace(/"/g, '""')}"`,
    `"${(r.track || "").replace(/"/g, '""')}"`,
    r.teamSize,
    `"${(r.brief || "").replace(/"/g, '""')}"`,
    r.timestamp ? new Date(r.timestamp).toLocaleString("en-GB") : new Date().toLocaleString("en-GB"),
    r.checkedIn ? "YES" : "NO",
  ]);

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `zeroth_hour_roster_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
