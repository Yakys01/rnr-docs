---
title: Agentes IA
description: Conecta Claude Code, Codex o cualquier cliente MCP sobre HTTP al MCP de rnr-api.
---

Los agentes de código se conectan al servidor MCP de rnr-api por HTTP: basta declarar la URL y elegir autenticación (OAuth, o un API key de sesión de la REST como Bearer). Claude Code y Codex tienen guía propia; cualquier otro cliente MCP sigue los mismos tres datos: URL, autenticación y listado de herramientas.

<CardGrid>
  <a class="card-link" href="/agents/claude-code/">
    <Card title="Claude Code" icon="window">
      Conecta el MCP por HTTP con flujo OAuth, sin tokens manuales.
    </Card>
  </a>
  <a class="card-link" href="/agents/codex/">
    <Card title="Codex" icon="code-branch">
      Declara el servidor MCP remoto en la configuración de Codex.
    </Card>
  </a>
  <a class="card-link" href="/agents/other-providers/">
    <Card title="Otros proveedores" icon="puzzle">
      Cursor, Windsurf, Gemini CLI, Zed y cualquier cliente MCP sobre HTTP.
    </Card>
  </a>
</CardGrid>
