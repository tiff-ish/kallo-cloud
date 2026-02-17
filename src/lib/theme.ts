import type { Theme } from "../types";

/* ─── Design Tokens: Cloud Journal "Atmospheric Glassmorphism" ─── */

export const PALETTE = {
  tealMuted: "#5F8D9B",
  tealDark: "#3A5F6B",
  skyBlue: "#8EB6C0",
  white: "#FFFFFF",
  offWhiteTransparent: "rgba(255, 255, 255, 0.65)",
  textDark: "#2C3E50",
  textMedium: "#546E7A",
  textLight: "#FFFFFF",
  glassBg: "rgba(255, 255, 255, 0.45)",
  glassBorder: "rgba(255, 255, 255, 0.3)",
};

export const CORNER_RADIUS = {
  small: 12,
  medium: 24,
  large: 32,
  portal: 100,
};

export const GLASS = {
  backdropFilter: "blur(20px) saturate(180%)",
  backgroundColor: "rgba(255, 255, 255, 0.45)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
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
    gradientStart: "#6BA3B5",
    gradientEnd: "#A8D4DE",
    accent: "#D4EEF4",
    mood: "cool",
  },
  cumulus: {
    gradientStart: "#5F8D9B",
    gradientEnd: "#8EB6C0",
    accent: "#E8F4F8",
    mood: "neutral",
  },
  cirrostratus: {
    gradientStart: "#7A9EA8",
    gradientEnd: "#B4D0D8",
    accent: "#E0EFF4",
    mood: "cool",
  },
  nimbostratus: {
    gradientStart: "#2C3E50",
    gradientEnd: "#4A6572",
    accent: "#7A9AA8",
    mood: "deep",
  },
  cirrocumulus: {
    gradientStart: "#6BA3B5",
    gradientEnd: "#A8D4DE",
    accent: "#D4EEF4",
    mood: "cool",
  },
  stratocumulus: {
    gradientStart: "#4E7A86",
    gradientEnd: "#7FA8B2",
    accent: "#C4DDE4",
    mood: "neutral",
  },
  stratus: {
    gradientStart: "#5A7F8A",
    gradientEnd: "#8AACB4",
    accent: "#C8DEE4",
    mood: "neutral",
  },
  altocumulus: {
    gradientStart: "#5E8E9C",
    gradientEnd: "#90BCC6",
    accent: "#D6EAF0",
    mood: "neutral",
  },
  altostratus: {
    gradientStart: "#4A6E7A",
    gradientEnd: "#7E9EA8",
    accent: "#B8D2DA",
    mood: "neutral",
  },
  cumulonimbus: {
    gradientStart: "#1A2A34",
    gradientEnd: "#3A5060",
    accent: "#6A8A98",
    mood: "deep",
  },
  other: {
    gradientStart: "#5F8D9B",
    gradientEnd: "#8EB6C0",
    accent: "#E8F4F8",
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
        gradStart = lerpColor(gradStart, "#1A2A34", 0.4);
        gradEnd = lerpColor(gradEnd, "#3A5060", 0.3);
      } else if (rule.mod.warmth > 0.5) {
        moodOverride = "warm";
        gradStart = lerpColor(gradStart, "#8B6B5A", 0.25);
        gradEnd = lerpColor(gradEnd, "#C4A080", 0.2);
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
