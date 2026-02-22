import type { Theme } from "../types";

/* ─── Design Tokens: kallo-cloud Atmospheric System ─── */

export const PALETTE = {
  mistTeal: "#7FAFB3",
  skyBlue: "#8EAFC7",
  periwinkleFog: "#9CA8D6",
  warmPaper: "#F5ECDC",
  ink: "#16171C",
  taupeMist: "#A89B91",
  stormSlate: "#4B5C72",
  softCloudWhite: "#F7F9FA",
  textPrimary: "rgba(22, 23, 28, 0.92)",
  textSecondary: "#4B5C72",
  glassBg: "rgba(245, 236, 220, 0.50)",
  glassBorder: "rgba(22, 23, 28, 0.10)",
};

export const CORNER_RADIUS = {
  small: 14,
  medium: 18,
  large: 22,
  pill: 999,
};

export const GLASS = {
  backdropFilter: "blur(20px) saturate(110%)",
  backgroundColor: "rgba(245, 236, 220, 0.50)",
  boxShadow: "0 14px 50px rgba(0, 0, 0, 0.12)",
  border: `1px solid ${PALETTE.glassBorder}`,
};

export const CLOUD_TYPES: Array<{ slug: string; name: string; hint: string; image: string; description: string }> = [
  { slug: "cirrus", name: "Cirrus", hint: "high, wispy strands", image: "/clouds/cirrus.png", description: "Thin, wispy ice crystal clouds at high altitude, often resembling hair or feathers." },
  { slug: "cumulus", name: "Cumulus", hint: "puffy, cotton-like", image: "/clouds/cumulus.png", description: "Low-level, puffy fair weather clouds with distinct edges. Often signify convection." },
  { slug: "cirrostratus", name: "Cirrostratus", hint: "thin halo sheet", image: "/clouds/cirrostratus.png", description: "Thin, translucent sheet of ice crystals that can create halos around the sun." },
  { slug: "nimbostratus", name: "Nimbostratus", hint: "rain-bearing layers", image: "/clouds/nimbostratus.png", description: "Thick, dark layered clouds that produce steady rain or snow over large areas." },
  { slug: "cirrocumulus", name: "Cirrocumulus", hint: "high, patchy ripples", image: "/clouds/cirrocumulus.png", description: "Small, high-altitude rippled patches creating a mackerel sky pattern." },
  { slug: "stratocumulus", name: "Stratocumulus", hint: "lumpy layers", image: "/clouds/stratocumulus.png", description: "Low-level, lumpy rolling patches arranged in groups or waves." },
  { slug: "stratus", name: "Stratus", hint: "low, flat layers", image: "/clouds/stratus.png", description: "Flat, featureless gray blanket cloud forming a uniform low layer." },
  { slug: "altocumulus", name: "Altocumulus", hint: "mid-level patches", image: "/clouds/altocumulus.png", description: "Mid-level fluffy patches, often in clusters with blue sky between." },
  { slug: "altostratus", name: "Altostratus", hint: "mid-level veil", image: "/clouds/altostratus.png", description: "Mid-level gray-blue translucent veil that partially obscures the sun." },
  { slug: "cumulonimbus", name: "Cumulonimbus", hint: "towering storm clouds", image: "/clouds/cumulonimbus.png", description: "Towering anvil-shaped storm clouds reaching from low to high altitude." },
  { slug: "other", name: "Other / Not sure", hint: "best guess is perfect", image: "/clouds/other.png", description: "A beautiful sky that defies easy classification." },
];

export const CLOUD_TO_THUMBNAIL: Record<string, string> = {
  cirrus: "/thumbnails/cool.jpg",
  cumulus: "/thumbnails/warm.jpg",
  cirrostratus: "/thumbnails/cool.jpg",
  nimbostratus: "/thumbnails/deep.jpg",
  cirrocumulus: "/thumbnails/neutral.jpg",
  stratocumulus: "/thumbnails/neutral.jpg",
  stratus: "/thumbnails/neutral.jpg",
  altocumulus: "/thumbnails/neutral.jpg",
  altostratus: "/thumbnails/neutral.jpg",
  cumulonimbus: "/thumbnails/deep.jpg",
  other: "/thumbnails/warm.jpg",
};

type CloudTheme = {
  gradientStart: string;
  gradientEnd: string;
  accent: string;
  mood: "neutral" | "deep" | "warm" | "cool";
};

const CLOUD_THEMES: Record<string, CloudTheme> = {
  cirrus: {
    gradientStart: "#7FAFB3",
    gradientEnd: "#9CA8D6",
    accent: "#D6DFF0",
    mood: "cool",
  },
  cumulus: {
    gradientStart: "#7FAFB3",
    gradientEnd: "#8EAFC7",
    accent: "#E4ECF2",
    mood: "neutral",
  },
  cirrostratus: {
    gradientStart: "#8EAFC7",
    gradientEnd: "#9CA8D6",
    accent: "#D6DFF0",
    mood: "cool",
  },
  nimbostratus: {
    gradientStart: "#2E3A48",
    gradientEnd: "#4B5C72",
    accent: "#6E7F92",
    mood: "deep",
  },
  cirrocumulus: {
    gradientStart: "#8EAFC7",
    gradientEnd: "#9CA8D6",
    accent: "#D6DFF0",
    mood: "cool",
  },
  stratocumulus: {
    gradientStart: "#5E8A92",
    gradientEnd: "#7FAFB3",
    accent: "#C4D8DC",
    mood: "neutral",
  },
  stratus: {
    gradientStart: "#6A929A",
    gradientEnd: "#8EAFC7",
    accent: "#C8D8E2",
    mood: "neutral",
  },
  altocumulus: {
    gradientStart: "#6E9CA4",
    gradientEnd: "#8EAFC7",
    accent: "#D2E0EA",
    mood: "neutral",
  },
  altostratus: {
    gradientStart: "#5A7E8A",
    gradientEnd: "#7FAFB3",
    accent: "#B8CED4",
    mood: "neutral",
  },
  cumulonimbus: {
    gradientStart: "#1E2832",
    gradientEnd: "#3A4A58",
    accent: "#4B5C72",
    mood: "deep",
  },
  other: {
    gradientStart: "#7FAFB3",
    gradientEnd: "#8EAFC7",
    accent: "#E4ECF2",
    mood: "neutral",
  },
};

