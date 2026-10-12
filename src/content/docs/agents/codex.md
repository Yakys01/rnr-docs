---
title: Codex
description: Cómo conectar Codex al MCP de rnr-api.
---

Codex consume servidores MCP remotos declarados en su configuración. Antes de empezar decide tu autenticación: OAuth si tu versión de Codex lo soporta, o un API key de sesión de la REST como Bearer.

## Registrar el servidor

Configura el servidor MCP remoto en `~/.codex/config.toml`:

```toml
[mcp_servers.rnr-api]
url = "https://api.runrunapi.com/mcp"
```

## Autenticación

Si no hay OAuth automático, genera un API key de sesión vía la REST (`/session`) y configúralo como header Bearer según la versión de Codex que uses.

## Uso

Con el servidor registrado, pide en lenguaje natural lo que necesites; Codex elige la herramienta:

- *"Busca empresas que contengan 'constructora'"*
- *"Dame la ficha de la empresa con RUC 20512345678"*
- *"Dame el detalle de la convocatoria C1234567"*

Si el servidor responde `401`, el token falta o expiró: regenera el API key o repite el flujo OAuth. El detalle de cada herramienta (entradas y salidas) está en la [MCP Referencia](/mcp/get-users/).
