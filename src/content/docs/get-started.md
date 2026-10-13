---
title: Empezamos
description: Cómo conectarte al MCP de RunRunApi — endpoint, autenticación, cuota y paginación.
---

Antes de conectarte necesitas dos cosas: la **URL del servidor MCP** y **credenciales válidas**. El flujo típico es:

1. Obtén tus credenciales en la plataforma: [www.runrunapi.com](https://www.runrunapi.com).
2. Elige tu cliente: un [chat humano](/humans/chatgpt/) o un [agente de código](/agents/claude-code/).
3. Registra el servidor MCP con la URL de abajo y autentícate.
4. Prueba con `tools/list` para ver las 16 herramientas disponibles.

## Endpoint

- Servidor MCP: `POST https://api.runrunapi.com/mcp` (JSON-RPC, transport HTTP).
- Health check público: `GET /health/mcp`.
- Discovery OAuth (RFC 9728): `GET /.well-known/oauth-protected-resource/mcp`.

## Autenticación

El MCP es un *resource server* OAuth. Acepta dos Bearer, y el cupo es compartido entre REST y MCP:

1. **JWT OAuth** (camino principal): tokens emitidos por la plataforma ([www.runrunapi.com](https://www.runrunapi.com)); con ellos accedés a los datos de `api.runrunapi.com`.
2. **API key REST** (retrocompatible): un Bearer de sesión válido de la API también opera `/mcp`.

Si el token falta o es inválido, el endpoint responde con el challenge `WWW-Authenticate` apuntando al metadata OAuth.

## Cuota y paginación

- Solo `tools/call` descuenta cuota; el handshake y `tools/list` no consumen. Exceder el cupo responde HTTP 429 con error JSON-RPC.
- Todas las herramientas de listado comparten el mismo convenio de paginación y fechas:

| Campo | Tipo | Descripción |
|---|---|---|
| `limit` | int ≥ 1 | Máximo de filas por sección (por defecto el límite global; para listados de empresa, el máximo permitido) |
| `offset` | int ≥ 0 | Filas a saltar por sección (0 por defecto) |
| `year` | int 2000–2100 | Año de la fecha a filtrar |
| `month` | int 1–12 | Mes de la fecha a filtrar |
| `day` | int 1–31 | Día de la fecha a filtrar |

- Los RUC admiten 11 dígitos de empresa o códigos de consorcio de 4 a 8 dígitos.
- Las salidas llegan como `structuredContent`: los objetos van directos y las listas se envuelven en `{ "items": [...] }`. Los errores se devuelven con `isError: true` y el mensaje en texto.
