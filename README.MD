# Documentación de RunRunApi

Sitio de documentación pública de **RunRunApi** ([docs.runrunapi.com](https://docs.runrunapi.com/)), construido con [Astro Starlight](https://starlight.astro.build/). Contenido e interfaz en español; salida 100 % estática.

## Contenido

- **`src/content/docs/docs/index.mdx`** — introducción y panorama de módulos de la API (usuarios, empresas, rankings, etc.).
- **`src/content/docs/get-started.md`** — primeros pasos.
- **`src/content/docs/humans/`** — guías para conectar chats de IA (ChatGPT, Claude, Jan AI y otros) al MCP de RunRunApi.
- **`src/content/docs/agents/`** — guías para agentes de código (Claude Code, Codex, OpenCode y otros).
- **`src/content/docs/mcp/`** — referencia de las herramientas MCP: usuarios, compañías y convocatorias.
- **`/reference`** — referencia interactiva del API (Scalar) generada desde el OpenAPI del servicio.
- **`/llms.txt`** — versiones del sitio para consumo por agentes IA (generadas con `starlight-llms-txt`).

El sidebar se mantiene a mano en `astro.config.mjs`: una página nueva sin entrada ahí no aparece en la navegación.

## Requisitos y entorno

- [Bun](https://bun.sh/) como runtime y gestor de paquetes.
- Un archivo `.env` (copia de `.env.example`) con `PORT` (dev server), `APPWEB_URL` (plataforma) y `APPAPI_URL` (API & MCP). `src/constants.ts` es el único lector de estas variables y no define fallbacks: si falta una, falla quien la use.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `bun install` | Instala dependencias. |
| `bun run dev` | Dev server en `PORT`. |
| `bun run build` | Build de producción en `dist/`. |
| `bun run check-types` | Verificación con `astro check` (no hay tests ni linter). |
| `bun run scripts/fetch-spec.ts` | Descarga solo el snapshot de OpenAPI. |

`dev` y `build` ejecutan primero `scripts/fetch-spec.ts`, que descarga el spec desde `${APPAPI_URL}/openapi/json` a `public/openapi.json` (gitignoreado) y le inyecta los links de la docs. Si el API no responde, se reutiliza el último snapshot local; el build solo falla si no existe ninguno. **No edites ese JSON**: los cambios van en el script.

## Estructura

```text
public/            estáticos del sitio (imgs/ de las guías, svgs, lottie, openapi.json generado)
scripts/           fetch-spec.ts (snapshot del OpenAPI)
src/constants.ts   lectura centralizada de variables de entorno
src/content/docs/  contenido (.md/.mdx) en español
src/pages/         reference.astro (Scalar)
src/components/    Header y Footer propios
src/styles/        global.css (puentea tokens de Starlight y variables de Scalar)
astro.config.mjs   integraciones, redirects de rutas antiguas y sidebar
```

Notas:

- Las rutas de archivo están en inglés, pero las etiquetas y el contenido visible van en español.
- Rutas antiguas en español redirigen a las nuevas vía `redirects` en `astro.config.mjs` (en estático Astro emite un HTML con meta refresh).
- El servicio de imágenes es `passthrough` (sin `sharp`): instálalo antes de agregar imágenes raster al contenido.
