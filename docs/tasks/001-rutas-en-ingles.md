# Rutas de archivos en inglés, UI en español

Status: done

## Goal

Renombrar todos los archivos y carpetas de `src/content/docs` a nombres en inglés (cambian las URLs). El contenido visible, los títulos, el sidebar y el header siguen en español, sin cambios de texto.

## Mapeo archivo → ruta

| Archivo nuevo | Ruta nueva | Antes |
| --- | --- | --- |
| `get-started.md` | `/get-started/` | `empezamos.md` → `/empezamos/` |
| `support.md` | `/support/` | `soporte.md` → `/soporte/` |
| `humans/chatgpt.md` | `/humans/chatgpt/` | `chats-humanos/chatgpt.md` |
| `humans/claude.md` | `/humans/claude/` | `chats-humanos/claude.md` |
| `humans/jan.md` | `/humans/jan/` | `chats-humanos/jania.md` |
| `agents/claude-code.md` | `/agents/claude-code/` | `agentes-ia/claude-code.md` |
| `agents/codex.md` | `/agents/codex/` | `agentes-ia/codex.md` |
| `agents/other-providers.md` | `/agents/other-providers/` | `agentes-ia/otros-proveedores.md` |
| `mcp/get-users.md` | `/mcp/get-users/` | `mcp/obtener-usuarios.md` |
| `mcp/get-companies.md` | `/mcp/get-companies/` | `mcp/obtener-companias.md` |
| `mcp/get-tenders.md` | `/mcp/get-tenders/` | `mcp/obtener-convocatorias.md` |
| `docs/authentication.md` | `/docs/authentication/` | `docs/autenticacion.md` |
| `docs/first-steps.md` | `/docs/first-steps/` | `docs/primeros-pasos.md` |

Sin cambios (ya en inglés o nombre propio): `index.mdx`, `docs/index.mdx`, `docs/getting-started.md`, `chatgpt.md`, `claude.md`, `claude-code.md`, `codex.md`, `reference.astro`.

## Comportamiento esperado

- Las URLs nuevas existen y todo enlace interno (sidebar, landing, contenido) apunta a ellas.
- La UI sigue 100% en español: los `label` del sidebar, los `title` del frontmatter y la nav del Header no dependen del nombre de archivo.
- `/`, `/docs/` y `/reference/` no cambian.

## Fuera de alcance

- Traducir contenido o textos de UI.
- Reorganizar el sidebar: `/docs/getting-started/`, `/docs/first-steps/` y `/docs/authentication/` siguen sin entrada de nav (ya pasaba antes).
- `Header.astro` y `src/pages/reference.astro` (sus links `/docs/` y `/reference/` no cambian).

## Verificación

1. Sin referencias viejas: `grep -rniE 'chats-humanos|agentes-ia|obtener-(usuarios|companias|convocatorias)|/empezamos/|/soporte/|/docs/(autenticacion|primeros-pasos)/' src astro.config.mjs` → 0 resultados ✓
2. Todos los enlaces internos resuelven a un archivo existente (script ad-hoc: 16 archivos → 17 rutas) ✓
3. `bun run check-types` → 0 errores ✓
4. `bun run build` → las 13 rutas viejas emiten un stub con `meta refresh` al destino nuevo ✓
5. Pendiente manual: `bun run dev` y recorrer sidebar + landing.

## Ejecutado

1. Renombres con `git mv` (historia conservada; listado en el mapeo).
2. Rutas actualizadas en `astro.config.mjs` (11 links del sidebar) y en 20 enlaces internos de `src/content/docs`, incluidos los 3 `<a href>` HTML crudo de `index.mdx`.
3. `Header.astro` sin cambios.
4. `redirects` en `astro.config.mjs`: 13 rutas viejas → nuevas (stubs con `meta refresh`).

## Pendientes

- Recorrido manual del sidebar en `bun run dev`.
