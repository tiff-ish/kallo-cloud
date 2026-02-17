export type JournalEntry = {
  id: string;
  cloudType: string;
  cloudDescription?: string;
  reflection: string;
  createdAt: string; // ISO
};

export type TabKey = "home" | "library" | "about";

export type FlowKey = "idle" | "cue" | "pause" | "identify" | "describe" | "reflect";

export type Theme = {
  gradientStart: string;
  gradientEnd: string;
  accent: string;
  mood: "neutral" | "deep" | "warm" | "cool";
  surrealIntensity: number; // 0 = realistic, 1 = fully surreal
  drift: number;
};

export type Parallax = { x: number; y: number };

export type InstallPromptState = {
  available: boolean;
  prompt: () => Promise<boolean>;
  isIos: boolean;
};
