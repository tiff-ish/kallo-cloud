import type { Theme } from "../types";

export const PALETTE = {
  ink: "#121417",
  inkSoft: "rgba(18,20,23,0.72)",
  inkFaint: "rgba(18,20,23,0.55)",
  paper: "rgba(242,237,230,0.55)",
  paperSoft: "rgba(242,237,230,0.40)",
  paperSolid: "#f2ede6",
  lavender: "#9caad5",
  lavenderLight: "#b9c3e4",
  kraft: "#c9bfb2",
  slate: "#9aa0a8",
  seaGlass: "#7f9693",
  seaDeep: "#658c8e",
};

export const CLOUD_TYPES: Array<{ slug: string; name: string; hint: string }> = [
  { slug: "cumulus", name: "Cumulus", hint: "puffy, cotton-like" },
  { slug: "stratus", name: "Stratus", hint: "low, flat layers" },
  { slug: "cirrus", name: "Cirrus", hint: "high, wispy strands" },
  { slug: "nimbus", name: "Nimbus", hint: "rain-bearing" },
  { slug: "cumulonimbus", name: "Cumulonimbus", hint: "towering storm clouds" },
  { slug: "stratocumulus", name: "Stratocumulus", hint: "lumpy layers" },
  { slug: "altocumulus", name: "Altocumulus", hint: "mid-level patches" },
  { slug: "altostratus", name: "Altostratus", hint: "mid-level veil" },
  { slug: "cirrostratus", name: "Cirrostratus", hint: "thin halo sheet" },
  { slug: "other", name: "Not sure / Other", hint: "best guess is perfect" },
];

const BASE_THEMES: Record<string, Theme> = {
  cumulus: {
    a: PALETTE.lavenderLight,
    b: PALETTE.paperSolid,
    c: PALETTE.kraft,
    haze: "rgba(242,237,230,0.22)",
    vignette: "rgba(0,0,0,0.22)",
    drift: 22,
  },
  stratus: {
    a: "#b7b1a8",
    b: "#e7e2da",
    c: PALETTE.slate,
    haze: "rgba(242,237,230,0.18)",
    vignette: "rgba(0,0,0,0.26)",
    drift: 16,
  },
  cirrus: {
    a: PALETTE.paperSolid,
    b: "#f6f1ea",
    c: PALETTE.seaGlass,
    haze: "rgba(242,237,230,0.24)",
    vignette: "rgba(0,0,0,0.20)",
    drift: 28,
  },
  nimbus: {
    a: "#3d4956",
    b: "#0f141c",
    c: "#6a7886",
    haze: "rgba(242,237,230,0.10)",
    vignette: "rgba(0,0,0,0.46)",
    drift: 12,
  },
  cumulonimbus: {
    a: "#2a323d",
    b: "#0b1119",
    c: "#5c6876",
    haze: "rgba(242,237,230,0.08)",
    vignette: "rgba(0,0,0,0.52)",
    drift: 10,
  },
  stratocumulus: {
    a: PALETTE.kraft,
    b: "#efe9e1",
    c: "#a4aab3",
    haze: "rgba(242,237,230,0.18)",
    vignette: "rgba(0,0,0,0.26)",
    drift: 18,
  },
  altocumulus: {
    a: PALETTE.lavender,
    b: PALETTE.paperSolid,
    c: "#d7d2c8",
    haze: "rgba(242,237,230,0.22)",
    vignette: "rgba(0,0,0,0.20)",
    drift: 24,
  },
  altostratus: {
    a: "#bdb7ad",
    b: "#eee9e1",
    c: "#b0a89d",
    haze: "rgba(242,237,230,0.18)",
    vignette: "rgba(0,0,0,0.24)",
    drift: 18,
  },
  cirrostratus: {
    a: PALETTE.paperSolid,
    b: "#fbf6ef",
    c: PALETTE.lavenderLight,
    haze: "rgba(242,237,230,0.26)",
    vignette: "rgba(0,0,0,0.18)",
    drift: 26,
  },
  other: {
    a: PALETTE.lavenderLight,
    b: PALETTE.paperSolid,
    c: PALETTE.seaGlass,
    haze: "rgba(242,237,230,0.22)",
    vignette: "rgba(0,0,0,0.22)",
    drift: 22,
  },
};

