---
title: ChatGPT
description: Cómo usar RunRunApi desde ChatGPT con un conector MCP.
---

ChatGPT puede consultar los datos de RunRunApi en lenguaje natural si lo registras como conector MCP. Antes de empezar necesitas tus credenciales de la plataforma ([www.runrunapi.com](https://www.runrunapi.com)), que emite el token OAuth que ChatGPT usará.

## Conectar el servidor

1. En ChatGPT, ve a *Settings → Apps & Connectors* y agrega un conector MCP personalizado (o usa la acción de desarrollador en un GPT).
2. URL del servidor: `https://api.runrunapi.com/mcp` (transport HTTP).
3. Autenticación: OAuth. ChatGPT sigue el challenge `401` + discovery RFC 9728 y abre el login de la plataforma; autoriza y reusa el token.
4. Activa el conector en la conversación.

## Qué puedes preguntar

Con el conector activo, consulta en lenguaje natural, por ejemplo:

- *"Dame la ficha de la empresa con RUC 20512345678"*
- *"Busca empresas que contengan 'constructora' y dime su estado SUNAT"*
- *"¿Qué contratos suscribió la empresa X en 2024?"*

## Si algo falla

- Si el conector aparece sin herramientas, revisa que la URL sea exactamente `https://api.runrunapi.com/mcp`.
- Si responde `401`, repite el flujo de autorización: ChatGPT reutiliza el token una vez otorgado.
- El detalle de cada herramienta (entradas y salidas) está en la [MCP Referencia](/mcp/get-users/).
