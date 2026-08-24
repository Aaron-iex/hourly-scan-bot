import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  getStoredRegistrations,
  exportRegistrationsToCsv,
  getGoogleSheetsWebhookUrl,
  setGoogleSheetsWebhookUrl,
  type Registration,
} from '@/lib/registrations';
import { Download, Link as LinkIcon, RefreshCw, Shield, Users, CheckCircle, Database, Lock, Unlock, KeyRound, AlertTriangle } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
});

const DEFAULT_ADMIN_PIN = "ZH2026";
const PIN_STORAGE_KEY = "zeroth_admin_pin";
const AUTH_SESSION_KEY = "zeroth_admin_auth";

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);

  // Check existing session on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const getSavedPin = () => {
    return import.meta.env['VITE_ADMIN_PIN'] || localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_ADMIN_PIN;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getSavedPin();
    if (pinInput === correctPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_SESSION_KEY, "true");
      setPinError(false);
      loadData();
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setIsAuthenticated(false);
    setPinInput("");
  };

  const loadData = () => {
    setRegistrations(getStoredRegistrations());
    setWebhookUrl(getGoogleSheetsWebhookUrl());
  };

  const handleExport = () => {
    try {
      exportRegistrationsToCsv(registrations);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to export");
    }
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleSheetsWebhookUrl(webhookUrl);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
      alert("Please enter a Google Apps Script Webhook URL first.");
      return;
    }
    setTestStatus("Sending test payload...");
    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "ZH-TEST01",
          teamName: "Test Squad",
          leaderName: "Admin Test",
          email: "admin@test.org",
          phone: "+91 98765 43210",
          institution: "Jaya Engineering College",
          track: "Earthquake Resilience",
          teamSize: "4",
          brief: "System operational test ping",
          timestamp: new Date().toISOString(),
        }),
      });
      setTestStatus("✅ Test packet dispatched! Check your Google Sheet.");
    } catch (e) {
      setTestStatus("❌ Failed to reach webhook URL: " + String(e));
    }
  };

  // 🔒 Passcode Security Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="panel-tactical w-full max-w-md p-8 text-center space-y-6 shadow-[var(--shadow-panel)] border-primary/50">
          <div className="grid size-14 place-items-center mx-auto border border-primary/60 bg-primary/15 text-primary clip-tactical">
            <Lock className="size-7 animate-pulse" />
          </div>

          <div>
            <span className="font-mono-tech text-[10px] tracking-[0.25em] text-primary">
              DEFCON 1 // RESTRICTED ACCESS
            </span>
            <h1 className="font-display text-2xl font-black uppercase mt-1 text-foreground">
              Command Console
            </h1>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Authorized organizer clearance required. Enter DEFCON Security Passcode to access roster & data streams.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <span className="font-mono-tech text-[10px] tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
                <KeyRound className="size-3 text-accent" />
                SECURITY PASSCODE
              </span>
              <input
                type="password"
                required
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter Access Key..."
                className="w-full border border-border bg-input/60 px-4 py-3 text-sm text-foreground outline-none font-mono-tech tracking-widest text-center focus:border-primary"
              />
            </div>

            {pinError && (
              <div className="flex items-center gap-2 bg-destructive/15 border border-destructive/40 p-2.5 text-destructive font-mono-tech text-xs rounded">
                <AlertTriangle className="size-4 shrink-0" />
                ACCESS DENIED: Invalid Security Passcode.
              </div>
            )}

            <Button type="submit" variant="alert" size="xl" className="w-full">
              <Unlock className="size-4 mr-2" />
              Authenticate Clearance
            </Button>
          </form>

          <div className="border-t border-border/60 pt-4 text-center">
            <a href="/" className="inline-block font-mono-tech text-xs text-primary hover:underline">
              ← Return to Main Broadcast
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-primary/40 pb-6">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center border border-primary/60 bg-primary/15 text-primary clip-tactical">
              <Shield className="size-5" />
            </span>
            <div>
              <h1 className="font-display text-2xl font-black uppercase text-foreground">
                Zeroth Hour // Command Center
              </h1>
              <p className="font-mono-tech text-xs tracking-widest text-muted-foreground">
                REGISTRATIONS DATABASE & GOOGLE SHEETS SYNC
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={loadData} className="font-mono-tech text-xs">
              <RefreshCw className="size-3.5 mr-1" />
              Refresh
            </Button>
            <Button variant="alert" size="default" onClick={handleExport} disabled={registrations.length === 0}>
              <Download className="size-4 mr-2" />
              Download Excel / CSV ({registrations.length})
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="font-mono-tech text-xs text-destructive hover:bg-destructive/10">
              <Lock className="size-3.5 mr-1" />
              Lock Console
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="panel-tactical p-5 flex items-center justify-between">
            <div>
              <p className="font-mono-tech text-xs text-muted-foreground">TOTAL SQUADS ENLISTED</p>
              <p className="font-display text-3xl font-black text-primary mt-1">{registrations.length}</p>
            </div>
            <Users className="size-8 text-primary/40" />
          </div>

          <div className="panel-tactical p-5 flex items-center justify-between">
            <div>
              <p className="font-mono-tech text-xs text-muted-foreground">ESTIMATED OPERATIVES</p>
              <p className="font-display text-3xl font-black text-accent mt-1">
                {registrations.reduce((acc, r) => acc + (parseInt(r.teamSize) || 1), 0)}
              </p>
            </div>
            <Database className="size-8 text-accent/40" />
          </div>

          <div className="panel-tactical p-5 flex items-center justify-between">
            <div>
              <p className="font-mono-tech text-xs text-muted-foreground">GOOGLE SHEETS STATUS</p>
              <p className="font-mono-tech text-sm font-bold text-foreground mt-1">
                {webhookUrl ? "🟢 Webhook Linked" : "⚪ Standalone Mode"}
              </p>
            </div>
            <LinkIcon className="size-8 text-muted-foreground/40" />
          </div>
        </div>

        {/* Google Sheets Integration Setup */}
        <div className="panel-tactical p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold uppercase text-accent flex items-center gap-2">
              <LinkIcon className="size-4 text-accent" />
              Direct Google Sheets Integration
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Connect a Google Apps Script Web App URL below. When students register on the website, their data and Unique ID (<span className="text-primary font-mono-tech">ZH-XXXXXX</span>) will instantly sync to your Google Sheet in real-time.
          </p>

          <form onSubmit={handleSaveWebhook} className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="flex-1 border border-border bg-input/60 px-4 py-2 text-sm text-foreground outline-none focus:border-primary font-mono-tech text-xs"
            />
            <Button type="submit" variant="tactical">
              {saveSuccess ? (
                <>
                  <CheckCircle className="size-4 mr-1 text-primary" />
                  Saved!
                </>
              ) : (
                "Save Webhook"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={handleTestWebhook}>
              Test Sync
            </Button>
          </form>

          {testStatus && (
            <p className="font-mono-tech text-xs text-accent bg-accent/10 p-2.5 border border-accent/30 rounded">
              {testStatus}
            </p>
          )}

          {/* Quick Apps Script Code Box */}
          <details className="mt-4 border-t border-border/60 pt-4 text-xs text-muted-foreground">
            <summary className="cursor-pointer font-mono-tech font-bold text-accent hover:underline">
              👉 Click here to view the 3-step Google Apps Script setup
            </summary>
            <div className="mt-3 space-y-3 font-sans">
              <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                <li>Create a new Google Sheet and click <strong>Extensions &gt; Apps Script</strong>.</li>
                <li>Paste the code below into <code>Code.gs</code> and click <strong>Deploy &gt; New Deployment</strong> (Select <em>Web app</em>, Execute as: <em>Me</em>, Who has access: <em>Anyone</em>).</li>
                <li>Copy the resulting Web App URL and paste it into the box above!</li>
              </ol>
              <pre className="bg-black/60 p-3 rounded font-mono-tech text-[11px] overflow-x-auto text-primary border border-primary/30">
{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["ID", "Team Name", "Leader Name", "Email", "Phone", "Institution", "Track", "Team Size", "Mission Brief", "Timestamp"]);
  }
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.id,
    data.teamName,
    data.leaderName,
    data.email,
    data.phone || "",
    data.institution,
    data.track,
    data.teamSize,
    data.brief || "",
    data.timestamp
  ]);
  return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}`}
              </pre>
            </div>
          </details>
        </div>

        {/* Registered Squads Table */}
        <div className="panel-tactical p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold uppercase text-foreground">
              Enlisted Squads Roster ({registrations.length})
            </h2>
            <a href="/" className="text-xs font-mono-tech text-accent hover:underline">
              ← Return to Main Site
            </a>
          </div>

          {registrations.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border text-muted-foreground">
              <p className="font-mono-tech text-sm">NO OPERATIVES IN QUEUE</p>
              <p className="text-xs mt-1">Registrations submitted through the site will appear here automatically.</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-border">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border bg-card/60 font-mono-tech text-muted-foreground uppercase">
                  <tr>
                    <th className="p-3">Pass ID</th>
                    <th className="p-3">Squad Name</th>
                    <th className="p-3">Leader</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Mobile</th>
                    <th className="p-3">Institution</th>
                    <th className="p-3">Sector</th>
                    <th className="p-3">Size</th>
                    <th className="p-3">Registered At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-sans">
                  {registrations.map((r) => (
                    <tr key={r.id} className="hover:bg-primary/5 transition-colors">
                      <td className="p-3 font-mono-tech font-bold text-primary">{r.id}</td>
                      <td className="p-3 font-bold text-foreground">{r.teamName}</td>
                      <td className="p-3">{r.leaderName}</td>
                      <td className="p-3 font-mono-tech text-muted-foreground">{r.email}</td>
                      <td className="p-3 font-mono-tech text-accent">{r.phone || "—"}</td>
                      <td className="p-3">{r.institution || "—"}</td>
                      <td className="p-3 text-accent font-medium">{r.track}</td>
                      <td className="p-3">{r.teamSize} {r.teamSize === "1" ? "person" : "people"}</td>
                      <td className="p-3 font-mono-tech text-muted-foreground">
                        {new Date(r.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
