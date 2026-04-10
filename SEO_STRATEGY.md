# BioNatural SEO Master Strategy & Keyword Map

## Market Context
Playa del Carmen wellness market is a 50/50 split between English-speaking tourists/expats and Spanish-speaking locals. Intent differs significantly by language. Research shows a clean division between transient volume (EN) and specific localized brand behavior (ES).

## Competitive Landscape (Playa del Carmen)
- **DAC Market**: High local authority (30th Ave), specializes in imported items/herbs. Lacks digital catalog depth.
- **Wo' Market**: Playacar premium segment. Sophisticated website with meat/grocery pre-ordering.
- **Dharma Deli**: Calle 38. Sourdough and superfood specialist. Strong delivery capabilities for expats.
- **Bio-Orgánicos**: Vegetarian/Store hybrid near ADO. High foot traffic but limited product-level SEO.

## High-Intent Keyword Mapping & URL Architecture

| Category | English Keyword | Spanish Keyword | Targeted URL |
| :--- | :--- | :--- | :--- |
| **Health Shop** | organic supplements near me | suplementos orgánicos Playa | `/tienda/suplementos` |
| **Restaurant** | vegan restaurant Playa del Carmen | restaurante vegano Playa | `/restaurante` |
| **Specialized Diet** | keto bread Playa del Carmen | pan keto cerca de mí | `/tienda/keto` |
| **Wellness** | cold pressed juice near me | jugos prensados en frío | `/restaurante/jugos` |
| **Bakery** | gluten free bakery Playa | pan sin gluten a domicilio | `/tienda/panaderia` |
| **Dining** | healthy breakfast Playa del Carmen | desayuno saludable Playa | `/restaurante/desayuno` |
| **E-Commerce** | organic grocery delivery | despensa orgánica a domicilio | `/tienda` |
| **Cultural** | vegan tacos Playa del Carmen | tacos veganos Playa | `/restaurante/menu/tacos` |
| **Superfoods** | bulk superfoods near me | superalimentos por kilo | `/tienda/superfoods` |
| **Specialized** | CBD oil Playa del Carmen | aceite de CBD Playa | `/tienda/cbd` |
| **Brand Focus** | MCT oil Now / ACV Braggs | colágeno Vidanat | `/tienda/especialidades` |

## 🛠️ The "Agentic" Workflow (Phased Build)
1. **Scout**: Use **Perplexity/Firecrawl** to identify winning keywords and competitor meta-strategies.
2. **Organize**: Map those keywords to the 2,000+ products in **Teable** (via NotebookLM Data Tables).
3. **Optimize**: Use **AI Studio** (Gemini) to generate all metadata (Titles, ALT tags, Descriptions).
4. **Automate**: Link **n8n** to the SEO sheet so every new product gets automatic SEO treatment.

## Build Requirements
- **Server Components**: Render all directory items (2,000+) for indexable, semantic SEO.
- **Dynamic Routing**: Implementation of targeted path structure to capture long-tail brand searches.
- **n8n Connectivity**: Syncing Teable (Admin) to Supabase (Production) with automated metadata injection.
