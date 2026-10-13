import starlight from "@astrojs/starlight";
import { defineConfig, passthroughImageService } from "astro/config";
import starlightContextualMenu from "starlight-contextual-menu";
import starlightLlmsTxt from "starlight-llms-txt";
import starlightThemeNext from "starlight-theme-next";
import lottie from "astro-integration-lottie";

import { ENV } from "./src/constants";

export default defineConfig({
  // Dominio público de la doc: lo usan el sitemap y `starlight-llms-txt` para
  // las URLs absolutas de /llms.txt.
  site: "https://docs.runrunapi.com/",
  output: "static",
  // URLs viejas en español de páginas renombradas a rutas en inglés: en estático
  // Astro emite un HTML con meta refresh por cada entrada.
  redirects: {
    "/empezamos/": "/get-started/",
    "/soporte/": "/support/",
    "/chats-humanos/chatgpt/": "/humans/chatgpt/",
    "/chats-humanos/claude/": "/humans/claude/",
    "/chats-humanos/jania/": "/humans/jan/",
    "/agentes-ia/claude-code/": "/agents/claude-code/",
    "/agentes-ia/codex/": "/agents/codex/",
    "/agentes-ia/otros-proveedores/": "/agents/other-providers/",
    "/mcp/obtener-usuarios/": "/mcp/get-users/",
    "/mcp/obtener-companias/": "/mcp/get-companies/",
    "/mcp/obtener-convocatorias/": "/mcp/get-tenders/",
    "/docs/autenticacion/": "/docs/authentication/",
    "/docs/primeros-pasos/": "/docs/first-steps/",
  },
  server: { port: ENV.PORT },
  // Passthrough evita la dependencia nativa `sharp`: la media del hero es SVG y
  // no necesita optimización. Si se agregan imágenes raster, instalar sharp.
  image: { service: passthroughImageService() },
  integrations: [
    // Animaciones Lottie (astro-integration-lottie): inyecta el loader en todas
    // las páginas, pero solo descarga el player en las que tienen `data-lottie`.
    lottie(),
    starlight({
      title: "RunRunApi",
      // Sitio monolingüe en español: `root` es la única locale, sin prefijo en
      // las rutas ni selector de idioma, y los textos de la interfaz salen de
      // las traducciones `es` de Starlight.
      locales: { root: { label: "Español", lang: "es" } },
      logo: {
        light: './public/logo-light.svg',
        dark: './public/logo-dark.svg',
        alt: 'RunRunApi',
      },
      customCss: ["./src/styles/global.css"],
      // Header propio: el tema Next no tiene nav en el header (la tenía lucode).
      components: { Header: "./src/components/Header.astro" },
      sidebar: [
        { label: "Introducción", link: "/docs/" },
        { label: "Empezamos", link: "/get-started/" },
        {
          label: "Para chats humanos",
          items: [
            { label: "Introducción", link: "/humans/" },
            { label: "ChatGPT", link: "/humans/chatgpt/", attrs: { "data-icon": "openai" } },
            { label: "Claude", link: "/humans/claude/", attrs: { "data-icon": "claude" } },
            { label: "Jan AI", link: "/humans/jan/", attrs: { "data-icon": "jan-ia" } },
            { label: "Otros proveedores", link: "/humans/other-providers/" },
          ],
        },
        {
          label: "Para agentes IA",
          items: [
            { label: "Introducción", link: "/agents/" },
            { label: "Claude Code", link: "/agents/claude-code/", attrs: { "data-icon": "claudecode" } },
            { label: "Codex", link: "/agents/codex/", attrs: { "data-icon": "codex" } },
            { label: "Otros proveedores", link: "/agents/other-providers/" },
          ],
        },
        {
          label: "MCP Referencia",
          items: [
            { label: "Introducción", link: "/mcp/" },
            { label: "Obtener usuarios", link: "/mcp/get-users/" },
            { label: "Obtener compañías", link: "/mcp/get-companies/" },
            { label: "Obtener convocatorias", link: "/mcp/get-tenders/" },
          ],
        },
        { label: "Apis Referencia", link: "/reference/" },
        { label: "Soporte", link: "/support/" },
      ],
      plugins: [
        starlightThemeNext(),
        // Menú contextual por página: copiar como Markdown, ver Markdown y
        // abrir la página en ChatGPT/Claude.
        starlightContextualMenu({
          actions: ["copy", "view", "chatgpt", "claude"],
        }),
        // Genera /llms.txt, /llms-full.txt y /llms-small.txt para agentes IA.
        starlightLlmsTxt(),
      ],
    }),
  ],
});
