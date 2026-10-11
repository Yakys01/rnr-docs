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
      title: "runrunapi Docs",
      customCss: ["./src/styles/global.css"],
      sidebar: [
        { label: "Introducción", link: "/docs/" },
        { label: "Empezamos", link: "/empezamos/" },
        {
          label: "Para chats humanos",
          items: [
            { label: "ChatGPT", link: "/chats-humanos/chatgpt/" },
            { label: "Claude", link: "/chats-humanos/claude/" },
            { label: "Jania", link: "/chats-humanos/jania/" },
          ],
        },
        {
          label: "Para agentes IA",
          items: [
            { label: "Claude Code", link: "/agentes-ia/claude-code/" },
            { label: "Codex", link: "/agentes-ia/codex/" },
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
        { label: "APIs REST", link: "/reference/" },
        { label: "Soporte", link: "/soporte/" },
      ],
      plugins: [
        lucode({
          navLinks: [
            { label: "Docs", link: "/docs/" },
            { label: "Referencia", link: "/reference/" },
            { label: "Plataforma", link: ENV.APPWEB_URL },
          ],
          footerText: "Built with [Astro](https://astro.build) and [Lucode Starlight](https://lucas-labs.github.io/lucode-starlight-theme/).",
        }),
      ],
    }),
  ],
});
