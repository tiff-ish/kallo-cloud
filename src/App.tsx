import { useEffect, useMemo, useState } from "react";
import type { JournalEntry, TabKey, FlowKey, Parallax } from "./types";
import { safeId, hasIDB, idbPut, idbDelete, loadEntries, persistFallback } from "./lib/storage";
import { deriveTheme } from "./lib/theme";
import { useToast } from "./hooks/useToast";
import { useInstallPrompt } from "./hooks/useInstallPrompt";
import { Background } from "./components/Background";
import { TopPillNav } from "./components/TopPillNav";
import { Dock } from "./components/Dock";
import { Toast } from "./components/Toast";
import { HomeScreen } from "./components/screens/HomeScreen";
import { CueScreen } from "./components/screens/CueScreen";
import { PauseScreen } from "./components/screens/PauseScreen";
import { IdentifyScreen } from "./components/screens/IdentifyScreen";
import { DescribeScreen } from "./components/screens/DescribeScreen";
import { ReflectScreen } from "./components/screens/ReflectScreen";
import { LibraryScreen } from "./components/screens/LibraryScreen";
import { EntryViewer } from "./components/screens/EntryViewer";
import { AboutScreen } from "./components/screens/AboutScreen";
import { normalizeEntry } from "./lib/storage";

export default function App() {
  const [tab, setTab] = useState<TabKey>("home");
  const [flow, setFlow] = useState<FlowKey>("idle");
  const [viewerId, setViewerId] = useState<string | null>(null);

  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Draft
  const [cloudType, setCloudType] = useState("");
  const [cloudDescription, setCloudDescription] = useState("");
  const [reflection, setReflection] = useState("");

  const toast = useToast();
  const install = useInstallPrompt();

  const selectedEntry = useMemo(() => entries.find((e) => e.id === viewerId) || null, [entries, viewerId]);

  const theme = useMemo(() => {
    const type = cloudType || selectedEntry?.cloudType || "other";
    const desc = cloudDescription || selectedEntry?.cloudDescription || "";
    return deriveTheme(type, desc);
  }, [cloudType, cloudDescription, selectedEntry]);

  // Parallax (subtle)
  const [parallax, setParallax] = useState<Parallax>({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 26;
      const y = (e.clientY / window.innerHeight - 0.5) * 22;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Load entries on mount
  useEffect(() => {
    let mounted = true;
    loadEntries().then((rows) => {
      if (!mounted) return;
      setEntries(rows);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Persist fallback localStorage when entries change
  useEffect(() => {
    persistFallback(entries);
  }, [entries]);

  // --- Actions ---

  const clearDraft = () => {
    setCloudType("");
    setCloudDescription("");
    setReflection("");
  };

  const beginMoment = () => {
    setViewerId(null);
    setTab("home");
    clearDraft();
    setFlow("pause");
  };

  const showCue = () => {
    setViewerId(null);
    setTab("home");
    setFlow("cue");
  };

  const goLibrary = () => {
    setFlow("idle");
    setViewerId(null);
    setTab("library");
  };

  const openEntry = (id: string) => {
    setFlow("idle");
    setTab("library");
    setViewerId(id);
  };

  const saveEntry = async () => {
    const entry: JournalEntry = {
      id: safeId(),
      cloudType: cloudType || "other",
      cloudDescription: (cloudDescription || "").trim(),
      reflection: (reflection || "").trim(),
      createdAt: new Date().toISOString(),
    };

    setEntries((prev) => [entry, ...prev]);

    try {
      if (hasIDB()) await idbPut(entry);
    } catch {
      // fallback already handled by persistFallback
    }

    toast.show("Saved.");
    clearDraft();
    setFlow("idle");
    setTab("library");
    setViewerId(entry.id);
  };

  const deleteEntry = async (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    try {
      if (hasIDB()) await idbDelete(id);
    } catch {
      // ignore
    }
    if (viewerId === id) setViewerId(null);
    toast.show("Deleted.");
  };

  // --- Dock routing ---

  const dockCurrent = useMemo(() => {
    if (flow !== "idle" && flow !== "cue") return "new" as const;
    return tab === "library" ? ("library" as const) : ("home" as const);
  }, [tab, flow]);

  const onDockGo = (k: "home" | "new" | "library") => {
    if (k === "home") {
      setViewerId(null);
      setFlow("idle");
      setTab("home");
    } else if (k === "new") {
      beginMoment();
    } else if (k === "library") {
      goLibrary();
    }
  };

  const canSave = useMemo(() => (reflection || "").trim().length > 0 && (cloudType || "").trim().length > 0, [reflection, cloudType]);

  // --- Render ---

  return (
    <div className="min-h-[100svh]">
      <Background theme={theme} parallax={parallax} />

      <TopPillNav
        active={tab}
        onNav={(k) => {
          setFlow("idle");
          setViewerId(null);
          setTab(k);
        }}
        install={install}
      />

      <main className="relative z-10">
        {flow === "cue" ? (
          <CueScreen onTap={() => setFlow("pause")} />
        ) : flow === "pause" ? (
          <PauseScreen onSkip={() => setFlow("identify")} onDone={() => setFlow("identify")} />
        ) : flow === "identify" ? (
          <IdentifyScreen cloudType={cloudType} setCloudType={setCloudType} onBack={() => setFlow("pause")} onNext={() => setFlow("describe")} />
        ) : flow === "describe" ? (
          <DescribeScreen cloudDescription={cloudDescription} setCloudDescription={setCloudDescription} onBack={() => setFlow("identify")} onNext={() => setFlow("reflect")} />
        ) : flow === "reflect" ? (
          <ReflectScreen reflection={reflection} setReflection={setReflection} onBack={() => setFlow("describe")} onSave={saveEntry} canSave={canSave} />
        ) : tab === "home" ? (
          <HomeScreen onBegin={beginMoment} onLibrary={goLibrary} install={install} onShowCue={showCue} />
        ) : tab === "library" ? (
          selectedEntry ? (
            <EntryViewer entry={selectedEntry} onDelete={deleteEntry} onClose={() => setViewerId(null)} />
          ) : (
            <LibraryScreen entries={entries} selectedId={viewerId} onSelect={openEntry} />
          )
        ) : (
          <AboutScreen />
        )}
      </main>

      <Dock current={dockCurrent} onGo={onDockGo} />

      {toast.toast ? <Toast message={toast.toast.message} /> : null}

      <div className="h-24" />

      <SelfTests />
    </div>
  );
}

function SelfTests() {
  useEffect(() => {
    try {
      console.assert(typeof deriveTheme("cumulus", "")?.a === "string", "deriveTheme should return theme colors");
      console.assert(normalizeEntry({ cloudType: "cumulus", reflection: "x" }).id.length > 0, "normalizeEntry should create id");
    } catch {
      // ignore
    }
  }, []);
  return null;
}
