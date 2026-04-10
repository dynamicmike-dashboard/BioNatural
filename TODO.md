# BioNatural Project Status & Outstanding Tasks

This document tracks the critical path items required to move BioNatural from infrastructure to a "Hyper-Personalized Sales Machine."

## 🔴 HIGH PRIORITY (Infrastructure Foundations)
- [x] **Database Activation**: Execute `database/init_master_tables.sql` in the Supabase SQL Editor.
- [x] **Data Ingestion (Seed)**: Created `automation/seed-enriched-products.js` and `automation/seed-promotions.js` using client data.
- [ ] **n8n Bridge**: Import the `N8N_SYNC_BLUEPRINT.md` JSON into n8n to sync Teable (Admin) to Supabase (Production).
- [ ] **Blog Facility**: Implement Next.js blog listing/post pages and Supabase `blog_posts` table.
- [ ] **Provider Survey**: Replicate the "Nuevos Proveedores" form and link to Supabase + n8n email trigger.
- [x] **Bilingual Content**: Integrated 72 products with benefits/diagnostic issues from Meybell's list.
- [x] **n8n Self-Hosting**: Installed n8n on F: drive.
- [x] **Competitor Harvest**: Mapped rival SEO gaps in `REPORTS/COMPETITOR_HARVEST.md`.
- [x] **Redesign Template**: New Next.js Product Page (V2) with benefits.
- [ ] **BHuman Integration**: Draft n8n logic for sending personalized AI videos to new franchise inquiries.
- [ ] **Sendr Setup**: Configure WhatsApp/SMS notification triggers for restaurant reservations.
- [ ] **Franchise Page**: Replicate the legacy franchise section with the new modern UI.
- [ ] **Breakfast Surprise Landing**: Design a high-conversion landing page for the "Breakfast Surprise" gift service.
- [ ] **PWA Audit**: Verify offline-first performance and service worker caching for mobile shoppers.

## 🟡 LOW PRIORITY (Polishing & Elite SEO)
- [ ] **Schema Markup**: Add JSON-LD schema to all 2,000 product pages for Google Search rich snippets.
- [ ] **ALT Text Factory**: Automate Image/Video SEO metadata generation via AI Studio triggers.
- [ ] **Internal Linking Map**: Build an "AI-Aware" product relationship map for cross-selling.

## 🤖 Tool Stack Inventory
| Tool | Status | Role |
| :--- | :--- | :--- |
| **Teable** | Operational | Master database/Admin Panel (Tier 3). |
| **Supabase** | Connected | Production database & SSR backend. |
| **n8n** | Pending Setup | The "Glue" connecting all automated flows. |
| **Firecrawl** | Ready | Harvesting metadata from competitors. |
| **TinyTalk** | Integrated | Global AI Concierge widget. |
| **BHuman** | Planned | Personalized AI Video for high-ticket sales. |
| **Sendr** | Planned | Omnichannel messaging (WhatsApp/SMS). |
| **BotCommerce** | Planned | Sales automation via n8n. |
