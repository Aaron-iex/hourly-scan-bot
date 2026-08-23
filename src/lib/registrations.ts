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
}

const STORAGE_KEY = "zeroth_hour_registrations";
const SHEETS_URL_KEY = "zeroth_hour_sheets_url";

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

export function saveRegistrationLocally(reg: Registration): void {
  if (typeof window === "undefined") return;
  const current = getStoredRegistrations();
  current.unshift(reg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

// You can hardcode your Google Apps Script URL here as a permanent default:
export const DEFAULT_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzmATni1uDuMzaifaXAvFyqukZV2CFxTjfAJRSzO4bn6GoBnvOvAeZcaQe56finseNy/exec";

export function getGoogleSheetsWebhookUrl(): string {
  if (typeof window === "undefined") return DEFAULT_SHEETS_WEBHOOK_URL;
  return localStorage.getItem(SHEETS_URL_KEY) || DEFAULT_SHEETS_WEBHOOK_URL;
}

export function setGoogleSheetsWebhookUrl(url: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SHEETS_URL_KEY, url.trim());
}

export async function submitRegistrationData(formData: Omit<Registration, "id" | "timestamp">): Promise<string> {
  const uniqueNum = Math.floor(100000 + Math.random() * 900000);
  const id = `ZH-${uniqueNum}`;
  const timestamp = new Date().toISOString();

  const newReg: Registration = {
    ...formData,
    id,
    timestamp,
  };

  // 1. Save locally so it's never lost
  saveRegistrationLocally(newReg);

  // 2. If Google Sheets Webhook is configured, send to Google Sheets
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

  const headers = ["ID", "Team Name", "Leader Name", "Email", "Phone", "Institution", "Track", "Team Size", "Mission Brief", "Timestamp"];

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
    r.timestamp,
  ]);

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `zeroth_hour_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
