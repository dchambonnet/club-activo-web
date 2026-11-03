-- =====================================================================
-- Club Activo 20-30 de Panamá — esquema de Supabase
-- Pégalo completo en: Supabase > SQL Editor > New query > Run
-- Es seguro ejecutarlo más de una vez.
-- =====================================================================

-- ---------- 1) EVENTOS (públicos, los administra la directiva) ----------
create table if not exists public.eventos (
  id                  uuid primary key default gen_random_uuid(),
  titulo              text        not null check (char_length(titulo) between 3 and 160),
  descripcion         text        check (char_length(descripcion) <= 1500),
  tipo                text        not null default 'club'
                        check (tipo in ('club','teleton','fundacion','firma')),
  fecha               timestamptz not null,
  lugar               text        check (char_length(lugar) <= 200),
  voluntarios_abiertos boolean    not null default false,
  publicado           boolean     not null default false,
  creado_en           timestamptz not null default now()
);

-- ---------- 2) VOLUNTARIOS (el público solo puede ESCRIBIR) ----------
create table if not exists public.voluntarios (
  id            uuid primary key default gen_random_uuid(),
  nombre        text not null check (char_length(nombre) between 2 and 120),
  correo        text not null check (correo ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(correo) <= 160),
  telefono      text check (char_length(telefono) <= 30),
  evento_id     uuid references public.eventos(id) on delete set null,
  comite        text check (char_length(comite) <= 120),
  mensaje       text check (char_length(mensaje) <= 1000),
  consentimiento boolean not null check (consentimiento = true),
  estado        text not null default 'nuevo' check (estado in ('nuevo','contactado','asignado','descartado')),
  creado_en     timestamptz not null default now()
);

-- ---------- 3) CONTACTOS (solicitudes que llegan a info@activo20-30.org) ----------
create table if not exists public.contactos (
  id            uuid primary key default gen_random_uuid(),
  nombre        text not null check (char_length(nombre) between 2 and 120),
  correo        text not null check (correo ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(correo) <= 160),
  asunto        text not null check (char_length(asunto) <= 120),
  mensaje       text not null check (char_length(mensaje) between 5 and 2000),
  consentimiento boolean not null check (consentimiento = true),
  estado        text not null default 'nuevo' check (estado in ('nuevo','atendido','archivado')),
  creado_en     timestamptz not null default now()
);

-- ---------- 4) TRANSPARENCIA (documentos públicos) ----------
create table if not exists public.documentos_transparencia (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null check (char_length(titulo) between 3 and 160),
  tipo        text not null default 'estado_financiero'
                check (tipo in ('estado_financiero','informe','acta','otro')),
  periodo     text not null,                 -- ej: '2026', 'Octubre 2026'
  archivo_url text not null,                 -- URL pública del PDF (Storage)
  publicado   boolean not null default false,
  creado_en   timestamptz not null default now()
);

-- ---------- SEGURIDAD (Row Level Security) ----------
alter table public.eventos                  enable row level security;
alter table public.voluntarios              enable row level security;
alter table public.contactos                enable row level security;
alter table public.documentos_transparencia enable row level security;

-- Lectura pública SOLO de lo publicado
drop policy if exists "publico_lee_eventos" on public.eventos;
create policy "publico_lee_eventos" on public.eventos
  for select to anon, authenticated using (publicado = true);

drop policy if exists "publico_lee_documentos" on public.documentos_transparencia;
create policy "publico_lee_documentos" on public.documentos_transparencia
  for select to anon, authenticated using (publicado = true);

-- El público solo puede INSERTAR (nunca leer) voluntarios y contactos
drop policy if exists "publico_envia_voluntario" on public.voluntarios;
create policy "publico_envia_voluntario" on public.voluntarios
  for insert to anon, authenticated
  with check (consentimiento = true and estado = 'nuevo');

drop policy if exists "publico_envia_contacto" on public.contactos;
create policy "publico_envia_contacto" on public.contactos
  for insert to anon, authenticated
  with check (consentimiento = true and estado = 'nuevo');

-- Permisos de tabla mínimos para la clave pública
revoke all on public.eventos, public.voluntarios, public.contactos, public.documentos_transparencia from anon;
grant select on public.eventos                  to anon;
grant select on public.documentos_transparencia to anon;
grant insert on public.voluntarios              to anon;
grant insert on public.contactos                to anon;

-- ---------- STORAGE: carpeta pública para los PDF de transparencia ----------
insert into storage.buckets (id, name, public)
values ('transparencia', 'transparencia', true)
on conflict (id) do nothing;

-- Nota: los archivos del bucket público se pueden LEER por URL.
-- Subirlos/borrarlos solo puede hacerlo alguien con sesión en el dashboard de Supabase.

-- ---------- EJEMPLO opcional (descomenta para probar) ----------
-- insert into public.eventos (titulo, descripcion, tipo, fecha, lugar, voluntarios_abiertos, publicado)
-- values ('Gran Colecta de Pañales', 'Ven a ayudarnos a recibir y clasificar donaciones.', 'club',
--         now() + interval '20 days', 'Ciudad de Panamá', true, true);
