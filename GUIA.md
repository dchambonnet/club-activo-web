# Guía paso a paso — Sitio del Club Activo 20-30 de Panamá

**Arquitectura:** HTML/CSS/JS estático alojado en **Vercel** + **Supabase** como base de datos
(eventos, voluntarios, contactos y documentos de transparencia). No hay servidor que mantener.

```
club-activo-2030/
├── index.html            ← la página
├── css/styles.css        ← diseño
├── js/content.js         ← ✏️ comités, junta, contactos, redes (edita aquí)
├── js/config.js          ← ✏️ URL y clave pública de Supabase
├── js/app.js, boot.js    ← lógica
├── vercel.json           ← seguridad y caché
└── supabase/
    ├── schema.sql        ← tablas + reglas de seguridad
    └── functions/notificar/index.ts   ← (opcional) aviso por correo a info@
```

---

## Paso 1 — Crear las tablas en Supabase (5 min)
1. Entra a tu proyecto **Club Activo 20-30 de Panamá** en supabase.com.
2. Menú izquierdo → **SQL Editor** → **New query**.
3. Pega TODO el contenido de `supabase/schema.sql` → **Run**. Debe decir "Success".
4. Verifica en **Table Editor**: `eventos`, `voluntarios`, `contactos`, `documentos_transparencia`.

## Paso 2 — Conectar el sitio con Supabase (2 min)
1. Supabase → **Project Settings → API Keys**.
2. Copia la **Project URL** (`https://xxxx.supabase.co`) y la clave **publishable** (o `anon`).
3. Pégalas en `js/config.js`.

> ⚠️ Nunca pegues la clave `service_role` / `secret` en el sitio. La publishable es segura porque las reglas
> RLS del paso 1 solo permiten: **leer** eventos/documentos publicados y **escribir** (no leer) formularios.

## Paso 3 — Personalizar el contenido (15 min)
Abre `js/content.js` y completa:
- `teletonUrl`: enlace oficial de la página de la Teletón.
- `junta`: nombres y cargos reales (y fotos en `assets/junta/` si quieres).
- `redes`: URLs de Instagram, Facebook, etc.
- `comites`: **valida las descripciones** con la directiva (están en borrador) y confirma el listado oficial.

Logo oficial: guarda `assets/logo.png` y reemplaza el círculo `.brand-mark` en `index.html` por un `<img>`.

## Paso 4 — Publicar en Vercel (10 min)
**Opción A (recomendada, se actualiza sola):**
1. Crea un repositorio en GitHub (ej. `club-activo-2030-web`) y sube esta carpeta.
2. vercel.com → **Add New → Project** → importa el repositorio.
3. *Framework Preset*: **Other**. Build Command y Output Directory: **vacíos**. → **Deploy**.
4. Cada cambio que subas a GitHub se publica automáticamente.

**Opción B (sin GitHub):** en una terminal dentro de la carpeta: `npx vercel` y luego `npx vercel --prod`.

## Paso 5 — Dominio propio
Vercel → tu proyecto → **Settings → Domains** → agrega `activo20-30.org` (o `www.`) y sigue las instrucciones de DNS.
Quien administre el dominio actual debe cambiar los registros; **no toques el correo** (`info@`) ni los registros MX.

## Paso 6 — Publicar eventos (cada vez que haya uno)
Supabase → **Table Editor → eventos → Insert row**:
| Campo | Qué poner |
|---|---|
| titulo, descripcion, lugar | texto |
| tipo | `club`, `teleton`, `fundacion` o `firma` |
| fecha | fecha y hora del evento |
| voluntarios_abiertos | ✅ para mostrar el botón **Postularme** |
| publicado | ✅ para que aparezca en la web |

## Paso 7 — Transparencia (estados financieros)
1. Supabase → **Storage → transparencia** → **Upload** el PDF.
2. Haz clic en el archivo → **Get URL** (copia la URL pública).
3. **Table Editor → documentos_transparencia → Insert row**: `titulo`, `tipo`, `periodo` (ej. `2026`), `archivo_url`, `publicado` ✅.
Los documentos se agrupan por periodo en la sección **Transparencia**.

## Paso 8 — Recibir las solicitudes en info@activo20-30.org
Las solicitudes ya se guardan en Supabase (**Table Editor → contactos / voluntarios**; cambia la columna `estado` al atenderlas).
Para recibirlas **además por correo**:
1. Crea cuenta en **resend.com** y verifica el dominio `activo20-30.org`.
2. Instala la CLI de Supabase y, desde la carpeta: `supabase functions deploy notificar --no-verify-jwt`
3. `supabase secrets set RESEND_API_KEY=re_xxx WEBHOOK_SECRET=<clave-larga-inventada>`
4. Supabase → **Database → Webhooks → Create**: tabla `contactos`, evento INSERT, tipo *Supabase Edge Functions*
   → `notificar`, con header `x-webhook-secret: <la misma clave>`. Repite para `voluntarios`.
> La función no está probada contra tu cuenta; haz un envío de prueba desde la web antes de depender de ella.

## Paso 9 — Antes de anunciarlo (checklist)
- [ ] Probar los dos formularios y ver que aparezcan en Supabase.
- [ ] Probar en el celular.
- [ ] Reemplazar nombres de junta, URL de Teletón y descripciones de comités.
- [ ] Revisar con la directiva el texto de **transparencia** y de **cómo se financia el Club**.
- [ ] Publicar al menos un estado financiero actualizado.
- [ ] Datos personales: los voluntarios dejan nombre/correo/teléfono. Define quién los ve y por cuánto tiempo se conservan
      (Panamá tiene ley de protección de datos personales, Ley 81 de 2019; conviene agregar una política de privacidad).

## Notas
- **Plan Free de Supabase:** el proyecto se **pausa tras ~1 semana sin actividad**; con visitas reales normalmente no pasa,
  pero si se pausa, los eventos dejan de cargar hasta reactivarlo (botón *Restore*). Para un sitio público conviene el plan Pro
  o un chequeo periódico.
- **Seguridad de la cuenta:** activa 2FA en Supabase, Vercel y GitHub, y limita quién tiene acceso (la directiva, no todos los socios).
