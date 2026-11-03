/*
 * Configuración de Supabase.
 * Pega aquí la "Project URL" y la clave PÚBLICA (publishable / anon).
 * Están en: Supabase > Project Settings > API Keys.
 *
 * ⚠️ NUNCA pegues aquí la clave "service_role" ni "secret". Esa jamás va en la web.
 * La clave pública es segura porque las reglas RLS (supabase/schema.sql) limitan lo que puede hacer.
 *
 * Si dejas esto vacío, el sitio funciona en "modo demo" (eventos de ejemplo, formularios desactivados).
 */
window.SUPABASE_CONFIG = {
  url: "https://lcqxmbdnxrjzukesfdtg.supabase.co",      // ej: "https://xxxxxxxxxxxx.supabase.co"
  anonKey: "sb_publishable_oBe7aleMl2OgIb_zTwgpVg_TFQRR835"   // ej: "sb_publishable_..." (o la anon key antigua "eyJ...")
};
