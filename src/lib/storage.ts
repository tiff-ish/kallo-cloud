import type { JournalEntry } from "../types";

const STORAGE_KEY = "cloud_reflection_journal_v2_fallback";
const DB_NAME = "cloud_reflection_journal_db";
const DB_STORE = "entries";

export function hasIDB() {
  try {
    return typeof indexedDB !== "undefined";
  } catch {
    return false;
  }
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGetAll(): Promise<JournalEntry[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readonly");
    const store = tx.objectStore(DB_STORE);
    const req = store.getAll();
    req.onsuccess = () => resolve((req.result || []) as JournalEntry[]);
    req.onerror = () => reject(req.error);
  });
}

export async function idbPut(entry: JournalEntry) {
  const db = await openDB();
  return new Promise<boolean>((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    const store = tx.objectStore(DB_STORE);
    const req = store.put(entry);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

export async function idbDelete(id: string) {
  const db = await openDB();
  return new Promise<boolean>((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    const store = tx.objectStore(DB_STORE);
    const req = store.delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

export function safeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "id_" + Math.random().toString(16).slice(2) + "_" + Date.now().toString(16);
}

export function normalizeEntry(e: Partial<JournalEntry>): JournalEntry {
  return {
    id: e.id || safeId(),
    cloudType: e.cloudType || "other",
    cloudDescription: e.cloudDescription || "",
    reflection: e.reflection || "",
    createdAt: e.createdAt || new Date().toISOString(),
  };
}

export async function loadEntries(): Promise<JournalEntry[]> {
  if (hasIDB()) {
    try {
      const rows = await idbGetAll();
      return (rows || [])
        .map((r) => normalizeEntry(r))
        .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    } catch {
      // fall through to localStorage
    }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return (parsed as Partial<JournalEntry>[])
      .map((r) => normalizeEntry(r))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  } catch {
    return [];
  }
}

export async function persistFallback(entries: JournalEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore
  }
}