const MOOD_PHOTOS: Record<string, string> = {
  neutral: "/backgrounds/neutral.jpg",
  warm: "/backgrounds/warm.jpg",
  deep: "/backgrounds/deep.jpg",
  cool: "/backgrounds/cool.jpg",
};

export function getCloudTheme(cloudType: string): CloudTheme {
  return CLOUD_THEMES[cloudType] || CLOUD_THEMES.other;
}

export function getMoodPhoto(mood: string): string {
  return MOOD_PHOTOS[mood] || MOOD_PHOTOS.neutral;
}

const SUGGEST_KEYWORDS: Array<{ keys: string[]; slug: string; name: string }> = [
  { keys: ["wispy", "feathery", "high", "delicate", "strands", "hair"], slug: "cirrus", name: "Cirrus" },
  { keys: ["puffy", "cotton", "fluffy", "pillow", "cumulus"], slug: "cumulus", name: "Cumulus" },
  { keys: ["halo", "sheet", "thin", "veil", "milky"], slug: "cirrostratus", name: "Cirrostratus" },
  { keys: ["rain", "storm", "dark", "heavy", "grey", "gray", "continuous", "drizzle"], slug: "nimbostratus", name: "Nimbostratus" },
  { keys: ["ripples", "patchy", "mackerel", "fish"], slug: "cirrocumulus", name: "Cirrocumulus" },
  { keys: ["lumpy", "patches", "rolls", "bumpy"], slug: "stratocumulus", name: "Stratocumulus" },
  { keys: ["flat", "layers", "low", "gray", "grey", "overcast", "blanket"], slug: "stratus", name: "Stratus" },
  { keys: ["mid-level", "patches", "fluffy patches"], slug: "altocumulus", name: "Altocumulus" },
  { keys: ["mid-level", "veil", "sheet"], slug: "altostratus", name: "Altostratus" },
  { keys: ["towering", "storm", "thunder", "anvil", "cauliflower"], slug: "cumulonimbus", name: "Cumulonimbus" },
];

export function suggestCloudFromDescription(description: string): { slug: string; name: string } | null {
  const text = (description || "").toLowerCase().trim();
  if (!text) return null;
  for (const rule of SUGGEST_KEYWORDS) {
    if (rule.keys.some((k) => text.includes(k))) {
      return { slug: rule.slug, name: rule.name };
    }
  }
  return null;
}

type MoodMod = {
  warmth: number;
  deepen?: number;
};

const MOOD_MODS: Array<{ keys: string[]; mod: MoodMod }> = [
  { keys: ["sunset", "dusk", "gold", "golden", "pink", "peach", "amber", "rose"], mod: { warmth: 1 } },
  { keys: ["dawn", "morning", "soft", "pastel", "glow"], mod: { warmth: 0.6 } },
  { keys: ["storm", "thunder", "heavy", "dark", "brooding", "wind", "rain"], mod: { warmth: -1, deepen: 1 } },
  { keys: ["night", "moon", "stars", "midnight"], mod: { warmth: -0.6, deepen: 1 } },
  { keys: ["clear", "blue", "bright", "crisp"], mod: { warmth: 0.2 } },
  { keys: ["gray", "grey", "overcast", "flat"], mod: { warmth: -0.2 } },
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
  const ct = CLOUD_THEMES[cloudType] || CLOUD_THEMES.other;
  const text = (description || "").toLowerCase();
  const surrealIntensity = text.trim().length === 0 ? 0 : Math.min(1, text.trim().length / 40);

  let moodOverride: "neutral" | "deep" | "warm" | "cool" = ct.mood;

  let gradStart = ct.gradientStart;
  let gradEnd = ct.gradientEnd;

  for (const rule of MOOD_MODS) {
    if (rule.keys.some((k) => text.includes(k))) {
      if (rule.mod.deepen) {
        moodOverride = "deep";
        gradStart = lerpColor(gradStart, "#1E2832", 0.4);
        gradEnd = lerpColor(gradEnd, "#3A4A58", 0.3);
      } else if (rule.mod.warmth > 0.5) {
        moodOverride = "warm";
        gradStart = lerpColor(gradStart, "#A89B91", 0.25);
        gradEnd = lerpColor(gradEnd, "#C4B8A8", 0.2);
      }
      break;
    }
  }

  const drift = clamp(ct.mood === "deep" ? 14 : 22, 8, 30);

  return {
    gradientStart: gradStart,
    gradientEnd: gradEnd,
    accent: ct.accent,
    mood: moodOverride,
    surrealIntensity,
    drift,
  };
}
