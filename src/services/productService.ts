/**
 * Product Service (Supabase Simulation)
 * Handles the 'Top 200 Products' with bilingual JSONB fields.
 */
import { localizationService, Language } from "./localizationService.ts";

export interface Product {
  id: string;
  sku: string;
  name: any; // JSONB: { en: string, es: string }
  description: any; // JSONB
  ingredients: any; // JSONB: { en: string[], es: string[] }
  health_benefits: any; // JSONB: { en: string[], es: string[] }
  price: number;
  direct_url: string;
  image_url: string;
  keywords: string[];
}

const mockProducts: Product[] = [
  {
    id: "p1",
    sku: "BN-HON-01",
    name: { en: "Wildflower Honey", es: "Miel de Flores Silvestres" },
    description: { 
      en: "Raw, unfiltered harvest from our conservatory hives.", 
      es: "Cosecha cruda y sin filtrar de nuestras colmenas del conservatorio." 
    },
    ingredients: { 
      en: ["100% Raw Honey"], 
      es: ["100% Miel Cruda"] 
    },
    health_benefits: { 
      en: ["Immune Support", "Natural Energy"], 
      es: ["Apoyo Inmunológico", "Energía Natural"] 
    },
    price: 12.00,
    direct_url: "https://bionatural.shop/products/wildflower-honey",
    image_url: "https://picsum.photos/seed/honey/400/400",
    keywords: ["PURE", "SHOP"]
  },
  {
    id: "p2",
    sku: "BN-CAR-02",
    name: { en: "Heirloom Amber Carrots", es: "Zanahorias de Herencia Ámbar" },
    description: { 
      en: "Wild-pollinated and exceptionally sweet.", 
      es: "Polinizadas de forma silvestre y excepcionalmente dulces." 
    },
    ingredients: { 
      en: ["Organic Carrots"], 
      es: ["Zanahorias Orgánicas"] 
    },
    health_benefits: { 
      en: ["Vision Health", "Antioxidants"], 
      es: ["Salud Visual", "Antioxidantes"] 
    },
    price: 4.50,
    direct_url: "https://bionatural.shop/products/heirloom-carrots",
    image_url: "https://picsum.photos/seed/carrots/400/400",
    keywords: ["MENU", "SHOP"]
  },
  {
    id: "p3",
    sku: "BN-TEA-03",
    name: { en: "Zen Infusion Tea", es: "Té Infusión Zen" },
    description: { 
      en: "A calming blend of chamomile and fresh mint.", 
      es: "Una mezcla calmante de manzanilla y menta fresca." 
    },
    ingredients: { 
      en: ["Chamomile", "Mint"], 
      es: ["Manzanilla", "Menta"] 
    },
    health_benefits: { 
      en: ["Stress Relief", "Digestive Aid"], 
      es: ["Alivio del Estrés", "Ayuda Digestiva"] 
    },
    price: 15.00,
    direct_url: "https://bionatural.shop/products/zen-tea",
    image_url: "https://picsum.photos/seed/tea/400/400",
    keywords: ["PURE"]
  },
  {
    id: "p4",
    sku: "BN-BER-04",
    name: { en: "Conservatory Berries", es: "Bayas del Conservatorio" },
    description: { 
      en: "Daily harvest of the sweetest seasonal berries.", 
      es: "Cosecha diaria de las bayas de temporada más dulces." 
    },
    ingredients: { 
      en: ["Mixed Berries"], 
      es: ["Bayas Mixtas"] 
    },
    health_benefits: { 
      en: ["Vitamin C", "Brain Health"], 
      es: ["Vitamina C", "Salud Cerebral"] 
    },
    price: 8.00,
    direct_url: "https://bionatural.shop/products/berries",
    image_url: "https://picsum.photos/seed/berries/400/400",
    keywords: ["SHOP"]
  }
];

export const productService = {
  getProducts: async (lang: Language = 'en') => {
    return mockProducts.map(p => ({
      ...p,
      name: localizationService.getLocalizedContent(p.name, lang),
      description: localizationService.getLocalizedContent(p.description, lang),
      ingredients: localizationService.getLocalizedContent(p.ingredients, lang),
      health_benefits: localizationService.getLocalizedContent(p.health_benefits, lang),
    }));
  },

  getProductByKeyword: async (keyword: string) => {
    const product = mockProducts.find(p => p.keywords.includes(keyword.toUpperCase()));
    return product || null;
  }
};
