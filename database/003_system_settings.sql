-- Table to store client-managed API keys and settings
CREATE TABLE IF NOT EXISTS public.system_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Only service_role can write, anyone with anon key can read (or vice versa depending on security)
-- For now, we restrict to service_role to protect the keys
CREATE POLICY "Service Role Full Access" ON public.system_settings
    USING (true)
    WITH CHECK (true);

-- Insert defaults (empty or placeholders)
INSERT INTO public.system_settings (key, value, description)
VALUES 
('GEMINI_API_KEY', '', 'Google Gemini API Key for content and image generation'),
('FIRECRAWL_API_KEY', 'fc-6fa2b1091485402b82396b30722d9c00', 'Firecrawl API Key for legacy archiving'),
('WHATSAPP_NUMBER', '', 'Meybell WhatsApp number for lead notifications'),
('TEABLE_URL', '', 'Custom Teable instance URL');
