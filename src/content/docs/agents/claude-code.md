---
title: Claude Code
description: Cómo conectar Claude Code al MCP de rnr-api.
---

Claude Code habla MCP sobre HTTP y soporta el flujo OAuth de rnr-api, así que no necesita tokens manuales: al invocar una herramienta por primera vez, pide autorización.

## Registrar el servidor

En un comando (sesión):

```sh
claude mcp add --transport http rnr-api https://api.runrunapi.com/mcp
```

O en `.mcp.json` del proyecto:

```json
{
  "mcpServers": {
    "rnr-api": {
      "type": "http",
      "url": "https://api.runrunapi.com/mcp"
    }
  }
}
```

## Autorización

Claude Code soporta OAuth MCP: al invocar una herramienta pedirá autorización. Comandos útiles:

- `/mcp` — muestra el estado de los servidores conectados.
- `/mcp auth` — fuerza la reautenticación si el token expiró o quedó en mal estado.

## Uso

Con el servidor conectado, pide en lenguaje natural lo que necesites; Claude Code elige la herramienta:

- *"Busca empresas que contengan 'constructora' y dame su estado SUNAT"*
- *"Lista los contratos del RUC 20512345678 en 2024"*
- *"Recolecta de nuevo la ficha del DNI 12345678"* (usa `collect_user_info`, la única herramienta que no es de lectura pura)

El detalle de cada herramienta (entradas y salidas) está en la [MCP Referencia](/mcp/get-users/).
