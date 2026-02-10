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
  a: string;
  b: string;
  c: string;
  haze: string;
  vignette: string;
  drift: number;
  mood?: "neutral" | "deep" | "warm" | "cool";
};

export type Parallax = { x: number; y: number };

export type InstallPromptState = {
  available: boolean;
  prompt: () => Promise<boolean>;
  isIos: boolean;
};
