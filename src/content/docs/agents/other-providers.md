---
title: Otros proveedores
description: Cómo conectar cualquier cliente MCP sobre HTTP a rnr-api.
---

Cualquier cliente que hable MCP sobre HTTP se conecta a rnr-api con los mismos tres datos: URL, autenticación y listado de herramientas. Esto cubre Cursor, Windsurf, Gemini CLI, Zed y clientes propios construidos con `@modelcontextprotocol/sdk`.

## Conexión base

1. **URL**: `https://api.runrunapi.com/mcp`.
2. **Auth**: OAuth (RFC 8414/9728 via el metadata) o Bearer de sesión (API key REST).
3. **Herramientas**: se listan con `tools/list`; los resultados llegan en `structuredContent` (listas bajo `items`) o en texto JSON en clientes legacy.
4. **Idioma**: los datos y descripciones vienen en español; los identificadores de herramienta (en inglés, ver [referencia abajo](/mcp/get-users/)) son estables.

## Qué verificar al integrar

- Que tu cliente use transport HTTP (no stdio) contra la URL de arriba.
- Que complete el challenge `401` + discovery RFC 9728 si usa OAuth, o que envíe `Authorization: Bearer <api-key>` si usa API key de sesión.
- Que lea `structuredContent` para consumir los objetos y listas directamente.
- Que trate los errores JSON-RPC con `isError: true` y el mensaje en texto.

El detalle de cada herramienta (entradas y salidas) está en la [MCP Referencia](/mcp/get-users/).
