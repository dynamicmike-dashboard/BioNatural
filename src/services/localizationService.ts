/**
 * Localization Engine
 * Priority: User Profile Preference > Browser Header > Default (EN)
 */

export type Language = 'en' | 'es';

export const localizationService = {
  /**
   * Identifies the user's language and serves content in English or Spanish.
   * In a real app, this would check cookies, headers, or user profile.
   */
  getLocalizedContent: (data: any, lang: Language = 'en') => {
    if (!data) return null;
    
    // If the data is a JSONB bilingual object
    if (typeof data === 'object' && data[lang]) {
      return data[lang];
    }
    
    // Fallback to English if target language is missing
    return data['en'] || data;
  }
};
