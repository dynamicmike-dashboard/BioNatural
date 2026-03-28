/**
 * Bilingual Logic Engine
 * Handles context-aware localization and mapping between English/Spanish terms.
 */

interface TranslationMap {
  [key: string]: string;
}

const termMapping: TranslationMap = {
  "supplements": "suplementos",
  "vitamins": "vitaminas",
  "organic": "orgánico",
  "produce": "productos",
  "honey": "miel",
  "carrots": "zanahorias",
  "roots": "raíces",
};

export const bilingualEngine = {
  /**
   * Translates search queries to the target database language (Spanish)
   * if the input is detected as English.
   */
  async search(query: string, sourceLang: string) {
    const normalizedQuery = query.toLowerCase().trim();
    let targetQuery = normalizedQuery;

    // Logic: If user searches in English, map to Spanish for Teable/n8n
    if (sourceLang === "en" && termMapping[normalizedQuery]) {
      targetQuery = termMapping[normalizedQuery];
      console.log(`[Bilingual Brain] Context-Aware Mapping: "${query}" -> "${targetQuery}"`);
    }

    // In a real scenario, this would call the n8n bridge
    // const response = await fetch(process.env.N8N_TEABLE_BRIDGE_URL, {
    //   method: 'POST',
    //   body: JSON.stringify({ query: targetQuery })
    // });
    // return response.json();

    // Mocking Teable data response
    return {
      originalQuery: query,
      mappedQuery: targetQuery,
      sourceLanguage: sourceLang,
      results: [
        { id: 1, name: targetQuery === "suplementos" ? "Proteína Vegana" : "Producto Genérico", price: 25.00 },
        { id: 2, name: targetQuery === "suplementos" ? "Omega 3 Natural" : "Producto Genérico", price: 18.50 }
      ]
    };
  }
};
