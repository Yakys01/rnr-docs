import "dotenv/config";

/**
 * Mapeo de las variables de entorno del docs, en un solo lugar y sin fallbacks:
 * si una falta, quien la usa falla. `dotenv/config` carga el `.env` del cwd;
 * los scripts (`fetch-spec.ts`) además las reciben de Bun automáticamente.
 */
export const ENV = {
  /** Puerto del dev server (Astro). */
  PORT: Number(process.env.PORT),
  /** Plataforma (appweb). */
  APPWEB_URL: process.env.APPWEB_URL,
  /** Endpoint de la API & MCP (appapi). */
  APPAPI_URL: process.env.APPAPI_URL,
} as const;