type MoodMod = {
  tintA: string;
  tintB: string;
  tintC: string;
  warmth: number;
  deepen?: number;
};

const MOOD_MODS: Array<{ keys: string[]; mod: MoodMod }> = [
  {
    keys: ["sunset", "dusk", "gold", "golden", "pink", "peach", "amber", "rose"],
    mod: { tintA: "#d7a7a0", tintB: "#f2d3c7", tintC: PALETTE.lavender, warmth: 1 },
  },
  {
    keys: ["dawn", "morning", "soft", "pastel", "glow"],
    mod: { tintA: PALETTE.lavenderLight, tintB: PALETTE.paperSolid, tintC: PALETTE.seaGlass, warmth: 0.6 },
  },
  {
    keys: ["storm", "thunder", "heavy", "dark", "brooding", "wind", "rain"],
    mod: { tintA: "#2b333b", tintB: "#0b1119", tintC: "#55636e", warmth: -1, deepen: 1 },
  },
  {
    keys: ["night", "moon", "stars", "midnight"],
    mod: { tintA: "#0e1320", tintB: "#06080f", tintC: "#26304c", warmth: -0.6, deepen: 1 },
  },
  {
    keys: ["clear", "blue", "bright", "crisp"],
    mod: { tintA: PALETTE.lavender, tintB: PALETTE.paperSolid, tintC: PALETTE.lavenderLight, warmth: 0.2 },
  },
  {
    keys: ["gray", "grey", "overcast", "flat"],
    mod: { tintA: "#b8b2a8", tintB: "#e7e2da", tintC: PALETTE.slate, warmth: -0.2 },
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function lerpColor(hexA: string, hexB: string, t: number) {
  const a = hexA.replace("#", "");
  const b = hexB.replace("#", "");
  const ar = parseInt(a.slice(0, 2), 16);
  const ag = parseInt(a.slice(2, 4), 16);
  const ab = parseInt(a.slice(4, 6), 16);
  const br = parseInt(b.slice(0, 2), 16);
  const bg = parseInt(b.slice(2, 4), 16);
  const bb = parseInt(b.slice(4, 6), 16);
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return (
    "#" +
    [rr, rg, rb]
      .map((v) => {
        const s = v.toString(16);
        return s.length === 1 ? "0" + s : s;
      })
      .join("")
  );
}

export function deriveTheme(cloudType: string, description: string): Theme {
  const base = BASE_THEMES[cloudType] || BASE_THEMES.other;
  const text = (description || "").toLowerCase();

  let best: MoodMod | null = null;
  for (const rule of MOOD_MODS) {
    if (rule.keys.some((k) => text.includes(k))) {
      best = rule.mod;
      break;
    }
  }

  if (!best) return { ...base, mood: "neutral" };

  const blend = best.deepen ? 0.55 : 0.42;
  const a = lerpColor(base.a, best.tintA, blend);
  const b = lerpColor(base.b, best.tintB, clamp(blend - 0.1, 0.18, 0.58));
  const c = lerpColor(base.c, best.tintC, 0.4);

  const drift = clamp(base.drift + (best.deepen ? -6 : 4) + (best.warmth || 0) * 2, 8, 30);
  const vignette = best.deepen ? "rgba(0,0,0,0.56)" : base.vignette;
  const haze = best.deepen ? "rgba(242,237,230,0.09)" : base.haze;

  return {
    ...base,
    a,
    b,
    c,
    drift,
    haze,
    vignette,
    mood: best.deepen ? "deep" : best.warmth > 0 ? "warm" : "cool",
  };
}
