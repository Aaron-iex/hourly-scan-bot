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

const STORAGE_KEY = "zeroth_hour_registrations";
const SHEETS_URL_KEY = "zeroth_hour_sheets_url";

export const DEFAULT_SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzmATni1uDuMzaifaXAvFyqukZV2CFxTjfAJRSzO4bn6GoBnvOvAeZcaQe56finseNy/exec";

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
 * Attempt to pull registrations live from the Google Sheet
 */
export async function fetchRemoteRegistrations(urlOverride?: string): Promise<{ success: boolean; data: Registration[]; message?: string }> {
  const url = (urlOverride || getGoogleSheetsWebhookUrl()).trim();
  if (!url) {
    return { success: false, data: [], message: "No Google Sheets webhook URL configured." };
  }

  try {
    const res = await fetch(`${url}${url.includes("?") ? "&" : "?"}_t=${Date.now()}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();
    if (Array.isArray(json)) {
      const parsed: Registration[] = json.map((item: any) => ({
        id: String(item.id || item.ID || `ZH-${Math.floor(100000 + Math.random() * 900000)}`),
        teamName: String(item.teamName || item["Team Name"] || "Unnamed Squad"),
        leaderName: String(item.leaderName || item["Leader Name"] || "Unknown"),
        email: String(item.email || item.Email || ""),
        phone: String(item.phone || item.Phone || ""),
        institution: String(item.institution || item.Institution || item["Institution / College"] || ""),
        track: String(item.track || item.Track || item.Sector || "General"),
        teamSize: String(item.teamSize || item["Team Size"] || "4"),
        brief: item.brief || item.Brief || item["Mission Brief"] || "",
        timestamp: item.timestamp || item.Timestamp || new Date().toISOString(),
        checkedIn: Boolean(item.checkedIn || item.CheckedIn),
        status: item.status || "confirmed",
      }));

      // Merge with local records
      const local = getStoredRegistrations();
      const map = new Map<string, Registration>();
      // Put remote first
      parsed.forEach((r) => map.set(r.id, r));
      // Overwrite/add with local so fresh offline submissions aren't erased
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
      message: err instanceof Error ? err.message : "Fetch failed",
    };
  }
}

export async function submitRegistrationData(formData: Omit<Registration, "id" | "timestamp">): Promise<string> {
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

  // 1. Save locally so it's instantly available and survives refreshes
  saveRegistrationLocally(newReg);

  // 2. Dispatch event for open tabs
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("zeroth_registration_updated"));
  }

  // 3. If Google Sheets Webhook is configured, push to Google Sheets
  const sheetsUrl = getGoogleSheetsWebhookUrl();
  if (sheetsUrl) {
    try {
      await fetch(sheetsUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReg),
      });
    } catch (err) {
      console.warn("Google Sheets sync failed, but data was stored locally:", err);
    }
  }

  return id;
}

export function exportRegistrationsToCsv(registrations: Registration[]): void {
  if (!registrations.length) {
    throw new Error("No registrations found to export.");
  }

  const headers = [
    "ID",
    "Team Name",
    "Leader Name",
    "Email",
    "Phone",
    "Institution",
    "Track",
    "Team Size",
    "Mission Brief",
    "Status",
    "Checked In",
    "Timestamp",
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
    r.status || "confirmed",
    r.checkedIn ? "YES" : "NO",
    r.timestamp,
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
