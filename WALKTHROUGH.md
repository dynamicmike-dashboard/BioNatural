# BioNatural Project Walkthrough: Universal Alpha Phase

We have successfully initialized the **Universal Alpha** foundation for BioNatural. This monorepo architecture ensures high performance, offline availability, and automated asset management.

## 🏗️ Core Architecture
- **Next.js 16 Monorepo**: Set up with `apps/web` (Next.js 16/React 19) and `packages/` for shared logic.
- **Supabase Core**: Integrated both server-side and client-side database access using `@supabase/ssr`.
- **PWA Ready**: Configured with a custom manifest and `next-pwa` for standalone mobile experience.

## 📱 Offline-First Strategy
- **IndexedDB**: Implemented `offline-cache.ts` using the `idb` library to persist product data locally.
- **Service Workers**: Automated caching of the App Shell and core UI components.

## 🤖 AI & Automation
- **Bilingual API**: Migrated the `/api/products` endpoint with a **Gemini AI Fallback**. If an English description is missing in Supabase, the system automatically translates it from Spanish in real-time.
- **Asset Halt Protocol**: Added `automation/asset-halt.js` which automatically stops the build if any video file >10MB is detected in the repository.
- **Image Optimization**: Integrated `sharp` into the build pipeline to auto-convert all local images to `.webp`.

## 🔒 Security & Deployment
- **AgentShield**: Configured GitHub Actions to scan for vulnerabilities on every push.
- **Environment Control**: All files are strictly maintained on the `F:\` drive as requested, bypassing `C:\`.

## 🌐 UI/UX
- **Premium Aesthetics**: Implemented a responsive Hero section using the **Inter** font family and the brand palette (#2E7D32 / #F1F8E9).
- **Language Switcher**: Real-time EN/ES toggle using local translation dictionaries (`en.json`, `es.json`).

> [!TIP]
> To run the development environment, use `npm run dev` from the root directory. To check for asset violations, run `npm run prebuild`.
