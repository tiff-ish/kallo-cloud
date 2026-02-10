# Cloud Reflection Journal

A mobile-first, PWA-ready nature-connection app. Look up at the sky, identify a cloud, describe what you notice, and reflect. The background adapts to match the mood of what you see.

## Features

- **Ritual flow** — Pause (10-second breathing countdown) → Identify (cloud type) → Describe (scene note) → Reflect (freeform journal)
- **Adaptive atmosphere** — the background shifts gradients based on cloud type and mood keywords in your description
- **Local-first persistence** — entries are stored in IndexedDB with a localStorage fallback; nothing leaves your device
- **PWA-ready** — installable on mobile and desktop with a service worker for offline support
- **Ethereal pacing** — cycling poetic cues that fade in and out to set the tone

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

## Tech Stack

- [React 19](https://react.dev) + TypeScript
- [Vite](https://vite.dev) build toolchain
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- IndexedDB (with localStorage fallback)
- Service Worker (stale-while-revalidate caching)

## Project Structure

```
src/
├── main.tsx                              Entry point + service worker registration
├── index.css                             Tailwind import + global resets
├── App.tsx                               Slim orchestrator — state, routing, actions
│
├── types.ts                              Shared type definitions
│                                           JournalEntry, TabKey, FlowKey,
│                                           Theme, Parallax, InstallPromptState
│
├── lib/
│   ├── storage.ts                        IndexedDB + localStorage persistence
│   │                                       safeId, normalizeEntry, loadEntries,
│   │                                       persistFallback, idbPut, idbDelete
│   ├── theme.ts                          Palette, cloud types, base themes,
│   │                                       mood modifiers, deriveTheme()
│   └── utils.ts                          formatDate()
│
├── hooks/
│   ├── useToast.ts                       Auto-dismiss toast notification hook
│   └── useInstallPrompt.ts              PWA beforeinstallprompt + iOS detection
│
└── components/
    ├── ui.tsx                            FrostedCard, FrostedPill, Divider,
    │                                       PrimaryButton, GhostButton
    ├── Icon.tsx                           SVG icon set (home, plus, book, download)
    ├── FadeIn.tsx                         Entrance animation wrapper
    ├── EtherealCopy.tsx                   Cycling poetic text with fade
    ├── Background.tsx                     Adaptive atmospheric gradient background
    ├── TopPillNav.tsx                     Top navigation pill bar
    ├── Dock.tsx                           Bottom floating dock (Home / New / Library)
    ├── Toast.tsx                          Toast notification display
    │
    └── screens/
        ├── HomeScreen.tsx                 Welcome tiles + action cards
        ├── CueScreen.tsx                  Ritual cue overlay
        ├── PauseScreen.tsx                10-second breathing countdown
        ├── IdentifyScreen.tsx             Cloud type picker (step 1 of 3)
        ├── DescribeScreen.tsx             Scene note input (step 2 of 3)
        ├── ReflectScreen.tsx              Freeform reflection (step 3 of 3)
        ├── LibraryScreen.tsx              Past entries list
        ├── EntryViewer.tsx                Single entry view + delete
        └── AboutScreen.tsx                About / privacy info
```

### Dependency flow

```
types  ←  lib  ←  hooks  ←  components  ←  App
```

No circular dependencies. Each module owns a single concern.

## PWA

The app includes a `manifest.json` and `sw.js` in the `public/` directory for installability and offline support. On iOS, users are prompted to use Share → "Add to Home Screen." On Android and desktop, the native install banner is captured and surfaced in the UI.

## Privacy

All data lives on your device in IndexedDB. Nothing is sent to a server.
