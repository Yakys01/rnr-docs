import starlight from "@astrojs/starlight";
import { defineConfig, passthroughImageService } from "astro/config";
import lucode from "lucode-starlight";

import { ENV } from "./src/constants";

export default defineConfig({
  output: "static",
  server: { port: ENV.PORT },
  // Passthrough evita la dependencia nativa `sharp`: la media del hero es SVG y
  // no necesita optimización. Si se agregan imágenes raster, instalar sharp.
  image: { service: passthroughImageService() },
  integrations: [
    starlight({
      title: "RunRunApi",
      logo: {
        light: './public/logo-light.svg',
        dark: './public/logo-dark.svg',
        alt: 'RunRunApi',
      },
      customCss: ["./src/styles/global.css"],
      sidebar: [
        { label: "Introducción", link: "/docs/" },
        { label: "Empezamos", link: "/empezamos/" },
        {
          label: "Para chats humanos",
          items: [
            {
              label: "ChatGPT",
              link: "/chats-humanos/chatgpt/",
              attrs: { "data-icon": "openai" },
            },
            {
              label: "Claude",
              link: "/chats-humanos/claude/",
              attrs: { "data-icon": "claude" },
            },
            {
              label: "Jania",
              link: "/chats-humanos/jania/",
              attrs: { "data-icon": "jan-ia" },
            },
          ],
        },
        {
          label: "Para agentes IA",
          items: [
            {
              label: "Claude Code",
              link: "/agentes-ia/claude-code/",
              attrs: { "data-icon": "claudecode" },
            },
            {
              label: "Codex",
              link: "/agentes-ia/codex/",
              attrs: { "data-icon": "codex" },
            },
            { label: "Otros proveedores", link: "/agentes-ia/otros-proveedores/" },
          ],
        },
        {
          label: "MCP Referencia",
          items: [
            { label: "Obtener usuarios", link: "/mcp/obtener-usuarios/" },
            { label: "Obtener compañías", link: "/mcp/obtener-companias/" },
            { label: "Obtener convocatorias", link: "/mcp/obtener-convocatorias/" },
          ],
        },
        { label: "Apis Referencia", link: "/reference/" },
        { label: "Soporte", link: "/soporte/" },
      ],
      plugins: [
        lucode({
          navLinks: [
            { label: "Docs", link: "/docs/", attrs: { "data-icon": "docs" } },
            { label: "Api Referencia", link: "/reference/", attrs: { "data-icon": "api" } },
            { label: "Plataforma", link: ENV.APPWEB_URL, attrs: { "data-icon": "plataforma" } },
          ],
        }),
      ],
    }),
  ],
});
